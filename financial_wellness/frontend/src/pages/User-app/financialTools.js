import React from "react";
import {Helmet} from "react-helmet";
import "./financialTools.css";
import UserNav from "../../components/Navbars/user-navbar";
import defaultImage from "../../images/Calculator.png";
import { Link } from "react-router-dom";

class FinancialToolsPage extends React.Component {
  render() {
    return (
      <div className="d-flex flex-row overflow-hidden min-vh-100">
        <Helmet>
          <title>{ "Financial Tools" }</title>
        </Helmet>
        <div className="col-2">
          {/* Side navigation bar */}
          <UserNav handle_logout={this.props.handle_logout} />
        </div>
        <div className="col d-flex flex-column flex-wrap m-5 border rounded bg-light">
          <div className="container-fluid px-5 my-3">
            <h1 className="display-4 text-center">Financial Tools</h1>
            <hr/>
          </div>
          <div className="container-fluid px-5 pb-5">
            <div className="row d-flex flex-row flex-wrap justify-content-around">
              {/* Budget Calculator */}
              <div className="card w-25 m-3">
                <img
                  className="card-img-top"
                  style={{ width: "50%" , alignSelf: "center", marginTop: "0.5em"}}
                  src={defaultImage}
                  alt="card cap"
                />
                <div className="card-body">
                  <h5 className="card-title" style = {{alignSelf: "center"}}>Budget Calculator</h5>
                  <p className="card-text">
                    This tool will help you create a budget based on the 50/30/20 model.
                  </p>
                  <Link
                    to="/tools/Budget"
                    type="button"
                    className="btn btn-primary"
                    >
                    Access Tool
                  </Link>
                </div>
              </div>
              {/* Emergency Funds Calculator */}
              <div className="card w-25 m-3">
                <img
                  className="card-img-top"
                  style={{ width: "50%" , alignSelf: "center", marginTop: "0.5em"}}
                  src={defaultImage}
                  alt="card cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Emergency Funds Calculator</h5>
                  <p className="card-text">
                    This tool will help you determine how much you should be saving in case 
                    of emergency.
                  </p>
                  <Link
                    to="/tools/Emergency-Fund"
                    type="button"
                    className="btn btn-primary"
                    >
                      Access Tool
                  </Link>
                </div>
              </div>
              {/* Tool 4 */}
              <div className="card w-25 m-3">
                <img
                  className="card-img-top"
                  style={{ width: "50%", alignSelf: "center", marginTop: "0.5em" }}
                  src={defaultImage}
                  alt="card cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Life Insurance Needs Tool</h5>
                  <p className="card-text">
                    This tool will help you to find out your Life Insurance needs
                  </p>
                  <Link
                    to="/tools/Life-Insurance"
                    type="button"
                    className="btn btn-primary"
                    >
                    Access Tool
                  </Link>
                </div>
              </div>
              {/* Retirement Calculator Tool */}
              <div className="card w-25 m-3">
                <img
                  className="card-img-top"
                  style={{ width: "50%", alignSelf: "center", marginTop: "0.5em" }}
                  src={defaultImage}
                  alt="card cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Retirement Calculator</h5>
                  <p className="card-text">
                    This tool will help you determine when you will retire based on your current financial situation.
                  </p>
                  <Link
                    to="/tools/Retirement"
                    type="button"
                    className="btn btn-primary"
                    >
                    Access Tool
                    </Link>
                </div>
              </div>
              {/* Placeholder for new tools */}
              <div className="card w-25 m-3">
                <img
                  className="card-img-top"
                  style={{ width: "50%", alignSelf: "center", marginTop: "0.5em" }}
                  src={defaultImage}
                  alt="card cap"
                />
                <div className="card-body">
                  <h5 className="card-title">Coming Soon</h5>
                  <p className="card-text">
                    Have a tool you'd like to use but it's not here? Head over to the
                    Help page and send us some feedback!
                  </p>
                  <a href="/" className="btn btn-primary disabled">
                    Access Tool
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );    
  }
}

export default FinancialToolsPage;
