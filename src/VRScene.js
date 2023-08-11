import { Sky } from "@react-three/drei";
import Floor from "./Floor";
import { Controllers, Hands, Interactive, RayGrab, TeleportationPlane } from "@react-three/xr";

import Model from "./Model";
import { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";

const VRScene = () => {
    const [modelPosition, setModelPosition] = useState([0, 1, -3]);
    const [modelRotation, setModelRotation] = useState([0, 0, 0]);
    const [modelScale, setModelScale] = useState(0.1);

    const [scalingSpeed, setScalingSpeed] = useState(0.0025);
    const [turningSpeed, setTurningSpeed] = useState(0.01);
    const [travelingSpeed, setTravelingSpeed] = useState(0.01);

    const [cubeBiggerPosition, setCubeBiggerPosition] = useState([1, 0.25, -0.5]);
    const [cubeSmallerPosition, setCubeSmallerPosition] = useState([1, 0.25, 0]);
    const [cubeTurnLeftPosition, setCubeTurnLeftPosition] = useState([1, 0.65, -0.5]);
    const [cubeTurnRightPosition, setCubeTurnRightPosition] = useState([1, 0.65, 0]);
    const [cubeMovingForwardPosition, setCubeMovingForwardPosition] = useState([1, 1.05, 0]);
    const [cubeMovingBackwardPosition, setCubeMovingBackwardPosition] = useState([1, 1.05, -0.5]);
    const [cubeGoingUpPosition, setCubeGoingUpPosition] = useState([1, 1.45, 0]);
    const [cubeGoingDownPosition, setCubeGoingDownPosition] = useState([1, 1.45, -0.5]);

    const [needToGetBigger, setNeedToGetBigger] = useState(false);
    const [needtoGetSmaller, setNeedToGetSmaller] = useState(false);
    const [needToTurnLeft, setNeedToTurnLeft] = useState(false);
    const [needToTurnRight, setNeedToTurnRight] = useState(false);
    const [needToMoveForward, setNeedToMoveForward] = useState(false);
    const [needToMoveBackward, setNeedToMoveBackward] = useState(false);
    const [needToGoUp, setNeedToGoUp] = useState(false);
    const [needToGoDown, setNeedToGoDown] = useState(false);


    const handleSelectStartBiggerCube = () => {
        if (!needtoGetSmaller) setNeedToGetBigger(true);

    }
    const handleSelectStartSmallerCube = () => {
        if (!needToGetBigger) setNeedToGetSmaller(true);
    }
    const handleSelectEndBiggerCube = () => {
        if (!needtoGetSmaller) setNeedToGetBigger(false);
    }
    const handleSelectEndSmallerCube = () => {
        if (!needToGetBigger) setNeedToGetSmaller(false);
    }
    const handleSelectStartTurnLeftCube = () => {
        if (!needToTurnRight) setNeedToTurnLeft(true)
    }
    const handleSelectStartTurnRightCube = () => {
        if (!needToTurnLeft) setNeedToTurnRight(true)
    }
    const handleSelectEndTurnLeftCube = () => {
        if (!needToTurnRight) setNeedToTurnLeft(false)
    }
    const handleSelectEndTurnRightCube = () => {
        if (!needToTurnLeft) setNeedToTurnRight(false)
    }
    const handleSelectStartMoveForwardCube = () => {
        if (!needToMoveBackward) setNeedToMoveForward(true)
    }
    const handleSelectStartMoveBackwardCube = () => {
        if (!needToMoveForward) setNeedToMoveBackward(true)
    }
    const handleSelectEndMoveForwardCube = () => {
        if (!needToMoveBackward) setNeedToMoveForward(false)
    }
    const handleSelectEndMoveBackwardCube = () => {
        if (!needToMoveForward) setNeedToMoveBackward(false)
    }
    const handleSelectStartGoUpCube = () => {
        if (!needToGoDown) setNeedToGoUp(true)
    }
    const handleSelectStartGoDownCube = () => {
        if (!needToGoUp) setNeedToGoDown(true)
    }
    const handleSelectEndGoUpCube = () => {
        if (!needToGoDown) setNeedToGoUp(false)
    }
    const handleSelectEndGoDownCube = () => {
        if (!needToGoUp) setNeedToGoDown(false)
    }

    useFrame((state, delta, xrFrame) => {
        if (needToGetBigger) setModelScale(modelScale + scalingSpeed)
        if (needtoGetSmaller && modelScale > 0.1) setModelScale(modelScale - scalingSpeed)
        if (needToTurnLeft) setModelRotation([0, modelRotation[1] + turningSpeed, 0])
        if (needToTurnRight) setModelRotation([0, modelRotation[1] - turningSpeed, 0])
        if (needToMoveForward) setModelPosition([modelPosition[0], modelPosition[1], modelPosition[2] - travelingSpeed])
        if (needToMoveBackward) setModelPosition([modelPosition[0], modelPosition[1], modelPosition[2] + travelingSpeed])
        if (needToGoUp) setModelPosition([modelPosition[0], modelPosition[1] + travelingSpeed, modelPosition[2]])
        if (needToGoDown) setModelPosition([modelPosition[0], modelPosition[1] - travelingSpeed, modelPosition[2]])
    })
    return (
        <>
            <Sky sunPosition={[0, 1, 0]} />
            <Floor />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Controllers />
            <Hands />
            <TeleportationPlane
                rightHand={true}
                /** The maximum distance from the camera to the teleportation point. Default is `10` */
                maxDistance={10}
                /** The radial size of the teleportation marker. Default is `0.25` */
                size={0.25}
            />

            <Model position={modelPosition} scale={[modelScale, modelScale, modelScale]} rotation={modelRotation} />


            <Interactive onSelectStart={handleSelectStartBiggerCube} onSelectEnd={handleSelectEndBiggerCube} onBlur={handleSelectEndBiggerCube}>
                <mesh position={cubeBiggerPosition}>
                    <boxGeometry args={[0.25, 0.25, 0.25]} />
                    <meshStandardMaterial color={"red"} />
                </mesh>
            </Interactive>

            <Interactive onSelectStart={handleSelectStartSmallerCube} onSelectEnd={handleSelectEndSmallerCube} onBlur={handleSelectEndSmallerCube}>
                <mesh position={cubeSmallerPosition}>
                    <boxGeometry args={[0.25, 0.25, 0.25]} />
                    <meshStandardMaterial color={"blue"} />
                </mesh>
            </Interactive>
            <Interactive onSelectStart={handleSelectStartTurnLeftCube} onSelectEnd={handleSelectEndTurnLeftCube} onBlur={handleSelectEndTurnLeftCube}>
                <mesh position={cubeTurnLeftPosition}>
                    <boxGeometry args={[0.25, 0.25, 0.25]} />
                    <meshStandardMaterial color={"green"} />
                </mesh>
            </Interactive>
            <Interactive onSelectStart={handleSelectStartTurnRightCube} onSelectEnd={handleSelectEndTurnRightCube} onBlur={handleSelectEndTurnRightCube}>
                <mesh position={cubeTurnRightPosition}>
                    <boxGeometry args={[0.25, 0.25, 0.25]} />
                    <meshStandardMaterial color={"purple"} />
                </mesh>
            </Interactive>
            <Interactive onSelectStart={handleSelectStartMoveForwardCube} onSelectEnd={handleSelectEndMoveForwardCube} onBlur={handleSelectEndMoveForwardCube}>
                <mesh position={cubeMovingForwardPosition}>
                    <boxGeometry args={[0.25, 0.25, 0.25]} />
                    <meshStandardMaterial color={"orange"} />
                </mesh>
            </Interactive>
            <Interactive onSelectStart={handleSelectStartMoveBackwardCube} onSelectEnd={handleSelectEndMoveBackwardCube} onBlur={handleSelectEndMoveBackwardCube}>
                <mesh position={cubeMovingBackwardPosition}>
                    <boxGeometry args={[0.25, 0.25, 0.25]} />
                    <meshStandardMaterial color={"blue"} />
                </mesh>
            </Interactive>
            <Interactive onSelectStart={handleSelectStartGoUpCube} onSelectEnd={handleSelectEndGoUpCube} onBlur={handleSelectEndGoUpCube}>
                <mesh position={cubeGoingUpPosition}>
                    <boxGeometry args={[0.25, 0.25, 0.25]} />
                    <meshStandardMaterial color={"yellow"} />
                </mesh>
            </Interactive>
            <Interactive onSelectStart={handleSelectStartGoDownCube} onSelectEnd={handleSelectEndGoDownCube} onBlur={handleSelectEndGoDownCube}>
                <mesh position={cubeGoingDownPosition}>
                    <boxGeometry args={[0.25, 0.25, 0.25]} />
                    <meshStandardMaterial color={"black"} />
                </mesh>
            </Interactive>
        </>

    );
}

export default VRScene;