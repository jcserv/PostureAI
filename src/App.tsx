import {
  ChakraProvider,
  VStack,
  useToast,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

import {
  detectLandmarks,
  drawFeatures,
  isBadPosture,
  loadModels,
} from "./face-calc";

import { Footer } from "./components/Footer";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { InfoBox } from "./components/InfoBox";
import { Navbar } from "./components/Navbar";
import useSound from "use-sound";
import notification from "./sounds/notification.mp3";
import "./App.css";
import { verify } from "crypto";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
}: PageWrapperProps) => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

function App() {
  const toast = useToast();
  // one pixel image url xd
  const [devices, setDevices] = useState([]);
  const [hasPermissions, setHasPermissions] = useState(true);
  const [imgSrc, setImgSrc] = useState("https://i.imgur.com/AnRSQSq.png");
  const [intervalTime, setIntervalTime] = useState(90);
  const [
    calibratedLandmarks,
    setCalibratedLandmarks,
  ] = useState<faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  > | null>(null);
  const webcamRef = useRef(null);
  const [play] = useSound(notification, { volume: 0.1 });
  const [webcamId, setwebcamId] = useState("");

  useEffect(() => {
    loadModels();
  }, []);

  const displaySuccessToast = (message: string) => {
    toast({
      position: "bottom-left",
      title: "Your posture looks great!",
      description: message,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const displayErrorToast = (message: string) => {
    play();
    toast({
      position: "bottom-left",
      title: "An error occurred.",
      description: message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const verifyPosture = async (img: HTMLImageElement) => {
    if (calibratedLandmarks) {
      const hasBadPosture = await isBadPosture(calibratedLandmarks, img);
      if (hasBadPosture) {
        displayErrorToast("Your posture requires correction!");
      } else {
        displaySuccessToast("Good job!");
      }
    }
  };

  const drawFaceMesh = (
    landmarks: faceapi.WithFaceLandmarks<
      { detection: faceapi.FaceDetection },
      faceapi.FaceLandmarks68
    >,
    callback: (img: HTMLImageElement) => void
  ) => {
    const img = document.getElementById("capture") as HTMLImageElement;
    const canvas = document.getElementById("overlay") as HTMLCanvasElement;
    drawFeatures(landmarks, canvas, img);
    if (callback) callback(img);
  };

  const calibrate = async () => {
    const landmarks = await capture();
    if (landmarks) {
      drawFaceMesh(landmarks, () => {});
      setCalibratedLandmarks(landmarks);
    } else {
      displayErrorToast("Unable to detect user.");
    }
  };

  const capture = useCallback(async () => {
    const ref = webcamRef.current as any;
    const imageSrc = await ref.getScreenshot();
    setImgSrc(imageSrc);
    const img = document.getElementById("capture") as HTMLImageElement;
    return await detectLandmarks(img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);

  useEffect(() => {
    // Capture user based on interval set
    const timer = setInterval(async () => {
      if (!calibratedLandmarks) return;
      const newLandmarks = await capture();
      if (newLandmarks) {
        drawFaceMesh(newLandmarks, verifyPosture);
      } else {
        displayErrorToast("Unable to detect user.");
      }
    }, 5 * 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calibratedLandmarks, capture, intervalTime]);

  const handleDevices = React.useCallback(
    (mediaDevices) => {
      setDevices(
        mediaDevices.filter(
          (device: InputDeviceInfo) => device.kind === "videoinput"
        )
      );
    },
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <div className="container">
      <VStack className="column">
        <Header />
        <InfoBox />
        {hasPermissions ? (
          <Webcam
            audio={false}
            height={200}
            ref={webcamRef}
            screenshotFormat="image/png"
            width={500}
            videoConstraints={{ deviceId: webcamId }}
            onUserMediaError={() => {
              setHasPermissions(false);
              displayErrorToast("Permissions not provided");
            }}
          />
        ) : (
          <>
            <Spinner size="xl" />
            <Text>Please enable webcam access and refresh the page.</Text>
          </>
        )}
        <Form
          calibrate={calibrate}
          devices={devices}
          setInterval={setIntervalTime}
          interval={intervalTime}
          webcamId={webcamId}
          setwebcamId={setwebcamId}
        />
        <div className="outsideWrapper">
          <div className="insideWrapper">
            <img
              src={imgSrc}
              alt="capture"
              id="capture"
              crossOrigin="anonymous"
              className="coveredImage"
            />
            <canvas id="overlay" className="coveringCanvas" />
          </div>
        </div>
      </VStack>
    </div>
  );
}

function ConnectedApp() {
  return (
    <ChakraProvider>
      <PageWrapper>
        <App />
      </PageWrapper>
    </ChakraProvider>
  );
}

export default ConnectedApp;
