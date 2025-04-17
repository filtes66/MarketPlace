import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import "./Photo.css";

const PADDING = 3;

const Photo = ({ id, url, nom, prix, arrond, onClickPhoto, currentHeight, currentWidth, windowSize }) => {
  let GRID_WIDTH = windowSize;
  let adjustedHeight = (currentWidth === GRID_WIDTH)
    ? (currentHeight / GRID_WIDTH * (GRID_WIDTH - 2 * PADDING))
    : (currentHeight - 2 * PADDING);

  return (
    <div className="photo__container" style={{ height: `${currentHeight}px`, width: `${currentWidth}px` }}>
      <LazyLoadImage
        className="photo__image"
        src={`/image/${arrond}/${url}.jpg`}
        onClick={() => onClickPhoto(id)}
        height={adjustedHeight}
        width='auto'
        alt={`Photo from ${arrond}`}
      />

      <div className="grid__width">Grid Width: {GRID_WIDTH}px</div>
    </div>
  );
};

export default Photo;