// paymentService.js
export const savePayment = async (paymentURL, newData) => {
    const response = await fetch(paymentURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    
    if (!response.ok) throw new Error('Failed to save payment information');
    
    return await response.json();
  };
  
  export const evcPaymentRequest = async (data, paymentRequestUrl) => {
    const response = await fetch(paymentRequestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) throw new Error('Failed to make payment request');
  
    return await response.json();
  };
  