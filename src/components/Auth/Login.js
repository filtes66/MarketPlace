import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DOMPurify from "dompurify";
import { useFormValidation } from "../../hooks/useFormValidation";
import { login } from "../../store/reducers/auth/slice";

import "./Login.css";

const defaultValues = {
  email: "philippe.teisseyre12@laposte.net",
  password: "test12345",
};

const Login = () => {
  const { formValues, validate, register, handleOnChange, isValid } =
    useFormValidation({ formName: "login", defaultValues: defaultValues });

  const { email, password } = formValues["login"] ?? {};
  const [loading, setLoading] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    register(defaultValues);
  }, []);

  useEffect(() => {
    validate(formValues["login"] ?? {});
  }, [formValues]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("onsubmit ")
    setLoading(false);

    // Sanitize user input
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    dispatch(login({ email: sanitizedEmail, password: sanitizedPassword }))
      .unwrap()
      .then(() => {
        setLoginSuccessful(true);
      })
      .then(() =>
        setTimeout(() => {
          navigate('/')
          //   window.location.reload()
        }, 3000))
      .catch(() => {
        console.log('wrong authentication')
        setLoading(true);
      });
  };

  return (
    <div className="login__wrapper">
      <form className="login__form" onSubmit={handleOnSubmit}>
        <input type='email' name='email' value={email} label="Email" placeholder="Adresse e-mail" onChange={handleOnChange} className="login__input" />
        <input type="password" name='password' value={password} label="Password" placeholder="Mot de passe" onChange={handleOnChange} className="login__input" />
        <input type='submit' className="login__submit-button" disabled={!isValid} />
      </form>
      {loading && <p className="login__message-error">Mauvaise authentication</p>}
      {loginSuccessful && <p className="register__message-success">Connection réussie, vous allez être redirigé vers la page d'accueil !</p>}
    </div>
  );
};
export default Login;
