import { useRef } from "react";
import Model from "./Model";
import { useFrame } from "react-three-fiber";
import { Matrix4, Vector3 } from "three";
import { PerspectiveCamera } from "@react-three/drei";

function ARScene() {
    const modelRef = useRef();
  
  
    

    return (
        <group ref={modelRef}>
            <Model scale={[0.5, 0.5, 0.5]} />
        </group>
    );
}

export default ARScene;