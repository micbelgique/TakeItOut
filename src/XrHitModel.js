
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useRef, useState } from "react";
import Model from "./Model";
import { OrbitControls } from "@react-three/drei";



const XrHitModel = (props) => {
  const reticleRef = useRef();

  const [currentModel, setCurrentModel] = useState({ position: [0, 0, 0], rotation: [0, 0, 0] });
  const [modelScale] = useState(props.scale || 0.0150)


  const { isPresenting } = useXR();
  const [isAutoRotating, setIsAutoRotating] = useState(false);

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.z = 2;
    }
  });

  useHitTest((hitMatrix, hit) => {
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );


    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);


  });

  const placeModel = (e) => {
    let position = e.intersection.object.position.clone();
    const offset = 0.05;
    position.y += offset;

    setCurrentModel({ position: position, rotation: currentModel.rotation });
  };


  const turnModel = (e) => {

    const newRotation = [currentModel.rotation[0], currentModel.rotation[1] + 0.25, currentModel.rotation[2]]

    setCurrentModel({ position: currentModel.position, rotation: newRotation });
  };

  const handleTouchStart = () => {
    if (isAutoRotating) setIsAutoRotating(false)
  }

  return (
    <>
      <ambientLight />

      {isPresenting && (
        <>
          <Interactive onSelect={(e) => { turnModel(e) }}>
            <Model modelUrl={props.modelUrl} position={currentModel.position} rotation={currentModel.rotation} scale={[modelScale, modelScale, modelScale]} />
          </Interactive>

          <Interactive onSelect={placeModel}>
            <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
              <ringGeometry args={[0.03, 0.05, 32]} />
              <meshStandardMaterial color={"white"} />
            </mesh>
          </Interactive>
        </>
      )}

      {!isPresenting &&
        <group onPointerDown={handleTouchStart}>
          <OrbitControls autoRotate={isAutoRotating} />
          <Model modelUrl={props.modelUrl} />
        </group>
      }
    </>
  );
};

export default XrHitModel;