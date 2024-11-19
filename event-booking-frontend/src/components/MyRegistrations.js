import React, { useState } from 'react';
import axios from 'axios';

const MyRegistrations = () => {
    const [email, setEmail] = useState('');
    const [registrations, setRegistrations] = useState([]);
    const [message, setMessage] = useState('');

    const fetchRegistrations = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:5000/registrations?email=${email}`)
            .then((response) => {
                if (response.data.message) {
                    setMessage(response.data.message); // Handle "No registrations found" message
                    setRegistrations([]);
                } else {
                    setRegistrations(response.data); // Handle successful response
                    setMessage('');
                }
            })
            .catch((error) => {
                console.error('Error fetching registrations:', error);
                setMessage('An error occurred while fetching your events.');
            });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">My Events</h1>

            {/* Registration Form */}
            <form onSubmit={fetchRegistrations} className="mb-4">
                <div className="form-group">
                    <label htmlFor="email">Enter your email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                    View My Events
                </button>
            </form>

            {/* Message */}
            {message && <p className="text-danger text-center">{message}</p>}

            {/* Registrations */}
            {registrations.length > 0 && (
                <div>
                    <h2 className="text-center">Your Registered Events</h2>
                    <ul className="list-group mt-4">
                        {registrations.map((reg, index) => (
                            <li key={index} className="list-group-item">
                                <h5><strong>Event:</strong> {reg.event.name}</h5>
                                <p><strong>Date:</strong> {reg.event.date}</p>
                                <p><strong>Location:</strong> {reg.event.location}</p>
                                <p><strong>Registered As:</strong> {reg.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyRegistrations;
