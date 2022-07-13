import React from "react";
import { Link } from "react-router-dom";
import "./Photo.css";

const Photo = ({ id, url, nom, prix, arrond, onClick, height }) => {
  console.log("photo");
  return (
    <img
      src={`/image/${arrond}/${url}.jpg`}
      onClick={() => onClick(id)}
      height={height}
      width="auto"
      alt="photo"
    />
  );
};

export default Photo;
