"""Recommendations Serializers

This script contains definitions for serializers related to the Recommendations application.

It currently contains the following serializers:
    RecommendationSerializer
"""

from rest_framework import serializers
from .models import Recommendation, UserRecommendation
from django.contrib.auth.models import User


class RecommendationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recommendation
        fields = ('id', 'title', 'description', 'resources')


class UserRecommendationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all())

    class Meta:
        model = UserRecommendation
        fields = ('user', 'recommendation', 'isCompleted')
