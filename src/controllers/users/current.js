const UserCurrent = require("../../dao/DTOs/userCurrent.dto");
const current = async (req, res) => { 
  const dataUser = req.user;
  const data = new UserCurrent(dataUser);
  res.send(data);
}
module.exports = current;