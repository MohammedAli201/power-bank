import React,{useState} from 'react';
import ApiService from '../services/apiService';
import Station from './stations/station';

const ReleaseBattery = (props) => {
 // Unlock slot battery
    const [unlock, setUnlock] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
   
    const [stationId, setStationId] = useState("");
    const [stationData, setStationData] = useState(null);

    const fetchStationInfo = async () => {
        try {
            const response = await ApiService({
                apiUrl: `/v1/station/${Station({ stationName: stationId })}`,
            });
            setStationData(response);
            setSuccess(true)
            setError('');
        } catch (err) {
            setError(`Error: ${err.message}`);
            setStationData(null);
        }
    };

    const unlockBattery = async () => {
        // First find all batteries in the station
        const batteries = stationData.map((battery) => {
            // find the battery that is locked
            if (battery.locked && battery.) {
                return battery;
            }
        });

        try {
            const response = await ApiService({
                apiUrl: `/v1/station/${Station({ stationName: stationId })}/unlock`,
                method: 'POST',
            });
            setUnlock(true);
            setError('');
        } catch (err) {
            setError(`Error: ${err.message}`);
            setUnlock(false);
        }
    }



        fetchStationInfo();
    
    return success?"Battery Released Successfully":error?"Error Releasing Battery":"Please Release Battery";


  
}

export default ReleaseBattery;
