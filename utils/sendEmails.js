const nodeMailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailInfo = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailInfo);
    console.log("Email Sent" + info.response);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;
