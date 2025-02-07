import React, { Component } from "react";
import axiosInstance from "../../axiosApi";
/**
 * Component that contains elements and functions related to the Personal Section of the questionnaire.
 *
 * Renders out a page meant to be routed through the questionnaire's navigation systems.
 *
 * @version 3.0.0
 */
class PersonalSection extends Component {
  async componentDidMount() {
    await axiosInstance
      .get("/users/pers-get/" + this.props.email + "/")
      .then((response) => {
        this.props.update_client_info(response.data);
      })
      .catch((error) => {
        throw error;
      });
  }

  nextClicked = (e) => {
    this.props.update_data(this.props.step);
    this.props.next(e);
  };

  render() {
    return (
      <div
        id="personalSection"
        className="d-flex flex-row flex-wrap p-5 justify-content-center"
      >
        {/* Left Info Section */}
        <div
          className="d-flex flex-column p-4 mb-5 w-auto border rounded border-dark"
          style={{ maxWidth: 400 }}
        >
          <h1 className="display-6">Personal Information</h1>
          <h3>Section 1</h3>
          <hr />
          <div className="container-fluid">
            <p className="text-wrap">
              This section covers some basic personal information.
            </p>
            <p className="text-wrap">
              For choosing a Financial Goal, please select the one that most suits you
              currently, even if your goal isn't a choice. Feel free to email site support
              and suggest new Financial Goals.
            </p>
            <p className="text-wrap">
              This <mark>data will be kept securely</mark> and will only be{" "}
              <mark>used to generate recommendations</mark> on what you should
              do to achieve your finanacial goals.
            </p>
            <p className="text-wrap">
              <mark>If you feel uncomfortable</mark> sharing certain
              information, please
              <mark>press on the 'Exit Questionnaire' button</mark> at the
              bottom right.
            </p>
          </div>
        </div>
        {/* Form Content */}
        <div className="d-flex flex-column p-4 ms-5 flex-grow-1 border rounded border-dark">
          <form
            onSubmit={this.nextClicked}
            className="needs-validation"
            id="personalForm"
          >
            {/* Question 1 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-nowrap me-auto" style={{ maxWidth: 400 }}>
                Choose a Financial Goal:
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="fin_goal"
                value={
                  this.props.clientData.fin_goal
                    ? this.props.clientData.fin_goal
                    : ""
                }
                onChange={() => {
                  let fin_goal = document.getElementById("fin_goal").value;
                  let clientData = {
                    ...this.props.clientData,
                    fin_goal: fin_goal,
                  };
                  this.props.update_client_info(clientData);
                }}
                required
              >
                <option value="">Choose...</option>
                <option value="EF">Build an Emergency Fund</option>
                <option value="IN">Start Investing</option>
                <option value="RE">Save for Retirement</option>
                <option value="HM">Home Ownership</option>
                <option value="DF">Pay off Debt</option>
                <option value="FO">Become Financially Organized</option>
              </select>
            </div>
            {/* Question 2 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-nowrap me-auto" style={{ maxWidth: 400 }}>
                Select a Province:
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="province"
                value={
                  this.props.clientData.province
                    ? this.props.clientData.province
                    : ""
                }
                onChange={() => {
                  let province = document.getElementById("province").value;
                  let clientData = {
                    ...this.props.clientData,
                    province: province,
                  };
                  this.props.update_client_info(clientData);
                }}
                required
              >
                <option value="">Choose...</option>
                <option value="AB">Alberta</option>
                <option value="BC">British Columbia</option>
                <option value="MB">Manitoba</option>
                <option value="NB">New Brunswick</option>
                <option value="NL">NewFoundland and Labrador</option>
                <option value="NS">Nova Scotia</option>
                <option value="ON">Ontario</option>
                <option value="PE">Prince Edward Island</option>
                <option value="QC">Quebec</option>
                <option value="SK">Saskatchewan</option>
                <option value="NT">Northwest Territories</option>
                <option value="YT">Yukon</option>
                <option value="NU">Nunavut</option>
              </select>
            </div>
            {/* Question 3 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-nowrap me-auto" style={{ maxWidth: 400 }}>
                Which City do you live in?
              </h5>
              <input
                type="text"
                className="form-control form-select-lg w-50"
                placeholder="Ex: Edmonton"
                id="city"
                value={
                  this.props.clientData.city ? this.props.clientData.city : ""
                }
                onChange={() => {
                  let city = document.getElementById("city").value;
                  let clientData = {
                    ...this.props.clientData,
                    city: city,
                  };
                  this.props.update_client_info(clientData);
                }}
                required
              />
            </div>
            {/* Question 4 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-nowrap me-auto" style={{ maxWidth: 400 }}>
                What is your Marital Status?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="marital_status"
                value={this.props.clientData.marital_status || ""}
                onChange={() => {
                  let marital_status = document.getElementById("marital_status")
                    .value;
                  let clientData = {
                    ...this.props.clientData,
                    marital_status: marital_status,
                  };
                  this.props.update_client_info(clientData);
                }}
                required
              >
                <option value="">Choose...</option>
                <option value="SI">Single</option>
                <option value="MA">Married</option>
                <option value="DV">Divorced</option>
                <option value="WI">Widowed</option>
                <option value="DP">Domestic Partner</option>
              </select>
            </div>
            {/* Question 5 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-nowrap me-auto">
                How many children do you have?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="number_of_children"
                value={
                  this.props.clientData.number_of_children
                    ? this.props.clientData.number_of_children
                    : ""
                }
                onChange={() => {
                  let number_of_children = document.getElementById(
                    "number_of_children"
                  ).value;
                  let clientData = {
                    ...this.props.clientData,
                    number_of_children: number_of_children,
                  };
                  this.props.update_client_info(clientData);
                }}
                required
              >
                <option value="">Choose...</option>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5 or More</option>
              </select>
            </div>
            {/* Next Button */}
            <div className="d-flex flex-row w-100 mt-5 justify-content-end">
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

export default PersonalSection;
