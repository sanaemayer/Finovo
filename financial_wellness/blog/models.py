"""Blog Models

This script contains definitions for models related to the Blog application.

It currently contains the following models:
    Category
    Post
"""

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone, dateparse
from ckeditor.fields import RichTextField

class Category(models.Model):
    """
    A simple model used to represent a Category object.

    Attributes
    ----------
    name : str
        The name of the category. This is unique; prevents duplicate categories.
    """
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    """
    A model used to represent a Post object for articles.

    Attributes
    ----------
    title : str
        The title of the Post.
    author : user
        The user who is the author of the Post.
    content : ckeditor content
        The actual content of the Post.
    description : str
        A short description of the post.
    date_posted : datetime
        The date the Post was created.
    category : str
        The category of the Post.
    isFeatured : bool
        Flag for if the Post is a featured post.
    """
    title = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")  # Post is deleted if author is deleted.
    content = RichTextField(blank=True, null=True)
    description = models.CharField(max_length=255, default=None, null=True)
    date_posted = models.DateTimeField(default=timezone.now)
    category = models.ForeignKey(Category, on_delete=models.SET_DEFAULT, default=1, related_name="posts")  # If category is deleted, set to 'Uncategorized'
    isFeatured = models.BooleanField(default=False)


    def __str__(self):
        return f"{self.title} written by {self.author} on {self.getDate()}"

    def getContent(self):
        """
        Returns the content of the post as a single string. The content itself would contain
        a bunch of HTML tags.
        """
        return str(self.content)

    def getDate(self):
        """
        Returns date_posted in a more readable format, omitting the exact time the post was posted.
        Format: Year-Month-Day
        """
        normal_date = dateparse.parse_datetime(str(self.date_posted))
        return normal_date.date()