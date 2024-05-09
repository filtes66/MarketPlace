import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
//import Footer from "./Footer";
import "./Layout.css";

function Layout1(props) {
  const { windowSize } = useSelector((state) => state.galleryPhotos);
  console.log('windowSize', windowSize);
  return (
    <div className="layout">
      <Header />
      <div className="layout__body" style={{ width: `${windowSize}px` }}>{props.children}</div>
      {/*     <Footer />*/}
    </div>
  );
}

function Layout2(props) {
  return (
    <div className="layout">
      <div className="layout__body">{props.children}</div>
      {/*     <Footer />*/}
    </div>
  );
}

export { Layout1, Layout2 };
