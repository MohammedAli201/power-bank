import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/completed.css';

const Completed = () => {
    const message = "Payment successful. You can now take the power bank and charge your mobile with ease.";

    return (
        <div className="completed-container">
            <FontAwesomeIcon icon={faCheckCircle} size="6x" className="check-icon" />
            <h1 className="completed-message">{message}</h1>
        </div>
    );
}

export default Completed;
