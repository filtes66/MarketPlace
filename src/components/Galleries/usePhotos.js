import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resizeGallery } from "../../store/reducers/photos/slice";
import { GALLERY_NAMES } from "./galleryNames";

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
            const galleryGrids = {
                [GALLERY_NAMES.PARIS]: { newGrid: photosToDisplay.ParisPhotos },
                [GALLERY_NAMES.BUILDINGS]: { newGrid: photosToDisplay.adminPhotos },
                [GALLERY_NAMES.NEIGHBORHOODS]: { newGrid: photosToDisplay.neighborhoodPhotos },
                [GALLERY_NAMES.DISTRICTS]: { newGrid: photosToDisplay.districtsPhotos[0], currentPhotoGridName: 'du Ier arrondissement' },
                [GALLERY_NAMES.FIRST]: { newGrid: photosToDisplay.districtsPhotos[0], currentPhotoGridName: 'du Ier arrondissement' },
                [GALLERY_NAMES.SECOND]: { newGrid: photosToDisplay.districtsPhotos[1], currentPhotoGridName: 'du IIe arrondissement' },
            }
            let newGrid = galleryGrids[currentPhotoGrid.name].newGrid;
            let currentPhotoGridName = `de ${galleryGrids[currentPhotoGrid.name].photoGridName}`;
            setCurrentPhotoGrid({ ...currentPhotoGrid, grid: newGrid, render: true });
        }
    }, [photosToDisplay, currentPhotoGrid.render, currentPhotoGrid.name]);

    return [currentPhotoGrid, currentPhotoGrid.render, setCurrentPhotoGrid, viewportWidth];
};

export default usePhotos;
