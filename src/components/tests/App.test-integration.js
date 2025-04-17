import { configureStore } from '@reduxjs/toolkit';
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../../App";

// Configuration du store mock
const mockStore = configureStore({
    reducer: {
        isLoading: false,
        photos: (state = { data: [] }) => state,
    },
});

describe("App component", () => {
    let store;

    beforeEach(() => {
        // Simule le store Redux
        store = mockStore;
    });

    test("rend LoginPage lorsqu'un utilisateur n'est pas connecté", () => {
        render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        );

        // Vérifie que LoginPage est affiché par défaut
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    test("redirige vers la page LandingPage après connexion", () => {
        render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        );

        // Simule un bouton de connexion dans LoginPage
        const loginButton = screen.getByRole("button", { name: /login/i });
        fireEvent.click(loginButton);

        // Vérifie que LandingPage est visible après connexion
        expect(screen.getByText(/landing page/i)).toBeInTheDocument();
    });

    test("navigue correctement vers la page Gallery après connexion", () => {
        render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        );

        // Simule un bouton de connexion
        const loginButton = screen.getByRole("button", { name: /login/i });
        fireEvent.click(loginButton);

        // Simule une navigation vers "/gallery"
        const galleryLink = screen.getByRole("link", { name: /gallery/i });
        fireEvent.click(galleryLink);

        // Vérifie que la page Gallery est rendue
        expect(screen.getByText(/gallery/i)).toBeInTheDocument();
    });

    test("redirige vers la page d'accueil pour une route non définie", () => {
        render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        );

        // Simule une navigation vers une route non définie
        const badRoute = "/non-existing-path";
        window.history.pushState({}, "Test Page", badRoute);

        // Vérifie que la redirection vers "/" s'est produite
        expect(screen.getByText(/landing page/i)).toBeInTheDocument();
    });
});
