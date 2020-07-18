import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchMovies } from '../../store/actions/movies.action';
import './movies.css';

class Movies extends Component {

    componentDidMount() {
        this.props.fetchData();
    }

    clickHandler = (id) => {
        this.props.history.push('movies/' + id);
    }

    render() {
        let loading = null;
        if (this.props.loading) {
            loading = (<Spinner />);
        }
        const groups = Object.keys(this.props.movieGroups);
        const moviesElement = groups.map(movie => {
            return (
                <div key={movie}>
                    <label style={{fontSize: '20px'}}>{movie}</label>
                    ({this.props.movieGroups[movie].length})
                    <hr/>
                    <div className="flex-container">
                        {
                            this.props.movieGroups[movie].map(movie => {
                                return  (
                                    <div key={movie._id} className="movie-card" onClick={() => this.clickHandler(movie._id)}>
                                        {movie.title}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        });
        return (
            <div>
                {loading}
                {moviesElement}
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        movieGroups: state.movies.movieGroups,
        error: state.movies.error,
        loading: state.movies.loading
    }
}

const mapdispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchMovies())
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(Movies);
