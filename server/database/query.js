const { User } = require('./models')
const { RESPONSE } = require('../utils/CONSTANTS')

exports.fetchAllUsers = async () => {
    try {
      const users = await User.find();
      console.log(users)
      let filteredUsers = users.map(user => {
        return ({
            username: user.username,
            birthday: user.birthday,
            photo: user.photo,
        })
      })
      return filteredUsers;

    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // You may want to handle or log the error appropriately
    }
}

exports.findUserByUsername = async (_username) => {
    try {
        const user = await User.findOne({ username: _username });
        if (!user) {
            return RESPONSE.USER.NOT_FOUND
        }
        return { error: false, ...user._doc }
    } catch (error) {
        return { error: true, message: error.message }
    }
}

exports.findUserByEmail = async (_email) => {
    try {
        const user = await User.findOne({ email: _email });
        if (!user) {
            return RESPONSE.USER.NOT_FOUND
        }
        return { error: false, ...user._doc }
    } catch (error) {
        return { error: true, message: error.message }
    }
}

exports.findUserByEmailToUpdate = async (_email) => {
    try {
        const user = await User.findOne({ email: _email });
        return user
    } catch (error) {
        return { error: true, message: error.message }
    }
}

exports.registerUser = async (_username, _password, _email, _birthday, _sex, _photo) => {
    try {
        const newUser = new User({
            username: _username,
            password: _password,
            email: _email,
            birthday: _birthday,
            sex: _sex,
            photo: _photo,
        });

        await newUser.save();

        if (!newUser._id) {
            return { ...RESPONSE.USER.CREATION_FAILED, internal: false }
        }

        return { ...RESPONSE.USER.CREATED, data: newUser };

    } catch (error) {
        return { error: true, internal: true, message: error.message }
    }
}