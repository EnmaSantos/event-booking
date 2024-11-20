import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RegistrationForm from './RegistrationForm';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Event ID from URL:', id);
    if (id) {
      axios.get(`http://localhost:5000/events/${id}`)
        .then(response => {
          if (response.data) {
            setEvent(response.data);
          } else {
            setError('Event not found with ID: ' + id);
          }
        })
        .catch(error => setError('Error fetching event details: ' + error.message));
    }
  }, [id]);

  if (!id) return <p>Invalid event ID</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-center">{event?.name}</h1>
          <h5 className="card-subtitle mb-3 text-muted text-center">Date: {event?.date}</h5>
          <h6 className="card-subtitle mb-3 text-muted text-center">Location: {event?.location}</h6>
          <p className="card-text">{event?.description}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-center">Register for this Event</h3>
        <RegistrationForm eventId={id} />
      </div>
    </div>
  );
};

export default EventDetail;