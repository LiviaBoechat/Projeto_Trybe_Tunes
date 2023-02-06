import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';
import Header from '../Header';

// import { Redirect } from 'react-router-dom';

class Album extends Component {
  state = {
    songList: [],
    artistName: '',
    collectionName: '',
  };

  async componentDidMount() {
    await this.getMusics();
  }

  getMusics = async () => {
    const { match: { params: { id } } } = this.props;

    const musics = await getMusics(id);
    console.log(musics);

    this.setState(({
      songList: musics,
      artistName: musics[0].artistName,
      collectionName: musics[0].collectionName,
    }));
    return musics;
  };

  render() {
    const { songList, artistName, collectionName } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h1>Álbum</h1>
        <h2 data-testid="album-name">{ collectionName }</h2>
        <h3 data-testid="artist-name">{ artistName }</h3>
        {songList.map((eachMusic, index) => {
          if (index === 0) {
            return undefined;
          }
          return (
            <ul key={ index }>
              <li>
                <MusicCard
                  song={ eachMusic }
                />
              </li>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  searchMsongListusic: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
