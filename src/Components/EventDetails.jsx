import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPaymentOrderEventBooking, paymentSuccessForEventBooking } from '../Services/paymentApiService';
import { useParams } from 'react-router-dom'; // To get the event code from URL
import { fetchEventDetails, checkIfEventBookedByUser } from '../Services/meetHostApiService';
import { checkLoginStatus } from '../Services/userAccountApiService';
import { RAZORPAY_KEY_ID_LIVE, RAZORPAY_KEY_ID_TEST } from '../Services/razorpayUtil'; // Import Razorpay Key
import '../css/EventDetailsCss.css'; // Ensure this CSS file includes the updated styles
import Swal from 'sweetalert2';
import auth from '../auth';

const EventDetails = () => {
    const { eventCode } = useParams(); // Assumes you have a route parameter for event code
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingStatus, setBookingStatus] = useState(null);
    const navigate = useNavigate();
    const [isBooked, setIsBooked] = useState(false);

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
        }, 100);

        return () => clearTimeout(delayCheck);
    }, [navigate]);

    // Fetch event details
    useEffect(() => {
        const getEventDetails = async () => {
            try {
                const eventDetails = await fetchEventDetails(eventCode);
                setEvent(eventDetails);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        getEventDetails();
    }, [eventCode]);

    // Check if the event is booked by the user
    useEffect(() => {
        const checkIfBooked = async () => {
            try {
                const token = auth.getToken();
                const bookedStatus = await checkIfEventBookedByUser(eventCode, token);
                if (bookedStatus === 1) {
                    setIsBooked(true);
                }
            } catch (error) {
                console.error('Error checking if event is booked', error);
            }
        };

        checkIfBooked();
    }, [eventCode]);

    // Handle seat booking and payment start
    const paymentStart = async () => {
        const token = auth.getToken();
        try {
            const response = await createPaymentOrderEventBooking(eventCode, token);

            if (response && response.id && response.amount) {
                const { status, amount, id } = response;

                if (status === 'created') {
                    let options = {
                        key: RAZORPAY_KEY_ID_TEST, //replace this with RAZORPAY_KEY_ID_LIVE key
                        amount: amount,  // Ensure the amount is in paise
                        currency: 'INR',
                        name: 'GuidebookX',
                        description: 'Event booking payment',
                        order_id: id,
                        handler: async function (response) {
                            try {
                                const paymentDetails = {
                                    paymentId: response.razorpay_payment_id,
                                    rzpOrderId: response.razorpay_order_id,
                                    eventCode
                                };

                                Swal.fire({
                                    title: 'Processing',
                                    text: 'Please do not refresh the page while we process your booking.',
                                    icon: 'info',
                                    showConfirmButton: false,
                                    allowOutsideClick: false,
                                });

                                await paymentSuccessForEventBooking(paymentDetails, token);
                                Swal.fire('Success', 'Payment successful. Your seat is booked!', 'success');
                                setTimeout(() => {
                                    window.location.reload();
                                }, 2000);
                            } catch (error) {
                                Swal.fire('Success', 'Payment was successful, but we could not confirm your booking. Please contact support.', 'warning');
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
            Swal.fire('Error', 'Booking failed or you are not logged in', 'error');
        }
    };

    if (loading) {
        return <div className="event-details-loading">Loading...</div>;
    }

    if (error) {
        return <div className="event-details-error">Error loading event details: {error.message}</div>;
    }

    return (
        <div className="event-details-container">
            <header className="event-details-header">
                <img src={event.bannerUrl} alt={event.eventName} className="event-details-banner" />
                <h1 className="event-details-title">{event.eventName}</h1>
                <p className="event-details-description">{event.eventDescription}</p>
            </header>

            <div className="event-details-info">
                <div className="event-details-info-item">
                    <strong>Location:</strong> {event.eventLocation}
                </div>
                <div className="event-details-info-item">
                    <strong>Organizer:</strong> {event.organizer}
                </div>
                <div className="event-details-info-item">
                    <strong>Date & Time:</strong> {new Date(event.dateAndTime).toLocaleString()}
                </div>
                <div className="event-details-info-item">
                    <strong>Zoom Link:</strong> <a href={event.zoomLink} target="_blank" rel="noopener noreferrer" className="event-details-zoom-link">Join Zoom Meeting</a>
                </div>
            </div>

            <div className="event-details-actions">
                <button
                    id="book-seat-button"
                    className={`book-seat-button ${isBooked ? 'booked' : ''}`}
                    onClick={paymentStart}
                    disabled={isBooked}
                >
                    {isBooked ? 'Already Booked' : 'Book Seat'}
                </button>
                {bookingStatus && <p className="booking-status">{bookingStatus}</p>}
            </div>
        </div>
    );
};

export default EventDetails;
