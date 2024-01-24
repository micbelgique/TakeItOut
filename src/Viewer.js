import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "react-three-fiber";
import { CircularProgress, Grid, Button,useMediaQuery  } from "@mui/material/";
import { XR, ARButton, VRButton } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";
import XrHitModel from "./XrHitModel";
import HitModel from "./HitModel";
import VRScene from "./VRScene";
import { isMobile } from "react-device-detect";


function Viewer() {
  const searchParams = new URLSearchParams(document.location.search);
  const [mode, setMode] = useState("not supported");
  const [rotation, setRotation] = useState([0, 0, 0]);
  const isSmallScreen = useMediaQuery("(max-width:800px)");

  const [currentView, setCurrentView] = useState("front");

  const [dimensions, setDimensions] = useState("webXr");
  const controls = useRef();

  const rotateToView = (targetRotation, view) => {
    setCurrentView(view);
    const transitionDuration = 700;
    const transitionInterval = 10;
    const totalSteps = transitionDuration / transitionInterval;
    const stepRotation = targetRotation.map(
      (value, index) => (value - rotation[index]) / totalSteps
    );

    let currentStep = 0;
    const transition = setInterval(() => {
      setRotation((prevRotation) =>
        prevRotation.map((value, index) => value + stepRotation[index])
      );
      currentStep++;

      if (currentStep >= totalSteps) {
        clearInterval(transition);
        setRotation(targetRotation);
      }
    }, transitionInterval);
  };

  const handleViewChange = (view) => {
    if (view === "top") {
      rotateToView([1.5, 0.5, 0], "top");
    } else if (view === "side") {
      rotateToView([0, 1.5, 0], "side");
    } else if (view === "back") {
      rotateToView([0, 3.2, 0], "back");
    } else if (view === "front") {
      rotateToView([0, 0, 0], "front");
    }
    setCurrentView(view);
  };

  const [modelUrl] = useState(decodeURIComponent(searchParams.get("URL")));

  console.log(" URL: " + modelUrl);
  const [scale] = useState(parseFloat(searchParams.get("SCALE") ?? "0.1"));

  const swapdimensions = async () => {
    setMode("AR");
    if (mode === "AR") {
      setMode("not supported");
    }
  };

  useEffect(() => {
    async function checkXRSupport() {
      if (navigator.xr) {
        const supported = await navigator.xr.isSessionSupported("immersive-vr");
        setDimensions(isMobile && supported ? "webxr" : "webxr");
      } else {
        console.error("WebXR not supported in this browser.");
        setMode("not supported");
      }
    }
    checkXRSupport();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",   
        }}
      >
        <h1
          style={{
            fontSize: "2.9em",
          }}
        >
          Dimension Swap
        </h1>
        <Grid
          container
          spacing={2}
          marginTop={2}
          style={{ width: "100%", maxWidth: "1200px", justifyContent: "center", 
          height: "100vh",
          margin: "auto",  }}
          
        >
          {modelUrl !== "" ? (
            <>
              <Grid item xs={8} height={700}>
                {mode === "not supported" && (
                  <>
                    <Canvas>
                      <OrbitControls ref={controls} />
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
                      <HitModel
                        modelUrl={modelUrl}
                        scale={scale}
                        rotation={rotation}
                      />
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
                        <XrHitModel
                          modelUrl={modelUrl}
                          scale={scale}
                          rotation={rotation}
                        />
                      </XR>
                    </Canvas>
                  </>
                )}
                {mode === "VR" && (
                  <>
                    <VRButton />
                    <Canvas>
                      <XR>
                        <VRScene
                          modelUrl={modelUrl}
                          scale={scale}
                          rotation={rotation}
                        />
                      </XR>
                    </Canvas>
                  </>
                )}
              </Grid>
              <Grid item xs={isSmallScreen ? 6 : 4} marginTop={10}>
                {["top", "side", "front", "back"].map((view) => {
                    return (
                      <>
                        <Button
                          key={view}
                          style={{
                            background:
                            view === currentView ? "#D2D2D2" : "#2e2e30",
                            color: "white",
                            fontSize: "0.9em",
                            marginRight: "10px",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            maxWidth: "300px",
                            marginBottom: "10px",
                            width: "120px",
                            height: "80px",
                          }}
                          onClick={() => handleViewChange(view)}
                        >
                          Vue{" "}
                          {view === "top"
                            ? "du haut"
                            : view === "side"
                            ? "latérale"
                            : view === "front"
                            ? "frontale"
                            : "arrière"}
                        </Button>
                      </>
                    );

                })}
                {dimensions === "webxr" && (
                  <Button
                    style={{
                      background: "#217ace",
                      color: "#fff",
                      fontSize: "0.9em",
                      marginRight: "10px",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      maxWidth: "300px",
                      marginBottom: "10px",
                      width: "250px",
                      height: "80px",
                    }}
                    onClick={() => swapdimensions()}
                  >
                    Swap dimension
                  </Button>
                )}
                <p style={{ fontSize: "1.2em", paddingRight: "2%" }}>
                  Découvrez notre innovation tridimensionnelle exceptionnelle.
                  Plongez dans une expérience visuelle immersive avec notre
                  objet 3D révolutionnaire.
                </p>
                <p style={{ marginBottom: "15px", paddingRight: "2%" }}>
                  Notre objet est méticuleusement conçu pour capturer l'essence
                  même de l'élégance et de la fonctionnalité. Visionnez chaque
                  facette de notre objet pour en apprécier la beauté.
                </p>
                <p style={{ color: "#7777", paddingRight: "2%" }}>
                  Explorez notre objet sous tous les angles pour apprécier son
                  design innovant. Relevez le niveau de votre expérience
                  visuelle dès maintenant.
                </p>
              </Grid>
            </>
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </div>
    </>
  );
}

export default Viewer;
