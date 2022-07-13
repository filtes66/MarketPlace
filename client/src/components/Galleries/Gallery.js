import React, { createRef, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Filter from "./Filter";
import GalleryList from "./GalleryList";
import { createPhotosGrid } from "./utils";
import "./Gallery.css";

const Gallery = (props) => {
  const { arrond } = useParams();
  const createdPhotosGrid = useMemo(() => {
    return createPhotosGrid(props.items);
  }, []);
  const [districtSelected, setdistrictSelected] = useState(false);
  const title = `${props.items.length} photos du ${formatDistrict(
    arrond
  )} arrondissement`;
  const refsPhotos = useRef(
    [...new Array(props.items.length)].map(() => createRef())
  );
  console.log("refsPhotos ", refsPhotos);
  const filters = [
    { type: "bâtiments administratifs", subType: undefined },
    { type: "quartiers", subType: undefined },
    {
      type: "arrondissements",
      subType: [
        "Ier",
        "IIe",
        "IIIe",
        "IVe",
        "Ve",
        "VIe",
        "VIIe",
        "VIIIe",
        "IXe",
        "Xe",
        "XIe",
        "XIIe",
        "XIIIe",
        "XIVe",
        "XVe",
        "XVI",
        "XVIIe",
        "XVIIIe",
        "XIXe",
        "XXe",
      ],
    },
    { type: "tour eiffel", subType: undefined },
    { type: "champs élysées", subType: undefined },
    { type: "louvre", subType: undefined },
    { type: "arc de triomphe", subType: undefined },
  ];
  /* const districtFilter = ["arrondissements"];
  const districtFilters = [
    "Ier",
    "IIe",
    "IIIe",
    "IVe",
    "Ve",
    "VIe",
    "VIIe",
    "VIIIe",
    "IXe",
    "Xe",
    "XIe",
    "XIIe",
    "XIIIe",
    "XIVe",
    "XVe",
    "XVI",
    "XVIIe",
    "XVIIIe",
    "XIXe",
    "XXe",
  ];

  function onClick() {
    console.log("arrondissements");
    setdistrictSelected(true);
  }*/

  function formatDistrict(district) {
    if (district === "1") {
      district = "1er";
    } else {
      district = `${district} ème`;
    }
    return district;
  }

  return (
    <>
      <section className="header__filters">
        <Filter section={filters} nbSubType={20} />
        {/* <Filter section={districtFilter} onClick={onClick} />
        {districtSelected && <Filter section={districtFilters} />}*/}
      </section>
      <div className="gallery__title">{title}</div>
      <GalleryList
        createdPhotosGrid={createdPhotosGrid}
        refsPhotos={refsPhotos}
      />
    </>
  );
};

export default Gallery;
