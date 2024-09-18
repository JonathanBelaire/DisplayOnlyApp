import { useState } from 'react';





export default function ImageButton(props) {
  const [showQRCode, setShowQRCode] = useState(false);

  var self = this;

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
    opacity: !showQRCode ? 1 : 0
  };

  var qrStyle = {
    ...baseStyle,
    opacity: showQRCode ? 1 : 0
  };


  return (
    <div onClick={() => {toggleFeature()}} class="image-button-wrapper" >
      <img className="display-image image-button" src={props.image} style={displayStyle} />
      <img className="active-image image-button" src={props.activeImage} style={qrStyle} />
    </div>
  );
}
