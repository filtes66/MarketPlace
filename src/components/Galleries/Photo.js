import React from "react";
import "./Photo.css";

const GRID_WIDTH = 1200;
const PADDING = 3;

const Photo = ({ id, url, nom, prix, arrond, onClickPhoto, currentHeight, currentWidth }) => {
  let adjustedHeight = (currentWidth === GRID_WIDTH)
    ? (currentHeight / GRID_WIDTH * (GRID_WIDTH - 2 * PADDING))
    : (currentHeight - 2 * PADDING);

  return (
    <div className="photo__container" style={{ height: `${currentHeight}px`, width: `${currentWidth}px` }}>
      <img
        className="photo__image"
        src={`/image/${arrond}/${url}.jpg`}
        onClick={() => onClickPhoto(id)}
        height={adjustedHeight}
        width='auto'
        alt={`Photo from ${arrond}`}
      />
    </div>
  );
};

export default Photo;