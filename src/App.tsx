import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from 'react';
import Webcam from "react-webcam";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import './App.css';

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
  const capture = React.useCallback(
    () => {
      const ref = webcamRef.current as any
      const imageSrc = ref.getScreenshot();
      setImgSrc(imageSrc);
    },
    [webcamRef]
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
