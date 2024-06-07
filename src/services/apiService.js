const ApiService = async ({ apiUrl, method = 'GET', body = null }) => {
  try {
    const response = await fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method !== 'GET' && body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Return the data directly
  } catch (error) {
    console.error('Error with API request:', error);
    return { error: error.message }; // Return an object with the error message
  }
};

export default ApiService;
