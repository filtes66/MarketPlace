import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Input from "../Input";
import { useFormValidation } from "../../../hooks/useFormValidation";
import "./Login.css";

/*const Alert = ({ isVisible }) => (
	isVisible &&
	<div className="alert alert-info mt-3">
		<p className="icontext"><i className="icon text-primary fa fa-thumbs-up"></i>User successfully connected</p>
    </div>
)
const ErrorMessage = ({ error }) => (
	error && 
	<div className="alert alert-danger mt-3">
		<p className="icontext]" style={{ color: 'crimson' }}><i className="icon text-danger fas fa-exclamation-circle"></i> {' '}{error?.error}</p>
    </div>
)*/

const defaultValues = {
  email: "sandy@gmail.com",
  password: "",
};

const Login = () => {
  const { formValues, validate, register, handleOnChange, isValid } =
    useFormValidation({ formName: "login", defaultValues: defaultValues });

  const { email, password } = formValues["login"] ?? {};

  const history = useHistory();

  useEffect(() => {
    register(defaultValues);
  }, []);

  useEffect(() => {
    validate(formValues["login"] ?? {});
  }, [formValues]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => history.push("/"), 2000);
  };

  return (
    <>
      <div className="login__wrapper">
        {/* feedback et message d'erreurs */}
        <form className="login__form" onSubmit={handleOnSubmit}>
          {/* 
          <a href="#" className="btn btn-facebook btn-block mb-2"> <i className="fab fa-facebook-f"></i> &nbsp  Sign in with Facebook</a>
          <a href="#" className="btn btn-google btn-block mb-4"> <i className="fab fa-google"></i> &nbsp  Sign in with Google</a> 
          */}
          <h4 className="login__title">Sign in</h4>
          <div className="login__email">
            <Input.Email label="Email" onChange={handleOnChange} />
          </div>
          <div className="login__user-password">
            <Input.Password
              label="Password"
              name="password"
              onChange={handleOnChange}
            />
          </div>
          <div className="login__checkbox">
            <Input.Checkbox>Remember</Input.Checkbox>
          </div>
          <div className="login__form-submit">
            <Input.Submit
              className="input__submit"
              title="Login"
              disabled={!isValid}
            />
          </div>
          <p className="login__register">
            Don't have account? <Link to="/Register">Sign Up</Link>
          </p>
        </form>
      </div>
    </>
  );
};
export default Login;
