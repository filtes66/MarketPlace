import React, { useState, useRef } from "react";
import Photo from "./Photo";
import PresentationItem from "./PresentationItem";
import "./GalleryList.css";

const GalleryList = ({ createdPhotosGrid, refsPhotos }) => {
  const idPrev = useRef(0);
  const [checked, setChecked] = useState([]);

  function onClickPhoto(id) {
    if (id === idPrev.current) return;
    let check = [...checked];
    check[id] = true;
    check[idPrev.current] = false;
    idPrev.current = id;
    setChecked(check);
  }
  return (
    <div className="gallery__flex">
      {createdPhotosGrid.map((element, i) => (
        <div key={i}>
          <div
            style={{
              marginBottom:
                checked[element.id] || false
                  ? `${element.height2 + 328}px`
                  : "",
              height: `${element.height}px`,
            }}
          >
            <Photo {...element} onClick={() => onClickPhoto(element.id, i)} />
          </div>
          {(checked[element.id] || false) && (
            <PresentationItem {...element} ref={refsPhotos.current[i]} />
          )}
        </div>
      ))}
    </div>
  );
};

export default GalleryList;
