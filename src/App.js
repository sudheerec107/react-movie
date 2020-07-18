import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from './container/auth/auth';
import Movies from './container/movies/movies';
import Movie from './container/movie/movie';
import './App.css';
import { authCheckState } from './store/actions/auth.action';
import NavBar from './components/Navbar/NavBar';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let topNavBar = (<NavBar/>);
    if (!this.props.isAuthenticated) {
      topNavBar = (<Redirect to="/auth"></Redirect>)
    }
    return (
      <div className="App">
        {topNavBar}
        <Switch>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/movies/:id" exact component={Movie}></Route>
          <Route path="/movies" exact component={Movies}></Route>
          <Route path="/" exact component={Movies}></Route>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null
  }
}

const mapDispatchToProp = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(authCheckState())
  };
}

export default connect(mapStateToProps, mapDispatchToProp)(App);
