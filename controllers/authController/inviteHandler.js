const mailSender = require("../../middlewares/NodeMailer");

// send invite

const sendEmailInvite = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.json({
        message: "Recipient's email not specified",
      });
    }
    const { email } = req.body;
    const linkFor = "invite";
    const token = "";
    await mailSender(email, token, linkFor);
    res.json({
      message: `An invitation link has been sent to ${email}.`,
    });
  } catch (error) {
    res.json({
      message: `An error occurred while sending an invitation link to ${req.body.email}`,
    });
  }
};
module.exports = { sendEmailInvite };
