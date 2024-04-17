import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-page">
            <h1>Welcome to Paris Photo Marketplace!</h1>
            <p>Discover beautiful, rights-free photos from the city of love.</p>
            <button onClick={() => navigate('/gallery')}>Explore Gallery</button>
        </div>
    );
}

export default LandingPage;