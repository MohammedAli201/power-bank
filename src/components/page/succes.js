import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/styles/Sucess.css';
const Succes = () => {
    const location = useLocation();
    console.log(location);
    const { message, error, success } = location.state || { message: '', error: false, success: false };
return (
    <div className={`notification ${success ? 'notification--success' : 'notification--error'}`}>
        <h1>{success ? 'Success' : 'Error'}</h1>
        <p>{message}</p>
        {error && <p className="error-message">There was an error uploading your video.</p>}
    </div>
);
};
export default Succes;
