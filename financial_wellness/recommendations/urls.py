"""Recommendations Urls

This script contains urlpatterns for API routes related to the Recommendations application.

"""

from django.urls import path
from . import views

urlpatterns = [
    path('', views.recommendationURLs, name="Recommendations Section"),
    # Recommendation-related URLs
    path('recs-list/', views.getAllRecommendations, name="recs-list"),
    path('recs-get/<str:pk>/', views.getIndividualRecommendation, name="recs-get"),
    path('recs-create/', views.createRecommendation, name="recs-create"),
    path('recs-update/<str:pk>/',
         views.updateRecommendationDetails, name="recs-update"),
    path('recs-delete/<str:pk>/', views.deleteRecommendation, name="recs-delete"),
    # UserRecommendation-related URLs
    path('user-recs-get/<str:pk>/',
         views.getUserRecommendation, name="user-recs-get"),
    path('user-recs-create/', views.createUserRecommendation,
         name="user-recs-create"),
    path('user-recs-create-multi/', views.createMultiUserRecommendation,
         name="user-recs-create"),
    path('user-recs-update/',
         views.updateUserRecommendationDetails, name="user-recs-update"),
    path('user-recs-update-multi/', views.upadateMultiUserRecommendation,
         name="user-recs-upadate"),
    path('user-recs-delete/',
         views.deleteUserRecommendation, name="user-recs-delete"),
]
