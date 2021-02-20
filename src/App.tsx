import { ChakraProvider, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

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
  // one pixel image url xd
  const [imgSrc, setImgSrc] = useState("https://i.imgur.com/AnRSQSq.png");

  const [devices, setDevices] = useState([]);
  const [interval, setInterval] = useState(90);
  const [play] = useSound(notification, {volume: 0.75});
  const toast = useToast();
  const webcamRef = React.useRef(null);

  const setTimer = () => {
    setTimeout(() => {
      play();
      toast({
        description: "Insert message here",
        isClosable: true, 
      })
    }, interval * 1000);
  }

  const calibrate = React.useCallback(() => {
    capture();
  }, []);

  const capture = React.useCallback(() => {
    const ref = webcamRef.current as any;
    const imageSrc = ref.getScreenshot();
    setTimer();
    setImgSrc(imageSrc);
    // detectLandmarks - if returns undefined then popup error else continue
    // drawFeatures - show canvas as well
    // setInterval
    /*
			console.log(
				await testFunction(
					document.getElementById("capture") as HTMLImageElement
				)
			)
			*/
  }, [webcamRef]);



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

  useEffect(() => {
    //loadModels();
  }, []);

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
          setInterval={setInterval}
          interval={interval}
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
