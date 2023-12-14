import { USER } from "./actionTypes";

const initialState = {
    username: null,
    email: null,
    photo: 'profile.png',
    sex: null,
    birthday: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER.SET:
            let userObj = {...action.payload, birthday: action.payload.birthday.split('T')[0]}
            localStorage.setItem('user', JSON.stringify(userObj))
            return userObj
        case USER.DELETE:
            localStorage.removeItem('user')
            return initialState
		default:
			return state;
	}
};

export default userReducer;
