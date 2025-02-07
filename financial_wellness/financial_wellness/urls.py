"""financial_wellness URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))

    Acknowledgements
    Vitor Freitas and his article on using simplejwt for token authentication
    https://simpleisbetterthancomplex.com/tutorial/2018/12/19/how-to-use-jwt-authentication-with-django-rest-framework.html#:~:text=The%20access%20token%20is%20usually,login%20with%20username%20%2B%20password%20again
"""
from django.contrib import admin
from django.urls import path, include
from .views import apiOverview
from django.views.generic import TemplateView
from rest_framework_simplejwt import views as jwt_views
from . import views

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name="react"),
    path('admin/', admin.site.urls),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),

    # API urls
    path('api/', apiOverview, name="APIOverview"),
    path('api/users/', include('users.urls')),
    path('api/recs/', include('recommendations.urls')),
    path('api/tools/', include('tools.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/dash-data/', views.getAdminDashboardData, name="dash-data"),
    path('api/report-all/', views.getAllReport, name="report-all"),
    path('api/report-company/<str:pk>/', views.getCompanyReport, name="report-company"),
    path('api/report-user/<str:pk>/', views.getUserReport, name="report-user"),
]
