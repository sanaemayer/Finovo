"""Tools Tests

This script contains definitions for unittests related to the Tools application.

It currently contains the following tests:
    ToolTestCase
"""

from django.test import TestCase

from django.contrib.auth.models import User
from .models import LifeInsuranceResults, BudgetResults, RetirementResults, EmergencyFundResults

# TODO: More tests for each tool results

class ToolTestCase(TestCase):
    def setUp(self):
        user_one = User.objects.create(username="tester", first_name= "tester", last_name= "account", email= "tester@test.ca", password= "password123")
        user_two = User.objects.create(username="Daven", first_name="Dave", last_name="Smith",
                                       email="daven@test.ca", password="daven345827")

        LifeInsuranceResults.objects.create(user = user_one,A=100,B=100,C=100,F=100,H=100)
        LifeInsuranceResults.objects.create(user = user_two,A=10,B=10,C=10,F=10,H=10)

        BudgetResults.objects.create(user = user_one,C=200,D=200,E=200)
        BudgetResults.objects.create(user = user_two,C=20,D=20,E=20)

        RetirementResults.objects.create(user = user_one,J=300,K=300,L=300,M=300,P=300,Q=300,R=300,S=300,T=300,U=300)
        RetirementResults.objects.create(user = user_two,J=30,K=30,L=30,M=30,P=30,Q=30,R=30,S=30,T=30,U=30)

        EmergencyFundResults.objects.create(user = user_one, A = 400, B = 400)
        EmergencyFundResults.objects.create(user = user_two, A = 40, B = 40)


    def test_created_properly(self):
        user_one = User.objects.get(username="tester")
        user_two = User.objects.get(username="Daven")

        life_insurance_one = LifeInsuranceResults.objects.get(user=user_one)
        life_insurance_two = LifeInsuranceResults.objects.get(user=user_two)

        self.assertEqual(life_insurance_one.A + life_insurance_one.B + life_insurance_one.C + life_insurance_one.F + life_insurance_one.H, 500)
        self.assertEqual(life_insurance_two.A + life_insurance_two.B + life_insurance_two.C + life_insurance_two.F + life_insurance_two.H, 50)

        budget_one = BudgetResults.objects.get(user=user_one)
        budget_two = BudgetResults.objects.get(user=user_two)

        self.assertEqual(budget_one.C + budget_one.D + budget_one.E, 600)
        self.assertEqual(budget_two.C + budget_two.D + budget_two.E, 60)

        retirement_one = RetirementResults.objects.get(user=user_one)
        retirement_two = RetirementResults.objects.get(user=user_two)

        self.assertEqual(retirement_one.J + retirement_one.K + retirement_one.L + retirement_one.M 
        + retirement_one.P + retirement_one.Q + retirement_one.R + retirement_one.S + retirement_one.T + retirement_one.U, 3000)
        self.assertEqual(retirement_two.J + retirement_two.K + retirement_two.L + retirement_two.M 
        + retirement_two.P + retirement_two.Q + retirement_two.R + retirement_two.S + retirement_two.T + retirement_two.U, 300)

        emergency_one = EmergencyFundResults.objects.get(user=user_one)
        emergency_two = EmergencyFundResults.objects.get(user=user_two)

        self.assertEqual(emergency_one.A + emergency_one.B, 800)
        self.assertEqual(emergency_two.A + emergency_two.B, 80)
