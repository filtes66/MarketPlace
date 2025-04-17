import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Photo from '../Galleries/Photo';

// On mocke LazyLoadImage pour qu'il se comporte comme une balise <img>
// afin de pouvoir tester facilement les attributs.
jest.mock('react-lazy-load-image-component', () => ({
    LazyLoadImage: (props) => <img {...props} />
}));

describe('Photo Component', () => {
    // On définit des propriétés de test.
    const props = {
        id: "1",
        url: "test-url",
        nom: "Test Nom",
        prix: "20",
        arrond: "rounded",
        onClickPhoto: jest.fn(),
        currentHeight: 300,
        currentWidth: 400,
        windowSize: 1200, // GRID_WIDTH sera égal à 1200
    };

    // Réinitialise le mock de la fonction de clic avant chaque test
    beforeEach(() => {
        props.onClickPhoto.mockClear();
    });

    test('rend le contenu correct', () => {
        render(<Photo {...props} />);

        // Vérifie que le conteneur possède les bonnes dimensions.
        const container = document.querySelector('.photo__container');
        expect(container).toHaveStyle(`height: ${props.currentHeight}px`);
        expect(container).toHaveStyle(`width: ${props.currentWidth}px`);

        // Vérifie que l'image est rendue avec les bons attributs.
        // L'attribut alt est construit depuis l'arrondissement.
        const image = screen.getByAltText(`Photo from ${props.arrond}`);
        expect(image).toHaveAttribute('src', `/image/${props.arrond}/${props.url}.jpg`);

        // Calcul de adjustedHeight :
        // Si currentWidth !== windowSize, alors adjustedHeight = currentHeight - 2 * PADDING.
        // Ici : 300 - 2 * 3 = 294.
        expect(image).toHaveAttribute('height', '294');
        expect(image).toHaveAttribute('width', 'auto');
    });

    test("déclenche onClickPhoto lors du clic sur l'image", () => {
        render(<Photo {...props} />);

        // On simule un clic sur l'image. Le LazyLoadImage (mocké en <img />) recevra le onClick.
        const image = screen.getByAltText(`Photo from ${props.arrond}`);
        fireEvent.click(image);

        // Vérifie que la fonction onClickPhoto a été appelée avec l'id "1".
        expect(props.onClickPhoto).toHaveBeenCalledWith("1");
    });
});
