import React, { useState, useRef } from 'react';
import '../assets/styles/StationInfo.css';
import config from '../config/config';
import getStationCode from './stations/station';
import ReCAPTCHA from 'react-google-recaptcha';

const StationInfo = () => {
    const [stationId, setStationId] = useState("");
    const [stationData, setStationData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const recaptchaRef = useRef();
    const SITE_KEY = "6LeMvQsqAAAAAEKEDynagBFxxmqDZeXF1BhcAE77";

    const verifyRecaptcha = async (token) => {
        if (recaptchaRef.current.getValue()) {
            setCaptchaVerified(true);
        } else {
            setCaptchaVerified(false);
            alert('Please verify the reCAPTCHA!');
        }
    };

    const fetchStationInfo = async () => {
        if (!stationId) {
            setError('Please enter a station ID');
            return;
        }
        setError('');
        setIsLoading(true);
        const id = getStationCode(stationId);
        try {
            const response = await fetch(`${config.URL}api/v1/stations/powerBankRouter/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStationData(data);
        } catch (err) {
            setError(`Error: ${err.message}`);
            setStationData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaVerified) {
            alert('Please verify the reCAPTCHA!');
            return;
        }
        await fetchStationInfo();
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
           
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={SITE_KEY}
                    onChange={verifyRecaptcha}
                />
                <button type="submit" disabled={!captchaVerified || isLoading}>
                    {isLoading ? 'Loading...' : 'Get Station Info'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {stationData && (
                <div className="station-info">
                    <h3>Station Information</h3>
                    <div className="station-card">
                        <p><strong>IMEI:</strong> {stationData.imei || 'N/A'}</p>
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
                            {stationData.batteries && stationData.batteries.length > 0 ? (
                                stationData.batteries.map((battery, index) => (
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No batteries found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StationInfo;
