const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { events, registrations } = require('./events'); // Import mock data or replace with MongoDB logic

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Get all registrations for a user
app.get('/registrations', (req, res) => {
    console.log('Received GET /registrations'); // Log when the route is hit
    const email = req.query.email;

    if (!email) {
        console.log('No email provided');
        return res.status(400).json({ message: 'Email is required' });
    }

    console.log('Filtering registrations for email:', email);
    const userRegistrations = registrations.filter(reg => reg.email === email);

    if (userRegistrations.length === 0) {
        console.log('No registrations found');
        return res.status(200).json({ message: 'No registrations found' });
    }

    console.log('Fetching event details for registrations');
    const detailedRegistrations = userRegistrations.map(reg => {
        const event = events.find(e => e.id === reg.eventId);
        return { event, name: reg.name };
    });

    console.log('Sending detailed registrations:', detailedRegistrations);
    res.json(detailedRegistrations);
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
