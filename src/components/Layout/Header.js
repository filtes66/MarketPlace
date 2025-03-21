import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaHome, FaImages, FaUser } from "react-icons/fa";
import logo from '../../images/logo.png';

import Menu from "./Menu";
import "./Header.css";

function Header() {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav>
        <ul className="header__nav">
          <li className="header__nav__item">
            <Link to="/home">
              <img src={logo} alt="Home" className="logo" />
            </Link>
          </li>
          <li>
            <ul className="header__nav__list">
              <li className="header__nav__item">
                <Link to={{ pathname: "/gallery", state: {} }}>
                  <FaImages className="fa-images" />
                  <div className="header__gallery">Gallery</div>
                </Link>
              </li>
              <li className="header__nav__item">
                {isLoggedIn ? (
                  <div className="user"><FaUser className="fa-user" />
                    <button onClick={toggleMenu}>{user?.first}.{user?.last}</button>
                  </div>
                ) : (
                  <div>
                    <Link to={{ pathname: "/auth", state: { from: 'Home' } }} className="header__nav__item button">S'IDENTIFIER</Link>
                  </div>
                )}
              </li>
            </ul>
          </li>
        </ul>
      </nav >

      {isMenuOpen && isLoggedIn && <Menu user={user} toggleMenu={toggleMenu} />}
    </>
  );
}

export default Header;
