
import { useEffect } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Model(props) {
    // const { scene } = useGLTF("https://sa0dimensionswap.blob.core.windows.net/models/SecondModifiedBatiment.gltf");
    
    const gltf = useLoader(GLTFLoader, props.modelUrl || "")


    
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