function Floor() {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#666" />
      </mesh>
    )
  }

  export default Floor;