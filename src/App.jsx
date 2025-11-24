
import DrumPad from './components/DrumPad';
import './App.css';
import { useState, useEffect } from 'react';

const pads = [
  { key: 'Q', sound: { name: 'Heater 1', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3' } },
  { key: 'W', sound: { name: 'Heater 2', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3' } },
  { key: 'E', sound: { name: 'Heater 3', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3' } },
  { key: 'A', sound: { name: 'Heater 4', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3' } },
  { key: 'S', sound: { name: 'Clap', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3' } },
  { key: 'D', sound: { name: 'Open-HH', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3' } },
  { key: 'Z', sound: { name: 'Kick n\'-Hat', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3' } },
  { key: 'X', sound: { name: 'KICK', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3' } },
  { key: 'C', sound: { name: 'Closed-HH', url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' } },
];


function App() {
  const [activePad, setActivePad] = useState("");
  const [display, setDisplay] = useState('DISPLAY');

  const handlePlay = (padName) => {
    setDisplay(padName);
    setActivePad(padName);
    setTimeout(() => setActivePad(""), 150);//reset pad highlight
  };

  useEffect(() => {
    //keyboard event listener
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      const pad = pads.find(p => p.key === key);
      if (pad) {
        //fnd the right drum pad by its text content
        const buttons = document.querySelectorAll('.drum-pad');
        buttons.forEach(btn => { (btn.textContent === pad.key) ? btn.click() : 0; });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);//cleanup function
  }, []);

  return (
      <div id="drum-machine">
        <div className="drum-grid">
          {pads.map(pad => (
            <DrumPad
            key={pad.key}
            pad={pad}
            onPlay={handlePlay}
            active={activePad === pad.sound.name}
            />
          ))}
        </div>
        <h2 id="display">{display}</h2>
      </div>
  );
}

export default App;
