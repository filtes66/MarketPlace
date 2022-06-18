import React from "react";
import { useSelector } from "react-redux";
import Arrondissement from "./Arrondissement/Arrondissement";
import "./Arrondissements.css";

const Administrations = () => {
  const state = useSelector((state) => ({ ...state.photos }));
  let { items } = state;
  console.log("Administrations");

  const AdministrationsRender = ({ items }) =>
    !!items.length &&
    items.map((item) =>
      item.map(
        ({ id, url, arrond, type }) =>
          type == 1 && (
            <Arrondissement key={id} url={url} arrond={arrond} home={home} />
          )
      )
    );

  return (
    <div className="arrondissements">
      <div className="arrondissements__wrapper">
        <div className="arrondissements__flex">
          <AdministrationsRender items={items} />
        </div>
      </div>
    </div>
  );
};

export default Administrations;
