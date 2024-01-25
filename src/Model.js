
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Model(props) {
    const gltf = useLoader(GLTFLoader, props.modelUrl || "/SecondModifiedBatiment") 
    return (
        <>
        <primitive
            object={gltf.scene}
            scale={props.scale || [0.1, 0.1, 0.1]}
            position={props.position || [0, 0, 0]}
            rotation={props.rotation || [0, 0, 0]}
            onClick={props.onClick}
        />
        </>
    );
}


export default Model;