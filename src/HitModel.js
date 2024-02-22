import { useRef, useState,useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Model from "./Model";

const HitModel = (props) => {
  const reticleRef = useRef();
  const [currentModel] = useState({
    position: [0, 0, 0],       
  });

  useEffect(() => {
    reticleRef.current.rotation.set(props.rotation[0], props.rotation[1], props.rotation[2]);
  }, [props.rotation]);
  
  const [modelScale] = useState(props.scale || 0.0150);

  useThree(({ camera }) => {
    camera.position.z = 2;
  });

  const handleTouchStart = () => {
    console.log(reticleRef.current.rotation.position)
  };

  return (
    <>
      <ambientLight />
      <group onPointerDown={handleTouchStart}>
        <OrbitControls autoRotate={true} />
        <Model
          modelUrl={props.modelUrl}
          rotation={props.rotation}
          position={currentModel.position}
          scale={[modelScale, modelScale, modelScale]}
        />
      </group>
      <mesh ref={reticleRef} rotation-x={-Math.PI / 2} position={[0, 0, 0]}> 
        <ringGeometry args={[0.03, 0.05, 32]} />
        <meshStandardMaterial color={"white"} />
      </mesh>
    </>
  );
};

export default HitModel;
