import bwipjs from "bwip-js";
import React, { useState, useEffect } from "react";

export default function QrCodegenerator() {
  const [src, setImageSrc] = useState(false);
  const currentUrl = window.location.href;

  useEffect(() => {
    let canvas = document.createElement("canvas");
    bwipjs.toCanvas(canvas, {
      bcid: "qrcode",
      text: currentUrl,
      scale: 3,
      height: 25,
      includetext: "true",
      textxalign: "center",
    });
    setImageSrc(canvas.toDataURL("image/png"));
  }, []);
 
  return <img src={src} alt="Qr Code" />;
}
