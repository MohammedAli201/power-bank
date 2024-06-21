import { useEffect, useState } from 'react';
import ServiceTimer from '../services/ServiceTimer';
import ApiService from '../services/apiService';

const SlotsComponent = ({ slots, paymentIsSucceeded }) => {
  const [unlockStatus, setUnlockStatus] = useState(null);
  const stationId = 'WSEP161683346505';

  useEffect(() => {
    const selectedSlot = selectSlot(slots);
    if (selectedSlot) {
      unlockSlot(selectedSlot.slot_id);
    }
  }, [slots]); // Adding slots as dependency

  const selectSlot = (slots) => {
    // Criteria: Select the first locked slot
    return slots.find(slot => slot.lock_status === "1");
  };

  const unlockSlot = async (slotId=3) => {
    const formData = new FormData();
    formData.append('slot_id', slotId);
    try {
      const response = await ApiService({
        apiUrl: `/v1/station/${stationId}/forceUnlock`,
        method: 'POST',
        body: formData, // Correcting the body format
      });

      console.log("Response", response.status);

      if (response.ok) {
      console.log("Response", response.status);
        setUnlockStatus('success');
      } else {
        setUnlockStatus('error');
      }
    } catch (error) {
      console.error('Error unlocking slot:', error);
      setUnlockStatus('error');
    }
  };

  return (
    <div>
      {unlockStatus && <ServiceTimer paymentIsSucceeded={paymentIsSucceeded} />}
      {unlockStatus === 'error' && <p>Failed to unlock slot.</p>}
    </div>
  );
};

export default SlotsComponent;
