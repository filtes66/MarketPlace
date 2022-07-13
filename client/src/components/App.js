import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Layout1, Layout2 } from "./Layout/Layout";
//import Route from "./Layout/Route";
import "./App.css";

import Home from "./Home/Home";
//import Register from "./Auth/Register";
//import Login from "./Auth/Login";
import Login from "./Login/Login";
import Arrondissements from "./Home/Arrondissements";
import GalleryDistrict from "./Galleries/GalleryDistrict";
import GalleryAdministration from "./Galleries/GalleryAdministration";
import Panier from "./Panier/Panier";
import Arrondissement from "./Home/Arrondissement/Arrondissement";
/*import Arrondissements from "./elements/Arrondissements/Arrondissements";
import PhotosArrond from "./containers/PhotosArrond/PhotosArrond";
import AchatPhoto from "./elements/AchatPhoto/AchatPhoto";*/

//import "./App.css";

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
      <Route
        exact
        path="/"
        element={<LayoutComponent component={Home} layout={Layout1} />}
      />
      {/*    <Route
        exact
        path="/Register"
        element={<LayoutComponent component={Register} layout={Layout2} />}
  />*/}
      <Route
        exact
        path="/Login"
        element={<LayoutComponent component={Login} layout={Layout2} />}
      />
      <Route
        exact
        path="/arrondissements"
        element={
          <LayoutComponent component={Arrondissements} layout={Layout1} />
        }
      />
      <Route
        exact
        path="/photos-de-l-arrondissement/:arrond"
        element={
          <LayoutComponent component={GalleryDistrict} layout={Layout1} />
        }
      />
      <Route
        exact
        path="/photos-des-bâtiments-administratifs"
        element={
          <LayoutComponent component={GalleryAdministration} layout={Layout1} />
        }
      />
      <Route
        exact
        path="/panier"
        element={<LayoutComponent component={Panier} layout={Layout1} />}
      />
      {/*    <Route
        exact
        path="presentation-de-la-photo/:id_photo"
        element={AchatPhoto}
        layout={layout}
   />*/}
      {/*   <Route render={() => <div>Route inconnue</div>} />*/}
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
