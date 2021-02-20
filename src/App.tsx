import React, { useState } from 'react';
import Webcam from "react-webcam";
import './App.css';

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
    <div className="App">
      <header className="App-header">
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/png"
        width={1280}
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && <img src={imgSrc} alt="capture"/>}
      </header>
    </div>
  );
}

export default App;
