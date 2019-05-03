import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchSongs } from '../actions';
import {
  InputContainer,
  Icon,
  Spinner,
  Input,
  EmptySearch
} from './styled-components/search-bar';

function SearchBar(props) {
  const [text, setText] = useState('');

  const onChange = e => setText(e.target.value);

  useEffect(() => {
    props.fetchSongs(text);
  }, [text]);
  return (
    <InputContainer>
      <Helmet>
        <title>{text}</title>
      </Helmet>
      <Input
        className="input"
        value={text}
        onChange={onChange}
        placeholder="Search..."
      />
      {props.loading ? <Spinner /> : <Icon className="fas fa-search" />}
      {props.fallback && (
        <EmptySearch>
          <p>It does not exists, look for another song</p>
        </EmptySearch>
      )}
    </InputContainer>
  );
}
const mapStateToProps = ({ songs: { loadingSong, fallback } }) => ({
  loading: loadingSong,
  fallback
});
export default connect(
  mapStateToProps,
  { fetchSongs }
)(SearchBar);
