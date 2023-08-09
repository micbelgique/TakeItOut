import { useGLTF } from "@react-three/drei";

function Model(props) {
    const { scene } = useGLTF("/SecondModifiedBatiment.gltf");

    return (
        <primitive
            object={scene}
            scale={props.scale || [0.1, 0.1, 0.1]}
            position={props.position || [10, 0, 0]}
            rotation={props.rotation || [0, 80, 0]}
            onClick={props.onClick}
        />
    );
}

export default Model;