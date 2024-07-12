import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Loader.css';

const Loader = ({ message }) => {
    return (
        <div className="loader-container">
            <FontAwesomeIcon icon={faSpinner} spin size="6x" className="spinner-icon" />
            <h1 className="loader-message">{message}</h1>
        </div>
    );
}

export default Loader;
