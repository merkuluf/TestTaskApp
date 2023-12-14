const express = require('express')
const router = express.Router()
const authMw = require('../middleware/profileMiddleware')
const profileController = require('../controllers/profileController')

router.post('/register', authMw.regFormValidation, profileController.createUser)
router.post('/auth', authMw.authFormValidation, profileController.loginUser)
router.put('/update', authMw.updateFormValidation, profileController.updateUser)
router.get('/everybody', profileController.getEverybody)

module.exports = router