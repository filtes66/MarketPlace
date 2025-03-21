import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import PhotoRender from "../Galleries/Photo";
import Payment from "./Payment";
import { removeFromCart } from "../../store/reducers/cart/slice";
import "./Panier.css";

function Panier() {
  const dispatch = useDispatch();
  const { items, totalPrice, numberItems } = useSelector((state) => state.cart);
  const onTrashClick = (item) => dispatch(removeFromCart(item));


  const resolution = "6000 x 3900 px (50,80 x 33,02 cm) - 300 dpi - RVB";
  const licence = "libre de droits";


  const Item = ({ url, nom, id, prix, arrond, cartScaledHeight, cartScaledWidth }) => (
    <div className="panier-item__flex">
      <div className="panier-item__photo">
        { /*    <PhotoRender url={url} arrond={arrond} currentHeight="110px" />*/}
        <img className="photo__image"
          src={`/image/${arrond}/${url}.jpg`}
          height={cartScaledHeight}
          width={cartScaledWidth}
          alt={`Photo from ${arrond}`} />
      </div>
      <div className="panier-item__description">
        <div className="panier-item__nom-flex">
          <div className="panier-item__nom">Nom</div>
          <div>{nom}</div>
        </div>
        <div className="panier-item__resolution-flex">
          <div className="panier-item__resolution">Résolution</div>
          <div>{resolution}</div>
        </div>
        <div className="panier-item__licence-flex">
          <div className="panier-item__licence">Type de licence</div>
          <div>{licence}</div>
        </div>
      </div>
      <div className="panier-item__prix-flex">
        <div className="panier-item__trash" onClick={() => onTrashClick(id)}>
          X
        </div>
        <div className="panier-item__price">{prix} €</div>
      </div>
    </div>
  );

  const ListeItems = ({ items }) => {
    const listeItems = items.map(({ url, nom, id, prix, arrond, cartScaledHeight, cartScaledWidth }) => (
      <Item key={id} url={url} nom={nom} id={id} prix={prix} arrond={arrond} cartScaledHeight={{ cartScaledHeight }} cartScaledWidth={cartScaledWidth} />
    ));
    return <>{listeItems}</>;
  };

  return (
    <div className="panier">
      <h1 className="panier__title">Panier d'achats</h1>
      <Link to="/gallery" className="panier__Link">Back to Gallery</Link>
      <div className="panier__header-flex">
        <h2 className="panier__count-items">Articles sélectionnés pour l'achat : {numberItems}</h2>
        <div className="panier__header">
          <p className="panier__total">Total : {totalPrice}  €</p>
          <Payment />
        </div>
      </div>
      <div>
        <ListeItems items={items} />
      </div>
      <div className="panier__footer">
        <p className="panier__total">Total : {totalPrice} €</p>
        <Payment />
      </div>
    </div>
  );
}
export default Panier;
