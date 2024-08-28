import { useState } from 'react';
import icon from '../../../assets/DisplayOnlyTv_2.gif';




export default function ImageButton(props) {
  const [test, setTest] = useState(false);

  var self = this;

  function toggleFeature(){
    if(props.toggleFeature){
      props.toggleFeature();
      console.log("toggle called");
    }
  }

  var inlineStyle = {
    backgroundImage: `url(${props.image})`,
    width:props.width,
    height:props.height
  };

  return (
    <div className='image-button-wrapper' style={inlineStyle}  >
      <div onClick={() => {toggleFeature()}} >
      </div>
    </div>
  );
}
