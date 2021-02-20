import * as faceapi from "face-api.js";

// Returns false if check fails ie bad posture
const absolutePositionCheck = (
  imageWidth: number,
  imageHeight: number,
  groundTruthDetection: faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  >,
  newDetection: faceapi.WithFaceLandmarks<
    { detection: faceapi.FaceDetection },
    faceapi.FaceLandmarks68
  >
) : Boolean => {
    const groundTruthLeftEye = groundTruthDetection?.landmarks.getLeftEye()
    const newLeftEye = newDetection?.landmarks.getLeftEye()

    const dist = faceapi.euclideanDistance([groundTruthLeftEye[0].x, groundTruthLeftEye[0].y], [newLeftEye[0].x, newLeftEye[0].y])
    console.log({groundTruthLeftEye, newLeftEye, dist})
    return true
};

export {absolutePositionCheck};
