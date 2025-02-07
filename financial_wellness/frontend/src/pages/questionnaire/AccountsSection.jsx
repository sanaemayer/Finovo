import React, { Component } from "react";
import AccountsQuestion from "./AccountsQuestion";
import axiosInstance from "../../axiosApi";

/**
 * Component that contains elements and functions related to the Accounts Section of the questionnaire.
 *
 * Renders out a page meant to be routed through the questionnaire's navigation systems.
 *
 * @version 3.0.0
 */
class AccountsSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountTypes: [
        { value: "CQ", text: "Chequing" },
        { value: "SA", text: "Savings" },
        { value: "EF", text: "Emergency Fund" },
        { value: "RR", text: "Registered Retirement Savings Plan" },
        { value: "LI", text: "Locked-In Retirement Account" },
        { value: "GR", text: "Group Registered Retirement Savings Plan" },
        { value: "DC", text: "Defined Contribution Pension Plan" },
        { value: "DB", text: "Defined Benefit Pension Plan" },
        { value: "TF", text: "Tax Free Savings Account" },
        { value: "OT", text: "Non-Registered Account" },
      ],
    };
  }

  async componentDidMount() {
    await axiosInstance
      .get("/users/acc-get/" + this.props.email + "/")
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

  prevClicked = (e) => {
    this.props.update_data(this.props.step);
    this.props.previous(e);
  };

  /**
   * Handles when a child AccountsQuestion component is added to the section.
   *
   * @param {data} data
   * @private
   */
  handle_on_change = (data) => {
    console.log(data);
    let clientData = this.props.clientData;
    for (let i = 0; i < clientData.length; ++i) {
      if (clientData[i].type === data.type) {
        clientData[i].value = data.value;
      }
    }
    this.props.update_client_info(clientData);
  };

  /**
   * Handles when a child AccountsQuestion component is removed from the section.
   *
   * @param {data} data
   * @private
   */
  remove_item = (data) => {
    let clientData = this.props.clientData.filter((type) => type.type !== data);
    this.props.update_client_info(clientData);
  };

  render() {
    return (
      <div
        id="accountsSection"
        className="d-flex flex-row flex-wrap p-5 justify-content-center"
      >
        {/* Left Info Section */}
        <div
          className="d-flex flex-column p-4 mb-5 w-auto border rounded border-dark"
          style={{ maxWidth: 400 }}
        >
          <h1 className="display-6">Accounts</h1>
          <h3>Section 3</h3>
          <hr />
          <div className="container-fluid">
            <p className="text-wrap">
              This section contains questions regarding any accounts you may
              have.
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
              This section can be left blank, however that may limit the recommendations
              we can provide.
            </p>
          </div>
        </div>
        {/* Form Content */}
        <div className="d-flex flex-column p-4 ms-5 flex-grow-1 border rounded border-dark">
          {/* Questions go here */}
          {this.props.clientData.map((data, index) => (
            <AccountsQuestion
              key={index}
              remove_item={this.remove_item}
              handle_on_change={this.handle_on_change}
              type={data.type}
              value={data.value}
              desc={data.desc}
            />
          ))}

          <div className="d-flex flex-row flex-wrap m-3 align-items-center">
            <h5 className="text-wrap me-5">Add an Account:</h5>
            <select
              className="form-control form-select-lg w-50"
              id="type"
              default=""
              onChange={(e) => {
                let clientData = [
                  ...this.props.clientData,
                  {
                    type: e.target.value,
                    value: 0,
                  },
                ];

                this.props.update_client_info(clientData);
              }}
            >
              <option value="">Choose...</option>

              {this.state.accountTypes.map(
                (type, index) =>
                  !this.props.clientData.some((e) => e.type === type.value) && (
                    <option key={index} value={type.value}>
                      {type.text}
                    </option>
                  )
              )}
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
              type="button"
              className="btn btn-outline-primary"
              style={{ fontSize: 25 }}
              onClick={this.nextClicked}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountsSection;
