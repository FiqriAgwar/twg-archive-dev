import {combineReducers} from 'redux';
import authReducer from './authReducer';
import archiveReducer from './archiveReducer';

const allReducers = combineReducers({
    authentication : authReducer,
    archive : archiveReducer
});

export default allReducers;