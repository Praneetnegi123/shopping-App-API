//! nodemaler strart
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
// const user = require("../modal/userDB");

let eMail = (email, text) => {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "praneetn47@gmail.com",
        pass: "prateek@123Praneet",
      },
    })
  );

  var mailOptions = {
    from: "praneetn47@gmail.com",
    to: `${email}`,
    subject: "verify",
    text: `http://${text}`,
    // attachments: [{
    //   filename: 'alians.pdf',
    //   path: '/home/root1/Desktop/praneetAll/backEnd/invoice/Alians_invoice.pdf',
    //   contentType: 'application/pdf'
    // }]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
//! nodemailer end`

// eMail("praneetnegi01@gmail.com", "check")

module.exports = eMail;
