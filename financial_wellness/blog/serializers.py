"""Blog Serializers

This script contains definitions for serializers related to the Blog application.

It currently contains the following serializers:
    CategorySerializer
    PostSerializer
"""

from rest_framework import serializers
from .models import Post, Category
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    """
    A simple serializer for the Category model.
    """
    class Meta:
        model = Category
        fields = ('id', 'name')

class PostSerializer(serializers.ModelSerializer):
    """
    A simple serializer for the Post model. Has additional attributes/fields.
    """
    class Meta:
        model = Post
        fields = '__all__'


class PostExtraSerializer(serializers.ModelSerializer):
    """
    A simple serializer for the Post model. Has additional attributes/fields.
    """
    readable_date = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    # @staticmethod
    def get_readable_date(self,instance):
        """
        Parameters
        ----------
        instance : Post
            The instance given to the serializer.

        Returns
        -------
            A string containing the article's posted date in a more readable format.
        """
        return instance.getDate()

    # @staticmethod
    def get_author_name(self,instance):
        """

        Parameters
        ----------
        instance : Post
            The instance given to the serializer.

        Returns
        -------
            Returns the author's first and last name, separated by a space.
        """
        author_object = User.objects.get(id=instance.author.id)
        return f"{author_object.info.first_name} {author_object.info.last_name}"

    # @staticmethod
    def get_category_name(self,instance):
        """

        Parameters
        ----------
        instance : Post
            The instance given to the serializer.

        Returns
        -------
            Returns the category's name
        """
        category_object = Category.objects.get(id=instance.category.id)
        return category_object.name

