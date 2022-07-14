import React, { createRef, forwardRef, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./GalleryCriteria.css";
import { useEffect } from "react";

const GalleryCriteria = ({ section, onClick, nbSubType }) => {
  const [currentSlider, setCurrentSlider] = useState(1);
  const [criteria, setCriteria] = useState({ criteriaSelected: false, subCriteria: [] });
  const refSlider = useRef(null);
  const refsItems = useRef([...new Array(nbSubType)].map(() => createRef(null)));

  useEffect(() => {
    if (criteria.criteriaSelected) {
      let coord = refsItems.current[2].current.getBoundingClientRect();
      console.log(coord)
    };
  }, [criteria.criteriaSelected]);
  /*
    useEffect(() => {
      if (subFilterSelected.criteriaSelected) { refSlider.current.style.transform = `translateX(${currentSlider}px)` };
    }, [currentSlider]);*/

  const FilterItem = forwardRef(({ section, onClick }, ref) => (
    <li ref={ref} className="filter__item" onClick={onClick}>
      <Link to={section}>
        <FaSearch />
      </Link>
      <p>{section}</p>
    </li>
  ));

  function onClick(criteria, subType) {
    console.log("arrondissements");
    setCriteria({
      ...criteria,
      criteriaSelected: true, subType: subType
    });
  }

  function renderLeftArrow() {
    setCurrentSlider(currentSlider => currentSlider - 10);
    if (criteria.criteriaSelected) { refSlider.current.style.transform = `translateX(${currentSlider}px)` };
  }

  function renderRightArrow() {
    setCurrentSlider(currentSlider => currentSlider + 10);
    if (criteria.criteriaSelected) { refSlider.current.style.transform = `translateX(${currentSlider}px)` };

  }

  return (
    <>
      <ul className="filter__items">
        {section.map((section, i) =>
          section.subType ? (
            <FilterItem
              section={section.type}
              key={i}
              onClick={() => onClick(true, section.subType)}
              ref={refsItems.current[i]}
            />
          ) : (
            <FilterItem section={section.type} key={i} />
          )
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
              criteria.subType.map((subSection, i) => (
                <FilterItem key={i} section={subSection} />
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

export default GalleryCriteria;
