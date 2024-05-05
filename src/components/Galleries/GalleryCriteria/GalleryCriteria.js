import React, { useState } from 'react';
import CriteriaSlider from './CriteriaSlider';

function GalleryCriteria({ criteria, handleSelectGallery, windowSize }) {

    const [criteriaItem, setCriteriaItem] = useState({
        isSubCriterSelected: false,
        subCriteria: [],
    });

    const handleSubCriteriaItem = (isSubCriterSelected, subCriteria) => {
        setCriteriaItem({
            ...criteriaItem,
            isSubCriterSelected: isSubCriterSelected,
            subCriteria,
        });
    };

    return (
        <div style={{ width: `${windowSize}px` }}>
            <CriteriaSlider
                handleSubCriteriaItem={handleSubCriteriaItem}
                handleSelectGallery={handleSelectGallery}
                criteria={criteria}
                nbCriteria={criteria.length}
                nbSlides={1}
                windowSize={windowSize}
            />
            {criteriaItem.isSubCriterSelected && (
                <CriteriaSlider
                    handleSubCriteriaItem={null}
                    handleSelectGallery={handleSelectGallery}
                    criteria={criteriaItem.subCriteria}
                    nbCriteria={criteriaItem.subCriteria.length}
                    nbSlides={3}
                    windowSize={windowSize}
                />
            )
            }
        </div>
    );
}

export default GalleryCriteria;
