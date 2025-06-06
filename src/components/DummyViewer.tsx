import React, { useEffect, useRef } from 'react';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
  SceneLoader,
  Animation,
  Bone,
  Space
} from '@babylonjs/core';
import '@babylonjs/loaders';

const DummyViewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);

    // Cámara
    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2.5,
      3,
      new Vector3(0, 1.5, 0),
      scene
    );
    camera.attachControl(canvasRef.current, true);

    // Luz
    new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    // Cargar modelo
    SceneLoader.Append(
      '/Models/dummypoppy_playtime_player/',
      'scene.gltf',
      scene,
      () => {
        console.log("✅ Modelo cargado");

        const skeleton = scene.skeletons[0];
        if (!skeleton) {
          console.warn("⚠️ No se encontró ningún esqueleto.");
          return;
        }

        skeleton.bones.forEach((bone: Bone) => {
          console.log("🦴 Bone:", bone.name);
        });

        const handBone = skeleton.bones.find(b => b.name === "mixamorig:RightHand_019");

        if (!handBone) {
          console.error("❌ No se encontró el hueso de la mano derecha.");
          return;
        }

        console.log("👉 Hueso objetivo encontrado:", handBone.name);

        // 🔁 PRUEBA A: Animación
        const anim = new Animation(
          "rotateRightHand",
          "rotation.z",
          30,
          Animation.ANIMATIONTYPE_FLOAT,
          Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        const targetAngle = Math.PI / 4;

        anim.setKeys([
          { frame: 0, value: 0 },
          { frame: 30, value: targetAngle },
        ]);

        handBone.animations = [anim];

        const animInstance = scene.beginAnimation(handBone, 0, 30, false);
        console.log("🔁 Animación aplicada a:", handBone.name);

        animInstance.onAnimationEnd = () => {
          console.log("✅ Animación completada");
        };

        // ⚙️ PRUEBA B: Rotación directa (descomenta si quieres probar solo esto)
        handBone.setRotation(new Vector3(0, 0, Math.PI / 4), Space.LOCAL);
        console.log("⚙️ Rotación directa aplicada");
      },
      undefined,
      (_, error) => {
        console.error("❌ Error al cargar el modelo:", error);
      }
    );

    engine.runRenderLoop(() => {
      scene.render();
    });

    const resize = () => engine.resize();
    window.addEventListener('resize', resize);

    return () => {
      engine.dispose();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '500px',
        border: '1px solid #ccc',
        backgroundColor: '#1e1e2f',
      }}
    />
  );
};

export default DummyViewer;
