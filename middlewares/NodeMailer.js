const nodemailer = require("nodemailer");
const mailSender = async (emailToSendTo, tkn, linkIdentifier, subject) => {
  // create reusable transporter object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.APP_EMAIL}`,
      pass: `${process.env.APP_EMAIL_PWD}`,
    },
  });

  const emailBody = messageHandler(tkn, linkIdentifier);

  const mailOptions = {
    from: `${process.env.APP_EMAIL}`,
    to: emailToSendTo,
    subject: `${subject}`,
    // a link to a front-end route that consumes reset route
    html: `${emailBody}
    `,
  };

  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return err;
    } else {
      return info;
    }
  });
};

const messageHandler = (tkn, linkID) => {
  if (linkID === "pwdReset") {
    return ` <b>Click the link below to reset your Device Zone's password</b>
    <br>
    <p> ${process.env.CLIENT_URL}/pwdreset/reset/${tkn}</P>`;
  } else if (linkID === "activation") {
    return ` <b>Click the link below to activate your Device Zone's Account</b>
    <br>
    <p> ${process.env.CLIENT_URL}/authentication/activate/${tkn}</P>`;
  } else if (linkID === "invite") {
    return ` <b>You have been invited to Know More, click the link below to activate your account</b>
    <br>
    <p> ${process.env.CLIENT_URL}/authentication/activate/>`;
  } else if (linkID === "Subscription") {
    return ` <b>A new device has been added to the device store</b>
    <br>
    <p> ${process.env.CLIENT_URL}/${tkn}</P>`;
  }
  return "Nothing";
};

module.exports = mailSender;
