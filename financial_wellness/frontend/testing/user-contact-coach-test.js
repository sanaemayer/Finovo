/*
Youtube Video used to get selenium working properly: 
https://www.youtube.com/watch?v=6XbgNXcLUSE


*/

/**
 *   This test tests the contact coach page for the user site. The test script navigtes to the contact coach page using the side bar,
 *  checks the page URL, and checks the presence of page elements and Acuity link. 
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

                    // now we will navigate to the contact coach page 
                    driver.findElement(webdriver.By.id("Contact Coach")).click().then(async function() {


                      setTimeout(() => {
                        return driver.getCurrentUrl().then(function(contactURL) {
                          if (contactURL === "http://localhost:3000/dashboard/contact-coach") {
                            console.log("We are currently at contact coach page");

                            // now we will look for accuity appointment heading 
                            driver.findElement(webdriver.By.id("appt-heading")).getText().then(function(appHeading) {
                              if (appHeading === "Setup an appointment now!") {
                                console.log("The scheduling heading is present");
                                console.log("Waiting for Accuity Embedded link to load, please wait.")

                                // then we will look check if the accuity link is embedded, but we will wait for it to load first 
                                setTimeout(() => {
                                  driver.findElement(webdriver.By.id("embedded-script")).getAttribute("src").then(function(embLink) {
                                    if(embLink === "https://embed.acuityscheduling.com/js/embed.js") {
                                      console.log("Embedded Accuity link is present, and is correct");
                                      console.log("ALL TESTS PASSED");
                                    } else {
                                      console.log("embedded link is incorrect!");
                                    }

                                  });
                        
                                }, 2000);
                              } else {
                                console.log("scheduling heading does not match!");
                              }

                            });
                          } else {
                            console.log("There was some problem accessing the contact coach page");
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