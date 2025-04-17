import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPhotos } from "./store/reducers/photos/slice";
import AppRoutes from "./AppRoutes";

function App() {
    const dispatch = useDispatch();
    const [firstRender, setFirstRender] = useState(true);

    useEffect(() => {
        const fetchAndSetPhotos = async () => {
            dispatch(fetchPhotos()).then(() => setFirstRender(false));
        };
        fetchAndSetPhotos();
    }, [dispatch]);

    if (firstRender) return null;

    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

export default App;