
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ChakraProvider, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';


import { Form } from './components/Form';
import { Header } from './components/Header';
import { InfoBox } from './components/InfoBox';


import './App.css';

interface PageWrapperProps {
	children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }: PageWrapperProps) => {
	return (
		<div style={{ overflowX: 'hidden' }}>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

function App() {
  const [ imgSrc, setImgSrc ] = useState("");
  const webcamRef = React.useRef(null);

  const [devices, setDevices] = useState([]);
  const [interval, setInterval] = useState(90);

  const capture = React.useCallback(
    () => {
      const ref = webcamRef.current as any
      const imageSrc = ref.getScreenshot();
      setImgSrc(imageSrc);
      // detectLandmarks - if returns undefined then popup error else continue
      // drawFeatures - show canvas as well
      // setInterval
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
			<VStack className="column">
				<Header />
				<InfoBox />
				<Webcam audio={false} height={200} ref={webcamRef} screenshotFormat="image/png" width={500} />
				<Form capture={capture} devices={devices} setInterval={setInterval} interval={interval} />
				{imgSrc && <img src={imgSrc} alt="capture" />}
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
