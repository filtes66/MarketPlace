import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Gallery from "./Gallery";

const GalleryAdministration = (props) => {
  const state = useSelector((state) => ({ ...state.photos }));
  let { items } = state;
  console.log("items : ", items);

  return (
    <div className="photos-arrond">
      <ul className="header">
        <li className="header__numero">
          <h5>Photos des bâtiments administratifs</h5>
        </li>
      </ul>
      <div className="photos-arrond__wrapper">
        <div className="photos-arrond__flex">
          <Gallery items={items.arrayAdmin} />
        </div>
      </div>
    </div>
  );
};

export default GalleryAdministration;
