import React from 'react';
import {  Navigate , Outlet} from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
const Protected = () => {
    const {IsPaymentCompleted} = useAuth();
    console.log(IsPaymentCompleted)
    if (!IsPaymentCompleted) return <Navigate to="/ServiceBooking" />;
    return <Outlet />;
  };


export default Protected;



// import React from 'react';
// import {  Navigate , Outlet} from 'react-router-dom';
// import { useAuth } from '../hooks/AuthProvider';

// const PrivateRoute = () => {
//     const user = useAuth();
//     if (!user.token) return <Navigate to="/login" />;
//     return <Outlet />;
//   };

// export default PrivateRoute;
