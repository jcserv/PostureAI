import { Button } from '@chakra-ui/react';
import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const IndexPage = () => {
	const webcamRef = useRef(null);
	const [ imgSrc, setImgSrc ] = React.useState('');

	const capture = React.useCallback(
		() => {
			// pain.
			const ref = webcamRef.current as any;
			const imageSrc = ref.getScreenshot;
			setImgSrc(imageSrc);
		},
		[ webcamRef, setImgSrc ]
	);

	return (
		<div className="container">
			<Webcam audio={false} ref={webcamRef} screenshotFormat="image/png" />
			<Button onClick={capture}>Capture</Button>
			{imgSrc && <img src={imgSrc} />}
		</div>
	);
};

export default IndexPage;
