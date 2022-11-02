const sgMail = require('@sendgrid/mail')
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const mail = { ...data, from: "testusermail@meta.ua" };
    await sgMail.send(mail);
    return true;
};

// const msg = {
//     from: "testusermail@meta.ua",
//     to: "geniukne@gmail.com",
//     subject: 'Sending with SendGrid is Fun',
//     // text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

module.exports = sendEmail;