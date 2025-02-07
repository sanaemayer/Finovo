/*
Youtube Video used to get selenium working properly: 
https://www.youtube.com/watch?v=6XbgNXcLUSE


*/

/**
 * This test tests the dashboard page for the user site. The test script navigates to the dashboard page using the side bar,
 * checks the page URL, and checks page elements. 
 * Future tests could improve on this test by testing the Recommendations. 
 */

var webdriver = require('selenium-webdriver');
// setup and build selenium driver object 



function TestUserDashboard() {
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
                    console.log("The User is currently logged in");

                    // now we can move to further test since the user is logged in 
                    driver.findElement(webdriver.By.id("Home")).click().then(async function() {

                      setTimeout(() => {

                        // the following code will run after waiting for 1 second 
                        return driver.getCurrentUrl().then(function(homeURL) {
                          // making sure that the home button works 
                          if (homeURL === "http://localhost:3000/dashboard") {
                            console.log("We are at the dashboard page");

                            // now we can check for other things 
                            // checking for recommendations title 
                            return driver.findElement(webdriver.By.id("recommendations-title")).getText().then(function(recText) {
                              if (recText === "Recommendations") {
                                console.log("Recommendations Title is present")

                                // now since recommendations is present, we can look wether a progress bar title is present or not
                                return driver.findElement(webdriver.By.id("progress-head")).getText().then(function(progText) {
                                  if (progText === "Progress") {
                                    console.log("Progress Title is present");

                                    // now since the progress title is present, we will see if the featured articles test is present
                                    return driver.findElement(webdriver.By.id("featured-articles-heading")).getText().then(function(featText) {
                                      if (featText === "Featured Articles") {
                                        console.log("Featured Articles  title is present");
                                        console.log("Dashboard Test V1 Complete - ALL TESTS PASSED");
                                        console.log("More tests will be added as the website updated");
                                      } else {
                                        console.log("Feartured Articles title is not present")
                                      }
                                    });
                                  } else {
                                    console.log("Progress Title is not present")
                                  }

                                });
                              } else {
                                console.log("Recommendations Title is not present")
                              }

                            });

                          } else {
                            console.log("Something went wrong, we are not currently at dashboard.")
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


TestUserDashboard();