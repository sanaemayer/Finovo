/*
Youtube Video used to get selenium working properly: 
https://www.youtube.com/watch?v=6XbgNXcLUSE


*/


/*
  This test tests the help page for the user site. The test script navigates to the dashboard page using the side bar, 
  checks the page URL, and checks the presence of page elements. The script also sends out a test email to our client using
  the contact form. 
*/ 
var webdriver = require('selenium-webdriver');
// setup and build selenium driver object 





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

                    driver.findElement(webdriver.By.id("Help")).click().then(async function() {
                      
                      // we are at the help page, but we will wait for it to load 
                      setTimeout(() => {

                        return driver.getCurrentUrl().then(function(helpURL) {
                          if (helpURL === "http://localhost:3000/dashboard/help"){
                            console.log("We are currently at the help page");

                            // now we can look for other elements on this page 
                            driver.findElement(webdriver.By.id("faq-head")).getText().then(function(faqHead) {
                              if (faqHead === "F.A.Q") {
                                // FAQs are present in the help section 
                                console.log("FAQ Heading is present");

                                // now we can move on to testing the contact form 
                                driver.findElement(webdriver.By.id("contact-head")).getText().then(function(contactHead) {

                                  if (contactHead === "Contact Us") {
                                    console.log("Contact Us heading is present");

                                    // now we will fill out the form to test it out 
                                    driver.findElement(webdriver.By.id("supportEmailInput")).sendKeys("UItest@test.com").then(function() {
                                      driver.findElement(webdriver.By.id("supportEmailTextArea")).sendKeys("This is a Message to test the UI funcitonality. Please Ignore.").then(function() {
                                        driver.findElement(webdriver.By.id("submit-help-button")).click().then(function() {
                                          console.log("Test Email Sent");
                                          console.log("ALL TESTS PASSED.");

                                        });

                                      });

                                    });

                                  } else {
                                    console.log("Contact US heading does not match");
                                  }

                                });
                              } else {
                                console.log("FAQ Heading is not present");
                              }

                            });
                          } else {
                            console.log("We are not currently at the help page");
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


TestUserLogin();