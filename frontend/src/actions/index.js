import axios from 'axios';

import {
  FETCH_USER,
  FETCH_SONGS,
  LOADING_SONGS,
  FETCH_FAILED,
  EMPTY_SEARCH,
  SELECT_SONG,
  LOADED_SONGS,
  FETCH_FAVORITES
} from './types';

export const fetchUser = () => async dispatch => {
  const { data } = await axios.get('/api/current_user');
  dispatch({
    type: FETCH_USER,
    payload: data
  });
};
export const fetchSongs = song => async dispatch => {
  if (!song) return;
  dispatch({ type: LOADING_SONGS });
  try {
    const response = await fetch(
      `https://spotify-demo-api.now.sh/search?q=${song}&type=track`
    );
    const data = await response.json();
    dispatch({
      type: FETCH_SONGS,
      payload: data.tracks.items
    });
    if (data.tracks.items.length === 0) {
      dispatch({
        type: EMPTY_SEARCH,
        payload: true
      });
    }
    if (data.tracks.items.length > 0) {
      dispatch({
        type: EMPTY_SEARCH,
        payload: false
      });
    }
    dispatch({ type: LOADED_SONGS });
  } catch (err) {
    dispatch({ type: FETCH_FAILED });
  }
};
export const selectSong = (song, index) => {
  return {
    type: SELECT_SONG,
    payload: { song, index }
  };
};

export const submitFavorite = values => async dispatch => {
  const res = await axios.post('/api/favorites', values);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchFavorites = () => async dispatch => {
  const res = await axios.get('/api/favorites');
  dispatch({ type: FETCH_FAVORITES, payload: res.data });
};
