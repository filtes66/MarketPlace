import React, { useState, useContext } from "react";
//import { AuthContext } from "../../context/AuthContext";
//import { REACT_APP_BASE_URL } from "../../../constants/environment";
import "./Login.css";

function Login() {
  let [login_pwd, setloginData] = useState("");
  //const { setAuth } = useContext(AuthContext);

  const handleOnChange = (event) => {
    setloginData(event.target.value);
  };

  const loginDataSubmit = (event) => {
    event.preventDefault();
    /* fetch(`${REACT_APP_BASE_URL}/login-user/?login_pwd=${login_pwd}`)
      //   .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          setAuth({ isAuthenticated: true });
        }
      })
      .catch((err) => {
        console.error(err);
      });*/
  };
  return (
    <div className="login-container">
      <form onSubmit={loginDataSubmit} className="login-form">
        <div className="login__wrapper">
          <p className="login__titre">Créer un compte</p>
          <ul>
            <li className="login__liste-item">
              <label className="login__label" htmlFor="email">
                Adresse e-mail
              </label>
              <input
                type="email"
                name="e-mail"
                id="email"
                required
                pattern="(^([^@\s\074\076]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$)(?!(\r|\n))"
                maxLength="40"
                size="40"
                className="login__input"
                autoComplete="off"
                onChange={handleOnChange}
              />
            </li>
            <li>
              <label className="login__label" htmlFor="pass">
                Mot de passe
              </label>
              <input
                type="password"
                name="pass"
                id="pass"
                required
                minLength="8"
                maxLength="40"
                pattern="(^(?=.*\d)(?=.*[a-zA-Z])[^\011\012\013\014\015\074\076\134\u3040-\u309F\u30A0-\u30FF\uFF61-\uFF9F\<\>]+$)(?!(\r|\n))"
                size="40"
                className="login__input"
                autoComplete="off"
                onChange={handleOnChange}
              />
            </li>
          </ul>
        </div>
        <div className="login__wrapper">
          <p className="login__titre">Coordonnées de facturation</p>
          <ul className="login__liste">
            <li>
              <label className="login__label" htmlFor="pays">
                Pays/Région
              </label>
              <input
                type="text"
                name="pays"
                id="pays"
                required
                minLength="8"
                maxLength="40"
                pattern="(^(?=.*\d)(?=.*[a-zA-Z])[^\011\012\013\014\015\074\076\134\u3040-\u309F\u30A0-\u30FF\uFF61-\uFF9F\<\>]+$)(?!(\r|\n))"
                size="40"
                className="login__input"
                autoComplete="off"
                onChange={handleOnChange}
              />
            </li>
            <li>
              <label className="login__label" htmlFor="firstname">
                Prénom
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                required
                pattern="(^\s*([^\s\042\045\047\050\051\052\053\054\057\073\074\075\076\134\174]+[A-Za-z0-9A-Za-z0-9ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\.!\?_@-]+)\s*$)(?!(\r|\n))"
                minLength="6"
                maxLength="40"
                size="40"
                className="login__input"
                autoComplete="off"
                onChange={handleOnChange}
              />
            </li>
            <li>
              <label className="login__label" htmlFor="lastname">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                required
                pattern="(^\s*([^\s\042\045\047\050\051\052\053\054\057\073\074\075\076\134\174]+[A-Za-z0-9A-Za-z0-9ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\.!\?_@-]+)\s*$)(?!(\r|\n))"
                minLength="6"
                maxLength="40"
                size="40"
                className="login__input"
                autoComplete="off"
                onChange={handleOnChange}
              />
            </li>
            <li>
              <label className="login__label" htmlFor="organization">
                Entreprise ou organisme
              </label>
              <input
                type="text"
                name="organization"
                id="organization"
                maxLength="100"
                required="required"
                size="100"
                className="login__input"
                value=""
                onChange={handleOnChange}
              />
            </li>
            <li>
              <label htmlFor="address">Adresse</label>
              <input
                required="required"
                maxLength="100"
                size="100"
                type="text"
                name="address"
                id="address"
                className="login__input"
                onChange={handleOnChange}
              />
            </li>
            <li>
              <label className="login__label" htmlFor="postal_code">
                Code postal
              </label>
              <input
                required="required"
                pattern="(^[^\011\013\014\074\076\134\046]+$)(?!(\r|\n))"
                maxLength="20"
                size="20"
                type="text"
                value=""
                name="postal_code"
                id="postal_code"
                className="login__input"
                onChange={handleOnChange}
              />
            </li>
            <li className="login__liste-item">
              <label className="login__label" htmlFor="address_city">
                Ville
              </label>
              <input
                required="required"
                maxLength="31"
                size="31"
                type="text"
                name="address_city"
                id="address_city"
                className="=login__input"
                onChange={handleOnChange}
              />
            </li>
          </ul>
        </div>
        <div className="login-btn">
          <button name="login" type="submit" className="login-submit">
            J'ACCEPTE - PAYER
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
