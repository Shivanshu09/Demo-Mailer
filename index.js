//We start our code after creating our OAuth2 client and getting all credentials form console.google.cloud.com


//This is basically just the steps that we use to send Email
// When working with frontend we'll use the code in line 16 to define out endpoint and here we are hardcoding the  emails and text but with frontend we will access them using body of req where values will be input from a form

const nodemailer = require ('nodemailer'); //import nodemailer to send emails
const {google} = require('googleapis'); // import lobrary to use google api
const express = require('express');


const OAuth2 = google.auth.OAuth2; 
const app = express();


//app.post('/sendMail', (req,res) => { Our main code here which will include transport function and all })

const client_ID = " Client ID generated on console.cloud.google.com ";
const client_Secret = " Client Secret generated on console.cloud.google.com ";
const refresh_Token = " Refresh Token generated on console.cloud.google.com";
//Setting up client
const oauth2Client = new OAuth2(
    client_ID, // ClientID
    client_Secret, // Client Secret
    "https://developers.google.com/oauthplayground" // URL to redirect
);


// Setting refresh token to generate access token as the access token was valid only for 3600 seconds
oauth2Client.setCredentials({
    refreshToken: "Refresh Token"
});
const accessToken = oauth2Client.getAccessToken();


// Describing how to send mails and providing credentials by creating transport using NODEMAILER

const Transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "your.gmail.here@gmail.com", 
         clientId: client_ID,
         clientSecret: client_Secret,
         refreshToken: refresh_Token,
         accessToken: accessToken
    }
});


//Adding the details from sender to receiver

const mailOptions = {
    from: "Emaail ID",
    to: "All Receiver's email ID",
    subject: "Adding the subject",
    generateTextFromHTML: true,
    html: "<b>Demo Mail</b>"
};

//sending mail using SMTP

Transport.sendMail(mailOptions, (error, response) => { // providing details added above
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
});


