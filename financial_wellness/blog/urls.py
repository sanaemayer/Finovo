"""Blog Urls

This script contains urlpatterns for API routes related to the Blog application.

"""

from django.urls import path
from . import views

urlpatterns = [
    path('', views.blog, name="Blog Section"),
    # Post-related URLS
    path('post-list/', views.getAllPosts, name="post-list"),
    path('post-get/<str:pk>/', views.getPost, name="post-get"),
    path('post-create/<str:pk>/', views.createPost, name="post-create"),
    path('post-update/<str:pk>/', views.updatePost, name="post-update"),
    path('post-delete/<str:pk>/', views.deletePost, name="post-delete"),
    path('post-delete-all/<str:pk>/', views.deleteAllPostsByUser, name="post-delete-all"),
    # Category-related URLS
    path('cate-list/', views.getAllCategories, name="cate-list"),
    path('cate-create/', views.createCategory, name="cate-create"),
    path('cate-update/<str:pk>/', views.updateCategory, name="cate-update"),
    path('cate-delete/<str:pk>/', views.deleteCategory, name="cate-delete"),
]
