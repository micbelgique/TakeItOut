import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { useGLTF } from "@react-three/drei";
import { VRCanvas, ARCanvas } from "react-xr";
import { Grid, Switch, Button } from "@mui/material/";
import { OrbitControls } from '@react-three/drei'

function Model(props) {
  const { scene } = useGLTF("/batiment.gltf");

  return (
    <primitive
      object={scene}
      scale={props.scale || [0.1, 0.1, 0.1]}
      onClick={props.onClick}
    />
  );
}

function Sphere() {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} scale={[0.1, 0.1, 0.1]}>
      <sphereBufferGeometry />
      <meshStandardMaterial color={"#FA4"} />
    </mesh>
  );
}

function App() {
  const [showCube, setShowCube] = useState(true);
  const [mode, setMode] = useState("vr");

  const handleSceneModeChange = (event) => {
    setMode(event.target.checked ? "ar" : "vr");
  };

  const XRCanvas = mode === "vr" ? VRCanvas : ARCanvas;

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{ height: "100vh" }} // Adjust the height of the container to fill the viewport
      >
        <h1>DEMO AR/VR</h1>

        <Grid item>
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item>
              <Switch
                checked={mode === "ar"}
                onChange={handleSceneModeChange}
                name="scene-mode-switch"
              />
            </Grid>
            <Grid item>
              <label htmlFor="scene-mode-switch">
                {mode === "vr" ? "VR Mode" : "AR Mode"}
              </label>
            </Grid>
          </Grid>
        </Grid>

        <Grid item style={{ flex: 1, width: "100%" }}>
          <XRCanvas style={{ height: "80%", width: "100%" }}> 
            {showCube ? (
              <Model scale={[0.5, 0.5, 0.5]} />
            ) : (
              <Sphere />
            )}
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
          </XRCanvas>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
