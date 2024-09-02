import moment from 'moment-timezone';

const AfricTime = () => {
    // This will get the current time in Africa /moqadishu
    // It will also get the current time in Africa /lagos
    const  moqadishuTime = moment.tz("Africa/Mogadishu").format();
    return  moqadishuTime;
    
    }


export default AfricTime;
