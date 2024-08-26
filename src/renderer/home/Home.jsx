
import { MemoryRouter as Router, Routes, Route, MemoryRouter } from 'react-router-dom';
import './Home.css';
import { useState } from 'react';
import Game from '../game/Game';
import ImageButton from '../components/ImageButton';



export default function Home() {
  const [test, setTest] = useState(false);

  function toggleTest(){
    setTest(!test);
  }

  return (
    <div>
      <div className="display-only-header">
        <h1>Display Only</h1>

      </div>
      <div className="Hello">
          <ImageButton width="300" height="300" />
          <span role="img" aria-label="books">
            Social
          </span>

          <ImageButton width="300" height="300"/>

          <span role="img" aria-label="folded hands">
            Venmo
          </span>

      </div>
      <div hidden={test}>

      </div>
    </div>
  );
}
