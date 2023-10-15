class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
 
  newUser = async (newUser) => {
    const newCarts = await this.dao.newUser(newUser);
    return newCarts;
  }
  
  getUser = async (id) => {
    const user = await this.dao.getUser(id);
    return user;
  }

  updateUser = async (email, newCarts) => {
    const update = await this.dao.updateUser(email, newCarts);
  }

  getUserId = async (id) => {
    const user = await this.dao.getUserId(id);
    return user;
  }
}

module.exports = UserRepository