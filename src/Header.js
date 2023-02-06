import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './services/userAPI';
// import { Redirect } from 'react-router-dom';

class Header extends Component {
  state = {
    loggedUser: '',
    loading: true,
  };

  componentDidMount() {
    this.accessLoggedUser();
  }

  accessLoggedUser = async () => {
    const { name } = await getUser();

    this.setState({ loading: true });

    this.setState({ loggedUser: name });

    this.setState({ loading: false });

    return name;
  };

  render() {
    const {
      loading,
      loggedUser,
    } = this.state;

    if (loading) return <h1>Carregando...</h1>;

    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{ loggedUser }</h1>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
