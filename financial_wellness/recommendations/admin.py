from django.contrib import admin
from .models import Recommendation, UserRecommendation

# Register your models here.
admin.site.register(Recommendation)
admin.site.register(UserRecommendation)
