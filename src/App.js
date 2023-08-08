import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { VRCanvas, ARCanvas } from "react-xr";
import { Grid, Switch, Button } from "@mui/material/";
import { OrbitControls } from '@react-three/drei'
import { SecondModifiedBatiment } from "./SecondModifiedBatiment";
import "./AppStyle.css"; // Import the CSS file

function Model(props) {
  const { scene } = useGLTF("/SecondModifiedBatiment.gltf");

  return (
    <primitive
      object={scene}
      scale={props.scale || [0.1, 0.1, 0.1]}
      position={props.position || [0, 0, 5]}
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
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isXrSupported, setIsXrSupported] = useState(false);

  const handleSceneModeChange = (event) => {
    setMode(event.target.checked ? "ar" : "vr");
  };
  const handleAutoRotateChange = (event) => {
    setIsAutoRotating(event.target.checked);
  };

  const XRCanvas = mode === "vr" ? VRCanvas : ARCanvas;

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
        }
        <Grid item>
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item>
              <Switch
                checked={isAutoRotating}
                onChange={handleAutoRotateChange}
                name="autorotate-switch"
              />
            </Grid>



            <Grid item>
              <label htmlFor="autorotate">
                "Auto-rotate"
              </label>
            </Grid>
          </Grid>
        </Grid>

        <Canvas style={{ background: "white" }}>
          <ambientLight intensity={1} />
          <spotLight intensity={1} angle={1.5} penumbra={1} position={[0, 15, 10]} />
          <spotLight intensity={1} angle={1.5} penumbra={1} position={[0, 15, -10]} />
          <spotLight intensity={1} angle={1.5} penumbra={1} position={[10, 15, 0]} />
          <spotLight intensity={1} angle={1.5} penumbra={1} position={[-10, 15, 0]} />
          <Suspense fallback={null}>
            <SecondModifiedBatiment />
          </Suspense>
          <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={60}>
            <OrbitControls autoRotate={isAutoRotating} autoRotateSpeed={1} />
          </PerspectiveCamera>
        </Canvas>

        {isXrSupported &&
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
        }
      </Grid>
    </>
  );
}

export default App;
