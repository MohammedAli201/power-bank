// station.js
const stationNameMap = {
    'castello': 'WSEP161721195358',
    'balack sea': 'WSEP161683346505',
};

const getStationCode = (stationName) => {
    return stationNameMap[stationName];
};

export default getStationCode;
