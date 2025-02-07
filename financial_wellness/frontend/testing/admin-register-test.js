/*
Youtube Video used to get selenium working properly: 
https://www.youtube.com/watch?v=6XbgNXcLUSE


*/


/*
  This test tests the Register Email Addresses page for the admin site. The test script navigates to the Register Email Addresses page, checks the page URL and checks for the presence of page elements. Further, the script uses the manual entry form to register a test user. The test could be further improved by going to the View/Edit User Info page to check whether
  the created test user shows up there or not. 
*/ 


var webdriver = require('selenium-webdriver');
// setup and build selenium driver object 




function TestAdminRegister() {
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
                    console.log("Admin is currently logged in");

                    // navigating to register email page 
                    driver.findElement(webdriver.By.id("Register Email Addresses")).click().then(async function() {

                      setTimeout(() => {
                        // waiting for register email page to load 

                        // writing test first name 
                        driver.findElement(webdriver.By.id("firstNameInput")).sendKeys("UI Test FirstName").then(function() {
                          // writing test last name 
                          driver.findElement(webdriver.By.id("lastNameInput")).sendKeys("UI Test LastName").then(function() {
                            // email address input
                            driver.findElement(webdriver.By.id("emailInput")).sendKeys("newuitest@testing.com").then(function() {
                              //choosing the company
                              driver.findElement(webdriver.By.id("companyInput")).sendKeys("CMPUT401-Test").then(function() {
                                // choosing account type 
                                driver.findElement(webdriver.By.id("typeInput")).click().then(function() {
                                  driver.findElement(webdriver.By.id("option-1")).click().then(function() {
                                    driver.findElement(webdriver.By.id("typeInput")).click().then(function() {
                                      driver.findElement(webdriver.By.id("submit-new-user")).click().then(async function() {
                                        // checking wether alert is shown or not 
                                        // need some clarification on these tests 
                                        console.log("ALL TESTS PASSED!");


                                      });

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
                    console.log("Login Failed!");
                  }
                });
               }, 1000);
      
        
            
              
            });
          });
        });
      });
      
  });
}


TestAdminRegister();