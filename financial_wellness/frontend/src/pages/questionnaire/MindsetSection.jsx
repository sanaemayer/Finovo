import React, { Component } from "react";
import axiosInstance from "../../axiosApi";

/**
 * Component that contains elements and functions related to the Mindset Section of the questionnaire.
 *
 * Renders out a page meant to be routed through the questionnaire's navigation systems.
 *
 * @version 3.0.0
 */
class MindsetSection extends Component {
  async componentDidMount() {
    await axiosInstance
      .get("/users/mind-get/" + this.props.email + "/")
      .then((response) => {
        let clientData = {
          stress: response.data.stress ? response.data.stress : "",
          feeling: response.data.feeling ? response.data.feeling : "",
          risk_tol: response.data.risk_tol ? response.data.risk_tol : "",
          willingness: response.data.willingness
            ? response.data.willingness
            : "",
        };
        this.props.update_client_info(clientData);
        this.props.set_mindset_original_data(clientData);
      })
      .catch((error) => {
        throw error;
      });
  }

  nextClicked = (e) => {
    this.props.update_data(this.props.step);
    this.props.next(e);
  };

  prevClicked = (e) => {
    this.props.update_data(this.props.step);
    this.props.previous(e);
  };

  render() {
    return (
      <div id="mindsetSection" className="d-flex flex-row flex-wrap p-5 justify-content-center">
        {/* Left Info Section */}
        <div
          className="d-flex flex-column p-4 mb-5 w-auto border rounded border-dark"
          style={{ maxWidth: 400 }}
        >
          <h1 className="display-6">Mindset</h1>
          <h3>Section 2</h3>
          <hr />
          <div className="container-fluid">
            <p className="text-wrap">
              This section contains questions regarding how you feel about your
              financial situation.
            </p>
            <p className="text-wrap">
              This data will be used to gauge effectiveness of this platform
              over time.
            </p>
            <p className="text-wrap">
              <mark>If you feel uncomfortable</mark> sharing certain
              information, please
              <mark>press on the 'Exit Questionnaire' button</mark> at the
              bottom right.
            </p>
            <p className="text-wrap">
              If you would like to come back to this section later, please navigate
              around the questionnaire using the row of buttons at the top of the 
              screen.
            </p>
          </div>
        </div>
        {/* Form Content */}
        <div className="d-flex flex-column p-4 ms-5 flex-grow-1 border rounded border-dark">
          <form
            onSubmit={this.nextClicked}
            className="needs-validation"
            id="mindsetForm"
          >
            {/* Question 1 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                How often do you stress about money?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="stress"
                value={this.props.clientData.stress}
                onChange={() => {
                  let stress = document.getElementById("stress").value;
                  let clientData = {
                    ...this.props.clientData,
                    stress: stress,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="NE">Never</option>
                <option value="RA">Rarely</option>
                <option value="OM">Once a Month</option>
                <option value="CM">A couple times a Month</option>
                <option value="OW">Once a Week</option>
                <option value="CW">A couple times a Week</option>
                <option value="DA">Daily</option>
                <option value="CO">Constantly</option>
              </select>
            </div>
            {/* Question 2 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                How do you feel about your financial situation?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="feeling"
                value={this.props.clientData.feeling}
                default=""
                onChange={() => {
                  let feeling = document.getElementById("feeling").value;
                  let clientData = {
                    ...this.props.clientData,
                    feeling: feeling,
                  };
                  this.props.update_client_info(clientData);
                }}
                required
              >
                <option value="">Choose...</option>
                <option value="SR">Stressed</option>
                <option value="CO">Concerned</option>
                <option value="OK">Okay</option>
                <option value="GR">Great</option>
              </select>
            </div>
            {/* Question 3 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                What is your risk tolerance?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="risk_tol"
                value={this.props.clientData.risk_tol}
                default=""
                onChange={() => {
                  let risk_tol = document.getElementById("risk_tol").value;
                  let clientData = {
                    ...this.props.clientData,
                    risk_tol: risk_tol,
                  };
                  this.props.update_client_info(clientData);
                }}
                required
              >
                <option value="">Choose...</option>
                <option value="CO">Conservative</option>
                <option value="BA">Balanced</option>
                <option value="AG">Aggresive</option>
                <option value="NS">Not Sure</option>
              </select>
            </div>
            {/* Question 4 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                How willing are you to make financial changes?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="willingness"
                value={this.props.clientData.willingness}
                default=""
                onChange={() => {
                  let willingness = document.getElementById("willingness")
                    .value;
                  let clientData = {
                    ...this.props.clientData,
                    willingness: willingness,
                  };
                  this.props.update_client_info(clientData);
                }}
                required
              >
                <option value="">Choose...</option>
                <option value="NA">Not at all</option>
                <option value="SW">Somewhat Willing</option>
                <option value="AW">Actively Willing</option>
                <option value="EW">Extremely Willing</option>
                <option value="NS">Not Sure</option>
              </select>
            </div>

            {/* Previous & Next Buttons */}
            <div className="d-flex flex-row w-100 mt-5 justify-content-between">
              <button
                id="prevButton"
                type="button"
                className="btn btn-outline-primary"
                style={{ fontSize: 25 }}
                onClick={this.prevClicked}
              >
                Prev
              </button>
              <button
                id="nextButton"
                type="submit"
                className="btn btn-outline-primary"
                style={{ fontSize: 25 }}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default MindsetSection;
