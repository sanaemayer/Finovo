import React, { Component } from "react";
import axiosInstance from "../../axiosApi";

/**
 * Component that contains elements and functions related to the Income Section of the questionnaire.
 *
 * Renders out a page meant to be routed through the questionnaire's navigation systems.
 *
 * @version 3.0.0
 */
class IncomeSection extends Component {
  async componentDidMount() {
    await axiosInstance
      .get("/users/income-get/" + this.props.email + "/")
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
        id="incomeSection"
        className="d-flex flex-row flex-wrap p-5 justify-content-center"
      >
        {/* Left Info Section */}
        <div
          className="d-flex flex-column p-4 mb-5 w-auto border rounded border-dark"
          style={{ maxWidth: 400 }}
        >
          <h1 className="display-6">Income</h1>
          <h3>Section 6</h3>
          <hr />
          <div className="container-fluid">
            <p>This section just asks about your annual income.</p>
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
            id="incomeForm"
          >
            {/* Question 1 */}
            <div className="d-flex flex-row flex-wrap my-3 align-items-center">
              <h5 className="text-nowrap me-auto" style={{ maxWidth: 400 }}>
                What is an estimate of your total annual income?
              </h5>
              <div className="input-group w-50">
                <span className="input-group-text">$</span>
                <input
                  id='total_income'
                  type="number"
                  className="form-control form-select-lg"
                  aria-label="Amount (to the nearest dollar)"
                  default=""
                  value={this.props.clientData.value}
                  onChange={(e) => {
                    const re = /^[0-9\b]+$/;
                    if (e.target.value === "" || re.test(e.target.value)) {
                      var clientData = { value: e.target.value };
                      this.props.update_client_info(clientData);
                    }
                  }}
                  required
                />
                <span className="input-group-text">.00</span>
              </div>
            </div>
            <div className="container-fluid text-center">
              <p>
                This total would include all types of income, i.e. Wages,
                Salary, Interest/Investments, Government Payments, etc.
              </p>
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

export default IncomeSection;
