import React from "react";
import { Redirect } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import "./loginstyle.scss";

/* The following tutorial was followed to develop the UI of login/register page: 
https://www.youtube.com/watch?v=juUaJpMd2LE */

class LoginApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
    };

    this.handle_login = this.handle_login.bind(this);
    this.handle_signup = this.handle_signup.bind(this);
  }

  componentDidMount() {
    //Add .right by default
    if (!this.props.logged_in) {
      this.rightSide.classList.add("right");
    }
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState((prevState) => ({
      isLogginActive: !prevState.isLogginActive,
    }));
  }

  handle_signup = (event, data) => {
    this.props.handle_signup(event, data);
  };

  handle_login = (event, data) => {
    this.props.handle_login(event, data);
  };

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    if (this.props.logged_in && !this.props.is_staff) {
      return <Redirect to="/dashboard" />;
    }
    if (this.props.logged_in && this.props.is_staff) {
      return <Redirect to="/admin" />;
    }
    return (
      <div className="App">
        <div className="login">
          <div className="login-container" ref={(ref) => (this.container = ref)}>
            {isLogginActive && (
              <Login
                containerRef={(ref) => (this.current = ref)}
                handle_login={this.handle_login}
                invalidLogin={this.props.invalidLogin}
              />
            )}
            {!isLogginActive && (
              <Register
                containerRef={(ref) => (this.current = ref)}
                handle_signup={this.handle_signup}
                invalidSignup={this.props.invalidSignup}
              />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={(ref) => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const RightSide = (props) => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default LoginApp;
