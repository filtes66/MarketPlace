import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resizeGallery } from "../../store/reducers/photos/slice";

const usePhotos = () => {
    const galleryTitle = useRef();
    const dispatch = useDispatch();
    const photosFromDatabase = useSelector((state) => state.photosDatabase.items);
    const photosToDisplay = useSelector((state) => state.galleryPhotos.items)
    const [currentPhotoGrid, setCurrentPhotoGrid] = useState({ grid: [], name: "Paris", render: false });
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            const mainContainerWidth = window.innerWidth * (1 - 5 / 100);
            setViewportWidth(mainContainerWidth);
        };
        window.addEventListener('resize', handleResize);
        return (() => window.removeEventListener('resize', handleResize));
    }, []);

    useEffect(() => {
        const galleryResize = (items, viewportWidth) => {
            dispatch(resizeGallery({ items: items, viewportWidth: viewportWidth }));
        };
        galleryResize(photosFromDatabase, viewportWidth);
    }, [viewportWidth]);

    useEffect(() => {
        if (!!Object.keys(photosToDisplay).length && !currentPhotoGrid.loading) {
            let galleryGrid;
            let currentPhotoGridName;

            // Vérifier si la grille correspond aux arrondissements
            if (currentPhotoGrid.name.startsWith("district")) {
                const districtIndex = parseInt(currentPhotoGrid.name.match(/\d+/)[0], 10) - 1; // Extraire l'indice (par ex. 'districtsPhotos1' => 0)
                galleryGrid = photosToDisplay.districtsPhotos[districtIndex];
                currentPhotoGridName = `du ${currentPhotoGrid.name.match(/^\d+/) || ''}e arrondissement`; // Adapter le nom de l'arrondissement
            } else {
                galleryGrid = photosToDisplay[`${currentPhotoGrid.name}Photos`];
            }
            setCurrentPhotoGrid((prev) => ({ ...prev, grid: galleryGrid, render: true }));
            console.log('galleryGrid ', currentPhotoGrid.name, galleryGrid);
        }
    }, [photosToDisplay, currentPhotoGrid.render, currentPhotoGrid.name]
    )

    return [currentPhotoGrid, currentPhotoGrid.render, setCurrentPhotoGrid, viewportWidth];
};

export default usePhotos;
