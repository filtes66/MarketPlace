import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Layout1, Layout2 } from "./components/Layout/Layout";
import "./App.css";

import Gallery from "./components/Galleries/Gallery"
import LandingPage from "./components/LandingPage"
import AuthPage from "./components/Auth/AuthPage";
import Panier from "./components/Panier/Panier";
import Success from "./components/Panier/Success";
import Cancel from "./components/Panier/Cancel";
import { fetchPhotos } from "./store/reducers/photos/slice";

function LayoutComponent({ component: Component, layout: Layout }) {
  return (
    <Layout>
      <Component />
    </Layout>
  );
}

function AppRoutes() {
  console.log("approutes");
  return (
    <Routes>
      <Route exact path="/" element={<LayoutComponent component={LandingPage} layout={Layout2} />} />
      <Route exact path="/gallery" element={<LayoutComponent component={Gallery} layout={Layout1} />} />
      <Route exact path="/auth" element={<LayoutComponent component={AuthPage} layout={Layout2} />} />
      <Route exact path="/panier" element={<LayoutComponent component={Panier} layout={Layout2} />} />
      <Route exact path="/success" element={<LayoutComponent component={Success} layout={Layout2} />} />
      <Route exact path="/cancel" element={<LayoutComponent component={Cancel} layout={Layout2} />} />
      <Route exact path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

function App() {
  const dispatch = useDispatch();
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const fetchAndSetPhotos = async () => {
      dispatch(fetchPhotos()).then(() => setFirstRender(false));
      //  setFirstRender(false);
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
