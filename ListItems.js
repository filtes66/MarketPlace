import React from "react";
import { FaSearch } from "react-icons/fa";
import "ListeItems.css";

function ListeItems({ listeItems }) {
  const Items = ({ item }) => (
    <link to={item}>
      <li className="listeItems__items">
        <FaSearch />
        <h5>{item}</h5>
      </li>
    </link>
  );

  return (
    <ul className="listeItems">
      {listeItems.map((item) => (
        <Items item={item} />
      ))}
    </ul>
  );
}

export default ListeItems;
