import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Gallery from "./Gallery";
import "./GalleryDistrict.css";
import thunk from "../../store/reducers/photos/thunk";

const GalleryDistrict = () => {
  let { arrond } = useParams();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.photos);
  console.log("Allitems", items);

  React.useEffect(() => {
    console.log("useeffect");
    dispatch(thunk.fetchPhotos());
  }, [dispatch]);

  if (!Object.keys(items).length) {
    return null;
  }


  return (
    <>
      <div className="galleryDistrict">
        {/*  <Gallery items={items.districtArray[arrond - 1]} />*/}
        <Gallery items={items} />
      </div>
    </>
  );
};

export default GalleryDistrict;
