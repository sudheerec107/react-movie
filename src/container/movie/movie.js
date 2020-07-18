import React, { Component } from 'react';
import { fetchMovie } from '../../store/actions/movie.action';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Movie extends Component {
    componentDidMount() {
        this.props.fetchData(this.props.match.params.id);
    }
    render() {
        let movie = null;
        console.log('this.props.movie  >', this.props.movie);
        if (this.props.movie != null) {
            movie = (
            <div>
                <div>tite:{this.props.movie.tite}</div>
                <div>Rating{this.props.movie.rating}</div>
                <div>description:{this.props.movie.description}</div>
            </div>)
        }

        let spinner = null;
        if(this.props.loading) {
            spinner = (<Spinner />);
        }
        return (
            <div>
                {spinner}
                {movie}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movie: state.movie.movie,
        error: state.movie.error,
        loading: state.movie.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (id) => dispatch(fetchMovie(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
