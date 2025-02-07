import React from "react";
import {Helmet} from "react-helmet";
import UserNav from "../../components/Navbars/user-navbar";

/**
 * Component that contains elements and functions related to contacting a financial coach.
 * 
 * Renders out a page meant to be routed through a navbar for user side.
 *
 * @version 1.0.0
 */
class ContactCoachPage extends React.Component {
  render() {
    return (
      <div className="d-flex flex-row overflow-hidden min-vh-100">
        <Helmet>
          <title>{ "Contact Coach" }</title>
        </Helmet>
        <div className="col-2">
          {/* Side navigation bar*/}
          <UserNav handle_logout={this.props.handle_logout} />
        </div>
        <div className="col d-flex flex-column m-5 p-5 border rounded bg-light">
          <h1 className="display-4 text-center">
            Get in touch with our Financial Coach
          </h1>
          <hr />

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 d-flex flex-column py-5">
                {/* About Financial Coaches */}
                <h4>What is a Financial Coach?</h4>
                <hr />
                <p>
                  A Financial Coach <mark>educates clients</mark> on the basics of personal 
                  finance and creates a plan that reflects the <mark>values and goals 
                  of the client</mark>. The coach <mark>empowers clients</mark> to make decisions 
                  and offers appropriate tools and resources to <mark>ultimately reduce 
                  financial stress</mark>.
                </p>
                {/* About Russ */}
                <h4 className="mt-4">Who is Russ?</h4>
                <hr />
                <p>
                  Russ is our very own Financial Coach, dedicated to helping
                  people like you achieve your financial goals. Whether you're{" "}
                  <mark>in need of strategies</mark> to use to reach your goals,
                  or need help <mark>navigating certain financial topics</mark>,
                  Russ is ready to help.
                </p>
              </div>
              <div className="col-md d-flex flex-column align-items-center">
                {/* Acuity */}
                <div className="container mx-5 py-5 align-self-center border rounded border-dark">
                  <h1 className="display-6 mb-4 text-center" id="appt-heading">
                    Setup an appointment now!
                  </h1>
                  <iframe
                    title="Contact Advisor"
                    src="https://app.squarespacescheduling.com/schedule.php?owner=21947793&appointmentType=20859932"
                    height="400"
                    className="d-flex w-100"
                  ></iframe>{" "}
                  <script
                    src="https://embed.acuityscheduling.com/js/embed.js"
                    type="text/javascript"
                    id ="embedded-script"
                  ></script>
                  <small className="text-muted text-center">
                    NOTE: It is recommended that you complete the questionnaire
                    prior to meeting, so that our coach is able to have a better 
                    grasp of your situation and can come prepared with some plans
                    in mind.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactCoachPage;
