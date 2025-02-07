import React from 'react'
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';
import UserNav from "../../components/Navbars/user-navbar";
import axiosInstance from "../../axiosApi";

class Retirement extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      retirementData: {
        Age: 0, 
        RetirementAge: 0, 
        CurrentIncome: 0, 
        IncomeFrequency: 0, 
        RetirementIncome: 0, 
        RRSPSavings: 0, 
        RRSPFrequency:0,
        RRSPContributions: 0, 
        TFSASavings: 0, 
        TFSAContributions: 0, 
        TFSAFrequency:0,
        NRSISavings: 0, 
        NRSIContributions: 0, 
        NRSIFrequency:0}}
}
  



  componentDidMount() {
      this.getRetirementData();
     
    }
  
    async getRetirementData() {
      await axiosInstance
        .get("tools/retirement-get/"+ this.props.user.email+'/')
        .then((result) => {
          this.setState({ retirementData: result.data });
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
        retirementData: {
          ...this.state.retirementData,
          [name]: value,
        },
      }
      );
      
    };


    handleReset = (e) => {
      e.preventDefault();
  
  
  
      // resetting the state values back to 0 
      this.setState({
        retirementData: {
          Age: 0, 
          RetirementAge: 0, 
          CurrentIncome: 0, 
          IncomeFrequency: 0, 
          RetirementIncome: 0, 
          RRSPSavings: 0, 
          RRSPFrequency:0,
          RRSPContributions: 0, 
          TFSASavings: 0, 
          TFSAContributions: 0, 
          TFSAFrequency:0,
          NRSISavings: 0, 
          NRSIContributions: 0, 
          NRSIFrequency:0}});


  
      // clear backend as well
      // setting up the data to be passed in the backend 
      let result_dict = {...this.state.retirementData}; // creating a copy 
      result_dict.Age = 0;
      result_dict.RetirementAge = 0;
      result_dict.CurrentIncome = 0;
      result_dict.IncomeFrequency = 0;
      result_dict.RRSPSavings = 0;
      result_dict.RRSPContributions = 0;
      result_dict.TFSASavings = 0;
      result_dict.TFSAContributions = 0;
      result_dict.NRSISavings = 0;
      result_dict.NRSIContributions = 0;
      result_dict.Result = 0;
  
      // sending data to the backend
      axiosInstance
      .post(
        "tools/retirement-create/" + this.props.user.email + "/",
        result_dict
      )
  
  
  
  
    }    
  
  

  handleSubmit = (event) => {

    event.preventDefault();

    // storing our parameters into variables after converting them to float 
    let age = parseFloat(this.state.retirementData.Age);
    let retirementAge = parseFloat(this.state.retirementData.RetirementAge);
    let currentIncome = parseFloat(this.state.retirementData.CurrentIncome);
    let incomeFrequency = parseFloat(this.state.retirementData.IncomeFrequency);
    let retirementIncome = parseFloat(this.state.retirementData.RetirementIncome);
    let rrspSavings = parseFloat(this.state.retirementData.RRSPSavings);
    let rrspContributions = parseFloat(this.state.retirementData.RRSPContributions);
    let tfsaSavings = parseFloat(this.state.retirementData.TFSASavings);
    let tfsaContributions = parseFloat(this.state.retirementData.TFSAContributions);
    let nrsiSavings = parseInt(this.state.retirementData.NRSISavings);
    let nrsiContributions = parseFloat(this.state.retirementData.NRSIContributions);



  

    // setting up the data to be passed in the backend 
    let result_dict = {...this.state.retirementData}; // creating a copy 
    result_dict.Age = age;
    result_dict.RetirementAge = retirementAge;
    result_dict.CurrentIncome = currentIncome;
    result_dict.IncomeFrequency = incomeFrequency;
    result_dict.RetirementIncome = retirementIncome;
    result_dict.RRSPSavings = rrspSavings;
    result_dict.RRSPContributions = rrspContributions;
    result_dict.TFSASavings = tfsaSavings;
    result_dict.TFSAContributions = tfsaContributions;
    result_dict.NRSISavings = nrsiSavings;
    result_dict.NRSIContributions = nrsiContributions;


    // sending data to the backend
    axiosInstance
    .post(
      "tools/retirement-create/" + this.props.user.email + "/",
      result_dict
    )

    
    event.preventDefault();
  }



    render(){
      let age = parseFloat(this.state.retirementData.Age);
      let retirementAge = parseFloat(this.state.retirementData.RetirementAge);
      let currentIncome = parseFloat(this.state.retirementData.CurrentIncome);
      let incomeFrequency = parseFloat(this.state.retirementData.IncomeFrequency);
      let retirementIncome = parseFloat(this.state.retirementData.RetirementIncome);
      let rrspSavings = parseFloat(this.state.retirementData.RRSPSavings);
      let rrspContributions = parseFloat(this.state.retirementData.RRSPContributions);
      let rrspFrequency = parseFloat(this.state.retirementData.RRSPFrequency);
      let tfsaSavings = parseFloat(this.state.retirementData.TFSASavings);
      let tfsaContributions = parseFloat(this.state.retirementData.TFSAContributions);
      let tfsaFrequency = parseFloat(this.state.retirementData.TFSAFrequency);
      let nrsiSavings = parseInt(this.state.retirementData.NRSISavings);
      let nrsiContributions = parseFloat(this.state.retirementData.NRSIContributions);
      let nrsiFrequency = parseFloat(this.state.retirementData.NRSIFrequency);
  

      let Aren = age;
      let Bren = retirementAge;

      let Cren = 95;

      let Dren = currentIncome;
      if (incomeFrequency === 0){
        Dren = currentIncome * 12;
      } else {
        Dren = currentIncome;
      }
      let Eren = retirementIncome / 100;
      
      let Fren = rrspSavings + tfsaSavings + nrsiSavings;
      let Gren = 0;
      if (rrspFrequency === 0){
        Gren = Gren + 12 * rrspContributions;
      } else {
        Gren = Gren + rrspContributions;
      }
      if (tfsaFrequency === 0){
        Gren = Gren + 12 * tfsaContributions;
      } else {
        Gren = Gren + tfsaContributions;
      }
      if (nrsiFrequency === 0){
        Gren = Gren + 12 * nrsiContributions;
      } else {
        Gren = Gren + nrsiContributions;
      }

      let Hren = 0.04;
      let Iren = 65;

      let Jren = Bren - Aren;
      let Kren = Iren - Aren;
      let Lren = Cren - Iren;
      let Mren = Cren - Bren;

      let Pren = Fren * Math.pow(1+Hren, Jren);
      let Qren = Gren * ((Math.pow(1 + Hren, Jren) - 1) / Hren);
      let Rren = ((Dren * Eren) * (1 - Math.pow(1 + Hren, -1 * Mren))) / Hren;
      let Sren = Fren * Math.pow(1 + Hren, Kren);
      let Tren = Gren * ((Math.pow(1 + Hren, Kren) - 1) / Hren);
      let Uren = ((Dren * Eren) * (1 - Math.pow(1 + Hren, -1 * Lren))) / Hren;
      let Vren = Pren + Qren;
      let Wren = Sren + Tren;

        return(
            <div className="d-flex flex-row overflow-hidden min-vh-100">
              <Helmet>
                <title>{ "Retirement Calculator" }</title>
              </Helmet>
                <div className="col-2">
                {/* Side navigation bar */}
                <UserNav handle_logout={this.props.handle_logout} />
                </div>

                <div className="col overflow-hidden d-flex flex-column flex-wrap  m-5 border rounded bg-light">
                    <div className="container-fluid px-5 my-3">
                    <h1 className="display-4 text-center">Retirement Calculator</h1>
                    <hr/>
                    </div>

                    <div>
                    <ul class="list-group list-group-flush m-5">

                      <h3 className="display-10 text-left">Tell us about yourself</h3>

                      {/* Current Age Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>What is your age?
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        max="100"
                        min="18"
                        class="form-control" 
                        name = "Age"
                        value = {this.state.retirementData.Age}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Retirement Age Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Age you want to retire?
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        max="100"
                        min="18"
                        class="form-control" 
                        name = "RetirementAge"
                        value = {this.state.retirementData.RetirementAge}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                    </ul>
                    <ul class="list-group list-group-flush m-5">

                      <h3 className="display-10 text-left">Your income details</h3>

                      {/* Current Income Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Current income (before taxes)
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        min="0"
                        class="form-control" 
                        name = "CurrentIncome"
                        value = {this.state.retirementData.CurrentIncome}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>




                      {/* Retirement Income Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>How much will you need for retirement (annually)
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        min="0"
                        max="100"
                        class="form-control" 
                        name = "RetirementIncome"
                        value = {this.state.retirementData.RetirementIncome}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>


                      {/* Current Income Frequency Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Frequency
                                                  
                      <div class="input-group w-25"> 
                        <select type="number" 
                        class="form-control" 
                        name = "IncomeFrequency"
                        value = {this.state.retirementData.IncomeFrequency}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}>
                          <option value={0}>Monthly</option>
                          <option value={1}>Annually</option>
                      </select>
                      </div>
                        
                      </li>                      
                    
                    </ul>
                    <ul class="list-group list-group-flush m-5">

                    <h3 className="display-10 text-left">Your savings and contributions</h3>
                    <h3 className="display-10 text-left">RRSP</h3>


                      {/* RRSP Savings Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Current savings
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        min="0"
                        class="form-control" 
                        name = "RRSPSavings"
                        value = {this.state.retirementData.RRSPSavings}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* RRSP Contributions Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Regular Contributions
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        min="0"
                        class="form-control" 
                        name = "RRSPContributions"
                        value = {this.state.retirementData.RRSPContributions}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* RRSP Frequency Field */}
                      

                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Frequency
                                                  
                      <div class="input-group w-25"> 
                        <select type="number" 
                        class="form-control" 
                        name = "RRSPFrequency"
                        value = {this.state.retirementData.RRSPFrequency}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}>
                          <option value={0}>Monthly</option>
                          <option value={1}>Annually</option>
                      </select>
                      </div>
                        
                      </li>

                      <h3 className="display-10 text-left">TFSA</h3>

                      {/* TSFA Savings Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Current savings
                            
                      <div class="input-group w-25"> 
                        <input type="number" 
                        min={0}
                        class="form-control" 
                        name = "TFSASavings"
                        value = {this.state.retirementData.TFSASavings}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* TSFA Contributions Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Regular Contributions
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        min={0}
                        class="form-control" 
                        name = "TFSAContributions"
                        value = {this.state.retirementData.TFSAContributions}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* TSFA Frequency Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Frequency
                                                  
                      <div class="input-group w-25"> 
                        <select type="number" 
                        class="form-control" 
                        name = "TFSAFrequency"
                        value = {this.state.retirementData.TFSAFrequency}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}>
                          <option value={0}>Monthly</option>
                          <option value={1}>Annually</option>
                      </select>
                      </div>
                        
                      </li>

                      <h3 className="display-10 text-left">Non-registered savings and investments</h3>

                      {/* NRSI Savings Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Current savings
                            
                      <div class="input-group w-25"> 
                        <input type="number" 
                        min={0}
                        class="form-control" 
                        name = "NRSISavings"
                        value = {this.state.retirementData.NRSISavings}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* NRSI Contributions Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Regular Contributions
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        min={0}
                        class="form-control" 
                        name = "NRSIContributions"
                        value = {this.state.retirementData.NRSIContributions}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* NRSI Frequency Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Frequency
                                                  
                      <div class="input-group w-25"> 
                        <select type="number" 
                        class="form-control" 
                        name = "NRSIFrequency"
                        value = {this.state.retirementData.NRSIFrequency}
                        placeholder="Amount" 
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}>
                          <option value={0}>Monthly</option>
                          <option value={1}>Annually</option>
                      </select>
                      </div>
                        
                      </li>


                    </ul>

                    </div>

                    <div className= "d-flex flex-row flex-wrap align-self-end p-4">
                        {/* Button to go back to the tools page */}
                        <Link to="/tools/">
                        <div className="p-2"><button type="button" class="btn btn-secondary">Cancel</button></div> 
                        </Link>

                        {/* Button to reset all the entered data  */}
                        <Link to="/tools/">
                        <div className="p-2"><button type="button" class="btn btn-danger" onClick = {this.handleReset}>Reset Data</button></div> 
                        </Link>

                        {/* Button to calculate the results */}
                        <Link>
                        <div className="p-2"><button type="button" class="btn btn-primary" 
                        onClick = {this.handleSubmit} data-bs-toggle="modal" data-bs-target="#exampleModal">Calculate Results</button></div>
                        </Link>


                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Assessment</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                You are predicted to have {"$" + Vren.toFixed(2)} at your retirement age goal.
                                You should have saved {"$" + Rren.toFixed(2)} at your retirement age goal.
                                You are predicted to have {"$" + Wren.toFixed(2)} at your retirement age goal.
                                You should have saved {"$" + Uren.toFixed(2)} at your retirement age goal.
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
export default Retirement;