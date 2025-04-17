import React from "react";
import { render } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { fetchPhotos } from "../../store/reducers/photos/slice";
import App from "../../App";

// Mock des dépendances externes
jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
}));

jest.mock("../../store/reducers/photos/slice", () => ({
    fetchPhotos: jest.fn(() => Promise.resolve()),
}));

jest.mock("../../AppRoutes", () => () => <div data-testid="app-routes"></div>);

describe("App component", () => {
    let mockDispatch;

    beforeEach(() => {
        mockDispatch = jest.fn((action) => action); // Simule que dispatch retourne une promesse
        useDispatch.mockReturnValue(mockDispatch);
    });

    test("App ne rend rien tant que firstRender est true", () => {
        const { container } = render(<App />);
        expect(container.firstChild).toBeNull();
    });

    test("App appelle dispatch(fetchPhotos) dans useEffect", () => {
        render(<App />);
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(fetchPhotos());
    });

    test("App rend AppRoutes après que firstRender devienne false", async () => {
        const { findByTestId } = render(<App />);
        expect(await findByTestId("app-routes")).toBeInTheDocument();
    });
});
