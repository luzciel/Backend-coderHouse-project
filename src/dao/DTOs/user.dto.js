class User {
  constructor(user) {
    this.first_name = user.first_name;
    this.id = user._id;
    this.email = user.email;
    this.role = user.role;
  }
}

module.exports = User;