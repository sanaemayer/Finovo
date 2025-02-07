"""Tools Views

This script contains the views used for API routes related to the Tools application.

It currently contains CRUD methods for the following models:
    LifeInsuranceResults
    BudgetResults
    RetirementResults
    EmergencyFundResults
"""

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db import models

from .serializers import LifeInsuranceSerializer, BudgetSerializer, RetirementSerializer, EmergencyFundSerializer
from .models import LifeInsuranceResults, BudgetResults, RetirementResults, EmergencyFundResults


@api_view(['GET'])
def tools(request):
    tool_urls = {
        'Emergency': {
            'List': '/emergency-list',
            'Individual': '/emergency-get/<str:pk>/',
            'Create': '/emergency-create/',
            'Update': '/emergency-update/<str:pk>/',
            'Delete': '/emergency-delete/<str:pk>/',
        },
        'Retirement': {
            'List': '/retirement-list/',
            'Individual': '/retirement-get/<str:pk>/',
            'Create': '/retirement-create/',
            'Update': '/retirement-update/<str:pk>/',
            'Delete': '/retirement-delete/<str:pk>/',
        },
        'Life Insurance': {
            'List': '/life-insurance-list/',
            'Individual': '/life-insurance-get/<str:pk>/',
            'Create': '/life-insurance-create/<str:pk>/',
            'Update': '/life-insurance-update/<str:pk>/',
            'Delete': '/life-insurance-delete/<str:pk>/',
        },
        'Budget': {
            'List': '/budget-list/',
            'Individual': '/budget-get/<str:pk>/',
            'Create': '/budget-create/',
            'Update': '/budget-update/<str:pk>/',
            'Delete': '/budget-delete/<str:pk>/',
        },

    }
    return Response(tool_urls, status=status.HTTP_200_OK)


# Emergency Fund
@api_view(['GET'])
def getAllEmergency(request):
    emergency = EmergencyFundResults.objects.all()
    serializer = EmergencyFundSerializer(emergency, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getEmergencyData(request, pk):
    user = User.objects.get(username=pk)
    data = request.data
    data["user"] = user.pk

    try:
        emergency = EmergencyFundResults.objects.get(user=user)
    except models.ObjectDoesNotExist:
        return Response(f"Emergency Fund Tool Results do not exist for {pk}", status=status.HTTP_204_NO_CONTENT)
    else:
        serializer = EmergencyFundSerializer(emergency)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createEmergencyData(request, pk):
    user = User.objects.get(username=pk)
    data = request.data
    data["user"] = user.pk

    try:
        emergency = EmergencyFundResults.objects.get(user=user)
        serializer = EmergencyFundSerializer(instance=emergency, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    except models.ObjectDoesNotExist:
        serializer = EmergencyFundSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateEmergencyData(request, pk):
    emergency = EmergencyFundResults.objects.get(user=pk)
    serializer = EmergencyFundSerializer(instance=emergency, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def deleteEmergencyData(request, pk):
    emergency = EmergencyFundResults.objects.get(id=pk)
    emergency.delete()
    return Response('Emergency Fund successfully deleted.', status=status.HTTP_200_OK)


# Retirement Fund
@api_view(['GET'])
def getAllRetirement(request):
    retirement = RetirementResults.objects.all()
    serializer = RetirementSerializer(retirement, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getRetirementData(request, pk):
    user = User.objects.get(username=pk)
    data = request.data
    data["user"] = user.pk

    try:
        retirement = RetirementResults.objects.get(user=user)
    except models.ObjectDoesNotExist:
        return Response(f"Retirement Calculator Results do not exist for {pk}", status=status.HTTP_204_NO_CONTENT)
    else:
        serializer = RetirementSerializer(retirement)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createRetirementData(request, pk):
    user = User.objects.get(username=pk)
    data = request.data
    print(data)
    data["user"] = user.pk

    try:
        retirement = RetirementResults.objects.get(user=user)
        serializer = RetirementSerializer(instance=retirement, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    except models.ObjectDoesNotExist:
        serializer = RetirementSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.errors)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateRetirementData(request, pk):
    retirement = RetirementResults.objects.get(user=pk)
    serializer = RetirementSerializer(instance=retirement, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def deleteRetirementData(request, pk):
    retirement = RetirementResults.objects.get(id=pk)
    retirement.delete()
    return Response('Retirement  successfully deleted.', status=status.HTTP_200_OK)


# Life Insurance
@api_view(['GET'])
def getAllLifeInsurance(request):
    lifeInsurance = LifeInsuranceResults.objects.all()
    serializer = LifeInsuranceSerializer(lifeInsurance, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getLifeInsuranceData(request, pk):
    user = User.objects.get(username=pk)
    data = request.data
    data["user"] = user.pk

    try:
        lifeInsurance = LifeInsuranceResults.objects.get(user=user)
    except models.ObjectDoesNotExist:
        return Response(f"Insurance Tool Results do not exist for {pk}", status=status.HTTP_204_NO_CONTENT)
    else:
        serializer = LifeInsuranceSerializer(lifeInsurance)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createLifeInsuranceData(request, pk):
    user = User.objects.get(username=pk)
    data = request.data
    data["user"] = user.pk

    try:
        insurance = LifeInsuranceResults.objects.get(user=user)
        serializer = LifeInsuranceSerializer(instance=insurance, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    except models.ObjectDoesNotExist:
        serializer = LifeInsuranceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateLifeInsuranceData(request, pk):
    lifeInsurance = LifeInsuranceResults.objects.get(user=pk)
    serializer = LifeInsuranceSerializer(instance=lifeInsurance, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def deleteLifeInsuranceData(request, pk):
    lifeInsurance = LifeInsuranceResults.objects.get(id=pk)
    lifeInsurance.delete()
    return Response('LifeInsurance  successfully deleted.', status=status.HTTP_200_OK)


# Budget
@api_view(['GET'])
def getAllBudget(request):
    budge = BudgetResults.objects.all()
    serializer = BudgetSerializer(budge, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getBudgetData(request, pk):
    user = User.objects.get(username=pk)
    data = request.data
    data["user"] = user.pk

    try:
        budget = BudgetResults.objects.get(user=user)
    except models.ObjectDoesNotExist:
        return Response(f"Budget Calculator Results do not exist for {pk}", status=status.HTTP_204_NO_CONTENT)
    else:
        serializer = BudgetSerializer(budget)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createBudgetData(request, pk):
    user = User.objects.get(username=pk)
    data = request.data
    data["user"] = user.pk

    try:
        budget = BudgetResults.objects.get(user=user)
        serializer = BudgetSerializer(instance=budget, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    except models.ObjectDoesNotExist:
        serializer = BudgetSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateBudgetData(request, pk):
    budget = BudgetResults.objects.get(user=pk)
    serializer = BudgetSerializer(instance=budget, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def deleteBudgetData(request, pk):
    budget = BudgetResults.objects.get(id=pk)
    budget.delete()
    return Response('Budget  successfully deleted.', status=status.HTTP_200_OK)
