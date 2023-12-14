export const validatePassword = (password, password_confirm) => {

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/;


    if (password !== password_confirm) {
        return { error: true, message: 'Пароли не совпадают!' };
    }

    if (!passwordRegex.test(password)) {
        return {
            error: true,
            message:
                'Пароль может иметь минимум 6, максимум 20 символов,\nиметь как минимум 1 маленькую букву,\n1 большую букву и 1 цифру.\nДопускаются только латинские буквы ',
        };
    }

    return { error: false };
};


export const validateUsername = (username) => {
    // Username validation regex with letters and digits, 4 to 12 characters
    const usernameRegex = /^[a-zA-Z0-9]{4,12}$/;

    // Check if the username meets the requirements
    if (!usernameRegex.test(username)) {
        return {
            error: true,
            message:
                'Имя должно быть от 4 до 12 символов в длину,\nМожет содержать буквы и цифры',
        };
    }

    // If everything is alright
    return { error: false };
};

export const validateEmail = (email) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Check if the email meets the requirements
    if (email.length < 5 || !emailRegex.test(email)) {
        return {
            error: true,
            message: 'Минимальная длина электронной почты - 5 символов.\nПочта должна соответствовать следующему примеру: username@hosting.domain',
        };
    }

    // If everything is alright
    return { error: false };
};
