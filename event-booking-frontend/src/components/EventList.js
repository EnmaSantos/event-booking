import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Upcoming Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <Link to={`/event/${event.id}`}>{event.name}</Link> - {event.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
