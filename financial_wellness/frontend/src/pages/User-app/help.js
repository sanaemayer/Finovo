import React from "react";
import {Helmet} from "react-helmet";
import UserNav from "../../components/Navbars/user-navbar";
import emailjs from "emailjs-com";
class HelpPage extends React.Component {
  sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_gconhrn",
        "template_9gpku1c",
        e.target,
        "user_mA2vDGqMZf8OC63T72v2H"
      )
      .then(
        (result) => result,
        (error) => error
      );
    e.target.reset();
  }

  render() {
    return (
      <div className="d-flex flex-row overflow-hidden min-vh-100">
        <Helmet>
          <title>{ "Help" }</title>
        </Helmet>
        <div className="col-2">
          {/* Side navigation bar*/}
          <UserNav handle_logout={this.props.handle_logout} />
        </div>
        <div className="col d-flex flex-column m-5 border rounded bg-light">
          {/* Help Page Content */}
          <div className="container-md my-5 p-2 flex-grow-1 border rounded border-dark">
            <div className="row">
              <div className="col-sm d-flex flex-column px-5">
                <h1 className="display-6 text-center">Help and Support</h1>
                <hr />
              </div>
            </div>
            <div className="row px-3">
              {/* FAQ Section */}
              <div className="col-sm d-flex flex-column mt-3">
                <div className="display-5 mb-3 text-center" id = "faq-head">F.A.Q</div>
                {/* Update Answers */}
                <h5>
                  I want to update my questionnaire answers, where do I go?
                </h5>
                <hr />
                <p>
                  There are a couple ways to update your questionnaire answers.
                  <li>We send notifications to update periodically.</li>
                  <li>
                    You can go to your profile and press the 'Update
                    Questionnaire' button.
                  </li>
                </p>
                {/* About Russ */}
                <h5 className="mt-4">I want to delete my data.</h5>
                <hr />
                <p>
                  Please send us an email in the form to the right. Please
                  include your email, company, name, as well as any reasons you
                  may have for not using our service anymore inside the message
                  box. We will get back to you ASAP.
                </p>
              </div>
              {/* TODO: Hook up this form to actually send emails to a support email for this site. */}
              {/* Email Support */}
              <div className="col-sm d-flex flex-column mt-3 align-items-center">
                <div className="display-5 text-wrap" id = "contact-head">Contact Us</div>
                {/* Email Form */}
                <form
                  className="w-100 mt-5 p-5 border rounded border-dark"
                  onSubmit={this.sendEmail}
                >
                  <div className="mb-3">
                    <label htmlFor="supportEmailInput" className="form-label">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="supportEmailInput"
                      name="from_email"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="supportEmailTextArea"
                      className="form-label"
                    >
                      Your Message
                    </label>
                    <textarea
                      className="form-control"
                      id="supportEmailTextArea"
                      rows="3"
                      name="message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    id="submit-help-button"
                    className="btn btn-primary"
                    value="Send"
                  >
                    Submit
                  </button>
                </form>
                <small className="text-muted">
                  We appreciate any feedback regarding how to improve the site.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HelpPage;
