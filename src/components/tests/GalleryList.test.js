import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GalleryList from "../Galleries/GalleryList";

// --- Mocks des composants enfants ---

// On mocke Photo pour qu'il affiche un élément cliquable identifié par testid
jest.mock("../Galleries/Photo", () => {
    return function Photo(props) {
        return (
            <div data-testid={`photo-${props.id}`} onClick={props.onClickPhoto}>
                Photo {props.id}
            </div>
        );
    };
});

// On mocke PresentationItem pour qu'il affiche un bloc avec un bouton "Close"
jest.mock("../Galleries/PresentationItem", () => {
    const React = require("react");
    // On utilise forwardRef pour respecter la réception d'une ref
    return React.forwardRef((props, ref) => (
        <div data-testid={`presentation-${props.id}`} ref={ref}>
            PresentationItem for {props.id}
            <button onClick={props.onCloseCross}>Close</button>
        </div>
    ));
});

// --- Définition des tests ---
describe("GalleryList component", () => {
    // Un objet de dimensions pour la fenêtre
    const windowSize = { width: 1024, height: 768 };

    // Un tableau de photos simulées
    const photoGrid = [
        { id: 1, scaledHeight: 200, currentHeight: 100, otherProp: "dummy1" },
        { id: 2, scaledHeight: 300, currentHeight: 150, otherProp: "dummy2" },
    ];

    // Un objet de références, un par photo (pour cet exemple, des refs vides suffisent)
    const photoRefs = { current: [React.createRef(), React.createRef()] };

    test("affiche toutes les photos et ne montre pas de PresentationItem initialement", () => {
        render(
            <GalleryList
                photoGrid={photoGrid}
                photoRefs={photoRefs}
                windowSize={windowSize}
            />
        );

        // Les composants Photo doivent être présents
        expect(screen.getByTestId("photo-1")).toBeInTheDocument();
        expect(screen.getByTestId("photo-2")).toBeInTheDocument();

        // Aucun élément PresentationItem ne doit être affiché au départ
        expect(screen.queryByTestId("presentation-1")).not.toBeInTheDocument();
        expect(screen.queryByTestId("presentation-2")).not.toBeInTheDocument();
    });

    test("affiche le PresentationItem lorsque l'on clique sur une photo", () => {
        render(
            <GalleryList
                photoGrid={photoGrid}
                photoRefs={photoRefs}
                windowSize={windowSize}
            />
        );

        // Simuler le clic sur la photo d'id 1
        const photo1 = screen.getByTestId("photo-1");
        fireEvent.click(photo1);

        // Le PresentationItem pour la photo 1 doit apparaître
        expect(screen.getByTestId("presentation-1")).toBeInTheDocument();
    });

    test("ne fait rien lorsque la même photo est cliquée deux fois", () => {
        render(
            <GalleryList
                photoGrid={photoGrid}
                photoRefs={photoRefs}
                windowSize={windowSize}
            />
        );

        const photo1 = screen.getByTestId("photo-1");

        // Premier clic sur la photo (affiche le PresentationItem)
        fireEvent.click(photo1);
        expect(screen.getByTestId("presentation-1")).toBeInTheDocument();

        // Un second clic sur la même photo ne change rien (la fonction renvoie immédiatement)
        fireEvent.click(photo1);
        expect(screen.getByTestId("presentation-1")).toBeInTheDocument();
    });

    test("change le PresentationItem lorsque l'on clique sur une autre photo", () => {
        render(
            <GalleryList
                photoGrid={photoGrid}
                photoRefs={photoRefs}
                windowSize={windowSize}
            />
        );

        const photo1 = screen.getByTestId("photo-1");
        const photo2 = screen.getByTestId("photo-2");

        // Cliquer sur la photo d'id 1
        fireEvent.click(photo1);
        expect(screen.getByTestId("presentation-1")).toBeInTheDocument();

        // Puis cliquer sur la photo d'id 2
        fireEvent.click(photo2);
        // Le PresentationItem pour la photo 1 doit disparaître...
        expect(screen.queryByTestId("presentation-1")).not.toBeInTheDocument();
        // ... et celui pour la photo 2 doit apparaître
        expect(screen.getByTestId("presentation-2")).toBeInTheDocument();
    });

    test("cache le PresentationItem lorsque l'on clique sur le bouton 'Close'", () => {
        render(
            <GalleryList
                photoGrid={photoGrid}
                photoRefs={photoRefs}
                windowSize={windowSize}
            />
        );

        // Cliquer sur la photo d'id 1 pour afficher le PresentationItem
        const photo1 = screen.getByTestId("photo-1");
        fireEvent.click(photo1);
        expect(screen.getByTestId("presentation-1")).toBeInTheDocument();

        // Cliquer sur le bouton Close à l'intérieur du PresentationItem
        const closeButton = screen.getByText("Close");
        fireEvent.click(closeButton);

        // Le PresentationItem doit être retiré du DOM
        expect(screen.queryByTestId("presentation-1")).not.toBeInTheDocument();
    });
});
