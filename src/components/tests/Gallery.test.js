import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Gallery from "../Galleries/Gallery";
import usePhotos from "../Galleries/usePhotos";

// Mock des dépendances
jest.mock("../Galleries/usePhotos");
jest.mock("../Galleries/GalleryCriteria/GalleryCriteria", () => ({ criteria, windowSize, handleSelectGallery }) => (
    <button onClick={() => handleSelectGallery("TestGallery")}>Select Gallery</button>
));
jest.mock("../Galleries/GalleryList", () => ({ photoGrid, photoRefs, windowSize }) => (
    <div>Gallery List Rendered</div>
));

jest.mock("axios", () => ({
    get: jest.fn(),
    post: jest.fn(),
}));

describe("Gallery Component", () => {
    beforeEach(() => {
        usePhotos.mockReturnValue([
            {
                grid: [{ id: 1 }, { id: 2 }],
                name: "InitialGallery",
                render: true,
            },
            true,
            jest.fn(),
            { width: 1024, height: 768 },
        ]);
    });

    test("renders the Gallery component", () => {
        render(<Gallery />);

        // Vérifie que GalleryCriteria et GalleryList sont affichés
        expect(screen.getByText("Select Gallery")).toBeInTheDocument();
        expect(screen.getByText("Gallery List Rendered")).toBeInTheDocument();
    });

    test("handles gallery selection", () => {
        const { getByText } = render(<Gallery />);
        const selectButton = getByText("Select Gallery");

        // Simule la sélection d'une galerie
        fireEvent.click(selectButton);

        expect(usePhotos.mock.results[0].value[2]).toHaveBeenCalledWith(
            expect.objectContaining({
                name: "TestGallery",
                render: false,
                grid: expect.any(Array), // Vérifie que `grid` est un tableau
            })
        );
    });

    test("does not render children when render is false", () => {
        usePhotos.mockReturnValue([
            { grid: [], name: "", render: false }, // Le rendu est désactivé
            false,
            jest.fn(),
            { width: 1024, height: 768 },
        ]);

        const { queryByText } = render(<Gallery />);

        // Vérifie que les composants enfants ne sont pas affichés
        expect(queryByText("Select Gallery")).not.toBeInTheDocument();
        expect(queryByText("Gallery List Rendered")).not.toBeInTheDocument();
    });
});
