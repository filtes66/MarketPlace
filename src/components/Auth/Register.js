import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DOMPurify from "dompurify";
import { signup } from "../../store/reducers/auth/slice";
import { useFormValidation } from "../../hooks/useFormValidation";
import "./Register.css";

console.log("register");

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('isvalid ', isValid);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("onsubmit ")
    setLoading(true);

    // Sanitize user input
    /* const newUser = {
       first: DOMPurify.sanitize(first),
       last: DOMPurify.sanitize(last),
       email: DOMPurify.sanitize(email),
       // city: DOMPurify.sanitize(city),
       password: DOMPurify.sanitize(password),
       //  confirm_password: DOMPurify.sanitize(confirm_password),
     };*/

    const newUser = {
      first,
      last,
      email,
      // city: DOMPurify.sanitize(city),
      password,
      //  confirm_password: DOMPurify.sanitize(confirm_password),
    }

    console.log('newUser', newUser)

    dispatch(signup(newUser))
      .unwrap()
      .then((currentUser) => {
        console.log('currentUser ', currentUser);
        currentUser && setTimeout(() => navigate('/'), 2000);
        //   window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="register__wrapper">
      {/* feedback et message d'erreurs */}
      <form className="register__form" onSubmit={handleOnSubmit}>
        <h1>Sign up</h1>
        <div className="register__user-name">
          <div className="register__name-inputs">
            <input name='first' value={first} label="First Name" onChange={handleOnChange} className="register__input" />
            <input name='last' value={last} label="Last Name" onChange={handleOnChange} className="register__input" />
          </div>
          <input name='email' value={email} label="Email" onChange={handleOnChange} className="register__input" />
          <input type="password" name='password' value={password} label="Password" onChange={handleOnChange} className="register__input" />
          <input type='submit' className="register__submit-button" /* disabled={!isValid}*/ />
        </div>
      </form>
    </div >
  );
};
export default Register;