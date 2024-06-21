import React, { useState } from 'react';
import ApiService from '../services/apiService';
import '../assets/styles/Power_bankInfo.css';
const Power_bankInfo = () => {
    const [stationId, setStationId] = useState("");
    const [stationData, setStationData] = useState(null);
    const [error, setError] = useState('');

    const fetchStationInfo = async () => {
        try {
            const response = await ApiService({
                apiUrl: `/v1/station/${stationId}`, // Directly use stationId
            });
            setStationData(response);
            setError('');
        } catch (err) {
            setError(`Error: ${err.message}`);
            setStationData(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchStationInfo();
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <label>
                    Station ID:
                    <input 
                        type="text" 
                        value={stationId} 
                        onChange={(e) => setStationId(e.target.value)} 
                        required
                    />
                </label>
                <button type="submit">Get Station Info</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {stationData && (
                <div className="station-info">
                    <h3>Station Information</h3>
                    <div className="station-card">
                        <p><strong>IMEI:</strong> {stationData.imei}</p>
                        <p><strong>ICCID:</strong> {stationData.iccid || 'N/A'}</p>
                        <p><strong>Slot Number:</strong> {stationData.slot_num || 'N/A'}</p>
                    </div>

                    <h4>Batteries</h4>
                    <table className="batteries-table">
                        <thead>
                            <tr>
                                <th>Battery ID</th>
                                <th>Slot ID</th>
                                <th>Capacity</th>
                                <th>Lock Status</th>
                                <th>Battery Abnormal</th>
                                <th>Cable Abnormal</th>
                                <th>Contact Abnormal</th>
                                <th>SOH</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stationData.batteries.map((battery, index) => (
                                <tr key={index}>
                                    <td>{battery.battery_id}</td>
                                    <td>{battery.slot_id}</td>
                                    <td>{battery.battery_capacity}</td>
                                    <td>{battery.lock_status}</td>
                                    <td>{battery.battery_abnormal}</td>
                                    <td>{battery.cable_abnormal}</td>
                                    <td>{battery.contact_abnormal}</td>
                                    <td>{battery.soh}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Power_bankInfo;
