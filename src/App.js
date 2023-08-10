import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { PerspectiveCamera, Sky, useGLTF } from "@react-three/drei";
import { Grid, Switch, Button } from "@mui/material/";
import { OrbitControls } from '@react-three/drei'
import { SecondModifiedBatiment } from "./SecondModifiedBatiment";
import "./AppStyle.css"; // Import the CSS file

import { Interactive, XR, ARButton, Controllers, XRButton, VRButton, Hands, TeleportationPlane } from '@react-three/xr'
import Model from "./Model";

import XrHitModel from "./XrHitModel";
import Floor from "./Floor";
import { RayGrab } from "react-xr";



function App() {
  const [mode, setMode] = useState("AR");
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isXrSupported, setIsXrSupported] = useState(false);
  const [objectPosition, setObjectPosition] = useState([10, 0, 0])


  const handleSceneModeChange = (event) => {
    setMode(event.target.checked ? "AR" : "VR");
  };
  const handleAutoRotateChange = (event) => {
    setIsAutoRotating(event.target.checked);
  };

  useEffect(() => {
    async function checkXRSupport() {
      const supported = await navigator.xr.isSessionSupported("immersive-vr");
      setIsXrSupported(supported);
    }

    checkXRSupport();
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{ height: "100vh" }} // Adjust the height of the container to fill the viewport
      >
        <h1>DEMO AR/VR</h1>
        {!isXrSupported ?
          <Grid item>
            <h3>XR is not supported</h3>
          </Grid>
          :
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item style={{ width: "10vh" }}>
                <Switch
                  checked={mode === "AR"}
                  onChange={handleSceneModeChange}
                  name="scene-mode-switch"
                />
              </Grid>



              <Grid item style={{ width: "15vh" }}>
                <label htmlFor="scene-mode-switch">
                  {mode === "vr" ? "VR Mode" : "AR Mode"}
                </label>
              </Grid>
            </Grid>
          </Grid>
        }
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <Grid item style={{ width: "10vh" }}>
              <Switch
                checked={isAutoRotating}
                onChange={handleAutoRotateChange}
                name="autorotate-switch"
              />
            </Grid>



            <Grid item style={{ width: "15vh" }}>
              <label htmlFor="autorotate">
                Auto-rotate
              </label>
            </Grid>
          </Grid>
        </Grid>


        <Grid item style={{ flex: 1, width: "100%" }}>
          {(mode === "AR") &&
            <>
              <ARButton mode={mode} sessionInit={{
                requiredFeatures: ["hit-test"],
              }} />
              <Canvas >
                <XR referenceSpace="local">
                  <OrbitControls autoRotate={isAutoRotating} />
                  <ambientLight intensity={1} />
                  <spotLight intensity={1} angle={1.5} penumbra={1} position={[0, 15, 10]} />
                  <spotLight intensity={1} angle={1.5} penumbra={1} position={[0, 15, -10]} />
                  <spotLight intensity={1} angle={1.5} penumbra={1} position={[10, 15, 0]} />
                  <spotLight intensity={1} angle={1.5} penumbra={1} position={[-10, 15, 0]} />
                  <XrHitModel />
                </XR>
              </Canvas>
            </>
          }

          {(mode === "VR") &&
            <>
              <VRButton />
              <Canvas>
                <XR>
                  <Sky sunPosition={[0, 1, 0]} />
                  <Floor />
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  <Controllers />
                  <Hands />
                  <TeleportationPlane
                    rightHand={true}
                    /** The maximum distance from the camera to the teleportation point. Default is `10` */
                    maxDistance={10}
                    /** The radial size of the teleportation marker. Default is `0.25` */
                    size={0.25}
                  />
                  <RayGrab>
                  <Model position={[0, 1.8, -1]} />
                  </RayGrab>
                </XR>
              </Canvas>
            </>
          }
        </Grid>
      </Grid>
    </>
  );
}

export default App;
