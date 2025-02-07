/*
Youtube Video used to get selenium working properly: 
https://www.youtube.com/watch?v=6XbgNXcLUSE


*/

/*  This test uses an admin's information to login, and assures that the admin lands on the admin dashboard after logging in. 
   This tests is a happy-path test. Future tests could improve on this test by using incorrect admin information.  */

var webdriver = require('selenium-webdriver');
// setup and build selenium driver object 




function TestAdminLogin() {
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
                    console.log("Login Test Passed");
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


TestAdminLogin();