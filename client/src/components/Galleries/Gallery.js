import React, { createRef, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import GalleryCriteria from "./GalleryCriteria";
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
  const criteria = [
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
      <div className="header__filters">
        <GalleryCriteria section={criteria} nbSubType={20} />
      </div>
      <div className="gallery__title">{title}</div>
      <GalleryList
        createdPhotosGrid={createdPhotosGrid}
        refsPhotos={refsPhotos}
      />
    </>
  );
};

export default Gallery;
