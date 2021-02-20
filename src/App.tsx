import { ChakraProvider } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import Webcam from "react-webcam";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Devicedropdown } from "./components/Devicedropdown";
import { Calibration } from "./components/CalibrateButton";

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
}

function App() {
  const [ imgSrc, setImgSrc ] = useState("");
  const webcamRef = React.useRef(null);

  const [devices, setDevices] = useState([]);


  const capture = React.useCallback(
    () => {
      const ref = webcamRef.current as any
      const imageSrc = ref.getScreenshot();
      setImgSrc(imageSrc);
    },
    [webcamRef]
  );

  const handleDevices = React.useCallback(
    mediaDevices => {
        setDevices(mediaDevices.filter((device:InputDeviceInfo) => device.kind === "videoinput"))
     } ,
    [setDevices]
);

  useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]
  );

  return (
    <div className="container">
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/png"
        width={1280}
      />
      <Devicedropdown devices={devices} />
      <Calibration handler={capture} />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && <img src={imgSrc} alt="capture"/>}
    </div>
  );
}

function ConnectedApp() {
  return (
    <ChakraProvider>
      <PageWrapper>
      <App/>
      </PageWrapper>
    </ChakraProvider>
  )
}

export default ConnectedApp;
