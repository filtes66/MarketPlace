import React, { useState } from 'react';
import CriteriaSlider from './CriteriaSlider';

function GalleryCriteria({ criteria, handleSelectGallery }) {

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
        <>
            <CriteriaSlider
                handleSubCriteriaItem={handleSubCriteriaItem}
                handleSelectGallery={handleSelectGallery}
                criteria={criteria}
                nbCriteria={criteria.length}
                nbSlides={1}
            />
            {criteriaItem.isSubCriterSelected && (
                <CriteriaSlider
                    handleSubCriteriaItem={null}
                    handleSelectGallery={handleSelectGallery}
                    criteria={criteriaItem.subCriteria}
                    nbCriteria={criteriaItem.subCriteria.length}
                    nbSlides={3}
                />
            )
            }
        </>
    );
}

export default GalleryCriteria;
