// custom imports
import * as THREE from 'three';
import * as helper from './helper';
import { Application, createWindow } from './lib/window';
import * as utils from './lib/utils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import RenderWidget from './lib/rendererWidget';

let root = Application("ray");
root.setLayout([["Lrenderer", "Rrenderer"]]);
root.setLayoutColumns(["50%", "50%"]);
root.setLayoutRows(["100%"]);
let settings = new helper.Settings();
let gui = helper.createGUI(settings);
gui.name;
let rechts = new THREE.Matrix4;
let links = new THREE.Matrix4;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera();
helper.setupCamera(camera);
let cameraR = new THREE.PerspectiveCamera();
helper.setupCamera(cameraR);
cameraR.matrixAutoUpdate = false;
let cameraL = new THREE.PerspectiveCamera();
helper.setupCamera(cameraL);
cameraL.matrixAutoUpdate = false;

var teddy = helper.createTeddyBear()

scene.add(teddy);

function callback(changed: utils.KeyValuePair<helper.Settings>){
  if(changed.key == "Distance"){
    updateCameras(camera);   
  }
}

function main(){
  

  // ---------------------------------------------------------------------------
  // create Settings and create GUI settings

  // adds the callback that gets called on settings change
  settings.addCallback(callback);
 
  // ---------------------------------------------------------------------------
  // create RenderDiv
  let RrendererDiv = createWindow("Rrenderer");
  root.appendChild(RrendererDiv);
  let LrendererDiv = createWindow("Lrenderer");
  root.appendChild(LrendererDiv);


  // create renderer
  let Rrenderer = new THREE.WebGLRenderer({
      antialias: true,  // to enable anti-alias and get smoother output
  });
  let Lrenderer = new THREE.WebGLRenderer({
    antialias: true,  // to enable anti-alias and get smoother output
});

  // create controls
  let controlsR = new OrbitControls(camera, RrendererDiv);
  let controlsL = new OrbitControls(camera, LrendererDiv);
  
  controlsR.addEventListener('change', ( ) => {
    updateCameras(camera);
  });

  controlsL.addEventListener('change', ( ) => {
    updateCameras(camera);
  });

  let Rwid = new RenderWidget(RrendererDiv, Rrenderer, cameraR, scene);
  Rwid.animate();
  let Lwid = new RenderWidget(LrendererDiv, Lrenderer, cameraL, scene);
  Lwid.animate();
}

// call main entrypoint
main();

function updateCameras(camera: THREE.PerspectiveCamera){
  cameraR.focus = camera.focus;
  cameraR.fov = camera.fov;
  cameraR.aspect = camera.aspect * cameraR.aspect;
  cameraR.near = camera.near;
  cameraR.far = camera.far;
  cameraR.zoom = camera.zoom;

  rechts.elements[12] = -settings.Distance/2;

  cameraR.projectionMatrix.copy(camera.projectionMatrix);
  cameraR.matrixWorld.copy( camera.matrixWorld ).multiply(rechts);

  cameraL.focus = camera.focus;
  cameraL.fov = camera.fov;
  cameraL.aspect = camera.aspect * cameraR.aspect;
  cameraL.near = camera.near;
  cameraL.far = camera.far;
  cameraL.zoom = camera.zoom;

  links.elements[12] = settings.Distance/2;

  cameraL.projectionMatrix.copy(camera.projectionMatrix);
  cameraL.matrixWorld.copy(camera.matrixWorld).multiply(links);
}