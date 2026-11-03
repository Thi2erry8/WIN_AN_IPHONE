import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const container = document.getElementById("canvas-container");

const width = container.clientWidth;
const height = container.clientHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color("rgba(255, 255, 255, 0.5)");

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(0, 2, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(width, height);

container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

controls.target.set(0, 2, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const loader = new GLTFLoader();
let model;

loader.load(
  "/WIN_AN_IPHONE/public/assets/js/iphone-duo-night-sky-rigged.glb",
  (gltf) => {
    model = gltf.scene;
    scene.add(model);

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());
    model.position.x += model.position.x - center.x;
    model.position.y += 1.5;
    model.position.z += model.position.z - center.z;
    model.scale.setScalar(4 / size); // Taille ajustée

    scene.add(model);
    console.log("Modèle chargé !");
  },
  undefined,
  (error) => console.error("Erreur :", error),
);

function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.005;
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  // On récupère la nouvelle taille de la section
  const newWidth = container.clientWidth;
  const newHeight = container.clientHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
});

const ActionBtn = document.querySelector("#nav_control");
const Menu = document.querySelector(".menu");

ActionBtn.addEventListener("click", () => {
  Menu.classList.toggle("view");
  console.log("click");
});
