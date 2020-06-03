import {
    LOGIN,
    LOGIN_PROGRESS,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from '../types';

const login = ({username, password}, type) => {
    const trueType = 'login';
    if(type !== trueType){
        throw new Error('Wrong ' + trueType + ' call');
    }
    else{
        return(dispatch) => {
            dispatch({type : LOGIN_PROGRESS, payload : true});
            if((username == 'cystg') && (password == 'cystg')){
                dispatch({type : LOGIN_SUCCESS, payload : 'Welcome to the page'});
                dispatch({type : LOGIN, payload : true});
            }
            else{
                dispatch({type : LOGIN_ERROR, payload : 'Wrong credentials data'});
            }
        }
    }
}

const logout = ({}, type) => {
    const trueType = 'logout';
    if(type !== trueType){
        throw new Error('Wrong ' + trueType + ' call');
    }
    else{
        return(dispatch) => {
            dispatch({type : LOGOUT, payload : false});
        }
    }
}

export default {
    login,
    logout
};