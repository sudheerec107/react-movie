import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './auth.reducer';

const initialState = {
    error: null,
    loading: false,
    movie: null
}

const movieStart = (state, action) => {
    return updateObject(state, { loading: true,  movie: null, error: null });
}
const movieSuccess = (state, action) => {
    return updateObject(state, { loading: false, movie: action.payload, movies: action.payload, error: false });
}
const movieFail = (state, action) => {
    return updateObject(state, { loading: false, movie: null, error: action.payload });
}

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MOVIE_START:
            return movieStart(state, action);
        case actionTypes.MOVIE_SUCCESS:
            return movieSuccess(state, action);
        case actionTypes.MOVIE_FAIL:
            return movieFail(state, action);
        default:
            return state;
    }
}

export default movieReducer;
