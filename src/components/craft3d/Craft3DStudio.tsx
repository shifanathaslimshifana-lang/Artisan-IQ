import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CraftProduct } from '../../types';
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Layers,
  Eye,
  Camera,
  Compass,
} from 'lucide-react';

interface Craft3DStudioProps {
  product?: CraftProduct;
  height?: string;
  allowFullscreen?: boolean;
}

type FinishType = 'terracotta' | 'smoked_black' | 'brass_dokra' | 'lacquer_teak';

export const Craft3DStudio: React.FC<Craft3DStudioProps> = ({
  product,
  height = '520px',
  allowFullscreen = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedFinish, setSelectedFinish] = useState<FinishType>(
    product?.model3DType === 'brass_lamp'
      ? 'brass_dokra'
      : product?.model3DType === 'wood_vase'
      ? 'lacquer_teak'
      : 'terracotta'
  );
  const [explodedFactor, setExplodedFactor] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeCameraView, setActiveCameraView] = useState<'perspective' | 'top' | 'close'>(
    'perspective'
  );
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mutable refs for Three.js render loop to avoid re-renders
  const stateRef = useRef({
    finish: selectedFinish,
    exploded: 0,
    autoRotate: true,
    cameraView: 'perspective' as 'perspective' | 'top' | 'close',
  });

  stateRef.current = {
    finish: selectedFinish,
    exploded: explodedFactor,
    autoRotate,
    cameraView: activeCameraView,
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 800;
    const heightPx = container.clientHeight || 500;

    // 1. Scene setup - Crisp White Studio
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 8, 24);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(38, width / heightPx, 0.1, 100);
    camera.position.set(0, 2.2, 5.0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Studio Environment via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Studio Lighting Rig
    const warmKeyLight = new THREE.DirectionalLight(0xfff5ea, 2.4);
    warmKeyLight.position.set(3.5, 6, 4);
    warmKeyLight.castShadow = true;
    warmKeyLight.shadow.mapSize.width = 1024;
    warmKeyLight.shadow.mapSize.height = 1024;
    warmKeyLight.shadow.bias = -0.0004;
    warmKeyLight.shadow.normalBias = 0.02;
    scene.add(warmKeyLight);

    const coolFillLight = new THREE.HemisphereLight(0xf4f4f5, 0x27272a, 1.2);
    scene.add(coolFillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // 6. Ground Shadow Plane
    const groundGeo = new THREE.PlaneGeometry(14, 14);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.95,
      metalness: 0.0,
      depthWrite: true,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = 0;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Soft radial contact shadow
    const contactCanvas = document.createElement('canvas');
    contactCanvas.width = 256;
    contactCanvas.height = 256;
    const ctx = contactCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(30, 20, 15, 0.45)');
      grad.addColorStop(0.5, 'rgba(40, 25, 20, 0.18)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(contactCanvas);
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 2.4),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.8,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.005;
    scene.add(shadowPlane);

    // 7. Material generator for finishes
    const createCraftMaterials = (finish: FinishType) => {
      let mainColor = 0xc76b45;
      let roughness = 0.82;
      let metalness = 0.02;
      let clearcoat = 0.0;

      if (finish === 'smoked_black') {
        mainColor = 0x2b2826;
        roughness = 0.65;
        metalness = 0.12;
      } else if (finish === 'brass_dokra') {
        mainColor = 0xd4af37;
        roughness = 0.28;
        metalness = 0.88;
      } else if (finish === 'lacquer_teak') {
        mainColor = 0xa34e2c;
        roughness = 0.15;
        metalness = 0.05;
        clearcoat = 0.85;
      }

      const bodyMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        roughness,
        metalness,
      });

      const accentMat = new THREE.MeshStandardMaterial({
        color: finish === 'brass_dokra' ? 0x99751d : 0x7a3a20,
        roughness: Math.min(1.0, roughness + 0.1),
        metalness: Math.max(0, metalness - 0.05),
      });

      const trimMat = new THREE.MeshStandardMaterial({
        color: finish === 'brass_dokra' ? 0xf3d266 : 0xdf845d,
        roughness: Math.max(0.1, roughness - 0.2),
        metalness: Math.min(0.9, metalness + 0.1),
      });

      return { bodyMat, accentMat, trimMat };
    };

    // 8. Build 3-12 Part Procedural Craft Models
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Keep references to movable components for exploded view
    const explodedParts: { mesh: THREE.Object3D; baseOffset: number; dirY: number }[] = [];

    const buildCraftModel = () => {
      // Clear previous
      while (modelGroup.children.length > 0) {
        modelGroup.remove(modelGroup.children[0]);
      }
      explodedParts.length = 0;

      const finishMats = createCraftMaterials(stateRef.current.finish);
      const isMetal = product?.model3DType === 'brass_lamp';
      const isWood = product?.model3DType === 'wood_vase';

      if (isMetal) {
        // Brass Dhokra Diya Lamp: 8 distinct parts
        // 1. Pedestal base
        const baseGeom = new THREE.CylinderGeometry(0.55, 0.65, 0.18, 32);
        const baseMesh = new THREE.Mesh(baseGeom, finishMats.bodyMat);
        baseMesh.position.y = 0.09;
        baseMesh.castShadow = true;
        baseMesh.receiveShadow = true;
        modelGroup.add(baseMesh);

        // 2. Beaded pedestal rim
        const beadGeom = new THREE.TorusGeometry(0.58, 0.04, 16, 32);
        const beadMesh = new THREE.Mesh(beadGeom, finishMats.trimMat);
        beadMesh.rotation.x = Math.PI / 2;
        beadMesh.position.y = 0.18;
        modelGroup.add(beadMesh);

        // 3. Central stem pillar
        const stemGeom = new THREE.CylinderGeometry(0.12, 0.18, 0.65, 24);
        const stemMesh = new THREE.Mesh(stemGeom, finishMats.accentMat);
        stemMesh.position.y = 0.52;
        stemMesh.castShadow = true;
        modelGroup.add(stemMesh);

        // 4. Middle lotus collar
        const collarGeom = new THREE.ConeGeometry(0.38, 0.18, 16);
        const collarMesh = new THREE.Mesh(collarGeom, finishMats.trimMat);
        collarMesh.rotation.x = Math.PI;
        collarMesh.position.y = 0.88;
        modelGroup.add(collarMesh);

        // 5. Diya oil bowl (explodes upward)
        const bowlPoints: THREE.Vector2[] = [];
        for (let i = 0; i <= 10; i++) {
          const t = i / 10;
          bowlPoints.push(new THREE.Vector2(0.1 + 0.65 * Math.sin(t * Math.PI * 0.5), t * 0.35));
        }
        const bowlGeom = new THREE.LatheGeometry(bowlPoints, 32);
        const bowlMesh = new THREE.Mesh(bowlGeom, finishMats.bodyMat);
        bowlMesh.position.y = 0.96;
        bowlMesh.castShadow = true;
        modelGroup.add(bowlMesh);
        explodedParts.push({ mesh: bowlMesh, baseOffset: 0.96, dirY: 0.5 });

        // 6. Wick snout
        const snoutGeom = new THREE.ConeGeometry(0.14, 0.28, 12);
        const snoutMesh = new THREE.Mesh(snoutGeom, finishMats.accentMat);
        snoutMesh.rotation.z = -Math.PI / 3;
        snoutMesh.position.set(0.68, 1.25, 0);
        modelGroup.add(snoutMesh);
        explodedParts.push({ mesh: snoutMesh, baseOffset: 1.25, dirY: 0.7 });

        // 7. Tribal arch crest (Dokra coiled filigree handle)
        const archCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.35, 1.2, 0),
          new THREE.Vector3(-0.25, 1.85, 0),
          new THREE.Vector3(0, 2.05, 0),
          new THREE.Vector3(0.25, 1.85, 0),
          new THREE.Vector3(0.35, 1.2, 0),
        ]);
        const archGeom = new THREE.TubeGeometry(archCurve, 32, 0.045, 12, false);
        const archMesh = new THREE.Mesh(archGeom, finishMats.trimMat);
        archMesh.castShadow = true;
        modelGroup.add(archMesh);
        explodedParts.push({ mesh: archMesh, baseOffset: 0, dirY: 1.2 });
      } else if (isWood) {
        // Channapatna Turned Lacquer Wood Vase: 7 distinct parts
        // 1. Turned stepped foot
        const footGeom = new THREE.CylinderGeometry(0.48, 0.56, 0.14, 32);
        const footMesh = new THREE.Mesh(footGeom, finishMats.accentMat);
        footMesh.position.y = 0.07;
        footMesh.castShadow = true;
        modelGroup.add(footMesh);

        // 2. Lower amber lacquer ring
        const lowerRingGeom = new THREE.TorusGeometry(0.5, 0.05, 16, 32);
        const lowerRingMesh = new THREE.Mesh(lowerRingGeom, finishMats.trimMat);
        lowerRingMesh.rotation.x = Math.PI / 2;
        lowerRingMesh.position.y = 0.16;
        modelGroup.add(lowerRingMesh);

        // 3. Bulbar lower vase belly
        const bellyGeom = new THREE.SphereGeometry(0.72, 32, 24);
        bellyGeom.scale(1, 1.2, 1);
        const bellyMesh = new THREE.Mesh(bellyGeom, finishMats.bodyMat);
        bellyMesh.position.y = 0.95;
        bellyMesh.castShadow = true;
        modelGroup.add(bellyMesh);

        // 4. Middle yellow vegetable lacquer accent band
        const midBandGeom = new THREE.CylinderGeometry(0.74, 0.74, 0.15, 32);
        const midBandMesh = new THREE.Mesh(midBandGeom, finishMats.trimMat);
        midBandMesh.position.y = 0.95;
        modelGroup.add(midBandMesh);

        // 5. Slender vase neck (explodes)
        const neckGeom = new THREE.CylinderGeometry(0.32, 0.44, 0.75, 32);
        const neckMesh = new THREE.Mesh(neckGeom, finishMats.accentMat);
        neckMesh.position.y = 1.82;
        neckMesh.castShadow = true;
        modelGroup.add(neckMesh);
        explodedParts.push({ mesh: neckMesh, baseOffset: 1.82, dirY: 0.6 });

        // 6. Flared trumpet lip rim (explodes)
        const rimCurve: THREE.Vector2[] = [];
        for (let i = 0; i <= 8; i++) {
          const t = i / 8;
          rimCurve.push(new THREE.Vector2(0.32 + 0.3 * t * t, t * 0.25));
        }
        const rimGeom = new THREE.LatheGeometry(rimCurve, 32);
        const rimMesh = new THREE.Mesh(rimGeom, finishMats.trimMat);
        rimMesh.position.y = 2.2;
        rimMesh.castShadow = true;
        modelGroup.add(rimMesh);
        explodedParts.push({ mesh: rimMesh, baseOffset: 2.2, dirY: 1.1 });
      } else {
        // Traditional Terracotta Urli / Water Pot: 9 distinct parts
        // 1. Pedestal foot base
        const footGeom = new THREE.CylinderGeometry(0.42, 0.48, 0.12, 32);
        const footMesh = new THREE.Mesh(footGeom, finishMats.accentMat);
        footMesh.position.y = 0.06;
        footMesh.castShadow = true;
        footMesh.receiveShadow = true;
        modelGroup.add(footMesh);

        // 2. Main spherical water pot belly
        const potPoints: THREE.Vector2[] = [];
        for (let i = 0; i <= 16; i++) {
          const angle = (i / 16) * Math.PI;
          potPoints.push(
            new THREE.Vector2(
              0.22 + 0.68 * Math.sin(angle),
              0.1 + (1 - Math.cos(angle)) * 0.55
            )
          );
        }
        const bellyGeom = new THREE.LatheGeometry(potPoints, 36);
        const bellyMesh = new THREE.Mesh(bellyGeom, finishMats.bodyMat);
        bellyMesh.position.y = 0.12;
        bellyMesh.castShadow = true;
        bellyMesh.receiveShadow = true;
        modelGroup.add(bellyMesh);

        // 3. Stamped ceremonial geometric waist band
        const waistBandGeom = new THREE.TorusGeometry(0.88, 0.045, 16, 36);
        const waistBandMesh = new THREE.Mesh(waistBandGeom, finishMats.trimMat);
        waistBandMesh.rotation.x = Math.PI / 2;
        waistBandMesh.position.y = 0.65;
        modelGroup.add(waistBandMesh);

        // 4. Pot shoulder reduction ring
        const shoulderGeom = new THREE.CylinderGeometry(0.46, 0.82, 0.35, 36);
        const shoulderMesh = new THREE.Mesh(shoulderGeom, finishMats.accentMat);
        shoulderMesh.position.y = 1.35;
        shoulderMesh.castShadow = true;
        modelGroup.add(shoulderMesh);

        // 5. Flanged pouring neck (explodes)
        const neckGeom = new THREE.CylinderGeometry(0.42, 0.46, 0.32, 32);
        const neckMesh = new THREE.Mesh(neckGeom, finishMats.bodyMat);
        neckMesh.position.y = 1.62;
        neckMesh.castShadow = true;
        modelGroup.add(neckMesh);
        explodedParts.push({ mesh: neckMesh, baseOffset: 1.62, dirY: 0.4 });

        // 6. Earthen rolled lip rim (explodes)
        const lipGeom = new THREE.TorusGeometry(0.48, 0.065, 16, 32);
        const lipMesh = new THREE.Mesh(lipGeom, finishMats.trimMat);
        lipMesh.rotation.x = Math.PI / 2;
        lipMesh.position.y = 1.8;
        modelGroup.add(lipMesh);
        explodedParts.push({ mesh: lipMesh, baseOffset: 1.8, dirY: 0.8 });

        // 7. Left curved finger handle
        const handleCurveL = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-0.85, 0.95, 0),
          new THREE.Vector3(-1.18, 0.72, 0),
          new THREE.Vector3(-0.75, 0.48, 0)
        );
        const handleGeomL = new THREE.TubeGeometry(handleCurveL, 20, 0.05, 12, false);
        const handleMeshL = new THREE.Mesh(handleGeomL, finishMats.accentMat);
        handleMeshL.castShadow = true;
        modelGroup.add(handleMeshL);

        // 8. Right curved finger handle
        const handleCurveR = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(0.85, 0.95, 0),
          new THREE.Vector3(1.18, 0.72, 0),
          new THREE.Vector3(0.75, 0.48, 0)
        );
        const handleGeomR = new THREE.TubeGeometry(handleCurveR, 20, 0.05, 12, false);
        const handleMeshR = new THREE.Mesh(handleGeomR, finishMats.accentMat);
        handleMeshR.castShadow = true;
        modelGroup.add(handleMeshR);

        // 9. Porous breathability indicator ring
        const porousBand = new THREE.Mesh(
          new THREE.CylinderGeometry(0.89, 0.89, 0.08, 36),
          finishMats.trimMat
        );
        porousBand.position.y = 0.82;
        modelGroup.add(porousBand);
      }

      // Re-center model group slightly above ground
      modelGroup.position.y = 0.0;
    };

    buildCraftModel();

    // 9. Interactive Drag / Mouse Orbit Controls with exponential damping
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0.2;
    let targetRotationX = 0.15;
    let currentRotationY = 0.2;
    let currentRotationX = 0.15;
    let targetDist = 4.8;
    let currentDist = 4.8;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX = Math.max(-0.4, Math.min(0.85, targetRotationX + deltaY * 0.008));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetDist = Math.max(2.2, Math.min(7.5, targetDist + e.deltaY * 0.004));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // 10. Animation Loop with frame-independent damping
    let animationFrameId: number;
    let lastTime = performance.now();
    let currentFinishApplied = stateRef.current.finish;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Check if finish changed
      if (stateRef.current.finish !== currentFinishApplied) {
        currentFinishApplied = stateRef.current.finish;
        buildCraftModel();
      }

      // Auto rotation
      if (stateRef.current.autoRotate && !isDragging) {
        targetRotationY += 0.35 * dt;
      }

      // Smooth camera damping
      const dampFactor = 1 - Math.exp(-9 * dt);
      currentRotationY += (targetRotationY - currentRotationY) * dampFactor;
      currentRotationX += (targetRotationX - currentRotationX) * dampFactor;
      currentDist += (targetDist - currentDist) * dampFactor;

      // Camera preset override handling
      const viewMode = stateRef.current.cameraView;
      let targetCamY = 1.3 + Math.sin(currentRotationX) * currentDist;
      let targetCamX = Math.sin(currentRotationY) * Math.cos(currentRotationX) * currentDist;
      let targetCamZ = Math.cos(currentRotationY) * Math.cos(currentRotationX) * currentDist;

      if (viewMode === 'top') {
        targetCamY = currentDist * 0.95;
        targetCamZ = currentDist * 0.25;
      } else if (viewMode === 'close') {
        targetDist = 2.8;
      }

      camera.position.set(targetCamX, targetCamY, targetCamZ);
      camera.lookAt(0, 0.85, 0);

      // Smooth Exploded view interpolation
      const targetExp = stateRef.current.exploded;
      explodedParts.forEach((part) => {
        const targetPartY = part.baseOffset + part.dirY * targetExp;
        part.mesh.position.y += (targetPartY - part.mesh.position.y) * dampFactor;
      });

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 300;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('wheel', onWheel);
      renderer.dispose();
      scene.clear();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [product?.model3DType]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Reusable Controls UI
  const renderControlsGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 items-center">
      {/* Finish swatches */}
      <div>
        <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
          Material Finish
        </label>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedFinish('terracotta')}
            className={`px-2.5 py-1 text-xs rounded border transition-colors ${
              selectedFinish === 'terracotta'
                ? 'bg-[#C76B45] text-white border-[#C76B45] font-semibold shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            Terracotta
          </button>
          <button
            onClick={() => setSelectedFinish('smoked_black')}
            className={`px-2.5 py-1 text-xs rounded border transition-colors ${
              selectedFinish === 'smoked_black'
                ? 'bg-neutral-800 text-white border-neutral-800 font-semibold shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            Black Pit
          </button>
          <button
            onClick={() => setSelectedFinish('brass_dokra')}
            className={`px-2.5 py-1 text-xs rounded border transition-colors ${
              selectedFinish === 'brass_dokra'
                ? 'bg-amber-600 text-white border-amber-600 font-semibold shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            Cast Brass
          </button>
          <button
            onClick={() => setSelectedFinish('lacquer_teak')}
            className={`px-2.5 py-1 text-xs rounded border transition-colors ${
              selectedFinish === 'lacquer_teak'
                ? 'bg-amber-800 text-white border-amber-800 font-semibold shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            Lacquer
          </button>
        </div>
      </div>

      {/* Exploded construction slider */}
      <div>
        <div className="flex items-center justify-between text-[11px] mb-1 font-semibold text-neutral-700">
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-900" /> Exploded View
          </span>
          <span className="font-mono text-neutral-500 tabular-nums">
            {Math.round(explodedFactor * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={explodedFactor}
          onChange={(e) => setExplodedFactor(parseFloat(e.target.value))}
          className="w-full accent-indigo-900 cursor-pointer h-1.5 bg-neutral-200 rounded-lg"
          aria-label="Exploded View Separation"
        />
      </div>

      {/* View Angles */}
      <div>
        <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
          Camera Angle
        </label>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveCameraView('perspective')}
            className={`flex-1 py-1 text-[11px] rounded border transition-colors ${
              activeCameraView === 'perspective'
                ? 'bg-indigo-900 text-white border-indigo-900 font-semibold shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            Perspective
          </button>
          <button
            onClick={() => setActiveCameraView('top')}
            className={`flex-1 py-1 text-[11px] rounded border transition-colors ${
              activeCameraView === 'top'
                ? 'bg-indigo-900 text-white border-indigo-900 font-semibold shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            Top Rim
          </button>
          <button
            onClick={() => setActiveCameraView('close')}
            className={`flex-1 py-1 text-[11px] rounded border transition-colors ${
              activeCameraView === 'close'
                ? 'bg-indigo-900 text-white border-indigo-900 font-semibold shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            Close-Up
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-xs transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none h-screen w-screen flex flex-col bg-neutral-900'
          : 'flex flex-col'
      }`}
    >
      {/* Top Header & Actions Bar (Always clean, never clipped) */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-b border-neutral-200/80 z-10 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-md bg-amber-500/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#C76B45]" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-neutral-800 truncate">
            {product?.title || 'Interactive 3D Craft Studio'}
          </span>
          <span className="hidden sm:inline-block text-[11px] text-neutral-500 font-mono bg-neutral-100 px-2 py-0.5 rounded">
            {product?.technique?.split(' ')[0] || 'Handmade'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg border transition-colors ${
              autoRotate
                ? 'bg-indigo-900 text-white border-indigo-900 shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
            }`}
            title="Toggle 360 Turntable"
          >
            360° Turntable
          </button>

          {allowFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="p-1.5 sm:p-2 bg-white text-neutral-700 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen 3D Inspection'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div
        className={`relative w-full bg-[#FAF8F5] overflow-hidden ${
          isFullscreen
            ? 'flex-1 h-full'
            : 'h-[320px] sm:h-[400px] md:h-[480px] lg:h-[500px]'
        }`}
        style={!isFullscreen && height ? { height } : undefined}
      >
        <div
          ref={mountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        />

        {/* Drag Hint Overlay */}
        <div className="absolute top-3 left-3 pointer-events-none bg-neutral-900/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-xs flex items-center gap-1">
          <Compass className="w-3 h-3 text-amber-300" />
          <span>Click & Drag to rotate 3D</span>
        </div>

        {/* Desktop / Fullscreen Floating Bottom Dock (Hidden on mobile <768px when not in fullscreen) */}
        {(isFullscreen || true) && (
          <div
            className={`${
              isFullscreen
                ? 'block absolute bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-2xl'
                : 'hidden md:block absolute bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl'
            } pointer-events-auto transition-transform duration-300 z-20`}
          >
            <div className="bg-white/95 backdrop-blur-xs border border-neutral-200 shadow-xl rounded-xl overflow-hidden">
              {/* Toggle bar */}
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-neutral-50/90 border-b border-neutral-100 text-[11px] text-neutral-600">
                <span className="font-semibold flex items-center gap-1.5 text-neutral-800">
                  <Eye className="w-3.5 h-3.5 text-[#C76B45]" /> 3D PBR Material & Construction Inspection
                </span>
                <button
                  onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
                  className="hover:text-neutral-900 font-medium underline cursor-pointer"
                >
                  {isControlsCollapsed ? 'Show Controls' : 'Hide Controls'}
                </button>
              </div>

              {!isControlsCollapsed && <div className="p-3">{renderControlsGrid()}</div>}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Stacked Controls Section (Only shown on <md when NOT in fullscreen mode) */}
      {!isFullscreen && (
        <div className="md:hidden bg-white border-t border-neutral-200 p-3 sm:p-4 space-y-3 shrink-0">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-1.5 text-xs font-bold text-neutral-800">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#C76B45]" /> 3D Inspection Controls
            </span>
            <button
              onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
              className="text-[11px] text-indigo-900 font-medium underline"
            >
              {isControlsCollapsed ? 'Show Controls' : 'Hide Controls'}
            </button>
          </div>

          {!isControlsCollapsed && renderControlsGrid()}
        </div>
      )}
    </div>
  );
};
