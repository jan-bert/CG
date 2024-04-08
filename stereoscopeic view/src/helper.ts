import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as utils from './lib/utils';
import * as dat from 'dat.gui';


export { createTeddyBear } from './teddy';

/*******************************************************************************
 * Helps to build gui, scene, camera and controls
 ******************************************************************************/

export class Settings extends utils.Callbackable{
  Distance: number = 0;
 }

export function createGUI(params: Settings): dat.GUI {
  var gui: dat.GUI = new dat.GUI();

 
  gui.add(params, 'Distance', -2, 2, 0.1).name('Camera Distance')
  return gui;
}

export function setupCamera(camera: THREE.PerspectiveCamera){
  camera.fov = 60;
  camera.far = 1000;
  camera.near = 0.001;
  camera.position.z = 3;
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
  return camera
}

export function setupControls(controls: OrbitControls){
 controls.rotateSpeed = 1.0;
 controls.zoomSpeed = 1.2;
 controls.enableZoom = true;
 controls.keys = {LEFT: "KeyA", UP:"KeyW", RIGHT: "KeyD", BOTTOM:"KeyS"};
 controls.listenToKeyEvents(document.body);
 controls.minDistance = 0.00001;
 controls.maxDistance = 9;
 controls.minZoom = 0;
 return controls;
};
