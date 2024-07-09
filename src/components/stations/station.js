// station.js
const stationNameMap = {
    'barubax': 'WSEP161683346505',
    'balack sea': 'WSEP161683346505',
};

const getStationCode = (stationName) => {
    return stationNameMap[stationName];
};

export default getStationCode;
