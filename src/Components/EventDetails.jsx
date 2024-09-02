import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the event code from URL
import { fetchEventDetails, bookSeat } from '../Services/meetHostApiService';
import '../css/EventDetailsCss.css'; // Create this CSS file for styling
import auth from '../auth';

const EventDetails = () => {
    const { eventCode } = useParams(); // Assumes you have a route parameter for event code
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookingStatus, setBookingStatus] = useState(null);
    const [userId, setUserId] = useState(''); // Adjust this to your user identification mechanism

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

    const handleBookSeat = async () => {
        try {
            const token = auth.getToken();
            await bookSeat(eventCode, token);
            setBookingStatus('Successfully booked the seat!');
        } catch (err) {
            setBookingStatus('Failed to book the seat.');
            setError(err);
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
                <h1>{event.eventName}</h1>
                <p>{event.eventDescription}</p>
            </header>

            <div className="event-details-info">
                <p><strong>Location:</strong> {event.eventLocation}</p>
                <p><strong>Organizer:</strong> {event.organizer}</p>
                <p><strong>Date & Time:</strong> {new Date(event.dateAndTime).toLocaleString()}</p>
                <p><strong>Zoom Link:</strong> <a href={event.zoomLink} target="_blank" rel="noopener noreferrer">Join Zoom Meeting</a></p>
            </div>

            <button onClick={handleBookSeat} className="event-details-book-button">
                Book Seat
            </button>

            {bookingStatus && <div className="event-details-booking-status">{bookingStatus}</div>}
        </div>
    );
};

export default EventDetails;
