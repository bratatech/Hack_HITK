// src/sections/Hero.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import Button from "../components/ui/Button";

export default function Hero() {
  const mountRef = useRef(null);
  const rafRef = useRef(null);

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

    // --- Sky: equirectangular panorama on an inward dome (so we can drift it)
    // file must exist: /public/textures/sky-clouds.jpg (2:1 equirectangular)
    const skyTex = loader.load("/textures/sky-clouds.jpg");
    skyTex.mapping = THREE.EquirectangularReflectionMapping;
    skyTex.colorSpace = THREE.SRGBColorSpace;

    const skyGeo = new THREE.SphereGeometry(10000, 64, 48);
    const skyMat = new THREE.MeshBasicMaterial({
      map: skyTex,
      side: THREE.BackSide,
      // don't let tone mapping dim the visible sky; we'll control brightness manually
      toneMapped: false,
    });

    // ✅ Lighten the visible sky only (not reflections)
    //   - gentle blue tint + brightness boost
    skyMat.color.set("#bce8f9ff");         // light blue multiplier
    skyMat.color.multiplyScalar(1.30);   // ~+70% brighter

    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    scene.add(skyMesh);

    // Environment stays the original texture → reflections remain subtle
    scene.environment = skyTex;

    // --- Water: deep blue, calmer, reduced glints
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const waterNormals = loader.load("/textures/waternormals.jpg", (tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    });

    const water = new Water(waterGeometry, {
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals,
      sunDirection: new THREE.Vector3(1, 1, 1),
      sunColor: 0xffffff,
      waterColor: new THREE.Color("#010e70"), // deep ocean blue
      distortionScale: 0.85,                  // calm = fewer harsh reflections
      fog: false,
      alpha: 1.0,
    });
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    // Remove specular "sun" highlight entirely
    if (water.material?.uniforms?.sunColor) {
      water.material.uniforms.sunColor.value.set(0x000000);
    }

    // Resize
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
    <section id="hero" className="relative h-[100svh] overflow-hidden">
      {/* WebGL mounts here */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Subtle bottom multiply tint so ocean stays rich blue, sky untouched */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(1,14,112,0.55) 0%, rgba(1,14,112,0.28) 32%, rgba(1,14,112,0.12) 58%, rgba(0,0,0,0) 72%)",
          mixBlendMode: "multiply",
        }}
      />
      {/* Gentle bottom shade for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/12" />

      {/* Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-5xl mx-auto">
          <h1
            className="text-5xl md:text-7xl font-extrabold tracking-[0.2em] text-ivory"
            style={{
              textShadow:
                "0 1px 1px rgba(0,0,0,0.45), 0 -1px 1px rgba(0,0,0,0.25)",
            }}
          >
            ECOSPHERE
          </h1>

          <p className="mt-6 text-base md:text-lg text-ivory/85">
            We design experiences in harmony with the blue planet.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <Button as="a" href="/explore" variant="primary">
              Let’s Explore
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
