/*
Youtube Video used to get selenium working properly: 
https://www.youtube.com/watch?v=6XbgNXcLUSE


*/

/**
 *  This test logs in as an admin, navigates to the "Create Articles" page, and creates a new test article.
 *  Further, the script posts this article and navigates to "Manage Articles" in order to feature the created test article. Now the script will logout, log in as a user and navigate to the articles tab.
 *  Future tests could improve on this test by assuring that the created test article is displayed as "Featured" on the user side. 
 */

var webdriver = require('selenium-webdriver');
// setup and build selenium driver object 




function TestArticles() {
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
                    console.log("Currently Logged in as Admin");

                    driver.findElement(webdriver.By.id("Create Articles")).click().then(async function() {
                      setTimeout(() => {
                        //  wait for  a second 

                        // Writing a test article
                        driver.findElement(webdriver.By.id("titleInput")).sendKeys("UI Test").then(function() {
                          driver.findElement(webdriver.By.id("categoryInput")).click().then(function() {
                            driver.findElement(webdriver.By.name("Uncategorized")).click().then(function() {
                              driver.findElement(webdriver.By.id("descriptionInput")).sendKeys("This is a UI Test Article").then(function() {
                                driver.findElement(webdriver.By.className("ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred")).sendKeys("This is the UI Test Article Content. :)").then(function() {
                                  driver.findElement(webdriver.By.id("submit-article-button")).click().then(function() {
                                    console.log("Article should be published now");

                                    // now we will go into manage articles 
                                    driver.findElement(webdriver.By.id("Manage Articles")).click().then(async function() {

                                      // waiting for the page to load 
                                      setTimeout(() => {
                                        driver.findElement(webdriver.By.name("UI Test")).click().then(function() {
                                          console.log("The article should be featured now, we can login as a user and see if the article is present or not.")

                                          // logging out 
                                          driver.findElement(webdriver.By.id("admin-logout")).click().then(async function() {
                                            // waiting for a bit
                                            setTimeout(() => {
                                              driver.findElement(webdriver.By.className("btn btn-primary btn-lg mt-5")).click().then(async function() {
                                                console.log("Logged out successfully!");

                                                setTimeout(() => {
                                                  // waiting again for the login page to show up 
                                                  driver.findElement(webdriver.By.id("emailInput")).sendKeys("kvnguyen@ualberta.ca").then(function() {
                                                    driver.findElement(webdriver.By.id("passwordInput")).sendKeys("asdf").then(function() {
                                                      driver.findElement(webdriver.By.id("loginButton")).click().then(async function() {
                                                        

                                                        setTimeout(() => {
                                                          driver.findElement(webdriver.By.id("Articles")).click().then(async function() {

                                                            // now just need to check for the articles showing up 
                                                            console.log("Logged in successfully, and we are articles page now.");

                                                          });

                                                        }, 1000);
                                                        

                                                      });

                                                    });

                                                  });

                                                }, 1000);

                                              });

                                            }, 1000);

                                          });

                                        });

                                      }, 1000);

                                    });
                                  });
                                });


                              });

                            });

                          });

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


TestArticles();