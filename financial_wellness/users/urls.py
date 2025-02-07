"""Users Urls

This script contains urlpatterns for API routes related to the Users application.

"""

from django.urls import path
from . import views

urlpatterns = [
    path('', views.userURLs, name="Users Section"),
    # User-related URLS
    path('current_user/', views.current_user, name="check-current-user"),
    path('signup/', views.UserSignup.as_view(), name="signup user"),
    path('logout/', views.UserLogout.as_view(),
         name='logout'),
    path('user-list/', views.getAllUsers, name="user-list"),
    path('user-get/<str:pk>/', views.getUserData, name="user-get"),
    path('user-update/<str:pk>/', views.updateUserData, name="user-update"),
    path('user-delete/<str:pk>/', views.deleteUserData, name="user-delete"),
    # ClientEmployeeInfo-related URLS
    path('CEI-list/', views.getAllClientEmployeeInfo, name="CEI-list"),
    path('CEI-get/<str:pk>/', views.checkForClientEmployeeInfo, name="CEI-get"),
    path('CEI-create/', views.createClientEmployeeInfoEntry, name="CEI-create"),
    path('CEI-company-create/', views.createMultipleClientEmployeeInfo,
         name="email-company-create"),
    path('CEI-update/<str:pk>/',
         views.updateClientEmployeeInfo, name="CEI-update"),
    path('CEI-increase-login/<str:pk>/',
         views.increaseLogInClientEmployeeInfo, name="CEI-update"),
    path('CEI-delete/<str:pk>/',
         views.deleteClientEmployeeInfo, name="CEI-delete"),
    path('CEI-company-delete/<str:pk>/',
         views.deleteAllEmployeeInfoFromCompany, name="CEI-company-delete"),
    # UserPersonal-related URLS
    path('pers-get/<str:pk>/', views.getUserPersonalData, name="pers-get"),
    path('pers-update/<str:pk>/', views.updateUserPersonalData, name="pers-update"),
    path('pers-delete/<str:pk>/', views.deleteUserPersonalData, name="pers-delete"),
    # UserAccount-related URLS
    path('acc-get/<str:pk>/', views.getUserAccountsData, name="acc-get"),
    path('acc-create/', views.createUserAccountsData, name="acc-create"),
    path('acc-update/<str:pk>/', views.updateUserAccountsData, name="acc-update"),
    path('acc-delete/<str:pk>/<str:key1>/<str:key2>/',
         views.deleteUserAccountsData, name="acc-delete"),
    # UserAssets-related URLS
    path('assets-get/<str:pk>/', views.getUserAssetsData, name="assets-get"),
    path('assets-create/', views.createUserAssetsData, name="assets-create"),
    path('assets-update/<str:pk>/',
         views.updateUserAssetsData, name="assets-update"),
    path('assets-delete/<str:pk>/<str:key1>/<str:key2>/',
         views.deleteUserAssetsData, name="assets-delete"),
    # UserDebt-related URLS
    path('debt-get/<str:pk>/', views.getUserDebtData, name="debt-get"),
    path('debt-create/', views.createUserDebtData, name="debt-create"),
    path('debt-update/<str:pk>/', views.updateUserDebtData, name="debt-update"),
    path('debt-delete/<str:pk>/<str:key1>/<str:key2>/',
         views.deleteUserDebtData, name="debt-delete"),
    # UserIncome-related URLS
    path('income-get/<str:pk>/', views.getUserIncomeData, name="income-get"),
    path('income-create/', views.createUserIncomeData, name="income-create"),
    path('income-update/<str:pk>/',
         views.updateUserIncomeData, name="income-update"),
    path('income-delete/<str:pk>/<str:key1>/<str:key2>/',
         views.deleteUserIncomeData, name="income-delete"),
    # UserInsurance-related URLS
    path('ins-get/<str:pk>/', views.getUserInsuranceData, name="ins-get"),
    path('ins-create/', views.createUserInsuranceData, name="ins-create"),
    path('ins-update/<str:pk>/', views.updateUserInsuranceData, name="ins-update"),
    path('ins-delete/<str:pk>/<str:key1>/<str:key2>/',
         views.deleteUserInsuranceData, name="ins-delete"),
    # UserMindset-related URLS
    path('mind-list/<str:pk>/', views.getAllUserMindsetData, name="mind-list"),
    path('mind-get/<str:pk>/', views.getLatestUserMindsetData, name="mind-get"),
    path('mind-create/<str:pk>/', views.createUserMindsetData, name="mind-create"),
    path('mind-update/<str:pk>/<str:key1>/',
         views.updateUserMindsetData, name="mind-update"),
    path('mind-delete/<str:pk>/<str:key1>/',
         views.deleteUserMindsetData, name="mind-delete"),
    path('mind-delete-all/<str:pk>/',
         views.deleteAllUserMindsetData, name="mind-delete-all"),
]
