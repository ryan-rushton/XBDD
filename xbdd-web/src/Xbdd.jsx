import React from "react";
import "./Xbdd.css";
import Navbar from "./modules/navbar/Navbar";
import SummaryContainer from "./modules/summary/SummaryContainer";

class Xbdd extends React.Component {
  render() {
    return (
      <div className="xbdd-app">
        <Navbar />
        <SummaryContainer />
      </div>
    );
  }
}

export default Xbdd;
