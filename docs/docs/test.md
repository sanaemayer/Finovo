We did not get backend tests done for the following apps: Recommendations, Tools. This is due to not having enough time left to get them done. Other priorities were considered instead. Some frontend functionalities weren't tested due to the same reason. Future frontend tests (incomplete frontend tests) have been mentioned at the end with detailed descriptions.

# Backend Tests
The following tests are automated by GitHub Actions:
## Post Object
   Model Tests
   --------------
   test_proper_creation_no_content()
   
   test_proper_creation_content()
   
   test_proper_creation_everything()

   API Endpoint Tests
   -------------------
   test_list_empty()
   
   test_create_post()
   
   test_update_post()
   
   test_delete_post()
   
   test_delete_all_posts_by_user()

## Category Object
   Model Tests
   -------------
   test_proper_creation()

   API Endpoint Tests
   ----------------------
   test_list_empty()
   
   test_create_category()
   
   test_update_category()
   
   test_delete_category()

## ClientEmployeeInfo Object
   Model Tests
   --------------
   test_proper_creation_initial()
   
   test_proper_update_object()

   API Endpoints Tests
   ---------------------
   test_list_empty()
   test_get_single_empty()
   test_create_CEI()
   test_company_create_CEI()
   test_update_CEI()
   test_delete_CEI()
   test_delete_CEI_company()

## User Object + User-related Objects
   Model Tests
   --------------
   test_user_created_properly()
   
   test_user_personal()
   
   test_user_mindset()
   
   test_user_accounts()
   
   test_user_assets()
   
   test_user_debt()
   
   test_user_income()
   
   test_user_insurances()

   API Endpoint Tests
   ----------------------
   test_list_users()
   
   test_list_single_user()
   
   test_delete_single_user()
   
   test_get_user_personal_empty()
   
   test_get_user_accounts_empty()
   
   test_get_user_assets_empty()
   
   test_get_user_debt_empty()
   
   test_get_user_income_empty()
   
   test_get_user_insurance_empty()
   
   test_get_user_mindset_all_empty()
   
   test_get_user_mindset_latest_empty()

# Frontend Tests
The following tests are performed using Selenium Automation Webdriver (using both JavaScript and Python scripts):

## How to run UI Tests

   0. Make sure all the requirements in requirements.txt are installed
   1. Run "yarn start" on frontend 
   2. Open the Django server and login as admin 
   3. Now navigate to /frontend/testing
   4. In order to run a file "test.js" run the command "node test.js"
   5. The results for wether the test has been passed or failed will be displayed in the terminal 
   6. You might have to wait ~7-9 seconds for test results to appear due to timeouts 


## Login UI Testing
   User Login Test: frontend/testing/user-login-test.js
   --------------
   This test uses a registered user's information to login, and assures that the user lands on the user dashboard after logging in.
   This test is a happy-path test. Future tests could improve on this test by using incorrect user information.

   Admin Login Test: frontend/testing/admin-login-test.js
   --------------
   This test uses an admin's information to login, and assures that the admin lands on the admin dashboard after logging in. 
   This tests is a happy-path test. Future tests could improve on this test by using incorrect admin information. 

## User Site Testing 
   User Navbar Test: frontend/testing/user-navbar-testing.js
   --------------
   This test tests the side navigation bar for the user site. All the menu items on the side bar are clicked, and whether the appropriate corresponding web-page is loaded or not is being tested. Once all the menu items are tested, the logout button is tested and it's assured that we land on the initial page after logging out. 

   User Dashboard Test: frontend/testing/user-dashboard-testing.js
   --------------
   This test tests the dashboard page for the user site. The test script navigates to the dashboard page using the side bar, checks the page URL, and checks page elements. Future tests could improve on this test by testing the Recommendations. 

   User Profile Test: frontend/testing/user-profile-testing.js
   --------------
   This test tests the profile page for the user site. The test script navigates to the dashboard page using the side bar, checks the page URL, and checks the presence of page elements. Future tests could improve on this test by testing user's information, recommendations and buttons. 

   Contact Coach Test: frontend/testing/user-contact-coach-test.js
   --------------
   This test tests the contact coach page for the user site. The test script navigtes to the contact coach page using the side bar, checks the page URL, and checks the presence of page elements and Acuity link. 

   Help Page Test: frontend/testing/user-help-test.js
   --------------
   This test tests the help page for the user site. The test script navigates to the dashboard page using the side bar, checks the page URL, and checks the presence of page elements. The script also sends out a test email to our client using the contact form. 

## Admin Site Testing
   Admin Navbar Test: frontend/testing/admin-navbar-testing.js
   --------------
   This test tests the side navigation bar for the admin site. All the menu items on the side bar are clicked, and whether the appropriate corresponding web-page is loaded or not is being tested. Once all the menu items are tested, the logout button is tested and it's assured that we land on the initial page after logging out. 

   Register Email Addresses Test: frontend/testing/admin-register-testing.js
   --------------
   This test tests the Register Email Addresses page for the admin site. The test script navigates to the Register Email Addresses page, checks the page URL and checks for the presence of page elements. Further, the script uses the manual entry form to register a test user. The test could be further improved by going to the View/Edit User Info page to check whether the created test user shows up there or not. 

## Articles Testing 

   Articles Creation and Featuring: frontend/testing/articles-test.js
   --------------  
   This test logs in as an admin, navigates to the "Create Articles" page, and creates a new test article. Further, the script posts this article and navigates to "Manage Articles" in order to feature the created test article. Now the script will logout, log in as a user and navigate to the articles tab. Future tests could improve on this test by assuring that the created test article is displayed as "Featured" on the user side. 

## Questionnaire Testing

   User Questionnaire Testing: frontend/testing/userQuestionnaireTests.py
   --------------  
   This test tests the Questionnaire. The script first tests the navigation functionality for different menu items in the questionnaire. Further, the script sends test input in the questionnaire fields while navigating through different section of the questionnaire. 

## Tests for Future Development (Incomplete Tests)

   Improvements Mentioned in Test Descriptions
   -------------- 
   The description of each completed test has information about what more could be added to these tests to improve them.

   Edit Articles and Delete Articles Test (Admin and User Side)
   -------------- 
   More tests could be added in the future to test the "Edit Article" functionality, and the same script could test the deletion of the articles. 

   View/Edit User Information (Admin Side)
   -------------- 
   The View/Edit User page could be checked by creating test users (from existing tests). Further, the search functionality present on this page could be tested as well. 

   Download Reports (Admin Side)
   --------------   
   Only the navigation for this page has been tested. Future tests could check the elements and buttons of this page. 

   Articles Search Test(User Side)
   --------------
   The search bar functionality on the Articles pages could be tested in the future. A script could be used to test searching using titles, keywords and date-posted. 








   























