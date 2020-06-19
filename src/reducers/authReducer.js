import {
    LOGIN,
    LOGIN_PROGRESS,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from '../types';

const initialState = {
    inProgress : false,
    errorMsg : null,
    successMsg : null,
    loggedIn : false
};

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return {loggedIn : action.payload};
        case LOGIN_PROGRESS:
            return {inProgress : action.payload};
        case LOGIN_SUCCESS :
            return {successMsg : action.payload};
        case LOGIN_ERROR :
            return {errorMsg : action.payload};
        case LOGOUT :
            return {loggedIn : action.payload};
        default :
            return state;
    }
}