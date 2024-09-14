// stationService.js
export const fetchStationData = async (apiBaseUrl, stationName) => {
    const response = await fetch(`${apiBaseUrl}${stationName}`, {
      method: 'GET',
    });
  
    if (!response.ok) throw new Error('Failed to fetch station information');
  
    return await response.json();
  };
  
  export const forceUnlock = async (apiBaseUrl, stationName, slot_id) => {
    const response = await fetch(`${apiBaseUrl}${stationName}/forceUnlock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stationName, slot_id }),
    });
  
    if (!response.ok) throw new Error('Failed to force unlock');
  
    return await response.json();
  };
  