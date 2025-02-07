"""Recommendations Tests

This script contains definitions for unittests related to the Recommendations application.

It currently contains the following tests:
    RecommendationTestCase
"""

from django.test import TestCase
from .models import Recommendation

# TODO: More tests for Recommendations

class RecommendationTestCase(TestCase):
    def setUp(self):
        Recommendation.objects.create(title="Test 1", description="This is a recommendation", group="Group 1")

    def test_created_properly(self):
        rec_one = Recommendation.objects.get(title="Test 1")
        self.assertEqual(rec_one.description, "This is a recommendation")

