const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());



// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Get all events
const Event = require('./models/Event');

app.get('/events', async (req, res) => {
    console.log('Received GET /events'); // Log when the route is hit
    try {
        const events = await Event.find({}); // Fetch events from MongoDB
        console.log('Fetched events:', events); // Log fetched events
        res.json(events); // Respond with events
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Error fetching events' });
    }
});

// Get event by ID
app.get('/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Error fetching event' });
    }
});

// Fetch all registrations
app.get('/registrations', async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.json(registrations);
    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).json({ error: 'Error fetching registrations' });
    }
});

// Get all registrations for a user
const Registration = require('./models/Registration');

app.get('/registrations', async (req, res) => {
    const email = req.query.email; // Extract email from query parameters

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' }); // Return error if no email provided
    }

    try {
        // Find registrations associated with the email
        const registrations = await Registration.find({ email }).populate('eventId');
        
        // Handle case where no registrations are found
        if (registrations.length === 0) {
            return res.status(404).json({ message: 'No registrations found.' });
        }

        // Format the response to include detailed event information
        const detailedRegistrations = registrations.map(reg => ({
            event: reg.eventId, // Populated event details
            name: reg.name,     // Name of the registrant
        }));

        res.json(detailedRegistrations); // Send response
    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).json({ error: 'Error fetching registrations' });
    }
});


// Handle registration for an event


app.post('/events/:id/register', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        const registration = new Registration({
            eventId: event._id,
            name,
            email,
        });

        await registration.save();
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        console.error('Error registering for event:', error);
        res.status(500).json({ error: 'Error registering for event' });
    }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
