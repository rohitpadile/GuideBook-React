import React, { useState, useEffect } from 'react';
import '../css/Home2Css.css'
import { fetchHomePageEvents } from '../Services/meetHostApiService';
const Home2 = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = 'https://guidebookx-store.s3.ap-south-1.amazonaws.com/homepage/';

    useEffect(() => {
        const getEvents = async () => {
            try {
                const eventCodes = await fetchHomePageEvents();
                // For demonstration, assuming eventCodes are just identifiers. You might need another API call to get event details.
                setEvents(eventCodes.map(code => ({
                    id: code,
                    name: `Event ${code}`,
                    description: `Description for ${code}`,
                    image: `${BASE_URL}event_${code}.jpg`,
                    startDate: new Date().toISOString() // Use actual date
                })));
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        getEvents();
    }, []);

    if (loading) {
        return <img src={`${BASE_URL}logoblack.jpg`} alt="GuidebookX" className="loading-logo" />;
    }

    if (error) {
        return <div className="home2-error">Error loading events: {error.message}</div>;
    }

    return (
        <div className="home2-container">
            <header className="home2-header">
                <h1>Welcome to EventBooker</h1>
                <p>Join exciting events happening online</p>
            </header>

            <div className="home2-event-list">
                {events.length > 0 ? (
                    events.map(event => (
                        <div className="home2-event-card" key={event.id}>
                            <img src={event.image} alt={event.name} className="home2-event-image" />
                            <div className="home2-event-details">
                                <h2>{event.name}</h2>
                                <p>{event.description}</p>
                                <div className="home2-event-footer">
                                    <span>{new Date(event.startDate).toLocaleDateString()}</span>
                                    <a href={`/events/${event.id}`} className="home2-event-link">View Details</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="home2-no-events">No ongoing events at the moment.</div>
                )}
            </div>
        </div>
    );
};

export default Home2;