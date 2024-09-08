import config from "../config/config";

const SMS_URL = `http://localhost:9000/api/v1/sms/SendNotification`;

const SmsLetter = ({ rent, type }) => {
    console.log('Rent data:', rent);

    function formatTime(isoString) {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }

    // Create the message based on the type (e.g., 'createRent', 'completedRent', or 'graceTime')
    const createRentMessage = () => {
        return `Asc, Walal wad kumahadsantahy inaad kiresaty powerbank. Sacad kirada waxe kabilaabanesa ${formatTime(rent.formattedStartTime)} waxeyna ku ektahay ${formatTime(rent.formattedEndTime)}.`;
    };

    const completedRentMessage = () => {
        return `Asc, Walal waqtiga kiresiga wa ku dhamaaday,adu mahadsan powerbank dib uso celi.`;
    };

    const graceTimeMessage = () => {
        const cost = 30;
        return `Asc, Walal waqtiga kiresiga wa ku dhamaaday, 15 daqiiqo dheradka ahan wad dhaaftay. Hada dib loso celin waxa lagugu so dalacin dona ${cost} $.`;
    };

    // Determine which message to use based on the type
    const getMessage = () => {
        switch (type) {
            case 'createRent':
                return createRentMessage();
            case 'completedRent':
                return completedRentMessage();
            case 'graceTime':
                return graceTimeMessage();
            default:
                return 'Invalid message type';
        }
    };

    // Async function to send the SMS
    const sendSms = async () => {
        const message = getMessage();
        const mobile = rent.phones;
        const senderid = "DANAB PowerBank";
        const sms_data = { message, mobile, senderid };

        console.log('Sending SMS data:', sms_data); // Log the data being sent

        try {
            const response = await fetch(SMS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sms_data), // Sending the actual SMS data
            });

            if (!response.ok) {
                throw new Error('Failed to send SMS');
            }

            const data = await response.json();
            console.log('SMS API response:', data);
            return data;
        } catch (error) {
            console.error('Error sending SMS:', error);
            throw error;
        }
    };

    return sendSms;
};

export default SmsLetter;
