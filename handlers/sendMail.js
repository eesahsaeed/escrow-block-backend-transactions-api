
const nodemailer = require("nodemailer");
const {transactionTemplate} = require("./email-template");

async function sendMail(email, name, amount){
  try{
    let transporter = nodemailer.createTransport({
      host: "mail.escrow-block.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@escrow-block.com",
        pass: "DeepSky24!"
      }
    });

    let mailOptions = {
      from : '"Transaction Notification" <info@escrow-block.com>',
      to: email,
      subject: "Transaction Notification",
      Text: "Trnsaction Notification",
      html: transactionTemplate(name, amount)
    };

    let info = await transporter.sendMail(mailOptions);
    return info;
  } catch(err){
    console.log(err);
  }
}

module.exports = sendMail;
