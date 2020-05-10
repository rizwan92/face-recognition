import * as faceapi from "face-api.js";

// import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from "./commons";

// const REFERENCE_IMAGE = "../images/bbt1.jpg";
// const QUERY_IMAGE = "../images/bbt4.jpg";

// async function run() {
//   await faceDetectionNet.loadFromDisk("../../weights");
//   await faceapi.nets.faceLandmark68Net.loadFromDisk("../../weights");
//   await faceapi.nets.faceRecognitionNet.loadFromDisk("../../weights");
//   const referenceImage = await canvas.loadImage(REFERENCE_IMAGE);
//   const queryImage = await canvas.loadImage(QUERY_IMAGE);
//   const resultsRef = await faceapi.detectAllFaces(referenceImage, faceDetectionOptions).withFaceLandmarks().withFaceDescriptors();
//   const resultsQuery = await faceapi.detectAllFaces(queryImage, faceDetectionOptions).withFaceLandmarks().withFaceDescriptors();
//   const faceMatcher = new faceapi.FaceMatcher(resultsRef);
//   const labels = faceMatcher.labeledDescriptors.map((ld) => ld.label);
//   const refDrawBoxes = resultsRef.map((res) => res.detection.box).map((box, i) => new faceapi.draw.DrawBox(box, { label: labels[i] }));
//   const outRef = faceapi.createCanvasFromMedia(referenceImage);
//   refDrawBoxes.forEach((drawBox) => drawBox.draw(outRef));
//   saveFile("referenceImage.jpg", (outRef as any).toBuffer("image/jpeg"));
//   const queryDrawBoxes = resultsQuery.map((res) => {
//     const bestMatch = faceMatcher.findBestMatch(res.descriptor);
//     return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() });
//   });
//   const outQuery = faceapi.createCanvasFromMedia(queryImage);
//   queryDrawBoxes.forEach((drawBox) => drawBox.draw(outQuery));
//   saveFile("queryImage.jpg", (outQuery as any).toBuffer("image/jpeg"));
//   console.log("done, saved results to out/queryImage.jpg");
// }

function loadLabeledImages() {
  const labels = ["amy", "bernadette", "howard", "leonard", "penny", "raj", "sheldon", "stuart"];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(imageUri);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        console.log(detections);
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}

const lablesDescriptors = loadLabeledImages();
console.log(lablesDescriptors);
