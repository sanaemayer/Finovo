"""Tools Urls

This script contains urlpatterns for API routes related to the Tools application.

"""

from django.urls import path
from . import views

urlpatterns = [
    path('', views.tools, name="Tools Section"),
    # Emergency Fund Tool Results-related URLS
    path('emergency-list/', views.getAllEmergency, name="emergency"),
    path('emergency-get/<str:pk>/', views.getEmergencyData, name="emergency-get"),
    path('emergency-create/<str:pk>/', views.createEmergencyData, name="emergency-create"),
    path('emergency-update/<str:pk>/', views.updateEmergencyData, name="emergency-update"),
    path('emergency-delete/<str:pk>/', views.deleteEmergencyData, name="emergency-delete"),
    # Retirement Tool Results-related URLS
    path('retirement-list/', views.getAllRetirement, name="retirement-list"),
    path('retirement-get/<str:pk>/', views.getRetirementData, name="retirement-get"),
    path('retirement-create/<str:pk>/', views.createRetirementData, name="retirement-create"),
    path('retirement-update/<str:pk>/', views.updateRetirementData, name="retirement-update"),
    path('retirement-delete/<str:pk>/', views.deleteRetirementData, name="retirement-delete"),
    # Life Insurance Tool Results-related URLS
    path('life-insurance-list/', views.getAllLifeInsurance, name="life-insurance-list"),
    path('life-insurance-get/<str:pk>/', views.getLifeInsuranceData, name="life-insurance-get"),
    path('life-insurance-create/<str:pk>/', views.createLifeInsuranceData, name="life-insurance-create"),
    path('life-insurance-update/<str:pk>/', views.updateLifeInsuranceData, name="life-insurance-update"),
    path('life-insurance-delete/<str:pk>/', views.deleteLifeInsuranceData, name="life-insurance-delete"),
    # Budget Tool Results-related URLS
    path('budget-list/', views.getAllBudget, name="budget-list"),
    path('budget-get/<str:pk>/', views.getBudgetData, name="budget-get"),
    path('budget-create/<str:pk>/', views.createBudgetData, name="budget-create"),
    path('budget-update/<str:pk>/', views.updateBudgetData, name="budget-update"),
    path('budget-delete/<str:pk>/', views.deleteBudgetData, name="budget-delete"),
]