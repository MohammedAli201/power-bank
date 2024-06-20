const ApiService = async ({ apiUrl, method = 'GET', body = null, headers = {} }) => {
  const apiKey = process.env.REACT_APP_API_KEY_POWER_BANK;
  console.log('API Service:', apiUrl, method, body, headers);

  try {
      const response = await fetch(`/api${apiUrl}`, {
          method,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${btoa(apiKey + ':')}`, // Base64 encode API key for basic auth
              ...headers,
          },
          body: method !== 'GET' && body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
          let errorMessage = `HTTP error! Status: ${response.status}`;
          if (response.status === 402) {
              errorMessage = 'Payment required: Please check your subscription or payment plan.';
          }
          console.log('API Service Error:', response);
          throw new Error(response);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          return data;
      } else {
          return {};
      }
  } catch (error) {
      console.error('Error with API request:', error);
      throw error;
  }
};

export default ApiService;
