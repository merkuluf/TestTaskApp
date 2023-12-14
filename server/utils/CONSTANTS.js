const CONSTANTS = {
    PASSWORD: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 30,
    },

    USERNAME: {
        MIN_LENGTH: 4,
        MAX_LENGTH: 12,
    }
}

const RESPONSE = {
    SEX: {
        NOT_FOUND_ERROR: {error: true, message: `'sex' field is required`},
    },
    BIRTHDAY: {
        NOT_FOUND_ERROR: {error: true, message: `'birthday' field is required`},
    },
    EMAIL: {
        NOT_FOUND_ERROR: {error: true, message: `'email' is required parameter`},
        INVALID_ERROR: {error: true, message: `'email' is in invalid format`},
        SUCCESS: {error: false, message: `email accepted`},
        ALREADY_EXISTS: {error: true, message: `such email already exists`},
    },
    PASSWORD: {
        NOT_FOUND_ERROR: {error: true, message: `'password' is required parameter`},
        MIN_LENGTH_ERROR: {error: true, message: `password must contain at least ${CONSTANTS.PASSWORD.MIN_LENGTH} characters`},
        MAX_LENGTH_ERROR: {error: true, message: `password can contain maximum ${CONSTANTS.PASSWORD.MAX_LENGTH} characters`},
        STRENGTH_ERROR: {error: true, message: `password must contain at least 1 uppercase letter, 1 lowercase letter and one digit`},
        SUCCESS: {error: false, message: `password accepted`},
        INCORRECT_ERROR: {error: true, message: `incorrect password`}
    },
    USERNAME: {
        NOT_FOUND_ERROR: {error: true, message: `'username' is required parameter`},
        MIN_LENGTH_ERROR: {error: true, message: `username must contain at least ${CONSTANTS.USERNAME.MIN_LENGTH} characters`},
        MAX_LENGTH_ERROR: {error: true, message: `username can contain maximum ${CONSTANTS.USERNAME.MAX_LENGTH} characters`},
        SUCCESS: {error: false, message: `username accepted`},
    },
    USER: {
        FETCH_ALL_ERROR: {error: true, message: `unable to fetch all users`},
        NOT_FOUND: {error: true, message: `user not found`},
        ALREADY_EXISTS: {error: true, message: `such user already exists`},
        CREATED: {error: false, message: `user created successfully`},
        CREATION_FAILED: {error: true, message: `user has not been created`},
    }
}

module.exports = {
    CONSTANTS,
    RESPONSE
}