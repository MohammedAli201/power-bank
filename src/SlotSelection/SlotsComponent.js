import { useEffect, useState } from 'react';
import ServiceTimer from '../services/ServiceTimer';
import ApiService from '../services/apiService';

const SlotsComponent = () => {
  const [unlockStatus, setUnlockStatus] = useState('success');
  const [paymentIsSucceeded, setPaymentIsSucceeded] = useState(true);
  const stationId = 'WSEP161683346505';

  useEffect(() => {
    // const selectedSlot = selectSlot(slots);
    // if (selectedSlot) {
    //   forceUnlock(1);
    // }
    const slotId = 3;
    forceUnlock(slotId);

  }, []); // Adding slots as dependency

  const selectSlot = (slots) => {
    // Criteria: Select the first locked slot
    return slots.find(slot => slot.lock_status === "1");
  };

  // const unlockSlot = async (slotId=3) => {
  //   const formData = new FormData();
  //   formData.append('slot_id', slotId);
  //   try {
  //     const response = await ApiService({
  //       apiUrl: `/v1/station/${stationId}/forceUnlock`,
  //       method: 'POST',
  //       body: formData, // Correcting the body format
  //     });

  //     console.log("Response", response.status);

  //     if (response.ok) {
  //     console.log("Response", response.status);
  //       setUnlockStatus('success');
  //     } else {
  //       setUnlockStatus('error');
  //     }
  //   } catch (error) {
  //     console.error('Error unlocking slot:', error);
  //     setUnlockStatus('error');
  //   }
  // };
  const forceUnlock = async (slotId) => {

    const formData = new FormData();
  formData.append('slot_id', 3);
    try {
      const response = await fetch(`http://localhost:9000/api/v1/stations/${stationId}/forceUnlock`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log("Data is arrived with using multer",data); 
    } catch (error) {
      console.error('Error with force unlock:', error);
    }
  };
  return (
    <div>
      {/* {unlockStatus && <ServiceTimer paymentIsSucceeded={paymentIsSucceeded} />}
      {unlockStatus === 'error' && <p>Failed to unlock slot.</p>} */}
      <ServiceTimer paymentIsSucceeded={paymentIsSucceeded} />
    </div>
  );
};

export default SlotsComponent;
