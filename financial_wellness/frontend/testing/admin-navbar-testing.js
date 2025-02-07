/*
Youtube Video used to get selenium working properly: 
https://www.youtube.com/watch?v=6XbgNXcLUSE


*/

/*

  This test tests the side navigation bar for the admin site. All the menu items on the side bar are clicked,
  and whether the appropriate corresponding web-page is loaded or not is being tested. Once all the menu items are tested,
  the logout button is tested and it's assured that we land on the initial page after logging out. 
*/ 

var webdriver = require('selenium-webdriver');
// setup and build selenium driver object 




function TestAdminNavbar() {
  var driver = new webdriver.Builder().forBrowser('chrome').build();

  // navigate to a url, search for a text and get title of page 
  driver.get('http://localhost:3000/').then(function()
  {   
      // clicks on the login button
      driver.findElement(webdriver.By.className("btn btn-primary btn-lg mt-5")).click().then(function()
      {
        // enters test user email 
        driver.findElement(webdriver.By.id("emailInput")).sendKeys("smayer@ualberta.ca").then(function()
        {
          // enters test user password 
          driver.findElement(webdriver.By.id("passwordInput")).sendKeys("asdf").then(function()
          {
            // logs in 
            driver.findElement(webdriver.By.name("loginButton")).click().then(async function()
            {


              // waiting for 7 seconds for the page to load 
              setTimeout(() => {  
                // the test passes if the driver is currently on /admin
                // the test fails otherwise
                // if the test passes, we are currently on admin panel, which means that the login test was successful 
                // this code will execute after 7 seconds of waiting 
                return driver.getCurrentUrl().then(function(currentUrl) {
                  console.log("The current URL is: ", currentUrl);
                  if (currentUrl === "http://localhost:3000/admin") {
                    console.log("Admin is Currently Logged in");

                    driver.findElement(webdriver.By.id("Create Articles")).click().then(async function() {
                      // waiting for the page to load 
                      setTimeout(() => {
                        return driver.getCurrentUrl().then(function(artURL) {
                          if(artURL === "http://localhost:3000/admin/createpost") {
                            console.log("Create Articles Navigation Button Test Passed");

                            // now we will click on manage articles 
                            driver.findElement(webdriver.By.id("Manage Articles")).click().then(async function() {

                              // waiting for the page to load 
                              setTimeout(() => {
                                return driver.getCurrentUrl().then(function(featURL) {
                                  // checking ig we land on manage articles page 
                                  if (featURL === "http://localhost:3000/admin/feature") {
                                    console.log("Manage Articles Navigation Button Test Passed");

                                    driver.findElement(webdriver.By.id("Register Email Addresses")).click().then(async function() {

                                      // wait a bit for page to load 
                                      setTimeout(() => {

                                        return driver.getCurrentUrl().then(function(regURL) {
                                          // checking if we land on register email addresses page 
                                          if(regURL === "http://localhost:3000/admin/emails") {
                                            console.log("Register Email Addresses Navigation Button Test Passed");

                                            //  now we will check out view/edit user info navigation button 
                                            driver.findElement(webdriver.By.id("View/Edit User Info")).click().then(async function() {
                                              // waiting for the page to load 
                                              setTimeout(() => {

                                                return driver.getCurrentUrl().then(function(infoURL) {
                                                  if(infoURL === "http://localhost:3000/admin/userinfo") {
                                                    console.log("View User Info Navigation Button Test Passsed");

                                                    // now we will look at download reports button
                                                    driver.findElement(webdriver.By.id("Download Reports")).click().then(async function() {

                                                      // waiting for the page to load 
                                                      setTimeout(() => {

                                                        return driver.getCurrentUrl().then(function(downloadURL) {

                                                          if (downloadURL === "http://localhost:3000/admin/reports") {
                                                            console.log("Download Reports Navigation Button Test Passed");
                                                            console.log("ALL TESTS PASSED! Logging out!");

                                                            driver.findElement(webdriver.By.id("admin-logout")).click().then(async function() {

                                                              setTimeout(() => {

                                                                return driver.getCurrentUrl().then(function(initPage) {
                                                                  if(initPage === "http://localhost:3000/") {
                                                                    console.log("Admin Log out successfull!");
                                                                  } else {
                                                                    console.log("Admin Log out failed");
                                                                  }
                                                                });

                                                              }, 2000);

                                                            });

                                                        
                                                          } else {
                                                            console.log("Download Reports Navigation Button Test Failed");

                                                          }

                                                        });

                                                      }, 1000);

                                                    });
                                                  } else {
                                                    console.log("View User Info Navigation Button Test Failed");

                                                  }

                                                });

                                              }, 1000);


                                            });
                                          } else {
                                            console.log("Register Email Addresses Navigation Button Test Failed");
                                          }

                                        });

                                      }, 1000);

                                    });
                                  } else {
                                    console.log("Manage Articles Navigation Button Test Failed")
                                  }

                                });


                              }, 1000);

                            });
                    
                          } else {
                            console.log("Create Articles Navigation Button Test Failed");
                          }

                        });

                      }, 1000);

                    });
                  } else {
                    console.log("Unable to Login as Admin!");
                  }
                });
               }, 1000);
      
        
            
              
            });
          });
        });
      });
      
  });
}


TestAdminNavbar();