import React from "react";
import { Link } from "react-router-dom";
import "./PhotoArrondissement.css";

const PhotoRender = ({ id, url, nom, prix, arrond, onClick, height }) => (
  <img
    src={`/image/${arrond}/${url}.jpg`}
    onClick={() => onClick(id)}
    height={height}
    width="auto"
    alt="photo"
  />
);

export default PhotoRender;
