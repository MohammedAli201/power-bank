const ApiService = async ({ apiUrl, method = 'GET', body = null, headers = {} }) => {
    const apiKey = process.env.REACT_APP_API_KEY_POWER_BANK;
    console.log('API Service Request:', apiUrl, method, body, headers);
  
    try {
      // Initialize the fetch options
      const options = {
        method,
        headers: {
          'Authorization': `Basic ${btoa(apiKey + ':')}`,
          ...headers,
        }
      };
  
      // Handle FormData or JSON body
      if (body) {
        if (body instanceof FormData) {
          options.body = body; // FormData handles its own content type
        } else {
          options.headers['Content-Type'] = 'application/json';
          options.body = JSON.stringify(body); // Assume JSON if not FormData
        }
      }
  
      const response = await fetch(`/api${apiUrl}`, options);
      console.log('API Service Response:', response);
  
      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        if (response.status === 402) {
          errorMessage = 'Payment required: Please check your subscription or payment plan.';
        } else if (response.status === 400) {
          const errorData = await response.json();
          errorMessage = `Bad Request: ${errorData.message || response.statusText}`;
        }
        console.error('API Service Error:', errorMessage);
        throw new Error(errorMessage);
      }
  
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        return data;
      } else {
        return response;
      }
    } catch (error) {
      console.error('Error with API request:', error);
      throw error;
    }
   
  };
  
  export default ApiService;
  