import React from "react";
import { Link } from "react-router-dom";
import "./Arrondissement.css";

const Arrondissement = ({ url, arrond }) => {
  return (
    <Link
      className="photo-arrond-home__lien"
      to={`/photos-de-l-arrondissement/${arrond}`}
    >
      <div className="photo-arrond-home__wrapper">
        <div className="photo-arrond-home__image">
          <img
            src={`/image/${arrond}/${url}.jpg`}
            height="200px"
            width="auto"
            alt="Arrondissement"
          />
        </div>
        <div className="photo-arrond-home__numero">{arrond}</div>
      </div>
    </Link>
  );
};

export default Arrondissement;
