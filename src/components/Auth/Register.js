import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DOMPurify from "dompurify";
import { signup } from "../../store/reducers/auth/slice";
import { useFormValidation } from "../../hooks/useFormValidation";
import "./Register.css";

const defaultValues = {
  first: "philippe",
  last: "last",
  email: "philippe.teisseyre10@laposte.net",
  password: "test12345",
  confirm_password: "test12345",
};

const Register = () => {
  const { formValues, validate, register, handleOnChange, isValid } =
    useFormValidation({ formName: "register", defaultValues: defaultValues });
  const {
    first,
    last,
    email,
    password,
    // confirm_password,
  } = formValues["register"] ?? {};
  useEffect(() => {
    register(defaultValues);
  }, []);
  useEffect(() => {
    validate(formValues["register"] ?? {});
  }, [formValues]);

  const [loading, setLoading] = useState(false);
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("onsubmit ")
    setLoading(false);

    // Sanitize user input
    const newUser = {
      first: DOMPurify.sanitize(first),
      last: DOMPurify.sanitize(last),
      email: DOMPurify.sanitize(email),
      // city: DOMPurify.sanitize(city),
      password: DOMPurify.sanitize(password),
      //  confirm_password: DOMPurify.sanitize(confirm_password),
    };

    console.log('newUser', newUser)

    dispatch(signup(newUser))
      .unwrap()
      .then(() => {
        setRegistrationSuccessful(true);
        return;
      })
      .then(() => setTimeout(() => navigate('/'), 3000))
      //   window.location.reload();)
      .catch(() => {
        setLoading(true);
      });
  };

  return (
    <div className="register__wrapper">
      <form className="register__form" onSubmit={handleOnSubmit}>
        <div className="register__name-inputs">
          <input name='first' value={first} label="First Name" placeholder="First Name" onChange={handleOnChange} className="register__input" />
          <input name='last' value={last} label="Last Name" placeholder="Last Name" onChange={handleOnChange} className="register__input" />
        </div>
        <input name='email' value={email} label="Email" placeholder="Adresse e-mail" onChange={handleOnChange} className="register__input" />
        <input type="password" name='password' value={password} label="Password" placeholder="Mot de passe" onChange={handleOnChange} className="register__input" />
        <input type='submit' className="register__submit-button" disabled={!isValid} />
      </form>
      {loading && <p className="register__message-error">Mauvaise authentication</p>}
      {registrationSuccessful && <p className="register__message-success">Connection réussie, vous allez être redirigé vers la page d'accueil !</p>}
    </div >
  );
};
export default Register;