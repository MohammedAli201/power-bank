import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import '../../assets/styles/Sucess.css'; // Ensure the filename is correct

const Success = () => {
    const auth = useAuth();
    const location = useLocation();
    console.log(location);
    const { message, error, success } = location.state || { message: '', error: false, success: false };

    return (
        <div className="container">
            <div className={`notification ${success ? 'notification--success' : 'notification--error'}`}>
                <h1>{success ? 'Success' : 'Error'}</h1>
                <p>{message}</p>
                {error && <p className="error-message">There was an error uploading your video.</p>}

                <button onClick={auth.logOut} className="upload__form__input_button_logout">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Success;
