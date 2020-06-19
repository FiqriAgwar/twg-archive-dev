import {
    GAMES_DATA_ARRAY, 
    GAMES_IN_PROGRESS
} from '../types';
  
const initialState = {
    games: null,
    inProgress: false
};
  
export default (state = initialState, action) => {
    switch(action.type) {
        case GAMES_DATA_ARRAY:
            return { games: action.payload };
        case GAMES_IN_PROGRESS:
            return { inProgress: action.payload };
        default:
            return state;
    }
};
  