const router = require('express').Router()
const { models: { User }} = require('../db')
const {isAdmin,requireToken} = require('./gatekeeping')
module.exports = router

//we want to put requireToken and isAdmin on all api routes! 

router.get('/',requireToken,isAdmin,async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
