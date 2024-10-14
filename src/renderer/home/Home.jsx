
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
import CanvasView from '../components/CanvasView';





export default function Home() {
  const [test, setTest] = useState(false);



  function toggleTest(){
    setTest(!test);
  }



  return (
    <div >
      <CanvasView width={1000} height={700}></CanvasView>

    </div>
  );
}
