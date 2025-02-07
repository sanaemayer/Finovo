import React, { Component } from "react";

/**
 * Component that contains elements that define a set of questions.
 *
 * Renders out a set of questions related to an Asset
 *
 * @version 1.0.0
 */
class AssetsQuestion extends Component {
  render() {
    var assetType = {
      H: "House",
      C: "Car",
      O: "Other",
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
            Type of Asset:
          </h5>
          <div className="input-group w-50">
            <input
              type="text"
              readOnly
              value={assetType[this.props.type]}
              className="form-control form-select-lg"
              aria-label="Amount (to the nearest dollar)"
            />
          </div>
        </div>
        {/* Question 2 */}
        <div className="d-flex flex-row flex-wrap my-3 align-items-center">
          <h5 className="text-wrap me-auto" style={{ maxWidth: 400 }}>
            What is the total estimated value of this type of asset?
          </h5>
          <div className="input-group w-50">
            <span className="input-group-text">$</span>
            <input
              id={this.props.type+"Value"}
              type="number"
              className="form-control form-select-lg"
              aria-label="Value (to the nearest dollar)"
              value={this.props.value}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  var state = {
                    type: this.props.type,
                    value: e.target.value,
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

export default AssetsQuestion;
