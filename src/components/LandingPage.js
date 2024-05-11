import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-page">
            <h1>Bienvenue sur Paris Photo Marketplace !</h1>
            <p>Découvrez de belles photos, libres de droits</p>
            <button onClick={() => navigate('/gallery')}>Explore Gallery</button>
        </div>
    );
}

export default LandingPage;