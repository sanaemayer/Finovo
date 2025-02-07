"""Blog Views

This script contains the views used for API routes related to the Blog application.

It currently contains CRUD methods for the following models:
    Category
    Post
"""

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.utils import dateparse
from django.db import models
from .models import Post, Category
from .serializers import PostSerializer, CategorySerializer, PostExtraSerializer
from django.contrib.auth.models import User


@api_view(['GET'])
def blog(request):
    """
    Accepts GET requests. Used for displaying a list of API urls for the blog app
    in the browsable API.

    Parameters
    ----------
    request
        The HTTP request calling this API view.
    Returns
    -------
        Returns a dictionary containing all API methods related to the Blog App and their urls
    """
    blog_urls = {
        'List Posts': '/post-list/',
        'List Individual Post': '/post-get/<str:pk>/',
        'Create Post': '/post-create/',
        'Update Post': '/post-update/<str:pk>/',
        'Delete Post': '/post-delete/<str:pk>/',
        'Delete All Posts by User': '/post-delete-all/<str:pk>/',
        'List Categories': '/cate-list/',
        'Create Category': '/cate-create/',
        'Update Category': '/cate-update/<str:pk>/',
        'Delete Category': '/cate-delete/<str:pk>/',
    }
    return Response(blog_urls, status=status.HTTP_200_OK)


@api_view(['GET'])
def getAllPosts(request):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request
        The HTTP request calling this API view.
    Returns
    -------
        Returns all Post objects inside the database. Returns an empty list if there are no Post objects.

    Examples
    --------
        "GET /api/blog/post-list/ HTTP/1.1"

        axiosInstance.get('~/api/blog/post-list/')
    """
    posts = Post.objects.all()
    # Normally we used PostExtraSerializer but when deployed it did not allow us get the data of SerializerMethodField.
    # As a workaround, we decided to manually set the data and return it.
    serializer = PostSerializer(posts, many=True)
    postData = serializer.data
    for post in postData:
        author_object = User.objects.get(id=post["author"])
        post["author_name"] = f"{author_object.first_name} {author_object.last_name}"

        category_object = Category.objects.get(id=post["category"])
        post["category_name"] = category_object.name

        normal_date = dateparse.parse_datetime(str(post["date_posted"]))
        post["readable_date"] = normal_date.date()
    return Response(postData, status=status.HTTP_200_OK)


@ api_view(['GET'])
def getPost(request, pk):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : int
        The id of the post to be returned.
    Returns
    -------
        Returns a single Post object.
    Examples
    --------
        "GET /api/blog/post-get/1/ HTTP/1.1"

        axiosInstance.get('~/api/blog/post-get/1/')
    """
    try:
        post = Post.objects.get(id=pk)
        serializer = PostSerializer(post)

        postData = serializer.data
        author_object = User.objects.get(id=postData["author"])
        postData["author_name"] = f"{author_object.first_name} {author_object.last_name}"
        category_object = Category.objects.get(id=postData["category"])
        postData["category_name"] = category_object.name
        normal_date = dateparse.parse_datetime(str(postData["date_posted"]))
        postData["readable_date"] = normal_date.date()

        return Response(postData, status=status.HTTP_200_OK)
    except models.ObjectDoesNotExist:
        return Response(f"Post object with id={pk} does not exist.", status=status.HTTP_404_NOT_FOUND)


@ api_view(['POST'])
def createPost(request, pk):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : str
        The username of the author of the post.
    Returns
    -------
        Returns the data pertaining to the created Post object, or errors.
    Examples
    --------
        "POST /api/blog/post-create/username/ HTTP/1.1"

        axiosInstance.post('~/api/blog/post-create/username/', { data here }, format='json')
    """
    current_user = User.objects.get(username=pk)
    new_data = request.data
    new_data["author"] = current_user.pk
    serializer = PostSerializer(data=new_data)
    if serializer.is_valid():
        serializer.save()
        # return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response("Successfully Created", status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['POST'])
def updatePost(request, pk):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : int
        The id of the post to be updated.
    Returns
    -------
        Returns the data pertaining to the updated Post object, or errors.
    Examples
    --------
        "POST /api/blog/post-updated/1/ HTTP/1.1"

        axiosInstance.post('~/api/blog/post-updated/1/', { data here }, format='json')
    """
    post = Post.objects.get(id=pk)
    current_user = User.objects.get(username=post.author.username)
    new_data = request.data
    new_data["author"] = current_user.pk
    serializer = PostSerializer(instance=post, data=new_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['DELETE'])
def deletePost(request, pk):
    """
    Accepts DELETE requests. Deletes a Post object. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : int
        The id of the post to be deleted.
    Returns
    -------
        Returns confirmation message
    Examples
    --------
        "DELETE /api/blog/post-delete/1/ HTTP/1.1"

        axiosInstance.delete('~/api/blog/post-delete/1/')
    """
    post = Post.objects.get(id=pk)
    post.delete()
    return Response(f'Post with id= {pk} by {post.author} successfully deleted.', status=status.HTTP_200_OK)


@ api_view(['DELETE'])
def deleteAllPostsByUser(request, pk):
    """
    Accepts DELETE requests. Deletes all Post objects by a single author. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The username of the author of the posts being deleted.
    Returns
    -------
        Returns confirmation message
    Examples
    --------
        "DELETE /api/blog/post-delete/1/ HTTP/1.1"

        axiosInstance.delete('~/api/blog/post-delete/1/')
    """
    posts = Post.objects.filter(author__username=pk)
    posts.delete()
    return Response(f'Posts by {pk} successfully deleted.', status=status.HTTP_200_OK)


# Category API
@ api_view(['GET'])
def getAllCategories(request):
    """
    Accepts GET requests. Requires Authenticated User.

    Parameters
    ----------
    request
        The HTTP request calling this API view.
    Returns
    -------
        Returns all Category objects defined inside the database. Returns an empty list if there are no Category objects.

    Examples
    --------
        "GET /api/blog/cate-list/ HTTP/1.1"

        axiosInstance.get('~/api/blog/cate-list/')
    """
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@ api_view(['POST'])
def createCategory(request):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    Returns
    -------
        Returns the data pertaining to the created Category object, or errors.
    Examples
    --------
        "POST /api/blog/cate-create/ HTTP/1.1"

        axiosInstance.post('~/api/blog/cate-create/', { data here }, format='json')
    """
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['POST'])
def updateCategory(request, pk):
    """
    Accepts POST requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method. Should contain data in the body.
    pk : str
        The name of the category to be updated.
    Returns
    -------
        Returns the data pertaining to the updated Post object, or errors.
    Examples
    --------
        "POST /api/blog/post-create/name/ HTTP/1.1"

        axiosInstance.post('~/api/blog/post-create/name/', { data here }, format='json')
    """
    category = Category.objects.get(name=pk)
    serializer = CategorySerializer(instance=category, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['DELETE'])
def deleteCategory(request, pk):
    """
    Accepts DELETE requests. Requires Authenticated User.

    Parameters
    ----------
    request : any
        The HTTP request calling this method.
    pk : str
        The name of the category to be deleted.
    Returns
    -------
        Returns a confirmation message.
    Examples
    --------
        "DELETE /api/blog/post-delete/name/ HTTP/1.1"

        axiosInstance.delete('~/api/blog/post-delete/name/')
    """
    category = Category.objects.get(name=pk)
    category.delete()
    return Response(f'Category {pk} was successfully deleted.', status=status.HTTP_200_OK)
