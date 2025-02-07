"""User Models

This script contains definitions for models related to the User application.

It currently contains the following models:
    ClientEmployeeInfo
    UserPersonal
    UserAccounts
    UserAssets
    UserDebt
    UserIncome
    UserInsurance
    UserMindset
"""

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone, dateparse


class ClientEmployeeInfo(models.Model):
    """
    An intermediary model used to hold certain bits of user info before a User completes the registration process.
    One-to-One relationship with User.

    Attributes
    ----------
    user : User
        The user this data is related to
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
    preferred_name : str
        A nickname the user can set after registration. If set, it will be displayed instead of the user's first + last
        name to make things a little more personalized.
    login_count : int
        The number of times the user has logged in.
    """

    account_types = [
        ('ONE', 'Level 1'),
        ('TWO', 'Level 2'),
        ('THREE', 'Level 3'),
        ('FOUR', 'Level 4'),
        ('FIVE', 'Level 5'),
    ]

    user = models.OneToOneField(
        User, default=None, null=True, blank=True, on_delete=models.CASCADE, related_name="info")
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.CharField(max_length=200, unique=True)
    company = models.CharField(max_length=200)
    account_type = models.TextField(
        choices=account_types, default=account_types[0])
    preferred_name = models.CharField(
        default=None, null=True, blank=True, max_length=200)
    login_count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.first_name} {self.last_name} from {self.company} | {self.email} | Account Type: {self.account_type}"


class UserPersonal(models.Model):
    """
    A model used to hold data pertaining to the Personal and Misc sections of the questionnaire.
    One-to-One relationship with User.

    Attributes
    ----------
    user : User
        The user this data is related to
    city : str
        The city the user lives in
    province : str
        The province the user lives in
    fin_goal : str
        The user's main financial goal
    marital_status : str
        The user's marital status
    number_of_children : integer
        The number of children the user currently has.
    """

    SINGLE = 'SI'
    MARRIED = 'MA'
    DIVORCED = 'DV'
    WIDOWED = 'WI'
    DOMESTIC = 'DP'

    maritalChoices = [
        (SINGLE, 'Single'),
        (MARRIED, 'Married'),
        (DIVORCED, 'Divorced'),
        (WIDOWED, 'Widowed'),
        (DOMESTIC, 'Domestic Partner'),
    ]

    EMERGENCY = "EF"
    INVEST = "IN"
    RETIREMENT = "RE"
    HOMEOWNERSHIP = "HM"
    DEBTFREE = "DF"
    ORGANIZED = "FO"

    financialGoals = [
        (EMERGENCY, "Build an Emergency Fund"),
        (INVEST, "Start Investing"),
        (RETIREMENT, "Save for Retirement"),
        (HOMEOWNERSHIP, "Buy a House"),
        (DEBTFREE, "Pay off Debt"),
        (ORGANIZED, "Become Financially Organized"),
    ]
    # User that this information is for
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="personal")
    city = models.CharField(
        max_length=200, default=None, null=True, blank=True)
    province = models.CharField(
        max_length=200, default=None, null=True, blank=True)
    fin_goal = models.TextField(
        choices=financialGoals, null=True, blank=True)
    marital_status = models.TextField(
        choices=maritalChoices, null=True, blank=True)
    number_of_children = models.IntegerField(default=0, null=True)
    budget = models.BooleanField(default=None, null=True)
    finance_check = models.BooleanField(default=None, null=True)
    updated_will = models.BooleanField(default=None, null=True)
    credit_score = models.BooleanField(default=None, null=True)
    automated_savings = models.BooleanField(default=None, null=True)
    automated_bills = models.BooleanField(default=None, null=True)
    household_inventory = models.BooleanField(default=None, null=True)
    financial_holdings_inventory = models.BooleanField(default=None, null=True)
    review_beneficiaries = models.BooleanField(default=None, null=True)
    old_paperwork = models.BooleanField(default=None, null=True)
    organized_documents = models.BooleanField(default=None, null=True)
    personal_directive = models.BooleanField(default=None, null=True)
    power_attorney = models.BooleanField(default=None, null=True)
    credit_report = models.BooleanField(default=None, null=True)
    overwhelmed = models.BooleanField(default=None, null=True)
    pass_manager = models.BooleanField(default=None, null=True)

    def __str__(self):
        return f"{self.user} | {self.city} | {self.province}"


class UserAccounts(models.Model):
    """
    A model used to hold data pertaining to the Accounts section of the questionnaire.
    Many-to-One relationship with User.

    Attributes
    ----------
    user : User
        The user that this data is related to
    type : str
        The type of debt
    value : int
        The value of the account
    desc : str
        A short description for the account, if type is other
    """
    CHEQUING = 'CQ'
    SAVINGS = 'SA'
    EMERGENCY = 'EF'
    RRSP = 'RR'
    LIRA = 'LI'
    GRSP = 'GR'
    DCPP = 'DC'  # Defined Contribution Pension Plan
    DBPP = 'DB'  # Defined Benefit Pension Plan
    TFSA = 'TF'
    OTHER = 'OT'

    accountTypes = [
        (CHEQUING, 'Chequing'),
        (SAVINGS, 'Savings'),
        (EMERGENCY, 'Emergency Fund'),
        (RRSP, 'Registered Retirement Savings Plan'),
        (LIRA, 'Locked-In Retirement Account'),
        (GRSP, 'Group Registered Retirement Savings Plan'),
        (DCPP, 'Defined Contribution Pension Plan'),
        (DBPP, 'Defined Benefit Pension Plan'),
        (TFSA, 'Tax Free Savings Account'),
        (OTHER, 'Non-Registered Account'),
    ]

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='accounts')
    type = models.TextField(choices=accountTypes)
    # up to 1 billion, with 2 decimal places
    value = models.IntegerField(default=0)
    # desc only needed if they choose 'other'
    desc = models.TextField(max_length=400, blank=True, null=True)

    def __str__(self):
        return f"{self.user} | {self.type} Account"


class UserAssets(models.Model):
    """
    A model used to hold data pertaining to the Assets section of the questionnaire.
    Many-to-One relationship with User.

    Attributes
    ----------
    user : User
        The user that this data is related to
    type : str
        The type of asset
    value : int
        The value of the asset
    """
    HOUSE = 'H'
    CAR = 'C'
    OTHER = 'O'

    assetType = [
        (HOUSE, 'HOUSE'),
        (CAR, 'CAR'),
        (OTHER, 'OTHER'),
    ]

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='assets')
    type = models.TextField(choices=assetType)
    value = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user} | {self.type}"


class UserDebt(models.Model):
    """A model used to hold data pertaining to the Debt section of the questionnaire.Many-to-One relationship with User.

    Attributes
    ----------
    user : User
        The user that this data is related to
    type : str
        The type of debt
    amount : str
        The amount due
    interest : str
        The amount of interest charged on this debt
    monthly_payment : str
        The monthly payment being made towards this debt
    """
    PERSONAL = 'PE'
    CREDIT = 'CR'
    STUDENT_LOAN = 'SL'
    LINE_OF_CREDIT = 'LC'
    HELOC = 'HE'
    VEHICLE = 'VL'

    debtType = [
        (PERSONAL, 'Personal Loan'),
        (CREDIT, 'Credit Card'),
        (STUDENT_LOAN, 'Student Loan'),
        (LINE_OF_CREDIT, 'Line of Credit'),
        (HELOC, 'Home Equity Line of Credit'),
        (VEHICLE, 'Vehicle Loan'),
    ]

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='debt')
    type = models.TextField(choices=debtType)
    amount = models.IntegerField(default=0)
    interest = models.DecimalField(max_digits=3, decimal_places=2)
    monthly_payment = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user} | {self.type}"


class UserIncome(models.Model):
    """
A model used to hold data pertaining to the Income section of the questionnaire.
Many-to-One relationship with User.

    Attributes
    ----------
    user : User
        The user that this data is related to
    value : int
        The value of the income
    """
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='income')
    value = models.IntegerField(default=0)  # Yearly amount

    def __str__(self):
        return f"{self.user}"


class UserInsurance(models.Model):
    """
    A model used to hold data pertaining to the Insurance section of the questionnaire.
    Many-to-One relationship with User.

    Attributes
    ----------
    user : User
        The user that this data is related to
    type : str
        The type of insurance
    policy_type : str
        If life insurance, the type of policy.
    benefit : int
        The benefit amount for this insurance
    premium : int
        The premium for this insurance
    """
    LIFE = 'LI'
    DISABILITY = 'DI'
    CRITICAL = 'CI'

    insuranceTypes = [
        (LIFE, 'Life Insurance'),
        (DISABILITY, 'Disability Insurance'),
        (CRITICAL, 'Critical Illness Insurance'),
    ]

    WHOLE = 'WL'
    UNIVERSAL = 'UL'
    TERM = 'TL'

    lifeTypes = [
        (WHOLE, 'Whole Life'),
        (UNIVERSAL, 'Universal Life'),
        (TERM, 'Term Life'),
    ]

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='insurance')
    type = models.TextField(choices=insuranceTypes)
    policy_type = models.TextField(choices=lifeTypes, null=True)
    benefit = models.IntegerField(default=0)
    premium = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user} | {self.type}"


class UserMindset(models.Model):
    """
    A model used to hold data pertaining to the Mindset section of the questionnaire.
    Many-to-One relationship with User.

    Each instance of this model is time-stamped, and will be used to gauge effectiveness
    of the platform over time, provided the user continues to update the questionnaire.

    Attributes
    ----------
    user : User
        The user that this data is related to
    stress : str
        How often the user stresses about their financial situation
    feeling : str
        The user's current feeling about their financial situation
    risk_tol : str
        The user's current level of risk tolerance
    willingness : str
        The user's current willingness to make financial changes
    date_created : datetime
        The date that this instance was created
    """

    stress_choices = [
        ('NE', 'Never'),
        ('RA', 'Rarely'),
        ('OM', 'Once a Month'),
        ('CM', 'A couple times a Month'),
        ('OW', 'Once a Week'),
        ('CW', 'A couple times a Week'),
        ('DA', 'Daily'),
        ('CO', 'Constantly'),
    ]

    situation_choices = [
        ('SR', 'Stressed'),
        ('CO', 'Concerned'),
        ('OK', 'Okay'),
        ('GR', 'Great'),
    ]

    risk_tol_choices = [
        ('CO', 'Conservative'),
        ('BA', 'Balanced'),
        ('AG', 'Aggressive'),
        ('NS', 'Not sure'),
    ]

    willingness_choices = [
        ('NA', 'Not at all'),
        ('SW', 'Somewhat Willing'),
        ('AW', 'Actively Willing'),
        ('EW', 'Extremely Willing'),
        ('NS', 'Not sure'),
    ]

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='mindset')
    stress = models.TextField(choices=stress_choices, blank=True, null=True)
    feeling = models.TextField(
        choices=situation_choices, blank=True, null=True)
    risk_tol = models.TextField(
        choices=risk_tol_choices, blank=True, null=True)
    willingness = models.TextField(
        choices=willingness_choices, blank=True, null=True)
    date_created = models.DateTimeField(
        default=timezone.now, blank=True, null=True)

    def __str__(self):
        return f"{self.user} | {self.getDate()}"

    def getDate(self):
        """
        Returns date_created in a more readable format, omitting the exact time the mindset instance was created.
        Format: Year-Month-Day
        """
        normal_date = dateparse.parse_datetime(str(self.date_created))
        return normal_date.date()
