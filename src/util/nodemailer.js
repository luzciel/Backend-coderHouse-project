const config = require("../config/config.js");
const nodemailer = require("nodemailer");
const HtmlTemplate = require("./htmlTemplate.js");

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
  const message = HtmlTemplate.createMessagePurchaseConfirmation({
    availableProduct,
    createTicket,
    totalTicket
  });
  const subject = "Confirmacion de compra";

  sendEmail({ emailUser: purchaser, message, subject });
};

const restorePasswordEmail = ({ email, linkRestore }) => {
  const message = HtmlTemplate.createMessageRestorePassword({ linkRestore });
  const subject = "Restablecer contraseña";
  
  sendEmail({ emailUser: email, message, subject });
};

const accountDeletionEmail = ({ email }) => {
  const message = HtmlTemplate.createMessageAccountDeletion();
  const subject = "Cuenta eliminada por inactividadd";
  
  sendEmail({ emailUser: email, message, subject });
};

const productDeletionEmail = ({ email, productName, code }) => {
  const message = HtmlTemplate.createMessageProductDeletion({productName, code});
  const subject = "Producto eliminado";
  
  sendEmail({ emailUser: email, message, subject });
};
module.exports = {
  purchaseConfirmationEmail,
  restorePasswordEmail,
  accountDeletionEmail,
  productDeletionEmail
};
