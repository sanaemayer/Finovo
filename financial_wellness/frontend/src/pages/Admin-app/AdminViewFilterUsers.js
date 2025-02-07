import React from "react";
import AdminNav from "../../components/Navbars/admin-navbar";
import axiosInstance from "../../axiosApi";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Button } from "react-bootstrap";
import AdminEdit from "./AdminEdit";


/**
 * Component that lists all the users that have signed up on the finovo application. 
 * The admin can sort the users by clicking on any of the table headings - Company, First name etc. as well as 
 * search the users from the given search bars. The buttons on the last column of the table will allow
 * the admin to change any data that the user has entered,
 * 
 * Renders out a page meant to be routed through a navbar for admin side.
 *
 *
 *
 * @version 3.0.0
 */

const { SearchBar } = Search;

//Variables used for filtering/sorting the data
let nameFilter;
let firstnameFilter;
let lastnameFilter;
let emailFilter;
let logincountFilter;


/*

The globalclear button erases all the filtered users from the search results and resets the table dynamically
*/
const ClearButton = (props) => {
  const handleClick = () => {
    props.onSearch("");
    props.clearAllFilter();
  };
  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      style={{
        fontSize: "16px",
        padding: "5px",
        margin: "10px",
        height: "40px",
      }}
    >
      Clear
    </Button>
  );
};

class AdminViewFilterUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user_email: "",
      button_clicked: false,
      emailinfo: "",
      selectedRowAction: null,
    };
    this.fetchTasks = this.fetchTasks.bind(this);
  }


//The columns that are displayed on the table. The datafield entry in each section corresponds to the 
//respective user model in Client Eomployee info
  columns = [
    {
      dataField: "company",
      text: "Company Name",
      style: { backgroundColor: "ghostwhite",
      padding: "10px",
    fontSize: "20px"},
      filter: textFilter({
        delay:10,
        
        getFilter: filter => {
          
          nameFilter = filter;
        },
      }),
      sort: true,
    },
    {
      dataField: "email",
      text: "Username/Email",
      style: { backgroundColor: "ghostwhite",
      padding: "10px",
    fontSize: "20px"},
      filter: textFilter({
        delay:10,
        getFilter: filter => {
          emailFilter = filter;
        }
      }),
      sort: true,
    },
    {
      dataField: "first_name",
      text: "First Name",
      style: { backgroundColor: "ghostwhite",
      padding: "10px",
    fontSize: "20px"},
      filter: textFilter(
        
        {
          delay:10,
        getFilter: filter => {
          firstnameFilter = filter;
          
        }
      }),
      sort: true,
    },
    {
      dataField: "last_name",
      text: "Last Name",
      style: { backgroundColor: "ghostwhite",
        padding: "10px",
      fontSize: "20px"},
      
      filter: textFilter({
        delay:10,
        getFilter: filter => {
          lastnameFilter = filter;
        },
    
        
      }),
      sort: true,
    },

    {
      dataField: "login_count",
      text: "Login Count",
      style: { backgroundColor: "ghostwhite",
      padding: "10px", fontSize:"20px" },
      
      filter: textFilter({
        delay:10,
        getFilter: filter => {
          logincountFilter = filter;
        }
      
      }),
      sort: true,
    },

    {
      dataField: "username",
      text: "View/Edit",
      
      //Setting a button click that will prompt the admin to that particular user's profile where they can 
      //make changes

      formatter: (rowContent, row, formatExtraData) => {
        return (
          <button
            type="button"
            className="btn btn-lg btn-outline-primary w-100 my-3"
            onClick={() => {
              this.setState({
                button_clicked: true,
                emailinfo: row.email,
              });
            }}
          >
            View/Edit
          </button>
        );
      },
    },
  ];

  
/*
These clear filters erase all the filtered users from the search results and resets the table dynamically
*/
  clearAllFilter() {
    nameFilter("");
    firstnameFilter("");
    lastnameFilter("");
    emailFilter("");
    logincountFilter("");
  }

  componentDidMount() {
    this.fetchTasks();
  }

   /**
   * Makes a GET API call to the client employee list, and GETS all the users registered into 'users' container
   */
  async fetchTasks() {
    await axiosInstance
      .get("users/CEI-list/")
      .then((result) => {
        this.setState({
          users: result.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {

    //Redirects admin to the USer profile data of the user once the admin clicks on the button 
    //displayed later in the function
    if (this.state.button_clicked)
      return <AdminEdit email={this.state.emailinfo} />;

    return (
      <div className="d-flex flex-row overflow-hidden min-vh-100">
        <div className="col-2">
          {/* Side navigation bar*/}
          <AdminNav handle_logout={this.props.handle_logout} />
        </div>
        <div className="col d-flex flex-column flex-wrap m-5 p-5 bg-light">
          <h1 className="text-center">View / Edit User Information</h1>
          <hr />
          {/* Content */}
          <div className="container-fluid">
            <ToolkitProvider
              bootstrap4
              keyField="email"
              data={this.state.users}
              columns={this.columns}
              search
            >
              {props => (
                <div className="text-center">
                  <div className="mb-4">
                  <SearchBar
                    {...props.searchProps}
                    className= "text-center mb-3"
                    style={{ width: "600px", height: "40px" }}
                    srText={["Search the user by putting in any of the following table headings"]}
                  />
                  <ClearButton
                    {...props.searchProps}
                    clearAllFilter={this.clearAllFilter}
                  />
                  </div>
                  <BootstrapTable
                    {...props.baseProps}
                    filter={filterFactory()}
                    keyField="email"
                    noDataIndication="User not found"
                    hover
                    borderless
                    condensed
                  />
                </div>
              )}
            </ToolkitProvider>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminViewFilterUsers;
