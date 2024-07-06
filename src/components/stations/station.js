// station.js
const stationNameMap = {
    'Barubax': 'WSEP161683346505',
    'Balack sea': 'WSEP161683346505',
};

const getStationCode = (stationName) => {
    return stationNameMap[stationName];
};

export default getStationCode;
