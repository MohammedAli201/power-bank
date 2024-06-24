// src/components/FaceCapture.js
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';

const FaceCapture = ({ slots, paymentInfores, paymentIsSucceeded }) => {
  const [unlockStatus, setUnlockStatus] = useState('');
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [initializing, setInitializing] = useState(true);
  const stationId = 'WSEP161683346505';
  

  const selectSlot = () => {
    // Criteria: Select the first locked slot
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
      // Navigate to ServiceTimer after successful unlocking
   
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

    // Set up canvas
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    canvas.style.position = 'absolute';
    canvas.style.top = videoRef.current.offsetTop + 'px';
    canvas.style.left = videoRef.current.offsetLeft + 'px';
    canvas.style.zIndex = 10;
    canvasRef.current = canvas;
    document.body.append(canvas);

    const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      // Clear and draw detections
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }, 100);
  };

  const captureImage = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL('image/jpeg');

    // Validate the captured image
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

    console.log('Sending image to backend:', image);
  };

  return (
    <div style={{ position: 'relative' }}>
      {initializing ? (
        <div>Loading models...</div>
      ) : (
        <div>
          <video ref={videoRef} onPlay={handleVideoPlay} autoPlay muted width="720" height="560" style={{ position: 'relative', zIndex: 1 }} />
          <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
          <button onClick={captureImage}>Capture and Validate Face</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      )}
    </div>
  );
};

export default FaceCapture;
