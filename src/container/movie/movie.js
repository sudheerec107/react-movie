import React, { Component } from 'react';
import { fetchMovie, movieSuccess } from '../../store/actions/movie.action';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './movie.module.css';
import StarRatingComponent from 'react-star-rating-component';

class Movie extends Component {
    componentDidMount() {
        if (!this.props.movies || Object.keys(this.props.movies).length === 0) {
            this.props.fetchData(this.props.match.params.id);
        } else {
            let movie = null;
            Object.keys(this.props.movies).forEach(gp => {
                if (movie == null) {
                    movie = this.props.movies[gp].find(mv => mv._id === this.props.match.params.id);
                }
            });
           
            if (!!movie) {
                this.props.updateMovie(movie);
            } else {
                this.props.fetchData(this.props.match.params.id);
            }
        }
    }

    render() {
        let movieEle = null;
        if (this.props.movie != null) {
            movieEle = (
                <div className="movie">
                    <div className={classes.FloatLeft}>
                        <div className="title2">{this.props.movie.title}</div>
                    </div>
                    <div className={classes.FloatRight}>
                        <div>
                            <span className="float-left title1">{this.props.movie.title}</span>
                            <span className="float-right">
                                <StarRatingComponent
                                    className="big-font"
                                    name={''}
                                    value={this.props.movie.rating}
                                    starCount={5}
                                    editing={false} />
                            </span>
                            <div>
                            </div>
                        </div>

                        <div>
                            <br />
                            <span className="float-left">{this.props.movie.year} | {this.props.movie.movieLength} | {this.props.movie.director}</span>
                            <br />
                            <span className="float-left">Cast: {this.props.movie.cast.join(', ')}</span>
                            <br />
                        </div>
                        <div>
                            <p className="movie-description">
                                {this.props.movie.description}
                            </p>
                        </div>
                    </div>

                </div>
            )
        }

        let spinner = null;
        if (this.props.loading) {
            spinner = (<Spinner />);
        }
        return (
            <div>
                {spinner}
                {movieEle}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies.movieGroups,
        movie: state.movie.movie,
        error: state.movie.error,
        loading: state.movie.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (id) => dispatch(fetchMovie(id)),
        updateMovie: (data) => dispatch(movieSuccess(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
