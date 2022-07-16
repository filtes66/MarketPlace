import React, { createRef, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import GalleryCriteria from "./GalleryCriteria";
import GalleryList from "./GalleryList";
import { createPhotosGrid } from "./utils";
import "./Gallery.css";
import { useEffect } from "react";

const Gallery = (props) => {
  //const { arrond } = useParams();
  const arrond = 1;
  console.log("gallery");
  /* const createdPhotosGrid = useMemo(() => {
     return createPhotosGrid(props.items);
   }, []); */
  const refsPhotos = useRef(
    [...new Array(props.items.length)].map(() => createRef())
  );
  const [createdPhotosGrid, setCreatedPhotosGrid] = useState([]);
  const [selectGallery, setSelectGallery] = useState("arrondissements");
  const title = `${props.items.length} photos du ${formatDistrict(
    arrond
  )} arrondissement`;
  const criteria = [
    { nom: "bâtiments administratifs", subCriteria: null },
    { nom: "quartiers", subCriteria: null },
    {
      nom: "arrondissements",
      subCriteria: [
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
    { nom: "tour eiffel", subCriteria: null },
    { nom: "champs élysées", subCriteria: null },
    { nom: "louvre", subCriteria: null },
    { nom: "arc de triomphe", subCriteria: null },
  ];

  /* useEffect(() => {
     console.log("useeffect2", props.items.districtArray[arrond - 1])
     setCreatedPhotosGrid(createPhotosGrid(props.items.districtArray[0]))
   }, []);*/

  useEffect(() => {

    console.log("useeffect1, arrond, selectGallery ", arrond, selectGallery);
    let items;
    switch (selectGallery) {
      case 'bâtiments administratifs': items = props.items.arrayAdmin; break;
      case 'quartier': items = props.items.arrayQuart; break;
      case 'arrondissements': items = props.items.districtArray[arrond - 1]; break;
    }
    /* const createdPhotosGrid = useMemo(() => {
       return createPhotosGrid(items);
     }, []);*/
    console.log("items props.items", items, props.items)
    setCreatedPhotosGrid(createPhotosGrid(items));

  }, [selectGallery]);


  function formatDistrict(district) {
    if (district === "1") {
      district = "1er";
    } else {
      district = `${district} ème`;
    }
    return district;
  }

  function onSelectGallery(nomSection) {
    console.log("onselectgallery_nomsection", nomSection)
    setSelectGallery(nomSection)
  }

  console.log("!!createdPhotosGrid", !!createdPhotosGrid)

  return (
    <>
      <div className="header__filters">
        <GalleryCriteria section={criteria} nbSubCriteria={20} onSelectGallery={onSelectGallery} />
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
