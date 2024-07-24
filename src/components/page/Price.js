import React from 'react';

import '../../assets/styles/Price.css';

const Price = () => {
    const pricingData = [
        { hours: 1, cost: 0.5 },
        { hours: 2, cost: 1.0 },
        { hours: 3, cost: 1.5 },
        { hours: 4, cost: 2.0 },
        { hours: 5, cost: 2.5 },
    ];

    return (
        <div className="price-container">
            <h1 className="price-title">Pricing</h1>
            <table className="price-table">
                <thead>
                    <tr>
                        <th>Hours</th>
                        <th>Cost (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {pricingData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.hours}</td>
                            <td>{item.cost.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Price;
