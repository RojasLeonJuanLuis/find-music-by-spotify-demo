import { useState, useEffect } from 'react';

function useSongPlayer(audioElement) {
  const [playing, setPlaying] = useState(true);
  const [duration, setDuration] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [clickedTime, setClickedTime] = useState(null);
  const [currentVolume, setCurrentVolume] = useState(null);
  const [clickedVolume, setClickedVolume] = useState(null);
  const [resetVolume, setResetVolume] = useState(null);
  const [lastVolume, setLastVolume] = useState(null);

  useEffect(() => {
    const audioEl = audioElement.current;

    const setAudioData = () => {
      setPlaying(true);
      setDuration(audioEl.duration);
      setCurrentTime(audioEl.currentTime);
      setCurrentVolume(audioEl.volume);
    };

    const setAudioTime = () => setCurrentTime(audioEl.currentTime);

    const setVolume = () => setCurrentVolume(audioEl.volume);

    // Event listeners
    audioEl.addEventListener('loadeddata', setAudioData);
    audioEl.addEventListener('timeupdate', setAudioTime);
    audioEl.addEventListener('volumechange', setVolume);

    // Play or pause the song
    try {
      playing ? audioEl.play() : audioEl.pause();
    } catch (err) {
      // Ignore errors
    }

    // When the people clicks BarProgress and get the value
    if (clickedTime && clickedTime !== currentTime) {
      // update currentTime value
      audioEl.currentTime = clickedTime;
      setClickedTime(null);
    }
    // Volume
    if (clickedVolume && clickedVolume !== currentVolume) {
      audioEl.volume = clickedVolume;
      setClickedVolume(null);
    }
    if (resetVolume === 'yes') {
      setLastVolume(currentVolume);
      audioEl.volume = 0;
      setResetVolume(null);
    } else if (resetVolume === 'no') {
      audioEl.volume = lastVolume;
      setResetVolume(null);
    }

    // Effect cleanup
    return () => {
      audioEl.removeEventListener('loadeddata', setAudioData);
      audioEl.removeEventListener('timeupdate', setAudioTime);
      audioEl.removeEventListener('volumechange', setVolume);
    };
  }, [
    audioElement,
    clickedTime,
    currentTime,
    clickedVolume,
    currentVolume,
    resetVolume,
    playing,
    lastVolume,
  ]);

  return [
    currentTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    setClickedVolume,
    currentVolume,
    setResetVolume,
  ];
}

export default useSongPlayer;
