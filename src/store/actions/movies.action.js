import * as actionTypes from './actionTypes';
import instanceAxios from '../../axios';

export const moviesStart = () => {
    return {
        type: actionTypes.MOVIES_START
    };
}

export const moviesSuccess = (movies) => {
    return {
        type: actionTypes.MOVIES_SUCCESS,
        payload: movies
    };
}

export const moviesFail = (error) => {
    return {
        type: actionTypes.MOVIES_FAIL,
        payload: error
    };
}

export const fetchMovies = () => {
    return dispatch => {
        dispatch(moviesStart());
        
        instanceAxios.get('/movies')
            .then(response => {
                setTimeout(() => {
                    dispatch(moviesSuccess(response.data))           
                }, 2000);
            })
            .catch(err => {
                dispatch(moviesFail(err.response.data));
            })

    };
}
