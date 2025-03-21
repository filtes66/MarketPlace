import React, { createRef, useRef, useEffect } from "react";
import usePhotos from "./usePhotos";
import GalleryCriteria from "./GalleryCriteria/GalleryCriteria";
import GalleryList from "./GalleryList";
import criteria from "./criteria";
import "./Gallery.css";

const Gallery = () => {
  const photoRefs = useRef();
  const title = useRef();
  const [photoGrid, render, setPhotoGrid, windowSize] = usePhotos();

  useEffect(() => {
    if (photoGrid.grid.length > 0) {
      photoRefs.current = [...new Array(photoGrid.grid.length)].map(() => createRef());
    }
  }, [photoGrid.grid]);

  if (!render) {
    return null
  }

  const handleSelectGallery = (galleryName) => {
    setPhotoGrid({ ...photoGrid, name: galleryName, render: false });
  };

  return (
    <>
      <div className="header__filters">
        <GalleryCriteria
          criteria={criteria}
          windowSize={windowSize}
          handleSelectGallery={handleSelectGallery}
        />
      </div>
      <div className="gallery__title">{title.content}</div>
      <GalleryList
        photoGrid={photoGrid.grid}
        photoRefs={photoRefs}
        windowSize={windowSize}
      />
    </>
  );
};

export default Gallery;
