/*
Youtube Video used to get selenium working properly: 
https://www.youtube.com/watch?v=6XbgNXcLUSE


*/

var webdriver = require('selenium-webdriver');
// setup and build selenium driver object 

/* This test tests the side navigation bar for the user site. All the menu items on the side bar are clicked, 
and whether the appropriate corresponding web-page is loaded or not is being tested. Once all the menu items are tested, 
the logout button is tested and it's assured that we land on the initial page after logging out. */



function TestUserSidebar() {
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

                    console.log("User is currently logged in! Please wait for the test to continue");

                    // TEST for profile button 
                    // clicking on the profile button in the navar 
                    driver.findElement(webdriver.By.id("Profile")).click().then(async function(){
                      setTimeout(() => {
                        // this code will execute after 2 seconds of waiting 
                        // this checks whether we have landed at the right place or not 
                        return driver.getCurrentUrl().then(function(profileURL) {
                          //console.log("The new profile url is: ", profileURL);
                          if(profileURL === "http://localhost:3000/dashboard/profile") {
                            console.log("Navbar Profile Button Test Passed");

                            // now click the articles button since the profile button is good 
                            driver.findElement(webdriver.By.id("Articles")).click().then(async function() {

                              setTimeout(() => {
                                // this code will execute after 1 second of wait 
                                return driver.getCurrentUrl().then(function(articlesURL) {
                                  if (articlesURL  === "http://localhost:3000/dashboard/articles") {
                                    console.log("Navbar Articles Button Test Passed")  

                                    //now since thea articles button is good, we can move further to contact coach 
                                    driver.findElement(webdriver.By.id("Contact Coach")).click().then(async function() {

                                      setTimeout(() => {
                                        // this code will be executed  after waiting for 1 second
                                        return driver.getCurrentUrl().then(function(coachURL) {
                                          if (coachURL === "http://localhost:3000/dashboard/contact-coach") {
                                            console.log("Navbar Contact Coach Button Test Passed");

                                            // now that the contact coach button works, we can move forward to tools page 
                                            driver.findElement(webdriver.By.id("Financial Tools")).click().then(async function() {

                                              setTimeout(() => {
                                                // this code  will execute after  one second 
                                                return driver.getCurrentUrl().then(function(toolsURL) {
                                                  if (toolsURL === "http://localhost:3000/dashboard/financial-tools") {
                                                    console.log("Navbar Financial Tools Button Test Passed");


                                                    // now since the test for tools button has passed, we can move to help page 
                                                    driver.findElement(webdriver.By.id("Help")).click().then(async function() {
                                                      setTimeout(() => {
                                                        return driver.getCurrentUrl().then(function(helpURL) {
                                                          if (helpURL === "http://localhost:3000/dashboard/help") {
                                                            console.log("Navbar Help Button Test Passed");
                                                            console.log("All Navbar Button Tests Have been passed! Testing Logging Out ...");

                                                            // testing logging out 
                                                            driver.findElement(webdriver.By.id("logout-button")).click().then(async function() {
                                                              setTimeout(() => {
                                                                // the following code will execute after 1 second 
                                                                return driver.getCurrentUrl().then(function(loginURL) {
                                                                  if(loginURL === "http://localhost:3000/") {
                                                                    console.log("Logout succesfull. ALL TESTS PASSED.");
                                                                  } else {
                                                                    console.log("Logout test failed");
                                                                  }

                                                                });
                                                                

                                                              }, 1000);
                                                            });
                                                          } else {
                                                            console.log("Navbar Help Button Test Failed");
                                                          }
                                                        });

                                                      }, 1000);
                                                    });
                                                  } else {
                                                    console.log("Navbar Financial Tools Button Test Failed");
                                                  }
                                                });

                                              });
                                            }, 1000);

                                          } else {
                                            console.log("Navbar Contact Coach Button Test Failed")
                                          }
                                        });
                                      }, 1000);

                                    });

                                  } else {
                                    console.log("Navbar Articles Button Test Failed")
                                  }
                                });
                              }, 1000);

                            });

                          } else {
                            console.log("Navbar Profile Button Test Failed, Not performing further tests")
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


TestUserSidebar();