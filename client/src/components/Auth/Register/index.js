import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Input from "../Input";
import "./Register.css";
import { useFormValidation } from "../../../hooks/useFormValidation";

console.log("register");

/*const Alert = ({ isVisible }) =>
  isVisible && (
    <div className="alert alert-info mt-3">
      <p className="icontext">
        <i className="icon text-primary fa fa-thumbs-up"></i>User successfully
        created
      </p>
    </div>
  );
const ErrorMessage = ({ error }) =>
  error && (
    <div className="alert alert-danger mt-3">
      <p className="icontext]" style={{ color: "crimson" }}>
        <i className="icon text-danger fas fa-exclamation-circle"></i>{" "}
        {error?.error}
      </p>
    </div>
  );*/

const defaultValues = {
  first: "sandy",
  last: "last",
  email: "sandy@gmail.com",
  gender: "Female",
  city: "city",
  password: "test12345",
  confirm_password: "test12345",
};
const options = [
  "Uzbekistan",
  "Russia",
  "United States",
  "India",
  "Afganistan",
];

const Register = () => {
  const { formValues, validate, register, handleOnChange, isValid } =
    useFormValidation({ formName: "register", defaultValues: defaultValues });
  const {
    first,
    last,
    email,
    city,
    contry,
    gender,
    password,
    confirm_password,
  } = formValues["register"] ?? {};
  useEffect(() => {
    register(defaultValues);
  }, []);
  useEffect(() => {
    validate(formValues["register"] ?? {});
  }, [formValues]);

  const history = useHistory();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => history.push("/"), 2000);
  };
  return (
    <>
      <div className="register__wrapper">
        {/* feedback et message d'erreurs */}
        <form
          className="register__form"
          name="register"
          onSubmit={handleOnSubmit}
        >
          <h4 className="register__title">Sign up</h4>
          <div className="register__user-name">
            <Input.Text
              label="First Name"
              name="first"
              value={first}
              onChange={handleOnChange}
            />
            <Input.Text
              label="Label Name"
              name="last"
              value={last}
              onChange={handleOnChange}
            />
          </div>
          <div className="register__user-Email">
            <Input.Email
              label="Email"
              value={email}
              onChange={handleOnChange}
            />
          </div>
          <div className="register__user-gender">
            <Input.Radio
              className="register__radio"
              name="gender"
              label="Male"
              onChange={handleOnChange}
            />
            <Input.Radio
              className="register__radio"
              name="gender"
              label="Female"
              onChange={handleOnChange}
            />
          </div>

          <div className="register__user-city">
            <Input.Text name="city" label="City" onChange={handleOnChange} />
            <Input.Select
              name="country"
              options={options}
              label="Country"
              onChange={handleOnChange}
            />
          </div>

          <div className="register__user-password">
            <Input.Password label="Create password" onChange={handleOnChange} />
            <Input.ConfirmPassword
              label="Repeat password"
              onChange={handleOnChange}
            />
          </div>

          <div className="register__form-submit">
            <Input.Submit
              className="input__submit"
              title="Register"
              disabled={!isValid}
            />
          </div>
          <p className="register__login">
            Have an account? <Link to="/Login">Log In</Link>
          </p>
        </form>
      </div>
    </>
  );
};
export default Register;
