
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useRef, useState } from "react";
import Model from "./Model";
import { OrbitControls } from "@react-three/drei";



const XrHitModel = (props) => {
  const reticleRef = useRef();
  const secondReticleRef = useRef();
  const thirdReticleRef = useRef();
  const [currentModel, setCurrentModel] = useState({ position: [10, 0, 0], rotation: [0, 0, 0] });
  const [modelScale, setModelScale] = useState(props.scale || 0.0150)
  const [scaleAddition] = useState(0.0005);

  const { isPresenting } = useXR();
  const [isAutoRotating, setIsAutoRotating] = useState(true);

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
    hitMatrix.decompose(
      secondReticleRef.current.position,
      secondReticleRef.current.quaternion,
      secondReticleRef.current.scale
    );
    hitMatrix.decompose(
      thirdReticleRef.current.position,
      thirdReticleRef.current.quaternion,
      thirdReticleRef.current.scale
    );

    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
    secondReticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
    thirdReticleRef.current.rotation.set(-Math.PI / 2, 0, 0);

    secondReticleRef.current.position.y -= 1;
    secondReticleRef.current.position.z -= 0.25;
    thirdReticleRef.current.position.y -= 1;
    thirdReticleRef.current.position.z += 0.25;

  });

  const placeModel = (e) => {
    let position = e.intersection.object.position.clone();
    const offset = 0.05;
    position.y += offset;

    setCurrentModel({ position: position, rotation: currentModel.rotation });
  };

  const makeModelBigger = () => {
    setModelScale(modelScale + scaleAddition)
  }
  const makeModelSmaller = () => {
    if (modelScale > scaleAddition) setModelScale(modelScale - scaleAddition)
  }

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
          <Interactive onSelect={makeModelBigger}>
            <mesh ref={secondReticleRef} rotation-x={-Math.PI / 2}>
              <ringGeometry args={[0.03, 0.05, 32]} />
              <meshStandardMaterial color={"red"} />
            </mesh>
          </Interactive>
          <Interactive onSelect={makeModelSmaller}>
            <mesh ref={thirdReticleRef} rotation-x={-Math.PI / 2}>
              <ringGeometry args={[0.03, 0.05, 32]} />
              <meshStandardMaterial color={"green"} />
            </mesh>
          </Interactive>


        </>
      )}

      {!isPresenting &&
        <>
          <ambientLight intensity={1} />
          <spotLight intensity={1} angle={1.5} penumbra={1} position={[0, 15, 10]} />
          <spotLight intensity={1} angle={1.5} penumbra={1} position={[0, 15, -10]} />
          <spotLight intensity={1} angle={1.5} penumbra={1} position={[10, 15, 0]} />
          <spotLight intensity={1} angle={1.5} penumbra={1} position={[-10, 15, 0]} />
          <group onPointerDown={handleTouchStart}>
            <OrbitControls autoRotate={isAutoRotating} />
            <Model modelUrl={props.modelUrl} />
          </group>
        </>}
    </>
  );
};

export default XrHitModel;