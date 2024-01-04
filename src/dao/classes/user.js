const { compareSync } = require("bcrypt");
const { userModel } = require("../models/user.modelo.js");

class User {
  constructor() {}

  newUser = async (user) => {
    try {
      const newUser = await userModel.create(user);
      return newUser;
    } catch (error) {
      console.error(error);
    }
  };

  getUser = async (email) => {
    try {
      const user = await userModel.findOne({ email: email });
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  getAllUsers = async () => {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      console.error(error);
    }
  };
  
  updateUser = async (email, newCarts) => {
    try {
      const update = { $set: { cart: newCarts._id } };
      await userModel.updateOne({ email }, update);
      return update;
    } catch (error) {}
  };

  getUserId = async (id) => {
    try {
      let user = userModel.findById(id);
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  updateRole = async (idUser, updateRole) => {
    try {
      const user = await userModel.updateOne(
        { _id: idUser },
        { $set: { role: updateRole } }
      );

      return user;
    } catch (error) {
      console.error(error);
    }
  };

  updatePassword = async (email, password) => {
    try {
      const user = await userModel.updateOne({ email }, { $set: { password } });

      return user;
    } catch (error) {
      console.error(error);
    }
  };

  updateLastConnection = async (email, currentDate) => {
    try {
      const user = await userModel.updateOne(
        { email },
        {
          $set: { last_connection: currentDate },
        }
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  updateDocuments = async (uid, newDocuments) => {
    try {
      const user = await userModel.updateOne(
        { _id: uid },
        { $push: { documents: { $each: newDocuments } } },
        { new: true }
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  getInactiveUsers = async (time) => {
    console.log(333)
    try {
      const users = await userModel.find({ last_connection: { $lt: Date.now() - time }});
      return users;
    } catch (error) {
      console.error(error);
    }
  };

  deleteUsers = async (userEmails) => {
    try {
      const deleteUsers = await userModel.deleteMany({ email: { $in: userEmails } });
      return deleteUsers;
    } catch (error) {
      console.error(error);
    }
  };
}
module.exports = User;
