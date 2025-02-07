Date: Feb 5th 2021; Edited Feb 10th 2021

Authors: Farish Punjani, Josh Sabet, Khang Nguyen, Sanae Mayer, Tij Sachdeva, Yimage Addus

Below are several aspects of the project defined in detail.


Executive Summary
=========================

This product aims to help employees manage their financial wellness by providing them with the steps they need to take, and resources they can look at to learn more about certain topics, such as investment. Users will fill out a questionnaire to provide us with an understanding of their financial situation, and we provide them recommendations on what to do next. The Users of this product would be employees of the companies that license this product. After signing up and filling out a questionnaire, the User can access a dashboard that houses their recommended tasks, resource links, and potentially financial tools.

Value Proposition example based on google searches: Reduce your financial stress. Quickly get advice on how to improve your situation.


Project Glossary
================

**Assessment Results** - The conclusions derived from the answers a User provides in the Questionnaire.

**Financial Coach/Advisor** - A person that a User can contact in order to talk about their financial situation and consult for advice.

**Financial Tools** - Tools a User can use to quickly calculate specific financial values and/or other information.

**Monthly Report** - A CSV file that contains information pertaining to all Users, individual companies, or individual Users.

**Questionnaire** - A form that contains a series of questions related to various aspects of a person's financial situation.

**Resource** - An educational article that a User can access in order to learn more about a certain topic.

**User** - An employee of a licensed company who is likely experiencing financial stress or would like to learn more about certain financial topics.


User Stories
================

# US 1 - User Account

## US 1.01 - Company Provided Email
> **As a User** <br></br>

> **I want** to be able to sign up using the email provided by my company

> **So that** I can gain access to this service paid for by my company.

Acceptance Tests
- Register account with the correct email address.
- Input email address not associated with any client company and ensure the user cannot register

## 1.02 - Password
> **As a User** <br></br>

>I want to be able to set a password for my account,

>So that my account is secure.

Acceptance Tests
- Password is required on registration.
- Inputting the wrong password does not allow the user to continue.

## US 1.03 - Nickname/Preferred Name
> **As a User** <br></br>
>I want to be able to optionally set a preferred nickname

>So that the site feels a little bit more personalized.

Acceptance Tests
- Nickname is displayed in the User’s Profile
- User can add this information after registration
- User can remove this information after registration
- User can edit this information after registration
- If a nickname exists, it is displayed across the site instead of a more formal First name Last name text.

# US 2 - Login / Logout

## US 2.01 - User Login
> **As a User** <br></br>
>I want to be able to log in to the site

>So that I can use the product.

Acceptance Tests
- Input correct credentials and successfully brought to User Dashboard.
- Input incorrect credentials and ensure the User cannot log in.

## US 2.02 - Admin Login
> **As an admin** <br></br>
>I want to be able to log in to the site

>So that I can perform admin-related tasks.

Acceptance Tests
- Input correct credentials and successfully brought to the Admin Panel.
- Input incorrect credentials and ensure the User cannot log in.

## US 2.03 - Stay Signed in
> **As a User/Admin** <br></br>
>I want to be kept signed into the site on my browser

>So that I don’t have to log in every time I want to access the site.

Acceptance Tests
- Closing browser and reopening and going back to site brings user straight to dashboard
- Only works if user manually check marks they want to stay signed in

## US 2.04 - Manual Logout
> **As a User/Admin** <br></br>	
>I want to be able to log out of the site manually

>So that I’m confident other people can’t have access to the site if they use my machine.

Acceptance Tests
- User is brought to login screen after logging out
- Closing browser and reopening and going back to site brings user to login screen

# US 3 - Questionnaire

## US 3.01 - Initial Questionnaire
> **As a User** <br></br>
>I want to be able to complete a questionnaire after logging in for the first time

>So that I can explain my financial situation and receive recommendations.

Acceptance Tests
- User is brought to questionnaire page after pressing a link on dashboard
- Recommendations are updates (adding new ones)
- Questionnaire can only be completed if all inputs are valid for their question
- Questionnaire can only be completed if all questions have been answered

## US 3.02.1 - Updating Financial Situation 1
> **As a User** <br></br>
>I want to be able update my answers to the questionnaire

>So that I can update my financial situation and receive recommendations based on that updated information.

Acceptance Tests
- Questionnaire can be accessed again and answers can be changed
- Recommendations are updated (whether it’s adding new ones or reprioritizing current ones).
- Questionnaire can only be updated if a field was changed
- Questionnaire can only be updated if all inputs are valid for their question

## US 3.02.2 - Updating Financial Situation 2
> **As a User** <br></br>
>I want to be able update my answers to the sections of the questionnaire that I select instead of the whole questionnaire

>So that I don’t have to go through the whole questionnaire again.

Acceptance Tests
- Sections of the Questionnaire can be accessed again and answers can be changed
- Recommendations are updated (whether it’s adding new ones or reprioritizing current ones).
- Section can only be updated if a field was changed
- Section can only be updated if all inputs are valid for their question

## US 3.03 - Navigating Questionnaire
> **As a User** <br></br>
>I want to be able to go to a different section of the questionnaire by selecting a link from the progress bar at the top of the page

>So that I can quickly go to another part of the questionnaire.

Acceptance Tests
- Bar indicates which sections have been completed.
- By clicking on one of the completed sections of the bar, the user returns to the page associated with that section.

## US 3.04 - Add new Questions
> **As a Admin** <br></br>
>I want to be able to add new questions to the questionnaire

>So that I can get new information if I require it.

Acceptance Tests
- New question appears in the questionnaire in the proper section
- New question has proper input validation

# US 4 - Recommendations

## US 4.01 - Recommendation Prioritization
> **As a User** <br></br>
>I want my recommendations to be prioritized/ranked

>So that I know which ones I should complete first.

Acceptance test
- The top ranked recommendations for a given User is displayed on the Dashboard (based on the information they provided)
- Ranking is consistent with ranking formula we use

## US 4.02 - Add Recommendations
> **As a Admin** <br></br>
>I want to be able to add new Recommendations

>So that the Users can get better/more specific advice.

Acceptance Tests
- New recommendations appears in users’ recommendations section in the dashboard if it applies to them

# US 5 - User Dashboard

## US 5.01 - View Recommendations
> **As a User** <br></br>
>I want to be able to view my top priority recommendations in my dashboard

>So that I have easy access to them.

Acceptance Tests
- Highest ranked recommendations are shown on Dashboard (e.g. top 5)
- Next highest ranked recommendation is shown when one is marked as completed.

## US 5.02 - Navigation
> **As a User** <br></br>
>I want to be able to navigate to other parts of the site

>So that I can use what the site has to offer

Acceptance Tests
- Bookshelf that houses buttons which lead to other pages

## US 5.03 - View Blog Articles
> **As a User** <br></br>
>I want to be able to view some blog articles

>So that I can use them to help me understand a specific topic.

Acceptance Tests
- Featured blog posts shown in dashboard
- Button which takes the user to a new page that houses all blog posts.

## US 5.04 - Contact Financial Advisor
> **As a User** <br></br>
>I want to be able to contact a financial advisor

>So that I can consult them about my financial situation.

Acceptance Tests
- Button which takes the user to a new page that houses information about financial advisors and a link to contact them (acuity)

## US 5.05.1 - View Profile
> **As a User** <br></br>
>I want to be able to view my profile

>So that I can look for any errors.

Acceptance Tests
- Button which takes the user to profile page
- User’s information is displayed
- All of user’s recommendations are displayed, split into completed and in progress

## US 5.05.2 - Edit Profile
> **As a User** <br></br>
>I want to be able to edit my profile

>So that I can change any errors or add/remove information.

Acceptance Tests
- Button which takes the user to profile page
- Edit button to enable editing
- Changes are saved and displayed

## US 5.06 - Contact Support
> **As a User** <br></br>
>I want to be able to contact support

>So that I can consult them about any problems I might be experiencing with the site.

Acceptance Tests
- Email is sent to site administration email (TBD) and contains the text the user inputted.
- Admin sees the message the user sent properly

# US 6 - Administration

## US 6.01.1 - Publish Blog Articles
> **As an admin** <br></br>
>I want to be able to publish new blog posts without code

>So that I can easily provide the Users with information.

Acceptance Tests
- All users should be able to view the blogs posted
- Blog articles contain the proper text and images inputted
- Blog articles have the same format before and after publishing.

## US 6.01.2 - Feature Blog Articles
> **As an admin** <br></br>
>I want to be able to set some articles as ‘featured’

>So that I can easily choose which articles users see first

Acceptance Tests
- All users should be able to view the blogs posted
- Featured articles are pinned at the top of the articles page
- Featured articles are shown on the dashboard
- Only the articles chosen by an admin to be featured are 'featured'

## US 6.02.1 - View List of Users
> **As an admin** <br></br>
>I want to be able to view a list of all the users in the site

>So that I can view their details.

Acceptance Tests
All registered users are shown in the list

## US 6.02.2 - Search list of Users
> **As an admin** <br></br>
>I want to be able to search the list of Users using email address

>So that I can easily find a specific user without having to search the whole list.

Acceptance Tests
- Search bar somewhere on the page
- Only keywords allowed are specific email address strings
- Only the user who matches the inputted email address is shown

## US 6.02.3 - Filter list of Users
> **As admin** <br></br>
>I want to be able to filter the list of users

>So that I can easily view a specific group of users

Acceptance Tests
Filter buttons somewhere on the page
Users are filtered properly

## US 6.03.1 - View Individual User Details
> **As an admin** <br></br>
>I want to be able to view the details of a specific User

>So that I can easily help them if there is any issue with the site.

Acceptance Tests
- The admin should be able to click on the user’s name which should open up their profile

## US 6.03.2 - Edit Individual User Details
> **As an admin** <br></br>
>I want to be able to edit the details of a specific User

>So that I can easily help them if there is any issue with the site.

Acceptance Tests
- The admin should be able to click on the user’s name which should open up their profile, and it should allow the admin to click on any details and edit them 

## US 6.04.1 - Add Email Addresses from Client Companies
> **As an admin** <br></br>
>I want to be able to add the email addresses of employees of client companies

>So that the employees can register through their emails.

Acceptance Tests
- Email address is added to the database
- Nothing is added to the database if it isn’t an email address

## US 6.04.2 - Add Email Addresses from Client Companies by uploading a CSV
> **As an admin** <br></br>
>I want to be able to add the email addresses of employees of client companies through a CSV

>So that I do not have to add email addresses one by one manually.

Acceptance Tests
- All email addresses are parsed correctly and added to the database
- Trying to upload a file that doesn’t contain email addresses (either empty or full of other stuff) does not add anything to the database

## US 6.05.1 - All CSV Reports
> **As an admin** <br></br>
>I want to be able to download monthly CSV reports for all Users

>So that we can be informed about the activity on the system.

Acceptance Tests
- CSV is properly downloaded
- CSV contains the proper information
- contains only Full Name, Company, and if the user logged in

## US 6.05.2 - Per Company CSV Reports
> **As an admin** <br></br>
>I want to be able to download monthly CSV reports per client company

>So that we can inform the company about how our product is affecting them

Acceptance Tests
- CSV is properly downloaded
- CSV contains the proper information
- contains only Full Name, Company, and if the user logged in

## US 6.05.3 - Per User CSV Reports
> **As an admin** <br></br>
>I want to be able to download monthly CSV reports for all Users

>So that we can be informed about a User’s activity on the system.

Acceptance Tests
- CSV is properly downloaded
- CSV contains the proper information
- contains more specific information about an individual user

# US 7 - Financial Tools

## US 7.01 - Retirement Calculator Tool
> **As a user** <br></br>
>I want to be able to calculate when I can retire

>So that I can plan my life.

Acceptance Tests
- User can only activate the tool if all fields contain inputs
- Results can only be calculated if all inputs are valid
- User is brought to a results page if everything is filled out correctly
- Results calculated correctly and displayed

## US 7.02 - Life Insurance Needs Tool
> **As a user** <br></br>
>I want to be able to calculate how much to pay for insurance

>So that I can plan my life.

Acceptance Tests
- User can only activate the tool if all fields contain inputs
- Results can only be calculated if all inputs are valid
- User is brought to a results page if everything is filled out correctly
- Results calculated correctly and displayed

## US 7.03 - Budget Calculator Tool
> **As a user** <br></br>
>I want to be able to calculate my budget<br></br>

>So that I can plan my expenditures.

Acceptance Tests
- User can only activate the tool if all fields contain inputs
- Results can only be calculated if all inputs are valid
- User is brought to a results page if everything is filled out correctly
- Results calculated correctly and displayed

## US 7.04 - Emergency Funds Tool
> **As a user** <br></br>
>I want to be able to calculate how much to save for emergencies<br></br>

So that I can be prepared.

Acceptance Tests
- User can only activate the tool if all fields contain inputs
- Results can only be calculated if all inputs are valid
- User is brought to a results page if everything is filled out correctly
- Results calculated correctly and displayed

## US 7.05 - Debt Pay Down Calculator
> **As a user** <br></br>
>I want to be able to calculate how much and frequently I need to pay my debt down<br></br>

>So that I can be debt free.

Acceptance Tests
- User can only activate the tool if all fields contain inputs
- Results can only be calculated if all inputs are valid
- User is brought to a results page if everything is filled out correctly
- Results calculated correctly and displayed

## US 7.06 - Save Tool Results
> **As a user** <br></br>
>	I want to be able to view the last saved results of the current tool I am using

> So that I can check the results again without having to re-input the same values.

Acceptance Tests
- results are saved for up to 3 months
- Using the same tool provides new results, and these new results override the previously saved results.
- Opening the results shows the correct information
- Users cannot view results of other Users

## US 7.07 - Pre-populated Information
> **As a user** <br></br>
>	I want any fields that I have already answered (from other tools or the questionnaire) to be pre-populated

> So that I don’t have to re-input the same values.

Acceptance Tests
- Fields are pre-populated with the correct information
- Fields that shouldn’t be pre-populated are empty and require input.


User Story Prioritization
================================

Must Have
---------

-   US 1.01 - Company Provided Email

-   US 1.02 - Password

-   US 2.01 - User Login

-   US 2.02 - Admin Login

-   US 3.01 - Initial Questionnaire

-   US 4.01 - Recommendation Prioritization

-   US 5.01 - View Recommendations

-   US 5.02 - Navigation

-   US 5.03 - View Blog Articles

-   US 5.04 - Contact Financial Advisor

-   US 6.01.1 - Publish Blog Articles

-   US 6.02.1 - View List of Users

-   US 6.04.1 - Add Email Addresses from Client Companies

-   US 6.05.1 - All CSV Reports

Should Have
-----------

-   US 1.03 - Nickname/Preferred Name

-   US 2.03 - Stay signed in

-   US 2.04 - Manual Logout

-   US 3.02.1 - Updating Financial Situation 1

-   US 3.02.2 - Updating Financial Situation 2

-   US 3.03 - Navigating Questionnaire

-   US 5.05.1 - View Profile

-   US 5.05.2 - Edit Profile

-   US 5.06 - Contact Support

-   US 6.03.1 - View Individual User Details

-   US 6.03.2 - Edit Individual User Details

-   US 6.04.2 - Add Email Addresses from Client Companies by uploading a CSV

-   US 6.05.2 - Per Company CSV Reports

-   US 6.05.3 - Per User CSV Reports

-   US 7.01 - Retirement Calculator Tool

-   US 7.03 - Budget Calculator Tool

-   US 7.04 - Emergency Funds Tool

-   US 7.06 - Save Tool Results

Could Have
----------

-   US 6.01.2 - Feature Blog Articles

-   US 6.02.2 - Search list of Users

-   US 7.02 - Life Insurance Needs Tool

-   US 7.05 - Debt Pay Down Calculator Tool

-   US 7.07 - Pre-populated Information

Won't Have
----------

-   US 3.04 - Add new Questions

-   US 4.02 - Add Recommendations

-   US 6.02.3 - Filter list of Users


Similar Products
================

1.  LearnLux

2.  My Secure Advantage

3.  Fin Fit

4.  Wealthsimple - advises financial decisions

5.  IBKR - provides practice/information on options trading

6.  Thinkorswim - provides practice/information on options trading

7.  Questrade - Advisory financial tool

8.  Intrinio - financial analysis tool


Open-Source Products
====================

Fusio - https://www.fusio-project.org/ 
--------------------------------------

- provides a deploy mechanism where you only must describe the capabilities of each API endpoint in simple .yaml files 

- App developer can obtain an access token to access non-public API endpoints 

- provides a powerful backend app to control and monitor your API 

- allows you to build API endpoints with minimal coding 

KONGA - https://pantsel.github.io/konga/ 
----------------------------------------

- Works great on desktop browsers, as well as mobile devices and tablets. 

- You can get it running via git or dockerhub 

- Manage APIs, Plugins, Consumers and credentials 

- Easily import users from CSV documents, Databases, Google spreadsheets, APIs 


Technical Resources
===================

## Technologies / Frameworks
-   Backend: Python | Django & DjangoRestFramework + PostgreSQL (after development, SQLite during development)
    - Could potentially use knox for token auth, pandas for working with the CSV files
-   Deployment: Cybera (During development) | Potentially Docker and other deployment services (after development)
-   Frontend: JS / React

## Resources
-   Beginner Django Tutorial series by Corey Schafer: <https://www.youtube.com/playlist?list=PL-osiE80TeTtoQCKZ03TU5fNfx2UY6U4p> 
-   Guide on django authentication: <https://docs.djangoproject.com/en/3.1/topics/auth/default/>
-   Video on creating a basic REST API using djangorestframework by Dennis Ivy: <https://www.youtube.com/watch?v=TmsD8QExZ84>
-   DjangoRESTFramework documentation: <https://www.django-rest-framework.org/>
-   Pandas help & documentation: <https://pandas.pydata.org/docs/getting_started/index.html#getting-started>
-   Beginner tutorial on setting up React with Django by Valentino Gagliardi: <https://www.valentinog.com/blog/drf/>
-   Video on adding a simple Rich Text Editor to django blogs by John from Codemy: <https://www.youtube.com/watch?v=mF5jzSXb1dc>
