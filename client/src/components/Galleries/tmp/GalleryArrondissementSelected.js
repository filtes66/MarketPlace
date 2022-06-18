import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PhotoArrondissement from "./PhotoArrondissement";
import PhotoPresentation from "./PhotoPresentation";
import "./GalleryArrondissementSelected.css";

const GalleryArrondissementSelected = (props) => {
  let [checked, setChecked] = useState([]);
  console.log("checked : ", checked);
  const idPrev = useRef(0);
  let numeroArrondissement = props.match.params.arrond;
  console.log("numero : ", numeroArrondissement);
  const dispatch = useDispatch();
  const state = useSelector((state) => ({ ...state.photos }));
  let { items } = state;

  const createdPhotosArrays = useMemo(() => {
    return createPhotosArrays(items[numeroArrondissement - 1]);
  }, [numeroArrondissement]);

  // console.log("createdPhotosArrays: ", createdPhotosArrays);
  let arrondissements = [];
  for (let i = 1; i < 15; i++) {
    arrondissements.push(
      <li key={i.toString()} className="header__titre">
        <Link to={`/photos-de-l-arrondissment/${i}`}>
          <p>{i}</p>
        </Link>
      </li>
    );
  }

  function createPhotosArrays(items) {
    console.log("createphotoarray : ");
    let L = 1200;
    let array1 = [];
    let array2 = [];
    let widthSum = 0;
    let height = 0;
    let height2 = 0;
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
            height2 = (item.height * 700) / item.width;
          } else {
            height2 = height;
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
          },
        ]);
        console.log("array2 : ", array2);
        widthSum = widthSum - item.width;
        nbCol -= 1;
      }
    });
    return array2;
  }

  const Gallery = ({ items, numeroArrondissement, onClickPhoto }) =>
    items.map((item) =>
      item.map((element) => {
        return (
          <div key={element.id} className="galleryArrondissement__gallery-flex">
            <div
              style={{
                marginBottom:
                  checked[element.id] || false
                    ? `${element.height2 + 100}px`
                    : "",
                height: `${element.height}px`,
              }}
            >
              <PhotoArrondissement
                {...element}
                numeroArrondissement={numeroArrondissement}
                onClick={onClickPhoto}
                checked={checked[element.id] || false}
              />
            </div>
            {(checked[element.id] || false) && (
              <PhotoPresentation
                {...element}
                numeroArrondissement={numeroArrondissement}
              />
            )}
          </div>
        );
      })
    );

  function onClickPhoto(id) {
    let check = [];
    if (id !== idPrev) {
      check[id] = true;
      check[idPrev] = false;
      // setChecked(check);
      idPrev.current = id;
      console.log("check[id] : ", check[id]);
    }
    return setChecked(check);
  }

  return (
    <div className="photos-arrond">
      <ul className="header">
        <li className="header__numero">
          <h5>ARRONDISSEMENTS</h5>
        </li>
        {arrondissements}
      </ul>
      <div className="photos-arrond__wrapper">
        <div className="photos-arrond__flex">
          <Gallery
            items={createdPhotosArrays}
            numeroArrondissement={numeroArrondissement}
            onClickPhoto={onClickPhoto}
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryArrondissementSelected;
