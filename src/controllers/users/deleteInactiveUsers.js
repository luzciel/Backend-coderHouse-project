const { userServices } = require("../../repositories/index.js");
const handleError = require("../../util/handleError.js");
const { accountDeletionEmail } = require('../../util/nodemailer.js');
const deleteInactiveUsers = async (req, res) => {
  try {
    const days = 2;
    const millisecondsInADay = days * 24 * 60 * 60 * 1000;
    
    const inactiveUsers = await userServices.getInactiveUsers(millisecondsInADay);

    if (inactiveUsers.length === 0) {
      return res
        .status(200)
        .send({ status: "success", payload: "No hay usuarios inactivos" });
    }

    const EmailUser = inactiveUsers.map((user) => {
      let emailUser = user.email
      accountDeletionEmail({email: emailUser});
      return emailUser
    });

    await userServices.deleteUsers(EmailUser);

    res.status(200).send({ status: "success", payload: `Se han eliminado ${inactiveUsers.length} usuarios inactivos. Usuarios eliminados: ${EmailUser}` });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = deleteInactiveUsers;