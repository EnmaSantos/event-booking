import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EventList = () => {
    const [events, setEvents] = useState([]);

    // Fetch events from the backend
    useEffect(() => {
        axios.get('http://localhost:5000/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center">Upcoming Events</h1>
            <div className="row">
                {events.map(event => (
                    <div key={event.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{event.name}</h5>
                                <p className="card-text"><strong>Date:</strong> {event.date}</p>
                                <p className="card-text"><strong>Location:</strong> {event.location}</p>
                                <Link to={`/event/${event.id}`} className="btn btn-primary">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;
