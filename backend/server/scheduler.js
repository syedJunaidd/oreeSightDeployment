
const Subscriber = require("./api/v1/subscriber/subscriber.model");
const Users = require('./api/v1/user/user.model');
const Template = require('./api/v1/emailTemplate/emailTemplate.model');
const SentEmail = require('./api/v1/sentEmails/sentEmails.controller');
const crypto = require('crypto');

exports.Job = () => {
    var d = new Date();
    var year = d.getFullYear();
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    var yearWeekNo = (year * 100) + weekNo;

    Template.findOne({
        yearWeekNo: yearWeekNo,
        IsSent: false,
        type: 'email'
    }).then((newsLetter) => {
        if (newsLetter != null) {
            let html = newsLetter.html;
            let css = newsLetter.css;

            Subscriber.find({ 'prefrences.newletter': true }, (error, list) => {
                var emails = list.map(Obj => {
                    var emailsList = [Obj.email];
                    const token = crypto.randomBytes(20).toString('hex');
                    console.log(emailsList);
                    let Content = `<!doctype html><html><head>
          <meta name="viewport" content="width=device-width">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <style>${css}</style>
          </head><body>${html}<div>You are subscribed to email updates from Zo Organized.To stop receiving these emails, you may
          <a target="_blank" href="https://zoorganized.azurewebsites.net/unsubscribe/${token}\n\n"> unsubscribe now.</a></div></body></html>`;
                    SentEmail.sendEmail(emailsList, Content, 'HTML', 'News Letter', token);
                });

            });
            Users.find({ 'prefrences.newletter': true }, (error, list) => {
                var emails = list.map(Obj => {
                    var emailsList = [Obj.email];
                    const token = crypto.randomBytes(20).toString('hex');
                    console.log(emailsList);
                    let Content = `<!doctype html><html><head>
          <meta name="viewport" content="width=device-width">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <style>${css}</style>
          </head><body>${html}<div>You are subscribed to email updates from Zo Organized.To stop receiving these emails, you may
          <a target="_blank" href="https://zoorganized.azurewebsites.net/unsubscribe/${token}\n\n"> unsubscribe now.</a></div></body></html>`;
                    SentEmail.sendEmail(emailsList, Content, 'HTML', 'News Letter', token);
                });
            });
            newsLetter.IsSent = true;
            newsLetter.save(err => {
                if (err) console.log("Error", err);
            });
        }
    });
}