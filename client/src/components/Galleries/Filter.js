import React, { createRef, forwardRef, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Filter.css";
import SubFilter from "./SubFilter";
import { useEffect } from "react";

const Filter = ({ section, onClick, nbSubType }) => {
  console.log("filter");
  const [currentSlider, setCurrentSlider] = useState(1);
  const [subFilterSelected, setSubFilterSelected] = useState({ subFilterSelected: false, subType: [] });
  const refSlider = useRef(null);
  const refsItems = useRef([...new Array(nbSubType)].map(() => createRef(null)));
  console.log("refsitems", refsItems);

  useEffect(() => {
    if (subFilterSelected.subFilterSelected) {
      console.log("refsitems", refsItems);
      let coord = refsItems.current[2].current.getBoundingClientRect();
      console.log(coord)
    };
  }, [subFilterSelected.subFilterSelected]);
  /*
    useEffect(() => {
      if (subFilterSelected.subFilterSelected) { refSlider.current.style.transform = `translateX(${currentSlider}px)` };
    }, [currentSlider]);*/

  const FilterItem = forwardRef(({ section, onClick }, ref) => (
    <li ref={ref} className="filter__item" onClick={onClick}>
      <Link to={section}>
        <FaSearch />
      </Link>
      <p>{section}</p>
    </li>
  ));

  function onClick(subFilterSelected, subType) {
    console.log("arrondissements");
    setSubFilterSelected({
      ...subFilterSelected,
      subFilterSelected: true, subType: subType
    });
  }

  function renderLeftArrow() {
    setCurrentSlider(currentSlider => currentSlider - 10);
    if (subFilterSelected.subFilterSelected) { refSlider.current.style.transform = `translateX(${currentSlider}px)` };
  }

  function renderRightArrow() {
    setCurrentSlider(currentSlider => currentSlider + 10);
    if (subFilterSelected.subFilterSelected) { refSlider.current.style.transform = `translateX(${currentSlider}px)` };

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
      {subFilterSelected.subFilterSelected &&
        <div className="filter__subList">
          <button
            className="filter__precedent"
            onClick={renderLeftArrow}>
            <FaChevronLeft />
          </button>
          <ul ref={refSlider} className="filter__subList2">
            {
              subFilterSelected.subType.map((subSection, i) => (
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

export default Filter;
