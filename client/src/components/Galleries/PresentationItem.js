import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RadioGroup from "../RadioGroup/RadioGroup";
import { addToCard, removeFromCard } from "../../store/reducers/card/slice.js";
import "./PresentationItem.css";

const PresentationItem = forwardRef(
  (
    { id, description, url, nom, prix, arrond, height2, width2, heightSum },
    ref
  ) => {
    const radios = [
      { value: "image", prix: `${prix} euros pour cette image`, style: {} },
      {
        value: "abonnement",
        prix: "8.50 euros avec un abonnement d'un mois",
        style: {
          padding: "10px 0",
          backgroundColor: "#dae8e7",
          borderBottomColor: "#fff",
          borderTopColor: "#ced2d3",
          width: "350px",
        },
      },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items } = useSelector((state) => state.card);
    console.log("ITEMS", items);

    useEffect(() => {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, [ref.current]);

    function onSubmit(selectedOption, x) {
      if (selectedOption === "image") {
        if (x === 2) {
          return dispatch(
            addToCard({ id, description, url, nom, prix, arrond })
          );
        } else {
          if (x === 3) {
            return navigate("/panier");
          }
        }
      } else {
        if (x === 2) {
          return dispatch(addToCard(selectedOption));
        } else {
          return navigate("/panier");
        }
      }
    }

    return (
      <div
        ref={ref}
        className="photoPresentation__container"
        style={{ top: `${heightSum}px`, width: "1224px" }}
      >
        <h1 className="photoPresentation__title">
          {nom} - image libre de droit -
        </h1>
        <div className="photoPresentation__img">
          <img
            src={`/image/${arrond}/${url}.jpg`}
            width={`${width2}px`}
            height={`${height2}px`}
            alt="photo"
          />
        </div>
        <div className="photoPresentation__ref">
          <RadioGroup radios={radios} initOption="image" onSubmit={onSubmit} />
        </div>
        <h2 className="photoPresentation__description-title">Description</h2>
        <p className="photoPresentation__description">{description}</p>
      </div>
    );
  }
);

export default PresentationItem;
