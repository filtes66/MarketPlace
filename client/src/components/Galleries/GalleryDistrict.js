import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Gallery from "./Gallery";
import "./GalleryDistrict.css";

const GalleryDistrict = () => {
  let { arrond } = useParams();
  const { items } = useSelector((state) => state.photos);

  return (
    <>
      <div className="galleryDistrict">
        <Gallery items={items.districtArray[arrond - 1]} />
      </div>
    </>
  );
};

export default GalleryDistrict;
