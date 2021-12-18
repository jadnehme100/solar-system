import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

// Light
const ambientLight = new THREE.AmbientLight();
ambientLight.intensity = 0.5;
scene.add(ambientLight);

const pointLight = new THREE.PointLight("orange", 10, 20);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const sunlight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1.2);
scene.add(sunlight);
sunlight.position.y = 0;

/**
 * Textures
 */
//Planets & moons
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("textures/earth.jpg");
const moonTexture = textureLoader.load("textures/moon.jpg");
const sunTexture = textureLoader.load("textures/sun.jpg");
const mercuryTexture = textureLoader.load("textures/mercury.jpg");
const venusTexture = textureLoader.load("textures/venus.jpg");
const marsTexture = textureLoader.load("textures/mars.jpg");
const jupiterTexture = textureLoader.load("textures/jupiter.jpg");
const saturnTexture = textureLoader.load("textures/saturn.jpg");
const saturnRingTexture = textureLoader.load("textures/saturn_ring.jpg");
const uranusTexture = textureLoader.load("textures/uranus.jpg");
const neptuneTexture = textureLoader.load("textures/neptune.jpg");
const plutoTexture = textureLoader.load("textures/pluto.png");
//stars
const starsTexture = textureLoader.load("textures/particles/4.png");

/**
 * groops
 */

const earthGroup = new THREE.Group();
const saturnGroup = new THREE.Group();
const ringGroup = new THREE.Group();

/**
 * Stars
 */
const vertices = [];

for (let i = 0; i < 1500; i++) {
  const x = THREE.MathUtils.randFloatSpread(200);
  const y = THREE.MathUtils.randFloatSpread(200);
  const z = THREE.MathUtils.randFloatSpread(200);

  vertices.push(x, y, z);
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);

const material = new THREE.PointsMaterial({
  map: starsTexture,
  color: "aquamarine",
  size: 1.5,
  sizeAttenuation: true,
  blending: THREE.AdditiveBlending,
  transparent: true,
});

const points = new THREE.Points(geometry, material);

scene.add(points);

/**
 * Rings
 */
//5 8 11 14 18 24 29 33 36
//Material
const ringMaterial = new THREE.MeshStandardMaterial({
  color: "white",
  side: THREE.DoubleSide,
});
//rings
const ring1 = new THREE.Mesh(
  new THREE.RingBufferGeometry(5, 5.1, 64),
  ringMaterial
);

const ring2 = new THREE.Mesh(
  new THREE.RingBufferGeometry(8, 8.1, 128),
  ringMaterial
);

const ring3 = new THREE.Mesh(
  new THREE.RingBufferGeometry(11, 11.1, 128),
  ringMaterial
);

const ring4 = new THREE.Mesh(
  new THREE.RingBufferGeometry(14, 14.1, 128),
  ringMaterial
);
const ring5 = new THREE.Mesh(
  new THREE.RingBufferGeometry(18, 18.1, 128),
  ringMaterial
);
const ring6 = new THREE.Mesh(
  new THREE.RingBufferGeometry(24, 24.1, 128),
  ringMaterial
);
const ring7 = new THREE.Mesh(
  new THREE.RingBufferGeometry(29, 29.1, 128),
  ringMaterial
);
const ring8 = new THREE.Mesh(
  new THREE.RingBufferGeometry(33, 33.1, 128),
  ringMaterial
);
const ring9 = new THREE.Mesh(
  new THREE.RingBufferGeometry(36, 36.1, 128),
  ringMaterial
);
ringGroup.add(ring1, ring2, ring3, ring4, ring5, ring6, ring7, ring8, ring9);
ringGroup.rotation.x = Math.PI / 2;

/**
 * sun
 */

const sun = new THREE.Mesh(
  new THREE.SphereBufferGeometry(3, 64, 64),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);

/**
 * mercury
 */
const mercury = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.6, 64, 64),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
  })
);

/**
 * venus
 */
const venus = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 64, 64),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
);

/**
 * earth
 */
const earth = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 64, 64),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);

/**
 * moon
 */
const moon = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.3, 64, 64),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

/**
 * mars
 */
const mars = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.8, 64, 64),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);

/**
 * jupiter
 */
const jupiter = new THREE.Mesh(
  new THREE.SphereBufferGeometry(2, 64, 64),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);

/**
 * saturn
 */
const saturn = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1.5, 64, 64),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
  })
);
saturn.rotation.x = Math.PI / 2;
/**
 * saturn Ring
 */
const saturnRing = new THREE.Mesh(
  new THREE.RingBufferGeometry(2, 2.8, 32),
  new THREE.MeshStandardMaterial({
    map: saturnRingTexture,
    side: THREE.DoubleSide,
  })
);

/**
 * uranus
 */
const uranus = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1.2, 64, 64),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
  })
);

/**
 * neptune
 */
const neptune = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1.1, 64, 64),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
);

/**
 * pluto
 */
const pluto = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.3, 64, 64),
  new THREE.MeshStandardMaterial({
    map: plutoTexture,
  })
);

///////////////////////////////////////////////////////////
/**
 * earth group
 */
earthGroup.add(earth);
earthGroup.add(moon);

/**
 * saturn group
 */
saturnGroup.add(saturn);
saturnGroup.add(saturnRing);
saturnGroup.rotation.x = -Math.PI / 2;
saturnRing.rotation.y = Math.PI / 5;

/**
 * scene add
 */
scene.add(
  sun,
  earthGroup,
  mercury,
  venus,
  mars,
  jupiter,
  saturnGroup,
  uranus,
  neptune,
  pluto,
  ringGroup
);

//Shadows
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024; // default
pointLight.shadow.mapSize.height = 1024; // default

earth.castShadow = true;
earth.receiveShadow = true;

moon.castShadow = true;
moon.receiveShadow = true;

mercury.castShadow = true;
mercury.receiveShadow = true;

venus.castShadow = true;
venus.receiveShadow = true;

mars.castShadow = true;
mars.receiveShadow = true;

jupiter.castShadow = true;
jupiter.receiveShadow = true;

saturn.castShadow = true;
saturn.receiveShadow = true;

saturnRing.castShadow = true;
saturnRing.receiveShadow = true;

uranus.castShadow = true;
uranus.receiveShadow = true;

neptune.castShadow = true;
neptune.receiveShadow = true;

pluto.castShadow = true;
pluto.receiveShadow = true;

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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
camera.position.y = 15;

camera.position.z = 45;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //animate sun
  sun.rotation.y = sun.rotation.y - 0.002;

  //animate mercury
  mercury.rotation.y = mercury.rotation.y + 0.006;
  mercury.position.x = Math.cos(elapsedTime * 0.47) * 5;
  mercury.position.z = Math.sin(elapsedTime * 0.47) * 5;
  //animate venus
  venus.rotation.y = venus.rotation.y + 0.0045;
  venus.position.x = Math.cos(elapsedTime * 0.35) * 8;
  venus.position.z = Math.sin(elapsedTime * 0.35) * 8;

  //animate earth
  earthGroup.rotation.y = earth.rotation.y + 0.0014;
  earthGroup.position.x = Math.cos(elapsedTime * 0.29) * 11;
  earthGroup.position.z = Math.sin(elapsedTime * 0.29) * 11;

  //animate moon
  moon.rotation.y = earth.rotation.y + 0.002;
  moon.position.x = Math.cos(elapsedTime * 0.4) * 1.5;
  moon.position.z = Math.sin(elapsedTime * 0.4) * 1.5;
  moon.position.y = Math.sin(elapsedTime * 0.4) * 1.5;

  //animate mars
  mars.rotation.y = mars.rotation.y + 0.005;
  mars.position.x = Math.cos(elapsedTime * 0.24) * 14;
  mars.position.z = Math.sin(elapsedTime * 0.24) * 14;

  //animate jupiter
  jupiter.rotation.y = jupiter.rotation.y + 0.002;
  jupiter.position.x = Math.cos(elapsedTime * 0.13) * 18;
  jupiter.position.z = Math.sin(elapsedTime * 0.13) * 18;

  //animate saturn
  saturn.rotation.y = saturn.rotation.y + 0.0045;
  saturnGroup.position.x = Math.cos(elapsedTime * 0.09) * 24;
  saturnGroup.position.z = Math.sin(elapsedTime * 0.09) * 24;

  //animate saturn ring
  saturnRing.rotation.z = saturnRing.rotation.z + 0.002;

  //animate uranus
  uranus.rotation.y = uranus.rotation.y + 0.0014;
  uranus.position.x = Math.cos(elapsedTime * 0.06) * 29;
  uranus.position.z = Math.sin(elapsedTime * 0.06) * 29;

  //animate neptune
  neptune.rotation.y = neptune.rotation.y + 0.006;
  neptune.position.x = Math.cos(elapsedTime * 0.05) * 33;
  neptune.position.z = Math.sin(elapsedTime * 0.05) * 33;

  //animate pluto
  pluto.rotation.y = pluto.rotation.y + 0.0076;
  pluto.position.x = Math.cos(elapsedTime * 0.04) * 36;
  pluto.position.z = Math.sin(elapsedTime * 0.04) * 36;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
