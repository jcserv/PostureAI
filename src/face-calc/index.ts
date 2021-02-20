import * as faceapi from "face-api.js";

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
    image: HTMLImageElement
): Promise<faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
> | null> => {
    const detectionsWithLandmarks = await faceapi
        .detectSingleFace(image)
        .withFaceLandmarks();
    if (detectionsWithLandmarks) return detectionsWithLandmarks;
    else return null;
};

const drawFeatures = (
    detections: faceapi.WithFaceLandmarks<
        { detection: faceapi.FaceDetection },
        faceapi.FaceLandmarks68
    >,
    canvas: HTMLCanvasElement,
    imageElement: HTMLImageElement
): void => {
    const displaySize = {
        width: imageElement.width,
        height: imageElement.height,
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
    oldLandmarks: faceapi.WithFaceLandmarks<
        { detection: faceapi.FaceDetection },
        faceapi.FaceLandmarks68
    >,
    newImage: HTMLImageElement
): Promise<Boolean | null> => {
    const newLandmarks = await detectLandmarks(newImage);
    //TODO
    return false;
};

export {
    loadModels,
    detectLandmarks,
    drawFeatures,
    isBadPosture,
};
