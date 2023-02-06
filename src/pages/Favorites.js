import React, { Component } from 'react';
import Header from '../Header';
// import { Redirect } from 'react-router-dom';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <h1>Músicas Favoritas</h1>
        <Header />
      </div>
    );
  }
}

export default Favorites;
