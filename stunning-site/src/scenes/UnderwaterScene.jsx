// src/scenes/UnderwaterScene.jsx
import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";

function Bubbles({ count = 450, area = [140, 32, 140] }) {
  const geom = useMemo(() => new THREE.BufferGeometry(), []);
  const positions = useMemo(() => {
    const [w, h, d] = area;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * w;
      arr[i * 3 + 1] = -h * 0.5 + Math.random() * h;
      arr[i * 3 + 2] = (Math.random() - 0.5) * d;
    }
    return arr;
  }, [count, area]);
  const speeds = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = 0.1 + Math.random() * 0.32;
    return arr;
  }, [count]);

  useMemo(() => {
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return () => geom.dispose();
  }, [geom, positions]);

  const points = useRef();
  useFrame((_, dt) => {
    const pos = geom.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = pos.array[i * 3 + 1];
      y += speeds[i] * 10 * dt; // rise
      if (y > area[1] * 0.5) y = -area[1] * 0.5;
      pos.array[i * 3 + 1] = y;
    }
    pos.needsUpdate = true;
    if (points.current) points.current.rotation.y += dt * 0.02;
  });

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#dff3ff"),
        size: 0.16,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      }),
    []
  );

  return <points ref={points} args={[geom, mat]} />;
}

export default function UnderwaterScene() {
  const { scene, gl } = useThree();

  // Set clear color + fog for underwater feel (no custom shaders)
  gl.setClearColor("#0b2c6a", 1);
  scene.fog = new THREE.Fog("#0b2c6a", 8, 120);

  return (
    <>
      {/* soft cool lighting */}
      <hemisphereLight args={["#6fbaff", "#001226", 0.5]} />
      <directionalLight position={[6, 12, 3]} intensity={0.55} color={"#cfe8ff"} />

      {/* a simple "seafloor" plane to catch light (no caustics yet) */}
      <mesh rotation-x={-Math.PI / 2} position-y={-10} receiveShadow>
        <planeGeometry args={[220, 220]} />
        <meshPhongMaterial color={"#05225a"} shininess={6} />
      </mesh>

      {/* drifting bubbles/dust */}
      <Bubbles count={550} area={[160, 40, 160]} />
    </>
  );
}
