import { ChakraProvider, VStack, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

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
  const [imgSrc, setImgSrc] = useState("https://i.imgur.com/AnRSQSq.png");
  const [intervalTime, setIntervalTime] = useState(90);
  const webcamRef = useRef(null);

  useEffect(() => {
    loadModels();
  }, []);

  const capture = useCallback(async () => {
    const ref = webcamRef.current as any;
    const imageSrc = ref.getScreenshot();
    setImgSrc(imageSrc);
    const img = document.getElementById("capture") as HTMLImageElement;
    const canvas = document.getElementById("overlay") as HTMLCanvasElement;
    const landmarks = await detectLandmarks(img);
    if (landmarks) {
      drawFeatures(landmarks, canvas, img);
    } else {
      toast({
        position: "bottom-left",
        title: "An error occurred.",
        description: "Unable to detect user.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [toast, webcamRef]);

  useEffect(() => {
    // Capture user based on interval set
    const timer = setInterval(() => {
      capture();
    }, intervalTime * 1000);
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
        <Webcam
          audio={false}
          height={200}
          ref={webcamRef}
          screenshotFormat="image/png"
          width={500}
        />
        <Form
          capture={capture}
          devices={devices}
          setInterval={setIntervalTime}
          interval={intervalTime}
        />
        <img src={imgSrc} alt="capture" id="capture" crossOrigin="anonymous" />
        <canvas id="overlay" />
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
