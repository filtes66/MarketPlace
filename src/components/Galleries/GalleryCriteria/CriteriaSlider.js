import React, { createRef, useRef, useState } from 'react';
import { useSliderLogic } from './useSliderLogic';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CriteriaItem from './CriteriaItem';
import './CriteriaSlider.css';

function CriteriaSlider({ criteria, nbCriteria, handleSelectGallery, handleSubCriteriaItem, nbSlides, windowSize }) {
    const refSlider = useRef(null);
    const refRightButton = useRef(null);
    const refLeftButton = useRef(null);
    const refsItems = useRef([...new Array(nbCriteria)].map(() => createRef(null)));
    const [translationSlider, setTranslationSlider] = useState();
    const { nextTranslationSlider, prevTranslationSlider } = useSliderLogic(refRightButton, refLeftButton, refsItems, criteria);

    const handleNextSlides = () => {
        const translationSlider = nextTranslationSlider(nbSlides);
        setTranslationSlider(translationSlider);
    };

    const handlePrevSlides = () => {
        const translationSlider = prevTranslationSlider(nbSlides);
        setTranslationSlider(translationSlider);
    };

    return (
        <div style={{ left: `${windowSize - 30}px` }}>
            <div className="filter__subList">
                <button
                    ref={refLeftButton}
                    type="button"
                    title="translate slider"
                    className="filter__previous"
                    onClick={handlePrevSlides} >
                    <FaChevronLeft />
                </button>
                <div
                    className="filter__wrapper"
                >
                    <ul
                        ref={refSlider}
                        className="filter__subList2"
                        style={{ transform: `translateX(${translationSlider}px)` }}
                    >
                        {criteria.map((item, i) => (
                            <CriteriaItem
                                key={i}
                                ref={refsItems.current[i]}
                                item={item.name}
                                handleItem={
                                    item.subCriteria
                                        ? () => handleSubCriteriaItem(true, item.subCriteria)
                                        : () => handleSelectGallery(item.name)
                                }
                            />
                        ))}
                    </ul>
                </div>
                <button
                    ref={refRightButton}
                    type="button"
                    title='translate slider'
                    className="filter__next"
                    onClick={handleNextSlides} >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}

export default CriteriaSlider;