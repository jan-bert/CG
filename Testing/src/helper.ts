// external dependencies
import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


/*******************************************************************************
 * helper functions to build scene (geometry, light), camera and controls.
 ******************************************************************************/

// create a Scene
export function setupScene(scene: THREE.Scene){
  scene.matrixAutoUpdate = false;
  scene.background = new THREE.Color(1, 1, 1);
  return scene;
};

// define Scene
export function setupGeometry(scene: THREE.Scene){
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  var geometry = new THREE.BoxGeometry();
  var material = new THREE.MeshPhongMaterial({ color: 0x887766 });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.matrixAutoUpdate = false;
  scene.add(mesh);
  // return mesh, because we will change its geometry later
  return mesh;
};

export function setupLight(scene: THREE.Scene){
  // add two point lights and a basic ambient light
  // https://threejs.org/docs/#api/lights/PointLight
  var light = new THREE.PointLight(0xffffcc, 1, 100);
  light.position.set( 10, 30, 15 );
  scene.add(light);

  var light2 = new THREE.PointLight(0xffffcc, 1, 100);
  light2.position.set( 10, -30, -15 );
  scene.add(light2);

  //https://threejs.org/docs/#api/en/lights/AmbientLight
  scene.add(new THREE.AmbientLight(0x999999));
  return scene;
};

// define camera that looks into scene
export function setupCamera(camera: THREE.PerspectiveCamera, scene: THREE.Scene){
  // https://threejs.org/docs/#api/cameras/PerspectiveCamera
  camera.near = 0.01;
  camera.far = 10;
  camera.fov = 70;
  camera.position.z = 3;
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix()
  return camera
}

// define controls (mouse interaction with the renderer)
export function setupControls(controls: OrbitControls){
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.enableZoom = true;
  controls.keys = {LEFT: "", UP:"", RIGHT: "", BOTTOM:""};
  controls.listenToKeyEvents(document.body);
  controls.minDistance = 0.1;
  controls.maxDistance = 9;
  return controls;
};

// Scale a mesh along the three coordinate axes (can be ignored)
export function scale(mesh: THREE.Mesh, x: number, y: number, z: number) {
  let matrix = new THREE.Matrix4();

  // Build a scale matrix
  matrix.set(
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1,
  );

  // Inline update of the mesh's world matrix
  mesh.matrixWorld.copy(matrix);
}