import React from 'react';
import useSongPlayer from '../hooks/useSongPlayer';
import {
  Container,
  Controls,
  I
} from '../styled-components/player/music-control';
import Bar from './Bar';

function MusicControl(props) {
  const audioEl = React.useRef();

  const [
    currentTime,
    duration,
    playing,
    setPlaying,
    setClickedTime
  ] = useSongPlayer(audioEl);
  return (
    <Container>
      <audio ref={audioEl} src={props.track} />
      <Controls>
        {playing ? (
          <I onClick={() => setPlaying(false)} className="fas fa-pause" />
        ) : (
          <I onClick={() => setPlaying(true)} className="fas fa-play" />
        )}
        <Bar
          currentTime={currentTime}
          duration={duration}
          onTimeUpdate={time => setClickedTime(time)}
        />
      </Controls>
    </Container>
  );
}
export default MusicControl;
