import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import MyRegistrations from './components/MyRegistrations'; // Add this for "My Events"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EventList />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/my-registrations" element={<MyRegistrations />} />
            </Routes>
        </Router>
    );
};

export default App;
