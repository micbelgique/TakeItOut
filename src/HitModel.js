import { useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";

const HitModel = (props) => {
  const reticleRef = useRef();
  const [currentModel, setCurrentModel] = useState({
    position: [0, 0, 0], // Nouvelle position centrée
    rotation: [0, 0, 0],
  });
  const [modelScale] = useState(props.scale || 0.0150);

  useThree(({ camera }) => {
    camera.position.z = 2;
  });

  const placeModel = (e) => {
    let position = e.intersection.object.position.clone();
    const offset = 0.05;
    position.y += offset;

    setCurrentModel({
      position: position,
      rotation: currentModel.rotation,
    });
  };

  const turnModel = () => {
    const newRotation = [
      currentModel.rotation[0],
      currentModel.rotation[1] + 0.25,
      currentModel.rotation[2],
    ];

    setCurrentModel({
      position: currentModel.position,
      rotation: newRotation,
    });
  };

  const handleTouchStart = () => {
    
  };

  return (
    <>
      <ambientLight />
      <group onPointerDown={handleTouchStart}>
        <OrbitControls autoRotate={true} />
        <Model
          modelUrl={props.modelUrl}
          position={currentModel.position}
          rotation={currentModel.rotation}
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
