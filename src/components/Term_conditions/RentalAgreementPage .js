// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/AuthProvider';
// const RentalAgreementPage = () => {
//   const navigate = useNavigate();
//   const { onAgreement,setCurrentStep , agreement} = useAuth();

//   const handleAgreementChange = (e) => {
//     alert(e.target.checked);
//     if (e.target.checked) {
//       onAgreement(true);
//     }else{
//     onAgreement(false  );
//     }
//   };
// //   console.log(onAgreement);
//   //console.log(setCurrentStep);
//   console.log("agreement",agreement);

//   const handleStartRental = () => {
//     if (!onAgreement) {
//       alert('You must agree to the terms and conditions to proceed.');
//       return;
//     }
//     setCurrentStep(0);
    
//     navigate("/ServiceBooking");
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <h1>Rental Service Agreement</h1>
//       <div style={{ margin: '20px 0' }}>
//         <p>Please read and agree to the terms and conditions before proceeding with the rental:</p>
//         <ul>
//           <li>You are responsible for the rented item during the rental period.</li>
//           <li>You must return the item within the agreed time frame.</li>
//           <li>If you exceed the rental time, additional charges will apply as described in our terms.</li>
//           <li>Failure to pay outstanding charges will result in account sanctions.</li>
//           <li>Your phone number is required for rental purposes and will not be shared with third parties.</li>
//         </ul>
//       </div>
//       <div style={{ margin: '20px 0' }}>
//         <label>
//           <input 
//             type="checkbox" 
//             checked={agreement} 

//             onChange={handleAgreementChange} 
//           />
//           {' '}
//           I agree to the terms and conditions.
//         </label>
//       </div>
//       <button 
//         onClick={handleStartRental}
//         style={{
//           backgroundColor: '#007bff',
//           color: 'white',
//           padding: '10px 20px',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         Back  Rental Page
//       </button>
//     </div>
//   );
// };

// export default RentalAgreementPage;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';

const RentalAgreementPage = () => {
  const navigate = useNavigate();
  const { onAgreement, setCurrentStep, agreement } = useAuth();

  const handleAgreementChange = (e) => {
    // This function simply updates the agreement state based on checkbox change
    onAgreement(e.target.checked);
  };

  const handleStartRental = () => {
    if (!agreement) {
      alert('You must agree to the terms and conditions to proceed.');
      return;
    }
    setCurrentStep(0);
    navigate("/ServiceBooking");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Rental Service Agreement</h1>
      <div style={{ margin: '20px 0' }}>
        <p>Please read and agree to the terms and conditions before proceeding with the rental:</p>
        <ul>
          <li>You are responsible for the rented item during the rental period.</li>
          <li>You must return the item within the agreed time frame.</li>
          <li>If you exceed the rental time, additional charges will apply as described in our terms.</li>
          <li>Failure to pay outstanding charges will result in account sanctions.</li>
          <li>Your phone number is required for rental purposes and will not be shared with third parties.</li>
        </ul>
      </div>
      <label>
        <input 
          type="checkbox" 
          checked={agreement} 
          onChange={handleAgreementChange} 
        />
        I agree to the terms and conditions.
      </label>
      <button 
        onClick={handleStartRental} 
        disabled={!agreement} // Button is disabled until the terms are agreed
        style={{
          backgroundColor: agreement ? '#007bff' : '#cccccc', // Visual feedback on the button's state
          color: 'white',
          cursor: agreement ? 'pointer' : 'not-allowed'
        }}
      >
        Start Rental
      </button>
    </div>
  );
};

export default RentalAgreementPage;
