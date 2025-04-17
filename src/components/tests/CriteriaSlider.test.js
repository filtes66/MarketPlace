jest.mock("axios", () => ({
    get: jest.fn(),
    post: jest.fn(),
}));

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CriteriaSlider from "../Galleries/GalleryCriteria/CriteriaSlider";
import '@testing-library/jest-dom/extend-expect';
import { use } from "react";

jest.mock("../Galleries/GalleryCriteria/useSliderLogic", () => {
    const mocks = {
        nextTranslationSlider: jest.fn(),
        prevTranslationSlider: jest.fn(),
    };
    return {
        useSliderLogic: () => mocks,
    };
});

// On mocke le composant CriteriaItem pour simplifier le test
jest.mock("../Galleries/GalleryCriteria/CriteriaItem", () => {
    const React = require("react");
    return React.forwardRef(({ item, handleItem }, ref) => (
        <li ref={ref} data-testid="criteria-item" onClick={handleItem}>
            {item}
        </li>
    ));
});

describe("CriteriaSlider Component", () => {
    const criteria = [
        { name: "Criteria1", subCriteria: "SubCriteria1" },
        { name: "Criteria2" } // pas de sous-critère
    ];
    const nbCriteria = criteria.length;
    const nbSlides = 1;
    const windowSize = 1200;

    let handleSelectGalleryMock;
    let handleSubCriteriaItemMock;
    let nextTranslationSlider;
    let prevTranslationSlider;

    beforeEach(() => {
        handleSelectGalleryMock = jest.fn();
        handleSubCriteriaItemMock = jest.fn();

        // On récupère les mocks de useSliderLogic et on les réinitialise
        const { useSliderLogic } = require("../Galleries/GalleryCriteria/useSliderLogic");
        nextTranslationSlider = useSliderLogic().nextTranslationSlider;
        prevTranslationSlider = useSliderLogic().prevTranslationSlider;

        nextTranslationSlider.mockClear();
        prevTranslationSlider.mockClear();

        // On simule les valeurs retournées par les mocks
        nextTranslationSlider.mockReturnValue(100);
        prevTranslationSlider.mockReturnValue(-100);
    });

    test("rend correctement la slider avec le style attendu", () => {
        render(
            <CriteriaSlider
                criteria={criteria}
                nbCriteria={nbCriteria}
                handleSelectGallery={handleSelectGalleryMock}
                handleSubCriteriaItem={handleSubCriteriaItemMock}
                nbSlides={nbSlides}
                windowSize={windowSize}
            />
        );

        const items = screen.getAllByTestId("criteria-item");
        expect(items).toHaveLength(nbCriteria);
        expect(items[0]).toHaveTextContent("Criteria1");
        expect(items[1]).toHaveTextContent("Criteria2");
    });

    test("met à jour la translation lorsqu'on clique sur le bouton de droite", () => {
        render(
            <CriteriaSlider
                criteria={criteria}
                nbCriteria={nbCriteria}
                handleSelectGallery={handleSelectGalleryMock}
                handleSubCriteriaItem={handleSubCriteriaItemMock}
                nbSlides={nbSlides}
                windowSize={windowSize}
            />
        );

        const rightButton = screen.getAllByRole("button", { name: /translate slider/i })[1];
        fireEvent.click(rightButton);

        expect(nextTranslationSlider).toHaveBeenCalledWith(nbSlides);

        const sliderList = document.querySelector(".filter__subList2");
        expect(sliderList).toHaveStyle("transform: translateX(100px)");
    });

    test("met à jour la translation lorsqu'on clique sur le bouton de gauche", () => {
        render(
            <CriteriaSlider
                criteria={criteria}
                nbCriteria={nbCriteria}
                handleSelectGallery={handleSelectGalleryMock}
                handleSubCriteriaItem={handleSubCriteriaItemMock}
                nbSlides={nbSlides}
                windowSize={windowSize}
            />
        );

        const leftButton = screen.getAllByRole("button", { name: /translate slider/i })[0];
        fireEvent.click(leftButton);

        expect(prevTranslationSlider).toHaveBeenCalledWith(nbSlides);

        const sliderList = document.querySelector(".filter__subList2");
        expect(sliderList).toHaveStyle("transform: translateX(-100px)");
    });

    test("déclenche le bon callback lors du clic sur un critère", () => {
        render(
            <CriteriaSlider
                criteria={criteria}
                nbCriteria={nbCriteria}
                handleSelectGallery={handleSelectGalleryMock}
                handleSubCriteriaItem={handleSubCriteriaItemMock}
                nbSlides={nbSlides}
                windowSize={windowSize}
            />
        );

        const items = screen.getAllByTestId("criteria-item");

        fireEvent.click(items[0]);
        expect(handleSubCriteriaItemMock).toHaveBeenCalledWith(true, "SubCriteria1");
        expect(handleSelectGalleryMock).not.toHaveBeenCalled();

        handleSubCriteriaItemMock.mockClear();
        handleSelectGalleryMock.mockClear();

        fireEvent.click(items[1]);
        expect(handleSelectGalleryMock).toHaveBeenCalledWith("Criteria2");
        expect(handleSubCriteriaItemMock).not.toHaveBeenCalled();
    });
});
