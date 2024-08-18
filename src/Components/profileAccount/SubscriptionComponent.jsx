import React, { useEffect, useState } from 'react';
import '../../css/profileAccount/SubscriptionComponentCss.css';
import { createOrder, getSubscriptionAmount, activateSubscription,checkDummyAccount } from '../../Services/userAccountApiService';
import { RAZORPAY_KEY_ID_LIVE } from '../../Services/razorpayUtil';
import auth from '../../auth';
import Swal from 'sweetalert2';

const SubscriptionComponent = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [amount, setAmount] = useState(null);
    const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';
    const [dummyAcc, setDummyAcc] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const checkDummyAccountStatus = async () => {
            try {
                const token = auth.getToken();
                const response = await checkDummyAccount(token);
                // console.log('Check Dummy Account Response:', response); // Add this to see the API response
                if (response === true || response === 'true') {
                setDummyAcc(1);
                } else {
                setDummyAcc(0);
                }
                
            } catch (error) {
                setDummyAcc(0);
                // console.error('Account not a dummy account!', error);
            }
        };
        checkDummyAccountStatus();
    });

    const handleSelectPlan = async (plan) => {
        setSelectedPlan(plan);
        try {
            const subscriptionPlan = { subscriptionPlan: plan };
            const response = await getSubscriptionAmount(subscriptionPlan);
            if (response && response.subAmount) {
                setAmount(response.subAmount);
            } else {
                console.error("subAmount is undefined or missing in the response");
            }
        } catch (error) {
            // console.log("Cannot get subscription amount.", error);
            // throw error;
        }
    };

    const paymentStart = async () => {
        const token = auth.getToken();
        if (amount == null || amount === "") {
            Swal.fire('Error', 'Error fetching subscription amount from the servers. Please try later.', 'error');
            return;
        }

        try {
            const subscriptionOrder = { subscriptionPlan: selectedPlan };
            const response = await createOrder(subscriptionOrder, token);

            if (response && response.id && response.amount) {
                const { status, amount, id } = response;

                if (status === "created") {
                    let options = {
                        key: RAZORPAY_KEY_ID_LIVE,
                        amount: amount, // Ensure the amount is in paise
                        currency: 'INR',
                        name: 'GuidebookX',
                        description: 'Activating subscription plan',
                        image: `${BASE_URL}logoblack.jpg`,
                        order_id: id,
                        handler: async function (response) {
                            try {
                                const paymentDetails = {
                                    subscriptionPaymentId: response.razorpay_payment_id,
                                    subPlan: selectedPlan,
                                    subscriptionRzpOrderId: response.razorpay_order_id
                                };
                                await activateSubscription(paymentDetails, token);
                                Swal.fire('Success', 'Payment successful. Your subscription is activated!', 'success');
                            } catch (error) {
                                // console.error('Error sending payment success', error);
                                Swal.fire('Success', 'Payment was successful, but we could not capture your details. We will contact you soon.', 'warning');
                            }
                        },
                        prefill: {
                            name: "",
                            email: "",
                            contact: ""
                        },
                        notes: {
                            address: "GuidebookX"
                        },
                        theme: {
                            color: "#3399cc"
                        }
                    };

                    var rzp = new window.Razorpay(options);
                    rzp.on('payment.failed', function (response) {
                        console.log(response.error.code);
                        // console.log(response.error.description);
                        // console.log(response.error.source);
                        // console.log(response.error.step);
                        // console.log(response.error.reason);
                        // console.log(response.error.metadata.order_id);
                        // console.log(response.error.metadata.payment_id);
                        Swal.fire('Error', 'Oops, payment failed.', 'error');
                    });
                    rzp.open();
                } else {
                    console.error("Order creation failed or status is not 'created'");
                }
            } else {
                console.error("Response or response.data is undefined");
            }
        } catch (error) {
            console.error('Error creating order', error);
            Swal.fire('Error', 'Subscription already active or you did not login', 'error');
            // throw error;
        }
    };

    return (
        <div className="subscription-container">
            <h2 style={{ color: 'white' }}>Subscription Plan</h2>
            <div className="subscription-cards">
                <div 
                    className={`subscription-card ${selectedPlan === 'monthly' ? 'selected' : ''}`} 
                    onClick={() => handleSelectPlan('monthly')}
                >
                    <h3>Monthly Subscription</h3>
                    {/* <p>₹20/month</p> */}
                    <p className="availability">Not Available</p>
                </div>
                <div 
                    className={`subscription-card unavailable ${selectedPlan === 'yearly' ? 'selected' : ''}`} 
                    onClick={() => handleSelectPlan('yearly')}
                >
                    <h3>Yearly Subscription</h3>
                    <p>Not Available</p>
                </div>
            </div>
            {dummyAcc === 1 && (
                <button 
                    id="rzp-button1" 
                    className={`checkout-button ${selectedPlan ? 'active' : ''}`} 
                    onClick={paymentStart} 
                    disabled={!selectedPlan}
                >
                    Checkout
                </button>
            )}
            
        </div>
    );
};

export default SubscriptionComponent;
