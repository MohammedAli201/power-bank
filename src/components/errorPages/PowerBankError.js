import React from 'react';

const PowerBankError = ({ errorType }) => {
    let errorMessage;

    switch (errorType) {
        case 'resourceNotFound':
            errorMessage = 'The requested resource was not found. Please check your request and try again.';
            break;
        case 'insufficientResources':
            errorMessage = 'There are not enough resources available to process your request. Please try again later.';
            break;
        case 'networkError':
            errorMessage = 'There was a network issue processing your request. Please check your connection and try again.';
            break;
        default:
            errorMessage = 'There was an error processing your power bank request. Please try again.';
            break;
    }

    return (
        <div>
            <h1>Power Bank Error</h1>
            <p>{errorMessage}</p>
        </div>
    );
}

export default PowerBankError;
