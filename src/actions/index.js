import { GET_USER_INFO, SIGN_OUT } from '../constants/actionTypes';

export const getUserInfo = (user) => {
    return {
        type: GET_USER_INFO,
        user,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};
