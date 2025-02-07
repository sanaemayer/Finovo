import React from "react";
import AdminForm from "../questionnaire/AdminForm";
import AdminNav from "../../components/Navbars/admin-navbar";
import axiosInstance from "../../axiosApi";

/**
 * Component that contains elements and functions related to displaying the profile page of the user from
 * the AdminViewFilterUsers as well as providing options to change editable fields all user data except email address;
 *  The Admin can update previously entered questionnaire data for the user too
 *
 * Renders out a page meant to be routed through a navbar for admin side.
 *
 *
 *
 * @version 3.0.0
 */

/* Function to refresh the page and send the admin back to the user list */
function refreshPage(){ 
    window.location.reload(); 
}

class AdminEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientData: {},
      userData: {
        is_active: null,
      },

      button_clicked: false,
      button_goback_clicked: false,
      // Error checking Flags
      updateInfoSuccess: false,
      updateInfoError: false,
    };
  }

  /**
   * Handles the actual manual uploading call to the API
   *
   * 
   * A POST request is sent to the API to Change the personal data fields.
   *
   * @param {SyntheticEvent} e
   * @private
   */
  handle_submit = (e) => {
    e.preventDefault();
    // Make POST request to API
    axiosInstance
      .post("users/CEI-update/" + this.props.email + "/", this.state.clientData)
      .then((result) => {
        this.setState({
          updateInfoSuccess: true,
          updateInfoError: false,
        });
      })
      .catch((error) => {
        this.setState({
          updateInfoSuccess: false,
          updateInfoError: true,
        });
        throw error;
      });

    axiosInstance
      .post("users/user-update/" + this.props.email + "/", this.state.userData)
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  };

  /**
   * Makes a GET API call to the client employee information, and GETS all the info into clientData container
   */
  async componentDidMount() {
    await axiosInstance
      .get("users/CEI-get/" + this.props.email + "/")
      .then((result) => {
        this.setState({ clientData: result.data });
      })
      .catch((error) => {
        throw error;
      });

    await axiosInstance
      .get("users/user-get/" + this.props.email + "/")
      .then((result) => {
        this.setState({ userData: result.data });
      })
      .catch((error) => {
        throw error;
      });
  }
   
  render() {
    //Redirects admin to the Questionnaire form of the user once the user clicks on the button 
    //displayed later in the function
    if (this.state.button_clicked)
      return <AdminForm email={this.props.email} />;
    return (
      <div className="d-flex flex-row overflow-hidden min-vh-100">
        <div className="col-2">
          {/* Side navigation bar*/}
          <AdminNav handle_logout={this.props.handle_logout} />
        </div>

        <div className="col d-flex flex-wrap text-wrap m-5 p-5 border rounded bg-light">
          <div className="container-fluid px-5 py-3 border rounded border-dark">
            {/* Label Row */}
            <div className="row">
              <div className="col-sm d-flex flex-column align-items-center">
                <h1 className="display-6">User Data</h1>
              </div>
            </div>
            <hr/>
            {/* Content Row */}
            <div className="row">
              <div className="col-sm d-flex flex-column align-items-center">
                <div className="d-flex flex-row">
                  {/*  Checkbox for changing user's 'active' status */}
                  <h4 className="text-wrap mx-4">Active</h4>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={this.state.userData.is_active}
                      id="is_active"
                      onChange={() => {
                        let is_active = document.getElementById("is_active")
                          .checked;
                        let userData = {
                          ...this.state.userData,
                          is_active: is_active,
                        };
                        this.setState({ userData });
                      }}
                    />
                  </div>
                </div>
                {/* First Name */}
                <h4 className="text-wrap">First Name:</h4>
                <input
                  type="text"
                  className="form-control form-select-lg w-50"
                  id="first_name"
                  value={this.state.clientData.first_name}
                  onChange={() => {
                    let first_name = document.getElementById("first_name")
                      .value;
                    let clientData = {
                      ...this.state.clientData,
                      first_name: first_name,
                    };
                    this.setState({ clientData });
                  }}
                />

                {/* Last Name */}
                <h4 className="text-wrap">Last Name:</h4>
                <input
                  type="text"
                  className="form-control form-select-lg w-50"
                  id="last_name"
                  value={this.state.clientData.last_name}
                  onChange={() => {
                    let last_name = document.getElementById("last_name").value;
                    let clientData = {
                      ...this.state.clientData,
                      last_name: last_name,
                    };
                    this.setState({ clientData });
                  }}
                />
                {/* User Email */}
                <h4 className="text-wrap">Email:</h4>
                <p> {this.props.email} </p>

                  {/* Company info */}
                <h4 className="text-wrap">Company:</h4>
                <input
                  type="text"
                  className="form-control form-select-lg w-50"
                  id="company"
                  value={this.state.clientData.company}
                  onChange={() => {
                    let company = document.getElementById("company").value;
                    let clientData = {
                      ...this.state.clientData,
                      company: company,
                    };
                    this.setState({ clientData });
                  }}
                />
                {/* Account type i.e  Level 1,2 etc.  */}
                <h4 className="text-wrap">Account Type:</h4>
                <select
                  className="form-control form-select-lg w-50"
                  id="account_type"
                  value={this.state.clientData.account_type}
                  onChange={() => {
                    let account_type = document.getElementById("account_type")
                      .value;
                    let clientData = {
                      ...this.state.clientData,
                      account_type: account_type,
                    };
                    this.setState({ clientData });
                  }}
                >
                  <option value={""}>Choose...</option>
                  <option value="ONE">Level 1</option>
                  <option value="TWO">Level 2</option>
                  <option value="THREE">Level 3</option>
                  <option value="FOUR">Level 4</option>
                  <option value="FIVE">Level 5</option>
                </select>
              </div>

              {/* Button which navigates the admin to the user questionnaire */}
              <div className="col-sm d-flex flex-column align-items-center">
                {/* Conditional Alerts */}
                {this.state.updateInfoWarning > 0 && (
                  <div className="alert alert-danger" role="alert">
                    <strong>The user's info could not be updated.</strong> Please check that everything is inputted properly and/or contact site support.
                  </div>
                )}
                {this.state.updateInfoSuccess > 0 && (
                  <div className="alert alert-success text-wrap" role="alert">
                    <strong>The user's info is successfully updated!</strong> They should be able to see the changes immediately.
                  </div>
                )}
                <button
                  type="button"
                  className="btn btn-lg btn-outline-primary w-100 me-3 mb-3"
                  onClick={() => {
                    this.setState({
                      button_clicked: true,
                      email: this.props.email,
                    });
                  }}
                >
                  View and Update Questionnaire
                </button>

                {/* Saves changes to Personal Info */}
                <button
                  type="button"
                  className="btn btn-lg btn-outline-primary w-100 me-3 mb-3"
                  onClick={this.handle_submit}
                >
                  Save Changes
                </button>

              {/* Attaches a button click to simply refresh the page and send the admin back to the previous user 
              list */}
                <button
                  onClick=
                    {refreshPage}
                
                  type="button"
                  className="btn btn-lg btn-primary w-50 my-3"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AdminEdit;
