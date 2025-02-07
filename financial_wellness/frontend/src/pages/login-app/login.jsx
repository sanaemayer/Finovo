import React from "react";
import { Helmet } from 'react-helmet'
import finovoLogo from "../../images/blue-name-icon-small.png";

/* The following tutorial was followed to develop the UI of login/register page: 
https://www.youtube.com/watch?v=juUaJpMd2LE */

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
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
    event.preventDefault();    
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(this.state.email)) {
      this.props.handle_login(event, this.state);
    }
  };

  render() {
    return (
      
      <div className="d-flex flex-column m-2 h-100 align-items-center">
        <Helmet>
          <title>{ "Login" }</title>
        </Helmet>
        {/* Logo Container */}
        <div className="container-lg align-items-center m-3 p-2">
          <img src={finovoLogo} className="img-fluid" alt="FinovoLogo" />
        </div>
        <h1 className="display-3 my-3">Login</h1>
        {/* Inline Conditional - It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false.
          Therefore, if the condition is true, the element right after && will appear in the output. If it is false, React will ignore and skip it. */}
        {this.props.invalidLogin > 0 && (
          <div className="alert alert-danger mb-3" role="alert">
            Invalid email or password. Please enter again.
          </div>
        )}
        {/* Form Content */}
        <div className="container-fluid mt-3">
          <form
            onSubmit={this.handleSubmit}
            className="w-100 text-center needs-validation"
            id="loginForm"
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
            <button
              id="loginButton"
              className="btn btn-lg btn-primary mt-3"
              type="submit"
              name="loginButton"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
