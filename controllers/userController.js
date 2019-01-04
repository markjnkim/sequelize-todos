const db = require('../models')
const User = db.User

let userController = {
  getUsers: (req, res) => {
    return User.findAll().then((users) => res.json(users))
  }
}
module.exports = userController
