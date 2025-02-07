import React from "react";
import "./navbar.css";
import { SidebarValues } from "./sidebar";
import * as IOIcons5 from "react-icons/io5";
import { Link } from "react-router-dom";
import finovoLogo from "../../images/white-name-icon-small.png";

class AdminNav extends React.Component {
  render() {
    return (
      <div
        className="d-flex flex-column align-items-center h-100 min-vh-100"
        id="navContainer"
      >
        {/* Finovo Logo */}
        <div className="container-lg ms-1 p-3">
          <img src={finovoLogo} className="img-fluid" alt="FinovoLogo" />
        </div>
        <hr />

        <div className="d-flex flex-column w-100 px-4">
          {/*iterates through items in sidebar.js and places them into the sidebar*/}
          {SidebarValues.map((item, index) => {
            return (
              <li key={index} className={item.catName}>
                <Link to={item.path}>
                  <div className="d-sm-inline-flex flex-row flex-wrap">
                    <div className="p-2 text-wrap">{item.icon}</div>
                    <div className="p-2 text-wrap">{item.title}</div>
                  </div>
                </Link>
              </li>
            );
          })}
          {/* Logout Button */}
          <li className="nav-text">
            <Link to="/login" onClick={this.props.handle_logout}>
              <div className="d-flex align-items-center">
                <IOIcons5.IoReturnDownBackSharp className="mx-2"/>
                <div className="ms-2">Logout</div>                
              </div>
            </Link>
          </li>
        </div>
      </div>
    );
  }
}

export default AdminNav;
