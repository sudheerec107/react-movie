import * as actionTypes from './actionTypes';
import instanceAxios from '../../axios';

export const movieStart = () => {
    return {
        type: actionTypes.MOVIE_START
    };
}

export const movieSuccess = (movies) => {
    return {
        type: actionTypes.MOVIE_SUCCESS,
        payload: movies
    };
}

export const movieFail = (error) => {
    return {
        type: actionTypes.MOVIE_FAIL,
        payload: error
    };
}

export const fetchMovie = (id) => {
    return dispatch => {
        dispatch(movieStart());
        
        instanceAxios.get('/movies/'+id)
            .then(response => {
                setTimeout(() => {
                    dispatch(movieSuccess(response.data))           
                }, 2000);
            })
            .catch(err => {
                dispatch(movieFail(err.response.data));
            })

    };
}
