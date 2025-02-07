"""Recommendations Views

This script contains the views used for API routes related to the Recommendations application.

It currently contains CRUD methods for the following models:
    Recommendation
"""

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.serializers import Serializer

from .models import Recommendation, UserRecommendation
from .serializers import RecommendationSerializer, UserRecommendationSerializer
from recommendations import serializers


@api_view(['GET'])
def recommendationURLs(request):
    """
    Returns a list of all API methods related to Recommendations, and their URLs
    """
    recs_urls = {
        'List All Recommendations': '/recs-list/',
        'List Individual Recommendation': '/recs-get/<str:pk>/',
        'Create Recommendation': '/recs-create/',
        'Update Recommendation': '/recs-update/<str:pk>/',
        'Delete Recommendation': '/recs-delete/<str:pk>/',
        'Get Users Recommendations': '/users-recs-get/<str:pk>/',
        'Create User Recommendation': '/users-recs-create/',
        'Create Multiple User Recommendations': '/users-recs-create-multi/',
        'Update User Recommendations': '/users-recs-update/',
        'Delete User Recommendations': '/users-recs-delete/',
    }
    return Response(recs_urls, status=status.HTTP_200_OK)


@api_view(['GET'])
def getAllRecommendations(request):
    """
    Returns all Recommendation objects in the database.
    """
    recommendations = Recommendation.objects.all()
    serializer = RecommendationSerializer(recommendations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getIndividualRecommendation(request, pk):
    """
    Returns a single recommendation.

    Parameters
    ---------
    request : any
        The HTTP request calling this method.
    pk : str
        The title of the recommendation to be returned.
    """
    recommendation = Recommendation.objects.get(title=pk)
    serializer = RecommendationSerializer(recommendation)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def createRecommendation(request):
    """
    Creates a single Recommendation object.

    Parameters
    ---------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    """
    serializer = RecommendationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def updateRecommendationDetails(request, pk):
    """
    Updates the details of a single recommendation.

    Parameters
    ---------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : str
        The title of the recommendation to be updated.
    """
    recommendation = Recommendation.objects.get(title=pk)
    serializer = RecommendationSerializer(
        instance=recommendation, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteRecommendation(request, pk):
    """
    Deletes a single recommendation.

    Parameters
    ---------
    request : any
        The HTTP request calling this method.
    pk : str
        The title of the recommendation to be deleted.
    """
    recommendation = Recommendation.objects.get(title=pk)
    recommendation.delete()
    return Response(f'Recommendation {pk} was successfully deleted.', status=status.HTTP_200_OK)


@api_view(['GET'])
def getUserRecommendation(request, pk):
    """
    Returns list of user's recommendation.

    Parameters
    ---------
    request : any
        The HTTP request calling this method.
    pk : str
        The id of the user.
    """
    current_user = User.objects.get(username=pk)
    userRecommendation = UserRecommendation.objects.filter(
        user=current_user)
    recommendations = []
    # The data will have all the recommendation info + if the user completed the recommendation or not
    for recommendation in userRecommendation:
        rec = Recommendation.objects.get(id=recommendation.recommendation.id)
        rec_serializer = RecommendationSerializer(rec)
        data = rec_serializer.data
        data["isCompleted"] = recommendation.isCompleted
        recommendations.insert(-1, data)

    return Response(recommendations, status=status.HTTP_200_OK)


@api_view(['POST'])
def createUserRecommendation(request):
    """
    Creates a single Recommendation object.

    Parameters
    ---------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    """
    user = User.objects.get(username=request.data.email)
    recommendation = Recommendation.objects.get(id=request.data.id)
    data = {"user": user.pk, "recommendation": recommendation.pk}

    serializer = UserRecommendationSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def createMultiUserRecommendation(request):
    """
    Creates a single Recommendation object.
    (Automatically give two recommendation in the beginning)

    Parameters
    ---------
    request : any
        The HTTP request calling this method. Should contain data in the body.

    request data: an array for following data:
        email: user's email
        flag: recommendation's flag
    """
    for data in request.data:
        user = User.objects.get(username=data['email'])
        recommendation = Recommendation.objects.get(flag=data['flag'])

        # check if user already has that recommendation - if they do, delete
        userRec = UserRecommendation.objects.filter(
            recommendation=recommendation, user=user)
        if(userRec.exists()):
            userRec.delete()

        data = {"user": user.pk, "recommendation": recommendation.pk}
        serializer = UserRecommendationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        else:
            print(Serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def upadateMultiUserRecommendation(request):
    """
    Updates the details of a single recommendation.

    Parameters
    ---------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    """
    for data in request.data:
        user = User.objects.get(username=data["email"])
        recommendation = Recommendation.objects.get(flag=data["flag"])

        newData = {"user": user.pk, "recommendation": recommendation.pk,
                   "isCompleted": data["isCompleted"]}
        userRecommendation = UserRecommendation.objects.get(
            user=user, recommendation=recommendation)
        serializer = UserRecommendationSerializer(
            instance=userRecommendation, data=newData)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def updateUserRecommendationDetails(request):
    """
    Updates the details of a single recommendation.

    Parameters
    ---------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    """
    user = User.objects.get(username=request.data["email"])
    recommendation = Recommendation.objects.get(id=request.data["id"])

    newData = {"user": user.pk, "recommendation": recommendation.pk,
               "isCompleted": request.data["isCompleted"]}
    userRecommendation = UserRecommendation.objects.get(
        user=user, recommendation=recommendation)
    serializer = UserRecommendationSerializer(
        instance=userRecommendation, data=newData)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteUserRecommendation(request):
    """
    Deletes a single recommendation.

    Parameters
    ---------
    request : any
        The HTTP request calling this method.
    pk : str
        The title of the recommendation to be deleted.
    """
    user = User.objects.get(username=request.data["email"])
    recommendation = Recommendation.objects.get(flag=request.data["flag"])
    userRecommendation = UserRecommendation.objects.filter(
        user=user, recommendation=recommendation)
    userRecommendation.delete()

    return Response(f'User Recommendation {recommendation.title} was successfully deleted.', status=status.HTTP_200_OK)
