import * as faceapi from "face-api.js";
//import * as math from "mathjs"
const LIMIT = 0.01;
// Returns true if check fails ie bad posture
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
): Boolean => {
  const groundTruthLeftEye = groundTruthDetection.landmarks.getLeftEye();
  const newLeftEye = newDetection.landmarks.getLeftEye();

  const dist = faceapi.euclideanDistance(
    [groundTruthLeftEye[0].x, groundTruthLeftEye[0].y],
    [newLeftEye[0].x, newLeftEye[0].y]
  );
  const distLimit = getDiagonalLength(imageWidth, imageHeight) * LIMIT;
  console.log("Position check results:", { dist, distLimit });
  return dist > distLimit;
};

const proximityCheck = (
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
): Boolean => {
  //TODO

  const groundTruthLeftEye = groundTruthDetection.landmarks.getLeftEye();
  const groundTruthRightEye = groundTruthDetection.landmarks.getRightEye();
  const newLeftEye = newDetection.landmarks.getLeftEye();
  const newRightEye = newDetection.landmarks.getRightEye();
  const groundTruthDistance = getDistanceBetweenTwoPoints(
    getAverageLandmark(groundTruthLeftEye),
    getAverageLandmark(groundTruthRightEye)
  );
  const newDistance = getDistanceBetweenTwoPoints(
    getAverageLandmark(newLeftEye),
    getAverageLandmark(newRightEye)
  );

  const percentageChange =
    Math.abs(newDistance - groundTruthDistance) / groundTruthDistance;
  console.log("Proximity check results:", {percentageChange, changeLimit : LIMIT});

  return percentageChange > LIMIT;
};

const forwardTiltCheck = (
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
): Boolean => {
  //TODO

  const groundTruthLeftEye = groundTruthDetection.landmarks.getLeftEye();
  const groundTruthRightEye = groundTruthDetection.landmarks.getRightEye();
  const groundTruthMouth = groundTruthDetection.landmarks.getMouth();
  const newLeftEye = newDetection.landmarks.getLeftEye();
  const newRightEye = newDetection.landmarks.getRightEye();
  const newMouth = newDetection.landmarks.getMouth();
  const groundTruthDistance = getDistanceFromPointToLine(
    getAverageLandmark(groundTruthMouth),
    getAverageLandmark(groundTruthLeftEye),
    getAverageLandmark(groundTruthRightEye)
  );
  const newDistance = getDistanceFromPointToLine(
    getAverageLandmark(newMouth),
    getAverageLandmark(newLeftEye),
    getAverageLandmark(newRightEye)
  );

  const percentageChange =
    Math.abs(newDistance - groundTruthDistance) / groundTruthDistance;
  console.log("Forward tilt check results:", {percentageChange, changeLimit : LIMIT});

  return percentageChange > LIMIT;
};

const sideTiltCheck = (
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
): Boolean => {
  //TODO

  const groundTruthLeftEye = groundTruthDetection.landmarks.getLeftEye();
  const groundTruthRightEye = groundTruthDetection.landmarks.getRightEye();
  const newLeftEye = newDetection.landmarks.getLeftEye();
  const newRightEye = newDetection.landmarks.getRightEye();

  return true;
};

const getDistanceBetweenTwoPoints = (v: number[], w: number[]): number => {
  return Math.sqrt(Math.pow(w[0] - v[0], 2) + Math.pow(w[1] - v[1], 2));
};

const getDistanceFromPointToLine = (
  p: number[],
  v: number[],
  w: number[]
): number => {
  return (
    Math.abs((w[0] - v[0]) * (v[1] - p[1]) - (v[1] - p[0]) * (w[1] - v[1])) /
    getDistanceBetweenTwoPoints(v, w)
  );
};

const getAverageLandmark = (landmark: faceapi.Point[]): number[] => {
  //TODO
  return [landmark[0].x, landmark[0].y];
};

const getDiagonalLength = (width: number, height: number): number => {
  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
};

const getLimit = (width: number, height: number): number => {
  return getDiagonalLength(width, height) * 0.075;
};

export { absolutePositionCheck, proximityCheck, forwardTiltCheck };
