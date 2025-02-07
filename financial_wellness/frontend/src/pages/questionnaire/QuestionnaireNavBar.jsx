import React, { Component } from "react";
import "./Questionnaire.css";

class QuestionnaireNavBar extends Component {
  navigate_away = (step) => {
    if (
      this.props.step === 1 ||
      this.props.step === 2 ||
      this.props.step === 6 ||
      this.props.step === 8
    ) {
      this.props.update_single_data(this.props.step);
    } else {
      this.props.update_multi_data(this.props.step);
    }
    this.props.setStep(step);
  };
  render() {
    return (
      <div className="d-flex flex-row justify-content-around">
        <button
          id="navbarPersonalButton"
          className="background"
          style={{ background: this.props.step === 1 ? "darkseagreen" : "" }}
          onClick={() => {
            this.navigate_away(1);
          }}
        >
          <h4 className="text-center">Personal</h4>
        </button>

        <button
          id="navbarMindsetButton"
          className="background"
          style={{ background: this.props.step === 2 ? "darkseagreen" : "" }}
          onClick={(e) => {
            this.navigate_away(2);
          }}
        >
          <h4 className="text-center">Mindset</h4>
        </button>

        <button
          id="navbarAccountsButton"
          className="background"
          style={{ background: this.props.step === 3 ? "darkseagreen" : "" }}
          onClick={(e) => {
            this.navigate_away(3);
          }}
        >
          <h4 className="text-center">Accounts</h4>
        </button>

        <button
          id="navbarAssetsButton"
          className="background"
          style={{ background: this.props.step === 4 ? "darkseagreen" : "" }}
          onClick={(e) => {
            this.navigate_away(4);
          }}
        >
          <h4 className="text-center">Assets</h4>
        </button>

        <button
          id="navbarDebtButton"
          className="background"
          style={{ background: this.props.step === 5 ? "darkseagreen" : "" }}
          onClick={(e) => {
            this.navigate_away(5);
          }}
        >
          <h4 className="text-center">Debt</h4>
        </button>

        <button
          id="navbarIncomeButton"
          className="background"
          style={{ background: this.props.step === 6 ? "darkseagreen" : "" }}
          onClick={(e) => {
            this.navigate_away(6);
          }}
        >
          <h4 className="text-center">Income</h4>
        </button>

        <button
          id="navbarInsuranceButton"
          className="background"
          style={{ background: this.props.step === 7 ? "darkseagreen" : "" }}
          onClick={(e) => {
            this.navigate_away(7);
          }}
        >
          <h4 className="text-center">Insurance</h4>
        </button>

        <button
          id="navbarMiscButton"
          className="background"
          style={{ background: this.props.step === 8 ? "darkseagreen" : "" }}
          onClick={(e) => {
            this.navigate_away(8);
          }}
        >
          <h4 className="text-center">Misc</h4>
        </button>
      </div>
    );
  }
}

export default QuestionnaireNavBar;
