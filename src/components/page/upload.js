import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/upload.css';
import { useAuth } from '../../hooks/AuthProvider';
import getStationCode from '../stations/station';

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [stationName, setStationName] = useState('');
  const [error, setError] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
    console.log('Selected video file:', event.target.files[0]);
  };

  const handleStationName = (event) => {
    setStationName(event.target.value);
    console.log('Entered station name:', event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!videoFile) {
      console.error('No video file selected');
      return;
    }

    const stationCode = getStationCode(stationName);
    console.log('Station return value:', stationCode);

    if (stationCode === undefined) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('imei', stationCode);

    console.log('Uploading video:', videoFile);
    console.log('Station Code:', stationCode);

    try {
      const response = await fetch('http://localhost:9000/api/v1/stations/video/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          accept: 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        navigate('/Succes', { state: { message: 'Video uploaded successfully', error: false, success: true }});
        console.log('Video uploaded successfully:', result);
      } else {
        console.error('Error uploading video, status:', response.status);
        navigate('/Succes', { state: { message: 'Video could not be uploaded successfully', error: true, success: false }});
      }
    } catch (error) {
      console.error('Error:', error);
      navigate('/Succes', { state: { message: error.message, error: true, success: false }});
    }
  };

  return (
    <div className="upload">
      <div className="upload__header">
        <h1>Upload Video</h1>
      </div>
      <div className="upload__form">
        <form onSubmit={handleSubmit}>
          <div className="upload__form__input_video">
            <input type="file" accept="video/*" onChange={handleFileChange} />
          </div>
          <div className="upload__form__input_text">
            <label>Station Name</label>
            <input type="text" placeholder="station name" onChange={handleStationName} />
            {error && <p className="upload__form__input_text_error">Station name is not correct</p>}
          </div>
          <button type="submit" className="upload__form__input_button">Submit</button>
        </form>

       
      </div>
    </div>
  );
};

export default VideoUpload;
