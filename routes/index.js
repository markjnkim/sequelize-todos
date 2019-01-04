const bcrypt = require('bcrypt-nodejs')
const todoController = require('../controllers/todoController.js')
const userController = require('../controllers/userController.js')
const db = require('../models')
const User = db.User

module.exports = (app, passport) => {
  const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
  }

  app.get('/', authenticated, (req, res) => res.render('index'))

  app.get('/users', (req, res) => userController.getUsers(req, res))

  app.get('/todos', authenticated, (req, res) => todoController.getTodos(req, res))
  app.get('/todos/:id', todoController.getTodos)
  app.post('/todos', todoController.postTodo)
  app.put('/todos/:id', todoController.putTodo)
  app.patch('/todos/:id/check', todoController.patchTodoCheck)
  app.delete('/todos/:id', todoController.deleteTodo)

  app.get('/signin', (req, res) => res.render('signin'))
  app.post('/signin',
    passport.authenticate('local', {failureRedirect: '/signin'}),
    (req, res) => {
      res.redirect('/')
    }
  )
  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/signin')
  })

  app.get('/signup', (req, res) => {
    return res.render('signup')
  })
  app.post('/signup', (req, res) => {
    User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
    }).then(user => {
      return res.redirect('/signin')
    })
  })
}
