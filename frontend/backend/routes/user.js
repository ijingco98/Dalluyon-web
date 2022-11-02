const { request, response } = require('express')
const express = require('express')

const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()
//this route page is for logging in and signing up
//log in
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

module.exports = router