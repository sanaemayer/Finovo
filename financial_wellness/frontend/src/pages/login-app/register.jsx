import React from "react";
import {Helmet} from "react-helmet";
import finovoLogo from "../../images/blue-name-icon-small.png";

/* The following tutorial was followed to develop the UI of login/register page: 
https://www.youtube.com/watch?v=juUaJpMd2LE */

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      password_Check: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handle_change = this.handle_change.bind(this);
  }

  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  handleSubmit = (event) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let field_check = true;
    if (this.state.password !== this.state.confirmPassword) {
      field_check = false;
      this.setState({ password_Check: true });
    }
    if (re.test(this.state.email) && field_check) {
      this.setState({ password_Check: false });
      this.props.handle_signup(event, {
        ...this.state,
        username: this.state.email,
      });
    }

    event.preventDefault();
  };

  render() {
    return (
      <div className="d-flex flex-column m-2 h-100 align-items-center">
        <Helmet>
          <title>{ "Register" }</title>
        </Helmet>
        {/* Logo Container */}
        <div className="container-lg align-items-center m-3 p-2">
          <img src={finovoLogo} className="img-fluid" alt="FinovoLogo" />
        </div>
        {/* Inline Conditional - It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false.
          Therefore, if the condition is true, the element right after && will appear in the output. If it is false, React will ignore and skip it. */}
        {this.props.invalidSignup && (
          <div className="alert alert-danger mb-3" role="alert">
            Invalid Email. Please double check that you are entering an email
            that is registered with us.
          </div>
        )}
        {this.state.password_Check && (
          <div className="alert alert-danger mt-1 mb-1" role="alert">
            Please ensure that the password are the same.
          </div>
        )}
        {/* Form Content */}
        <div className="container-fluid mt-3">
          <form
            onSubmit={this.handleSubmit}
            className="w-100 text-center needs-validation"
            id="signupForm"
          >
            <div id="emailHelp" className="form-text">
              Please ensure all input is correct.
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                onChange={this.handle_change}
                className="form-control"
                name="email"
                id="emailInput"
                placeholder="name@example.com"
                required
              />
              <label htmlFor="emailInput">Email Address</label>
              <div className="invalid-feedback">Please enter an email.</div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                onChange={this.handle_change}
                className="form-control"
                name="password"
                id="passwordInput"
                placeholder="password"
                required
              />
              <label htmlFor="passwordInput">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                onChange={this.handle_change}
                className="form-control"
                name="confirmPassword"
                id="confirmPasswordInput"
                placeholder="password"
                required
              />
              <label htmlFor="passwordInput">Confirm Password</label>
            </div>

            <button
              id="signupButton"
              className="btn btn-lg btn-primary mt-3"
              type="submit"
              name="signupButton"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
