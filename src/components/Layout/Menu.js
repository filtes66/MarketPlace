import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/reducers/auth/slice';
import { FaTimes } from 'react-icons/fa';

const Menu = ({ user, toggleMenu, isOpen }) => {
    const menuRef = useRef();
    const dispatch = useDispatch();

    const userLogout = () => {
        dispatch(logout());
        toggleMenu();
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            menuRef.current && !menuRef.current.contains(e.target) && toggleMenu()
        };
        document.addEventListener("mousedown", handleClickOutside);
        return (() => document.removeEventListener("mousedown", handleClickOutside))
    }, [isOpen]);

    return (
        <div className="menu" ref={menuRef}>
            <FaTimes className="menu__fa-times" onClick={toggleMenu} />
            <h2>Votre compte</h2>
            <p>{user.firstname}.{user.lastname}</p>
            <ul>
                <li><Link to="/overview">SESSIONS</Link></li>
            </ul>
            <button onClick={userLogout}>FERMER LA SESSION</button>
        </div>
    )
}

export default Menu;
