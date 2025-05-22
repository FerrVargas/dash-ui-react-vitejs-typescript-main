import React, { useEffect, useRef } from 'react';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  SceneLoader,
  Space,
  Axis
} from '@babylonjs/core';
import '@babylonjs/loaders';

const DummyViewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    // 🎥 Cámara con posición útil y enfoque
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 3,
      5,
      new Vector3(0, 1.5, 0),
      scene
    );
    camera.attachControl(canvas, true);

    // 💡 Luz hemisférica
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 1.2;

    let skeleton: any;
    let currentFrame = 0;
    let data: any[] = [];

    //Cargar modelo .gltf
    SceneLoader.ImportMesh("", "/models/", "scene.gltf", scene, (meshes, _, skeletons) => {
      console.log("Modelo cargado:", meshes);
      skeleton = skeletons[0];

      //Cargar archivo JSON con ángulos
      fetch("/data/angulos.json")
        .then(res => res.json())
        .then(json => {
          data = json;

          //Aplicar animación por frame
          scene.onBeforeRenderObservable.add(() => {
            if (!skeleton || data.length === 0) return;

            const frameData = data[currentFrame];
            const joints = frameData.joints;

            for (const joint in joints) {
              const bone = skeleton.bones.find((b: any) => b.name === joint);
              if (bone) {
                bone.setRotation(new Vector3(
                  joints[joint] * Math.PI / 180, 0, 0
                ), Space.LOCAL);
              }
            }

            currentFrame = (currentFrame + 1) % data.length;
          });
        });
    });

    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());

    return () => engine.dispose();
  }, []);

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: '500px' }} />
  );
};

export default DummyViewer;
