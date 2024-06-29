import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import DisplayOptions from './components/ServiceBooking';
import DisplayResults from './components/BookingConfirmation';

import EvcPayment from './services/PaymentProcessing';

import Dashboard from './components/Dashboard';
import { BrowserRouter as Router,Route, Routes  } from 'react-router-dom';
import Footer from './components/page/Footer';
import MainPage from './components/page/MainPage';
import StationInfo from './components/StationInfo';
import ProfileBusiness from './components/page/ProfileBusiness';
const App = () => {
const [completForm, setcompletForm] = useState(false);
const [conformation,setConformation] = useState(false);

const completedForm = (data) => {
    setcompletForm(true);
  };
  const conformationForm = (data) => {
    setConformation(true);
  }

  return (
    <div className='App'>
      <Router>
        {/* <Header/> */}
      <div>
      {/* <nav>
        <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/DisplayOptions">Display Option</a></li>
                        
                    </ul>
                </nav> */}
        <Routes>

          <Route path="/" element={<MainPage />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="/DisplayOptions" element={  <DisplayOptions  completedForm = {completedForm}/>} />
          <Route path="/DisplayResults" element={completForm &&<DisplayResults conformationForm ={conformationForm} />} />
          <Route path="/EvcPayment" element={conformation&&<EvcPayment />} />
          
          {/* <Route path="/ExampleComponent" element={<ExampleComponent />} /> */}
          {/* <Route path="/ApiService" element={<ApiService />} /> */}
          <Route path="/stationInfo" element={<StationInfo />} />
          <Route path="/profileBusiness" element={<ProfileBusiness />} />

        </Routes>
      </div>
    </Router>
      
    <Footer />
    </div>
  );
};



export default App;
