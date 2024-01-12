import React, { useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import { CircularProgress, Grid, Button } from "@mui/material/";
import { XR, ARButton, VRButton } from "@react-three/xr";


import XrHitModel from "./XrHitModel";
import HitModel from "./HitModel";


import VRScene from "./VRScene";
import { isMobile } from "react-device-detect";

function Viewer() {
  const searchParams = new URLSearchParams(document.location.search);
  const [mode, setMode] = useState("VR");
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, 0, 0]);
 
  const handleViewTop = () => {
    
    const targetRotation = [1.5, 0.5, 0];
    const transitionDuration = 700; 
    const transitionInterval = 10; 
    const totalSteps = transitionDuration / transitionInterval;
    const stepRotation = targetRotation.map((value, index) => (value - rotation[index]) / totalSteps);

    let currentStep = 0;
    const transition = setInterval(() => {
        setRotation(prevRotation => prevRotation.map((value, index) => value + stepRotation[index]));
        currentStep++;

        if (currentStep >= totalSteps) {
            clearInterval(transition);
            setRotation(targetRotation);
        }
    }, transitionInterval);
};
  const [modelUrl] = useState(decodeURIComponent(searchParams.get("URL")));

  console.log(" URL: " + modelUrl);
  const [scale] = useState(parseFloat(searchParams.get("SCALE") ?? "0.1"));



  useEffect(() => {
    async function checkXRSupport() {
      if (navigator.xr) {
        const supported = await navigator.xr.isSessionSupported("immersive-vr");
        setMode(!isMobile && supported ? "VR" : "AR");
      } else {
        console.error("WebXR not supported in this browser.");
        setMode("not supported");
      }
    }
    checkXRSupport();
  }, []);

  return (
    <>
      <h1>Dimension Swap</h1>
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        {modelUrl !== "" ? (
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{ height: "80%", padding: "2px", width: "80%" }}
          >
            {mode === "not supported" && (
              <>
                <Canvas>
                  <ambientLight intensity={1} />
                  <spotLight
                    intensity={1}
                    angle={1.5}
                    penumbra={1}
                    position={[0, 15, 10]}
                  />
                  <spotLight
                    intensity={1}
                    angle={1.5}
                    penumbra={1}
                    position={[0, 15, -10]}
                  />
                  <spotLight
                    intensity={1}
                    angle={1.5}
                    penumbra={1}
                    position={[10, 15, 0]}
                  />
                  <spotLight
                    intensity={1}
                    angle={1.5}
                    penumbra={1}
                    position={[-10, 15, 0]}
                  />
                  <HitModel modelUrl={modelUrl} scale={scale} rotation={rotation}/>
                </Canvas>
              </>
            )}
            {mode === "AR" && (
              <>
                <ARButton
                  sessionInit={{
                    requiredFeatures: ["hit-test"],
                  }}
                />
                <Canvas>
                  <XR referenceSpace="local">
                    <ambientLight intensity={1} />
                    <spotLight
                      intensity={1}
                      angle={1.5}
                      penumbra={1}
                      position={[0, 15, 10]}
                    />
                    <spotLight
                      intensity={1}
                      angle={1.5}
                      penumbra={1}
                      position={[0, 15, -10]}
                    />
                    <spotLight
                      intensity={1}
                      angle={1.5}
                      penumbra={1}
                      position={[10, 15, 0]}
                    />
                    <spotLight
                      intensity={1}
                      angle={1.5}
                      penumbra={1}
                      position={[-10, 15, 0]}
                    />
                    <XrHitModel modelUrl={modelUrl} scale={scale} />
                  </XR>
                </Canvas>
              </>
            )}
            {mode === "VR" && (
              <>
                <VRButton />
                <Canvas>
                  <XR>
                    <VRScene modelUrl={modelUrl} scale={scale} />
                  </XR>
                </Canvas>
              </>
            )}
          </Grid>
        ) : (
          <CircularProgress />
        )}
    
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewTop}
            style={{ position: "absolute", bottom: 100 }}
          >
            View top
          </Button>
      </Grid>
    </>
  );
}

export default Viewer;
