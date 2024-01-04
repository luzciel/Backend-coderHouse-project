class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
 
  newUser = async (newUser) => {
    const newCarts = await this.dao.newUser(newUser);
    return newCarts;
  }
  
  getUser = async (email) => {
    const user = await this.dao.getUser(email);
    return user;
  }

  getAllUsers = async () => {
    const users = await this.dao.getAllUsers();
    return users;
  }

  updateUser = async (email, newCarts) => {
    const update = await this.dao.updateUser(email, newCarts);
  }

  getUserId = async (id) => {
    const user = await this.dao.getUserId(id);
    return user;
  }

  updateRole = async (idUser, updateRole) => {
    const user = await this.dao.updateRole(idUser, updateRole);
    return user
  }

  updatePassword = async (email, password) => {
    const user = await this.dao.updatePassword(email, password);
    return user
  }

  updateLastConnection = async (email, currentDate) => {
    const user = await this.dao.updateLastConnection(email, currentDate);
    return user
  }

  updateDocuments = async (email, documents) => {
    const user = await this.dao.updateDocuments(email, documents);
    return user
  }

  getInactiveUsers = async (time) => {
    const user = await this.dao.getInactiveUsers(time);
    return user
  }

  deleteUsers = async (userEmails) => {
    const user = await this.dao.deleteUsers(userEmails);
    return user
  }
}

module.exports = UserRepository