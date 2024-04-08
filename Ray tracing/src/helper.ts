import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as utils from './lib/utils';
import * as dat from 'dat.gui';


/*******************************************************************************
 * Helps to build gui, scene, camera and controls
 ******************************************************************************/

export class Settings extends utils.Callbackable{
  maxDepth: number = 2;
  subsamples: number = 1;
  width: number = 256;
  height: number = 256;
  correctSpheres: boolean = false;
  phong: boolean = false;
  alllights: boolean = false;
  shadows: boolean = false;
  mirrors: boolean = false;
  render: boolean = false;
  saveImg: boolean = false;
 }

export function createGUI(params: Settings): dat.GUI {
  var gui: dat.GUI = new dat.GUI();

  gui.add(params, "width").name("Width")
  gui.add(params, "height").name("Height")
  gui.add(params, "correctSpheres").name("Correct Spheres")
  gui.add(params, "phong").name("Phong")
  gui.add(params, "alllights").name("All Lights")
  gui.add(params, "shadows").name("Shadows")
  gui.add(params, "mirrors").name("Mirrors")
  gui.add(params, 'maxDepth', 0, 10, 1).name('Max Recursions')
  gui.add(params, "subsamples", 1, 4, 1).name("Subsamples")
  gui.add(params, "render").name("Render")
  gui.add(params, "saveImg").name("Save")
  return gui;
}


export function setupGeometry(scene: THREE.Scene){

  var phongMaterialRed = new THREE.MeshPhongMaterial( {
      color: 0xff0000,
      specular: 0xaaaaaa,
      shininess: 150,
      reflectivity: 0,
  } ) as THREE.MeshPhongMaterial & { mirror: boolean };
  phongMaterialRed.mirror = false;

  var phongMaterialGreen = new THREE.MeshPhongMaterial( {
      color: 0x00ff00,
      specular: 0xaaaaaa,
      shininess: 150,
      reflectivity: 0,
  } ) as THREE.MeshPhongMaterial & { mirror: boolean };
  phongMaterialGreen.mirror = false;

  var phongMaterialBlue = new THREE.MeshPhongMaterial( {
      color: 0x0000ff,
      specular: 0xaaaaaa,
      shininess: 150,
      reflectivity: 0,
  } ) as THREE.MeshPhongMaterial & { mirror: boolean };
  phongMaterialBlue.mirror = false;

  var phongMaterialTop = new THREE.MeshPhongMaterial( {
      color: 0xffffff,
      specular: 0x111111,
      shininess: 100,
      reflectivity: 0,
  } ) as THREE.MeshPhongMaterial & { mirror: boolean };
  phongMaterialTop.mirror = false;

  var phongMaterialGround = new THREE.MeshPhongMaterial( {
      color: 0x666666,
      specular: 0x111111,
      shininess: 100,
      reflectivity: 0,
  } ) as THREE.MeshPhongMaterial & { mirror: boolean };
  phongMaterialGround.mirror = false;

  var mirrorMaterial = new THREE.MeshPhongMaterial( {
      color: 0xffaa00,
      specular: 0xffffff,
      shininess: 10000,
      reflectivity: 0.8,
  }) as THREE.MeshPhongMaterial & { mirror: boolean };
  mirrorMaterial.mirror = true;

  var planeGeometry = new THREE.PlaneGeometry( 602/300, 602/300 );
  var boxGeometry = new THREE.BoxGeometry( 100/300, 100/300, 100/300 );
 

  var box = new THREE.Mesh( boxGeometry, mirrorMaterial );
  box.position.set( - 175/300, - 250/300 + 300/300, - 150/300 );
  box.rotation.y = 0.25;
  scene.add(box);

  // bottom
  var planebottom = new THREE.Mesh( planeGeometry, phongMaterialGround );
  planebottom.position.set( 0, - 300/300, - 150/300 );
  planebottom.rotation.x = -1.57;
  planebottom.scale.setY(0.6);
  scene.add( planebottom );

  // top
  var planetop = new THREE.Mesh( planeGeometry, phongMaterialTop );
  planetop.position.set( 0, 300/300 , - 150/300 );
  planetop.rotation.x = 1.57;
  planetop.scale.setY(0.6);
  scene.add( planetop );

  // back
  var planeback = new THREE.Mesh( planeGeometry, mirrorMaterial );
  planeback.position.set( 0, 0, - 300/300 );
  scene.add( planeback );

  // left
  var planeleft = new THREE.Mesh( planeGeometry, phongMaterialRed );
  planeleft.rotation.z = 1.57;
  planeleft.rotation.y = 1.57;
  planeleft.position.set( - 300/300, 0, - 150/300 );
  planeleft.scale.setY(0.6);
  scene.add( planeleft );

  // right
  var planeright = new THREE.Mesh( planeGeometry, phongMaterialBlue );
  planeright.rotation.z = 1.57;
  planeright.rotation.y = -1.57;
  planeright.position.set( 300/300, 0, - 150/300 );
  planeright.scale.setY(0.6);
  scene.add( planeright );

  scene.updateMatrixWorld();
  return scene;
};

export function setupCamera(camera: THREE.PerspectiveCamera){
  camera.fov = 60;
  camera.far = 1000;
  camera.near = 0.001;
  camera.position.z = 540/300;
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
