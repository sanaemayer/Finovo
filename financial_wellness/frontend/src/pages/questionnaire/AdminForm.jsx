import React, { Component } from "react";

import PersonalSection from "./PersonalSection";
import MindsetSection from "./MindsetSection";
import AccountsSection from "./AccountsSection";
import AssetsSection from "./AssetsSection";
import DebtSection from "./DebtSection";
import IncomeSection from "./IncomeSection";
import InsuranceSection from "./InsuranceSection";
import MiscSection from "./MiscSection";
import ConfirmPage from "./ConfirmPage";
import Progress from "./QuestionnaireNavBar";
import AdminEdit from "../Admin-app/AdminEdit";
import axiosInstance from "../../axiosApi";

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      personal: 0,
      personalMax: 5,
      mindset: 0,
      account: 0,
      asset: 0,
      debt: 0,
      income: 0,
      insurance: 0,
      misc: 0,
      button_clicked: false,
      mindset_data: {},
      client_single_data: {},
      client_multi_data: [],
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
    };
  }

  componentDidMount() {
    console.log(this.props.email);
  }

  setPercentage = (name, value) => {
    this.setState({ [name]: value });
  };

  update_single_client_info = (client_single_data) => {
    this.setState({ client_single_data });
  };

  update_multi_client_info = (client_multi_data) => {
    this.setState({ client_multi_data });
  };

  set_mindset_original_data = (mindset_data) => {
    this.setState({ mindset_data });
  };

  update_single_data = (step) => {
    let data = this.state.client_single_data;
    console.log(this.state.update_url[step]);
    //Since we are creating a new data only for a mindset, we want to check if the data is different than the original
    //This will ensure that we do not create too many datasets
    if (step === 2 && data !== this.state.mindset_data) {
      axiosInstance
        .post(
          "/users/" + this.state.update_url[step] + this.props.email + "/",
          data
        )
        .then((result) => result)
        .catch((error) => {
          throw error;
        });
    } else if (step !== 2) {
      axiosInstance
        .post(
          "/users/" + this.state.update_url[step] + this.props.email + "/",
          data
        )
        .then((result) => result)
        .catch((error) => {
          throw error;
        });
    }
  };

  update_multi_data = (step) => {
    let data = this.state.client_multi_data;
    console.log(this.state.update_url[step]); 
    axiosInstance
      .post(
        "/users/" + this.state.update_url[step] + this.props.email + "/",
        data
      )
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  };

  renderSwitch() {
    switch (this.state.step) {
      default:
        return (
          <PersonalSection
            next={this.next}
            previous={this.previous}
            email={this.props.email}
            update_data={this.update_single_data}
            step={this.state.step}
            update_client_info={this.update_single_client_info}
            clientData={this.state.client_single_data}
          />
        );
      case 1:
        return (
          <PersonalSection
            next={this.next}
            previous={this.previous}
            email={this.props.email}
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
            email={this.props.email}
            step={this.state.step}
            update_data={this.update_single_data}
            update_client_info={this.update_single_client_info}
            clientData={this.state.client_single_data}
            set_mindset_original_data={this.set_mindset_original_data}
          />
        );
      case 3:
        return (
          <AccountsSection
            next={this.next}
            previous={this.previous}
            email={this.props.email}
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
            email={this.props.email}
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
            email={this.props.email}
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
            email={this.props.email}
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
            email={this.props.email}
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
            email={this.props.email}
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
            email={this.props.email}
            step={this.state.step}
            update_data={this.update_data}
            update_client_info={this.update_client_info}
          />
        );
    }
  }

  previous = (e) => {
    let step = Math.max(1, this.state.step - 1);
    this.setState({ step });
  };

  next = (e) => {
    let step = Math.min(8, this.state.step + 1);
    this.setState({ step });
  };

  setStep = (step) => {
    this.setState({ step });
  };

  render() {
    if (this.state.button_clicked)
      return <AdminEdit email={this.props.email} />;

    return (
      <div className="d-flex flex-column m-5 h-100 min-vh-75">
        <div className="container-fluid">
          {/* Questionnaire Navbar */}
          <Progress
            step={this.state.step}
            setStep={this.setStep}
            update_single_data={this.update_single_data}
            update_multi_data={this.update_multi_data}
          />
        </div>
        <div className="d-flex flex-row border rounded justify-content-start mt-5 bg-light">
          {/* Questionnaire Content */}
          <div className="container-fluid">
            <div>{this.renderSwitch()}</div>
          </div>
          {/* Exit Button */}
          <button
            type="button"
            className="btn btn-lg btn-primary me-3 mb-3 align-self-end"
            data-bs-toggle="modal"
            data-bs-target="#questionnaireExitModal"
            data-bs-backdrop="false"
          >
            Exit Questionnaire
          </button>
        </div>
        {/* Exit Confirm Modal */}
        <div
          className="modal fade bg-light"
          id="questionnaireExitModal"
          tabIndex="-1"
          aria-labelledby="questionnaireExitModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="questionnaireExitModal">
                  Confirmation
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Your current changes as an admin have been saved.</p>
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
                  class="btn btn-primary"
                  onClick={() => {
                    this.setState({
                      button_clicked: true,
                      email: this.props.email,
                    });
                  }}
                >
                  Exit Questionnaire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminForm;
