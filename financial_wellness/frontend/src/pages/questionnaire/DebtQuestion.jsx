import React, { Component } from "react";

/**
 * Component that contains elements that define a set of questions.
 *
 * Renders out a set of questions related to a source of Debt.
 *
 * @version 1.0.0
 */
class DeptQuestion extends Component {
  render() {
    var debtType = {
      PE: "Personal Loan",
      CR: "Credit Card",
      SL: "Student Loan",
      LC: "Line of Credit",
      HE: "Home Equity Line of Credit (HELOC)",
      VL: "Vehicle Loan",
    };
    return (
      <div>
        <button
          id={this.props.type+"RemoveButton"}
          type="button"
          className="btn btn-outline-secondary"
          style={{ fontSize: 20 }}
          onClick={() => {
            this.props.remove_item(this.props.type);
          }}
        >
          X
        </button>
        {/* Question 1 */}
        <div className="d-flex flex-row flex-wrap my-3 align-items-center">
          <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
            Type of Debt:
          </h5>
          <div className="input-group w-50">
            <input
              type="text"
              readOnly
              value={debtType[this.props.type] || ""}
              className="form-control form-select-lg"
              aria-label="Amount (to the nearest dollar)"
            />
          </div>
        </div>
        {/* Question 2 */}
        <div className="d-flex flex-row flex-wrap my-3 align-items-center">
          <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
            How much in total do you owe for this type of debt?
          </h5>
          <div className="input-group w-50">
            <span className="input-group-text">$</span>
            <input
              id={this.props.type+"Total"}
              type="number"
              className="form-control form-select-lg"
              aria-label="Amount (to the nearest dollar)"
              value={this.props.amount}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  var state = {
                    type: this.props.type,
                    amount: e.target.value,
                    interest: this.props.interest,
                    monthly_payment: this.props.monthly_payment,
                  };
                  this.props.handle_on_change(state);
                }
              }}
            />
            <span className="input-group-text">.00</span>
          </div>
        </div>
        {/* Question 3 */}
        <div className="d-flex flex-row flex-wrap my-3 align-items-center">
          <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
            What is the average interest rate on it?
          </h5>
          <input
            type="range"
            className="form-range"
            style={{ maxWidth: 300 }}
            min="0"
            max="100"
            step="1"
            value={this.props.interest}
            onChange={(e) => {
              var state = {
                type: this.props.type,
                amount: this.props.amount,
                interest: e.target.value,
                monthly_payment: this.props.monthly_payment,
              };
              this.props.handle_on_change(state);
            }}
          ></input>
          <div className="input-group w-auto">
            <input
              id={this.props.type+"Rate"}
              type="number"
              step="1"
              max="100"
              min="0"
              className="form-control form-select-lg ms-3"
              style={{ maxWidth: 100 }}
              value={this.props.interest}
              aria-label="interest"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                var state = {
                  type: this.props.type,
                  amount: this.props.amount,
                  interest: e.target.value,
                  monthly_payment: this.props.monthly_payment,
                };
                this.props.handle_on_change(state);
              }}
            />
            <span className="input-group-text">%</span>
          </div>
        </div>
        {/* Question 4 */}
        <div className="d-flex flex-row flex-wrap my-3 align-items-center">
          <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
            How much do you usually pay monthly?
          </h5>
          <div className="input-group w-50">
            <span className="input-group-text">$</span>
            <input
              id={this.props.type+"Monthly"}
              type="number"
              className="form-control form-select-lg"
              value={this.props.monthly_payment}
              aria-label="Amount (to the nearest dollar)"
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  var state = {
                    type: this.props.type,
                    amount: this.props.amount,
                    interest: this.props.interest,
                    monthly_payment: e.target.value,
                  };
                  this.props.handle_on_change(state);
                }
              }}
            />
            <span className="input-group-text">.00</span>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default DeptQuestion;
