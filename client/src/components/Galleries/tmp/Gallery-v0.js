import React, { createRef, useMemo, useRef, useState } from "react";
import Photo from "./Photo";
import PhotoPresentation from "./PhotoPresentation";
import "./Gallery.css";

const Gallery = (props) => {
  const [checked, setChecked] = useState([]);
  console.log("checked : ", checked);
  const idPrev = useRef(0);
  const refsPhotos = useRef(
    [...new Array(props.items.length)].map(() => createRef())
  );

  const createdPhotosArrays = useMemo(() => {
    return createPhotosArrays(props.items);
  }, []);

  console.log("props.items : ", props.items);
  console.log("createdphotosarrays : ", createdPhotosArrays);

  function createPhotosArrays(items) {
    console.log("createphotoarray : ");
    let L = 1200;
    let array1 = [];
    let array2 = [];
    let widthSum = 0;
    let height = 0;
    let height2 = 0;
    let width2 = 0;
    let maxCol = 0;
    let currentCol = 0;
    let nbCol = 0;
    let currentRaw = 0;
    let heightSum = 0;
    let gap = 6;
    let margin = 120;
    items.forEach((item) => {
      nbCol += 1;
      if (nbCol > maxCol) {
        maxCol = nbCol;
      }
      widthSum = widthSum + item.width;
      array1.push({ ...item, currentCol: nbCol });
      if (widthSum <= L * 1.2 && widthSum >= L * 0.8) {
        currentRaw += 1;
        let L1 = (maxCol - nbCol + 1) * gap + L;
        height = (L1 * item.height) / widthSum;
        heightSum += height + gap;
        array1 = array1.map(function (item) {
          let itemWidth = (item.width * height) / widthSum;
          if (item.width > item.height) {
            height2 = (item.height * 552) / item.width;
            width2 = 552;
          } else {
            height2 = (item.height * 370) / item.width;
            width2 = 370;
          }
          return {
            ...item,
            height: height,
            heightSum: heightSum,
            L1: L1,
            height2: height2,
          };
        });
        console.log("array 1 : ", array1);
        array2.push(array1);
        array1 = [];
        widthSum = 0;
        nbCol = 0;
        console.log("array2 : ", array2);
      } else if (item.width > L) {
        array1.pop();
        let L1 = (maxCol - 0) * gap + L;
        height = (L1 * item.height) / item.width;
        heightSum += height + gap;
        currentRaw += 1;
        array2.push([
          {
            ...item,
            height: height,
            currentCol: 1,
            heightSum: heightSum,
            L1: L1,
            height2: height2,
            width2: width2,
          },
        ]);
        console.log("array2 : ", array2);
        widthSum = widthSum - item.width;
        nbCol -= 1;
      } else if (widthSum <= L * 0.8) {
      }
    });
    console.log("array2 : ", array2);
    return array2;
  }

  function onClickPhoto(id) {
    if (id === idPrev.current) return;
    let check = [...checked];
    check[id] = true;
    check[idPrev.current] = false;
    idPrev.current = id;
    console.log("check[id] : ", check[id]);
    setChecked(check);
  }

  const GalleryRender = (props) =>
    props.createdPhotosArrays.map((item) =>
      item.map((element, i) => (
        <div key={element.id}>
          <div
            style={{
              marginBottom:
                checked[element.id] || false
                  ? `${element.height2 + 328}px`
                  : "",
              height: `${element.height}px`,
            }}
          >
            <Photo {...element} onClick={() => onClickPhoto(element.id)} />
          </div>
          {(checked[element.id] || false) && (
            <PhotoPresentation {...element} reference={refsPhotos.current[i]} />
          )}
        </div>
      ))
    );

  // const Gallery = ({ items, numeroArrondissement, type, onClickPhoto }) =>

  return (
    <div className="photos-arrond__flex">
      <GalleryRender createdPhotosArrays={createdPhotosArrays} />
    </div>
  );
};

export default Gallery;
