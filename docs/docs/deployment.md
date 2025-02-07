

Prerequisites
=================


Since this codebase will be deployed using AWS in future versions, I am attaching resources for Amazon Web Services' EC2, and [how to get started with using Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/get-set-up-for-amazon-ecs.html).

Once you've created an account with Amazon ECS, you would be required to set up a VM(virtual machine). We will use AWS CodeDeploy, which is a service that automates code deployments to AWS or on-premises servers, to deploy code to virtual machines that we create and manage with Amazon EC2. To read more about the method, refer to the link below. 

[Deploy Code to a Virtual Machine with AWS CodeDeploy](https://aws.amazon.com/getting-started/tutorials/deploy-code-vm/)

Environment Setup
=================


## Following the instructions stated in the link above, use the following system specifications to setup your virtual machine.

### System Settings/Instance Specs to be used while setting up a VM on AWS :

    Flavour Name - m1.medium
    
    Image Name - UBUNTU 18.04

    Flavour ID - 3

    RAM - 4GB

    VCPUs - 2 VCPU

    Disk - 40GB

   **The security groups used for Cyberra were as follows** ![](https://lh6.googleusercontent.com/A2pWJdo52o5uD5Ir3af6BoUu7lsD9_Vph2ik6QbAvmOArRuQTVeRtUaPvwPPrqrMhIazzArpioYKYaQRDmX6TltlpQtxgXBik2gcHttfMSTqCgKE2iNp-OU2CUlnzZMAKmrFce5Z)


**Once you build a VM using the specs above, you will need to install a few things in order to get started.**


## Run these to install docker on your VM.



**To install Docker on an Amazon EC2 instance-** 

1.  Launch an instance with the Amazon Linux 2 or Amazon Linux AMI. For more information, see[  Launching an instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/launching-instance.html) in the Amazon EC2 User Guide for Linux Instances.

2.  Connect to your instance. For more information, see[  Connect to your Linux instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html) in the Amazon EC2 User Guide for Linux Instances.

3.  Update the installed packages and package cache on your instance.

        sudo yum update -y

4.  Install the most recent Docker Engine package.

    Amazon Linux 2

        sudo amazon-linux-extras install docker

    Amazon Linux.

        sudo yum install docker

5.  Start the Docker service.

        sudo service docker start   

6.  Add the ec2-user to the docker group so you can execute Docker commands without using sudo.

        sudo usermod -a -G docker ec2-user

7.  Log out and log back in again to pick up the new docker group permissions. You can accomplish this by closing your current SSH terminal window and reconnecting to your instance in a new one. Your new SSH session will have the appropriate docker group permissions.

8.  Verify that the ec2-user can run Docker commands without sudo.

        docker info

### Once you've installed docker, make sure to also follow up with installing docker-compose

**Clone the Finovo Github repository.**
=================


### Our file structure is as follows -

 ![](https://lh5.googleusercontent.com/VFcXz4uxy6Ezg01ta2fqmEHAP8U5ja-gSVhC4v6jCRDeI89F10Uy3RHEMy5lVEm9fPRf3Xmp2kq8zZ7voHHdXtc_0ZqnwqvSvWzFcw5K1XXQbRRkpfk2w_5ql4rxFxyTdE1LSETt)

![](https://lh4.googleusercontent.com/uyLhSE23aIiEt-u0-_mHGGoVXSkNPiwSU8q89h4MjkBPHoJD-n1XSebFA9HXQRHGGvuSwlBtD4CmQeI7ksZNdrWeqc1alxPmItwlla1v9rYOY9PR5273BOBbEB3KXg2Urs0Um0tQ)



How to run Docker to deploy the site 
=================


**To run docker on your virtual machine, make sure that you have the most updated code from github. After that, we need to go to the folder that has the docker-compose-yml file.**

    cd financial_wellness/financial_wellness/

To make sure that we are not using any old images or volumes in our docker system run these two commands(if you have trouble running any of these commands, just add 'sudo' before these commands. Example - sudo docker volume prune) :

    docker system prune -a

    docker volume prune

To check if there are any previous builds still there in the form of dangling/unused images, just check

    docker -ps a

If you want to close those containers, run

    docker-compose down

And then repeat the system prune and volume prune commands


To run the docker containers, run

    Docker compose-up --build -d

**This will create four containers and you should see them getting created as**

![](https://lh5.googleusercontent.com/Q3v5Ri9K4u1Suogzgw4BdxTp1EAFvHtHLRScXDGdJ7Y5z2LquRi4rPUCAzY05vjjv9utJDhL_sTxXanUenKskPnDFVmoq0bAd44vWp4ZwfgDIyWWsNaXYWFnAoN_HoSRC1cwP9v0)




## Since the migration wasn't set up through docker-compose.yml, we'll run these commands by entering the backend container via bash.


Run *docker -ps a* , and copy the container id.

Then, run

    docker exec -it containerid bash

Here, run

    Python manage.py makemigrations

    Python manage.py migrate

![](https://lh5.googleusercontent.com/7nLn3xDnFMJULxMyZhG_yyA-FdCdpTpKDJw_vd7QnwxfJ6PrtMdpMYKo6zf5y6pSNb_sKLhvAPSKw9TVYbT7HPD8PnBDjjGhiHt8h_o8sKx5-P04bUW_jrhINr3EcMamDpqSBUwX)


**We will create a superuser for the admin. To do that, run**

    Python manage.py createsuperuser

It will prompt you to enter the username, email address and password. Make sure that the USERNAME IS SAME AS EMAIL ADDRESS.


    For example -

    Username - admin@finovo.ca

    Email address - <admin@finovo.ca>

    Password - xxxx

    It will prompt a success message.

    Press CTRL + D to exit the bash shell.

![](https://lh6.googleusercontent.com/gkBiJEwL20bqVx24eLJmtIl8qjRlu3nFSxbqAolO1xt2fSmpm4lZqPXFNnRGeAqryoCmnCIeYAFBGgJJiVR4o2o11MrGD5Q6j4IgevrIYEWRvNtQe8l6RioUvFKW28-5LCFQfi-A)

Now, go to the website that's been setup on your instance. You should be able to see that in your instance details.

For example, in cyberra, it's currently hosted as <http://10.2.9.177>

Once you go to that website, you should be able to LOG IN to the website WITHOUT HAVING TO REGISTER.

To access the django admin console, which is just an easier way to check your database that's already been synced with postgresql. To access that, go to <http://10.2.9.177:8080/admin>.

YOUR USERNAME IS YOUR EMAIL ADDRESS.

Use that to log in to the console.

Go back to your VM, and if you want to close your containers run,

    Docker compose-down

To delete any cache, old images and containers, run

    Docker system prune -a

Make sure to delete volumes as well if you delete old containers. Run,

    Docker volume prune

## To read about how we setup our docker on our website, you can use this resource as this is what we referred to as well

<https://medium.com/swlh/how-to-deploy-django-rest-framework-and-react-redux-application-with-docker-fa902a611abf>

## HTTPS ensures data security over the network - mainly public networks like Wi-Fi. HTTP is not encrypted and is vulnerable to attackers who are eavesdropping and can gain access to website database and sensitive information. By virtue, HTTPS encryption is done bi-directionally, which means that the data is encrypted at both the client and server sides.

Since we are using NGINX with docker, here is the official documentation on how to setup HTTPS while deploying this with future versions. 

https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-http/

https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71

**The above article uses ngnix and letsencrypt service with docker to setup HTTPS for your product. Summazrizing the important parts from the article by Philipp :**

###The Setup

Official images of nginx and an automated build of certbot, the EFF’s tool for obtaining Let’s Encrypt certificates, are available in the Docker library.Include an for certbot in your docker-compsoe.yml

Add this to the volumes list of the nginx section in docker-compose.yml.

    - ./data/certbot/conf:/etc/letsencrypt  
    - ./data/certbot/www:/var/www/certbot

And this is the counterpart that needs to go in the certbot section:

    volumes:
        - ./data/certbot/conf:/etc/letsencrypt
        - ./data/certbot/www:/var/www/certbot

Add this to the first (port 80) section of our nginx configuration (data/nginx/app.conf):

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

After that, we need to reference the HTTPS certificates. Add the soon-to-be-created certificate and its private key to the second server section (port 443). Make sure to once again replace example.org with your domain name.

    ssl_certificate /etc/letsencrypt/live/example.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.org/privkey.pem;

And while we’re at it: The folks at Let’s Encrypt maintain best-practice HTTPS configurations for nginx. Let’s also add them to our config file. 

    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

Download the script to your working directory as init-letsencrypt.sh:

    curl -L https://raw.githubusercontent.com/wmnnd/nginx-certbot/master/init-letsencrypt.sh > init-letsencrypt.sh

Edit the script to add in your domain(s) and your email address. If you’ve changed the directories of the shared Docker volumes, make sure you also adjust the data_path variable as well.

    Then run chmod +x init-letsencrypt.sh and sudo ./init-letsencrypt.sh.


**Automatic Certificate Renewal**

*Last but not least, we need to make sure our certificate is renewed when it’s about to expire. The certbot image doesn’t do that automatically but we can change that!*

Add the following to the certbot section of docker-compose.yml:

    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
In the nginx section, you need to make sure that nginx reloads the newly obtained certificates:

    command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"

Simply run docker-compose up and enjoy your HTTPS-secured website or app"

~excerpts from the article written by Philipp on medium




