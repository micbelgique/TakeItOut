import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "react-three-fiber";
import { CircularProgress, Grid, Button, Typography } from "@mui/material/";
import { XR, ARButton, VRButton } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import XrHitModel from "./XrHitModel";
import HitModel from "./HitModel";

import VRScene from "./VRScene";
import { isMobile } from "react-device-detect";

function Viewer() {
  const searchParams = new URLSearchParams(document.location.search);
  const [mode, setMode] = useState("VR");
  const [rotation, setRotation] = useState([0, 0, 0]);

  const [currentView, setCurrentView] = useState("top");
  const [title, setTitle] = useState("Vue du haut"); // Ajout du titre

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
    let newTitle = "";
    if (view === "top") {
      rotateToView([1.5, 0.5, 0], "top");
      newTitle = "Vue du haut";
    } else if (view === "side") {
      rotateToView([0, 1.5, 0], "side");
      newTitle = "Vue latérale";
    } else if (view === "back") {
      rotateToView([0, 3.2, 0], "back");
      newTitle = "Vue arrière";}
      else if (view === "front") {
        rotateToView([0, 0, 0], "back");
        newTitle = "Vue centrale";
    }
    setCurrentView(view);
    setTitle(newTitle); 
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
      <Typography
        style={{
          fontSize: "2.9em",
        }}
      >
        Dimension Swap
      </Typography>
      <Grid container spacing={0} marginTop={2}>
        {modelUrl !== "" ? (
          <>
            <Grid item xs={8} height={750}>
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
            <Grid item xs={4} marginTop={15}>
              <h1 style={{ fontSize: "1.5em", marginBottom: "15px" }}>
                {title}
              </h1>
              <p style={{ fontSize: "1.2em", marginBottom: "15px" }}>
                Découvrez notre innovation tridimensionnelle exceptionnelle.
                Plongez dans une expérience visuelle immersive avec notre objet
                3D révolutionnaire.
              </p>
              <p style={{ marginBottom: "15px" }}>
                Notre objet est méticuleusement conçu pour capturer l'essence
                même de l'élégance et de la fonctionnalité. Explorez chaque
                facette en utilisant les commandes ci-dessous :
              </p>
              {["top", "side", "front", "back"].map((view) => {
                if (view !== currentView) {
                  return (
                    <Button
                      key={view}
                      style={{
                        background: "#2e2e30",
                        color: "#fff",
                        fontSize: "0.9em",
                        marginRight: "10px",
                        padding: "10px 20px",
                        borderRadius: "8px",
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
                  );
                }
                return null;
              })}
              <p style={{ marginTop: "20px", color: "#777" }}>
                Explorez notre objet sous tous les angles pour apprécier son
                design innovant. Relevez le niveau de votre expérience visuelle
                dès maintenant.
              </p>
              <p>
                Chaque détail est une fusion parfaite de forme et de fonction,
                créant une œuvre d'art technologique. Notre objet redéfinit les
                normes avec son esthétique raffinée et ses performances
                exceptionnelles.
              </p>
              <p>
                Que vous soyez passionné par le design ou à la recherche d'une
                expérience utilisateur exceptionnelle, notre objet 3D est conçu
                pour répondre à toutes vos attentes.
              </p>
              <p>
                La qualité de fabrication et l'ingénierie de pointe sont les
                piliers de notre engagement envers l'excellence. Découvrez une
                nouvelle dimension de la technologie avec notre objet 3D unique
                en son genre.
              </p>
            </Grid>
          </>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </>
  );
}

export default Viewer;
