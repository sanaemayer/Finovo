import React from 'react'
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';
import UserNav from "../../components/Navbars/user-navbar";
import axiosInstance from "../../axiosApi";

class Budget extends React.Component{


  constructor(props) {
    super(props);

    this.state = {budgetData: {MortgageRent: 0, PropertyTax: 0, HomeInsurance: 0, Utilities: 0, Cable: 0, HousingOther: 0, VehiclePayment: 0, VehicleInsurance: 0, Gasoline: 0, ParkingFees: 0, Groceries: 0, DiningOut: 0, FoodOther: 0, Entertainment: 0, Clothing: 0, Fitness: 0, Hobbies: 0, Pets: 0, Subscriptions: 0, PersonalOther: 0, FamilyInsurance: 0, ChildCare: 0, ActivtiesLessons: 0, FamilyOther: 0, HouseMaintenance: 0, VehicleMaintenance: 0, Travel: 0, Gifts: 0, MembershipDues: 0, AnnualSalary: 0, PartnerSalary: 0, OtherIncome: 0 }}
    }

    componentDidMount() {
      this.getBudgetData();
     
    }
  
    async getBudgetData() {
      await axiosInstance
        .get("tools/budget-get/"+ this.props.user.email+'/')
        .then((result) => {
          this.setState({ budgetData: result.data });
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
          budgetData: {
            ...this.state.budgetData,
            [name]: value,
          },
        }
        );
        
      };

      handleReset = (e) => {
        // resetting the state values to 0 
        this.setState({budgetData: {MortgageRent: 0, PropertyTax: 0, HomeInsurance: 0, Utilities: 0, Cable: 0, HousingOther: 0, VehiclePayment: 0, VehicleInsurance: 0, Gasoline: 0, ParkingFees: 0, Groceries: 0, DiningOut: 0, FoodOther: 0, Entertainment: 0, Clothing: 0, Fitness: 0, Hobbies: 0, Pets: 0, Subscriptions: 0, PersonalOther: 0, FamilyInsurance: 0, ChildCare: 0, ActivtiesLessons: 0, FamilyOther: 0, HouseMaintenance: 0, VehicleMaintenance: 0, Travel: 0, Gifts: 0, MembershipDues: 0, AnnualSalary: 0, PartnerSalary: 0, OtherIncome: 0 }});


        // resetting the values in the backend as well 

        //assigning the values to be passed to backend
        let result_dict = {...this.state.budgetData}; // creating a copy   
        result_dict.MortgageRent = 0;
        result_dict.PropertyTax = 0;
        result_dict.HomeInsurance = 0;
        result_dict.Utilities = 0;
        result_dict.Cable = 0;
        result_dict.HousingOther = 0;
        result_dict.VehiclePayment = 0;
        result_dict.VehicleInsurance = 0;
        result_dict.Gasoline = 0;
        result_dict.ParkingFees = 0;
        result_dict.Groceries = 0;
        result_dict.DiningOut = 0;
        result_dict.FoodOther = 0;
        result_dict.Entertainment = 0;
        result_dict.Clothing = 0;
        result_dict.Fitness = 0;
        result_dict.Hobbies = 0;
        result_dict.Pets = 0;
        result_dict.Subscriptions = 0;
        result_dict.PersonalOther = 0;
        result_dict.FamilyInsurance = 0;
        result_dict.ChildCare = 0;
        result_dict.ActivtiesLessons = 0;
        result_dict.FamilyOther = 0;
        result_dict.HouseMaintenance = 0; 
        result_dict.VehicleMaintenance = 0;
        result_dict.Travel = 0;
        result_dict.Gifts = 0;
        result_dict.MembershipDues = 0;
        result_dict.AnnualSalary = 0;
        result_dict.PartnerSalary = 0;
        result_dict.OtherIncome = 0;

        // sending data to the backend
        axiosInstance
        .post(
          "tools/budget-create/" + this.props.user.email + "/",
          result_dict
        )


      }
  

  handleSubmit = (event) => {

    event.preventDefault();

    // storing our parameters into variables after converting them to float 
    let mortgageRent = parseFloat(this.state.budgetData.MortgageRent);
    let propertyTax = parseFloat(this.state.budgetData.PropertyTax);
    let homeInsurance = parseFloat(this.state.budgetData.HomeInsurance);
    let utilities = parseFloat(this.state.budgetData.Utilities);
    let cableInternetCellular = parseFloat(this.state.budgetData.Cable);
    let housingOther = parseFloat(this.state.budgetData.HousingOther);

    let vehiclePayment = parseFloat(this.state.budgetData.VehiclePayment);
    let vehicleInsurance = parseFloat(this.state.budgetData.VehicleInsurance);
    let gasoline = parseFloat(this.state.budgetData.Gasoline);
    let parkingFees = parseFloat(this.state.budgetData.ParkingFees);

    let groceries = parseFloat(this.state.budgetData.Groceries);
    let diningOut = parseFloat(this.state.budgetData.DiningOut);
    let foodOther = parseFloat(this.state.budgetData.FoodOther);

    let entertainment = parseFloat(this.state.budgetData.Entertainment);
    let clothing = parseFloat(this.state.budgetData.Clothing);
    let fitness = parseFloat(this.state.budgetData.Fitness);
    let hobbies = parseFloat(this.state.budgetData.Hobbies);
    let pets = parseFloat(this.state.budgetData.Pets);
    let subscriptions = parseFloat(this.state.budgetData.Subscriptions);
    let personalOther = parseFloat(this.state.budgetData.PersonalOther);

    let familyInsurance = parseFloat(this.state.budgetData.FamilyInsurance);
    let childcare = parseFloat(this.state.budgetData.ChildCare);
    let activitiesLessons = parseFloat(this.state.budgetData.ActivtiesLessons);
    let familyOther = parseFloat(this.state.budgetData.FamilyOther);

    let houseMaintenance = parseFloat(this.state.budgetData.HouseMaintenance);
    let vehicleMaintenance = parseFloat(this.state.budgetData.VehicleMaintenance);
    let travel = parseFloat(this.state.budgetData.Travel);
    let giftsHolidays = parseFloat(this.state.budgetData.Gifts);
    let membershipDues = parseFloat(this.state.budgetData.MembershipDues);

    let annualSalary = parseFloat(this.state.budgetData.AnnualSalary);
    let partnerSalary = parseFloat(this.state.budgetData.PartnerSalary);
    let incomeOther = parseFloat(this.state.budgetData.OtherIncome);

    
    


    //assigning the values to be passed to backend
    let result_dict = {...this.state.budgetData}; // creating a copy   
    result_dict.MortgageRent = mortgageRent;
    result_dict.PropertyTax = propertyTax;
    result_dict.HomeInsurance = homeInsurance;
    result_dict.Utilities = utilities;
    result_dict.Cable = cableInternetCellular;
    result_dict.HousingOther = housingOther;
    result_dict.VehiclePayment = vehiclePayment;
    result_dict.VehicleInsurance = vehicleInsurance;
    result_dict.Gasoline = gasoline;
    result_dict.ParkingFees = parkingFees;
    result_dict.Groceries = groceries;
    result_dict.DiningOut = diningOut;
    result_dict.FoodOther = foodOther;
    result_dict.Entertainment = entertainment;
    result_dict.Clothing = clothing;
    result_dict.Fitness = fitness;
    result_dict.Hobbies = hobbies;
    result_dict.Pets = pets;
    result_dict.Subscriptions = subscriptions;
    result_dict.PersonalOther = personalOther;
    result_dict.FamilyInsurance = familyInsurance;
    result_dict.ChildCare = childcare;
    result_dict.ActivtiesLessons = activitiesLessons;
    result_dict.FamilyOther = familyOther;
    result_dict.HouseMaintenance = houseMaintenance; 
    result_dict.VehicleMaintenance = vehicleMaintenance;
    result_dict.Travel = travel;
    result_dict.Gifts = giftsHolidays;
    result_dict.MembershipDues = membershipDues;
    result_dict.AnnualSalary = annualSalary;
    result_dict.PartnerSalary = partnerSalary;
    result_dict.OtherIncome = incomeOther;
   

    // sending data to the backend
    axiosInstance
    .post(
      "tools/budget-create/" + this.props.user.email + "/",
      result_dict
    )


   
    
  }



    render(){
      let mortgageRent = parseFloat(this.state.budgetData.MortgageRent);
      let propertyTax = parseFloat(this.state.budgetData.PropertyTax);
      let homeInsurance = parseFloat(this.state.budgetData.HomeInsurance);
      let utilities = parseFloat(this.state.budgetData.Utilities);
      let cableInternetCellular = parseFloat(this.state.budgetData.Cable);
      let housingOther = parseFloat(this.state.budgetData.HousingOther);
  
      let vehiclePayment = parseFloat(this.state.budgetData.VehiclePayment);
      let vehicleInsurance = parseFloat(this.state.budgetData.VehicleInsurance);
      let gasoline = parseFloat(this.state.budgetData.Gasoline);
      let parkingFees = parseFloat(this.state.budgetData.ParkingFees);
  
      let groceries = parseFloat(this.state.budgetData.Groceries);
      let diningOut = parseFloat(this.state.budgetData.DiningOut);
      let foodOther = parseFloat(this.state.budgetData.FoodOther);
  
      let entertainment = parseFloat(this.state.budgetData.Entertainment);
      let clothing = parseFloat(this.state.budgetData.Clothing);
      let fitness = parseFloat(this.state.budgetData.Fitness);
      let hobbies = parseFloat(this.state.budgetData.Hobbies);
      let pets = parseFloat(this.state.budgetData.Pets);
      let subscriptions = parseFloat(this.state.budgetData.Subscriptions);
      let personalOther = parseFloat(this.state.budgetData.PersonalOther);
  
      let familyInsurance = parseFloat(this.state.budgetData.FamilyOther);
      let childcare = parseFloat(this.state.budgetData.ChildCare);
      let activitiesLessons = parseFloat(this.state.budgetData.ActivtiesLessons);
      let familyOther = parseFloat(this.state.budgetData.FamilyOther);
  
      let houseMaintenance = parseFloat(this.state.budgetData.HouseMaintenance);
      let vehicleMaintenance = parseFloat(this.state.budgetData.VehicleMaintenance);
      let travel = parseFloat(this.state.budgetData.Travel);
      let giftsHolidays = parseFloat(this.state.budgetData.Gifts);
      let membershipDues = parseFloat(this.state.budgetData.MembershipDues);
  
      let annualSalary = parseFloat(this.state.budgetData.AnnualSalary);
      let partnerSalary = parseFloat(this.state.budgetData.PartnerSalary);
      let incomeOther = parseFloat(this.state.budgetData.OtherIncome);
  
  
  
      let Aren = mortgageRent + propertyTax + homeInsurance + utilities + cableInternetCellular + housingOther
              + vehiclePayment + vehicleInsurance + gasoline + parkingFees + groceries + diningOut + foodOther
              + entertainment + clothing + fitness + hobbies + pets + subscriptions + personalOther + familyInsurance
              + childcare + activitiesLessons + familyOther;
      let Bren = houseMaintenance + vehicleMaintenance + travel + giftsHolidays + membershipDues;
      let Cren = Bren / 12;
      let Dren = Aren + Cren;
      let Eren = annualSalary + partnerSalary + incomeOther;
      let res1 = Math.round(Eren - Dren);
      let res2 = Math.round(Cren);
      let res3 = Math.round(Eren * 0.5);
      let res4 = Math.round(Eren * 0.3);
      let res5 = Math.round(Eren * 0.2);


        return(
            <div className="d-flex flex-row overflow-hidden min-vh-100">
              <Helmet>
                <title>{ "Budget Calculator" }</title>
              </Helmet>
                <div className="col-2">
                {/* Side navigation bar */}
                <UserNav handle_logout={this.props.handle_logout} />
                </div>

                <div className="col overflow-hidden d-flex flex-column flex-wrap  m-5 border rounded bg-light">
                    <div className="container-fluid px-5 my-3">
                    <h1 className="display-4 text-center">Budget Calculator</h1>
                    <hr/>
                    </div>

                    <div>
                    <ul class="list-group list-group-flush m-5">

                      <h3 className="display-10 text-left">Monthly Housing Expenses</h3>

                      {/* Mortgage / Rent Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Mortgage / Rent
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "MortgageRent"
                        value = {this.state.budgetData.MortgageRent}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Property Tax Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Property Tax
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "PropertyTax"
                        value = {this.state.budgetData.PropertyTax}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Home Insurance Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Home Insurance
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "HomeInsurance"
                        value = {this.state.budgetData.HomeInsurance}
                        placeholder={18}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Utilities Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Utilities
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "Utilities"
                        value = {this.state.budgetData.Utilities}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Cable/Internet/Cell Phones Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Cable/Internet/Cell Phones
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "Cable"
                        value = {this.state.budgetData.Cable}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>

                      </li>

                      {/* Other Housing Expenses Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Other

                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "HousingOther"
                        value = {this.state.budgetData.HousingOther}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>

                      </li>

                    </ul>

                    <ul class="list-group list-group-flush m-5">

                      <h3 className="display-10 text-left">Monthly Transportation Expenses</h3>

                      {/* Vehicle Payment Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Vehicle Payment
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "VehiclePayment"
                        value = {this.state.budgetData.VehiclePayment}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Vehicle Insurance Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Vehicle Insurance
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "VehicleInsurance"
                        value = {this.state.budgetData.VehicleInsurance}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Gasoline Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Gasoline
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "Gasoline"
                        value = {this.state.budgetData.Gasoline}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Parking Fees Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Parking Fees
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "ParkingFees"
                        value = {this.state.budgetData.ParkingFees}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                    </ul>

                    <ul class="list-group list-group-flush m-5">

                      <h3 className="display-10 text-left">Monthly Food Expenses</h3>

                      {/* Groceries Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Groceries
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "Groceries"
                        value = {this.state.budgetData.Groceries}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Dining Out Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Dining Out
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "DiningOut"
                        value = {this.state.budgetData.DiningOut}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Other Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Other
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "FoodOther"
                        value = {this.state.budgetData.FoodOther}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                    </ul>

                    <ul class="list-group list-group-flush m-5">

                      <h3 className="display-10 text-left">Monthly Personal Expenses</h3>

                      {/* Entertainment Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Entertainment
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "Entertainment"
                        value = {this.state.budgetData.Entertainment}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Clothing Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Clothing
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "Clothing"
                        value = {this.state.budgetData.Clothing}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Fitness Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Fitness
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "Fitness"
                        value = {this.state.budgetData.Fitness}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Hobbies Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Hobbies
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "Hobbies"
                        value = {this.state.budgetData.Hobbies}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Pets Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Pets
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "Pets"
                        value = {this.state.budgetData.Pets}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>

                      </li>
                      
                      {/* Subscriptions Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Subscriptions
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "Subscriptions"
                        value = {this.state.budgetData.Subscriptions}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>

                      </li>

                      {/* Other Personal Expenses Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Other

                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "PersonalOther"
                        value = {this.state.budgetData.PersonalOther}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>

                      </li>

                    </ul>

                    <ul class="list-group list-group-flush m-5">

                      <h3 className="display-10 text-left">Monthly Family Expenses</h3>

                      {/* Insurance Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Insurance
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "FamilyInsurance"
                        value = {this.state.budgetData.FamilyInsurance}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Childcare Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Childcare
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "ChildCare"
                        value = {this.state.budgetData.ChildCare}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Activities / Lessons Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Activities / Lessons
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "ActivtiesLessons"
                        value = {this.state.budgetData.ActivtiesLessons}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Other Family Expenses Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Other
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "FamilyOther"
                        value = {this.state.budgetData.FamilyOther}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                    </ul>

                    <ul class="list-group list-group-flush m-5">

                      <h3 className="display-10 text-left">Yearly Expenses</h3>

                      {/* House Maintenance Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>House Maintenance
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "HouseMaintenance"
                        value = {this.state.budgetData.HouseMaintenance}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Vehicle Maintenance Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Vehicle Maintenance
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "VehicleMaintenance"
                        value = {this.state.budgetData.VehicleMaintenance}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Travel Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Travel
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "Travel"
                        value = {this.state.budgetData.Travel}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Gifts / Holidays Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Gifts / Holidays
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "Gifts"
                        value = {this.state.budgetData.Gifts}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Membership Dues Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Membership Dues
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "MembershipDues"
                        value = {this.state.budgetData.MembershipDues}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                    </ul>

                    <ul class="list-group list-group-flush m-5">

                      <h3 className="display-10 text-left">Income</h3>

                      {/* Annual Salary Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Annual Salary (before Taxes)
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "AnnualSalary"
                        value = {this.state.budgetData.AnnualSalary}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Partner Salary Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Partner Salary
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "PartnerSalary"
                        value = {this.state.budgetData.PartnerSalary}
                        aria-label="Username" 
                        aria-describedby="basic-addon1"
                        onChange = {this.handleChange}/>
                      </div>
                        
                      </li>

                      {/* Other Monthly Income Field */}
                      <li className = "list-group-item d-flex flex-wrap justify-content-between p-3"><strong/>Other Monthly Income
                                                  
                      <div class="input-group w-25"> 
                        <input type="number" 
                        step="1"
                        min="0"
                        class="form-control" 
                        name = "OtherIncome"
                        value = {this.state.budgetData.OtherIncome}
                        placeholder={18}
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
                        <div className="p-2"><button type="button" class="btn btn-danger" onClick = {this.handleReset}>Reset Data</button></div> 
                        </Link>                        

                        <Link>
                        <div className="p-2"><button type="button" class="btn btn-primary" 
                        onClick = {this.handleSubmit} data-bs-toggle="modal" data-bs-target="#exampleModal">Calculate Results</button></div>
                        </Link>


                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Retirement Assessment Results</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">

                                You currently have {"$" + res1} for savings and debt each month. <br/>
                                You should be saving a minimum of {"$" + res2} each month for yearly expenses. <br/><br/>
                                Based on the 50/30/20 budget and your household income, you should be spending {"$" + res3} per month on needs. 
                                And spending {"$" + res4} on wants, and putting {"$" + res5} per month towards saving and paying down debt.

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
export default Budget;
