import React from "react";
import "./ArrondissementPhoto.css";
import PhotoArrondissement from "./PhotoArrondissementHome/PhotoArrondissement";



const ArrondissementsPhoto = ({ items }) =>
    !!items.length &&
    items.map((ArrondissementPhotos) =>
      ArrondissementPhotos.map(
        ({ id, url, arrond, home }) =>
          home && (
            <PhotoArrondissement
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
            <Loading isLoading={isLoading} />
            <div className="arrondissementsPhoto__flex">
              <ArrondissementsPhoto items={items} />
            </div>
            <Empty isVisible={!!items} />
          </div>
        </div>
      );
    };