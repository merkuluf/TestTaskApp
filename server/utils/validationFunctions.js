const {CONSTANTS, RESPONSE} = require('./CONSTANTS')
const validator = require('validator');

exports.valEmail = email => {
    if (!email) {
        return RESPONSE.EMAIL.NOT_FOUND_ERROR
    }

    if (!validator.isEmail(email)) {
        return RESPONSE.EMAIL.INVALID_ERROR;
    }

    return RESPONSE.EMAIL.SUCCESS


}


exports.valUsername = username => {
    if (!username) {
        return RESPONSE.USERNAME.NOT_FOUND_ERROR
    }

    username = username.trim()
    if (username.length < CONSTANTS.USERNAME.MIN_LENGTH) { 
        return RESPONSE.USERNAME.MIN_LENGTH_ERROR; 
    }
    if (username.length > CONSTANTS.USERNAME.MAX_LENGTH) {
        return RESPONSE.USERNAME.MAX_LENGTH_ERROR
    }
    
    return RESPONSE.USERNAME.SUCCESS
}

exports.valPassword = password => {
    if (!password) {
        return RESPONSE.PASSWORD.NOT_FOUND_ERROR
    }

    if (password.length < CONSTANTS.PASSWORD.MIN_LENGTH) { 
        return RESPONSE.PASSWORD.MIN_LENGTH_ERROR
    }

    if (password.length > CONSTANTS.PASSWORD.MAX_LENGTH) {
        return RESPONSE.PASSWORD.MAX_LENGTH_ERROR
    }

    const hasDigit = /\d/.test(password); // Check for at least one digit
    const hasUpper = /[A-Z]/.test(password); // Check for at least one uppercase letter
    const hasLower = /[a-z]/.test(password); // Check for at least one lowercase letter

    if (!hasDigit | !hasUpper | !hasLower) {
        return RESPONSE.PASSWORD.STRENGTH_ERROR
    } 

    // success
    return RESPONSE.PASSWORD.SUCCESS
}