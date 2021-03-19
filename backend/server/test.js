const nodemailer = require("nodemailer");
var schedule = require('node-schedule');
const Subscriber = require("./api/v1/subscriber/subscriber.model");
const Template = require('./api/v1/emailTemplate/emailTemplate.controller');
const axios = require('axios');
const SentEmail = require('./api/v1/sentEmails/sentEmails.controller');
var fs = require('fs');
var j = schedule.scheduleJob("20 * * * *", function () {
    console.log('The answer to life, the universe, and everything!');
    axios.get('http://localhost:9000/api/v1/subscriber').then(resp => {
        var emails = resp.data.map(Obj => {
            var email = {
                senderEmail: Obj.email,
                emailMessage: 'This Email contain news letter Content.\n\n',
            };
            console.log("Email", email);
            SentEmail.create(email);
            return Obj.email;
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'muhammadmueen9692@gmail.com',
                pass: 'ASDF/1234',
            },
        });
        const mailOptions = {
            from: 'muhammadmueen9692@gmail.com',
            to: emails,
            subject: 'Link To Reset Password',
            text: 'This Email contain news letter Content.\n\n',
        };
        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.log('Error here is the res: ', response);
                console.error('there was an error: ', err);
            } else {
                console.log('Success: ', response);
                res.status(200).json('recovery email sent');
            }
        });
    });
});

fs.readFile("./Emailtemplate/email.html", function (error, html) {
    if (error) {
        throw error;
    }

    console.log("html", html);
});