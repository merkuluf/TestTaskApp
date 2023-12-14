const { CONSTANTS, RESPONSE } = require('../utils/CONSTANTS')
const validate = require('../utils/validationFunctions')

exports.updateFormValidation = async (req, res, next) => {
    if (req.body.newPassword !== null) {
        const passwordCheck = validate.valPassword(req.body.newPassword)
        if (passwordCheck.error === true) {
            return res.send(passwordCheck)
        }
    }


    if (req.body.newEmail !== null) {
        const emailCheck = validate.valEmail(req.body.newEmail)
        if (emailCheck.error === true) {
            return res.send(emailCheck)
        }
    }

    next()
}

exports.authFormValidation = async (req, res, next) => {
    
    const passwordCheck = validate.valPassword(req.body.password)
    if (passwordCheck.error === true) {
        return res.send(passwordCheck)
    }

    const emailCheck = validate.valEmail(req.body.email)
    if (emailCheck.error === true) {
        return res.send(emailCheck)
    }
    next()
}

exports.regFormValidation = async (req, res, next) => {
    const usernameCheck = validate.valUsername(req.body.username)
    if (usernameCheck.error === true) {
        return res.send(usernameCheck)
    }

    const passwordCheck = validate.valPassword(req.body.password)
    if (passwordCheck.error === true) {
        return res.send(passwordCheck)
    }

    const emailCheck = validate.valEmail(req.body.email)
    if (emailCheck.error === true) {
        return res.send(emailCheck)
    }

    if (!req.body.sex) {
        return res.send(RESPONSE.SEX.NOT_FOUND_ERROR)
    }

    if (!req.body.birthday) {
        return res.send(RESPONSE.BIRTHDAY.NOT_FOUND_ERROR)
    }
    next()
}
