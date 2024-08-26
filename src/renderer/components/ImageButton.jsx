import { useState } from 'react';
import icon from '../../../assets/icon.png';




export default function ImageButton(props) {
  const [test, setTest] = useState(false);

  var self = this;

  function toggleFeature(){
    console.log("test");
  }

  return (
    <div onClick={() => {toggleFeature()}}>
      <img src={icon} width={props.width} height={props.height}/>
    </div>
  );
}
