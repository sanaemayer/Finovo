import React from "react";
import {Helmet} from "react-helmet";
import { Redirect } from "react-router-dom";
import PersonalSection from "./PersonalSection";
import MindsetSection from "./MindsetSection";
import AccountsSection from "./AccountsSection";
import AssetsSection from "./AssetsSection";
import DebtSection from "./DebtSection";
import IncomeSection from "./IncomeSection";
import InsuranceSection from "./InsuranceSection";
import MiscSection from "./MiscSection";
import Progress from "./QuestionnaireNavBar";
import ConfirmPage from "./ConfirmPage";
import axiosInstance from "../../axiosApi";

/**
 * Component that contains elements and functions related to the Questionnaire.
 * This includes displaying questions and saving the user's input.
 *
 * Renders out a page meant to be routed through notifications or through the user's profile page.
 *
 * Sections of the questionnaire can be navigated through the use of previous/next buttons, as well
 * as the questionnaire's navbar.
 *
 * @version 3.0.0
 */
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      leave: false,
      // Containers to hold data
      client_single_data: {},
      client_multi_data: [],
      mindset_data: {},
      update_url: {
        1: "pers-update/",
        2: "mind-create/",
        3: "acc-update/",
        4: "assets-update/",
        5: "debt-update/",
        6: "income-update/",
        7: "ins-update/",
        8: "pers-update/",
      },
      // Flags for updating submit button
      userIsUpdating: false,
      submitDisabled: true,
      // Flag for leave questionnaire button
      leaveDisabled: false,
    };
  }

  /**
   * Updates the state of client_single_data.
   *
   * @param {List} client_single_data
   * @private
   */
  update_single_client_info = (client_single_data) => {
    this.setState({ client_single_data });
  };

  /**
   * Updates the state of client_multi_data.
   *
   * @param {List} client_multi_data
   * @private
   */
  update_multi_client_info = (client_multi_data) => {
    this.setState({ client_multi_data });
  };

  set_mindset_original_data = (mindset_data) => {
    this.setState({ mindset_data });
  };

  /**
   * Calls the API to create data.
   *
   * @param {int} step
   * @private
   */
  update_single_data = (step) => {
    let data = this.state.client_single_data;
    // Recommendation Section for misc
    if (step === 8) {
      let recommendationList = [];
      // When a change is made, the data("true" or "false") will be a string instead of boolean.
      // We can use this to add new recommendation whenever a user changes the value
      if (data.budget === "false") {
        recommendationList.push({
          email: this.props.user.email,
          flag: "needsBudget",
        });
      }
      if (data.finance_check === "false") {
        recommendationList.push({
          email: this.props.user.email,
          flag: "monthlyFinCheck",
        });
      }
      if (data.automated_savings === "false") {
        recommendationList.push({
          email: this.props.user.email,
          flag: "autoSavings",
        });
      }
      if (data.automated_bills === "false") {
        recommendationList.push({
          email: this.props.user.email,
          flag: "autoBills",
        });
      }
      if (data.household_inventory === "false") {
        recommendationList.push({
          email: this.props.user.email,
          flag: "checkHHInv",
        });
      }
      if (data.financial_holdings_inventory === "false") {
        recommendationList.push({
          email: this.props.user.email,
          flag: "checkFinInv",
        });
      }
      if (data.review_beneficiaries === "false") {
        recommendationList.push({
          email: this.props.user.email,
          flag: "reviewBeneficiaries",
        });
      }
      if (data.old_paperwork === "false") {
        recommendationList.push({
          email: this.props.user.email,
          flag: "shredDocs",
        });
      }
      if (data.organized_documents === "false") {
        recommendationList.push({
          email: this.props.user.email,
          flag: "createFilingSystem",
        });
      }
      if (
        data.updated_will === "false" ||
        data.personal_directive === "false" ||
        data.power_attorney === "false"
      ) {
        recommendationList.push({
          email: this.props.user.email,
          flag: "updateWill",
        });
      }
      if (data.credit_report === "false") {
        recommendationList.push({
          email: this.props.user.email,
          flag: "checkCreditReport",
        });
      }
      if (data.credit_score === "false") {
        recommendationList.push({
          email: this.props.user.email,
          flag: "trackCredit",
        });
      }
      if (data.overwhelmed === "false") {
        recommendationList.push({
          email: this.props.user.email,
          flag: "isOverwhelmed",
        });
      }
      if (data.overwhelmed === "false") {
        recommendationList.push({
          email: this.props.user.email,
          flag: "getPassMan",
        });
      }
      this.createRecommendation(recommendationList);
    }

    //Since we are creating a new data only for a mindset, we want to check if the data is different than the original
    //This will ensure that we do not create too many datasets
    if (step === 2 && data !== this.state.mindset_data) {
      axiosInstance
        .post(
          "/users/" + this.state.update_url[step] + this.props.user.email + "/",
          data
        )
        .then((result) => result)
        .catch((error) => {
          throw error;
        });
    } else if (step !== 2) {
      axiosInstance
        .post(
          "/users/" + this.state.update_url[step] + this.props.user.email + "/",
          data
        )
        .then((result) => result)
        .catch((error) => {
          throw error;
        });
    }
  };

  /**
   * Calls the API to create data.
   *
   * @param {int} step
   * @private
   */
  update_multi_data = (step) => {
    let data = this.state.client_multi_data;

    let recommendationList = [];
    if (step === 3) {
      // Recommendation Section for Accounts - if emergency fund is not listed, give a recommendation to make one
      let emergencyFund = false,
        RRSP = false,
        TFSA = false,
        GRSP = false;
      for (let i = 0; i < data.length; ++i) {
        if (data[i].type === "EF") {
          emergencyFund = true;
        }
        if (data[i].type === "RR") {
          RRSP = true;
        }
        if (data[i].type === "TS") {
          TFSA = true;
        }
        if (data[i].type === "GR") {
          GRSP = true;
        }
      }

      if (!emergencyFund) {
        recommendationList.push({
          email: this.props.user.email,
          flag: "startEF",
        });
      }
      if (!TFSA) {
        recommendationList.push({
          email: this.props.user.email,
          flag: "getTFSA",
        });
      } else {
        recommendationList.push({
          email: this.props.user.email,
          flag: "checkTFSA",
        });
      }

      if (!RRSP) {
        recommendationList.push({
          email: this.props.user.email,
          flag: "getRRSP",
        });
      } else {
        recommendationList.push({
          email: this.props.user.email,
          flag: "checkRRSP",
        });
      }

      if (!GRSP) {
        recommendationList.push({
          email: this.props.user.email,
          flag: "getGRSP",
        });
      } else {
        recommendationList.push({
          email: this.props.user.email,
          flag: "increaseGRSP",
        });
      }
    }
    if (step === 5) {
      //Recommendation for Insurance
      if (data.length === 0) {
        recommendationList.push({
          email: this.props.user.email,
          flag: "checkDebt",
        });
      }
    }
    if (step === 7) {
      //Recommendation for Insurance
      if (data.length > 0) {
        recommendationList.push({
          email: this.props.user.email,
          flag: "reviewInsurance",
        });
        recommendationList.push({
          email: this.props.user.email,
          flag: "reviewBeneficiaries",
        });
      }
      let lifeInsurance = false;
      for (let i = 0; i < data.length; ++i) {
        if (data[i].type === "LI") {
          lifeInsurance = true;
        }
      }
      if (!lifeInsurance) {
        recommendationList.push({
          email: this.props.user.email,
          flag: "getLifeInsurance",
        });
      }
    }
    this.createRecommendation(recommendationList);
    axiosInstance
      .post(
        "/users/" + this.state.update_url[step] + this.props.user.email + "/",
        data
      )
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  };

  createRecommendation(rec) {
    if (rec.length > 0) {
      axiosInstance
        .post("/recs/user-recs-create-multi/", rec)
        .then((result) => result)
        .catch((error) => {
          throw error;
        });
    }
  }
  renderSwitch() {
    switch (this.state.step) {
      default:
        return (
          <PersonalSection
            next={this.next}
            previous={this.previous}
            step={this.state.step}
            email={this.props.user.email}
            update_data={this.update_single_data}
            update_client_info={this.update_single_client_info}
            clientData={this.state.client_single_data}
          />
        );
      case 1:
        return (
          <PersonalSection
            next={this.next}
            previous={this.previous}
            email={this.props.user.email}
            step={this.state.step}
            update_data={this.update_single_data}
            update_client_info={this.update_single_client_info}
            clientData={this.state.client_single_data}
          />
        );
      case 2:
        return (
          <MindsetSection
            next={this.next}
            previous={this.previous}
            email={this.props.user.email}
            step={this.state.step}
            update_data={this.update_single_data}
            update_client_info={this.update_single_client_info}
            set_mindset_original_data={this.set_mindset_original_data}
            clientData={this.state.client_single_data}
          />
        );
      case 3:
        return (
          <AccountsSection
            next={this.next}
            previous={this.previous}
            email={this.props.user.email}
            step={this.state.step}
            update_data={this.update_multi_data}
            update_client_info={this.update_multi_client_info}
            clientData={this.state.client_multi_data}
          />
        );
      case 4:
        return (
          <AssetsSection
            next={this.next}
            previous={this.previous}
            email={this.props.user.email}
            step={this.state.step}
            update_data={this.update_multi_data}
            update_client_info={this.update_multi_client_info}
            clientData={this.state.client_multi_data}
          />
        );
      case 5:
        return (
          <DebtSection
            next={this.next}
            previous={this.previous}
            email={this.props.user.email}
            step={this.state.step}
            update_data={this.update_multi_data}
            update_client_info={this.update_multi_client_info}
            clientData={this.state.client_multi_data}
          />
        );
      case 6:
        return (
          <IncomeSection
            next={this.next}
            previous={this.previous}
            email={this.props.user.email}
            step={this.state.step}
            update_data={this.update_single_data}
            update_client_info={this.update_single_client_info}
            clientData={this.state.client_single_data}
          />
        );
      case 7:
        return (
          <InsuranceSection
            next={this.next}
            previous={this.previous}
            email={this.props.user.email}
            step={this.state.step}
            update_data={this.update_multi_data}
            update_client_info={this.update_multi_client_info}
            clientData={this.state.client_multi_data}
          />
        );
      case 8:
        return (
          <MiscSection
            next={this.next}
            previous={this.previous}
            email={this.props.user.email}
            step={this.state.step}
            update_data={this.update_single_data}
            update_client_info={this.update_single_client_info}
            clientData={this.state.client_single_data}
          />
        );
      case 9:
        return (
          <ConfirmPage
            next={this.next}
            previous={this.previous}
            email={this.props.user.email}
            step={this.state.step}
          />
        );
    }
  }

  /**
   * Decrements the current value of step
   *
   * @param {SyntheticEvent} e
   * @private
   */
  previous = (e) => {
    let step = Math.max(1, this.state.step - 1);
    if (step !== 9) {
      this.setState({ leaveDisabled: false });
    }
    this.setState({ step });
  };

  /**
   * Increments the current value of step
   *
   * @param {SyntheticEvent} e
   * @private
   */
  next = (e) => {
    let step = Math.min(9, this.state.step + 1);
    if (step === 9) {
      this.setState({ leaveDisabled: true });
    }
    this.setState({ step });
  };

  /**
   * Sets the current value of step
   *
   * @param {int} step
   * @private
   */
  setStep = (step) => {
    if (step !== 9) {
      this.setState({ leaveDisabled: false });
    }
    this.setState({ step });
  };

  /**
   * Handles which update method is called for each page.
   *
   * @private
   */
  leaveQuestionnaire = () => {
    if (
      this.state.step === 1 ||
      this.state.step === 2 ||
      this.state.step === 6 ||
      this.state.step === 8
    ) {
      this.update_single_data(this.state.step);
    } else {
      this.update_multi_data(this.state.step);
    }
    this.setState({ leave: true });
  };

  render() {
    if (this.state.leave) return <Redirect to="/dashboard" />;
    return (
      <div className="d-flex flex-column m-5 h-100 min-vh-75">
        <Helmet>
          <title>{ "Questionnaire" }</title>
        </Helmet>
        <div className="container-fluid">
          {/* Questionnaire Navbar */}
          <Progress
            step={this.state.step}
            setStep={this.setStep}
            update_single_data={this.update_single_data}
            update_multi_data={this.update_multi_data}
          />
        </div>
        <div className="d-flex flex-row flex-wrap border rounded justify-content-center mt-5 bg-light">
          {/* Questionnaire Content */}
          <div className="col">
            <div>{this.renderSwitch()}</div>
          </div>
          <div className="d-flex flex-column justify-content-end">
            {/* Submit Button */}
            {this.state.userIsUpdating && (
              <button
                type="submit"
                className="btn btn-lg btn-success me-3 mb-3"
                data-bs-toggle="modal"
                data-bs-target="#questionnaireSubmitModal"
                data-bs-backdrop="false"
                disabled={this.state.submitDisabled}
              >
                Update Questionnaire
              </button>
            )}
            {/* Exit Button */}
            {!this.state.leaveDisabled && (
              <button
                type="button"
                className="btn btn-lg btn-secondary me-3 mb-3"
                data-bs-toggle="modal"
                data-bs-target="#questionnaireExitModal"
                data-bs-backdrop="false"
              >
                Exit Questionnaire
              </button>
            )}
          </div>
        </div>
        {/* Exit Confirm Modal */}
        <div
          className="modal fade bg-light"
          id="questionnaireExitModal"
          tabIndex="-1"
          aria-labelledby="questionnaireExitModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="questionnaireExitModal">
                  Warning!
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  We cannot provide recommendations if you do not fully complete
                  the questionnaire!
                </p>
                <p>
                  Your current progress will be saved, so you can come back
                  later to complete it.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Go Back
                </button>
                {/* TODO: Fix the dashboard not auto having scroll bar after leaving questionnaire */}
                {/* TODO: Test if data is saved if a User leaves mid-way */}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.leaveQuestionnaire}
                >
                  Leave
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Submit Confirm Modal */}
        <div
          className="modal fade bg-light"
          id="questionnaireSubmitModal"
          tabIndex="-1"
          aria-labelledby="questionnaireSubmitModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="questionnaireSubmitModal">
                  Reminder!
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Please ensure that your input is correct.</p>
                <p>
                  If you would like to update the information you've provided,
                  you do this by going to your profile and pressing on the
                  'Update Questionnaire' button at any time.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Go Back
                </button>
                {/* TODO: Fix the dashboard not auto having scroll bar after leaving questionnaire */}
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={this.leaveQuestionnaire}
                >
                  Leave
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
