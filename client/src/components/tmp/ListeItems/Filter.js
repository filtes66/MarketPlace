import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Filter.css";

function Filter({ section, onClick }) {
  const Filter = ({ section, onClick }) => (
    <li className="filter__item" onClick={onClick}>
      <Link to={section}>
        <FaSearch />
      </Link>
      <p>{section}</p>
    </li>
  );

  return (
    <ul className="filter__items">
      {section.map((section, i) => (
        <Filter section={section} key={i} onClick={onClick} />
      ))}
    </ul>
  );
}

export default Filter;
