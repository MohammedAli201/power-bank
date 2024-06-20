import React from 'react';

const Station = ({stationName}) => {
    const stationNameMap = {
        'Barubax': 'WSEP161683346505',
        'Balack sea': 'WSEP161683346505',
    };

    return stationNameMap[stationName];
   
}

export default Station;
