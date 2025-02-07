"""Users Tests

This script contains definitions for unittests related to the Users application.

It currently contains the following tests:
    UserTestCase
"""

from .models import ClientEmployeeInfo, UserMindset, UserPersonal, UserAccounts, UserAssets, UserDebt, UserIncome, \
    UserInsurance
from django.test import TestCase
from . import views
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory, force_authenticate


# TODO: More tests for each model


# ClientEmployeeInfo-model Tests
def create_CEI(first_name, last_name, email, company, account_type='ONE', related_user=None, preferred_name=None, login_count=0):
    """
    Creates a ClientEmployeeInfo object with the following parameters.

    Parameters
    ------------
    first_name : str
        The user's first name.
    last_name : str
        The user's last name.
    email : str
        The provided email for the user, The user can only register using this email.
    company : str
        The client company the user is from.
    account_type : str
        The user's account type. A flag used to determine the user's level of access to one-on-one coaching.
    related_user : User
        The user this data is related to. The User object will not exist before the ClientEmployeeInfo object.
    preferred_name : str
        A nickname the user can set after registration. If set, it will be displayed instead of the user's first + last
        name to make things a little more personalized.
    login_count : int
        The number of times the user has logged in
    """
    return ClientEmployeeInfo.objects.create(first_name=first_name, last_name=last_name, email=email, company=company,
                                             account_type=account_type, user=related_user,
                                             preferred_name=preferred_name, login_count=login_count)


class ClientEmployeeInfoTestCase(TestCase):
    """
    Contains tests for the ClientEmployeeInfo model.
    """

    def setUp(self):
        # Setup user and factory
        self.test_user = User.objects.create(username="jdoe@company1.ca", first_name="John",
                                             last_name="Doe", email="jdoe@company1.ca", password="password123")
        self.factory = APIRequestFactory()

    # Model Tests
    def test_proper_creation_initial(self):
        """
        Tests if ClientEmployeeInfo objects are created with the correct first and last names, email, company, and
        account type.
        """
        initial_object = create_CEI("John", "Doe", "jdoe@company1.ca", "Company1", "ONE")

        self.assertEqual(initial_object.first_name, "John")
        self.assertEqual(initial_object.last_name, "Doe")
        self.assertEqual(initial_object.email, "jdoe@company1.ca")
        self.assertEqual(initial_object.company, "Company1")
        self.assertEqual(initial_object.account_type, "ONE")

    def test_proper_update_object(self):
        """
        Tests if ClientEmployeeInfo objects are properly updated.
        """
        initial_object = create_CEI("John", "Doe", "jdoe@company1.ca", "Company1", "ONE")

        self.assertEqual(initial_object.first_name, "John")
        self.assertEqual(initial_object.last_name, "Doe")
        self.assertEqual(initial_object.email, "jdoe@company1.ca")
        self.assertEqual(initial_object.company, "Company1")
        self.assertEqual(initial_object.account_type, "ONE")

        initial_object.user = self.test_user
        initial_object.account_type = "THREE"
        initial_object.preferred_name = "Johnny"

        self.assertEqual(initial_object.user.username, self.test_user.username)
        self.assertEqual(initial_object.account_type, "THREE")
        self.assertEqual(initial_object.preferred_name, "Johnny")

    # Test API Endpoints
    def test_list_empty(self):
        """
        Tests the getAllClientEmployeeInfo API method.
        """
        request = self.factory.get('api/users/CEI-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllClientEmployeeInfo
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [])  # Check for empty list

    def test_get_single_empty(self):
        """
        Tests the checkForClientEmployeeInfo API method.
        """
        request = self.factory.get('api/users/CEI-get/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        view = views.checkForClientEmployeeInfo
        response = view(request, self.test_user.email)

        self.assertEqual(response.status_code, 404)  # Check for NOT_FOUND status code
        self.assertEqual(response.data, f"ClientEmployeeInfo object with email={self.test_user.email} does not exist.")

    def test_create_CEI(self):
        """
        Tests the createClientEmployeeInfoEntry API method.
        """
        request = self.factory.post('api/users/CEI-create/', {"first_name": "John", "last_name": "Doe",
                                                              "email": "jdoe@company1.ca", "company": "Company1",
                                                              "account_type": "TWO"}, format="json")
        force_authenticate(request, user=self.test_user)
        view = views.createClientEmployeeInfoEntry
        response = view(request)

        self.assertEqual(response.status_code, 201)  # Check for CREATED status code
        self.assertEqual(response.data, {"first_name": "John", "last_name": "Doe",
                                         "email": "jdoe@company1.ca", "company": "Company1",
                                         "account_type": "TWO", "user": None, "preferred_name": None,
                                         "login_count": 0})

        request = self.factory.get('api/users/CEI-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllClientEmployeeInfo
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [{"first_name": "John", "last_name": "Doe",
                                          "email": "jdoe@company1.ca", "company": "Company1",
                                          "account_type": "TWO", "user": None, "preferred_name": None,
                                          "login_count": 0}])

    def test_company_create_CEI(self):
        """
        Tests the createMultipleClientEmployeeInfo API Method.
        """
        request = self.factory.post('api/users/CEI-company-create/',
                                    [{"first_name": "John", "last_name": "Doe", "email": "jdoe@company1.ca",
                                      "company": "Company1", "account_type": "TWO"},
                                     {"first_name": "Kevin", "last_name": "Addus", "email": "kaddus@company1.ca",
                                      "company": "Company1", "account_type": "TWO"},
                                     {"first_name": "Sella", "last_name": "Smith", "email": "ssmith@company1.ca",
                                      "company": "Company1", "account_type": "TWO"}], format="json")
        force_authenticate(request, user=self.test_user)
        view = views.createMultipleClientEmployeeInfo
        response = view(request)

        self.assertEqual(response.status_code, 201)  # Check for CREATED status code
        self.assertEqual(response.data, [{"first_name": "John", "last_name": "Doe", "email": "jdoe@company1.ca",
                                          "company": "Company1", "account_type": "TWO", "user": None,
                                          "preferred_name": None, "login_count": 0},
                                         {"first_name": "Kevin", "last_name": "Addus", "email": "kaddus@company1.ca",
                                          "company": "Company1", "account_type": "TWO", "user": None,
                                          "preferred_name": None, "login_count": 0},
                                         {"first_name": "Sella", "last_name": "Smith", "email": "ssmith@company1.ca",
                                          "company": "Company1", "account_type": "TWO", "user": None,
                                          "preferred_name": None, "login_count": 0}])

        request = self.factory.get('api/users/CEI-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllClientEmployeeInfo
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [{"first_name": "John", "last_name": "Doe", "email": "jdoe@company1.ca",
                                          "company": "Company1", "account_type": "TWO", "user": None,
                                          "preferred_name": None, "login_count": 0},
                                         {"first_name": "Kevin", "last_name": "Addus", "email": "kaddus@company1.ca",
                                          "company": "Company1", "account_type": "TWO", "user": None,
                                          "preferred_name": None, "login_count": 0},
                                         {"first_name": "Sella", "last_name": "Smith", "email": "ssmith@company1.ca",
                                          "company": "Company1", "account_type": "TWO", "user": None,
                                          "preferred_name": None, "login_count": 0}])

    def test_update_CEI(self):
        """
        Tests the updateClientEmployeeInfo API method.
        """
        create_CEI("John", "Doe", "jdoe@company1.ca", "Company1", "ONE")

        request = self.factory.post('api/users/CEI-update/',
                                    {"first_name": "John", "last_name": "Doe", "email": "jdoe@company1.ca",
                                     "company": "Company1", "account_type": "TWO", "user": self.test_user.id,
                                     "preferred_name": "Johnny"})
        force_authenticate(request, user=self.test_user)
        response = views.updateClientEmployeeInfo(request, self.test_user.email)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {"first_name": "John", "last_name": "Doe", "email": "jdoe@company1.ca",
                                         "company": "Company1", "account_type": "TWO", "user": self.test_user.id,
                                         "preferred_name": "Johnny", "login_count": 0})

    def test_delete_CEI(self):
        """
        Tests the deleteClientEmployeeInfo API method
        """
        create_CEI("John", "Doe", "jdoe@company1.ca", "Company1", "ONE")

        request = self.factory.delete('/api/users/CEI-delete/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        response = views.deleteClientEmployeeInfo(request, self.test_user.email)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, f"The ClientEmployeeInfo associated with {self.test_user.email} "
                                        f"has been successfully deleted.")  # Custom response message from view

        request = self.factory.get('api/users/CEI-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllClientEmployeeInfo
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [])  # Check for empty list

    def test_delete_CEI_company(self):
        """
        Tests the deleteAllEmployeeInfoFromCompany API method.
        """
        test_company = "Company1"
        create_CEI("John", "Doe", "jdoe@company1.ca", test_company, "ONE")
        create_CEI("Kevin", "Addus", "kaddus@company1.ca", test_company, "ONE")
        create_CEI("Sella", "Smith", "ssmith@company1.ca", test_company, "ONE")

        request = self.factory.delete('/api/users/CEI-delete/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        response = views.deleteAllEmployeeInfoFromCompany(request, test_company)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, f"All of the ClientEmployeeInfo for employees from {test_company} have "
                                        f"been successfully deleted.")  # Custom response message from view

        request = self.factory.get('api/users/CEI-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllClientEmployeeInfo
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [])  # Check for empty list


# User and User-data related Tests
class UserTestCase(TestCase):
    def setUp(self):
        # Setup user and factory
        self.test_user = User.objects.create(username="jdoe@company1.ca", first_name="John",
                                             last_name="Doe", email="jdoe@company1.ca", password="password123")
        self.test_CEI = ClientEmployeeInfo.objects.create(user=self.test_user, first_name="John", last_name="Doe",
                                                          email="jdoe@company1.ca", company="Company1", account_type="ONE",
                                                          preferred_name="Johnny")
        self.factory = APIRequestFactory()

        # Setup other objects for model tests.
        user_one = User.objects.create(username="tester@test.ca", first_name="tester",
                                       last_name="account", email="tester@test.ca", password="password123")
        ClientEmployeeInfo.objects.create(user=user_one, first_name="tester", last_name="account",
                                          email="tester@test.ca", company="testCompany", account_type="ONE")

        UserMindset.objects.create(user=user_one, stress="Edmonton",
                                   feeling="Alberta", risk_tol=True, willingness="Single")

        UserPersonal.objects.create(user=user_one, city="Edmonton", province="Alberta",
                                    fin_goal=True, marital_status="Single", budget=True,
                                    finance_check=True, updated_will=False,
                                    credit_score=True, automated_savings=True, automated_bills=True,
                                    household_inventory=False, financial_holdings_inventory=False,
                                    review_beneficiaries=True, old_paperwork=False, organized_documents=True,
                                    personal_directive=True, power_attorney=True, credit_report=True,
                                    overwhelmed=True, pass_manager=True)

        UserAccounts.objects.create(
            user=user_one, type='Chequing', value=1000.00)

        UserAssets.objects.create(user=user_one, type="CAR", value=1000.00)

        UserDebt.objects.create(
            user=user_one, type="Fixed Mortgage", amount=1000.00, interest=0.25, monthly_payment=200.00)

        UserIncome.objects.create(
            user=user_one, value=100000.00)

        UserInsurance.objects.create(
            user=user_one, type="Life Insurance", benefit=1000.00, premium=100.00)

    # Model Tests
    def test_user_created_properly(self):
        self.assertEqual(self.test_user.email, "jdoe@company1.ca")
        self.assertEqual(self.test_user.first_name, "John")

    def test_user_personal(self):
        # Check if the personal data object exists
        self.assertNotEqual(UserPersonal.objects.all()[0], None)

        personal_data = UserPersonal.objects.all()
        # Check if data is properly set
        self.assertEqual(personal_data[0].fin_goal, "True")

    def test_user_mindset(self):
        # Check if the personal data object exists
        self.assertNotEqual(UserPersonal.objects.all()[0], None)

        personal_data = UserPersonal.objects.all()
        # Check if data is properly set
        self.assertEqual(personal_data[0].fin_goal, "True")

    def test_user_accounts(self):
        user = User.objects.get(username="tester@test.ca")

        user_account = UserAccounts.objects.get(user=user)
        self.assertEqual(user_account.type, "Chequing")
        self.assertEqual(user_account.value, 1000.00)

    def test_user_assets(self):
        user = User.objects.get(username="tester@test.ca")

        user_asset = UserAssets.objects.get(user=user)
        self.assertEqual(user_asset.type, "CAR")
        self.assertEqual(user_asset.value, 1000.00)

    def test_user_debt(self):
        user = User.objects.get(username="tester@test.ca")

        user_debt = UserDebt.objects.get(user=user)
        self.assertEqual(user_debt.type, "Fixed Mortgage")
        self.assertEqual(user_debt.amount, 1000.00)
        self.assertEqual(user_debt.interest, 0.25)
        self.assertEqual(user_debt.monthly_payment, 200.00)

    def test_user_income(self):
        user = User.objects.get(username="tester@test.ca")

        user_income = UserIncome.objects.get(user=user)
        self.assertEqual(user_income.value, 100000.00)

    def test_user_insurances(self):
        user = User.objects.get(username="tester@test.ca")

        user_insurance = UserInsurance.objects.get(user=user)
        self.assertEqual(user_insurance.type, "Life Insurance")
        self.assertEqual(user_insurance.benefit, 1000.00)
        self.assertEqual(user_insurance.premium, 100.00)

    # API Endpoint Tests
    def test_list_users(self):
        """
        Tests the getAllUsers API method.
        """
        request = self.factory.get('api/users/user-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllUsers
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertNotEqual(response.data, [])  # Check for empty list

    def test_list_single_user(self):
        """
        Tests the getUserData API method.
        """
        request = self.factory.get('api/users/user-get/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        view = views.getUserData
        response = view(request, self.test_user.email)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertNotEqual(response.data, f'User object with email={self.test_user.email} does not exist.')

    def test_delete_single_user(self):
        """
        Tests the deleteUserData API method
        """
        request = self.factory.delete('api/users/user-delete/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        response = views.deleteUserData(request, self.test_user.email)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data,
                         f'User with email {self.test_user.email} successfully deleted.')  # Custom response message from view

    def test_get_user_personal_empty(self):
        """
        Tests the getUserData API method when there is no UserPersonal object.
        """
        request = self.factory.get('api/users/pers-get/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        view = views.getUserPersonalData
        response = view(request, self.test_user.email)

        self.assertEqual(response.status_code, 404)  # Check for NOT_FOUND status code
        self.assertEqual(response.data, f"Personal data for user with username={self.test_user.email} does not exist.")

    def test_get_user_accounts_empty(self):
        """
        Tests the getUserAccountsData API method when there are no UserAccounts objects.
        """
        request = self.factory.get('api/users/acc-get/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        view = views.getUserAccountsData
        response = view(request, self.test_user.email)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [])

    def test_get_user_assets_empty(self):
        """
        Tests the getUserAssetsData API method when there are no UserAssets objects.
        """
        request = self.factory.get('api/users/assets-get/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        view = views.getUserAssetsData
        response = view(request, self.test_user.email)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [])

    def test_get_user_debt_empty(self):
        """
        Tests the getUserDebtData API method when there are no UserDebt objects.
        """
        request = self.factory.get('api/users/assets-get/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        view = views.getUserDebtData
        response = view(request, self.test_user.email)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [])

    def test_get_user_income_empty(self):
        """
        Tests the getUserIncomeData API method when there is no UserIncome object.
        """
        request = self.factory.get('api/users/income-get/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        view = views.getUserIncomeData
        response = view(request, self.test_user.email)

        self.assertEqual(response.status_code, 404)  # Check for NOT_FOUND status code
        self.assertEqual(response.data, f"Income data for user with username={self.test_user.email} does not exist.")

    def test_get_user_insurance_empty(self):
        """
        Tests the getUserInsuranceData API method when there are no UserInsurance objects.
        """
        request = self.factory.get('api/users/ins-get/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        view = views.getUserInsuranceData
        response = view(request, self.test_user.email)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [])

    def test_get_user_mindset_all_empty(self):
        """
        Tests the getAllUserMindsetData API method when there are no UserMindset objects.
        """
        request = self.factory.get('api/users/mind-list/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllUserMindsetData
        response = view(request, self.test_user.email)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [])

    def test_get_user_mindset_latest_empty(self):
        """
        Tests the getLatestUserMindsetData API method when there are no UserMindset objects.
        """
        request = self.factory.get('api/users/mind-get/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        view = views.getLatestUserMindsetData
        response = view(request, self.test_user.email)

        self.assertEqual(response.status_code, 404)  # Check for NOT_FOUND status code
        self.assertEqual(response.data, f"Mindset data for user with username={self.test_user.email} does not exist.")
