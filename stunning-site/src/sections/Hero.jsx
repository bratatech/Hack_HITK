// src/sections/Hero.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import Button from "../components/ui/Button";
import { useSceneTransition } from "../context/SceneTransitionContext";

export default function Hero() {
  const mountRef = useRef(null);
  const rafRef = useRef(null);
  const { startDive } = useSceneTransition();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene / Camera / Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      1,
      20000
    );
    camera.position.set(0, 10, 165);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.88; // keeps reflections subdued
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();

    // --- Sky: light, bright clouds on an inward dome (drifts slowly)
    const skyTex = loader.load("/textures/sky-clouds.jpg");
    skyTex.mapping = THREE.EquirectangularReflectionMapping;
    skyTex.colorSpace = THREE.SRGBColorSpace;

    const skyGeo = new THREE.SphereGeometry(10000, 64, 48);
    const skyMat = new THREE.MeshBasicMaterial({
      map: skyTex,
      side: THREE.BackSide,
      toneMapped: false,
    });
    // Lighten the visible sky (not reflections)
    skyMat.color.set("#bce8f9");
    skyMat.color.multiplyScalar(1.3);

    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    scene.add(skyMesh);

    // Use the original texture for reflections so water stays calm
    scene.environment = skyTex;

    // --- Water: deep blue, calm, minimal specular
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const waterNormals = loader.load("/textures/waternormals.jpg", (tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    });

    const water = new Water(waterGeometry, {
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals,
      sunDirection: new THREE.Vector3(1, 1, 1),
      sunColor: 0x000000, // kill hard sun glint
      waterColor: new THREE.Color("#010e70"), // deep ocean blue
      distortionScale: 0.85, // calmer surface
      fog: false,
      alpha: 1.0,
    });
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    // Resize handler
    function onResize() {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    }
    window.addEventListener("resize", onResize);

    // Pause when tab hidden
    function onVisibility() {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!rafRef.current) {
        animate();
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    // Animate: gentle water + slow cloud drift
    const clock = new THREE.Clock();
    function animate() {
      rafRef.current = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      water.material.uniforms.time.value += dt * 0.4;
      skyMesh.rotation.y += dt * 0.0018;
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      container.removeChild(renderer.domElement);
      skyTex.dispose();
      skyGeo.dispose();
      skyMat.dispose();
      waterGeometry.dispose();
      water.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="hero" className="relative h-[100svh] overflow-hidden noise-bg">
      {/* WebGL mounts here */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Keep ocean rich at the bottom; sky untouched */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(1,14,112,0.55) 0%, rgba(1,14,112,0.28) 32%, rgba(1,14,112,0.12) 58%, rgba(0,0,0,0) 72%)",
          mixBlendMode: "multiply",
        }}
      />
      {/* Gentle legibility shade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/12" />

      {/* Overlay content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-[0.2em] text-ivory"
              style={{ textShadow: "0 1px 1px rgba(0,0,0,0.45), 0 -1px 1px rgba(0,0,0,0.25)" }}>
            ECOSPHERE
          </h1>

          <p className="mt-6 text-base md:text-lg text-ivory/85">
            We design experiences in harmony with the blue planet.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <Button
              variant="primary"
              onClick={() => startDive({ to: "/explore" })}
              aria-label="Start underwater experience"
            >
              Let’s Explore
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
