import React from 'react';
import { Link } from 'react-router-dom';

export default function RenderImageRights({
  opacity,
  imageUrl,
  height,
  rightsSource,
  auteur,
  rightsUrl,
}) {
  return (
    <div>
      <img
        style={{ display: 'inline-block' }}
        style={{ opacity: opacity }}
        src={imageUrl}
        width="auto"
        height={height}
        alt="imag"
      />
      <div style={{ fontSize: '0.6rem' }}>
        <div>{auteur}</div>
        <a href={rightsUrl}>{rightsSource}</a>
      </div>
    </div>
  );
}
