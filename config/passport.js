const bcrypt = require('bcrypt-nodejs')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const db = require('../models')
const User = db.User

passport.use(new LocalStrategy({
  passReqToCallback: true
},
  (req, username, password, cb) => {
    User.findOne({where: {username: username}}).then(user => {
      if (!user) return cb(null, false)
      if (!bcrypt.compareSync(password, user.password)) return cb(null, false)
      return cb(null, user)
    })
  }
))

passport.serializeUser((user, cb) => {
  return cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  User.findByPk(id).then(user => {
    return cb(null, user)
  })
})

module.exports = passport
