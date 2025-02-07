"""Tools Serializers

This script contains definitions for serializers related to the Tools application.

It currently contains the following serializers:
    LifeInsuranceSerializer
    RetirementSerializer
    BudgetSerializer
    EmergencyFundSerializer
"""

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from . import models

class LifeInsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LifeInsuranceResults
        fields = ('Finalexp', 'Mortgage', 'Debt', 'Emerg', 'Kids', 'Education', 'Hier', 'Years', 'Insurance', 'Result', 'user')

class RetirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RetirementResults
        fields = ('Age', 'RetirementAge', 'CurrentIncome','IncomeFrequency', 'RetirementIncome', 'RRSPSavings', 'RRSPContributions', 'TFSASavings', 'TFSAContributions', 'TFSAFrequency', 'NRSISavings', 'NRSIFrequency', 'NRSIContributions', 'user')

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BudgetResults
        fields = ('MortgageRent', 'PropertyTax', 'HomeInsurance', 'Utilities', 'Cable', 'HousingOther', 'VehiclePayment', 'VehicleInsurance', 'Gasoline', 'ParkingFees', 'Groceries', 'DiningOut', 'FoodOther', 'Entertainment', 'Clothing', 'Fitness', 'Hobbies', 'Pets', 'Subscriptions', 'PersonalOther', 'FamilyInsurance', 'ChildCare', 'ActivtiesLessons', 'FamilyOther', 'HouseMaintenance', 'VehicleMaintenance', 'Travel', 'Gifts', 'MembershipDues', 'AnnualSalary', 'PartnerSalary', 'OtherIncome', 'user')

class EmergencyFundSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EmergencyFundResults
        fields = ('Rent', 'Utilities', 'Telecom', 'Insurance', 'Transportation', 'Debt', 'Other', 'Current', 'Recommended', 'Remaining', 'user')
