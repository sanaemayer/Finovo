import React from "react";
import {Helmet} from "react-helmet";
import UserNav from "../../components/Navbars/user-navbar";
import axiosInstance from "../../axiosApi";
import { Link } from "react-router-dom";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";

/**
 * Component that contains elements and functions related to displaying the profile page of the user
 * as well as providing options to change editable fields like preferred name, and update previously entered questionnaire data.
 *
 * Renders out a page meant to be routed through a navbar for user side.
 *
 *
 *
 * @version 2.0.0
 */

const popover = (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Note</Popover.Title>
    <Popover.Content>
      Please contact an <strong>admin</strong> to request those changes!
    </Popover.Content>
  </Popover>
);

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Container to hold the Client Data through api calls
      clientData: {},
      recommendations: [],
      // Flags for alerts
      updateInfoSuccess: false,
      updateInfoWarning: false,
    };
  }

  /**
   * Handles the actual manual uploading call to the API
   *
   * First name, Last name, and Company are not validated because there is no concrete guidelines to follow. Can change later.
   * A POST request is sent to the API to Change the preferred name.
   *
   * @param {SyntheticEvent} e
   * @private
   */

  handle_submit = (e) => {
    e.preventDefault();
    // Make POST request to API
    axiosInstance
      .post(
        "users/CEI-update/" + this.props.user.email + "/",
        this.state.clientData
      )
      .then((result) => {
        this.setState({
          updateInfoSuccess: true,
          updateInfoWarning: false,
        });
      })
      .catch((error) => {
        this.setState({
          updateInfoSuccess: false,
          updateInfoWarning: true,
        });
        throw error;
      });
  };

  /**
   * Makes a GET API call to the client employee information, and GETS all the info into clientData container
   */
  componentDidMount() {
    this.getUserData(this.props.user.email);
    this.getUserRecommendations(this.props.user.email);
  }

  async getUserData(email) {
    await axiosInstance
      .get("users/CEI-get/" + email + "/")
      .then((result) => {
        this.setState({ clientData: result.data });
      })
      .catch((error) => {
        throw error;
      });
  }

  async getUserRecommendations(email) {
    await axiosInstance
      .get("/recs/user-recs-get/" + email + "/")
      .then((result) => {
        this.setState({ recommendations: result.data });
      })
      .catch((error) => {
        throw error;
      });
  }

  async updateUserRecommendation(id, value, index) {
    await axiosInstance
      .post("/recs/user-recs-update/", {
        email: this.props.user.email,
        id: id,
        isCompleted: value,
      })
      .then((result) => {
        this.getUserRecommendations(this.props.user.email);
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    return (
      <div className="d-flex flex-row overflow-hidden min-vh-100">
        <Helmet>
          <title>{ "Profile" }</title>
        </Helmet>
        <div className="col-2">
          {/* Side navigation bar*/}
          <UserNav handle_logout={this.props.handle_logout} />
        </div>
        <div className="col d-flex flex-wrap text-wrap m-5 p-4 border rounded bg-light">
          <div className="container-fluid px-5 py-3 border rounded border-dark">
            <h1 className="text-center">Profile</h1>
            {/* Content Row */}
            <div className="row">
              {/* Info */}
              <div className="col-sm d-flex flex-column align-items-center">
                <div className="d-flex flex-row"></div>
                {/* Legal Name */}
                <h4 className="text-wrap">Legal Name:</h4>
                <h5 className="text-center mb-3 text-muted">
                  {this.state.clientData.first_name}{" "}
                  {this.state.clientData.last_name}
                </h5>
                {/* Preferred Name - THE ONLY EDITABLE PERSONAL INFO  */}
                <h4 className="text-wrap">Preferred Name:</h4>
                <input
                  type="text"
                  className="form-control text-center mb-3 form-select-lg w-50"
                  id="preferred_name"
                  value={
                    this.state.clientData.preferred_name
                      ? this.state.clientData.preferred_name
                      : ""
                  }
                  onChange={() => {
                    let preferred_name = document.getElementById(
                      "preferred_name"
                    ).value;
                    let clientData = {
                      ...this.state.clientData,
                      preferred_name: preferred_name,
                    };
                    this.setState({ clientData });
                  }}
                />
                {/* Email  */}
                <h4 className="text-wrap">Email:</h4>
                <h5 className="text-center mb-3 text-muted">
                  {" "}
                  {this.props.user.email}{" "}
                </h5>
                {/* Company Name */}
                <h4 className="text-wrap">Company:</h4>
                <h5 className="text-center text-muted">
                  {this.state.clientData.company}
                </h5>
              </div>
              {/* Buttons */}
              <div className="col-sm d-flex flex-column justify-content-center align-items-center">
                {/* Conditional Alerts */}
                {this.state.updateInfoWarning > 0 && (
                  <div className="alert alert-danger" role="alert">
                    <strong>Your info could not be updated.</strong> Please check that everything is inputted properly and/or contact site support.
                  </div>
                )}
                {this.state.updateInfoSuccess > 0 && (
                  <div className="alert alert-success text-wrap" role="alert">
                    <strong>Your info is successfully updated!</strong> Your preferred name will appear on the dashboard,
                    and perhaps in other places in the future. Only you can see your preferred name. It is not used for anything else.
                  </div>
                )}
                {/* Redirects user to their questionnaire form */}
                <Link to="/questionnaire">
                  <button
                    type="button"
                    id="enterQuestionnaireButton"
                    name="enterQuestionnaireButton"
                    className="btn btn-outline-primary me-3 mb-3"
                    style={{ fontSize: 25 }}
                  >
                    Edit Questionnaire Information
                  </button>
                </Link>
                {/* Saves any changes made to the preferred name */}
                <button
                  type="button"
                  id="savechanges"
                  name="savechanges"
                  className="btn btn-outline-primary me-3 mb-3"
                  style={{ fontSize: 25 }}
                  onClick={this.handle_submit}
                >
                  Save Changes to Preferred Name
                </button>
                <OverlayTrigger
                  trigger="focus"
                  placement="right"
                  overlay={popover}
                >
                  <Button size="lg" variant="outline-secondary">
                    Edit More Personal Information
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
            <hr />
            {/* Recommendations Row */}
            <h1 className="text-center">Your Recommendations</h1>
            <div className="row">
              {/* Incomplete */}
              <div className="col">
                <h1 className="display-6 text-center"> In Progress </h1>
                <div className="accordion" id="incompleteAccordion">
                  {this.state.recommendations
                    .filter((rec) => rec.isCompleted === false)
                    .map((rec, index) => {
                      return (
                        <div key={index} className={rec.title}>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id={"heading" + index}
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={"#incomplete_collapse" + index}
                                aria-expanded="false"
                                aria-controls={"incomplete_collapse" + index}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    this.updateUserRecommendation(
                                      rec.id,
                                      true,
                                      index
                                    );
                                  }}
                                  key={"incomplete_recommendation" + rec.id}
                                />
                                <div className="ms-3">{rec.title}</div>
                              </button>
                            </h2>
                            <div
                              id={"incomplete_collapse" + index}
                              className="accordion-collapse collapse"
                              aria-labelledby={"incomplete_heading" + index}
                              data-bs-parent="#incompleteAccordion"
                            >
                              <div className="accordion-body">
                                <div className="d-flex align-items-center">
                                  <div className="form-check">
                                    {rec.description}
                                  </div>
                                </div>
                                <hr />
                                <div
                                  className="container-fluid"
                                  key={"incompleted_resources" + rec.id}
                                >
                                  <a href={rec.resources}>{rec.resources}</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* Completed */}
              <div className="col">
                <h1 className="display-6 text-center"> Completed </h1>
                <div className="accordion" id="completedAccordion">
                  {this.state.recommendations
                    .filter((rec) => rec.isCompleted === true)
                    .map((rec, index) => {
                      return (
                        <div key={index} className={rec.title}>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id={"completed_heading" + index}
                            >
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={"#completed_collapse" + index}
                                aria-expanded="false"
                                aria-controls={"completed_collapse" + index}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    this.updateUserRecommendation(
                                      rec.id,
                                      false,
                                      index
                                    );
                                  }}
                                  id={"completed_recommendation" + rec.id}
                                  checked
                                />
                                <div className="ms-3">{rec.title}</div>
                              </button>
                            </h2>
                            <div
                              id={"completed_collapse" + index}
                              className="accordion-collapse collapse"
                              aria-labelledby={"completed_heading" + index}
                              data-bs-parent="#completedAccordion"
                            >
                              <div className="accordion-body">
                                <div className="d-flex align-items-center">
                                  <div className="form-check">
                                    {rec.description}
                                  </div>
                                </div>
                                <hr />
                                <div
                                  className="container-fluid"
                                  id={"completed_resources" + rec.id}
                                >
                                  <a href={rec.resources}>{rec.resources}</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
