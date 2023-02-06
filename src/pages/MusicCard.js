import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';

class MusicCard extends Component {
  render() {
    const { song } = this.props;

    return (
      <div>
        <h3>
          { song.trackName }
        </h3>
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  song: PropTypes.shape({
  }),
}.isRequired;
