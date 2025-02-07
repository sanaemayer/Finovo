import React from 'react';
import AdminNav from '../../components/Navbars/admin-navbar';
import axiosInstance from "../../axiosApi";
import { jsonToCSV, CSVDownloader} from 'react-papaparse';

/**
 * Component that contains elements and functions related to downloading CSV Reports.
 * 
 * There are 3 types of reports, 'All', 'Company', and 'User' reports.
 * 
 * All reports contain general statistics about each company, so that effectiveness of the site
 * can be guaged at a glance.
 * 
 * Company reports contain information and statistics about all of the users registered in the
 * system from the specified company.
 * 
 * User reports contain all of the information that the specified user has inputted into the database.
 *
 * Renders out a page meant to be routed through a navbar for admin side.
 *
 * @version 1.2.0
 */

class DownloadReportsPage extends React.Component {
    constructor(props) {
        super(props);

        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            // Data Containers
            report: null,
            currentReportType: "",
            companyInput: "",
            prevcompanyInput: "",
            userInput: "",
            prevuserInput: "",
            // Other Variables
            currentDate: date,
            // Error checking Flags
            reportSuccess: false,
            reportError: false,
        }
        this.retrieve_all_report = this.retrieve_all_report.bind(this);
        this.retrieve_company_report = this.retrieve_company_report.bind(this);
        this.retrieve_user_report = this.retrieve_user_report.bind(this);
    }

    /**
     * Makes an API call to get the generated ALL report.
     * 
     * Sets state variables if successful, as well as success flag.
     *
     * @private
     */
    async retrieve_all_report() {
        await axiosInstance
        .get("/report-all/")
        .then((result) => {
            let all_report = jsonToCSV(result.data);
            this.setState({
                report: all_report,
                currentReportType: "All",
                reportSuccess: true,
                reportError: false,
            });
        })
        .catch((error) => {
            this.setState({
                reportSuccess: false,
                reportError: true,
            });
            throw error;
        });
    }

    /**
     * Makes an API call to get the generated Company report.
     * Takes in the company name as a parameter.
     * 
     * Sets state variables if successful, as well as success flag.
     *
     * @private
     */
    async retrieve_company_report(company) {
        await axiosInstance
        .get("/report-company/" + company + "/")
        .then((result) => {
            let company_report = jsonToCSV(result.data);
            this.setState({
                report: company_report,
                currentReportType: "Company",
                reportSuccess: true,
                reportError: false,
                companyInput: ""
            });
        })
        .catch((error) => {
            this.setState({
                reportSuccess: false,
                reportError: true,
            });
            throw error;
        });
    }

    /**
     * Makes an API call to get the generated User report.
     * Takes in the user's email as a parameter.
     * 
     * Sets state variables if successful, as well as success flag.
     *
     * @private
     */
    async retrieve_user_report(email) {
        await axiosInstance
        .get("/report-user/" + email + "/")
        .then((result) => {
            let new_data = JSON.stringify(result.data);
            this.setState({
                report: new_data,
                currentReportType: "User",
                reportSuccess: true,
                reportError: false,
                userInput: ""
            });
        })
        .catch((error) => {
            this.setState({
                reportSuccess: false,
                reportError: true,
            });
            throw error;
        });
    }

    /**
     * Updates state variables.
     * Is called by all input fields for manual input.
     *
     * @param {SyntheticEvent} e
     * @private
     */
    handle_change = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        this.setState({
            [name]: value,
            ["prev" + name]: value,
        });
    };

    render() {
        return (
            <div className="d-flex flex-row overflow-hidden min-vh-100">
                <div className="col-2">
                    {/* Side navigation bar*/}
                    <AdminNav handle_logout={this.props.handle_logout} />
                </div>
                <div className="col d-flex flex-column flex-wrap m-5 p-5 border rounded bg-light">
                    <h1 className="text-center">
                        Download Reports
                        <small className="text-muted ms-2">
                            per company, user, or for all users
                        </small>
                    </h1>
                    <hr />
                    <div className="container-fluid">
                        <div className="row d-flex flex-row-reverse">
                            <div className="order-2 col-md-3 d-flex flex-column py-3 pe-5">
                                {/* How */}
                                <h4>How to download Reports</h4>
                                <hr />
                                <p>
                                    Press on the 'Download Report' button for the type of report
                                you'd like to download. The report will be a CSV file.
                                </p>
                                {/* What */}
                                <h4 className="mt-3">What is inside each type of Report</h4>
                                <hr />
                                <ul> 
                                    <strong>User reports contain:</strong>
                                    <li>All data a User has inputted in the Questionnaire.</li>
                                </ul>
                                <ul> 
                                    <strong>Company reports contain:</strong>
                                    <li>A short summary of key info of all employees from that client company.</li>
                                </ul>
                                <ul> 
                                    <strong>'All' reports contain:</strong>
                                    <li>Information about the usage of the platform by employees from client companies.
                                            Used to gauge usefulness of the platform.
                                    </li>
                                </ul>
                            </div>
                            <div className="order-1 col-md d-flex flex-column px-5 py-3 border rounded border-dark">
                                {/* Notifications Section */}
                                {this.state.reportSuccess > 0 && (
                                    <div className="alert alert-success" role="alert">
                                        <strong>Report successfully generated!</strong> It can be downloaded by pressing the Download Report button
                                        down below.
                                    </div>
                                )}
                                {this.state.reportError > 0 && (
                                    <div class="alert alert-danger" role="alert">
                                        <strong>ERROR: Report unable to be generated. Please double check if your inputs are correct. </strong>
                                        If the problem persists, contact site support.
                                    </div>
                                )}
                                {/* Download Section */}
                                <p className="lead text-center mb-5">
                                    Please ensure that input is correct.
                                </p>
                                <div className="d-flex flex-wrap">
                                    <h1 className="display-6 text-center me-auto">All Users:</h1>
                                    <button type="button" className="btn btn-lg btn-primary" onClick={this.retrieve_all_report}>
                                        Generate Report
                                    </button>
                                </div>
                                <hr className="my-5"/>
                                <form className="d-flex flex-wrap needs-validation"
                                    id="companyReportForm"
                                    noValidate>
                                    <h1 className="display-6 text-center me-auto">Per Company:</h1>
                                    <div className="form-floating w-25">
                                        <input
                                            onChange={this.handle_change}
                                            className="form-control"
                                            type="text"
                                            name="companyInput"
                                            id="companyInput"
                                            value={this.state.companyInput}
                                            placeholder="name@example.com"
                                            required
                                        />
                                        <label htmlFor="companyInput">Company</label>
                                    </div>
                                    <button type="button" className="btn btn-lg btn-primary ms-5" id="companyReportButton" onClick={() => this.retrieve_company_report(this.state.companyInput)}>
                                        Generate Report
                                    </button>
                                </form>
                                <hr className="my-5"/>
                                <form className="d-flex flex-wrap needs-validation"
                                    id="userReportForm"
                                    noValidate>
                                    <h1 className="display-6 text-center me-auto">Per User:</h1>
                                    <div className="form-floating w-25">
                                        <input
                                            onChange={this.handle_change}
                                            className="form-control"
                                            type="text"
                                            name="userInput"
                                            id="emailInput"
                                            value={this.state.userInput}
                                            placeholder="name@example.com"
                                            required
                                        />
                                        <label htmlFor="emailInput">User Email</label>
                                    </div>
                                    <button type="button" className="btn btn-lg btn-primary ms-5" id="userReportButton" onClick={() => this.retrieve_user_report(this.state.userInput)}>
                                        Generate Report
                                    </button>
                                </form>
                                {/* Download button */}
                                {this.state.currentReportType === "All" && this.state.reportSuccess > 0 && (
                                    <CSVDownloader
                                        className="btn btn-lg btn-success w-25 mt-5 align-self-center"
                                        data={this.state.report}
                                        type="button"
                                        filename={'All Report - ' + this.state.currentDate}
                                        bom={true}
                                    >
                                        Download Report
                                    </CSVDownloader>                        
                                )}
                                {this.state.currentReportType === "Company" && this.state.reportSuccess > 0 && (
                                    <CSVDownloader
                                        className="btn btn-lg btn-success w-25 mt-5 align-self-center"
                                        data={this.state.report}
                                        type="button"
                                        filename={'Company Report - ' + this.state.prevcompanyInput + " - " + this.state.currentDate}
                                        bom={true}
                                    >
                                        Download Report
                                    </CSVDownloader>                        
                                )}
                                {this.state.currentReportType === "User" && this.state.reportSuccess > 0 && (
                                    <CSVDownloader
                                        className="btn btn-lg btn-success w-25 mt-5 align-self-center"
                                        data={this.state.report}
                                        type="button"
                                        filename={'User Report - ' + this.state.prevuserInput + " - " + this.state.currentDate}
                                        bom={true}
                                    >
                                        Download Report
                                    </CSVDownloader>                        
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DownloadReportsPage;
