import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./GalleryArrondissement.css";
import Gallery from "./Gallery";

const GalleryArrondissement = () => {
  let { arrond } = useParams();
  console.log("numero : ", arrond);
  const { items } = useSelector((state) => state.photos);
  console.log("items : ", items);

  const ArrondHeader = () => {
    let numeroArrond = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
      "XIII",
      "XIV",
      "XV",
      "XVI",
      "XVII",
      "XVIII",
      "XIX",
      "XX",
    ];
    let arrondissements = [];

    for (let i = 0; i < 20; i++) {
      arrondissements.push(
        <li
          key={i.toString()}
          className={`GalleryArrondissement__numero-arrond" ${
            arrond == i + 1 ? "GalleryArrondissement--circle" : ""
          }`}
        >
          <Link to={`/photos-de-l-arrondissEment/${i + 1}`}>
            <p>{numeroArrond[i]}</p>
          </Link>
        </li>
      );
    }
    return <>{arrondissements}</>;
  };

  return (
    <div className="GalleryArrondissement">
      <div className="GalleryArrondissement__titre">
        <h1>PHOTOS DES ARRONDISSEMENTS DE PARIS</h1>
      </div>
      <ul className="GalleryArrondissement__arrond">
        <ArrondHeader />
      </ul>
      <div className="GalleryArrondissement__wrapper">
        <div className="GalleryArrondissement__flex">
          <Gallery items={items.arrayArrond[arrond - 1]} />
        </div>
      </div>
    </div>
  );
};

export default GalleryArrondissement;
