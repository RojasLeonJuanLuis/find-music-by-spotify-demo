import React from 'react';
import useSongPlayer from '../hooks/useSongPlayer';
import { Container, Controls } from '../styled-components/player/music-control';
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
    <Container onClick={() => console.log('ookokok')}>
      <audio ref={audioEl} src={props.track} />
      <Controls>
        {playing ? (
          <div onClick={() => setPlaying(false)}>Pause ⏸</div>
        ) : (
          <div onClick={() => setPlaying(true)}>Play ▶️</div>
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
