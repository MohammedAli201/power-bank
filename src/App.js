import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import ApiService from './services/apiService';
import DisplayOptions from './components/DisplayOptions';
import DisplayResults from './components/DisplayResults';

import Forms from './components/Forms';
import Home from './components/Home';
import EvcPayment from './services/EvcPayment';
import ExampleComponent from  './components/ExampleComponent'
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router,Route, Routes  } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import StationInfo from './components/Power_bankInfo';
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

        </Routes>
      </div>
    </Router>
      
    <Footer />
    </div>
  );
};



export default App;
