
import { MemoryRouter as Router, Routes, Route, MemoryRouter } from 'react-router-dom';
import './Home.css';
import { useState } from 'react';
import Game from '../game/Game';
import ImageButton from '../components/ImageButton';

import venmoGif from '../../../assets/DisplayOnly_Venmo.gif';
import socialGif from '../../../assets/DisplayOnly_Social.gif';
import backgroundGif from '../../../assets/DisplayOnly_Background.gif';

import venmoQRGif from '../../../assets/DisplayOnly_Venmo_QR.gif';
import socialQRGif from '../../../assets/DisplayOnly_Social_QR.gif';



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

          <ImageButton text="Venmo" width="450" height="450" showQRCode={false} image={venmoGif} activeImage={venmoQRGif}/>
          <ImageButton text="Social" width="450" height="450" showQRCode={false} image={socialGif} activeImage={socialQRGif}/>

      </div>
      <div hidden={test}>

      </div>
    </div>
  );
}
