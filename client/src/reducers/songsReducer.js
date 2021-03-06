import {
  FETCH_SONGS,
  FETCH_FAILED,
  LOADING_SONGS,
  LOADED_SONGS,
  EMPTY_SEARCH,
  SELECT_SONG,
  FETCH_FAVORITES
} from '../actions/types';

const initialState = {
  fetchedSongs: [],
  loadingSong: false,
  fallback: false,
  error: false,
  selectedSong: {},
  favoriteSongs: []
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
    case LOADED_SONGS:
      return {
        ...state,
        loadingSong: false
      };
    case EMPTY_SEARCH:
      return {
        ...state,
        fallback: action.payload
      };
    case SELECT_SONG:
      return {
        ...state,
        selectedSong: action.payload
      };
    case FETCH_FAVORITES:
      return {
        ...state,
        favoriteSongs: action.payload
      };
    default:
      return state;
  }
}
