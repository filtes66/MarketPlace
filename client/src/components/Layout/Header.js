import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import "./Header.css";

function Header() {
  return (
    <>
      <nav>
        <ul className="header__nav">
          <li className="header__icon">
            <Link to="" className="header__item">
              S'inscrire
            </Link>
          </li>
          <li>
            <Link to="" className="header__item">
              Se connecter
            </Link>
          </li>
          <li>
            <Link to="" className="header__item">
              <FaShoppingCart />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
