import {
  FETCH_SONGS,
  FETCH_FAILED,
  SELECT_SONG,
  LOADING_SONGS,
  EMPTY_SONGS,
  LOADED_SONGS
} from '../actions/types';

const initialState = {
  fetchedSongs: [],
  selectedSong: {},
  loadingSong: false,
  fallback: false,
  error: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_SONGS:
      return {
        ...state,
        fetchedSongs: action.payload.filter(song => song.preview_url !== null)
      };
    case FETCH_FAILED:
      return {
        ...state,
        error: true
      };
    case LOADING_SONGS:
      return {
        ...state,
        loadingSong: true
      };
    case EMPTY_SONGS:
      return {
        ...state,
        fallback: true
      };
    case LOADED_SONGS:
      return {
        ...state,
        loadingSong: false
      };
    case SELECT_SONG:
      return {
        ...state,
        selectedSong: action.payload
      };
    default:
      return state;
  }
}
