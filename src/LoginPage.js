import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const correctPassword = '123';
        if (password === correctPassword) {
            onLogin();
        } else {
            alert('Incorrect password');
        }
    };

    return (
        <div className='login-page'>
            <form onSubmit={handleSubmit} className='login-page__form'>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className='login-page__input'
                />
                <button type="submit" className='login-page__button'>Submit</button>
            </form>
        </div>

    );
};

export default LoginPage;
