import { useEffect, useState } from 'react';





export default function ImageButton(props) {
  const [showQRCode, setShowQRCode] = useState(false);
  const [opacityFloor, setOpacityFloor] = useState(.1);

  setTimeout(() => {setOpacityFloor(0)}, 250);

  var self = this;

  console.log(opacityFloor);

  function toggleFeature(){
    setShowQRCode(!showQRCode);
  }
  var baseStyle={
    width:props.width,
    height:props.height,
    zIndex: 100,
    position: "absolute",
  }

  var displayStyle = {
    ...baseStyle,
    opacity: !showQRCode ? 1 : opacityFloor
  };

  var qrStyle = {
    ...baseStyle,
    opacity: showQRCode ? 1 : opacityFloor
  };


  return (
    <div onClick={() => {toggleFeature()}} class="image-button-wrapper" >
      <img className="display-image image-button" src={props.image} style={displayStyle} />
      <img className="active-image image-button" src={props.activeImage} style={qrStyle} />
    </div>
  );
}
