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
            .catch(error => setMessage(error.response?.data?.error || 'An error occurred.'));
    };

    return (
        <div className="mt-4">
            <h3 className="text-center">Register for this Event</h3>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">
                    Register
                </button>
            </form>
            {message && (
                <p className={`text-center mt-3 ${message.toLowerCase().includes('error') ? 'text-danger' : 'text-success'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default RegistrationForm;
