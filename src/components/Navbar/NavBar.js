import React, { Component } from 'react';
import classes from './Navbar.module.css';
import { connect } from 'react-redux';
import { searchMovies, fetchMovies } from '../../store/actions/movies.action';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.inputElement = React.createRef()
    }

    clickHandler = () => {
        const text = this.inputElement.current.value;
        if (text == '') {
            this.props.fetchAll();
        } else {
            this.props.search(text);
        }
    }

    render() {
        return (
            <div className={[classes.NavBar, classes.Flex].join(' ')}>
                <div><span className={classes.Heading}>MOVIE</span></div>
                <div className={classes.AlignInput}>
                <span onClick={this.clickHandler} className={classes.Search}>🔎</span> <input type="text" ref={this.inputElement}/>
                </div>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAll: () => dispatch(fetchMovies()),
        search: (text) => dispatch(searchMovies(text))
    }
}

export default connect(null, mapDispatchToProps)(NavBar);