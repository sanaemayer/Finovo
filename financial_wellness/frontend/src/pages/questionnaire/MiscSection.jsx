import React, { Component } from "react";
import axiosInstance from "../../axiosApi";
/**
 * Component that contains elements and functions related to the Misc Section of the questionnaire.
 *
 * Renders out a page meant to be routed through the questionnaire's navigation systems.
 *
 * @version 3.0.0
 */
class MiscSection extends Component {
  state = {
    submitted: false,
  };

  async componentDidMount() {
    await axiosInstance
      .get("/users/pers-get/" + this.props.email + "/")
      .then((result) => {
        this.props.update_client_info(result.data);
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
      <div
        id="miscSection"
        className="d-flex flex-row flex-wrap p-5 justify-content-center"
      >
        {/* Left Info Section */}
        <div
          className="d-flex flex-column p-4 mb-5 w-auto border rounded border-dark"
          style={{ maxWidth: 400 }}
        >
          <h1 className="display-6">Misc</h1>
          <h3>Section 8</h3>
          <hr />
          <div className="container-fluid">
            <p>
              This section contains miscellaneous questions used to generate
              recommendations.
            </p>
            <p>
              To finish the questionnaire, press on the 'Next' button at the bottom
              of the screen.
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
            id="miscForm"
          >
            {/* Question 1 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Do you follow a budget?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="budget"
                value={this.props.clientData.budget}
                onChange={() => {
                  let budget = document.getElementById("budget").value;
                  let clientData = {
                    ...this.props.clientData,
                    budget: budget,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* Question 3 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Do you go through your finances on a weekly or monthly basis?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="finance_check"
                value={this.props.clientData.finance_check}
                onChange={() => {
                  let finance_check = document.getElementById("finance_check")
                    .value;
                  let clientData = {
                    ...this.props.clientData,
                    finance_check: finance_check,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* Question 4 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Are your savings automated?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="automated_savings"
                value={this.props.clientData.automated_savings}
                onChange={() => {
                  let automated_savings = document.getElementById(
                    "automated_savings"
                  ).value;
                  let clientData = {
                    ...this.props.clientData,
                    automated_savings: automated_savings,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Question 5 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Are your bill payments automated?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="automated_bills"
                value={this.props.clientData.automated_bills}
                onChange={() => {
                  let automated_bills = document.getElementById(
                    "automated_bills"
                  ).value;
                  let clientData = {
                    ...this.props.clientData,
                    automated_bills: automated_bills,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* Question 6 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Have you completed a household inventory in the last two years?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="household_inventory"
                value={this.props.clientData.household_inventory}
                onChange={() => {
                  let household_inventory = document.getElementById(
                    "household_inventory"
                  ).value;
                  let clientData = {
                    ...this.props.clientData,
                    household_inventory: household_inventory,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* Question 7 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Have you completed an inventory of all your Financial holdings
                in the last two years?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="financial_holdings_inventory"
                value={this.props.clientData.financial_holdings_inventory}
                onChange={() => {
                  let financial_holdings_inventory = document.getElementById(
                    "financial_holdings_inventory"
                  ).value;
                  let clientData = {
                    ...this.props.clientData,
                    financial_holdings_inventory: financial_holdings_inventory,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* Question 8 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Have you reviewed who you have listed as beneficiaries on your
                accounts in the last two years?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="review_beneficiaries"
                value={this.props.clientData.review_beneficiaries}
                onChange={() => {
                  let review_beneficiaries = document.getElementById(
                    "review_beneficiaries"
                  ).value;
                  let clientData = {
                    ...this.props.clientData,
                    review_beneficiaries: review_beneficiaries,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* Question 9 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Do you have any financial paperwork that is older than 6 years?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="old_paperwork"
                value={this.props.clientData.old_paperwork}
                onChange={() => {
                  let old_paperwork = document.getElementById("old_paperwork")
                    .value;
                  let clientData = {
                    ...this.props.clientData,
                    old_paperwork: old_paperwork,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* Question 10 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Are your financial documents organized in one location?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="organized_documents"
                value={this.props.clientData.organized_documents}
                onChange={() => {
                  let organized_documents = document.getElementById(
                    "organized_documents"
                  ).value;
                  let clientData = {
                    ...this.props.clientData,
                    organized_documents: organized_documents,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* Question 11 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Do you have an up to date Will?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="updated_will"
                value={this.props.clientData.updated_will}
                onChange={() => {
                  let updated_will = document.getElementById("updated_will")
                    .value;
                  let clientData = {
                    ...this.props.clientData,
                    updated_will: updated_will,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* Question 12 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Do you have a personal directive (living will)?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="personal_directive"
                value={this.props.clientData.personal_directive}
                onChange={() => {
                  let personal_directive = document.getElementById(
                    "personal_directive"
                  ).value;
                  let clientData = {
                    ...this.props.clientData,
                    personal_directive: personal_directive,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* Question 13 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Do you have a power of attorney?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="power_attorney"
                value={this.props.clientData.power_attorney}
                onChange={() => {
                  let power_attorney = document.getElementById("power_attorney")
                    .value;
                  let clientData = {
                    ...this.props.clientData,
                    power_attorney: power_attorney,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* Question 14 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Have you pulled your credit report in the last two years?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="credit_report"
                value={this.props.clientData.credit_report}
                onChange={() => {
                  let credit_report = document.getElementById("credit_report")
                    .value;
                  let clientData = {
                    ...this.props.clientData,
                    credit_report: credit_report,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* Question 15 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Are you tracking your credit score?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="credit_score"
                value={this.props.clientData.credit_score}
                onChange={() => {
                  let credit_score = document.getElementById("credit_score")
                    .value;
                  let clientData = {
                    ...this.props.clientData,
                    credit_score: credit_score,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Question 16 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Do you feel overwhelmed by your finances?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="overwhelmed"
                value={this.props.clientData.overwhelmed}
                onChange={() => {
                  let overwhelmed = document.getElementById("overwhelmed")
                    .value;
                  let clientData = {
                    ...this.props.clientData,
                    overwhelmed: overwhelmed,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Question 17 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
                Do you use a password manager?
              </h5>
              <select
                className="form-control form-select-lg w-50"
                id="pass_manager"
                value={this.props.clientData.pass_manager}
                onChange={() => {
                  let pass_manager = document.getElementById("pass_manager")
                    .value;
                  let clientData = {
                    ...this.props.clientData,
                    pass_manager: pass_manager,
                  };
                  this.props.update_client_info(clientData);
                }}
                default=""
                required
              >
                <option value="">Choose...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {/* Previous & Next Buttons */}
            <div className="d-flex flex-row w-100 mt-5 justify-content-between">
              <button
                id='prevButton'
                type="button"
                className="btn btn-outline-primary me-3 mb-3"
                style={{ fontSize: 25 }}
                onClick={this.prevClicked}
              >
                Prev
              </button>
              <button
                type="submit"
                className="btn btn-outline-primary me-3 mb-3"
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

export default MiscSection;
