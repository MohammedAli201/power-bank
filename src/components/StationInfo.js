import React, { useState } from 'react';
import '../assets/styles/StationInfo.css';
import config from '../config/config';
import getStationCode from './stations/station';
import ReCAPTCHA from 'react-google-recaptcha'
// import ReCAPTCHA from 'react-google-recaptcha'


const StationInfo = () => {
    const [stationId, setStationId] = useState("");
    const [stationData, setStationData] = useState(null);
    const [error, setError] = useState('');

    const fetchStationInfo = async () => {
        if (!stationId) {
            setError('Please enter a station ID');
            return;
        }
        const id = getStationCode(stationId);
        try {
            const response = await fetch(`${config.URL}api/v1/stations/powerBankRouter/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // Convert response to JSON
            setStationData(data);
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
            <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} />
        </div>
    );
};

export default StationInfo;
// import React, { useState } from 'react';
// import '../assets/styles/StationInfo.css';
// import config from '../config/config';
// import getStationCode from './stations/station';
// // import ReCAPTCHAComponent from '../hooks/ReCAPTCHAComponent';
// import ReCAPTCHA from 'react-google-recaptcha'


// import React, { useState } from 'react';
// import '../assets/styles/StationInfo.css';
// import config from '../config/config';
// import getStationCode from './stations/station';
// import ReCAPTCHAComponent from './ReCAPTCHAComponent'; // Ensure this is the correct path

// const StationInfo = () => {
//     const [stationId, setStationId] = useState("");
//     const [stationData, setStationData] = useState(null);
//     // const [recaptchaToken, setRecaptchaToken] = useState(null);
//     const [error, setError] = useState('');

//     const fetchStationInfo = async () => {
//         if (!stationId) {
//             setError('Please enter a station ID');
//             return;
//         }
//         if (!recaptchaToken) {
//             setError('Please complete the reCAPTCHA');
//             return;
//         }
//         const id = getStationCode(stationId);
//         try {
//             const response = await fetch(`${config.URL}api/v1/stations/powerBankRouter/${id}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${recaptchaToken}`
//                 }
//             });
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setStationData(data);
//             setError('');
//         } catch (err) {
//             setError(`Error: ${err.message}`);
//             setStationData(null);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         fetchStationInfo();
//     };

//     return (
//         <div className="container">
//             <form onSubmit={handleSubmit} className="form">
//                 <label>
//                     Station ID:
//                     <input 
//                         type="text" 
//                         value={stationId} 
//                         onChange={(e) => setStationId(e.target.value)} 
//                         required
//                     />
//                 </label>
//                 <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} />

//                 <button type="submit">Get Station Info</button>
//             </form>

//             {error && <p style={{ color: 'red' }}>{error}</p>}

//             {stationData && (
//                 <div className="station-info">
//                     <h3>Station Information</h3>
//                     <div className="station-card">
//                         <p><strong>IMEI:</strong> {stationData.imei || 'N/A'}</p>
//                         <p><strong>ICCID:</strong> {stationData.iccid || 'N/A'}</p>
//                         <p><strong>Slot Number:</strong> {stationData.slot_num || 'N/A'}</p>
//                     </div>

//                     <h4>Batteries</h4>
//                     <table className="batteries-table">
//                         <thead>
//                             <tr>
//                                 <th>Battery ID</th>
//                                 <th>Slot ID</th>
//                                 <th>Capacity</th>
//                                 <th>Lock Status</th>
//                                 <th>Battery Abnormal</th>
//                                 <th>Cable Abnormal</th>
//                                 <th>Contact Abnormal</th>
//                                 <th>SOH</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {stationData.batteries && stationData.batteries.length > 0 ? (
//                                 stationData.batteries.map((battery, index) => (
//                                     <tr key={index}>
//                                         <td>{battery.battery_id}</td>
//                                         <td>{battery.slot_id}</td>
//                                         <td>{battery.battery_capacity}</td>
//                                         <td>{battery.lock_status}</td>
//                                         <td>{battery.battery_abnormal}</td>
//                                         <td>{battery.cable_abnormal}</td>
//                                         <td>{battery.contact_abnormal}</td>
//                                         <td>{battery.soh}</td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="8">No batteries found.</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default StationInfo;

