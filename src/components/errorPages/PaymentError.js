import React from 'react';

const PaymentError = ({ errorType, errorDetails }) => {
    let errorMessage;

    switch (errorType) {
        case 'insufficientFunds':
            errorMessage = `Your payment could not be processed due to insufficient funds. You are short by $${errorDetails.amountShort}. Please add more funds and try again.`;
            break;
        case 'networkError':
            errorMessage = 'There was a network issue processing your payment. Please check your connection and try again.';
            break;
        case 'paymentDeclined':
            errorMessage = 'Your payment was declined. Please check with your bank or use a different payment method.';
            break;
        default:
            errorMessage = 'There was an error processing your payment. Please try again.';
            break;
    }

    return (
        <div>
            <h1>Payment Error</h1>
            <p>{errorMessage}</p>
        </div>
    );
}

export default PaymentError;
