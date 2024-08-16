import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { createOrder, checkDummyAccount,checkLoginStatus } from '../../Services/userAccountApiService';
import { verifyUserWithTransaction } from '../../Services/paymentApiService';
// import {activateSessionBooking} from '../../Services/paymentApiService'
import { RAZORPAY_KEY_ID } from '../../Services/razorpayUtil';
import auth from '../../auth';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentPageComponent = () => {
    const navigate = useNavigate();
    const [selectedSession, setSelectedSession] = useState(null);
    const [amount, setAmount] = useState(null);
    const [dummyAcc, setDummyAcc] = useState(null);
    const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';
    const { transactionId } = useParams(); // Get transactionId from URL params
    const [accessDenied, setAccessDenied] = useState(false);

    // Load Razorpay script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Check if account is a dummy account
    useEffect(() => {
        const checkDummyAccountStatus = async () => {
            try {
                const token = auth.getToken();
                const response = await checkDummyAccount(token);
                if (response === true || response === 'true') {
                    setDummyAcc(1);
                } else {
                    setDummyAcc(0);
                }
            } catch (error) {
                setDummyAcc(0);
                console.error('Error checking dummy account status', error);
            }
        };
        checkDummyAccountStatus();
    }, []);


    useEffect(() => {
        const checkLoginStatusResponse = async () => {
            try {
                const token = auth.getToken();
                const response = await checkLoginStatus(token);
                if (response === true || response === 'true') {
                    return;
                } else {
                    const redirectUrl = window.location.pathname; // Get the current URL
                    navigate(`/login`, { state: { redirectUrl } }); // Pass object with redirectUrl
                }
            } catch (error) {
                console.error('Please login first', error);
                const redirectUrl = window.location.pathname;
                navigate(`/login`, { state: { redirectUrl } });
            }
        };
    
        const delayCheck = setTimeout(() => {
            checkLoginStatusResponse();
        }, 2000); // 2 second delay
    
        return () => clearTimeout(delayCheck); // Clean up the timeout if the component unmounts
    }, [navigate]);
    
    // CHECK IF THE SAME USER IS PAYING

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = auth.getToken();
                const isVerified = await verifyUserWithTransaction(transactionId, token);

                if (!isVerified) {
                    setAccessDenied(true);
                }
            } catch (error) {
                console.error('Error verifying user:', error);
                setAccessDenied(true);
            }
        };

        verifyUser();
    }, [transactionId]);

    if (accessDenied) {
        return <div className='text-center'>You do not have access</div>;
    }
    

    const handleSelectSession = (session) => {
        setSelectedSession(session);
        // Set amount for the session
        setAmount(session === '1-hour' ? 200 : session === '2-hour' ? 350 : null);
    };

    const paymentStart = async () => {
        const token = auth.getToken();
        if (amount == null || amount === '') {
            Swal.fire('Error', 'Error fetching session amount from the servers. Please try later.', 'error');
            return;
        }

        try {
            const sessionBooking = { sessionType: selectedSession };
            const response = await createOrder(sessionBooking, token);

            if (response && response.id && response.amount) {
                const { status, amount, id } = response;

                if (status === 'created') {
                    let options = {
                        key: RAZORPAY_KEY_ID,
                        amount: amount, // Ensure the amount is in paise
                        currency: 'INR',
                        name: 'GuidebookX',
                        description: 'Booking session payment',
                        image: `${BASE_URL}logoblack.jpg`,
                        order_id: id,
                        handler: async function (response) {
                            try {
                                const paymentDetails = {
                                    sessionPaymentId: response.razorpay_payment_id,
                                    sessionType: selectedSession,
                                    sessionRzpOrderId: response.razorpay_order_id
                                };
                                // await activateSessionBooking(paymentDetails, token);
                                Swal.fire('Success', 'Payment successful. Your session is booked!', 'success');
                            } catch (error) {
                                Swal.fire('Success', 'Payment was successful, but we could not capture your booking details. We will contact you soon.', 'warning');
                            }
                        },
                        prefill: {
                            name: '',
                            email: '',
                            contact: ''
                        },
                        notes: {
                            address: 'GuidebookX'
                        },
                        theme: {
                            color: '#3399cc'
                        }
                    };

                    var rzp = new window.Razorpay(options);
                    rzp.on('payment.failed', function (response) {
                        Swal.fire('Error', 'Oops, payment failed.', 'error');
                    });
                    rzp.open();
                } else {
                    console.error("Order creation failed or status is not 'created'");
                }
            } else {
                console.error('Response or response.data is undefined');
            }
        } catch (error) {
            console.error('Error creating order', error);
            Swal.fire('Error', 'Session already booked or you did not login', 'error');
        }
    };

    return (
        <div className="payment-container">
            <h2>Book a Session</h2>
            <div className="session-cards">
                <div 
                    className={`session-card ${selectedSession === '1-hour' ? 'selected' : ''}`} 
                    onClick={() => handleSelectSession('1-hour')}
                >
                    <h3>1 Hour Session</h3>
                    <p>₹200/hour</p>
                    <p className="availability">Available</p>
                </div>
                <div 
                    className={`session-card ${selectedSession === '2-hour' ? 'selected' : ''}`} 
                    onClick={() => handleSelectSession('2-hour')}
                >
                    <h3>2 Hour Session</h3>
                    <p>₹350/session</p>
                    <p className="availability">Available</p>
                </div>
            </div>
            {dummyAcc === 1 && (
                <button 
                    id="rzp-button1" 
                    className={`checkout-button ${selectedSession ? 'active' : ''}`} 
                    onClick={paymentStart} 
                    disabled={!selectedSession}
                >
                    Checkout
                </button>
            )}
        </div>
    );
};

export default PaymentPageComponent;
