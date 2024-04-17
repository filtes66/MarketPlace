import React from "react";
import "./input.css";

export const Text = ({
  label,
  name,
  type = "text",
  fontSize,
  col,
  placeholder,
  value,
  style,
  children,
  onChange,
  onClick,
}) => (
  <label className="input__label">
    {label}
    <div>
      <input
        type={type}
        name={name}
        className="input__text"
        placeholder={placeholder}
        defaultValue={value}
        onBlur={onChange}
        onClick={onClick}
        onKeyUp={onClick}
        onFocus={onClick}
      />
    </div>
    {children}
  </label>
);
export const Radio = ({ label, name, value, onChange }) => (
  <div>
    <label className="input__label">{label}</label>
    <input
      className="input__radio"
      checked={label.toLowerCase() === value}
      type="radio"
      name={name}
      defaultValue={value}
      onChange={() => null}
      onBlur={(e) => onChange(e, label)}
    />
  </div>
);
export const Checkbox = ({ name, children, onChange }) => (
  <label>
    <input
      type="checkbox"
      className="custom-control-input"
      name={name}
      onBlur={onChange}
    />
    <div className="custom-control-label">{children}</div>
  </label>
);
export const TextArea = ({ label, name, style, value, onChange }) => (
  <div>
    <label>
      {label}
      <textarea
        className="form-control"
        name={name}
        defaultValue={value}
        onChange={onChange}
      ></textarea>
    </label>
  </div>
);
export const Select = ({ value, label, options, name, onChange, style }) => {
  return (
    <label className="input__label">
      {label}
      <select
        id={label}
        className="input__select"
        name={name}
        onChange={() => null}
        onBlur={onChange}
        defaultValue={value}
      >
        <option>Select...</option>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </label>
  );
};
export const Email = (props) => {
  return (
    <div>
      <Text type="email" {...props} name="email">
        <small>We'll never share your email with anyone else.</small>
      </Text>
    </div>
  );
};
export const Password = (props) => {
  return (
    <div>
      <Text
        name="password"
        type="password"
        {...props}
        onBlur={props.onChange}
      />
    </div>
  );
};
export const ConfirmPassword = (props) => {
  return (
    <div>
      <Text
        name="confirm_password"
        type="password"
        {...props}
        onBlur={props.onChange}
      />
    </div>
  );
};

export const Submit = (props) => (
  <button type="submit" className={props.className} disabled={props.disabled}>
    {props.title}
  </button>
);
