import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import PhotoRender from "../Galleries/Photo";
import "./Panier.css";

function Panier() {
  const { items } = useSelector((state) => state.card);
  const navigate = useNavigate();

  const resolution = "6000 x 3900 px (50,80 x 33,02 cm) - 300 dpi - RVB";
  const licence = "libre de droits";

  function onClickButton(e) {
    //dispatch totalPrice
    navigate("/Login");
  }

  const Item = ({ url, nom, prix, arrond }) => (
    <div className="panier-item__flex">
      <div className="panier-item__photo">
        <PhotoRender url={url} arrond={arrond} height="110px" />
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
          <FaTrash />
        </div>
        <div className="panier-item__price">{prix} €</div>
      </div>
    </div>
  );

  const ListeItems = ({ items }) => {
    const listeItems = items.map(({ url, nom, id, prix, arrond }) => (
      <Item key={id} url={url} nom={nom} prix={prix} arrond={arrond} />
    ));
    return <>{listeItems}</>;
  };

  console.log("ITEMS", items);

  return (
    <div className="panier">
      <div className="panier__header-flex">
        <h1 className="panier__title">Panier d'achats</h1>
        {/*   <div className="panier__header">
          <p className="panier__total">Total</p>
          <button className="panier__button" onClick={onClickButton}>
            CONTINUER LA COMMANDE
          </button>
  </div>*/}
      </div>
      <div>
        <ListeItems items={items} />
      </div>
      <div className="panier__footer">
        <p className="panier__total">Total</p>
        <button className="panier__button" onClick={onClickButton}>
          CONTINUER LA COMMANDE
        </button>
      </div>
    </div>
  );
}
export default Panier;
