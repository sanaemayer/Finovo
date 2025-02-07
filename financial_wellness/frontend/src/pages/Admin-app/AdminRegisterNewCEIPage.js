import React from "react";
import AdminNav from "../../components/Navbars/admin-navbar";
import { CSVReader } from "react-papaparse";
import axiosInstance from "../../axiosApi";
/**
 * Component that contains elements and functions related to adding client employee info (CEI) to the database.
 *
 * Renders out a page meant to be routed through a navbar for admin side.
 *
 * @version 1.1.0
 */

class RegisterNewCEIPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Data from the manual input section.
      activeManualInput: {
        id: null,
        first_name: "",
        last_name: "",
        email: "",
        company: "",
        account_type: "",
      },

      // Container to hold the currently uploaded csv data
      clientData: [],

      // Manual upload error-checking flags.
      manualWarning: false,
      manualSuccess: false,

      // CSV upload error-checking flags.
      uploadWarning: false,
      uploadSuccess: false,
      disabled: true,
    };
  }

  /**
   * Updates the state of activeManualInput
   * Is called by all input fields for manual input.
   *
   * Requires that the name of the assigned input field is correctly set
   * to match the variable names in activeManualInput.
   *
   * @param {SyntheticEvent} e
   * @private
   */
  handle_change_manual = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      activeManualInput: {
        ...this.state.activeManualInput,
        [name]: value,
      },
    });
  };

  /**
   * Handles the actual manual uploading call to the API, as well as validation of email input.
   *
   * First name, Last name, and Company are not validated because there is no concrete guidelines to follow. Can change later.
   * A POST request is sent to the API to create a new ClientEmployeeInfo entry.
   *
   * @param {SyntheticEvent} e
   * @private
   */
  handle_submit_manual = (e) => {
    e.preventDefault();
    // Validate the Email Address format
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.state.activeManualInput.email)) {
      // Make POST request to API
      axiosInstance
        .post("users/CEI-create/", this.state.activeManualInput)
        .then((result) => {
          this.setState({
            activeManualInput: {
              id: null,
              first_name: "",
              last_name: "",
              email: "",
              company: "",
              account_type: "",
            },
            manualWarning: false,
            manualSuccess: true,
            uploadWarning: false,
            uploadSuccess: false,
          });
        })
        .catch((error) => {
          this.setState({
            manualWarning: true,
            manualSuccess: false,
            uploadWarning: false,
            uploadSuccess: false,
          });
          throw error;
        });
    }
  };

  /**
   * If there is an error during CSV file upload, the error message is written to the console.
   *
   * @private
   */
  handle_on_error = (err, file, inputElm, reason) => {
    console.log(err, file, inputElm, reason);
  };

  /**
   * Handles parsing data from a CSV file when one is either dropped or added to the upload section.
   *
   * Data is put into clientData which is used in handle_csv_submit
   *
   * @param {Array} data
   * @private
   */
  handle_on_drop = (data) => {
    let clientData = [];
    for (let i = 0; i < data.length; ++i) {
      if (data[i]["errors"].length === 0) {
        clientData[i] = {
          first_name: data[i]["data"]["first_name"],
          last_name: data[i]["data"]["last_name"],
          email: data[i]["data"]["email"],
          company: data[i]["data"]["company"],
          account_type: data[i]["data"]["account_type"],
        };
      }
    }
    // Enable uploadSubmit button
    this.setState({
      clientData,
      manualWarning: false,
      manualSuccess: false,
      uploadWarning: false,
      uploadSuccess: false,
      disabled: false,
    });
  };

  /**
   * Handles resetting field values back to default (null) when a file is removed from the input field.
   *
   * @private
   */
  handle_on_remove_file = () => {
    this.setState({
      clientData: [],
      manualWarning: false,
      manualSuccess: false,
      uploadWarning: false,
      uploadSuccess: false,
      disabled: true,
    });
  };

  /**
   * Handles making a POST request to the API to create ClientEmployeeInfo entries for all rows inside the CSV file.
   *
   * Turns clientData into a JSON string and sends that to the API View to be serialized.
   *
   * @param {SyntheticEvent} e
   * @private
   */
  handle_csv_submit = (e) => {
    e.preventDefault();
    // Make POST request to API
    axiosInstance
      .post("users/CEI-company-create/", this.state.clientData)
      .then((result) => {
        this.setState({
          clientData: [],
          manualWarning: false,
          manualSuccess: false,
          uploadWarning: false,
          uploadSuccess: true,
        });
      })
      .catch((error) => {
        this.setState({
          manualWarning: false,
          manualSuccess: false,
          uploadWarning: true,
          uploadSuccess: false,
        });
        throw error;
      });
  };

  render() {
    return (
      <div className="d-flex flex-row overflow-hidden min-vh-100">
        <div className="col-2">
          {/* Side navigation bar*/}
          <AdminNav handle_logout={this.props.handle_logout} />
        </div>
        <div className="col d-flex flex-column m-5 p-3 border rounded bg-light">
          {/* Page Description & Instructions */}
          <div className="container-sm text-center align-self-center align-items-center mx-5 p-3">
            <div className="h1">
              Add Employee Emails
              <small className="text-muted ms-2">
                manually or by CSV upload
              </small>
            </div>
            <hr />
            {/* Conditional Alerts*/}
            {this.state.manualWarning > 0 && (
              <div className="alert alert-danger" role="alert">
                Invalid email format, please enter again.
              </div>
            )}
            {this.state.manualSuccess > 0 && (
              <div className="alert alert-success text-wrap" role="alert"  id = "success-reg">
                Client Employee Info entry successfully created! The user
                related to this information can now complete registration.
              </div>
            )}
            {this.state.uploadWarning > 0 && (
              <div className="alert alert-danger" role="alert">
                File unable to be sent to the backend. Please contact site
                support. (Possible Issue: Data might already exist)
              </div>
            )}
            {this.state.uploadSuccess > 0 && (
              <div className="alert alert-success text-wrap" role="alert">
                CSV file successfully uploaded! It may take some time to parse
                all of the emails depending on the amount. Please be patient.
              </div>
            )}
          </div>
          {/* Input Forms */}
          <div className="row d-flex flex-wrap align-items-stretch justify-content-around mx-5 mb-4 p-3 border rounded border-dark">
            {/* Manual Input Card */}
            <div className="card my-3 p-4 w-auto" style={{ minWidth: 400 }}>
              <h1 className="text-center">Manual Entry</h1>
              <form
                onSubmit={this.handle_submit_manual}
                className="text-center needs-validation"
                id="manualForm"
              >
                <div className="form-text">
                  Please ensure all input is correct.
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handle_change_manual}
                    className="form-control"
                    type="text"
                    name="first_name"
                    value={this.state.activeManualInput.first_name}
                    id="firstNameInput"
                    placeholder="John"
                    required
                  />
                  <label for="firstNameInput">First Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handle_change_manual}
                    className="form-control"
                    type="text"
                    name="last_name"
                    value={this.state.activeManualInput.last_name}
                    id="lastNameInput"
                    placeholder="Doe"
                    required
                  />
                  <label htmlFor="lastNameInput">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handle_change_manual}
                    className="form-control"
                    type="text"
                    name="email"
                    value={this.state.activeManualInput.email}
                    id="emailInput"
                    placeholder="name@example.com"
                    required
                  />
                  <label htmlFor="emailInput">Email Address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={this.handle_change_manual}
                    className="form-control"
                    type="text"
                    name="company"
                    value={this.state.activeManualInput.company}
                    id="companyInput"
                    placeholder="ABCompany"
                    required
                  />
                  <label htmlFor="companyInput">Company</label>
                </div>
                <div className="form-floating">
                  <select
                    className="form-select"
                    type="text"
                    name="account_type"
                    id="typeInput"
                    aria-label="Floating label select"
                    value={this.state.activeManualInput.account_type}
                    onChange={this.handle_change_manual}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="ONE" id = "option-1">Level 1</option>
                    <option value="TWO" id = "option-2">Level 2</option>
                    <option value="THREE" id = "option-3">Level 3</option>
                    <option value="FOUR" id = "option-4">Level 4</option>
                    <option value="FIVE" id = "option-5">Level 5</option>
                  </select>
                  <label htmlFor="typeInput">Account Type</label>
                </div>
                <button className="btn btn-primary mt-3" type="submit" id = "submit-new-user">
                  Submit
                </button>
              </form>
            </div>
            {/* End of Manual Input Card and start of Info Section */}
            <div className="d-flex flex-column" style={{ maxWidth: 400 }}>
              <div className="h5 my-2 text-center">
                For both types of entry, please ensure that all input contains
                all the fields as specified below:
              </div>
              <hr />
              <ul className="list-unstyled text-center">
                <li>
                  <strong>First Name</strong> - The user's first name.
                </li>
                <li>
                  <strong>Last Name</strong> - The user's last name.
                </li>
                <li>
                  <strong>Email</strong> - The user's email, with proper format.
                </li>
                <li>
                  <strong>Company</strong> - The user's company.
                </li>
                <li>
                  <strong>Account Type</strong> - The user's level of service.
                </li>
              </ul>
              <hr />
              <small>
                <mark>
                  <strong>NOTE:</strong>
                </mark>{" "}
                Any CSV files being uploaded should have the column names in all
                caps and use underscores to separate words in the same column,
                <mark>ex. FIRST_NAME,LAST_NAME,EMAIL,COMPANY,ACCOUNT_TYPE</mark>
              </small>
              <small className="my-3">
                <mark>
                  <strong>NOTE:</strong>
                </mark>{" "}
                Only the email address is validated to ensure proper format for
                manual input. All other fields are not validated due to lack of
                guidelines, so once again make sure input is correct.
              </small>
            </div>
            {/* End of Info Section and start of Upload Input Card */}
            <div className="card my-3 p-4 w-auto" style={{ minWidth: 400 }}>
              <h1 className="mb-5 text-center">Upload CSV File</h1>
              <form
                onSubmit={this.handle_csv_submit}
                style={{ minHeight: 250 }}
                id="uploadForm"
              >
                <CSVReader
                  onDrop={this.handle_on_drop}
                  onError={this.handle_on_error}
                  accept=".csv"
                  config={{
                    header: true,
                    transformHeader: function (h) {
                      return h.toLowerCase();
                    },
                  }}
                  addRemoveButton
                  onRemoveFile={this.handle_on_remove_file}
                >
                  <p>Drop CSV file here or click to upload</p>
                </CSVReader>
                <div className="d-flex justify-content-center">
                  <button
                    id="uploadSubmit"
                    className="btn btn-primary mt-3"
                    type="submit"
                    name="Add"
                    disabled={this.state.disabled}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            {/* End of Upload Input Card */}
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterNewCEIPage;
