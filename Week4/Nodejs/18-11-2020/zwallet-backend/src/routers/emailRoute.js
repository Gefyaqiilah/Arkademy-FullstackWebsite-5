const express = require('express')
const router = express.Router()
const emailController = require('../controllers/emailController')
const sendEmail = require('../helpers/sendEmail')
const {emailVerification,sendEmailVerification} = emailController
router
.post('/sendemailverification',sendEmailVerification)
.post('/emailverification',emailVerification)
module.exports = router