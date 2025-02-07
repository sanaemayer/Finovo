import React from 'react'
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';
import UserNav from "../../components/Navbars/user-navbar";
import axiosInstance from "../../axiosApi";

class LifeInsurance extends React.Component{

  constructor(props) {
    super(props);

    // state to hold input of every field and also the final data  that will be going to the backend through API calls 
    this.state = {lifeInsuranceData: {Finalexp: 0, Mortgage: 0, Debt: 0, Emerg: 0, Kids: 0, Education: 0, Hier: 0, Years: 0, Insurance: 0, Result: 0}}
    }

componentDidMount() {
    this.getEmergencyData();
   
  }

  async getEmergencyData() {
    await axiosInstance
      .get("tools/life-insurance-get/"+ this.props.user.email+'/')
      .then((result) => {
        this.setState({ lifeInsuranceData: result.data });
        console.log(result.data)
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
        lifeInsuranceData: {
          ...this.state.lifeInsuranceData,
          [name]: value,
        },
      }
      );
      
    };

    handleReset = (e) => {
      e.preventDefault()

      // resetting the states to 0
      this.setState({lifeInsuranceData: {Finalexp: 0, Mortgage: 0, Debt: 0, Emerg: 0, Kids: 0, Education: 0, Hier: 0, Years: 0, Insurance: 0, Result: 0}})


      //assigning the values to be passed to backend
      // resetting the values
      let result_dict = {...this.state.lifeInsuranceData}; // creating a copy 
      result_dict.Finalexp = 0;
      result_dict.Mortgage = 0;
      result_dict.Debt = 0;
      result_dict.Emerg = 0;
      result_dict.Kids = 0; 
      result_dict.Education = 0; 
      result_dict.Hier = 0;
      result_dict.Years = 0;
      result_dict.Insurance = 0; 
      result_dict.Result = 0;

      // sending data to the backend
      axiosInstance
      .post(
        "tools/life-insurance-create/" + this.props.user.email + "/",
        result_dict
      )



    }

  handleSubmit = (event) => {

    event.preventDefault();
    
    // storing our parameters into variables after converting them to float 
    let finalexp_entry = parseFloat(this.state.lifeInsuranceData.Finalexp);
    let mortgage_entry = parseFloat(this.state.lifeInsuranceData.Mortgage);
    let debt_entry = parseFloat(this.state.lifeInsuranceData.Debt); 
    let emergency_entry = parseFloat(this.state.lifeInsuranceData.Emerg);
    let no_kids_entry = parseFloat(this.state.lifeInsuranceData.Kids); 
    let education_entry = parseFloat(this.state.lifeInsuranceData.Education);
    let hier_entry = parseFloat(this.state.lifeInsuranceData.Hier);
    let years_entry = parseFloat(this.state.lifeInsuranceData.Years);
    let insurance_entry = parseFloat(this.state.lifeInsuranceData.Insurance);



    // calculating A based on the first four entries 
    let A = finalexp_entry + mortgage_entry + debt_entry + emergency_entry;

    // assigned B, C, D, E and F
    let B = no_kids_entry;
    let C = education_entry;
    let D = hier_entry;
    let E = years_entry;
    let F = insurance_entry;


    // calculating the power part of H
    let base = 1.04;
    let power = -E;
    let k1 = Math.pow(base, power);
    let k2 = (1 - k1) / 0.04;

    // here we have H
    let H = (D * 12)  * k2; 

    
    // calculating the final result and rounding it
    let k3 = 100000 * B * C;
    let k4 = H + A + k3;
    let final_result = k4 - F;
    final_result = Math.round(final_result);

    //assigning the values to be passed to backend
    let result_dict = {...this.state.lifeInsuranceData}; // creating a copy 
    result_dict.Finalexp = finalexp_entry;
    result_dict.Mortgage = mortgage_entry;
    result_dict.Debt = debt_entry;
    result_dict.Emerg = emergency_entry;
    result_dict.Kids = B; 
    result_dict.Education = C; 
    result_dict.Hier = D;
    result_dict.Years = E;
    result_dict.Insurance = F; 
    
    result_dict.Result = final_result;
    console.log(result_dict);


    // sending data to the backend
    axiosInstance
      .post(
        "tools/life-insurance-create/" + this.props.user.email + "/",
        result_dict
      )
    
  }



    render(){
    
  

    let finalexp_entry = parseFloat(this.state.lifeInsuranceData.Finalexp);
    let mortgage_entry = parseFloat(this.state.lifeInsuranceData.Mortgage);
    let debt_entry = parseFloat(this.state.lifeInsuranceData.Debt); 
    let emergency_entry = parseFloat(this.state.lifeInsuranceData.Emerg);
    let no_kids_entry = parseFloat(this.state.lifeInsuranceData.Kids); 
    let education_entry = parseFloat(this.state.lifeInsuranceData.Education);
    let hier_entry = parseFloat(this.state.lifeInsuranceData.Hier);
    let years_entry = parseFloat(this.state.lifeInsuranceData.Years);
    let insurance_entry = parseFloat(this.state.lifeInsuranceData.Insurance);




    // calculating A based on the first four entries 
    let A = finalexp_entry + mortgage_entry + debt_entry + emergency_entry;

    // assigned B, C, D, E and F
    let B = no_kids_entry;
    let C = education_entry;
    let D = hier_entry;
    let E = years_entry;
    let F = insurance_entry;


    // calculating the power part of H
    let base = 1.04;
    let power = -E;
    let k1 = Math.pow(base, power);
    let k2 = (1 - k1) / 0.04;

    // here we have H
    let H = (D * 12)  * k2; 

    
    // calculating the final result and rounding it
    let k3 = 100000 * B * C;
    let k4 = H + A + k3;
    let final_result = k4 - F;
    final_result = Math.round(final_result);
        return(
            <div className="d-flex flex-row overflow-hidden min-vh-100">
              <Helmet>
                <title>{ "Life Insurance Calculator" }</title>
              </Helmet>
                <div className="col-2">
                {/* Side navigation bar */}
                <UserNav handle_logout={this.props.handle_logout} />
                </div>

                <div className="col overflow-hidden d-flex flex-column flex-wrap  m-5 border rounded bg-light">
                    <div className="container-fluid px-5 my-3">
                    <h1 className="display-4 text-center">Life Insurance Calculator</h1>
                    <hr/>
                    </div>

                    <div>
                    <ul class="list-group list-group-flush m-5">

                      {/* Final Expenses Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Final Expenses
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Finalexp"
                        value = {this.state.lifeInsuranceData.Finalexp}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Mortgage Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Mortage
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Mortgage"
                        value = {this.state.lifeInsuranceData.Mortgage}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>


          	          {/* Personal Loans / Debt Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Personal Loans / Debt 
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Debt"
                        value = {this.state.lifeInsuranceData.Debt}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>   

          	          {/* Emergency Fund */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Emergency Fund 
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Emerg"
                        value = {this.state.lifeInsuranceData.Emerg}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

          	          {/* Number of Kids */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Number of Kids
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Kids"
                        value = {this.state.lifeInsuranceData.Kids}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>                                                  

          	          {/* Childrens Education */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Childrens Education Percentage ($100000 x #of kids x (%entry))
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Education"
                        value = {this.state.lifeInsuranceData.Education}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>  

                      {/* How much money will survivors need  */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>How much monthly net income will your survivors need?
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Hier"
                        value = {this.state.lifeInsuranceData.Hier}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>  



                      {/* For how many years */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>For how many years? 
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Years"
                        value = {this.state.lifeInsuranceData.Years}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>  

                      {/* Existing Insurance */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Existing Insurance
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        class="form-control" 
                        name = "Insurance"
                        value = {this.state.lifeInsuranceData.Insurance}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>  


                    </ul>
                    {/* {this.questionList.map((question, index) => {
                        return(
                            <div>
                                <li className="list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>{question.content}
                            
                                <div class="input-group w-25"> 
                                    <input type="text" 
                                    class="form-control" 
                                    placeholder="Amount" 
                                    aria-label="Username" 
                                    aria-describedby="basic-addon1"/>
                                </div>
                                </li>

                            </div>
                        );})} 
                        </ul> */}

                    </div>

                    <div className= "d-flex flex-row flex-wrap align-self-end p-4">
                        <Link to="/tools/">
                        <div className="p-2"><button type="button" class="btn btn-secondary">Cancel</button></div> 
                        </Link>

                        <Link>
                        <div className="p-2"><button type="button" class="btn btn-danger" onClick = {this.handleReset}>Reset Data</button></div> 
                        </Link>                        




                        <Link>
                        <div className="p-2"><button type="button" class="btn btn-primary" onClick = {this.handleSubmit}
                        data-bs-toggle="modal" data-bs-target="#exampleModal">Calculate Results</button></div>
                        </Link>


                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Life Insurance Assessment Results</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                Based on your input, your reccomended amount life insurance is: {"$" + final_result}
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
export default LifeInsurance;