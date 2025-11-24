
import { useRef } from 'react';

const DrumPad = ({ pad, onPlay, active }) => {
  const audioRef = useRef(null);

  const handlePlay = () => {
    //if connected to audio element, play the sound
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => {
        //ignore AbortError, log others
        if (e.name !== 'AbortError') {
          console.error('Audio play error:', e);
        }
      });
    }
    //update display content in app component
    (onPlay) ? onPlay(pad.sound.name): 0;
    }
  

  return (
    <button
      className={`drum-pad${active ? ' active' : ''}`}
      id={pad.sound.name}
      onClick={handlePlay}
    >
      {pad && pad.key ? pad.key : 'Drum Pad'}
      <audio className="clip" id={pad.key} ref={audioRef} src={pad.sound.url} />
    </button>
  );
};

export default DrumPad;
