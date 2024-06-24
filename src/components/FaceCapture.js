// // src/components/FaceCapture.js
// import React, { useEffect, useRef, useState } from 'react';
// import * as faceapi from 'face-api.js';

// const FaceCapture = ({ slots, paymentInfores, paymentIsSucceeded }) => {
//   const [unlockStatus, setUnlockStatus] = useState('');
//   const [error, setError] = useState('');
//   const [imageSaved, setImageSaved] = useState(false); // New state for image saved status
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [initializing, setInitializing] = useState(true);
//   const stationId = 'WSEP161683346505';
//   const intervalRef = useRef(null);

//   const selectSlot = () => {
//     return slots.find(slot => slot.lock_status === "1");
//   };

//   const forceUnlock = async (image) => {
//     const formData = new FormData();
//     const slot = selectSlot();
//     if (!slot) {
//       setError('No locked slot found');
//       return;
//     }
//     const { id: slot_id } = slot;
//     formData.append('slot_id', slot_id);
//     formData.append('image', image);
//     formData.append('paymentInfores', JSON.stringify(paymentInfores));
//     formData.append('paymentIsSucceeded', paymentIsSucceeded);

//     try {
//       const response = await fetch(`http://localhost:9000/api/v1/stations/powerBankRouter/${stationId}/forceUnlock`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to unlock slot');
//       }

//       const data_res = await response.json();
//       setUnlockStatus('success');
//       console.log("Unlock completed:", data_res);
//     } catch (error) {
//       console.error('Error unlocking slot:', error);
//       setUnlockStatus('error');
//       setError('Error unlocking slot');
//     }
//   };

//   const validateFace = async (image) => {
//     const img = new Image();
//     img.src = image;
//     return new Promise((resolve) => {
//       img.onload = async () => {
//         const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
//         resolve(detections.length > 0);
//       };
//     });
//   };

//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = process.env.PUBLIC_URL + '/models';
//       await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//       await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//       await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//       startVideo();
//     };

//     const startVideo = () => {
//       navigator.mediaDevices.getUserMedia({ video: {} })
//         .then(stream => {
//           videoRef.current.srcObject = stream;
//         })
//         .catch(err => {
//           console.error('Error accessing webcam:', err);
//         });
//     };

//     loadModels().then(() => setInitializing(false));
//   }, []);

//   const handleVideoPlay = async () => {
//     if (!videoRef.current) return;

//     const canvas = faceapi.createCanvasFromMedia(videoRef.current);
//     canvas.style.position = 'absolute';
//     canvas.style.top = videoRef.current.offsetTop + 'px';
//     canvas.style.left = videoRef.current.offsetLeft + 'px';
//     canvas.style.zIndex = 10;
//     canvasRef.current = canvas;
//     videoRef.current.parentElement.append(canvas);

//     const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
//     faceapi.matchDimensions(canvas, displaySize);

//     intervalRef.current = setInterval(async () => {
//       const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
//       const resizedDetections = faceapi.resizeResults(detections, displaySize);

//       canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//       faceapi.draw.drawDetections(canvas, resizedDetections);
//       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

//       if (detections.length > 0) {
//         captureImage();
//       }
//     }, 1000); // Check every 1 second
//   };

//   const captureImage = async () => {
//     const canvas = document.createElement('canvas');
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//     const image = canvas.toDataURL('image/jpeg');

//     const isValidFace = await validateFace(image);
//     if (isValidFace) {
//       console.log('Face validated, sending to backend.');
//       sendToBackend(image);
//     } else {
//       console.error('No face detected in the captured image.');
//       setError('No face detected. Please try again.');
//     }
//   };

//   const sendToBackend = async (image) => {
//     await forceUnlock(image);

//     // Stop the video stream
//     if (videoRef.current && videoRef.current.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//     }

//     // Clear the interval
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }

//     // Set image saved status
//     setImageSaved(true);

//     console.log('Sending image to backend:', image);
//   };

//   return (
//     <div style={{ position: 'relative' }}>
//       {initializing ? (
//         <div>Loading models...</div>
//       ) : (
//         <div>
//           <video ref={videoRef} onPlay={handleVideoPlay} autoPlay muted width="720" height="560" style={{ position: 'relative', zIndex: 1, display: 'none' }} />
//           <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }} />
//           {imageSaved && <p>Image has been saved successfully.</p>}
//           {error && <div style={{ color: 'red' }}>{error}</div>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FaceCapture;
// src/components/FaceCapture.js
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceCapture = ({ slots, paymentInfores, paymentIsSucceeded }) => {
  const [unlockStatus, setUnlockStatus] = useState('');
  const [error, setError] = useState('');
  const [imageSaved, setImageSaved] = useState(false); // New state for image saved status
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [initializing, setInitializing] = useState(true);
  const stationId = 'WSEP161683346505';
  const intervalRef = useRef(null);

  const selectSlot = () => {
    return slots.find(slot => slot.lock_status === "1");
  };

  const forceUnlock = async (image) => {
    const formData = new FormData();
    const slot = selectSlot();
    if (!slot) {
      setError('No locked slot found');
      return;
    }
    const { id: slot_id } = slot;
    formData.append('slot_id', slot_id);
    formData.append('image', image);
    formData.append('paymentInfores', JSON.stringify(paymentInfores));
    formData.append('paymentIsSucceeded', paymentIsSucceeded);

    try {
      const response = await fetch(`http://localhost:9000/api/v1/stations/powerBankRouter/${stationId}/forceUnlock`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to unlock slot');
      }

      const data_res = await response.json();
      setUnlockStatus('success');
      console.log("Unlock completed:", data_res);
    } catch (error) {
      console.error('Error unlocking slot:', error);
      setUnlockStatus('error');
      setError('Error unlocking slot');
    }
  };

  const validateFace = async (image) => {
    const img = new Image();
    img.src = image;
    return new Promise((resolve) => {
      img.onload = async () => {
        const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
        resolve(detections.length > 0);
      };
    });
  };

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => {
          console.error('Error accessing webcam:', err);
        });
    };

    loadModels().then(() => setInitializing(false));
  }, []);

  const handleVideoPlay = async () => {
    if (!videoRef.current) return;

    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.zIndex = 10;
    canvasRef.current = canvas;
    videoRef.current.parentElement.append(canvas);

    const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
    faceapi.matchDimensions(canvas, displaySize);

    intervalRef.current = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

      if (detections.length > 0) {
        captureImage();
      }
    }, 1000); // Check every 1 second
  };

  const captureImage = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL('image/jpeg');

    const isValidFace = await validateFace(image);
    if (isValidFace) {
      console.log('Face validated, sending to backend.');
      sendToBackend(image);
    } else {
      console.error('No face detected in the captured image.');
      setError('No face detected. Please try again.');
    }
  };

  const sendToBackend = async (image) => {
    await forceUnlock(image);

    // Stop the video stream
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }

    // Clear the interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set image saved status
    setImageSaved(true);

    console.log('Sending image to backend:', image);
  };

  return (
    <div style={{ position: 'relative' }}>
      {initializing ? (
        <div>Loading models...</div>
      ) : (
        <div>
          <video ref={videoRef} onPlay={handleVideoPlay} autoPlay muted width="720" height="560" style={{ position: 'relative', zIndex: 1 }} />
          <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }} />
          {imageSaved && <p>Image has been saved successfully.</p>}
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      )}
    </div>
  );
};

export default FaceCapture;
