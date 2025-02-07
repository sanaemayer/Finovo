"""Recommendations Models

This script contains definitions for models related to the Recommendations application.

It currently contains the following models:
    Recommendation
"""

from django.db import models
from django.contrib.auth.models import User


class Recommendation(models.Model):
    """
    A model used to represent a Recommendation object.

    Attributes
    ----------
    flag : str
        A shortened version of the Title. Is unique for each recommendation. Used for variables.
    title : str
        The title of the Recommendation. Displayed.
    description : str
        A short explanation of the recommendation; Why, What, Where, How, Who, etc.
    resources : str
        Contains links in string form to be displayed. Multiple links are separated by commas.
    """
    flag = models.TextField(unique=True)
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    resources = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.id} | {self.flag} |{self.title}"

    def getResources(self):
        """
        Returns a list of resource links. This assumes the resources are separated by a single comma.
        """

        resources = str(self.resources).split(",")
        return resources


class UserRecommendation(models.Model):
    """
    A model used to represent an intermediate link object between Users and Recommendations.
    This allows each user to have the same recommendations, but different isCompleted values.

    Attributes
    ----------
    users : User
        The user object this link is related to.
    recommendation : Recommendation
        The Recommendation object this link is related to.
    isCompleted : bool
        Flag for if the Recommendation has been completed.
    """
    user = models.ForeignKey(
        User, default=None, null=True, blank=True, on_delete=models.CASCADE)
    recommendation = models.ForeignKey(
        Recommendation, default=None, null=True, blank=True, on_delete=models.CASCADE)
    isCompleted = models.BooleanField(default=False)

    class Meta:
        unique_together = [['user', 'recommendation']]

    def __str__(self):
        return self.user.username + "|" + self.recommendation.title
