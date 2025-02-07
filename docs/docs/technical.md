# Table
To split the tables into different sections, we can divide them into 4 groups: 
User, Blog, Tools and Recommendations:

## User
- User (Django)
- ClientEmployeeInfo 
- UserPersonal
- UserAccounts
- UserAssets
- UserDebt
- UserIncome
- UserInsurance
- UserMindset
  
## Recommendations
- Recommendation
- UserRecommendation

## Blog(Article)
- Category
- Post

## Tools
- LifeInsuranceResults
- BudgetResults
- EmergencyFundResult


# User

## Regular User
In order for a user to be able to register an account, the user information(data) must be in the ClientEmployeeInfo table. Once the user is created in ClientEmployeeInfo, the user can register for an account, and doing so will create a record in the following table:

> User - A table used to list registered users
>
>UserPersonal - A table used for the questionnaire
>
>UserIncome - A table used for the questionnaire 
	
The reason that UserPersonal and UserIncome are created is that two tables have a one-to-one relationship with the User table. More will be explained in the Questionnaire section.

## Admin/SuperUser
An admin account can be created in the Django Console by the following command:

	python manage.py createsuperuser

The command above will be the easiest way to create an admin account, but if a staff account is desired, a user can be created like a regular user above, and changing the “is_staff” field in the User table will ensure that the account is an admin account.


## Token
When a user logs in or registers, the user is given a Token(Access and Refresh token) which is used to authenticate the user upon each API call. An access token has an expiration time of 5 minutes and a refresh token has an expiration time of 24 hours. An access token is used in every API call but whenever the access token expires, it uses the refresh token to refresh the current token, therefore, allowing the user to log in for a maximum of 24 hours. To change the expiration time for each token:

Inside the settings.py you can include ACCESS_TOKEN_LIFETIME or REFRESH_TOKEN_LIFETIME into the SIMPLE_JWT section. 
For more info please visit https://django-rest-framework-simplejwt.readthedocs.io/en/latest/ 


# Questionnaire
A questionnaire can be separated into two parts, One-to-one relationship with the User or Many-to-many relationship with the User: 

## One-to-One:
> UserPersonal & UserIncome
> 
Two tables have a one-to-one relationship with the User table because there aren’t different types of income or personal information. Therefore we only need to keep one information per user. When updating the questionnaire, there is no need to delete a record and create a new one since there is only one record which is why we create an empty record upon user’s registration.

## Many-to-Many:
> UserAssets, UserDebt, UserInsurance, UserMindset
>
Here, UserAssets, UserDebt, and UserInsurance have a many-to-many relationship because, for example, a user can have credit card debt, student loan debt, and vehicle loan debt. A record for each type will have to be created therefore we would need to have many records per user. When a user updates the questionnaire, all of the records in that table are deleted and created as new due to the fact that some type could have been deleted or some type could have been added. UserMindset is a special type of table because although there are no different types of mindset, we create a new record every time a user updates the questionnaire for Financial Coach to look at.
A recommendation will be generated for a user once a questionnaire has been completed.

# Recommendation
Currently, there are around 30 records in the recommendation table with each of them having its own trigger. Most of the recommendation’s triggers are related to the questionnaire's answer except for two recommendations which are created upon registration. An old recommendation will be deleted and a new recommendation will be created when a user updates the questionnaire since it means that the user's financial situation has changed. In the dashboard, we only display the first 6 recommendations by their id. Currently, there are no rankings of the recommendations and if it was to be added in the future, a ranking column will have to be added to the recommendation table, and sorting them by the ranking instead of id will do. All of the recommendations can be viewed on the profile page as well.

A list of recommendation and its trigget can be found here: [Recommendation List](../files/RecommendationList.xlsx)

# Blog(Article)
An article is created by an Administrator and viewed by the User. The articles are just for the users to view (no commenting) and there are two kinds of articles: Featured and Non-featured. When an admin decides to make the article featured articles, they will appear at the top of the article page and in the dashboard. Non-featured articles will only appear on the articles page and users will be able to search for articles by their title or description.

# Tools
Tools are essentially a calculator for the user’s financial need. Currently, there are 4 different tools available: Budget Calculator, Emergency Fund Calculator, Life Insurance Calculator, Debt Payment Calculator. When a user inputs all of the fields needed and presses the calculate result button, it will automatically calculate the result for the user and display it to the user. It will also update the corresponding table so that when a user comes back, the page loads the last saved inputs.

A calculation formula can be found here: [Tools Calculations](../files/ToolsCalculations.xlsx)
