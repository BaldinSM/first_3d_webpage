import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
//import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/viridis3.png");

//FontLoader
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello Three.js", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 4,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  textGeometry.computeBoundingBox();
  textGeometry.center();
  console.log(textGeometry.boundingBox);

  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  textMaterial.flatShading = true;
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);
});
console.time("time");

const knotGeometry1 = new THREE.TorusKnotBufferGeometry(
  0.3,
  0.075,
  16,
  6,
  1,
  2
);
const knotGeometry2 = new THREE.TorusKnotBufferGeometry(
  0.3,
  0.075,
  16,
  6,
  2,
  2
);
const knotGeometry3 = new THREE.TorusKnotBufferGeometry(
  0.3,
  0.075,
  32,
  6,
  3,
  2
);
const knotGeometry4 = new THREE.TorusKnotBufferGeometry(
  0.3,
  0.075,
  32,
  6,
  2,
  3
);
const knotMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
knotMaterial.flatShading = true;

for (let i = 0; i < 50; i++) {
  const knot1 = new THREE.Mesh(knotGeometry1, knotMaterial);
  const knot2 = new THREE.Mesh(knotGeometry2, knotMaterial);
  const knot3 = new THREE.Mesh(knotGeometry3, knotMaterial);
  const knot4 = new THREE.Mesh(knotGeometry4, knotMaterial);

  knot1.position.x = (Math.random() - 0.5) * 8;
  knot1.position.y = (Math.random() - 0.5) * 8;
  knot1.position.z = (Math.random() - 0.5) * 8;
  knot1.rotation.x = (Math.random() - 0.5) * Math.PI * 2;
  knot1.rotation.y = (Math.random() - 0.5) * Math.PI * 2;
  knot1.rotation.z = (Math.random() - 0.5) * Math.PI * 2;

  knot2.position.x = (Math.random() - 0.5) * 8;
  knot2.position.y = (Math.random() - 0.5) * 8;
  knot2.position.z = (Math.random() - 0.5) * 8;
  knot2.rotation.x = (Math.random() - 0.5) * Math.PI * 2;
  knot2.rotation.y = (Math.random() - 0.5) * Math.PI * 2;
  knot2.rotation.z = (Math.random() - 0.5) * Math.PI * 2;

  knot3.position.x = (Math.random() - 0.5) * 8;
  knot3.position.y = (Math.random() - 0.5) * 8;
  knot3.position.z = (Math.random() - 0.5) * 8;
  knot3.rotation.x = (Math.random() - 0.5) * Math.PI * 2;
  knot3.rotation.y = (Math.random() - 0.5) * Math.PI * 2;
  knot3.rotation.z = (Math.random() - 0.5) * Math.PI * 2;

  knot4.position.x = (Math.random() - 0.5) * 8;
  knot4.position.y = (Math.random() - 0.5) * 8;
  knot4.position.z = (Math.random() - 0.5) * 8;
  knot4.rotation.x = (Math.random() - 0.5) * Math.PI * 2;
  knot4.rotation.y = (Math.random() - 0.5) * Math.PI * 2;
  knot4.rotation.z = (Math.random() - 0.5) * Math.PI * 2;

  const scale = Math.random() + 0.05;
  knot1.scale.set(scale, scale, scale);
  knot2.scale.set(scale, scale, scale);
  knot3.scale.set(scale, scale, scale);
  knot4.scale.set(scale, scale, scale);

  knot1.name = "knot1" + i;
  knot2.name = "knot2" + i;
  knot3.name = "knot3" + i;
  knot4.name = "knot4" + i;

  scene.add(knot1, knot2, knot3, knot4);
}

console.timeEnd("time");

//console.log(knot)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //Update objects
  for (let i = 0; i < 50; i++) {
    const objectKnot1 = scene.getObjectByName("knot1" + i, true);
    const objectKnot2 = scene.getObjectByName("knot2" + i, true);
    const objectKnot3 = scene.getObjectByName("knot3" + i, true);
    const objectKnot4 = scene.getObjectByName("knot4" + i, true);

    objectKnot1.rotation.x = (i / 50) * elapsedTime;
    objectKnot1.rotation.y = (i / 50) * elapsedTime;

    objectKnot2.rotation.x = (i / 50) * elapsedTime;
    objectKnot2.rotation.y = (i / 50) * elapsedTime;

    objectKnot3.rotation.x = (i / 50) * elapsedTime;
    objectKnot3.rotation.y = (i / 50) * elapsedTime;

    objectKnot4.rotation.x = (i / 50) * elapsedTime;
    objectKnot4.rotation.y = (i / 50) * elapsedTime;
  }
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
