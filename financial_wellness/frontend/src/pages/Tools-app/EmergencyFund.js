import React from 'react'
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';
import UserNav from "../../components/Navbars/user-navbar";
import axiosInstance from "../../axiosApi";

class EmergencyFund extends React.Component{

  constructor(props) {
    super(props);

    // state to hold input of every field and also the final data  that will be going to the backend through API calls 
    this.state = { 
                  emergencyFundData: {Rent: 0, Utilities: 0, Telecom: 0, Insurance: 0, Transportation: 0, Debt: 0, Other: 0, Current: 0, Recommended: 0, Remaining: 0}}
                  
  }
  


  componentDidMount() {
    this.getEmergencyData();
   
  }

  async getEmergencyData() {
    await axiosInstance
      .get("tools/emergency-get/"+ this.props.user.email+'/')
      .then((result) => {
        this.setState({ emergencyFundData: result.data });

      }
      
      )
      .catch((error) => {
        throw error;
      });
  }
  handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      emergencyFundData: {
        ...this.state.emergencyFundData,
        [name]: value,
      },
    }
    );
    
  };

  handleReset = (e) => {
    e.preventDefault();

    // resetting the states back to 0
    this.setState({emergencyFundData: {Rent: 0, Utilities: 0, Telecom: 0, Insurance: 0, Transportation: 0, Debt: 0, Other: 0, Current: 0, Recommended: 0, Remaining: 0}}); 


    // resetting the data at the backend server 
    // making a result dict to store the data 
    let result_dict = {...this.state.emergencyFundData}; // creating a copy 
    result_dict.Rent = 0;
    result_dict.Utilities = 0;
    result_dict.Telecom = 0;
    result_dict.Insurance = 0;
    result_dict.Transportation = 0;
    result_dict.Debt = 0;
    result_dict.Other = 0;
    result_dict.Current = 0;
    result_dict.Recommended = 0;
    result_dict.Remaining = 0;

    // sending data to the backend
    axiosInstance
      .post(
        "tools/emergency-create/" + this.props.user.email + "/",
        result_dict
      )




  }


  handleSubmit = (event) => {


    event.preventDefault();

    // storing values from the state 
    let rent_entry = parseFloat(this.state.emergencyFundData.Rent);
    let utils_entry = parseFloat(this.state.emergencyFundData.Utilities);
    let telecom_entry = parseFloat(this.state.emergencyFundData.Telecom);
    let insurance_entry = parseFloat(this.state.emergencyFundData.Insurance);
    let transportation_entry = parseFloat(this.state.emergencyFundData.Transportation);
    let debt_entry = parseFloat(this.state.emergencyFundData.Debt);
    let other_entry = parseFloat(this.state.emergencyFundData.Other);
    let current_entry = parseFloat(this.state.emergencyFundData.Current);

    let A = rent_entry + utils_entry + telecom_entry + insurance_entry + transportation_entry + debt_entry + other_entry;
    let B = current_entry;

    // recommended amount for emergency fund
    let recommendedAmount = A * 6; 
    recommendedAmount = Math.round(recommendedAmount);

    // remaining needed to achieve to the recommended amount 
    let remainingAmount = recommendedAmount - B;

    // making a result dict to store the data 
    let result_dict = {...this.state.emergencyFundData}; // creating a copy 
    result_dict.Rent = rent_entry;
    result_dict.Utilities = utils_entry;
    result_dict.Telecom = telecom_entry;
    result_dict.Insurance = insurance_entry;
    result_dict.Transportation = transportation_entry;
    result_dict.Debt = debt_entry;
    result_dict.Other = other_entry;
    result_dict.Current = current_entry;
    result_dict.Recommended = recommendedAmount;
    result_dict.Remaining = remainingAmount;

    // sending data to the backend
    axiosInstance
      .post(
        "tools/emergency-create/" + this.props.user.email + "/",
        result_dict
      )



    
  }





    render(){
      let rent_entry = parseFloat(this.state.emergencyFundData.Rent);
      let utils_entry = parseFloat(this.state.emergencyFundData.Utilities);
      let telecom_entry = parseFloat(this.state.emergencyFundData.Telecom);
      let insurance_entry = parseFloat(this.state.emergencyFundData.Insurance);
      let transportation_entry = parseFloat(this.state.emergencyFundData.Transportation);
      let debt_entry = parseFloat(this.state.emergencyFundData.Debt);
      let other_entry = parseFloat(this.state.emergencyFundData.Other);
      let current_entry = parseFloat(this.state.emergencyFundData.Current);

      let A = rent_entry + utils_entry + telecom_entry + insurance_entry + transportation_entry + debt_entry + other_entry;
      let B = current_entry;
        return(
            <div className="d-flex flex-row overflow-hidden min-vh-100">
              <Helmet>
                <title>{ "Emergency Funds Calculator" }</title>
              </Helmet>
                <div className="col-2">
                {/* Side navigation bar */}
                <UserNav handle_logout={this.props.handle_logout} />
                </div>

                <div className="col overflow-hidden d-flex flex-column flex-wrap  m-5 border rounded bg-light">
                    <div className="container-fluid px-5 my-3">
                    <h1 className="display-4 text-center">Emergency Fund Calculator</h1>
                    <hr/>
                    </div>

                    <div>
                    <ul class="list-group list-group-flush m-5">

                      {/* Rent Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Monthly Rent or Monthly Mortgage Amount
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Rent"
                        value = {this.state.emergencyFundData.Rent}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Utilities Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Monthly Utilities Payments
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Utilities"
                        value = {this.state.emergencyFundData.Utilities}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>


          	          {/* Telecom Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Monthly Telecom Payments 
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Telecom"
                        value = {this.state.emergencyFundData.Telecom}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>   

          	          {/* Insurance Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Monthly Insurance Payments
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Insurance"
                        value = {this.state.emergencyFundData.Insurance}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

          	          {/* Transportation */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Monthly Transportation Costs
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Transportation"
                        value = {this.state.emergencyFundData.Transportation}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>                                                  

          	          {/* Monthly Debt field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Monthly Debt Payments
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Debt"
                        value = {this.state.emergencyFundData.Debt}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>  

                      {/* Other monthly payments field  */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Other Monthly Payments
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Other"
                        value = {this.state.emergencyFundData.Other}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>  



                      {/* current savings field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>How much do you currently have saved for Emergencies 
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Current"
                        value = {this.state.emergencyFundData.Current}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>  

                    </ul>


                    </div>

                    <div className= "d-flex flex-row flex-wrap align-self-end p-4">
                        <Link to="/tools/">
                        <div className="p-2"><button type="button" class="btn btn-secondary">Cancel</button></div> 
                        </Link>

                        <Link>
                        <div className="p-2"><button type="button" class="btn btn-danger"  onClick = {this.handleReset}>Reset Data</button></div> 
                        </Link>                        


                        <Link>
                        <div className="p-2"><button type="button" class="btn btn-primary" 
                          onClick = {this.handleSubmit} data-bs-toggle="modal" data-bs-target="#exampleModal">Calculate Results</button></div>
                        </Link>


                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Emergency Fund Assessment Results</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                Your reccomended emergency fund amount is {"$" + Math.round(A*6)}. 
                                Remaining {"$" + Math.round(A*6-B)} required to reach the reccomended amount 
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default EmergencyFund;