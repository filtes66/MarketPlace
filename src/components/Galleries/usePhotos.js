import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import thunk from "../../store/reducers/photos/thunk";
import { GALLERY_NAMES } from "./galleryNames";

const usePhotos = () => {
    const refsPhotos = useRef();
    const title = useRef();
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.photos);
    console.log('items ', items)
    const [photoGrid, setPhotoGrid] = useState({ grid: [], name: "Paris", render: false });

    useEffect(() => {
        dispatch(thunk.fetchPhotos());
    }, [dispatch]);

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

    return [photoGrid, photoGrid.render, setPhotoGrid];
};

export default usePhotos;
