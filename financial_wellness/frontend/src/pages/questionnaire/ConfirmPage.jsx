import React from "react";
import { Redirect } from "react-router-dom";
import axiosInstance from "../../axiosApi";

class ConfirmPage extends React.Component {
  state = { created: false, updated: false };
  /**
   * Calls the API to create data.
   *
   * @param {int} step
   * @private
   */
  handleRecommendation = () => {
    let recommendationList = [];
    recommendationList.push({
      email: this.props.email,
      flag: "reviewMortgage",
    });
    recommendationList.push({
      email: this.props.email,
      flag: "reviewPlan",
    });
    recommendationList.push({
      email: this.props.email,
      flag: "brainstormMonth",
    });
    recommendationList.push({
      email: this.props.email,
      flag: "brainstormYear",
    });
    this.createRecommendation(recommendationList);
    this.updateRecommendation();
  };

  async createRecommendation(rec) {
    if (rec.length > 0) {
      await axiosInstance
        .post("/recs/user-recs-create-multi/", rec)
        .then((result) => {
          let created = true;
          this.setState({ created });
        })
        .catch((error) => {
          throw error;
        });
    }
  }

  async updateRecommendation() {
    let rec = [
      {
        email: this.props.email,
        flag: "finGoal",
        isCompleted: true,
      },
      {
        email: this.props.email,
        flag: "persFin",
        isCompleted: true,
      },
    ];
    await axiosInstance
      .post("/recs/user-recs-update-multi/", rec)
      .then((result) => {
        let updated = true;
        this.setState({ updated });
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    if (this.state.created && this.state.updated)
      return <Redirect to="/Dashboard" />;
    return (
      <div className="d-flex flex-row flex-wrap p-5 justify-content-center">
        <div className="container-fluid text-center p-5 border rounded border-dark">
          <h1 className="display-6">End of Questionnaire</h1>
          <hr />
          <p><strong>You have completed the questionnaire!</strong></p>
          <p>
            We ask that you please ensure that all your inputs are how you want
            them to be. If you ever want to change anything, you can update the
            questionnaire by going to your Profile and pressing on the 'Update
            Questionnaire' button.
          </p>
          <p>
            If you'd like to check your inputs again, please navigate to the section
            you'd like to update using the navigation buttons at the top of the screen!
          </p>
          <p>
            If not, the exit button below will redirect you back to your dashboard.
          </p>
          {/* Exit Button */}
          <button
            type="button"
            className="btn btn-outline-primary me-3 my-3"
            onClick={this.handleRecommendation}
            style={{ fontSize: 25 }}
          >
            Exit Questionnaire
          </button>
        </div>
      </div>
    );
  }
}

export default ConfirmPage;
