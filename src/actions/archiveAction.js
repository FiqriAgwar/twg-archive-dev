import {
    GAMES_DATA_ARRAY,
    GAMES_IN_PROGRESS
} from '../types';

import axios from 'axios';

const getAllGames = (str,type) => {
    const trueType = 'getAllGames';
    if(type !== trueType){
        throw new Error('Wrong ' + trueType + ' call!');
    }
    else{
        return async(dispatch) => {
            dispatch({type: GAMES_IN_PROGRESS, payload: true});
            await axios.get('https://raw.githubusercontent.com/rexevan/twg-cystg-big/master/new_kaskus.json')
                .then((response) => {
                    console.log(response);
                    dispatch({type: GAMES_DATA_ARRAY, payload: response.data});
                })
                .catch((error) => {
                    throw new Error(error);
                })
        }
    }
};

export default {
    getAllGames
};