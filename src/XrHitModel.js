
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useRef, useState } from "react";
import Model from "./Model";
import { PositionPoint } from "@react-three/drei";
import { Vector3 } from "three";


const XrHitModel = () => {
  const reticleRef = useRef();
  const secondReticleRef = useRef();
    const [currentModel, setCurrentModel] = useState({position: [10,0,0], rotation:[0,0,0]});

    const [retColor, setRetColor] = useState("white")

  const { isPresenting } = useXR();

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

    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
    secondReticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
    secondReticleRef.current.position.y -= 1.5;
    secondReticleRef.current.position.z -= 0.5;

  });

  const placeModel = (e) => {
    let position = e.intersection.object.position.clone();
    const offset = 0.05; // Remplacez par la valeur d'offset souhaitée
    position.y += offset;
    // let position2 = {...position}
    // alert(JSON.stringify(position) + " /// " + JSON.stringify(position2) )
    // position = new PositionPoint(position.x, position.y, position.z)
    setRetColor("red");
    setCurrentModel({position: position, rotation: currentModel.rotation});
  };

  const turnModel = (e) => {
    
    const newRotation = [currentModel.rotation[0], currentModel.rotation[1]+0.25, currentModel.rotation[2]]
    
    setCurrentModel({position: currentModel.position, rotation: newRotation});
  };

  return (
    <>
    
    
      <ambientLight />

      {isPresenting && (
        <>
          <Interactive onSelect={(e)=>{turnModel(e)}}>
          <Model position={currentModel.position} rotation={currentModel.rotation} scale={[0.0150, 0.0150, 0.0150]}/>
          </Interactive>
          
          <Interactive onSelect={placeModel}>
            <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
              <ringGeometry args={[0.03, 0.05, 32]} />
              <meshStandardMaterial color={retColor} />
            </mesh>
            <mesh ref={secondReticleRef} rotation-x={-Math.PI / 2}>
              <ringGeometry args={[0.03, 0.05, 32]} />
              <meshStandardMaterial color={"yellow"} />
            </mesh>
          </Interactive>


        </>
      )}

      {!isPresenting && <Model/>}
    </>
  );
};

export default XrHitModel;