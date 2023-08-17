import React, { useState, useEffect } from "react";
import { Canvas, } from "react-three-fiber";
import { CircularProgress, Grid } from "@mui/material/";
import { XR, ARButton, VRButton, } from '@react-three/xr'

import XrHitModel from "./XrHitModel";

import VRScene from "./VRScene";
import { isMobile } from 'react-device-detect';

function Viewer() {
    const searchParams = new URLSearchParams(document.location.search);
    const [mode, setMode] = useState("VR");


    const [modelUrl] = useState(
        decodeURIComponent(searchParams.get("URL"))
    );

    console.log("LE URL: " + modelUrl)
    const [scale] = useState(parseFloat(searchParams.get("SCALE") ?? "0.1"));

    useEffect(() => {
        async function checkXRSupport() {
            const supported = await navigator.xr.isSessionSupported("immersive-vr");
            setMode((!isMobile && supported) ? "VR" : "AR")
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
                <h1>Dimension Swap</h1>

                {modelUrl !=="" ?

                    <Grid item style={{ flex: 1, width: "100%" }}>
                        {(mode === "AR") &&
                            <>
                                <ARButton sessionInit={{
                                    requiredFeatures: ["hit-test"],
                                }} />
                                <Canvas >
                                    <XR referenceSpace="local">

                                        <XrHitModel modelUrl={modelUrl} scale={scale} />

                                    </XR>
                                </Canvas>
                            </>
                        }

                        {(mode === "VR") &&
                            <>
                                <VRButton />
                                <Canvas>
                                    <XR>
                                        <VRScene modelUrl={modelUrl} scale={scale} />
                                    </XR>
                                </Canvas>
                            </>
                        }
                    </Grid>
                    :
                    <CircularProgress />
                }
            </Grid>
        </>
    );
}

export default Viewer;
