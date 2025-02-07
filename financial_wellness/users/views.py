"""User Views

This script contains the views used for API routes related to the User application.

It currently contains CRUD methods for the following models:
    ClientEmployeeInfo
    UserPersonal
    UserAccounts
    UserAssets
    UserDebt
    UserIncome
    UserInsurance
    UserMindset
"""

from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from django.db import models
from django.utils import timezone

@api_view(['GET'])
def userURLs(request):
    """
    Accepts GET requests. Used for displaying a list of API urls for the users app
    in the browsable API.

    Parameters
    ----------
    request
        The HTTP request calling this API view.
    Returns
    -------
        Returns a list of all API methods related to the User app and their urls.
    """
    user_urls = {
        'Get current User': '/current_user/',
        'Signup a user': '/signup/',
        'Logout a user': '/logout',
        'List All Users': '/user-list/',
        'Get Individual User': '/user-get/<str:pk>/',
        'Update User': '/user-update/<str:pk>/',
        'Delete User': '/user-delete/<str:pk>/',
        'List All ClientEmployeeInfo': '/CEI-list/',
        'Get Individual ClientEmployeeInfo': '/CEI-get/<str:pk>/',
        'Create ClientEmployeeInfo Entry': '/CEI-create/',
        'Create Multiple CEI Entries': '/CEI-company-create/',
        'Update ClientEmployeeInfo Entry': '/CEI-update/<str:pk>/',
        'Delete ClientEmployeeInfo Entry': '/CEI-delete/<str:pk>/',
        'Delete Company CEI Entries': '/CEI-company-delete/<str:pk>/',
        'Get Personal Data': '/pers-get/<str:pk>/',
        'Create Personal Data': '/pers-create/',
        'Update Personal Data': '/pers-update/<str:pk>/',
        'Delete Personal Data': '/pers-delete/<str:pk>/',
        'Get Accounts Data': '/acc-get/<str:pk>/',
        'Create Accounts Data': '/acc-create/',
        'Update Accounts Data': '/acc-update/<str:pk>/<str:key1>/<str:key2>/',
        'Delete Accounts Data': '/acc-delete/<str:pk>/<str:key1>/<str:key2>/',
        'Get Assets Data': '/assets-get/<str:pk>/',
        'Create Assets Data': '/assets-create/',
        'Update Assets Data': '/assets-update/<str:pk>/<str:key1>/<str:key2>/',
        'Delete Assets Data': '/assets-delete/<str:pk>/<str:key1>/<str:key2>/',
        'Get Debt Data': '/debt-get/<str:pk>/',
        'Create Debt Data': '/debt-create/',
        'Update Debt Data': '/debt-update/<str:pk>/<str:key1>/<str:key2>/',
        'Delete Debt Data': '/debt-delete/<str:pk>/<str:key1>/<str:key2>/',
        'Get Income Data': '/income-get/<str:pk>/',
        'Create Income Data': '/income-create/',
        'Update Income Data': '/income-update/<str:pk>/<str:key1>/<str:key2>/',
        'Delete Income Data': '/income-delete/<str:pk>/<str:key1>/<str:key2>/',
        'Get Insurance Data': '/ins-get/<str:pk>/',
        'Create Insurance Data': '/ins-create/',
        'Update Insurance Data': '/ins-update/<str:pk>/<str:key1>/<str:key2>/',
        'Delete Insurance Data': '/ins-delete/<str:pk>/<str:key1>/<str:key2>/',
        'Get Mindset Data': '/mind-get/<str:pk>/',
        'Create Mindset Data': '/mind-create/',
        'Update Mindset Data': '/mind-update/<str:pk>/<str:key1>/',
        'Delete Mindset Data': '/mind-delete/<str:pk>/<str:key1>/',
        'Delete All Mindset Data': '/mind-delete/<str:pk>/',
    }
    return Response(user_urls, status=status.HTTP_200_OK)


@api_view(['GET'])
def current_user(request):
    """
    Accepts GET requests. Serializes the requested user data and returns it back to the frontend.

    Only called if the frontend finds a token for the requesting user. Requires Authenticated User.

    Parameters
    ----------
    request
        The HTTP request calling this API view.
    Returns
    -------
        A response object containing a user object for the current user.
    """
    user = request.user
    user.last_login = timezone.now()  # Update the user's last login value.
    user.save()
    serializer = UserModelSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


class UserSignup(APIView):
    """
    Completes the user registration process and creates a User object.
    """
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                try:
                    clientEmployeeInfo = ClientEmployeeInfo.objects.get(
                        email=serializer.data["email"])
                except models.ObjectDoesNotExist:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    current_user = User.objects.get(
                        username=serializer.data["email"])
                    clientEmployeeInfo.user = current_user
                    clientEmployeeInfo.save()

                    userPersonal = UserPersonal(user=user)
                    userPersonal.save()

                    userIncome = UserIncome(user=user)
                    userIncome.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getAllUsers(request):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    Returns
    -------
        Returns a response containing all of the Users in the database. Returns an empty list if there are no User objects.

    Examples
    --------
        "GET /api/users/user-list/ HTTP/1.1"

        axiosInstance.get('~/api/users/user-list/')
    """
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getUserData(request, pk):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user to get details about.
    Returns
    -------
        Returns a single User object or a DNE error message.

    Examples
    --------
        "GET /api/users/user-get/username/ HTTP/1.1"

        axiosInstance.get('~/api/users/user-get/username/')
    """
    try:
        user = User.objects.get(email=pk)
        if user.is_staff:
            serializer = UserSerializerWithToken(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
    except models.ObjectDoesNotExist:
        return Response(f"User object with email={pk} does not exist.", status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateUserData(request, pk):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : str
        The email of the user to get details about.
    Returns
    -------
        Returns the data pertaining to the updated User object, or errors.

    Examples
    --------
        "POST /api/users/user-update/username/ HTTP/1.1"

        axiosInstance.post('~/api/users/user-update/username/', { data here }, format='json')
    """
    user = User.objects.get(username=pk)
    serializer = UserSerializer(instance=user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteUserData(request, pk):
    """
    Accepts DELETE requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user to be deleted.
    Returns
    -------
        Returns a confirmation message.

    Examples
    --------
        "DELETE /api/users/user-delete/username/ HTTP/1.1"

        axiosInstance.delete('~/api/users/user-delete/username/')
    """
    user = User.objects.get(email=pk)
    user.delete()
    return Response(f'User with email {pk} successfully deleted.', status=status.HTTP_200_OK)


# Email data
@api_view(['GET'])
def checkForClientEmployeeInfo(request, pk):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the ClientEmployeeInfo to get details about.
    Returns
    -------
        Returns the data pertaining to a single ClientEmployeeInfo object, or DNE errors.

    Examples
    --------
        "GET /api/users/CEI-get/email/ HTTP/1.1"

        axiosInstance.get('~/api/users/CEI-get/email/')
    """
    try:
        info = ClientEmployeeInfo.objects.get(email=pk)
    except models.ObjectDoesNotExist:
        return Response(f"ClientEmployeeInfo object with email={pk} does not exist.", status=status.HTTP_404_NOT_FOUND)
    else:
        serializer = ClientEmployeeInfoSerializer(info)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getAllClientEmployeeInfo(request):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    Returns
    -------
        Returns all ClientEmployeeInfo objects in the database.

    Examples
    --------
        "GET /api/users/CEI-list/HTTP/1.1"

        axiosInstance.get('~/api/users/CEI-list/')
    """
    info = ClientEmployeeInfo.objects.order_by('company').exclude(user__is_staff=True)
    serializer = ClientEmployeeInfoSerializer(info, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createClientEmployeeInfoEntry(request):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    Returns
    -------
        Returns the data pertaining to the created ClientEmployeeInfo object, or errors.

    Examples
    --------
        "POST /api/users/CEI-create/ HTTP/1.1"

        axiosInstance.post('~/api/users/CEI-create/', { data here }, format='json')
    """
    serializer = ClientEmployeeInfoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def createMultipleClientEmployeeInfo(request):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    Returns
    -------
        Returns the data pertaining to the created ClientEmployeeInfo objects, or errors.

    Examples
    --------
        "POST /api/users/CEI-company-create/ HTTP/1.1"

        axiosInstance.post('~/api/users/CEI-company-create/', { data here }, format='json')
    """
    serializer = ClientEmployeeInfoSerializer(data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateClientEmployeeInfo(request, pk):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : str
        The email of the ClientEmployeeInfo object.
    Returns
    -------
        Returns the data pertaining to the updated ClientEmployeeInfo objects, or errors.

    Examples
    --------
        "POST /api/users/CEI-update/email/ HTTP/1.1"

        axiosInstance.post('~/api/users/CEI-update/email/', { data here }, format='json')
    """
    info = ClientEmployeeInfo.objects.get(email=pk)
    serializer = ClientEmployeeInfoSerializer(instance=info, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def increaseLogInClientEmployeeInfo(request, pk):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : str
        The email of the ClientEmployeeInfo object.
    Returns
    -------
        Returns the data pertaining to the updated ClientEmployeeInfo objects, or errors.

    Examples
    --------
        "POST /api/users/CEI-update/email/ HTTP/1.1"

        axiosInstance.post('~/api/users/CEI-update/email/', { data here }, format='json')
    """
    info = ClientEmployeeInfo.objects.get(email=pk)
    info.login_count += 1
    info.save()

    serializer = ClientEmployeeInfoSerializer(info)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def deleteClientEmployeeInfo(request, pk):
    """
    Accepts DELETE requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the ClientEmployeeInfo object.
    Returns
    -------
        Returns a confirmation message.

    Examples
    --------
        "DELETE /api/users/CEI-delete/email/ HTTP/1.1"

        axiosInstance.delete('~/api/users/CEI-delete/email/')
    """
    info = ClientEmployeeInfo.objects.get(email=pk)
    info.delete()
    return Response(f"The ClientEmployeeInfo associated with {pk} has been successfully deleted.",
                    status=status.HTTP_200_OK)


@api_view(['DELETE'])
def deleteAllEmployeeInfoFromCompany(request, pk):
    """
    Accepts DELETE requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The company to delete ClientEmployeeInfo objects from.
    Returns
    -------
        Returns a confirmation message.

    Examples
    --------
        "DELETE /api/users/CEI-company-delete/company/ HTTP/1.1"

        axiosInstance.delete('~/api/users/CEI-company-delete/company/')
    """
    info = ClientEmployeeInfo.objects.filter(company=pk)
    info.delete()
    return Response(f"All of the ClientEmployeeInfo for employees from {pk} have been successfully deleted.",
                    status=status.HTTP_200_OK)


# UserPersonal data
@api_view(['GET'])
def getUserPersonalData(request, pk):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserPersonal object.
    Returns
    -------
        Returns the data pertaining to a single UserPersonal object, or DNE errors.

    Examples
    --------
        "GET /api/users/pers-get/email/ HTTP/1.1"

        axiosInstance.get('~/api/users/pers-get/email/')
    """
    user = User.objects.get(username=pk)
    try:
        personal_data = UserPersonal.objects.get(user=user)
    except models.ObjectDoesNotExist:
        return Response(f"Personal data for user with username={pk} does not exist.", status=status.HTTP_404_NOT_FOUND)
    else:
        serializer = UserPersonalSerializer(personal_data)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def updateUserPersonalData(request, pk):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : str
        The email of the user associated with this UserPersonal object.
    Returns
    -------
        Returns the data pertaining to the updated UserPersonal object, or errors.

    Examples
    --------
        "POST /api/users/pers-get/email/ HTTP/1.1"

        axiosInstance.post('~/api/users/pers-get/email/', { data here }, format='json')
    """
    user = User.objects.get(username=pk)
    personal_data = UserPersonal.objects.get(user=user)
    new_data = request.data
    new_data['user'] = user.pk
    serializer = UserPersonalSerializer(instance=personal_data, data=new_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteUserPersonalData(request, pk):
    """
    Accepts DELETE requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserPersonal object.
    Returns
    -------
        Returns a confirmation message.

    Examples
    --------
        "DELETE /api/users/pers-delete/email/ HTTP/1.1"

        axiosInstance.delete('~/api/users/pers-delete/email/')
    """
    user = User.objects.get(username=pk)
    personal_data = UserPersonal.objects.get(user=user)
    personal_data.delete()
    return Response("User's personal data successfully deleted.", status=status.HTTP_200_OK)


# UserAccount data
@api_view(['GET'])
def getUserAccountsData(request, pk):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserAccounts object.
    Returns
    -------
        Returns all UserAccount objects in the database related to the specified user.

    Examples
    --------
        "GET /api/users/acc-get/email/ HTTP/1.1"

        axiosInstance.get('~/api/users/acc-get/email/')
    """
    user = User.objects.get(username=pk)
    try:
        account_data = user.accounts
    except models.ObjectDoesNotExist:
        return Response(f"Account data for user with username={pk} does not exist.", status=status.HTTP_404_NOT_FOUND)
    else:
        serializer = UserAccountsSerializer(account_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createUserAccountsData(request):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    Returns
    -------
        Returns the data pertaining to the created UserAccounts object, or errors.

    Examples
    --------
        "POST /api/users/acc-create/ HTTP/1.1"

        axiosInstance.post('~/api/users/acc-create/', { data here }, format='json')
    """
    serializer = UserAccountsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateUserAccountsData(request, pk):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : str
        The email of the user associated with this UserAccounts object.
    Returns
    -------
        Returns the data pertaining to the updated UserAccounts object, or errors.

    Examples
    --------
        "POST /api/users/acc-update/email/ HTTP/1.1"

        axiosInstance.post('~/api/users/acc-update/email/', { data here }, format='json')
    """
    user = User.objects.get(username=pk)
    account_data = user.accounts.all().filter(user=user)
    account_data.delete()

    newData = request.data
    for data in newData:
        data['user'] = user.pk

    serializer = UserAccountsSerializer(many=True, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteUserAccountsData(request, pk):
    """
    Accepts DELETE requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserAccounts object.
    Returns
    -------
        Returns a confirmation message.

    Examples
    --------
        "DELETE /api/users/acc-delete/email/ HTTP/1.1"

        axiosInstance.delete('~/api/users/acc-delete/email/')
    """
    user = User.objects.get(username=pk)
    account_data = user.accounts.all()
    account_data.delete()
    return Response("User's accounts data successfully deleted.", status=status.HTTP_200_OK)


# UserAssets data
@api_view(['GET'])
def getUserAssetsData(request, pk):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserAssets object.
    Returns
    -------
        Returns all UserAssets objects in the database related to the specified user.

    Examples
    --------
        "GET /api/users/assets-get/email/ HTTP/1.1"

        axiosInstance.get('~/api/users/assets-get/email/')
    """
    user = User.objects.get(username=pk)
    try:
        asset_data = user.assets.all()
    except models.ObjectDoesNotExist:
        return Response(f"Assets data for user with username={pk} does not exist.", status=status.HTTP_404_NOT_FOUND)
    else:
        serializer = UserAssetsSerializer(asset_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createUserAssetsData(request):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    Returns
    -------
        Returns the data pertaining to the created UserAssets object, or errors.

    Examples
    --------
        "POST /api/users/assets-create/email/ HTTP/1.1"

        axiosInstance.post('~/api/users/assets-create/email/', { data here }, format='json')
    """
    serializer = UserAssetsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateUserAssetsData(request, pk):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : str
        The email of the user associated with this UserAssets object.
    Returns
    -------
        Returns the data pertaining to the updated UserAssets object, or errors.

    Examples
    --------
        "POST /api/users/assets-update/email/ HTTP/1.1"

        axiosInstance.post('~/api/users/assets-update/email/', { data here }, format='json')
    """
    user = User.objects.get(username=pk)
    asset_data = user.assets.all().filter(user=user)
    asset_data.delete()

    newData = request.data
    for data in newData:
        data["user"] = user.pk

    serializer = UserAssetsSerializer(many=True, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteUserAssetsData(request, pk):
    """
    Accepts DELETE requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserAssets object.
    Returns
    -------
        Returns a confirmation message.

    Examples
    --------
        "DELETE /api/users/assets-delete/email/ HTTP/1.1"

        axiosInstance.delete('~/api/users/assets-delete/email/')
    """
    user = User.objects.get(email=pk)
    asset_data = user.assets.all()
    asset_data.delete()
    return Response("User's assets data successfully deleted.", status=status.HTTP_200_OK)


# UserDebt data
@api_view(['GET'])
def getUserDebtData(request, pk):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserDebt object.
    Returns
    -------
        Returns all UserDebt objects in the database related to the specified user.

    Examples
    --------
        "GET /api/users/debt-get/email/ HTTP/1.1"

        axiosInstance.get('~/api/users/debt-get/email/')
    """
    user = User.objects.get(username=pk)
    debt_data = user.debt.all()
    serializer = UserDebtSerializer(debt_data, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createUserDebtData(request):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    Returns
    -------
        Returns the data pertaining to the created UserDebt object, or errors.

    Examples
    --------
        "POST /api/users/debt-create/ HTTP/1.1"

        axiosInstance.post('~/api/users/debt-create/', { data here }, format='json')
    """
    serializer = UserDebtSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateUserDebtData(request, pk):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : str
        The email of the user associated with this UserDebt object.
    Returns
    -------
        Returns the data pertaining to the updated UserDebt object, or errors.

    Examples
    --------
        "POST /api/users/debt-update/email/ HTTP/1.1"

        axiosInstance.post('~/api/users/debt-update/email/', { data here }, format='json')
    """
    user = User.objects.get(username=pk)
    debt_data = user.debt.all().filter(user=user)
    debt_data.delete()

    newData = request.data
    for data in newData:
        data["user"] = user.pk

    serializer = UserDebtSerializer(many=True, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteUserDebtData(request, pk):
    """
    Accepts DELETE requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserDebt object.
    Returns
    -------
        Returns a confirmation message.

    Examples
    --------
        "DELETE /api/users/acc-delete/email/ HTTP/1.1"

        axiosInstance.delete('~/api/users/acc-delete/email/')
    """
    user = User.objects.get(username=pk)
    debt_data = user.debt.all()
    debt_data.delete()
    return Response("User's debt data successfully deleted.", status=status.HTTP_200_OK)


# UserIncome data
@api_view(['GET'])
def getUserIncomeData(request, pk):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserIncome object.
    Returns
    -------
        Returns the UserIncome object in the database related to the specified user.

    Examples
    --------
        "GET /api/users/income-get/email/ HTTP/1.1"

        axiosInstance.get('~/api/users/income-get/email/')
    """
    user = User.objects.get(username=pk)
    try:
        income_data = UserIncome.objects.get(user=user)
    except models.ObjectDoesNotExist:
        return Response(f"Income data for user with username={pk} does not exist.", status=status.HTTP_404_NOT_FOUND)
    else:
        serializer = UserIncomeSerializer(income_data)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createUserIncomeData(request):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    Returns
    -------
        Returns the data pertaining to the created UserIncome object, or errors.

    Examples
    --------
        "POST /api/users/income-create/ HTTP/1.1"

        axiosInstance.post('~/api/users/income-create/', { data here }, format='json')
    """
    serializer = UserIncomeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateUserIncomeData(request, pk):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : str
        The email of the user associated with this UserIncome object.
    Returns
    -------
        Returns the data pertaining to the updated UserIncome object, or errors.

    Examples
    --------
        "POST /api/users/income-update/email/ HTTP/1.1"

        axiosInstance.post('~/api/users/income-update/email/', { data here }, format='json')
    """
    user = User.objects.get(username=pk)
    income_data = UserIncome.objects.get(user=user)
    new_data = request.data
    new_data['user'] = user.pk

    serializer = UserIncomeSerializer(instance=income_data, data=new_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteUserIncomeData(request, pk):
    """
    Accepts DELETE requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserIncome object.
    Returns
    -------
        Returns a confirmation message.

    Examples
    --------
        "DELETE /api/users/income-delete/email/ HTTP/1.1"

        axiosInstance.delete('~/api/users/income-delete/email/')
    """
    user = User.objects.get(username=pk)
    income_data = user.income.all()
    income_data.delete()
    return Response("User's income data successfully deleted.", status=status.HTTP_200_OK)


# UserInsurance data
@api_view(['GET'])
def getUserInsuranceData(request, pk):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserInsurance object.
    Returns
    -------
        Returns all UserInsurance objects in the database related to the specified user.

    Examples
    --------
        "GET /api/users/ins-get/email/ HTTP/1.1"

        axiosInstance.get('~/api/users/ins-get/email/')
    """
    user = User.objects.get(username=pk)
    insurance_data = user.insurance.all()
    serializer = UserInsuranceSerializer(insurance_data, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createUserInsuranceData(request):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    Returns
    -------
        Returns the data pertaining to the created UserInsurance object, or errors.

    Examples
    --------
        "POST /api/users/ins-create/ HTTP/1.1"

        axiosInstance.post('~/api/users/ins-create/', { data here }, format='json')
    """
    serializer = UserInsuranceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateUserInsuranceData(request, pk):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : str
        The email of the user associated with this Insurance object.
    Returns
    -------
        Returns the data pertaining to the updated Insurance object, or errors.

    Examples
    --------
        "POST /api/users/ins-update/email/ HTTP/1.1"

        axiosInstance.post('~/api/users/ins-update/email/', { data here }, format='json')
    """
    user = User.objects.get(username=pk)
    insurance_data = user.insurance.all().filter(user=user)
    insurance_data.delete()

    new_data = request.data
    for data in new_data:
        data["user"] = user.pk

    serializer = UserInsuranceSerializer(many=True, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteUserInsuranceData(request, pk):
    """
    Accepts DELETE requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserInsurance object.
    Returns
    -------
        Returns a confirmation message.

    Examples
    --------
        "DELETE /api/users/ins-delete/email/ HTTP/1.1"

        axiosInstance.delete('~/api/users/ins-delete/email/')
    """
    user = User.objects.get(username=pk)
    insurance_data = user.insurance.all()
    insurance_data.delete()
    return Response("User's insurance data successfully deleted.", status=status.HTTP_200_OK)


# UserMindset data
@api_view(['GET'])
def getAllUserMindsetData(request, pk):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with these UserMindset objects.
    Returns
    -------
        Returns all UserMindset objects in the database related to the specified user.

    Examples
    --------
        "GET /api/users/mind-list/email/ HTTP/1.1"

        axiosInstance.get('~/api/users/mind-list/email/')
    """
    user = User.objects.get(username=pk)
    mindset_data = user.mindset.all()
    serializer = UserMindsetSerializer(mindset_data, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getLatestUserMindsetData(request, pk):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserMindset object.
    Returns
    -------
        Returns the latest UserAccount object in the database related to the specified user.

    Examples
    --------
        "GET /api/users/mind-get/email/ HTTP/1.1"

        axiosInstance.get('~/api/users/mind-get/email/')
    """
    user = User.objects.get(username=pk)
    try:
        mindset_data = user.mindset.latest("date_created")
    except models.ObjectDoesNotExist:
        return Response(f"Mindset data for user with username={pk} does not exist.", status=status.HTTP_404_NOT_FOUND)
    else:
        serializer = UserMindsetSerializer(mindset_data)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createUserMindsetData(request, pk):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    Returns
    -------
        Returns the data pertaining to the created UserMindset object, or errors.

    Examples
    --------
        "POST /api/users/mind-create/ HTTP/1.1"

        axiosInstance.post('~/api/users/mind-create/', { data here }, format='json')
    """
    user = User.objects.get(username=pk)
    new_data = request.data
    new_data['user'] = user.pk
    serializer = UserMindsetSerializer(data=new_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateUserMindsetData(request, pk, key1):
    """
    Accepts POST requests. Requires Authenticated User. Mindset data should never have to be updated.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : str
        The email of the user associated with this UserMindset object.
    key1 : str
        The date the mindset data was created
    Returns
    -------
        Returns the data pertaining to the updated UserMindset object, or errors.

    Examples
    --------
        "POST /api/users/mind-update/email/date/ HTTP/1.1"

        axiosInstance.post('~/api/users/mind-update/email/date/', { data here }, format='json')
    """
    user = User.objects.get(username=pk)
    mindset_data = user.mindset.get(date_created=key1)
    serializer = UserMindsetSerializer(
        instance=mindset_data, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteUserMindsetData(request, pk, key1):
    """
    Accepts DELETE requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with this UserMindset object.
    key1 : str
        The date the mindset data was created.
    Returns
    -------
        Returns a confirmation message.

    Examples
    --------
        "DELETE /api/users/mind-delete/email/date/ HTTP/1.1"

        axiosInstance.delete('~/api/users/mind-delete/email/date/')
    """
    user = User.objects.get(username=pk)
    mindset_data = user.mindset.get(date_created=key1)
    mindset_data.delete()
    return Response("User's mindset data from " + key1 + " has been successfully deleted.", status=status.HTTP_200_OK)


@api_view(['DELETE'])
def deleteAllUserMindsetData(request, pk):
    """
    Accepts DELETE requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The email of the user associated with these UserMindset objects.
    Returns
    -------
        Returns a confirmation message.

    Examples
    --------
        "DELETE /api/users/mind-delete-all/email/ HTTP/1.1"

        axiosInstance.delete('~/api/users/mind-delete-all/email/')
    """
    user = User.objects.get(username=pk)
    mindset_data = user.mindset.all()
    mindset_data.delete()
    return Response("All of the User's mindset data has been successfully deleted.", status=status.HTTP_200_OK)
