import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import InitialPage from "./initialpage";
import LoginApp from "./pages/login-app/loginapp";

import AdminDashboard from "./pages/Admin-app/AdminDashboard";
import RegisterNewCEIPage from "./pages/Admin-app/AdminRegisterNewCEIPage.js";
import DownloadReportsPage from "./pages/Admin-app/AdminDLReportsPage.js";
import ManageArticlesPage from "./pages/Admin-app/AdminManageArticlesPage.js";
import AdminNewArticlePage from "./pages/Admin-app/AdminNewArticlePage.js";

import Dashboard from "./pages/User-app/dashboard.jsx";
import ArticlesPage from "./pages/User-app/articles.js";
import ArticlesPageReader from "./pages/User-app/ArticlesPageReader.js";
import ContactCoachPage from "./pages/User-app/contactCoachPage.js";
import FinancialToolsPage from "./pages/User-app/financialTools.js";
import HelpPage from "./pages/User-app/help.js";
import ProfilePage from "./pages/User-app/profile.js";

import Form from "./pages/questionnaire/Form";
import AdminEdit from "./pages/Admin-app/AdminEdit";
import AdminForm from "./pages/questionnaire/AdminForm";
import AdminViewFilterUsers from "./pages/Admin-app/AdminViewFilterUsers";

import EmergencyFund from "./pages/Tools-app/EmergencyFund";
import LifeInsurance from "./pages/Tools-app/LifeInsurance";
import Retirement from "./pages/Tools-app/Retirement";
import Budget from "./pages/Tools-app/Budget";

import axiosInstance from "./axiosApi";

import { isEmptyObject } from "jquery";
import AdminArticleEdit from "./pages/Admin-app/AdminArticleEdit";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: localStorage.getItem("access") ? true : false,
      displayed_form: "",
      user: {},
      invalidLogin: false,
      invalidSignup: false,
    };

    this.handle_login = this.handle_login.bind(this);
    this.handle_signup = this.handle_signup.bind(this);
    this.handle_logout = this.handle_logout.bind(this);
  }

  async handle_logout() {
    try {
      const response = await axiosInstance.post("users/logout/", {
        refresh: localStorage.getItem("refresh"),
      });
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      axiosInstance.defaults.headers["Authorization"] = null;
      this.setState({
        logged_in: false,
        user: {},
        invalidLogin: false,
        invalidSignup: false,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async increaseLoginCount() {
    let user = this.state.user;
    await axiosInstance
      .get("/users/CEI-increase-login/" + user.email + "/", {})
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }

  async setUser(email) {
    await axiosInstance
      .get("/users/user-get/" + email + "/")
      .then((result) => {
        this.setState({
          user: result.data,
          invalidLogin: false,
          invalidSignup: false,
          logged_in: true,
        });
        if (result.data.is_staff === false) {
          this.increaseLoginCount();          
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  async handle_login(e, data) {
    e.preventDefault();
    await axiosInstance
    .post("/token/", {
      username: data.email,
      password: data.password,
    })
    .then((result) => {
      if (result.status === 200) {
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + result.data.access;
        localStorage.setItem("access", result.data.access);
        localStorage.setItem("refresh", result.data.refresh);
        this.setUser(data.email);
      }
      else {
        this.setState({
          invalidLogin: true,
        });
      }

    })
    .catch((error) => {
      this.setState({
        invalidLogin: true,
      });
      throw error;
    });
  }

  async handle_signup(e, data) {
    e.preventDefault();
    await axiosInstance
      .post("/users/signup/", {
        username: data.email,
        email: data.email,
        password: data.password,
      })
      .then((result) => {
        if (result.status === 201) {
          axiosInstance.defaults.headers["Authorization"] =
            "JWT " + result.data.token.access;
          localStorage.setItem("access", result.data.token.access);
          localStorage.setItem("refresh", result.data.token.refresh);
          this.setUser(data.email);          
        } else {
          this.setState({
            invalidSignup: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          invalidSignup: true,
        });
        throw error;
      });

    await axiosInstance
      .post("/recs/user-recs-create-multi/", [
        {
          email: data.email,
          flag: "finGoal",
        },
        {
          email: data.email,
          flag: "persFin",
        },
      ])
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        this.setState({
          invalidLogin: true,
        });
        throw error;
      });
  }

  async componentDidMount() {
    // This is used to make the user stay logged in even when the page is refreshed
    await axiosInstance
      .get("/users/current_user/")
      .then((result) => {
        this.setState({
          user: result.data,
          invalidLogin: false,
          invalidSignup: false,
          logged_in: true,
        });
      })
      .catch((error) => {
        this.setState({
          logged_in: false,
        });
        throw error;
      });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/*General Paths*/}
          <Route path="/" exact component={InitialPage} />

          <Route
            path="/login"
            exact
            render={() => (
              <LoginApp
                handle_login={this.handle_login}
                handle_signup={this.handle_signup}
                logged_in={this.state.logged_in}
                is_staff={this.state.user.is_staff}
                invalidLogin={this.state.invalidLogin}
                invalidSignup={this.state.invalidSignup}
              />
            )}
          />

          {/*User Paths*/}
          <Route
            path="/dashboard"
            exact
            render={() =>
              this.state.logged_in ? (
                !isEmptyObject(this.state.user) && (
                  <Dashboard
                    logged_in={this.state.logged_in}
                    handle_logout={this.handle_logout}
                    user={this.state.user}
                  />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/profile"
            exact
            render={() =>
              this.state.logged_in ? (
                !isEmptyObject(this.state.user) && (
                  <ProfilePage
                    handle_logout={this.handle_logout}
                    user={this.state.user}
                  />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/articles"
            exact
            render={() =>
              this.state.logged_in ? (
                <ArticlesPage handle_logout={this.handle_logout} />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/articles/article/id/"
            render={() =>
              this.state.logged_in ? (
                <ArticlesPageReader handle_logout={this.handle_logout} />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/contact-coach"
            exact
            render={() =>
              this.state.logged_in ? (
                <ContactCoachPage handle_logout={this.handle_logout} />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/tools"
            exact
            render={() =>
              this.state.logged_in ? (
                <FinancialToolsPage handle_logout={this.handle_logout} />
              ) : (
                <Redirect to="/" />
              )
            }
          />




          <Route
            path="/tools/Emergency-Fund"
            exact
            render={() =>
              this.state.logged_in ? (
                !isEmptyObject(this.state.user) && (
                  <EmergencyFund
                    handle_logout={this.handle_logout}
                    user={this.state.user}
                  />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          /> 

          <Route
            path="/tools/Budget"
            exact
            render={() =>
              this.state.logged_in ? (
                !isEmptyObject(this.state.user) && (
                  <Budget
                    handle_logout={this.handle_logout}
                    user={this.state.user}
                  />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />          


          <Route
            path="/tools/Retirement"
            exact
            render={() =>
              this.state.logged_in ? (
                !isEmptyObject(this.state.user) && (
                  <Retirement
                    handle_logout={this.handle_logout}
                    user={this.state.user}
                  />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />


          <Route
            path="/tools/Life-Insurance"
            exact
            render={() =>
              this.state.logged_in ? (
                !isEmptyObject(this.state.user) && (
                  <LifeInsurance
                    handle_logout={this.handle_logout}
                    user={this.state.user}
                  />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/help"
            exact
            render={() =>
              this.state.logged_in ? (
                <HelpPage handle_logout={this.handle_logout} />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          {/*Admin Paths*/}
          <Route
            path="/admin"
            exact
            render={() =>
              this.state.logged_in ? (
                !isEmptyObject(this.state.user) && (
                  <AdminDashboard
                    user={this.state.user}
                    handle_logout={this.handle_logout}
                  />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/admin/emails"
            exact
            render={() =>
              this.state.logged_in ? (
                !isEmptyObject(this.state.user) && (
                  <RegisterNewCEIPage
                    user={this.state.user}
                    handle_logout={this.handle_logout}
                  />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/ManageArticles/article/id/"
            render={() =>
              this.state.logged_in ? (
                <AdminArticleEdit handle_logout={this.handle_logout} />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/admin/create"
            exact
            render={() =>
              this.state.logged_in ? (
                !isEmptyObject(this.state.user) && (
                  <AdminNewArticlePage
                    user={this.state.user}
                    handle_logout={this.handle_logout}
                  />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/admin/manage"
            exact
            render={() =>
              this.state.logged_in ? (
                <ManageArticlesPage handle_logout={this.handle_logout} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/admin/userinfo"
            exact
            render={() =>
              this.state.logged_in ? (
                <AdminViewFilterUsers handle_logout={this.handle_logout} />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/admin/adminedit"
            exact
            render={() =>
              this.state.logged_in ? (
                !isEmptyObject(this.state.user) && (
                  <AdminEdit
                    handle_logout={this.handle_logout}
                    user={this.state.user}
                  />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />

          {
            <Route
              path="/admin/reports"
              exact
              render={() =>
                this.state.logged_in ? (
                  <DownloadReportsPage handle_logout={this.handle_logout} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          }

          {/*Questionnaire Paths*/}
          <Route
            path="/questionnaire"
            exact
            render={(props) =>
              this.state.logged_in ? (
                !isEmptyObject(this.state.user) && (
                  <Form user={this.state.user} />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/controlquestionnaire"
            exact
            render={(props) =>
              this.state.logged_in ? (
                !isEmptyObject(this.state.user) && (
                  <AdminForm user={this.state.user} />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
