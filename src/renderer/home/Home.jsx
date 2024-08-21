
import { MemoryRouter as Router, Routes, Route, MemoryRouter } from 'react-router-dom';
import './Home.css';
import { useState } from 'react';
import Game from '../game/Game';



export default function Home() {
  const [test, setTest] = useState(false);

  function toggleTest(){
    setTest(!test);
  }

  return (
    <div>
      <div className="Hello">
        <Game/>
      </div>
      <div className="display-only-header">
        <h1>Display Only</h1>

      </div>
      <div className="Hello">
          <button type="button" onClick={e => toggleTest()}>
            <span role="img" aria-label="books">
              Social
            </span>
          </button>

          <button type="button" onClick={e => toggleTest()}>
            <span role="img" aria-label="folded hands">
              Venmo
            </span>
          </button>

      </div>
      <div hidden={test}>
        THIS IS THE TEST DIV
      </div>
    </div>
  );
}
