import React from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import { Layout1, Layout2 } from "./Layout/Layout";
import "./App.css";

import Gallery from "./Galleries/Gallery";
import LandingPage from "./LandingPage";
import AuthPage from "./Auth/AuthPage";
import Panier from "./Panier/Panier";
import Success from "./Panier/Success";
import Cancel from "./Panier/Cancel";
//import AchatPhoto from "./elements/AchatPhoto/AchatPhoto";

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
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
