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
                [GALLERY_NAMES.TOUR_EIFFEL]: { newGrid: photosToDisplay.tourEiffelPhotos },
                [GALLERY_NAMES.LOUVRE]: { newGrid: photosToDisplay.louvrePhotos },
                [GALLERY_NAMES.ARC_DE_TRIOMPHE]: { newGrid: photosToDisplay.arcDeTriomphePhotos },
                [GALLERY_NAMES.CHAMPS_ELYSEES]: { newGrid: photosToDisplay.champsElyseesPhotos },
                [GALLERY_NAMES.MONTMARTRE]: { newGrid: photosToDisplay.montmartrePhotos },
                [GALLERY_NAMES.PONT_NEUF]: { newGrid: photosToDisplay.pontNeufPhotos },
                [GALLERY_NAMES.CENTRE_POMPIDOU]: { newGrid: photosToDisplay.centrePompidouPhotos },
                [GALLERY_NAMES.MUSEE_D_ORSAY]: { newGrid: photosToDisplay.museeOrsayPhotos },
                [GALLERY_NAMES.DISTRICTS]: { newGrid: photosToDisplay.districtsPhotos[0], currentPhotoGridName: 'du Ier arrondissement' },
                [GALLERY_NAMES.FIRST]: { newGrid: photosToDisplay.districtsPhotos[0], currentPhotoGridName: 'du Ier arrondissement' },
                [GALLERY_NAMES.SECOND]: { newGrid: photosToDisplay.districtsPhotos[1], currentPhotoGridName: 'du IIe arrondissement' },
                [GALLERY_NAMES.THIRD]: { newGrid: photosToDisplay.districtsPhotos[2], currentPhotoGridName: 'du IIIe arrondissement' },
                [GALLERY_NAMES.FOURTH]: { newGrid: photosToDisplay.districtsPhotos[3], currentPhotoGridName: 'du IVe arrondissement' },
                [GALLERY_NAMES.FIFTH]: { newGrid: photosToDisplay.districtsPhotos[4], currentPhotoGridName: 'du Ve arrondissement' },
                [GALLERY_NAMES.SIXTH]: { newGrid: photosToDisplay.districtsPhotos[5], currentPhotoGridName: 'du VIe arrondissement' },
                [GALLERY_NAMES.SEVENTH]: { newGrid: photosToDisplay.districtsPhotos[6], currentPhotoGridName: 'du VIIe arrondissement' },
                [GALLERY_NAMES.EIGHTH]: { newGrid: photosToDisplay.districtsPhotos[7], currentPhotoGridName: 'du VIIIe arrondissement' },
                [GALLERY_NAMES.NINTH]: { newGrid: photosToDisplay.districtsPhotos[8], currentPhotoGridName: 'du IXe arrondissement' },
                [GALLERY_NAMES.TENTH]: { newGrid: photosToDisplay.districtsPhotos[9], currentPhotoGridName: 'du Xe arrondissement' },
                [GALLERY_NAMES.ELEVENTH]: { newGrid: photosToDisplay.districtsPhotos[10], currentPhotoGridName: 'du XIe arrondissement' },
                [GALLERY_NAMES.TWELFTH]: { newGrid: photosToDisplay.districtsPhotos[11], currentPhotoGridName: 'du XIIe arrondissement' },
                [GALLERY_NAMES.THIRTEENTH]: { newGrid: photosToDisplay.districtsPhotos[12], currentPhotoGridName: 'du XIIIe arrondissement' },
                [GALLERY_NAMES.FOURTEENTH]: { newGrid: photosToDisplay.districtsPhotos[13], currentPhotoGridName: 'du XIVe arrondissement' },
                [GALLERY_NAMES.FIFTEENTH]: { newGrid: photosToDisplay.districtsPhotos[14], currentPhotoGridName: 'du XVe arrondissement' },
                [GALLERY_NAMES.SIXTEENTH]: { newGrid: photosToDisplay.districtsPhotos[15], currentPhotoGridName: 'du XVIe arrondissement' },
                [GALLERY_NAMES.SEVENTEENTH]: { newGrid: photosToDisplay.districtsPhotos[16], currentPhotoGridName: 'du XVIIe arrondissement' },
                [GALLERY_NAMES.EIGHTEENTH]: { newGrid: photosToDisplay.districtsPhotos[17], currentPhotoGridName: 'du XVIIIe arrondissement' },
                [GALLERY_NAMES.NINETEENTH]: { newGrid: photosToDisplay.districtsPhotos[18], currentPhotoGridName: 'du XIXe arrondissement' },
                [GALLERY_NAMES.TWENTIETH]: { newGrid: photosToDisplay.districtsPhotos[19], currentPhotoGridName: 'du XXe arrondissement' }
            }
            console.log('currentphotogrid ', currentPhotoGrid)
            console.log('gallerygrid ', galleryGrids);
            let newGrid = galleryGrids[currentPhotoGrid.name].newGrid;
            let currentPhotoGridName = `de ${galleryGrids[currentPhotoGrid.name].photoGridName}`;
            setCurrentPhotoGrid({ ...currentPhotoGrid, grid: newGrid, render: true });
        }
    }, [photosToDisplay, currentPhotoGrid.render, currentPhotoGrid.name]);

    return [currentPhotoGrid, currentPhotoGrid.render, setCurrentPhotoGrid, viewportWidth];
};

export default usePhotos;
