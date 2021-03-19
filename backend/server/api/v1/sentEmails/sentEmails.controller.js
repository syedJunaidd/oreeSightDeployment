const Emails = require('./sentEmails.model');
const nodemailer = require("nodemailer");


const { validationError, handleError, handle404 } = require('../../../components/errors');

exports.create = newEmail => {
  Emails.create(newEmail, (error, data) => {
    if (error)
      console.log("Some Error Occured");
  });
}

exports.sendEmail = async (emails, text, type, Subject, token) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: 'constology@gmail.com',
        pass: 'Constology2020'
      },
    });
    const mailOptions = {
      from: 'Nodemation Automation',
      to: emails,
      subject: Subject,
      text: type == 'Text' ? text : null,
      html: type == 'HTML' ? text : null,
    };
    transporter.sendMail(mailOptions)
    .then(() => {
      console.log("success")
    })
    .catch((error) => console.error(error));

    emails.map(async (item) => {
      var email = {
        senderEmail: item,
        emailMessage: text,
        token: token,
      };
      await Emails.create(email);
    });
  } catch (ex) {
    throw ex;
  }
}


exports.GetEmail = (request, response) => {
  const token = request.params.token;
  Emails.findOne({
    token: token,
  }).then((email) => {
    if (email == null) {
      response.status(403).send('email does not found');
    } else {
      response.status(200).send({
        email: email.senderEmail,
      });
    }
  });
}

