import React, { useState } from "react";
/*import * as ACTIONS from "../store/actions";
import { connect } from "react-redux";

import ButtonAdd from "../store/ButtonAdd";*/
import RadioGroup from "../../container/RadioGroup";

function AchatPhoto(props) {
  let id = props.match.params.id_photo;

  let radios = [
    { value: "petit", text: "petit" },
    { value: "moyen", text: "moyen" },
    { value: "grand", text: "grand" },
  ];

  let [photoData, setPhotoData] = useState();

  useEffects(() => {
    fetchData("http://localhost:5000/photo/" + id, setPhotoData);
  });

  if (photosData.length === 0) {
    return null;
  }

  function onSubmit(selectedOption) {
    const { id, description, prixUnitaire } = photoData[0];
    props.add_item(id, selectedOption, description, prixUnitaire);
  }

  return (
    <div className="achat-photo__flex">
      <div className="achat-photo__photo">
        <img src={url_photo} height="" width="" alt="" />
      </div>
      <RadioGroup radios={radios} optionInit="grand" onSubmit={onSubmit} />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    add_item: function (id, selectedOption, description, prixUnitaire) {
      let action = ACTIONS.add_item(
        id,
        selectedOption,
        description,
        prixUnitaire
      );
      dispatch(action);
    },
  };
}

export default connect(null, mapDispatchToProps)(AchatPhoto);
