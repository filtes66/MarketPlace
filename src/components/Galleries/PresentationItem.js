import React, { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RadioGroup from "../RadioGroup/RadioGroup";
import { addToCart } from "../../store/reducers/cart/slice.js";
import "./PresentationItem.css";

const radioStyles = {
  padding: "10px 0",
  backgroundColor: "#dae8e7",
  borderBottomColor: "#fff",
  borderTopColor: "#ced2d3",
  width: "350px",
};

const PresentationItem = forwardRef(
  (
    { id, description, url, nom, prix, arrond, scaledHeight, scaledWidth, totalHeight, onCloseCross },
    ref
  ) => {
    const radios = [
      { value: "image", prix: `${prix} euros pour cette image`, style: {} },
      {
        value: "abonnement",
        prix: "8.50 euros avec un abonnement d'un mois",
        style: radioStyles,
      },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items } = useSelector((state) => state.cart);
    console.log("ITEMS", items);

    useEffect(() => {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, [ref.current]);

    function handleImageOption(selectedOption, actionType) {
      if (actionType === 2) {
        return dispatch(
          addToCart({ id, description, url, nom, prix, arrond })
        );
      } else if (actionType === 3) {
        return navigate("/panier");
      }
    }

    function handleSubscriptionOption(selectedOption, actionType) {
      if (actionType === 2) {
        return dispatch(addToCart(selectedOption));
      } else {
        return navigate("/panier");
      }
    }

    function onSubmit(selectedOption, actionType) {
      if (selectedOption === "image") {
        handleImageOption(selectedOption, actionType);
      } else {
        handleSubscriptionOption(selectedOption, actionType);
      }
    }

    return (
      <div
        ref={ref}
        className="photoPresentation__container"
        style={{ top: `${totalHeight}px`, width: "1224px" }}
      >
        <div className="photoPresentation__header">
          <h1 className="photoPresentation__title">
            {nom} - image libre de droit -
          </h1>
          <button className="photoPresentation__closeButton" onClick={onCloseCross} >X</button>
        </div>
        <div className="photoPresentation__wrapper">
          <div className="photoPresentation__img">
            <img
              src={`/image/${arrond}/${url}.jpg`}
              width={`${scaledWidth}px`}
              height={`${scaledHeight}px`}
              alt="photo"
            />
          </div>
          <div className="photoPresentation__ref">
            <RadioGroup radios={radios} initOption="image" onSubmit={onSubmit} />
          </div>

        </div>
        <h2 className="photoPresentation__description-title">Description</h2>
        <p className="photoPresentation__description">{description}</p>
      </div>
    );
  }
);

export default PresentationItem;
