import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ eventId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/events/${eventId}/register`, { name, email })
            .then(response => setMessage(response.data.message))
            .catch(error => setMessage(error.response.data.error || 'An error occurred.'));
    };

    return (
        <div>
            <h2>Register for this event</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegistrationForm;
