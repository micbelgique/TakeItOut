import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Grid, Switch, Button } from "@mui/material/";
import { OrbitControls } from '@react-three/drei'
import { SecondModifiedBatiment } from "./SecondModifiedBatiment";
import "./AppStyle.css"; // Import the CSS file
import ARScene from "./ARScene";
import { Interactive, XR, ARButton, Controllers } from '@react-three/xr'
import Model from "./Model";
import { Vector3 } from "three";
import XrHitCube from "./XrHitModel";
import XrHitModel from "./XrHitModel";


function App() {
  const [mode, setMode] = useState("vr");
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isXrSupported, setIsXrSupported] = useState(false);
  const [objectPosition, setObjectPosition] = useState([10, 0, 0])


  const handleSceneModeChange = (event) => {
    setMode(event.target.checked ? "ar" : "vr");
  };
  const handleAutoRotateChange = (event) => {
    setIsAutoRotating(event.target.checked);
  };

  const onSelect = () => {
    setObjectPosition([5, 0, 0]);

  }
  //  const XRCanvas = mode === "vr" ? VRCanvas : ARCanvas;

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
                  checked={mode === "ar"}
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
          <ARButton sessionInit={{
            requiredFeatures: ["hit-test"],
          }} />
          <Canvas onPointerMissed={onSelect}>
            <XR referenceSpace="local">
              <OrbitControls autoRotate={isAutoRotating}/>
              <ambientLight intensity={1} />
              <spotLight intensity={1} angle={1.5} penumbra={1} position={[0, 15, 10]} />
              <spotLight intensity={1} angle={1.5} penumbra={1} position={[0, 15, -10]} />
              <spotLight intensity={1} angle={1.5} penumbra={1} position={[10, 15, 0]} />
              <spotLight intensity={1} angle={1.5} penumbra={1} position={[-10, 15, 0]} />
              <XrHitModel/>
            </XR>
          </Canvas>
        </Grid>

        {isXrSupported &&
          <Grid item style={{ flex: 1, width: "100%" }}>
            {/* <XRCanvas style={{ height: "80%", width: "100%" }} >

              <ambientLight intensity={1} />
              <spotLight intensity={1} angle={1.5} penumbra={1} position={[0, 15, 10]} />
              <spotLight intensity={1} angle={1.5} penumbra={1} position={[0, 15, -10]} />
              <spotLight intensity={1} angle={1.5} penumbra={1} position={[10, 15, 0]} />
              <spotLight intensity={1} angle={1.5} penumbra={1} position={[-10, 15, 0]} />

              <ARScene />
            </XRCanvas> */}
            {/* <ARButton />
            <Canvas>
              <XR referenceSpace="local">
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                  <Model/>
                </Suspense>
                <Controllers />
              </XR>
            </Canvas> */}
          </Grid>
        }
      </Grid>
    </>
  );
}

export default App;
