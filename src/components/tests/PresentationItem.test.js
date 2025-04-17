import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import PresentationItem from "../Galleries/PresentationItem";
import cartReducer, { addToCart } from "../../store/reducers/cart/slice";

// On mocke le composant RadioGroup pour forcer l'appel de onSubmit lors du clic
jest.mock("../RadioGroup/RadioGroup", () => {
    return ({ radios, onSubmit }) => (
        // On affiche uniquement le texte de la première option et on appelle onSubmit au clic.
        <button onClick={() => onSubmit("image", 2)}>
            {radios[0].prix}
        </button>
    );
});

// Définition globale éventuelle pour éviter l'erreur sur scrollIntoView
beforeAll(() => {
    if (!window.HTMLElement.prototype.scrollIntoView) {
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
    }
});

describe("PresentationItem Component", () => {
    let store;
    let refMock;
    let onCloseCrossMock;

    beforeEach(() => {
        // Créez un vrai store Redux via Redux Toolkit avec un état préchargé
        store = configureStore({
            reducer: {
                cart: cartReducer,
            },
            preloadedState: {
                cart: {
                    items: [],
                },
            },
        });

        // Créez une ref réelle via React.createRef() et simulez la méthode scrollIntoView
        refMock = React.createRef();
        refMock.current = { scrollIntoView: jest.fn() };

        // Callback de fermeture simulée
        onCloseCrossMock = jest.fn();
    });

    test("affiche le contenu correct", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PresentationItem
                        id="1"
                        description="Test Description"
                        url="test-url"
                        nom="Test Nom"
                        prix="20"
                        arrond="rounded"
                        scaledHeight={300}
                        scaledWidth={400}
                        cartScaledHeight={200}
                        cartScaledWidth={250}
                        totalHeight={100}
                        onCloseCross={onCloseCrossMock}
                        ref={refMock}
                    />
                </MemoryRouter>
            </Provider>
        );

        // Vérifie l'affichage des informations
        expect(
            screen.getByText("Test Nom - image libre de droit -")
        ).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
        expect(screen.getByAltText("photo")).toHaveAttribute("src", "/image/rounded/test-url.jpg");

        // Vérifie uniquement la présence de la première option du RadioGroup
        expect(screen.getByText("20 euros pour cette image")).toBeInTheDocument();
    });

    test("scrolle dans la vue lors du montage", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PresentationItem
                        id="1"
                        description="Test Description"
                        url="test-url"
                        nom="Test Nom"
                        prix="20"
                        arrond="rounded"
                        scaledHeight={300}
                        scaledWidth={400}
                        cartScaledHeight={200}
                        cartScaledWidth={250}
                        totalHeight={100}
                        onCloseCross={onCloseCrossMock}
                        ref={refMock}
                    />
                </MemoryRouter>
            </Provider>
        );

        // Vérifie que scrollIntoView a été appelé lors du montage du composant
        expect(refMock.current.scrollIntoView).toHaveBeenCalledWith({
            behavior: "smooth",
            block: "start",
        });
    });

    test("ferme la vue lorsque le bouton 'X' est cliqué", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PresentationItem
                        id="1"
                        description="Test Description"
                        url="test-url"
                        nom="Test Nom"
                        prix="20"
                        arrond="rounded"
                        scaledHeight={300}
                        scaledWidth={400}
                        cartScaledHeight={200}
                        cartScaledWidth={250}
                        totalHeight={100}
                        onCloseCross={onCloseCrossMock}
                        ref={refMock}
                    />
                </MemoryRouter>
            </Provider>
        );

        // Clique sur le bouton de fermeture
        const closeButton = screen.getByText("X");
        fireEvent.click(closeButton);

        // Vérifie que le callback onCloseCross a bien été appelé
        expect(onCloseCrossMock).toHaveBeenCalled();
    });

    test("ajoute au panier et dispatch l'action addToCart", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PresentationItem
                        id="1"
                        description="Test Description"
                        url="test-url"
                        nom="Test Nom"
                        prix="20"
                        arrond="rounded"
                        scaledHeight={300}
                        scaledWidth={400}
                        cartScaledHeight={200}
                        cartScaledWidth={250}
                        totalHeight={100}
                        onCloseCross={onCloseCrossMock}
                        ref={refMock}
                    />
                </MemoryRouter>
            </Provider>
        );

        // Le mock du RadioGroup rend un bouton avec le texte de l'option et appelle onSubmit("image", 2) au clic.
        fireEvent.click(screen.getByText("20 euros pour cette image"));

        // Vérifie que l'action addToCart a été dispatchée correctement en inspectant l'état du store
        const state = store.getState();
        expect(state.cart.items).toContainEqual({
            id: "1",
            description: "Test Description",
            url: "test-url",
            nom: "Test Nom",
            prix: "20",
            arrond: "rounded",
            cartScaledHeight: 200,
            cartScaledWidth: 250,
        });
    });
});
