
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './auth.reducer';

const initialState = {
    error: null,
    loading: false,
    movieGroups: {}
}

const moviesStart = (state, action) => {
    return updateObject(state, { loading: true,  movieGroups: {}, error: null });
}
const moviesSuccess = (state, action) => {
    const movies = action.payload;
    const groupsArr =  [];
    const groups = {}
    movies.forEach(movie => {
        if (groupsArr.indexOf(movie.category) === -1) {
            groups[movie.category]=[movie];
            groupsArr.push(movie.category);
        } else {
            groups[movie.category].push(movie)
        }
    });

    return updateObject(state, { loading: false, movieGroups: groups, movies: action.payload, error: false });
}
const moviesFail = (state, action) => {
    return updateObject(state, { loading: false, movieGroups: {}, error: action.payload });
}

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MOVIES_START:
            return moviesStart(state, action);
        case actionTypes.MOVIES_SUCCESS:
            return moviesSuccess(state, action);
        case actionTypes.MOVIES_FAIL:
            return moviesFail(state, action);
        default:
            return state;
    }
}

export default moviesReducer;
