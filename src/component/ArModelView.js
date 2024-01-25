import React from "react";
import "@google/model-viewer";

const ArModelView = ({ modelUrl }) => {
  return (
    <div>
      <model-viewer
        style={{
          width: "100%",
          maxWidth: "1200px",
          justifyContent: "center",
          height: "50vh",
        }}
        alt="batiment"
        src={modelUrl}
        ar
        ar-modes="scene-viewer quick-look webxr"
        shadow-intensity="1"
        camera-controls
        touch-action="pan-y"
      ></model-viewer>
    </div>
  );
};

export default ArModelView;
