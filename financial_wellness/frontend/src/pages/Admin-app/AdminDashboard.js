import React from "react";
import AdminNav from "../../components/Navbars/admin-navbar";
import axiosInstance from "../../axiosApi";

/**
 * Component that contains elements and functions related to the admin dashboard.
 *
 * Renders out a page meant to be routed through a navbar for admin side, as well as on login for a admin account.
 *
 * @version 1.2.0
 */
class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company_count: 0,
      registered_users_count: 0,
      active_users_count: 0,
      number_of_users_logged_multiple: 0,
      never_stressed_count: 0,
      rarely_stressed_count: 0,
      once_month_count: 0,
      couple_times_month_count: 0,
      once_week_count: 0,
      couple_times_week_count: 0,
      daily_stressed_count: 0,
      constantly_stressed_count: 0,
    }
    this.retrieve_data = this.retrieve_data.bind(this);
  }

  componentDidMount() {
    this.retrieve_data();
  }

  /**
   * Makes an API call to get data to display on the dashboard.
   * 
   * Sets state variables if successful, as well as success flag.
   *
   * @private
   */
      async retrieve_data() {
      await axiosInstance
      .get("/dash-data/")
      .then((result) => {
        this.setState({
          company_count: result.data["NUMBER OF COMPANIES"],
          registered_users_count: result.data["NUMBER OF REGISTERED USERS"],
          active_users_count: result.data["NUMBER OF USERS ACTIVE IN LAST 30 DAYS"],
          number_of_users_logged_multiple: result.data["NUMBER OF USERS THAT LOGGED IN AT LEAST TWICE"],
          never_stressed_count: result.data["NUMBER OF USERS WHO SELECTED NEVER STRESSED"],
          rarely_stressed_count: result.data["NUMBER OF USERS WHO SELECTED RARELY STRESSED"],
          once_month_count: result.data["NUMBER OF USERS WHO SELECTED STRESSED ONCE A MONTH"],
          couple_times_month_count: result.data["NUMBER OF USERS WHO SELECTED STRESSED A COUPLE TIMES A MONTH"],
          once_week_count: result.data["NUMBER OF USERS WHO SELECTED STRESSED ONCE A WEEK"],
          couple_times_week_count: result.data["NUMBER OF USERS WHO SELECTED STRESSED A COUPLE TIMES A WEEK"],
          daily_stressed_count: result.data["NUMBER OF USERS WHO SELECTED STRESSED DAILY"],
          constantly_stressed_count: result.data["NUMBER OF USERS WHO SELECTED STRESSED CONSTANTLY"],
        });
      })
      .catch((error) => {
          throw error;
      });
  }

  render() {
    return (
      <div className="d-flex flex-row overflow-hidden min-vh-100">
        <div className="col-2">
          {/* Side navigation bar*/}
          <AdminNav handle_logout={this.props.handle_logout} />
        </div>
        {/* Dashboard Content */}
        <div className="container-fluid m-5 p-5 bg-light border rounded">
          {/* General Info Row */}
          <div className="row">
            {/* Larger Card */}
            <div className="col">
              <div className="card" style={{minHeight:400}}>
                <div className="card-header">
                  Registered Users
                </div>
                <div className="card-body text-center d-flex justify-content-center align-items-center">
                  <h1>
                    {this.state.registered_users_count}
                    <p className="lead"> User accounts registered and linked to registered email addresses.</p>
                  </h1>
                </div>
              </div>              
            </div>
            {/* Smaller Cards */}
            <div className="col">
              {/* Top Row */}
              <div className="row mb-3">
                <div className="col">
                  <div className="card" style={{minHeight:175}}>
                    <div className="card-header">
                      Client Companies
                    </div>
                    <div className="card-body text-center d-flex justify-content-center align-items-center">
                      <h1>
                        {this.state.company_count}
                        <p className="lead"> Client companies with their employees entered in the database.</p>
                      </h1>
                    </div>
                  </div>                  
                </div>
              </div>
              {/* Bottom Row */}
              <div className="row">
                <div className="col">
                  <div className="card" style={{minHeight:208}}>
                    <div className="card-header">
                      Active Users
                    </div>
                    <div className="card-body text-center d-flex justify-content-center align-items-center">
                      <h1>
                        {this.state.active_users_count}
                        <p className="lead"> Users active in the last 30 days.</p>
                      </h1>
                    </div>
                  </div>                  
                </div>
                <div className="col">
                  <div className="card" style={{minHeight:208}}>
                    <div className="card-header">
                      Users with multiple Logins
                    </div>
                    <div className="card-body text-center d-flex justify-content-center align-items-center">
                      <h1>
                        {this.state.number_of_users_logged_multiple}
                        <p className="lead"> Users who have logged in more than once.</p>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* User stress info row */}
          {/* Future TODO: Convert these cards into a single bar graph. */}
          <div className="row row-cols-4 mt-3">
            <div className="col">
              <div className="card" style={{minHeight:200}}>
                <div className="card-body text-center d-flex justify-content-center align-items-center">
                  <h1>
                    {this.state.never_stressed_count}
                    <p className="lead"> Users who are <strong>never</strong> stressed about their financial situation.</p>
                  </h1>
                </div>
              </div>              
            </div>
            <div className="col">
              <div className="card" style={{minHeight:200}}>
                <div className="card-body text-center d-flex justify-content-center align-items-center">
                  <h1>
                    {this.state.once_month_count}
                    <p className="lead"> Users who stress about their financial situation <strong>once a month</strong>.</p>
                  </h1>
                </div>
              </div>              
            </div>
            <div className="col">
              <div className="card" style={{minHeight:200}}>
                <div className="card-body text-center d-flex justify-content-center align-items-center">
                  <h1>
                    {this.state.couple_times_month_count}
                    <p className="lead"> Users who stress about their financial situation <strong>a couple times a month</strong>.</p>
                  </h1>
                </div>
              </div>              
            </div>
            <div className="col">
              <div className="card" style={{minHeight:200}}>
                <div className="card-body text-center d-flex justify-content-center align-items-center">
                  <h1>
                    {this.state.daily_stressed_count}
                    <p className="lead"> Users who stress about their financial situation <strong>daily</strong>.</p>
                  </h1>
                </div>
              </div>              
            </div>
            <div className="col mt-3">
              <div className="card" style={{minHeight:200}}>
                <div className="card-body text-center d-flex justify-content-center align-items-center">
                  <h1>
                    {this.state.rarely_stressed_count}
                    <p className="lead"> Users who are <strong>rarely stressed</strong> about their financial situation.</p>
                  </h1>
                </div>
              </div>              
            </div>
            <div className="col mt-3">
              <div className="card" style={{minHeight:200}}>
                <div className="card-body text-center d-flex justify-content-center align-items-center">
                  <h1>
                    {this.state.once_week_count}
                    <p className="lead"> Users who stress about their financial situation <strong>once a week</strong>.</p>
                  </h1>
                </div>
              </div>              
            </div>
            <div className="col mt-3">
              <div className="card" style={{minHeight:200}}>
                <div className="card-body text-center d-flex justify-content-center align-items-center">
                  <h1>
                    {this.state.couple_times_week_count}
                    <p className="lead"> Users who stress about their financial situation <strong>a couple times a week</strong>.</p>
                  </h1>
                </div>
              </div>              
            </div>
            <div className="col mt-3">
              <div className="card" style={{minHeight:200}}>
                <div className="card-body text-center d-flex justify-content-center align-items-center">
                  <h1>
                    {this.state.constantly_stressed_count}
                    <p className="lead"> Users who stress about their financial situation <strong>constantly</strong>.</p>
                  </h1>
                </div>
              </div>              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
