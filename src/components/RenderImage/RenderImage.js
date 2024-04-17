import React from 'react';

const RenderImage = ({ opacity, imageUrl, height }) => (
  <img
    style={{ opacity: opacity }}
    src={imageUrl}
    width="auto"
    height={height}
    alt="imag"
  />
);

export default RenderImage;
