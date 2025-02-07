/*
Youtube Video used to get selenium working properly: 
https://www.youtube.com/watch?v=6XbgNXcLUSE


*/

/** This test tests the profile page for the user site. The test script navigates to the dashboard page using the side bar, 
 *  checks the page URL, and checks the presence of page elements. Future tests could improve on this test by testing user's information, recommendations and buttons. 
 */

var webdriver = require('selenium-webdriver');
// setup and build selenium driver object 



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function TestUserLogin() {
  var driver = new webdriver.Builder().forBrowser('chrome').build();

  // navigate to a url, search for a text and get title of page 
  driver.get('http://localhost:3000/').then(function()
  {   
      // clicks on the login button
      driver.findElement(webdriver.By.className("btn btn-primary btn-lg mt-5")).click().then(function()
      {
        // enters test user email 
        driver.findElement(webdriver.By.id("emailInput")).sendKeys("kvnguyen@ualberta.ca").then(function()
        {
          // enters test user password 
          driver.findElement(webdriver.By.id("passwordInput")).sendKeys("asdf").then(function()
          {
            // logs in 
            driver.findElement(webdriver.By.name("loginButton")).click().then(async function()
            {


              // waiting for 7 seconds for the page to load 
              setTimeout(() => {  
                // the test passes if the driver is currently on /dashboard
                // the test fails otherwise
                // if the test passes, we are currently on dashboard, which means that the login test was successful 
                return driver.getCurrentUrl().then(function(currentUrl) {
                  console.log("The current URL is: ", currentUrl);
                  if (currentUrl === "http://localhost:3000/dashboard") {
                    console.log("Login Test Passed");

                    // click on profile tab 
                    driver.findElement(webdriver.By.id("Profile")).click().then(async function() {
                      setTimeout(() => {
                        return driver.getCurrentUrl().then(function(profileURL) {
                          if (profileURL === "http://localhost:3000/dashboard/profile") {
                            console.log("We are currently at the profile tab");

                            // now we can look for elements within profile tab 
                            return driver.findElement(webdriver.By.id("personal-info-heading")).getText().then(function(infoHeading){

                              // checking if the title says personal information 
                              if (infoHeading === "Personal Information") {
                                console.log("Personal Information Title is present");

                                // looking for the other heading  
                                return driver.findElement(webdriver.By.id("other-heading")).getText().then(function(otherHeading) {
                                  if (otherHeading  === "Other") {
                                    console.log("Other Heading is present");

                                    // now we will check for the user information 
                                    // this is the actual user info, which will change once the website is updated and the information is reflected 
                                    let userNameCheck = "Name";
                                    let userEmailCheck = "Email";
                                    let userPreferredNameCheck = "Preferred Name";
                                    let userCompanyCheck = "Company";

                                    return driver.findElement(webdriver.By.id("user-name")).getText().then(function(userName) {
                                      if (userName === userNameCheck) {
                                        console.log("The User's Legal Name checks out");

                                        // now we will check user's email 
                                        return driver.findElement(webdriver.By.id("user-email")).getText().then(function(userEmail) {
                                          if (userEmail === userEmailCheck) {
                                            console.log("The User's Email checks out");

                                            // now we will check for user's preferred name 
                                            return driver.findElement(webdriver.By.id("user-pref-name")).getText().then(function(userPrefName) {
                                              if (userPrefName === userPreferredNameCheck) {
                                                console.log("The User's Preferred Name checks out");

                                                // now we will check for user's company 
                                                return driver.findElement(webdriver.By.id("user-company")).getText().then(function(userCompany) {
                                                  if (userCompany === userCompanyCheck) {
                                                    console.log("The User's Company checks out");

                                                    // all tests for user information have been passed  
                                                    // tests for button functionalities to be updated when buttons work
                                                    console.log("The User Information is Correct. ALL TESTS PASSED");
                                                    console.log("Buttons will be tested once functionality is completed.");
                                                  } else {
                                                    console.log("User's Company does not match!");
                                                  }

                                                });

                                              } else {
                                                console.log("The User's Prefferd Email does not match!");
                                              }

                                            });
              
                                          } else {
                                            console.log("The User's email does not match!");
                                          }

                                        });
                                      } else {
                                        console.log("The User's Legal Name doesn't match!");
                                      }

                                    });
                                  } else {
                                    console.log("Other Heading is not present");
                                  }

                                });
                              } else {
                                console.log("Personal Information Title is not present");
                              }

                            });

                          } else {
                            console.log("Unable to reach the profile tab");
                          }
                        });
                      }, 1000);
                    });
                  } else {
                    console.log("Login Test Failed!");
                  }
                });
               }, 1000);
      
        
            
              
            });
          });
        });
      });
      
  });
}


TestUserLogin();7