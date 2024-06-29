import React from 'react';

import '../../assets/styles/ProfileBusiness.css';


const ProfileBusiness = () => {
    return (
        <div className="profile-business-card">
            <h1>PowerBank Rental Services</h1>
            <p className="intro">
                PowerBank Rental Services offers convenient and reliable power bank solutions for your mobile charging needs. Whether you're a traveler, commuter, or simply on the go, we ensure you stay connected.
            </p>
            <div className="section">
                <h2>Company Overview</h2>
                <p>
                    Founded in [Year], PowerBank Rental Services is committed to providing seamless and efficient power bank rental services. Our mission is to ensure that no one has to worry about their devices running out of battery while on the move.
                </p>
            </div>
            <div className="section">
                <h2>Products and Services</h2>
                <ul>
                    <li><strong>Power Bank Rental:</strong> Rent high-capacity power banks by the hour.</li>
                    <li><strong>Flexible Payment:</strong> Pay only for the hours you need.</li>
                    <li><strong>On-Time Return:</strong> Return the power bank on time to avoid additional charges.</li>
                    <li><strong>Late Return Policy:</strong> A $30 fee applies for late returns.</li>
                </ul>
            </div>
            <div className="section">
                <h2>Target Audience</h2>
                <p>
                    Our services cater to travelers, commuters, students, and anyone in need of a reliable power source on the go.
                </p>
            </div>
            <div className="section">
                <h2>Key Personnel</h2>
                <p>
                    <strong>[Founder/CEO Name]:</strong> [Brief bio and role]
                    <br />
                    <strong>[CTO Name]:</strong> [Brief bio and role]
                </p>
            </div>
            <div className="section">
                <h2>Achievements and Milestones</h2>
                <p>
                    Since our inception, we have served over [Number] customers, with a satisfaction rate of [Percentage]%. Our network has expanded to [Number] locations across [Region/Country].
                </p>
            </div>
            <div className="section">
                <h2>Financial Overview</h2>
                <p>
                    [Include basic financial information or performance metrics relevant to your context, e.g., revenue growth, profitability, etc.]
                </p>
            </div>
            <div className="section">
                <h2>Contact Information</h2>
                <p>
                    For inquiries and rentals, please contact us:
                    <br />
                    <strong>Phone:</strong> 0616251068
                    <br />
                    <strong>Email:</strong> maa@danabpowerbank.com
                    <br />
                    <strong>Address:</strong> Black Sea
                </p>
            </div>
        </div>
    );
}

export default ProfileBusiness;
