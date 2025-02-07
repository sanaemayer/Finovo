"""Blog Tests

This script contains definitions for unittests related to the Blog application.

It currently contains the following tests:
    PostTestCase
    CategoryTestCase
"""

from django.test import TestCase
from .models import Post, Category
from . import views
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory, force_authenticate
from users.models import ClientEmployeeInfo


# Post-model Tests
def create_post(post_title, post_author, post_content=None, post_desc=None, post_cate=None, post_featured=False):
    """
    Creates a Post with the given 'post_title', 'post_author', 'post_content', 'post_desc',
    'post_cate', and 'post_featured' parameters.

    Parameters
    ----------
    post_title : str
        The title of the post.
    post_author : User
        The author of the post.
    post_content : str
        The content of the post.
    post_desc : str
        A short description of the post.
    post_cate : Category
        The category of the post.
    post_featured : bool
        A flag that determines if the post is featured or not.
    """
    if post_cate is None:
        post_cate = Category.objects.get(id=1)
    return Post.objects.create(title=post_title, author=post_author, content=post_content,
                               description=post_desc, category=post_cate, isFeatured=post_featured)


class PostTestCase(TestCase):
    """
    Contains test cases for the Post model.
    """

    def setUp(self):
        # Setup user and factory
        self.test_user = User.objects.create(username="tester@test.ca", first_name="tester",
                                             last_name="account", email="tester@test.ca", password="password123")
        self.test_CEI = ClientEmployeeInfo.objects.create(first_name="tester", last_name="account",
                                                          email="tester@test.ca", company="testCompany",
                                                          account_type="ONE", user=self.test_user,
                                                          preferred_name=None, login_count=0)
        self.factory = APIRequestFactory()
        # Setup temporary Categories
        self.test_cate1 = create_category("Uncategorized")
        self.test_cate2 = create_category("Stocks")
        self.test_cate3 = create_category("Budgeting")

    # Model Tests
    def test_proper_creation_no_content(self):
        """
        Tests if Post objects are created with the correct title and author.
        """
        empty_post = create_post("Investing 101", self.test_user)

        self.assertEqual(empty_post.title, "Investing 101")
        self.assertEqual(empty_post.author, self.test_user)
        self.assertEqual(empty_post.content, None)
        self.assertEqual(empty_post.description, None)
        self.assertEqual(empty_post.category.name, "Uncategorized")
        self.assertEqual(empty_post.isFeatured, False)

    def test_proper_creation_content(self):
        """
        Tests if Post objects are created with the correct title and author and content.
        """
        filled_post = create_post("Investing 101", self.test_user, "<p>Buy low, sell high.</p>")

        self.assertEqual(filled_post.title, "Investing 101")
        self.assertEqual(filled_post.author, self.test_user)
        self.assertEqual(filled_post.content, "<p>Buy low, sell high.</p>")
        self.assertEqual(filled_post.description, None)
        self.assertEqual(filled_post.category.name, "Uncategorized")
        self.assertEqual(filled_post.isFeatured, False)

    def test_proper_creation_everything(self):
        """
        Tests if Post objects are created with correct data when given all fields.
        # Except date_posted which is automatically generated.
        """
        test_cate = Category.objects.get(name="Stocks")
        new_post = create_post("Investing 101", self.test_user, "<p>Buy low, sell high.</p>",
                               "A quick guide to investing.", test_cate, True)

        self.assertEqual(new_post.title, "Investing 101")
        self.assertEqual(new_post.author, self.test_user)
        self.assertEqual(new_post.content, "<p>Buy low, sell high.</p>")
        self.assertEqual(new_post.description, "A quick guide to investing.")
        self.assertEqual(new_post.category.name, "Stocks")
        self.assertEqual(new_post.isFeatured, True)

    # API Endpoint Tests
    def test_list_empty(self):
        """
        Tests the getAllPosts API method.
        """
        request = self.factory.get('api/blog/post-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllPosts
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [])  # Check for empty list

    def test_single_empty(self):
        """
        Tests the getPost API method.
        """
        test_id = 1
        request = self.factory.get('api/blog/post-get/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        view = views.getPost
        response = view(request, test_id)

        self.assertEqual(response.status_code, 404)  # Check for NOT_FOUND status code
        self.assertEqual(response.data, f'Post object with id={test_id} does not exist.')

    def test_create_post(self):
        """
        Tests the createPost API method
        """
        request = self.factory.post('api/blog/post-create/',
                                    {"title": "Investing 101", "content": "<p>Buy low, sell high.</p>",
                                     "description": "A quick guide to investing.",
                                     "category": Category.objects.get(name="Stocks").id,
                                     "isFeatured": "True"}, format="json")
        force_authenticate(request, user=self.test_user)
        response = views.createPost(request, self.test_user.username)

        self.assertEqual(response.status_code, 201)  # Check for CREATED status code
        self.assertEqual(response.data,
                         {"id": 1, "title": "Investing 101", "author": 1,
                          "author_name": f"{self.test_user.first_name} {self.test_user.last_name}",
                          "content": "<p>Buy low, sell high.</p>",
                          "description": "A quick guide to investing.",
                          "date_posted": Post.objects.get(id=1).date_posted.isoformat().replace("+00:00", "Z"),
                          "readable_date": Post.objects.get(id=1).getDate(),
                          "category": self.test_cate2.id, "category_name": self.test_cate2.name,
                          "isFeatured": True})

        request = self.factory.get('api/blog/post-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllPosts
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [
            {"id": 1, "title": "Investing 101", "author": 1,
             "author_name": f"{self.test_user.first_name} {self.test_user.last_name}",
             "content": "<p>Buy low, sell high.</p>",
             "description": "A quick guide to investing.",
             "date_posted": Post.objects.get(id=1).date_posted.isoformat().replace("+00:00", "Z"),
             "readable_date": Post.objects.get(id=1).getDate(),
             "category": self.test_cate2.id, "category_name": self.test_cate2.name,
             "isFeatured": True}])

    def test_update_post(self):
        """
        Tests the updatePost API method
        """
        create_post("Investing 101", self.test_user, "<p>Buy low, sell high.</p>",
                    "A quick guide to investing.", self.test_cate2, True)
        test_id = 1

        request = self.factory.post('api/blog/post-update/',
                                    {"title": "Investing 101", "content": "<p>You require more capital.</p>",
                                     "description": "A quick guide to investing.",
                                     "category": Category.objects.get(name="Stocks").id,
                                     "isFeatured": False}, format="json")
        force_authenticate(request, user=self.test_user)
        response = views.updatePost(request, test_id)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data,
                         {"id": test_id, "title": "Investing 101", "author": self.test_user.id,
                          "author_name": f"{self.test_user.first_name} {self.test_user.last_name}",
                          "content": "<p>You require more capital.</p>",
                          "description": "A quick guide to investing.",
                          "date_posted": Post.objects.get(id=1).date_posted.isoformat().replace("+00:00", "Z"),
                          "readable_date": Post.objects.get(id=1).getDate(),
                          "category": self.test_cate2.id, "category_name": self.test_cate2.name,
                          "isFeatured": False})

    def test_delete_post(self):
        """
        Tests the deletePost API method
        """
        create_post("Investing 101", self.test_user, "<p>Buy low, sell high.</p>",
                    "A quick guide to investing.", self.test_cate2, True)
        test_id = 1

        request = self.factory.delete('api/blog/post-delete/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        response = views.deletePost(request, test_id)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data,
                         f'Post with id= {test_id} by {self.test_user} successfully deleted.')  # Custom response message from view

        request = self.factory.get('api/blog/post-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllPosts
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [])  # Check for empty list

    def test_delete_all_posts_by_user(self):
        """
        Tests the deleteAllPostsByUser API method
        """
        create_post("Investing 101", self.test_user, "<p>Buy low, sell high.</p>",
                    "A quick guide to investing.", self.test_cate2, True)

        request = self.factory.delete('api/blog/post-delete-all/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        response = views.deleteAllPostsByUser(request, self.test_user.username)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data,
                         f'Posts by {self.test_user.username} successfully deleted.')  # Custom response message from view

        request = self.factory.get('api/blog/post-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllPosts
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [])  # Check for empty list


# Category-model Tests
def create_category(category_name):
    """
    Creates a Category with the given 'category_name'.

    Parameters
    ----------
    category_name : str
    """
    return Category.objects.create(name=category_name)


class CategoryTestCase(TestCase):
    """
    Contains test cases for the Category model.
    """

    def setUp(self):
        # Setup user and factory
        self.test_user = User.objects.create(username="tester@test.ca", first_name="tester",
                                             last_name="account", email="tester@test.ca", password="password123")
        self.factory = APIRequestFactory()

    # Model Tests
    def test_proper_creation(self):
        """
        Tests if Category objects are properly created with the correct name.
        """
        new_category = create_category("SDN Architecture")

        self.assertEqual(new_category.name, "SDN Architecture")
        self.assertNotEqual(new_category.name, "CDN Architecture")

    # API Endpoint Tests
    def test_list_empty(self):
        """
        Tests the getAllCategories API method.
        """
        request = self.factory.get('api/blog/cate-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllCategories
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [])  # Check for empty list

    def test_create_category(self):
        """
        Tests the createCategory API method
        """
        request = self.factory.post('api/blog/cate-create/', {'name': 'Stocks'}, format='json')
        force_authenticate(request, user=self.test_user)
        view = views.createCategory
        response = view(request)

        self.assertEqual(response.status_code, 201)  # Check for CREATED status code
        self.assertEqual(response.data, {'id': 1, 'name': 'Stocks'})

        request = self.factory.get('api/blog/cate-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllCategories
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [{'id': 1, 'name': 'Stocks'}])

    def test_update_category(self):
        """
        Tests the updateCategory API method
        """
        create_category("Stocks")

        request = self.factory.post('api/blog/cate-update/<str:pk>/', {"name": 'Budgeting'}, format='json')
        force_authenticate(request, user=self.test_user)
        response = views.updateCategory(request, "Stocks")

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, {'id': 1, 'name': 'Budgeting'})

        request = self.factory.get('api/blog/cate-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllCategories
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [{'id': 1, 'name': 'Budgeting'}])

    def test_delete_category(self):
        """
        Tests the deleteCategory API method
        """
        create_category("Stocks")

        request = self.factory.delete('api/blog/cate-delete/<str:pk>/')
        force_authenticate(request, user=self.test_user)
        response = views.deleteCategory(request, "Stocks")

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data,
                         'Category Stocks was successfully deleted.')  # Custom response message from view

        request = self.factory.get('api/blog/cate-list/')
        force_authenticate(request, user=self.test_user)
        view = views.getAllCategories
        response = view(request)

        self.assertEqual(response.status_code, 200)  # Check for OK status code
        self.assertEqual(response.data, [])  # Check for empty list
