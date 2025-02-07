"""Users Serializers

This script contains definitions for serializers related to the Users application.

It currently contains the following serializers:
    ClientEmployeeInfoSerializer
    UserSerializer
    UserSerializerWithToken
    UserAssetsSerializer
    UserDebtSerializer
    UserIncomeSerializer
    UserAccountsSerializer
    UserInsuranceSerializer
    UserPersonalSerializer
    UserMindsetSerializer
"""

from rest_framework.relations import PrimaryKeyRelatedField
from .models import UserDebt, UserPersonal, UserIncome, UserInsurance, UserAssets, UserAccounts, UserMindset, ClientEmployeeInfo
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken


class ClientEmployeeInfoSerializer(serializers.ModelSerializer):
    """
    A simple serializer for the ClientEmployeeInfo model.
    """
    class Meta:
        model = ClientEmployeeInfo
        fields = ('first_name', 'last_name',
                  'email', 'company', 'account_type', 'user', 'preferred_name', 'login_count')

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    """
    A simple serializer for the User model. Used for login. Has an extra field for preferred name.
    """
    info = serializers, PrimaryKeyRelatedField(
        queryset=ClientEmployeeInfo.objects.all())
    personal = serializers.PrimaryKeyRelatedField(
        queryset=UserPersonal.objects.all())
    mindset = serializers.PrimaryKeyRelatedField(
        many=True, queryset=UserMindset.objects.all())
    assets = serializers.PrimaryKeyRelatedField(
        many=True, queryset=UserAssets.objects.all())
    accounts = serializers.PrimaryKeyRelatedField(
        many=True, queryset=UserAccounts.objects.all())
    debt = serializers.PrimaryKeyRelatedField(
        many=True, queryset=UserDebt.objects.all())
    income = serializers.PrimaryKeyRelatedField(
        many=True, queryset=UserIncome.objects.all())
    insurance = serializers.PrimaryKeyRelatedField(
        many=True, queryset=UserInsurance.objects.all())
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    preferred_name = serializers.SerializerMethodField()
    login_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'is_active', 'username', 'first_name', 'last_name', 'preferred_name', 'email', 'info', 'personal',
                  'mindset', 'assets', 'accounts', 'debt', 'income', 'insurance', 'is_staff', 'login_count', 'last_login')

    @staticmethod
    def get_first_name(instance):
        """

        Parameters
        ----------
        instance : User
            The instance given to the serializer.

        Returns
        -------
            Returns the user's first name.
        """
        user = User.objects.get(id=instance.id)
        return user.info.first_name

    @staticmethod
    def get_last_name(instance):
        """

        Parameters
        ----------
        instance : User
            The instance given to the serializer.

        Returns
        -------
            Returns the user's last name.
        """
        user = User.objects.get(id=instance.id)
        return user.info.last_name

    @staticmethod
    def get_preferred_name(instance):
        """

        Parameters
        ----------
        instance : User
            The instance given to the serializer.

        Returns
        -------
            Returns the user's preferred name or None.
        """
        user = User.objects.get(id=instance.id)
        if user.info.preferred_name:
            return user.info.preferred_name
        else:
            return None

    @staticmethod
    def get_login_count(instance):
        """

        Parameters
        ----------
        instance : User
            The instance given to the serializer.

        Returns
        -------
            Returns the user's login count
        """
        user = User.objects.get(id=instance.id)
        return user.info.login_count

    @staticmethod
    def get_recommendations(instance):
        user = User.objects.get(id=instance.id)
        recommendations = {}
        for i in range(len(user.recommendation_set.values_list())):
            recommendations['i'] = user.recommendation_set.values_list()[i]
        return recommendations


class UserSerializerWithToken(serializers.ModelSerializer):
    """
    A simple serializer for the User model.
    Used for handling signing up (completing the account registration process)
    """
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    @classmethod
    def get_token(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'email', 'username', 'password', 'is_staff')


class UserAssetsSerializer(serializers.ModelSerializer):
    """
    A simple serializer for the UserAssets model.
    """
    class Meta:
        model = UserAssets
        fields = ('id', 'user', 'type', 'value')


class UserDebtSerializer(serializers.ModelSerializer):
    """
    A simple serializer for the UserDebt model.
    """
    class Meta:
        model = UserDebt
        fields = ('id', 'user', 'type', 'amount',
                  'interest', 'monthly_payment')


class UserIncomeSerializer(serializers.ModelSerializer):
    """
    A simple serializer for the UserIncome model.
    """
    class Meta:
        model = UserIncome
        fields = ('id', 'user', 'value')


class UserAccountsSerializer(serializers.ModelSerializer):
    """
    A simple serializer for the UserAccounts model.
    """
    class Meta:
        model = UserAccounts
        fields = ('id', 'user', 'type', 'value', 'desc')


class UserInsuranceSerializer(serializers.ModelSerializer):
    """
    A simple serializer for the UserInsurance model.
    """
    class Meta:
        model = UserInsurance
        fields = ('id', 'user', 'type', 'policy_type', 'benefit', 'premium')


class UserPersonalSerializer(serializers.ModelSerializer):
    """
    A simple serializer for the UserPersonal model. Contains info pertaining to Misc section as well.
    """
    class Meta:
        model = UserPersonal
        fields = ('id', 'user',  'province', 'city', 'fin_goal', 'marital_status', 'number_of_children', 'budget', 'updated_will', 'credit_score', 'automated_savings',
                  'power_attorney', 'personal_directive', 'automated_bills', 'household_inventory', 'finance_check', 'pass_manager', 'financial_holdings_inventory', 'review_beneficiaries', 'old_paperwork', 'organized_documents', 'credit_report', 'overwhelmed', 'pass_manager')


class UserMindsetSerializer(serializers.ModelSerializer):
    """
    A simple serializer for the UserMindset model.
    """
    readable_date = serializers.SerializerMethodField()

    class Meta:
        model = UserMindset
        fields = ('id', 'user', 'stress', 'feeling',
                  'risk_tol', 'willingness', 'date_created', 'readable_date')

    @staticmethod
    def get_readable_date(instance):
        """
        Parameters
        ----------
        instance : UserMindset
            The instance given to the serializer.

        Returns
        -------
            A string containing the article's posted date in a more readable format.
        """
        return instance.getDate()
