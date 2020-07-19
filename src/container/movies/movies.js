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
        this.props.history.push('movie/' + id);
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
                    <div>
                    <br/>
                        <label className="title">{movie} ( {this.props.movieGroups[movie].length} )</label>
                        <br/>
                        <br/>
                    </div>
                    <hr/>
                    <div className="flex-container">
                        {
                            this.props.movieGroups[movie].map(movie => {
                                return  (
                                    <div key={movie._id} className="movies-card" onClick={() => this.clickHandler(movie._id)}>
                                        <span className="movie-title">{movie.title}</span>
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

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchMovies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
