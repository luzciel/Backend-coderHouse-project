const config = require("../config/config.js");
const nodemailer = require("nodemailer");
const HtmlTemplate = require("./htmlTemplate.js");
console.log("HtmlTemplate",HtmlTemplate);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.USER_EMAIL,
    pass: config.PASS_EMAIL,
  },
});

const sendEmail = ({ correo, message, subject }) => {
  const mailOptions = {
    from: correo,
    to: config.USER_EMAIL,
    subject: subject,
    html: `${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const purchaseConfirmationEmail = ({
  availableProduct,
  createTicket,
  totalTicket
}) => {
  const { purchaser } = createTicket;
  const message = HtmlTemplate.createMessageEmail({
    availableProduct,
    createTicket,
    totalTicket
  });
  const subject = "Confirmacion de compra";

  sendEmail({ emailUser: purchaser, message, subject });
};

module.exports = {
  purchaseConfirmationEmail,
};
