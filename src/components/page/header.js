import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import '../assets/styles/main.css';
import logo from '../assets/images/Power.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="logo" className="logo-img" width={200} height={200} />
                </div>
              
                <div className="menu-icon" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
