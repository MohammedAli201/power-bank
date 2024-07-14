


// StepGuard.js

import { useLocation, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useAuth } from './AuthProvider';

const StepGuard = ({ requiredStep }) => {
  const { currentStep } = useAuth();
  const location = useLocation();

  

  if (currentStep < requiredStep) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default StepGuard;
