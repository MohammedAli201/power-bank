import React from 'react';
import "../assets/styles/Footer.css"; // Ensure to link your CSS file

const Footer = () => {
    return (
        <div className="footer-container">
            <footer className="footer-content">
                <div className="footer-row">
                   
                    <div className="footer-column">
                        <h3>COMPANY NAME</h3>
                        <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                    <div className="footer-column">
                        <h3>PRODUCTS</h3>
                        <ul>
                            <li>Angular</li>
                            <li>React</li>
                            <li>Vue</li>
                            <li>Laravel</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>USEFUL LINKS</h3>
                        <ul>
                            <li>Pricing</li>
                            <li>Settings</li>
                            <li>Orders</li>
                            <li>Help</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>CONTACT</h3>
                        <p>Muqdisho, Xamar Weyne, Somalia</p>
                        <p>PowerBank@gmail.com</p>
                        <p>+ 252615738865</p>
                        <p>+ 25261575654</p>
                    </div>

                    <div className="footer-column">
                      
                        <p>&copy; 2024 - All rights reserved</p>
                    </div>
                </div>
                
            </footer>
            
        </div>
    );
};

export default Footer;
