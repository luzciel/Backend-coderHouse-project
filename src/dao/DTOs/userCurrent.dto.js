class UserCurrent {
  constructor(user){
    this.email = user.email,
    this.rol = user.role,
    this.iat = user.iat,
    this.exp = user.exp
  }
}

module.exports = UserCurrent;