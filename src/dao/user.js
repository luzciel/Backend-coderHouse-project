const { userModel } = require("../dao/models/user.modelo.js");

class User {
  constructor() {}

  newUser = async (user) => {
    try {
      const newUser = await userModel.create(user);
      return newUser;
    }catch(error){
      console.error(error)
    }
  }

  getUser = async (email) => {
    try {
      const user = await userModel.findOne({ email: email })
      return user
    } catch (error) {
      console.error(error)
    }
  }

  updateUser = async (email, newCarts) => {
    try {
      const update = { $set: { cart: newCarts._id } };
      await userModel.updateOne({ email } , update);
      return update
    } catch (error) {
      
    }
  }

  getUserId = async (id) => {
    try {
       let user = userModel.findById(id);
      return user;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = User