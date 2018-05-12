import React, { Component, Fragment } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import ErrorBoundarie from './containers/error-boundarie';

import LoadingBar from 'react-redux-loading';

import Search from './containers/search';
import Track from './containers/track';
import SearchBar from './containers/search-bar';

class App extends Component {
  render() {
    const { songs } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <SearchBar />
          <ErrorBoundarie>
            <Switch>
              <Route exact path="/search" component={Search} />
              <Route path="/search/results/:track" render={() => (
                songs ? (
                  <Track />
                ) : (
                  <Redirect to="/search" />
                )
              )} />
              <Route exact path="/" render={() => (
                <Redirect to="/search" />
              )} />
            </Switch>
          </ErrorBoundarie>
        </Fragment>
      </Router>
    );
  }
}
const mapStateToProps = ({ songs }) => ({
  songs,
});

export default connect(mapStateToProps)(App);
