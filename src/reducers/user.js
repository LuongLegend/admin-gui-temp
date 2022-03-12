import { GET_USER_INFO, SIGN_OUT } from '../constants/actionTypes';

const initialState = null;

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            return { ...action.user };
        case SIGN_OUT:
            return null;
        default:
            return state;
    }
};

export default userReducer;
