const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');

const KEY_JWT = config.KEY_JWT;
const restorePassword = async(req, res) => {
  const token = req.params.token;

  if(!token) {
    res.render('error');
  }

  try {
    decodeToken(token)

    res.render('restorePassword', { token });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.render('passwordRecoveryLinkExpired');
    } else {
      console.error('Error:', error);
    }
  }
}

const decodeToken = (token) => {
  const decoded = jwt.verify(token, KEY_JWT);

  if (!decoded) {
    return null;
  }

  return decoded;
}

module.exports = restorePassword;