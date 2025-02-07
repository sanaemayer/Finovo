from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.serializers import *
from django.utils import timezone
from django.db import models


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Blog Section': '/blog/',
        'Recommendations Section': '/recs/',
        'Users Section': '/users/',
        'Tools Section': '/tools/',
        'Access Token': '/token/',
        'Refresh Token': '/token/refresh/',
        'Get Admin Dashboard Data': '/dash-data/',
        'Get All Report': '/report-all/',
        'Get Company Report': '/report-company/<str:pk>/',
        'Get User Report': '/report-user/<str:pk>/'
    }
    return Response(api_urls, status=status.HTTP_200_OK)


@api_view(['GET'])
def getAdminDashboardData(request):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    Returns
    -------
        Returns a report with rows for each client company registered in the database.

    Examples
    --------
        "GET /api/report-all/ HTTP/1.1"

        axiosInstance.get('~/api/report-all/')
    """

    # Generate list of Companies
    companies_query = ClientEmployeeInfo.objects.values_list('company').distinct()
    number_of_companies = len(companies_query)

    # Get number of users
    users_queryset = User.objects.exclude(is_staff=True)
    number_of_users = len(users_queryset)

    # Get number of users active in last 30 days
    users_queryset = User.objects.filter(last_login__gte=(timezone.now() - timezone.timedelta(30))).exclude(is_staff=True)
    number_of_active_users = len(users_queryset)

    # Get number of Users who have logged in at least twice.
    users_queryset = User.objects.filter(info__login_count__gte=2).exclude(is_staff=True)
    number_of_multiple = len(users_queryset)

    users_queryset = User.objects.exclude(is_staff=True)
    number_of_never_stressed = 0
    number_of_rarely_stressed = 0
    number_of_once_month_stressed = 0
    number_of_couple_month_stressed = 0
    number_of_once_week_stressed = 0
    number_of_couple_week_stressed = 0
    number_of_daily_stressed = 0
    number_of_constantly_stressed = 0

    for user in users_queryset:
        try:
            latest_mindset = user.mindset.latest("date_created")
        except models.ObjectDoesNotExist:
            continue
        else:
            if latest_mindset.stress == 'NE':
                number_of_never_stressed += 1
            elif latest_mindset.stress == 'RA':
                number_of_rarely_stressed += 1
            elif latest_mindset.stress == 'OM':
                number_of_once_month_stressed += 1
            elif latest_mindset.stress == 'CM':
                number_of_couple_month_stressed += 1
            elif latest_mindset.stress == 'OW':
                number_of_once_week_stressed += 1
            elif latest_mindset.stress == 'CW':
                number_of_couple_week_stressed += 1
            elif latest_mindset.stress == 'DA':
                number_of_daily_stressed += 1
            elif latest_mindset.stress == 'CO':
                number_of_constantly_stressed += 1

    # Put all of the data together into a dictionary
    data = {'NUMBER OF COMPANIES': number_of_companies,
            'NUMBER OF REGISTERED USERS': number_of_users,
            'NUMBER OF USERS ACTIVE IN LAST 30 DAYS': number_of_active_users,
            'NUMBER OF USERS THAT LOGGED IN AT LEAST TWICE': number_of_multiple,
            'NUMBER OF USERS WHO SELECTED NEVER STRESSED': number_of_never_stressed,
            'NUMBER OF USERS WHO SELECTED RARELY STRESSED': number_of_rarely_stressed,
            'NUMBER OF USERS WHO SELECTED STRESSED ONCE A MONTH': number_of_once_month_stressed,
            'NUMBER OF USERS WHO SELECTED STRESSED A COUPLE TIMES A MONTH': number_of_couple_month_stressed,
            'NUMBER OF USERS WHO SELECTED STRESSED ONCE A WEEK': number_of_once_week_stressed,
            'NUMBER OF USERS WHO SELECTED STRESSED A COUPLE TIMES A WEEK': number_of_couple_week_stressed,
            'NUMBER OF USERS WHO SELECTED STRESSED DAILY': number_of_daily_stressed,
            'NUMBER OF USERS WHO SELECTED STRESSED CONSTANTLY': number_of_constantly_stressed
            }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getAllReport(request):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    Returns
    -------
        Returns a report with rows for each client company registered in the database.

    Examples
    --------
        "GET /api/report-all/ HTTP/1.1"

        axiosInstance.get('~/api/report-all/')
    """

    # Generate list of Companies
    companies_query = ClientEmployeeInfo.objects.values_list('company').distinct()
    companies = []
    for company in companies_query:
        companies.append(company[0])

    # Get number of users per company
    users_in_system = []
    for company in companies:
        users_queryset = User.objects.filter(info__company=company)
        users_in_system.append(len(users_queryset))

    # Get number of users active in last 30 days, per company
    active_last_30 = []
    for company in companies:
        users_queryset = User.objects.filter(info__company=company,
                                             last_login__gte=(timezone.now() - timezone.timedelta(30)))
        active_last_30.append(len(users_queryset))

    # Get number of Users who have logged in twice, per company
    logged_twice = []
    for company in companies:
        users_queryset = User.objects.filter(info__company=company, info__login_count=2)
        logged_twice.append(len(users_queryset))

    # Get number of Users who have logged in twice, per company
    logged_more = []
    for company in companies:
        users_queryset = User.objects.filter(info__company=company, info__login_count__gte=3)
        logged_more.append(len(users_queryset))

    never_stressed = []
    for company in companies:
        users_queryset = User.objects.filter(info__company=company)
        counter = 0
        for user in users_queryset:
            try:
                latest_mindset = user.mindset.latest("date_created")
            except models.ObjectDoesNotExist:
                continue
            else:
                if latest_mindset.stress == 'NE':
                    counter += 1
        never_stressed.append(counter)

    rarely_stressed = []
    for company in companies:
        users_queryset = User.objects.filter(info__company=company)
        counter = 0
        for user in users_queryset:
            try:
                latest_mindset = user.mindset.latest("date_created")
            except models.ObjectDoesNotExist:
                continue
            else:
                if latest_mindset.stress == 'RA':
                    counter += 1
        rarely_stressed.append(counter)

    once_month_stressed = []
    for company in companies:
        users_queryset = User.objects.filter(info__company=company)
        counter = 0
        for user in users_queryset:
            try:
                latest_mindset = user.mindset.latest("date_created")
            except models.ObjectDoesNotExist:
                continue
            else:
                if latest_mindset.stress == 'OM':
                    counter += 1
        once_month_stressed.append(counter)

    couple_month_stressed = []
    for company in companies:
        users_queryset = User.objects.filter(info__company=company)
        counter = 0
        for user in users_queryset:
            try:
                latest_mindset = user.mindset.latest("date_created")
            except models.ObjectDoesNotExist:
                continue
            else:
                if latest_mindset.stress == 'CM':
                    counter += 1
        couple_month_stressed.append(counter)

    once_week_stressed = []
    for company in companies:
        users_queryset = User.objects.filter(info__company=company)
        counter = 0
        for user in users_queryset:
            try:
                latest_mindset = user.mindset.latest("date_created")
            except models.ObjectDoesNotExist:
                continue
            else:
                if latest_mindset.stress == 'OW':
                    counter += 1
        once_week_stressed.append(counter)

    couple_week_stressed = []
    for company in companies:
        users_queryset = User.objects.filter(info__company=company)
        counter = 0
        for user in users_queryset:
            try:
                latest_mindset = user.mindset.latest("date_created")
            except models.ObjectDoesNotExist:
                continue
            else:
                if latest_mindset.stress == 'CW':
                    counter += 1
        couple_week_stressed.append(counter)

    daily_stressed = []
    for company in companies:
        users_queryset = User.objects.filter(info__company=company)
        counter = 0
        for user in users_queryset:
            try:
                latest_mindset = user.mindset.latest("date_created")
            except models.ObjectDoesNotExist:
                continue
            else:
                if latest_mindset.stress == 'DA':
                    counter += 1
        daily_stressed.append(counter)

    constantly_stressed = []
    for company in companies:
        users_queryset = User.objects.filter(info__company=company)
        counter = 0
        for user in users_queryset:
            try:
                latest_mindset = user.mindset.latest("date_created")
            except models.ObjectDoesNotExist:
                continue
            else:
                if latest_mindset.stress == 'CO':
                    counter += 1
        constantly_stressed.append(counter)

    # Put all of the data together into json
    data = []
    for i in range(len(companies)):
        data.append({'COMPANY GROUP': companies[i],
                     'NUMBER OF REGISTERED USERS': users_in_system[i],
                     'NUMBER OF USERS ACTIVE IN LAST 30 DAYS': active_last_30[i],
                     'NUMBER OF USERS THAT LOGGED IN TWICE': logged_twice[i],
                     'NUMBER OF USERS THAT LOGGED IN 3+': logged_more[i],
                     'NUMBER OF USERS WHO SELECTED NEVER STRESSED': never_stressed[i],
                     'NUMBER OF USERS WHO SELECTED RARELY STRESSED': rarely_stressed[i],
                     'NUMBER OF USERS WHO SELECTED STRESSED ONCE A MONTH': once_month_stressed[i],
                     'NUMBER OF USERS WHO SELECTED STRESSED A COUPLE TIMES A MONTH': couple_month_stressed[i],
                     'NUMBER OF USERS WHO SELECTED STRESSED ONCE A WEEK': once_week_stressed[i],
                     'NUMBER OF USERS WHO SELECTED STRESSED A COUPLE TIMES A WEEK': couple_week_stressed[i],
                     'NUMBER OF USERS WHO SELECTED STRESSED DAILY': daily_stressed[i],
                     'NUMBER OF USERS WHO SELECTED STRESSED CONSTANTLY': constantly_stressed[i]
                     })
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getCompanyReport(request, pk):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The company that the report is based on.
    Returns
    -------
        Returns a report with rows for each user from the company registered in the database.

    Examples
    --------
        "GET /api/report-company/company-name/ HTTP/1.1"

        axiosInstance.get('~/api/report-company/company-name/')
    """
    # Get list of companies in db
    companies_query = ClientEmployeeInfo.objects.values_list('company').distinct()
    companies = []
    for company in companies_query:
        companies.append(company[0])

    if pk in companies:
        users_queryset = User.objects.filter(info__company=pk)
        data = []
        for user in users_queryset:
            legal_name = user.info.first_name + " " + user.info.last_name
            active = "NO"
            if user.last_login is not None:
                if user.last_login >= (timezone.now() - timezone.timedelta(30)):
                    active = "YES"

            data.append({'NAME': legal_name,
                         'EMAIL ADDRESS': user.email,
                         'COMPANY': user.info.company,
                         'ACCOUNT TYPE': user.info.account_type,
                         'ACTIVE IN LAST 30 DAYS': active,
                         })
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response("Company does not exist", status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def getUserReport(request, pk):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The user that the report is based on.
    Returns
    -------
        Returns a report with data related to the user registered in the database.

    Examples
    --------
        "GET /api/report-user/user-email/ HTTP/1.1"

        axiosInstance.get('~/api/report-user/user-email/')
    """
    try:
        user = User.objects.get(email=pk)
    except models.ObjectDoesNotExist:
        return Response("User does not exist", status=status.HTTP_404_NOT_FOUND)
    else:
        user_personal_serializer = UserPersonalSerializer(user.personal)
        user_mindset_serializer = UserMindsetSerializer(user.mindset, many=True)
        user_accounts_serializer = UserAccountsSerializer(user.accounts, many=True)
        user_assets_serializer = UserAssetsSerializer(user.assets, many=True)
        user_debt_serializer = UserDebtSerializer(user.debt, many=True)
        user_income_serializer = UserIncomeSerializer(user.income, many=True)
        user_insurance_serializer = UserInsuranceSerializer(user.insurance, many=True)

    data = {'FIRST NAME': user.info.first_name,
            'LAST NAME': user.info.last_name,
            'PREFERRED NAME': user.info.preferred_name,
            'EMAIL': user.email,
            'COMPANY': user.info.company,
            'ACCOUNT TYPE': user.info.account_type,
            'LOGIN COUNT': user.info.login_count,
            'LAST LOGGED IN': user.last_login,
            'PERSONAL & MISC SECTIONS ANSWERS': user_personal_serializer.data,
            'MINDSET SECTION ANSWERS': user_mindset_serializer.data,
            'ACCOUNTS SECTION ANSWERS': user_accounts_serializer.data,
            'ASSETS SECTION ANSWERS': user_assets_serializer.data,
            'DEBT SECTION ANSWERS': user_debt_serializer.data,
            'INCOME SECTION ANSWER': user_income_serializer.data,
            'INSURANCE SECTION ANSWERS': user_insurance_serializer.data,
            }
    return Response(data, status=status.HTTP_200_OK)
