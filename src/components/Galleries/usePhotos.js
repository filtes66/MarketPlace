import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resizeGallery } from "../../store/reducers/photos/slice";
import { GALLERY_NAMES } from "./galleryNames";

const usePhotos = () => {
    const refsPhotos = useRef();
    const title = useRef();
    const dispatch = useDispatch();
    const { items2 } = useSelector((state) => state.photos2);
    const { items } = useSelector((state) => state.photos);
    const [photoGrid, setPhotoGrid] = useState({ grid: [], name: "Paris", render: false });
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return (() => window.removeEventListener('resize', handleResize));
    }, []);

    useEffect(() => {
        const galleryResize = (items, windowSize) => {
            dispatch(resizeGallery({ items: items, windowSize: windowSize }));
        };
        galleryResize(items2, windowSize);
    }, [windowSize]);


    useEffect(() => {
        if (!!Object.keys(items).length && !photoGrid.loading) {
            const galleryGrids = {
                [GALLERY_NAMES.PARIS]: { newGrid: items.ParisPhotos },
                [GALLERY_NAMES.BUILDINGS]: { newGrid: items.adminPhotos },
                [GALLERY_NAMES.NEIGHBORHOODS]: { newGrid: items.neighborhoodPhotos },
                [GALLERY_NAMES.DISTRICTS]: { newGrid: items.districtsPhotos[0], photoGridName: 'du Ier arrondissement' },
                [GALLERY_NAMES.FIRST]: { newGrid: items.districtsPhotos[0], photoGridName: 'du Ier arrondissement' },
                [GALLERY_NAMES.SECOND]: { newGrid: items.districtsPhotos[1], photoGridName: 'du IIe arrondissement' },
            }
            let newGrid = galleryGrids[photoGrid.name].newGrid;
            let photoGridName = `de ${galleryGrids[photoGrid.name].photoGridName}`;
            setPhotoGrid({ ...photoGrid, grid: newGrid, render: true });
        }
    }, [items, photoGrid.render, photoGrid.name]);

    return [photoGrid, photoGrid.render, setPhotoGrid, windowSize];
};

export default usePhotos;
