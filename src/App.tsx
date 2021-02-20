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
  const [hasPermissions, setHasPermissions] = useState(true);
  const [imgSrc, setImgSrc] = useState("https://i.imgur.com/AnRSQSq.png");
  const [intervalTime, setIntervalTime] = useState(90);
  const [oldLandmarks, setOldLandmarks] = useState<faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  > | null>(null);
  const webcamRef = useRef(null);
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
    console.log(oldLandmarks);
    if (oldLandmarks) {
      const hasBadPosture = await isBadPosture(oldLandmarks, img);
      console.log(hasBadPosture);
      if (hasBadPosture) {
        displayErrorToast("Your posture requires correction!");
      } else {
        displaySuccessToast("Good job!");
      }
    }
  };

  const capture = useCallback(async () => {
    const ref = webcamRef.current as any;
    const imageSrc = ref.getScreenshot();
    setImgSrc(imageSrc);
    const img = document.getElementById("capture") as HTMLImageElement;
    const canvas = document.getElementById("overlay") as HTMLCanvasElement;
    const landmarks = await detectLandmarks(img);
    if (landmarks) {
      drawFeatures(landmarks, canvas, img);
      verifyPosture(img);
      setOldLandmarks(landmarks);
    } else {
      displayErrorToast("Unable to detect user.");
    }
    // this is req'd, adding in the dependencies from the warning causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef]);

  useEffect(() => {
    // Capture user based on interval set
    const timer = setInterval(() => {
      capture();
    }, 5 * 1000);
    return () => clearInterval(timer);
  }, [capture, intervalTime]);

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
          capture={capture}
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
