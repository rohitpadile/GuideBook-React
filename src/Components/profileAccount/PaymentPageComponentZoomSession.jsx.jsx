import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { createOrder, checkDummyAccount, checkLoginStatus ,sendFinalConfirmationEmails,checkIsSubscriptionActive} from '../../Services/userAccountApiService';
import { verifyUserWithTransaction, createPaymentOrderZoomSession , paymentSuccessForZoomSession} from '../../Services/paymentApiService';
import { RAZORPAY_KEY_ID } from '../../Services/razorpayUtil';
import auth from '../../auth';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/profileAccount/PaymentPageComponentZoomSessionCss.css';
import { checkCancellationStatusViaTransactionId } from '../../Services/zoomSessionService';

const PaymentPageComponentZoomSession = () => {
    const navigate = useNavigate();
    const [dummyAcc, setDummyAcc] = useState(null);
    const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';
    const { transactionId } = useParams();  // Get transactionId from URL params
    const [accessDenied, setAccessDenied] = useState(false);
    const [sessionDetails, setSessionDetails] = useState(null);
    const [isSubscriptionActive, setIsSubscriptionActive] = useState(null);
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
                setDummyAcc(response === true || response === 'true' ? 1 : 0);
            } catch (error) {
                setDummyAcc(0);
                console.error('Error checking dummy account status', error);
            }
        };
        checkDummyAccountStatus();
    }, []);

    // Check login status
    useEffect(() => {
        const checkLoginStatusResponse = async () => {
            try {
                const token = auth.getToken();
                const response = await checkLoginStatus(token);
                if (response !== true && response !== 'true') {
                    const redirectUrl = window.location.pathname;  // Get the current URL
                    navigate(`/login`, { state: { redirectUrl } });
                }
            } catch (error) {
                console.error('Please login first', error);
                const redirectUrl = window.location.pathname;
                navigate(`/login`, { state: { redirectUrl } });
            }
        };

        const delayCheck = setTimeout(() => {
            checkLoginStatusResponse();
        }, 2000);

        return () => clearTimeout(delayCheck);
    }, [navigate]);

    // Check subscription status
    useEffect(() => {
        const checkSubscriptionStatus = async () => {
            try {
                const token = auth.getToken();
                const response = await checkIsSubscriptionActive(token);

                if (response.status === 200) {
                    setIsSubscriptionActive(1);  // Subscription active
                    
                } else {
                    setIsSubscriptionActive(0);  // Subscription inactive
                }
            } catch (error) {
                console.error('Error checking subscription status', error);
                setIsSubscriptionActive(0);  // Default to inactive on error
            }
        };
        
        checkSubscriptionStatus();
    }, []);


    // Check cancellation status via transaction ID
    useEffect(() => {
        const checkStatus = async () => {
            console.log('Checking cancellation status for transactionId:', transactionId);
            const response = await checkCancellationStatusViaTransactionId(transactionId);
            console.log('Cancellation status response:', response);
            if (response.status === 1 || response.status === 2) {
                setAccessDenied(true);
                navigate("/home")
            }
        };
    
        checkStatus();
    }, [transactionId]);
    

    // Verify user with transaction and fetch session details
    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = auth.getToken();
                const response = await verifyUserWithTransaction(transactionId, token);

                if (response) {
                    setSessionDetails(response);  // Store the session details from DTO
                } else {
                    setAccessDenied(true);
                }
            } catch (error) {
                console.error('Error verifying user:', error);
                setAccessDenied(true);
            }
        };
        verifyUser();
    }, [transactionId]);

    const handleSendFinalConfirmationEmail = async () => {
        try {
            const token = auth.getToken();
    
            // Show Swal popup informing the user not to refresh the page
            Swal.fire({
                title: 'Processing',
                text: 'Please do not refresh the page while we process your confirmation.',
                icon: 'info',
                showConfirmButton: false,
                allowOutsideClick: false,
            });
    
            const response = await sendFinalConfirmationEmails(transactionId, token);  // Make GET request to backend
            console.log(response);
            
            if (response.status === 202) {
                // Show Swal popup with a success message
                Swal.fire('Success', 'Session Booked!', 'success');
                
                // Wait 1 second, then refresh the page
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                Swal.fire('Error', 'Failed to send email. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error sending final confirmation email:', error);
            Swal.fire('Error', 'An error occurred. Please try again.', 'error');
        }
    };
    
    

    if (accessDenied) {
        return <div className='text-center'>You do not have access</div>;
    }

    const paymentStart = async () => {
        const token = auth.getToken();
        try {
            const sessionBooking = { zoomSessionTransactionId: transactionId };
            console.log("Session Booking DTO:", sessionBooking);  // Check DTO
            const response = await createPaymentOrderZoomSession(sessionBooking, token);

            if (response && response.id && response.amount) {
                const { status, amount, id } = response;

                if (status === 'created') {
                    let options = {
                        key: RAZORPAY_KEY_ID,
                        amount: amount,  // Ensure the amount is in paise
                        currency: 'INR',
                        name: 'GuidebookX',
                        description: 'Booking session payment',
                        image: `${BASE_URL}logowhitetransparent.jpg`,
                        order_id: id,
                        handler: async function (response) {
                            try {
                                const paymentDetails = {
                                    paymentId: response.razorpay_payment_id,
                                    zoomSessionTransactionId: transactionId
                                };
                                Swal.fire({
                                    title: 'Processing',
                                    text: 'Please do not refresh the page while we process your confirmation.',
                                    icon: 'info',
                                    showConfirmButton: false,
                                    allowOutsideClick: false,
                                });

                                await paymentSuccessForZoomSession(paymentDetails, token);
                                Swal.fire('Success', 'Payment successful. Your session is booked!', 'success');
                                setTimeout(() => {
                                    window.location.reload();
                                }, 2000);
                            } catch (error) {
                                Swal.fire('Success', 'Payment was successful, but we could not capture your booking details. Please contact us at Helpdesk urgently.', 'warning');
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
                console.error('Response or response.data is undefined');
            }
        } catch (error) {
            console.error('Error creating order', error);
            Swal.fire('Error', 'Session already booked or you did not login', 'error');
        }
    };

    return (
        <div className="payment-container">
            <h2>Confirm Your Session</h2>
            {sessionDetails ? (
                <div>
                    <p><strong>Mentor Name:</strong> {sessionDetails.studentMentorName}</p>
                    <p><strong>Session Duration:</strong> {sessionDetails.zoomSessionDurationInMin} minutes</p>
                    <p><strong>Booking Status:</strong> {sessionDetails.zoomSessionBookStatus}</p>
                    
                </div>
            ) : (
                    <img src={`${BASE_URL}logoblack.jpg`} alt="GuidebookX" className="loading-logo" />
            )}
                <button 
                    id="rzp-button1" 
                    className="checkout-button active" 
                    onClick={paymentStart}
                    disabled={isSubscriptionActive === 1}
                >
                    Checkout
                </button>

                {/* New button for sending final confirmation email */}
            <div>
            <button
                id="send-final-confirmation-email"
                className="confirmation-button"
                onClick={handleSendFinalConfirmationEmail}
                disabled={!isSubscriptionActive}  // Enable only if subscription is active
            >
                Click to confirm session
            </button>
            </div>
        </div>
        
    );
};

export default PaymentPageComponentZoomSession;
