import { ChakraProvider, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

import { Footer } from './components/Footer';
import { Form } from './components/Form';
import { Header } from './components/Header';
import { InfoBox } from './components/InfoBox';
import { Navbar } from './components/Navbar';

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
	// one pixel image url xd
	const [ imgSrc, setImgSrc ] = useState('https://i.imgur.com/AnRSQSq.png');
	const webcamRef = React.useRef(null);
	const capture = React.useCallback(
		() => {
			const ref = webcamRef.current as any;
			const imageSrc = ref.getScreenshot();
			setImgSrc(imageSrc);
			/*
			console.log(
				await testFunction(
					document.getElementById("capture") as HTMLImageElement
				)
			)
			*/
		},
		[ webcamRef ]
	);

	useEffect(() => {
		//loadModels();
	}, []);

	return (
		<div className="container">
			<VStack className="column">
				<Header />
				<InfoBox />
				<Webcam audio={false} height={200} ref={webcamRef} screenshotFormat="image/png" width={500} />
				<canvas id="overlay" />
				<button onClick={capture}>Capture photo</button>
				<Form />
				<img src={imgSrc} alt="capture" id="capture" crossOrigin="anonymous" />
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
