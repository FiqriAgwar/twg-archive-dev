import {combineReducers} from 'redux';
import authReducer from './authReducer';

const allReducers = combineReducers({
    authentication : authReducer,
});

export default allReducers;