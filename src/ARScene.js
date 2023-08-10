import { Suspense, useRef, useState } from "react";
import Model from "./Model";
import { useFrame, useThree } from "react-three-fiber";
import { Matrix4, Raycaster, Vector3 } from "three";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Controllers, Interactive, useHitTest, useXR } from "@react-three/xr";

function ARScene() {
    const [objectPosition, setObjectPosition] = useState([10, 0, 0])
    const modelRef = useRef(null);
    const [isAutoRotating, setIsAutoRotating] = useState(true);
    const {player, controllers} = useXR()

    const onSelect = () => {
        setObjectPosition(controllers[0].matrixWorld)
        
      }


    return (
        <>
            <ambientLight intensity={1} />
            <spotLight intensity={1} angle={1.5} penumbra={1} position={[0, 15, 10]} />
            <spotLight intensity={1} angle={1.5} penumbra={1} position={[0, 15, -10]} />
            <spotLight intensity={1} angle={1.5} penumbra={1} position={[10, 15, 0]} />
            <spotLight intensity={1} angle={1.5} penumbra={1} position={[-10, 15, 0]} />
            <Controllers/>
            <Interactive onSelect={onSelect}>
                <Suspense fallback={null}>
                    <Model ref={modelRef} scale={[0.5, 0.5, 0.5]}  />
                </Suspense>
            </Interactive>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={60}>
                <OrbitControls autoRotate={isAutoRotating} autoRotateSpeed={1} />
            </PerspectiveCamera></>


    );
}

export default ARScene;