import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RegistrationForm from './RegistrationForm';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/events/${id}`)
            .then(response => setEvent(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!event) return <p>Loading...</p>;

    return (
        <div>
            <h1>{event.name}</h1>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>{event.description}</p>
            <RegistrationForm eventId={id} />
        </div>
    );
};

export default EventDetail;
