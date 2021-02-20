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
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(true);
  const [imgSrc, setImgSrc] = useState("https://i.imgur.com/AnRSQSq.png");
  const [intervalTime, setIntervalTime] = useState(90);
  const [sensitivity, setSensitivity] = useState(5);
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
    async function load() {
      await loadModels();
      setHasLoaded(true);
    }
    load();
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

  const drawFaceMesh = (
    landmarks: faceapi.WithFaceLandmarks<
      { detection: faceapi.FaceDetection },
      faceapi.FaceLandmarks68
    >
  ) => {
    const img = document.getElementById("capture") as HTMLImageElement;
    const canvas = document.getElementById("overlay") as HTMLCanvasElement;
    drawFeatures(landmarks, canvas, img);
  };

  const verifyPosture = async (img: HTMLImageElement) => {
    if (calibratedLandmarks) {
      const hasBadPosture = await isBadPosture(calibratedLandmarks, img);
      if (hasBadPosture) {
        displayErrorToast("Your posture requires correction!");
        drawFaceMesh(calibratedLandmarks);
      } else {
        displaySuccessToast("Good job!");
      }
    }
  };

  const calibrate = async () => {
    const landmarks = await capture();
    if (landmarks) {
      drawFaceMesh(landmarks);
      setCalibratedLandmarks(landmarks);
    } else {
      //displayErrorToast("Unable to detect user.");
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
    // Continually draw face mesh on video
    // Capture user based on interval set
    const timer = setInterval(async () => {
      if (calibratedLandmarks || !hasLoaded) return;
      const newLandmarks = await capture();
      if (newLandmarks) {
        drawFaceMesh(newLandmarks);
      } else {
        displayErrorToast("Unable to detect user.");
      }
    }, 33);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calibratedLandmarks, capture]);

  useEffect(() => {
    // Regular posture checks
    // Capture user based on interval set
    const timer = setInterval(async () => {
      if (!calibratedLandmarks) return;
      const newLandmarks = await capture();
      if (newLandmarks) {
        const img = document.getElementById("capture") as HTMLImageElement;
        verifyPosture(img);
      } else {
        displayErrorToast("Unable to detect user.");
      }
    }, intervalTime * 1000);
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
          <div className="outsideWrapper">
            <div className="insideWrapper">
              <Webcam
                audio={false}
                className="coveredImage"
                height={200}
                ref={webcamRef}
                mirrored={true}
                screenshotFormat="image/png"
                width={500}
                videoConstraints={{ deviceId: webcamId }}
                onUserMediaError={() => {
                  setHasPermissions(false);
                  displayErrorToast("Permissions not provided");
                }}
              />
              <canvas id="overlay" className="coveringCanvas" />
            </div>
          </div>
        ) : (
          <>
            <Spinner size="xl" />
            <Text>Please enable webcam access and refresh the page.</Text>
          </>
        )}
        <Form
          calibrate={calibrate}
          devices={devices}
          interval={intervalTime}
          webcamId={webcamId}
          sensitivity={sensitivity}
          setInterval={setIntervalTime}
          setSensitivity={setSensitivity}
          setwebcamId={setwebcamId}
        />
        <img
          src={imgSrc}
          alt="capture"
          id="capture"
          crossOrigin="anonymous"
          style={{ display: "none" }}
        />
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
