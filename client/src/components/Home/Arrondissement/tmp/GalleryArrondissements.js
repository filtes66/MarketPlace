import React from "react";
import "./ArrondissementPhoto.css";
import ArrondissementPhoto from "./ArrondissementPhoto/ArrondissementPhoto";



const GalleryArrondissements = ({ items }) =>
    !!items.length &&
    items.map((ArrondissementPhotos) =>
      ArrondissementPhotos.map(
        ({ id, url, arrond, home }) =>
          home && (
            <ArrondissementPhoto
              key={id}
              url={url}
              arrond={arrond}
              home={home}
            />
          )
      )
    );

    return (
        <div className="arrondissementsPhoto">
          <div className="arrondissementsPhoto__wrapper">
            <div className="arrondissementsPhoto__flex">
              <GalleryArrondissements items={items} />
            </div>
          </div>
        </div>
      );
    };