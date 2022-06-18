import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import "./Header.css";

function Header(props) {
  return (
    <>
      {/*    <Link to="/Register" className="header__authentication">
        Authentification
      </Link>
      ou
      <Link to="/Login" className="header__login">
        Login
      </Link>
      {/*     <Link to="/Login" className="header__login">
        <p>Login</p>
  </Link>*/}
      <ul className="header">
        <li className="header__icon">
          <Link to="/" className="header__item">
            {" "}
            S'inscrire
          </Link>
        </li>
        <li>
          <Link to="/Montmartre" className="header__item">
            Se connecter
          </Link>
        </li>
        <li>
          <Link to="/Tour-Eiffel" className="header__item">
            <FaShoppingCart />
          </Link>
        </li>
        {/*      <li>
          <Link to="/Paris" className="header__item">
            Paris
          </Link>
  </li>*/}
      </ul>
    </>
  );
}

export default Header;
