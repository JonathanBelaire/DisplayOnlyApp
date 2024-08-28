
import { MemoryRouter as Router, Routes, Route, MemoryRouter } from 'react-router-dom';
import './Home.css';
import { useState } from 'react';
import Game from '../game/Game';
import ImageButton from '../components/ImageButton';

import venmoGif from '../../../assets/DisplayOnly_Venmo.gif';
import socialGif from '../../../assets/DisplayOnly_Social.gif';
import backgroundGif from '../../../assets/DisplayOnly_Social.gif';



export default function Home() {
  const [test, setTest] = useState(false);

  function toggleTest(){
    setTest(!test);
  }

  var style = {
    backgroundImage: `url(${backgroundGif})`
  }

  return (
    <div style={style} className="home-wrapper"  >

      <div className="tv-wrapper">

          <ImageButton text="Venmo" image={venmoGif}/>
          <ImageButton text="Social" image={socialGif}/>

      </div>
      <div hidden={test}>

      </div>
    </div>
  );
}
