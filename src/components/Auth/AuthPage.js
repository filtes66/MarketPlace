import React, { useState } from 'react';
//import { useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import './AuthPage.css';

const AuthPage = ({ status }) => {
    console.log("authpage", status)
    // const location = useLocation();
    //  const fromHome = location.state?.from === 'Home';
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth__container">
            <div className="auth__image-section">
                {/* Replace with your background image */}
                {/*<img src="background.jpg" alt="Background" /> */}
            </div>
            <div className="auth__form-section">
                <div className="auth__links">
                    <button onClick={() => setIsLogin(true)} className={isLogin ? 'active' : ''}>S’IDENTIFIER</button>
                    <button onClick={() => setIsLogin(false)} className={!isLogin ? 'active' : ''}>S’ENREGISTRER</button>
                </div>

                {isLogin ? (
                    <Login /*fromHome={fromHome}*/ />
                ) : (
                    <Register /*fromHome={fromHome}*/ />
                )}
            </div>
        </div>
    );
};

export default AuthPage;
