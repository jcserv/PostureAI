import * as faceapi from "face-api.js";

import {absolutePositionCheck} from "./postureChecks"

const MODEL_URL = "./models";

const loadModels = async () => {
  await Promise.all([
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  ]);
  console.log("Loaded all models");
};

// Returns null if no face found
const detectLandmarks = async (
<<<<<<< HEAD
  image: HTMLImageElement
=======
    input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
>>>>>>> main
): Promise<faceapi.WithFaceLandmarks<
  { detection: faceapi.FaceDetection },
  faceapi.FaceLandmarks68
> | null> => {
<<<<<<< HEAD
  const detectionsWithLandmarks = await faceapi
    .detectSingleFace(image)
    .withFaceLandmarks();
  if (detectionsWithLandmarks) return detectionsWithLandmarks;
  else return null;
=======
    const detectionsWithLandmarks = await faceapi
        .detectSingleFace(input)
        .withFaceLandmarks();
    if (detectionsWithLandmarks) return detectionsWithLandmarks;
    else return null;
>>>>>>> main
};

const drawFeatures = (
  detections: faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  >,
  canvas: HTMLCanvasElement,
  input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
): void => {
  const displaySize = {
    width: input.width,
    height: input.height,
  };
  faceapi.matchDimensions(canvas, displaySize);

  const resizedDetections = faceapi.resizeResults(detections, displaySize);

  if (resizedDetections) {
    console.log("im drawing");
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  }
};

// returns null if no face found
const isBadPosture = async (
    groundTruthDetection: faceapi.WithFaceLandmarks<
        { detection: faceapi.FaceDetection },
        faceapi.FaceLandmarks68
    >,
    input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
): Promise<Boolean | null> => {
    const newDetection = await detectLandmarks(input);
    //TODO
    if (!newDetection)
        return null

    const positionCheck = absolutePositionCheck(input.width, input.height, groundTruthDetection, newDetection)
    return positionCheck;
};

export { loadModels, detectLandmarks, drawFeatures, isBadPosture };
