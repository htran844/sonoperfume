const nodemailer = require("nodemailer");
const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

module.exports.sendmail = async (email, subject, htmlcontent) => {
  try {
    let mailOptions = {
      from: process.env.GMAIL_ACCOUNT,
      to: email,
      subject: subject,
      html: htmlcontent,
    };
    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
        res.end("error");
      } else {
        res.end("sent");
      }
    });
  } catch (error) {
    throw error;
  }
};
