/*
Youtube Video used to get selenium working properly: 
https://www.youtube.com/watch?v=6XbgNXcLUSE


*/

/* This test uses a registered user's information to login, and assures that the user lands on the user dashboard after logging in.
   This test is a happy-path test. Future tests could improve on this test by using incorrect user information. */

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
                  } else {
                    console.log("Login Test Failed!");
                  }
                });
               }, 7000);
      
        
            
              
            });
          });
        });
      });
      
  });
}


TestUserLogin();