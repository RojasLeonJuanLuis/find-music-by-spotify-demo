import React from 'react';
import PropTypes from 'prop-types';

const Track = (props) => {
  const { customStyle, onEnter, onLeave } = props;
  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave} className={customStyle === false ? 'track-box' : 'track-list'}>
      <figure className={customStyle === false ? 'figure' : 'figure-list'}>
        <span className="artist-image-container">
          <img className="artist-image" width="100%" src={`${props.album.images[0].url}`} alt={`${props.album.name}`} height="auto" />
        </span>
        <i className={customStyle === false ? 'fas fa-play play' : 'fas fa-play play-list' }></i>
      </figure>
      <div className={customStyle === false ? '' : 'description'}>
        <p>{props.name}</p>
        <p>{props.artists[0].name}</p>
      </div>
    </div>
  )
}
Track.propTypes = {
  customStyle: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  artists: PropTypes.array.isRequired,
}
export default Track;