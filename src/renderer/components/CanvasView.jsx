import { useEffect, useRef useState } from 'react';

import { createCanvas, loadImage } from 'canvas';

const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')






export default function CanvasView(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //Our first draw
    context.fillStyle = '#000000'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])

  return (<canvas ref={canvasRef} {...props}/>);



}

