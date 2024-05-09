import React, { useState, useRef } from "react";
import Photo from "./Photo";
import PresentationItem from "./PresentationItem";
import "./GalleryList.css";

const GalleryList = ({ photoGrid, photoRefs, windowSize }) => {
  const idPrev = useRef(0);
  const [checked, setChecked] = useState([]);

  function handleClickCloseCross() {
    let check = [...checked];
    check[idPrev.current] = false;
    setChecked(check);
  }

  function handleClickPhoto(id) {
    if (id === idPrev.current) return;
    let check = [...checked];
    check[id] = true;
    check[idPrev.current] = false;
    idPrev.current = id;
    setChecked(check);
  }
  return (
    <div className="gallery__flex">
      {photoGrid.map((item, i) => {
        const style = {
          marginBottom: checked[item.id] ? `${item.scaledHeight + 328}px` : "",
          height: `${item.currentHeight}px`,
        }
        return (
          <div key={i}>
            <div
              style={style}
            >
              <Photo {...item} windowSize={windowSize} onClickPhoto={() => handleClickPhoto(item.id, i)} />
            </div>
            {(checked[item.id]) && (
              <PresentationItem {...item} ref={photoRefs.current[i]} onCloseCross={handleClickCloseCross} />
            )}
          </div>)
      })}
    </div>
  );
};

export default GalleryList;
