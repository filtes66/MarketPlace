import React, { createRef, forwardRef, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./GalleryCriteria.css";
import { useEffect } from "react";

const GalleryCriteria = ({ section, onClick, nbSubCriteria, onSelectGallery }) => {
  console.log("gallerycriteria");
  const refSlider = useRef(null);
  const refsItems = useRef([...new Array(nbSubCriteria)].map(() => createRef(null)));
  const [currentSlider, setCurrentSlider] = useState(1);
  const [criteria, setCriteria] = useState({ criteriaSelected: false, subCriteria: [] });

  useEffect(() => {
    if (criteria.criteriaSelected) {
      /*   let coord = refsItems.current[2].current.getBoundingClientRect();
         console.log(coord)*/
      refSlider.current.style.transform = `translateX(${currentSlider}px)`
    };
  }, [criteria.criteriaSelected, currentSlider]);

  function onCriteriaItem(criteria, subCriteria) {
    console.log("arrondissements");
    setCriteria({
      ...criteria,
      criteriaSelected: true, subCriteria: subCriteria
    });
  }

  function renderLeftArrow() {
    setCurrentSlider(currentSlider => currentSlider - 200);
  }

  function renderRightArrow() {
    setCurrentSlider(currentSlider => currentSlider + 200);
  }



  return (
    <>
      <ul className="filter__items">
        {section.map((section, i) =>
          /* section.subCriteria ? (
             <CriteriaItem
               section={section.nom}
               key={i}
                    onCriteriaItem={() => onCriteriaItem(true, section.subCriteria)}
                    ref={refsItems.current[i]}
             />
           ) : (*/
          <CriteriaItem section={section.nom} key={i} onCriteria={section.subCriteria ? () => onCriteriaItem(true, section.subCriteria) : () => onSelectGallery(section.nom)} />
          //   )
        )}
      </ul>
      {criteria.criteriaSelected &&
        <div className="filter__subList">
          <button
            className="filter__precedent"
            onClick={renderLeftArrow}>
            <FaChevronLeft />
          </button>
          <ul ref={refSlider} className="filter__subList2">
            {
              criteria.subCriteria.map((subSection, i) => (
                <CriteriaItem key={i} section={subSection} onCriteria={() => onSelectGallery(subSection)} />
              ))}
          </ul>
          <button
            className="filter__suivant"
            onClick={renderRightArrow}>
            <FaChevronRight />
          </button>
        </div>
      }
    </>
  );
};

const CriteriaItem = forwardRef(({ section, onCriteria }, ref) => {
  console.log("creteriaitem sectio", section);
  return (
    <li ref={ref} className="filter__item" onClick={onCriteria}>
      <Link to={section}>
        <FaSearch />
      </Link>
      <p>{section}</p>
    </li>
  )
});

export default GalleryCriteria;
