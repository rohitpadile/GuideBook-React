import React, { useState } from 'react';
import '../../css/profileAccount/SubscriptionComponentCss.css';

const SubscriptionComponent = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
    };

    const handleCheckout = () => {
        // Logic to send request to backend for the selected plan
        // This will be filled later
    };

    return (
        <div className="subscription-container">
            <h2>Subscription Plan</h2>
            <div className="subscription-cards">
                <div 
                    className={`subscription-card ${selectedPlan === 'monthly' ? 'selected' : ''}`} 
                    onClick={() => handleSelectPlan('monthly')}
                >
                    <h3>Monthly Subscription</h3>
                    <p>₹20/month</p>
                    <p className="availability">Available</p>
                </div>
                <div 
                    className={`subscription-card unavailable ${selectedPlan === 'yearly' ? 'selected' : ''}`} 
                    onClick={() => handleSelectPlan('yearly')}
                >
                    <h3>Yearly Subscription</h3>
                    <p>Not Available</p>
                </div>
            </div>
            <button 
                className={`checkout-button ${selectedPlan ? 'active' : ''}`} 
                onClick={handleCheckout} 
                disabled={!selectedPlan}
            >
                Checkout
            </button>
        </div>
    );
};

export default SubscriptionComponent;
