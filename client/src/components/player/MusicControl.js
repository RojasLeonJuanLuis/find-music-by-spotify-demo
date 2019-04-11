import React from 'react';
import useSongPlayer from '../hooks/useSongPlayer';
import MusicVolume from './MusicVolume';
import Bar from './Bar';
import {
  Container,
  Controls,
  Icons,
  I
  // Icon
} from '../styled-components/player/music-control';

function MusicControl(props) {
  const audioEl = React.useRef();

  // I need all the controls for make a song
  const [
    currentTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    setClickedVolume,
    currentVolume,
    resetVolume
  ] = useSongPlayer(audioEl);
  // Dont make console.log for  inputEl.current.something
  // Because always is going to be undefined
  // Make sure the song is saved in localStorage
  // Or do it in useSongPlayer.js (Hook)

  return (
    <React.Fragment>
      <Container>
        <audio ref={audioEl} src={props.track} />
        <Controls>
          <Icons>
            <I
              onClick={props.previousTrack}
              opacity={props.opacityPrevious}
              size="small"
              className="fas fa-step-backward"
            />
            {playing ? (
              <I onClick={() => setPlaying(false)} className="fas fa-pause" />
            ) : (
              <I onClick={() => setPlaying(true)} className="fas fa-play" />
            )}
            <I
              onClick={props.nextTrack}
              opacity={props.opacityNext}
              size="small"
              className="fas fa-step-forward"
            />
          </Icons>
          <Bar
            currentTime={currentTime}
            duration={duration}
            onTimeUpdate={time => setClickedTime(time)}
          />
        </Controls>
      </Container>
      {/* Here's the volume component */}
      <MusicVolume
        currentVolume={currentVolume}
        onVolumeUpdate={vol => setClickedVolume(vol)}
        resetVolume={bool => resetVolume(bool)}
      />
    </React.Fragment>
  );
}
export default MusicControl;
