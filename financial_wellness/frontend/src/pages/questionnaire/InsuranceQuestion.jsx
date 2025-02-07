import React, { Component } from "react";

/**
 * Component that contains elements that define a set of questions.
 *
 * Renders out a set of questions related to a source of Insurance.
 *
 * @version 1.0.0
 */
class InsuranceQuestion extends Component {
  render() {
    var insurancePolicyType = {
      LI: "Life Insurance",
      DI: "Disability Insurance",
      CI: "Critical Illness Insurance",
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
          <h5 className="text-wrap me-auto">Type of Insurance:</h5>
          <div className="input-group w-50">
            <input
              type="text"
              readOnly
              value={insurancePolicyType[this.props.type]}
              className="form-control form-select-lg"
              aria-label="Amount (to the nearest dollar)"
            />
          </div>
        </div>
        {/* Question 2 */}
        {insurancePolicyType[this.props.type] === "Life Insurance" && (
          <div className="d-flex flex-row flex-wrap my-3 align-items-center">
            <h5 className="text-wrap me-auto">Policy Type:</h5>
            <select
              className="form-control form-select-lg w-50"
              id={this.props.type+"Policy"}
              value={this.props.policy_type}
              onChange={(e) => {
                //let policy_type = document.getElementById("policy_type").value;
                var state = {
                  type: this.props.type,
                  policy_type: e.target.value,
                  benefit: this.props.benefit,
                  premium: this.props.premium,
                };
                this.props.handle_on_change(state);
              }}
            >
              <option value="">Choose...</option>
              <option value="WL">Whole Life</option>
              <option value="UL">Universal Life</option>
              <option value="TL">Term Life</option>
            </select>
          </div>
        )}
        {/* Question 3 */}
        <div className="d-flex flex-row flex-wrap my-3 align-items-center">
          {insurancePolicyType[this.props.type] === "Life Insurance" && (
            <h5 className="text-wrap me-auto">Death Benefit Amount:</h5>
          )}
          {insurancePolicyType[this.props.type] === "Disability Insurance" && (
            <h5 className="text-wrap me-auto">Monthly Benefit Amount:</h5>
          )}
          {insurancePolicyType[this.props.type] ===
            "Critical Illness Insurance" && (
            <h5 className="text-wrap me-auto">Benefit Amount:</h5>
          )}
          <div className="input-group w-50">
            <span className="input-group-text">$</span>
            <input
              id={this.props.type+"Amount"}
              type="number"
              className="form-control form-select-lg"
              aria-label="Benefit (to the nearest dollar)"
              value={this.props.benefit}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  var state = {
                    type: this.props.type,
                    policy_type:
                      this.props.type === "LI" ? this.props.policy_type : null,
                    benefit: e.target.value,
                    premium: this.props.premium,
                  };
                  this.props.handle_on_change(state);
                }
              }}
            />
            <span className="input-group-text">.00</span>
          </div>
        </div>
        {/* Question 4 */}
        <div className="d-flex flex-row flex-wrap my-3 align-items-center">
          <h5 className="text-wrap me-auto">Premium</h5>
          <div className="input-group w-50">
            <span className="input-group-text">$</span>
            <input
              id={this.props.type+"Premium"}
              type="number"
              className="form-control form-select-lg"
              aria-label="Premium (to the nearest dollar)"
              value={this.props.premium}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  var state = {
                    type: this.props.type,
                    policy_type:
                      this.props.type === "LI" ? this.props.policy_type : null,
                    benefit: this.props.benefit,
                    premium: e.target.value,
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

export default InsuranceQuestion;
