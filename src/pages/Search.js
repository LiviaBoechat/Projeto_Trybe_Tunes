import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
// import { Redirect } from 'react-router-dom';

class Search extends Component {
  state = {
    artistName: '',
    isSearchButtonDisabled: true,
    loading: false,
    searchName: '',
    searchAlbum: [],
    // apiReturn: true,
    errorMessage: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(({
      [name]: value,
    }), () => this.validateButton());
  };

  validateButton = () => {
    const { artistName } = this.state;
    const minLetters = 2;

    this.setState({
      isSearchButtonDisabled: artistName.length < minLetters,
    });
  };

  searchButtonClick = async () => {
    const { artistName } = this.state;

    this.setState({
      loading: true,
    });

    const albuns = await searchAlbumsAPI(artistName);

    if (albuns.length !== 0) {
      this.setState({
        searchName: artistName,
        searchAlbum: albuns,
        artistName: '',
        loading: false,
      });
    } else {
      this.setState({
        errorMessage: 'Nenhum álbum foi encontrado',
        artistName: '',
        loading: false,
      });
    }
  };

  render() {
    const {
      artistName,
      isSearchButtonDisabled,
      loading,
      searchName,
      searchAlbum,
      errorMessage,
    } = this.state;

    if (loading) return <h1>Carregando...</h1>;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <legend>Faça sua pesquisa</legend>
          <label htmlFor="artistName">
            <input
              data-testid="search-artist-input"
              id="artistName"
              type="text"
              name="artistName"
              value={ artistName }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            name="isSearchButtonDisabled"
            value={ isSearchButtonDisabled }
            onClick={ this.searchButtonClick }
            disabled={ isSearchButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
        { errorMessage === '' && <p>{`Resultado de álbuns de: ${searchName}`}</p> }
        { errorMessage === '' ? (
          searchAlbum.map((eachAlbum) => (
            <div key={ eachAlbum.artistName }>
              <img src={ eachAlbum.artworkUrl100 } alt={ eachAlbum.artistName } />
              <h2>{ eachAlbum.collectionName }</h2>
              <h3>{ eachAlbum.artistName }</h3>
              <Link
                to={ `/album/${eachAlbum.collectionId}` }
                data-testid={ `link-to-album-${eachAlbum.collectionId}` }
              >
                Abrir
              </Link>
            </div>
          ))) : <span>{ errorMessage }</span> }
      </div>
    );
  }
}

export default Search;

Search.propTypes = {
  artistName: PropTypes.string,
  isSearchButtonDisabled: PropTypes.bool,
}.isRequired;
