import React, { createRef, useRef, useEffect } from "react";
import usePhotos from "./usePhotos";
import GalleryCriteria from "./GalleryCriteria/GalleryCriteria";
import GalleryList from "./GalleryList";
import criteria from "./criteria";
import "./Gallery.css";

const Gallery = () => {
  console.log('gallery')
  const refsPhotos = useRef();
  const title = useRef();
  const [photoGrid, render, setPhotoGrid] = usePhotos();

  useEffect(() => {
    if (photoGrid.grid.length > 0) {
      refsPhotos.current = [...new Array(photoGrid.grid.length)].map(() => createRef());
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
        <GalleryCriteria criteria={criteria}
          handleSelectGallery={handleSelectGallery}
        />
      </div>
      <div className="gallery__title">{title.content}</div>
      <GalleryList
        photoGrid={photoGrid.grid}
        refsPhotos={refsPhotos}
      />
    </>
  );
};

export default Gallery;
