import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ErrorHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { errorType, errorMessage } = location.state || { errorType: "Unknown Error", errorMessage: "Something went wrong" };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Error Type: {errorType}</h2>
      <p style={styles.message}>Error Details: {errorMessage}</p>
      <button style={styles.button} onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  header: {
    fontSize: '24px',
    color: '#FF0000',
  },
  message: {
    fontSize: '18px',
    marginTop: '20px',
  },
  button: {
    marginTop: '30px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ErrorHandler;
