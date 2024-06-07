import React, { useEffect, useState } from 'react';

import ApiService from '../services/apiService';

const ExampleComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const apiUrl ='https://jsonplaceholder.typicode.com/todos/1'

  useEffect(() => {
    const fetchData = async () => {
      const result = await ApiService({ apiUrl, method: 'GET' });
      if (result.error) {
        setError(result.error);
      } else {
        setData(result);
      }
    };

    fetchData();
  }, [apiUrl]);

  console.log('Data:', data);
  return (
    <div>
      {error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <div>Data: {data ? JSON.stringify(data) : 'Loading...'}</div>
      )}
    </div>
  );
};

export default ExampleComponent;
