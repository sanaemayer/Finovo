import React from "react";
import {Helmet} from "react-helmet";
import { Link } from "react-router-dom";
import finovoLogo from "./images/blue-name-icon-small.png";
import stockImage from "./images/finovo-stock-image-small.jpg";

class InitialPage extends React.Component {
  render() {
    return (
      <div className="d-md-flex flex-column align-items-center overflow-hidden m-3 h-100">
        <Helmet>
          <title>{ "Finovo" }</title>
        </Helmet>
        {/* Logo Container */}
        <div className="container-lg text-center mt-3 p-2">
          <img src={finovoLogo} className="img-fluid" alt="FinovoLogo" />
        </div>
        {/* Content Container */}
        <div className="d-flex flex-column m-5 border rounded align-items-center bg-light">
          <Link to="/login" type="button" className="btn btn-primary btn-lg mt-5">
            Sign up or Login
          </Link>
          <div className="d-flex flex-row-reverse flex-wrap m-5 p-5 justify-content-center border rounded border-dark">
            <div className="col w-75 mx-5 align-self-center">
              <h1 className="display-6">
                FinovoWell is focused on delivering direct, personalized, and
                unbiased financial advice to employees throughout Canada via our
                online portal as well as through confidential one-on-one financial
                coaching.
              </h1>
            </div>
            <div className="d-flex flex-column mt-3">
              <img src={stockImage} className="img-fluid rounded" alt="stock" />
            </div>
          </div>
        </div>
      </div>
    );    
  }
}

export default InitialPage;
