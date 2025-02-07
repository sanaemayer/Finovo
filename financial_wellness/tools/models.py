"""Tools Models

This script contains definitions for models related to the Tools application.

It currently contains the following models:
    LifeInsuranceResults
    RetirementResults
    BudgetResults
    EmergencyFundResults
"""

from django.db import models
from django.contrib.auth.models import User

# TODO: Update comments for each class, as well as attribute names

# The column names were unclear so I have left it same as the calculation that Russ has sent us via email
class LifeInsuranceResults(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    Finalexp = models.IntegerField(default=0.0)
    Mortgage = models.IntegerField(default=0.0)
    Debt = models.IntegerField(default=0.0)
    Emerg = models.IntegerField(default=0.0)
    Kids = models.IntegerField(default = 0.0)
    Education = models.IntegerField(default=0.0)
    Hier = models.IntegerField(default=0.0)
    Years = models.IntegerField(default=0.0)
    Insurance = models.IntegerField(default=0.0)
   
    Result = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} | {self.Result}"

class RetirementResults(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    
    Age = models.IntegerField(default = 0)
    RetirementAge = models.IntegerField(default = 0)
    CurrentIncome = models.IntegerField(default=0)
    RetirementIncome = models.IntegerField(default=0)
    RRSPSavings = models.IntegerField(default=0)
    RRSPContributions = models.IntegerField(default=0)
    TFSASavings = models.IntegerField(default=0)
    TFSAContributions = models.IntegerField(default=0)
    NRSISavings = models.IntegerField(default=0)  # P
    NRSIContributions = models.IntegerField(default=0)
    TFSAFrequency = models.IntegerField(default=0)
    RRSPFrequency=  models.IntegerField(default=0)
    NRSIFrequency=  models.IntegerField(default=0)
    IncomeFrequency= models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username}"

class BudgetResults(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    MortgageRent = models.IntegerField(default=0)
    PropertyTax = models.IntegerField(default=0)
    HomeInsurance = models.IntegerField(default=0)
    Utilities = models.IntegerField(default=0)
    Cable = models.IntegerField(default=0)
    HousingOther = models.IntegerField(default=0)
    VehiclePayment = models.IntegerField(default=0)
    VehicleInsurance = models.IntegerField(default=0)
    Gasoline = models.IntegerField(default=0)
    ParkingFees = models.IntegerField(default=0)
    Groceries = models.IntegerField(default=0)
    DiningOut = models.IntegerField(default=0)
    FoodOther = models.IntegerField(default=0)
    Entertainment = models.IntegerField(default=0)
    Clothing = models.IntegerField(default=0)
    Fitness = models.IntegerField(default=0)
    Hobbies = models.IntegerField(default=0)
    Pets = models.IntegerField(default=0)
    Subscriptions = models.IntegerField(default=0)
    PersonalOther = models.IntegerField(default=0)
    FamilyInsurance = models.IntegerField(default=0)
    ChildCare = models.IntegerField(default=0)
    ActivtiesLessons = models.IntegerField(default=0)
    FamilyOther = models.IntegerField(default=0)
    HouseMaintenance = models.IntegerField(default=0)
    VehicleMaintenance = models.IntegerField(default=0)
    Travel = models.IntegerField(default=0)
    Gifts = models.IntegerField(default=0)
    MembershipDues = models.IntegerField(default=0)
    AnnualSalary = models.IntegerField(default=0)
    PartnerSalary = models.IntegerField(default=0)
    OtherIncome = models.IntegerField(default=0)
 
    def __str__(self):
        return f"{self.user.username}"
    
    

class EmergencyFundResults(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    Rent = models.IntegerField(default=0)
    Utilities = models.IntegerField(default=0)
    Telecom = models.IntegerField(default=0)
    Insurance = models.IntegerField(default=0)
    Transportation = models.IntegerField(default=0)
    Debt = models.IntegerField(default=0)
    Other = models.IntegerField(default=0)
    Current = models.IntegerField(default=0)
    Recommended = models.IntegerField(default=0)
    Remaining = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} | {self.Recommended} | {self.Remaining}"
