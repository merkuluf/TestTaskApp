const query = require('../database/query')
const { CONSTANTS, RESPONSE } = require('../utils/CONSTANTS')
const { hashPassword, comparePassword } = require('../utils/hashing')


exports.getEverybody = async (req, res) => {
    try {
        const users = await query.fetchAllUsers()
        res.send(users)
    } catch (error) {
        console.log(error)
        res.send(RESPONSE.USER.FETCH_ALL_ERROR)
    }
}

exports.updateUser = async (req, res) => {
    console.log(req.body)
    try {
        const user = await query.findUserByEmailToUpdate(req.body.email)
        if (user.error === true) {
            return res.send(user)
        }
        
    
        const newPassword = req.body.newPassword === null ? user._doc.password : await hashPassword(req.body.newPassword)
        const newEmail = req.body.newEmail === null ? user._doc.email : req.body.newEmail
        const newPhoto = req.body.newPhoto
    
        user.password = newPassword
        user.email = newEmail
        user.photo = newPhoto

        await user.save()

        delete user._doc.password
        delete user._doc._id
        delete user._doc.__v

        return res.send({error: false, ...user._doc})
    } catch (error) {
        console.log(error)
        return res.send({error: true, message: error.message})
    }


}


exports.loginUser = async (req, res) => {
    const userExist = await query.findUserByEmail(req.body.email)
    if (userExist.error === true) {
        return res.send(userExist)
    }
    let passwordConfirmation = await comparePassword(req.body.password, userExist.password)
    if (passwordConfirmation === false) {
        return res.send(RESPONSE.PASSWORD.INCORRECT_ERROR)
    }
    delete userExist.password
    delete userExist._id
    delete userExist.__v
    return res.send(userExist)
}

exports.createUser = async (req, res) => {
    const userExist = await query.findUserByUsername(req.body.username)
    if (userExist.error === false) {
        return res.send(RESPONSE.USER.ALREADY_EXISTS)
    }

    const emailExist = await query.findUserByEmail(req.body.email)
    if (emailExist.error === false) {
        return res.send(RESPONSE.EMAIL.ALREADY_EXISTS)
    }

    const pwdHash = await hashPassword(req.body.password)


    const recordUser = await query.registerUser(
        req.body.username,
        pwdHash,
        req.body.email,
        req.body.birthday,
        req.body.sex,
        req.body.photo
    )

    if (recordUser.error === true && recordUser.internal === true) {
        console.log(recordUser) // add logging here to track issues
        return res.send(RESPONSE.USER.CREATION_FAILED)
    }
    if (recordUser.error === true && recordUser.internal === false) {
        return res.send(recordUser) // show safe data to user, unable to create for some reason. add logging as well...
    }

    // finish user registration
    if (recordUser.error === false) {
        return res.send(recordUser)
    }

}