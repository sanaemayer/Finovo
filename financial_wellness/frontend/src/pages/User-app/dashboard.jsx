import React from "react";
import {Helmet} from "react-helmet";
import UserNav from "../../components/Navbars/user-navbar.js";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosApi";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      articles: [],
      recommendations: [],
      hasDoneQuestionnaireOnce: false,
    };
  }

  componentDidMount() {
    this.getUserDetails();
    this.getFeaturedArticles();
    this.getUserPersonal(this.props.user.email);
    this.getUserRecommendation();
  }

  async getUserDetails() {
    await axiosInstance
      .get("users/user-get/" + this.props.user.email + "/")
      .then((result) => {
        this.setState({ user: result.data });
      })
      .catch((error) => {
        throw error;
      });
  }

  async getFeaturedArticles() {
    await axiosInstance
      .get("/blog/post-list/")
      .then((result) => {
        this.setState({
          articles: result.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  async getUserPersonal(email) {
    await axiosInstance
      .get("/users/pers-get/" + email + "/")
      .then((result) => {
        let user_personal = result.data;
        if (user_personal.fin_goal === null) {
          this.setState({
            hasDoneQuestionnaireOnce: false,
          });
        } else {
          this.setState({
            hasDoneQuestionnaireOnce: true,
          });
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  async getUserRecommendation() {
    await axiosInstance
      .get("/recs/user-recs-get/" + this.props.user.email + "/")
      .then((result) => {
        this.setState({ recommendations: result.data });
      })
      .catch((error) => {
        throw error;
      });
  }

  updateUserRecommendation(id, isCompleted, index) {
    // let recommendations = this.state.recommendations;
    // recommendations[index].isCompleted = true;
    // this.setState({ recommendations });
    axiosInstance
      .post("/recs/user-recs-update/", {
        email: this.props.user.email,
        id: id,
        isCompleted: isCompleted,
      })
      .then((result) => {
        this.getUserRecommendation();
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    return (
      <div className="d-flex flex-row overflow-auto min-vh-100">
        <Helmet>
          <title>{ "Dashboard" }</title>
        </Helmet>
        <div className="col-2">
          {/* Side navigation bar*/}
          <UserNav handle_logout={this.props.handle_logout} />
        </div>
        <div className="col d-flex flex-column justify-content-center align-items-center m-5 p-3 border rounded bg-light">
          {this.state.user.preferred_name !== null ? (
            <h1 id="user-dashboard-page-heading">
              Welcome back {this.state.user.preferred_name}!
            </h1>
          ) : (
            <h1 id="user-dashboard-page-heading">
              Welcome back {this.state.user.first_name}{" "}
              {this.state.user.last_name}!
            </h1>
          )}
          {/* Dashboard Content */}
          <div className="container-md my-3 p-2 flex-grow-1 border rounded border-dark">
            {/* Notifications */}
            <div className="row">
              <div className="col-sm d-flex flex-column">
                {!this.state.hasDoneQuestionnaireOnce > 0 && (
                  <div
                    className="alert alert-primary text-center"
                    role="alert"
                    id="questionnaireNotificationAlert"
                  >
                    <h4 className="alert-heading">Welcome!</h4>
                    <p>
                      In order for us to provide you with recommendations, we
                      need to learn a little more about your financial
                      situation. Please press on the button below to get
                      started!
                    </p>
                    <p>
                      If you do not feel comfortable sharing that information
                      with us, do not worry!{" "}
                      <strong>
                        You can still use the rest of our services like browsing
                        articles or our financial tools even without completing
                        the questionnaire.
                      </strong>
                    </p>
                    <hr />
                    <a
                      className="btn btn-primary"
                      href="/questionnaire"
                      role="button"
                      id="questionnaireNotificationButton"
                    >
                      To the Questionnaire
                    </a>
                  </div>
                )}
              </div>
            </div>
            {/* Content */}
            <div className="row px-3">
              {/* Recommendations */}
              <div className="col-sm d-flex flex-column mt-3 align-items-center">
                <div className="display-6 mb-3"  id = "recommendations-title">Recommendations</div>
                <div className="card w-100" id="dash-card">
                  <div className="accordion" id="accordionBod">
                    {this.state.recommendations
                      .filter((rec) => rec.isCompleted === false)
                      .sort((a, b) => a.id - b.id) //If we want to use ranking system, instead of id we can have a field such as rank.
                      .map((rec, index) => {
                        return (
                          index < 6 && (
                            <div key={index} className={rec.title}>
                              <div className="accordion-item">
                                <h2
                                  className="accordion-header"
                                  id={"heading" + index}
                                >
                                  <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={"#collapse" + index}
                                    aria-expanded="false"
                                    aria-controls={"collapse" + index}
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      onChange={(e) => {
                                        this.updateUserRecommendation(
                                          rec.id,
                                          true,
                                          index
                                        );
                                      }}
                                      key={"recommendation" + rec.id}
                                    />
                                    <div className="ms-3">{rec.title}</div>
                                  </button>
                                </h2>
                                <div
                                  id={"collapse" + index}
                                  className="accordion-collapse collapse"
                                  aria-labelledby={"heading" + index}
                                  data-bs-parent="#accordionBod"
                                >
                                  <div className="accordion-body">
                                    <div className="d-flex align-items-center">
                                      <div className="form-check">
                                        {rec.description}
                                      </div>
                                    </div>
                                    <hr />
                                    <div
                                      className="container-fluid"
                                      key={"resources" + rec.id}
                                    >
                                      <a href={rec.resources}>{rec.resources}</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        );
                      })}
                  </div>
                </div>
              </div>
              {/* Featured Articles */}
              <div className="col-sm d-flex flex-column mt-3 align-items-center">
                <div className="display-6 text-wrap" id="featured-articles-heading">Featured Articles</div>
                <div className="d-flex flex-column">
                  {this.state.articles
                    .filter((article) => article.isFeatured)
                    .map((article, index) => {
                      return (
                        <div
                          key={index}
                          className="card mt-3"
                          style={{minWidth:600, minHeight:200}}
                          id={"dash-card-id" + article.id}
                        >
                          <div className="card-header">Featured Article</div>
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title text-center">{article.title}</h5>
                            <hr/>
                            <p className="card-text text-center">{article.description}</p>
                            <Link
                              to={"/articles/article/id/" + article.id}
                              type="button"
                              className="btn btn-primary w-50 mt-auto align-self-center"
                            >
                              Expand Article
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
