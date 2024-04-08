// external dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// local from us provided utilities
import type * as utils from './lib/utils';
import RenderWidget from './lib/rendererWidget';
import { Application, createWindow } from './lib/window';

// helper lib, provides exercise dependent prewritten Code
import * as helper from './helper';
var scene = new THREE.Scene();
scene.background = new THREE.Color(1, 1, 1);

var ndcscene = new THREE.Scene();
ndcscene.background = new THREE.Color(1, 1, 1);

var teddy = new THREE.Object3D
teddy = helper.createTeddyBear()

scene.add(teddy)

var screencamera = new THREE.PerspectiveCamera
helper.setupCamera(screencamera, scene, 1, 5, 40)

var camerahelper = new THREE.CameraHelper( screencamera );
scene.add( camerahelper );

var worldcamera = new THREE.PerspectiveCamera
helper.setupCamera(worldcamera, scene, 1, 20, 40)

var ndccamera = helper.createCanonicalCamera()

var ndcrenderer = new THREE.WebGLRenderer({
  antialias: true,
});

var normal = new THREE.Vector3
var point = new THREE.Vector3
var topplane = new THREE.Plane();
normal.set(0,-1,0);
point.set(0,1,0);
topplane.setFromNormalAndCoplanarPoint(normal,point)
ndcrenderer.clippingPlanes[0] = topplane;

var botplane = new THREE.Plane();
normal.set(0,1,0);
point.set(0,-1,0);
botplane.setFromNormalAndCoplanarPoint(normal,point)
ndcrenderer.clippingPlanes[1] = botplane;

var leftplane = new THREE.Plane();
normal.set(1,0,0);
point.set(-1,0,0);
leftplane.setFromNormalAndCoplanarPoint(normal,point)
ndcrenderer.clippingPlanes[2] = leftplane;

var rightplane = new THREE.Plane();
normal.set(-1,0,0);
point.set(1,0,0);
rightplane.setFromNormalAndCoplanarPoint(normal,point)
ndcrenderer.clippingPlanes[3] = rightplane;

var backplane = new THREE.Plane();
normal.set(0,0,1);
point.set(0,0,-1);
backplane.setFromNormalAndCoplanarPoint(normal,point)
ndcrenderer.clippingPlanes[4] = backplane;

var frontplane = new THREE.Plane();
normal.set(0,0,-1);
point.set(0,0,1);
frontplane.setFromNormalAndCoplanarPoint(normal,point)
ndcrenderer.clippingPlanes[5] = frontplane;

function callback(changed: utils.KeyValuePair<helper.Settings>){
  if(changed.key == "translateX"){
    teddy.position.setX(changed.value);
    transformtondc(ndcscene, screencamera);
  }
  else if(changed.key == "translateY"){
    teddy.position.setY(changed.value);
    transformtondc(ndcscene, screencamera);
  }
  else if(changed.key == "translateZ"){
    teddy.position.setZ(changed.value);
    transformtondc(ndcscene, screencamera);
  }
  else if(changed.key == "rotateX"){
    teddy.rotation.set(settings.rotateX,settings.rotateY,settings.rotateZ);
    transformtondc(ndcscene, screencamera);
  }
  else if(changed.key == "rotateY"){
    teddy.rotation.set(settings.rotateX,settings.rotateY,settings.rotateZ);
    transformtondc(ndcscene, screencamera);
  }
  else if(changed.key == "rotateZ"){
    teddy.rotation.set(settings.rotateX,settings.rotateY,settings.rotateZ);
    transformtondc(ndcscene, screencamera);
  }
  else if(changed.key == "near"){
    screencamera.near = changed.value;
    screencamera.updateProjectionMatrix();
    screencamera.matrixAutoUpdate = true;
    var camerahelper2 = new THREE.CameraHelper( screencamera );
    camerahelper.removeFromParent()
    camerahelper = camerahelper2
    scene.add(camerahelper);
    transformtondc(ndcscene, screencamera);
  }
  else if(changed.key == "far"){
    screencamera.far = changed.value;
    screencamera.updateProjectionMatrix();
    screencamera.matrixAutoUpdate = true;
    camerahelper.removeFromParent()
    var camerahelper2 = new THREE.CameraHelper( screencamera );
    camerahelper.removeFromParent()
    camerahelper = camerahelper2
    scene.add(camerahelper);
    transformtondc(ndcscene, screencamera);
  }
  else if(changed.key == "fov"){
    screencamera.fov = changed.value;
    screencamera.updateProjectionMatrix();
    screencamera.matrixAutoUpdate = true;
    var camerahelper2 = new THREE.CameraHelper( screencamera );
    camerahelper.removeFromParent()
    camerahelper = camerahelper2
    scene.add(camerahelper);
    transformtondc(ndcscene, screencamera);
  }
  else if (changed.key == 'planeX0'){
    if(!changed.value){
    var plane = new THREE.Plane()
    var normal = new THREE.Vector3
    var point = new THREE.Vector3
    normal.set(1,0,0);
    point.set(-100,0,0);
    plane.setFromNormalAndCoplanarPoint(normal,point)
    ndcrenderer.clippingPlanes[2] = plane
    }
    if(changed.value){
      var plane = new THREE.Plane()
      var normal = new THREE.Vector3
      var point = new THREE.Vector3
      normal.set(1,0,0);
      point.set(-1,0,0);
      plane.setFromNormalAndCoplanarPoint(normal,point)
      ndcrenderer.clippingPlanes[2] = plane
      }
  }

  else if (changed.key == 'planeX1'){
    if(!changed.value){
    var plane = new THREE.Plane()
    var normal = new THREE.Vector3
    var point = new THREE.Vector3
    normal.set(-1,0,0);
    point.set(100,0,0);
    plane.setFromNormalAndCoplanarPoint(normal,point)
    ndcrenderer.clippingPlanes[3] = plane
    }
    if(changed.value){
      var plane = new THREE.Plane()
      var normal = new THREE.Vector3
      var point = new THREE.Vector3
      normal.set(-1,0,0);
      point.set(1,0,0);
      plane.setFromNormalAndCoplanarPoint(normal,point)
      ndcrenderer.clippingPlanes[3] = plane
      }
  }
  else if (changed.key == 'planeY0'){
    if(!changed.value){
    var plane = new THREE.Plane()
    var normal = new THREE.Vector3
    var point = new THREE.Vector3
    normal.set(0,1,0);
    point.set(0,-100,0);
    plane.setFromNormalAndCoplanarPoint(normal,point)
    ndcrenderer.clippingPlanes[1] = plane
    }
    if(changed.value){
      var plane = new THREE.Plane()
      var normal = new THREE.Vector3
      var point = new THREE.Vector3
      normal.set(0,1,0);
      point.set(0,-1,0);
      plane.setFromNormalAndCoplanarPoint(normal,point)
      ndcrenderer.clippingPlanes[1] = plane
      }
  }
  else if (changed.key == 'planeY1'){
    if(!changed.value){
    var plane = new THREE.Plane()
    var normal = new THREE.Vector3
    var point = new THREE.Vector3
    normal.set(0,-1,0);
    point.set(0,100,0);
    plane.setFromNormalAndCoplanarPoint(normal,point)
    ndcrenderer.clippingPlanes[0] = plane
    }
    if(changed.value){
      var plane = new THREE.Plane()
      var normal = new THREE.Vector3
      var point = new THREE.Vector3
      normal.set(0,-1,0);
      point.set(0,1,0);
      plane.setFromNormalAndCoplanarPoint(normal,point)
      ndcrenderer.clippingPlanes[0] = plane
      }
  }
  else if (changed.key == 'planeZ0'){
    if(!changed.value){
    var plane = new THREE.Plane()
    var normal = new THREE.Vector3
    var point = new THREE.Vector3
    normal.set(0,0,1);
    point.set(0,0,-100);
    plane.setFromNormalAndCoplanarPoint(normal,point)
    ndcrenderer.clippingPlanes[4] = plane
    }
    if(changed.value){
      var plane = new THREE.Plane()
      var normal = new THREE.Vector3
      var point = new THREE.Vector3
      normal.set(0,0,1);
      point.set(0,0,-1);
      plane.setFromNormalAndCoplanarPoint(normal,point)
      ndcrenderer.clippingPlanes[4] = plane
      }
  }
  else if (changed.key == 'planeZ1'){
    if(!changed.value){
    var plane = new THREE.Plane()
    var normal = new THREE.Vector3
    var point = new THREE.Vector3
    normal.set(0,0,-1);
    point.set(0,0,100);
    plane.setFromNormalAndCoplanarPoint(normal,point)
    ndcrenderer.clippingPlanes[5] = plane
    }
    if(changed.value){
      var plane = new THREE.Plane()
      var normal = new THREE.Vector3
      var point = new THREE.Vector3
      normal.set(0,0,-1);
      point.set(0,0,1);
      plane.setFromNormalAndCoplanarPoint(normal,point)
      ndcrenderer.clippingPlanes[5] = plane
      }
  }
}

/*******************************************************************************
 * Main entrypoint.
 ******************************************************************************/

var settings: helper.Settings;

function main(){
  var root = Application("Camera");
  root.setLayout([["world", "canonical", "screen"]]);
  root.setLayoutColumns(["1fr", "1fr", "1fr"]);
  root.setLayoutRows(["100%"]);


  var screenDiv = createWindow("screen");
  root.appendChild(screenDiv);

  // create RenderDiv
  var worldDiv = createWindow("world");
  root.appendChild(worldDiv);

  // create canonicalDiv
  var canonicalDiv = createWindow("canonical");
  root.appendChild(canonicalDiv);

  // ---------------------------------------------------------------------------
  // create Settings and create GUI settings
 
  settings = new helper.Settings();
  helper.createGUI(settings);
  settings.addCallback(callback);

  
  helper.setupCube(ndcscene);
  
  transformtondc(ndcscene, screencamera);
  
  var screenrenderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  var worldrenderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  var screencontrols = new OrbitControls(screencamera, screenDiv);
  var worldcontrols = new OrbitControls(worldcamera, worldDiv);
  var ndccontrols = new OrbitControls(ndccamera, canonicalDiv);

  helper.setupControls(worldcontrols);
  helper.setupControls(screencontrols);
  helper.setupControls(ndccontrols);

  var widwolrd = new RenderWidget(worldDiv, worldrenderer, worldcamera, scene, worldcontrols);
  var widScreen = new RenderWidget(screenDiv, screenrenderer, screencamera, scene, screencontrols);
  var widndc = new RenderWidget(canonicalDiv, ndcrenderer, ndccamera, ndcscene, ndccontrols);

  widScreen.animate();
  widwolrd.animate();
  widndc.animate();
  
  screencontrols.addEventListener('change', ( ) => {
    screencamera.updateMatrix();
    screencamera.updateMatrixWorld();
    screencamera.updateProjectionMatrix();
    transformtondc(ndcscene, screencamera);
  });
}
// call main entrypoint
main();

function transformtondc(scene: THREE.Scene, camera: THREE.PerspectiveCamera){
  
  if(scene.children[1] != null){
    scene.children[1].removeFromParent()
  }

  var teddycpy = helper.createTeddyBear()

  teddycpy.position.set(settings.translateX,settings.translateY,settings.translateZ,);
  teddycpy.rotation.set(settings.rotateX,settings.rotateY,settings.rotateZ,);
  teddycpy.updateMatrix();
  teddycpy.updateMatrixWorld();
  
  teddycpy.traverse(function( child ){
     
    if(child instanceof THREE.Mesh){
      if(child.geometry instanceof THREE.BufferGeometry){
        
        for(var i = 0; i < child.geometry.getAttribute('position').count; i++){
          console.log('hi');
          var vector = new THREE.Vector4;

          vector.set(
          child.geometry.getAttribute('position').getX(i),
          child.geometry.getAttribute('position').getY(i),
          child.geometry.getAttribute('position').getZ(i),
          1
          )

          applymatrixvector(vector, child.matrixWorld);
          applymatrixvector(vector, camera.matrixWorldInverse);
          applymatrixvector(vector, camera.projectionMatrix);

          vector.setX(vector.x/vector.w);
          vector.setY(vector.y/vector.w);
          vector.setZ(vector.z/vector.w);
          
          child.geometry.getAttribute('position').setXYZ(i,vector.x,vector.y,-vector.z);
          child.geometry.getAttribute('position').needsUpdate = true;
        }
      }
    }
    
    child.position.set(0,0,0);
    child.rotation.set(0,0,0);
    child.scale.set(1,1,1)
    
  });
  teddycpy.position.set(0,0,0);
  teddycpy.rotation.set(0,0,0);
  teddycpy.scale.set(1,1,1)
  scene.add(teddycpy);
}

function applymatrixvector (v: THREE.Vector4, m: THREE.Matrix4){
    var x = v.x
    var y = v.y
    var z = v.z
    var w = v.w;

		v.x = m.elements[0] * x + m.elements[4] * y + m.elements[8] * z + m.elements[12] * w;
		v.y = m.elements[1] * x + m.elements[5] * y + m.elements[9] * z + m.elements[13] * w;
		v.z = m.elements[2] * x + m.elements[6] * y + m.elements[10] * z + m.elements[14] * w;
		v.w = m.elements[3] * x + m.elements[7] * y + m.elements[11] * z + m.elements[15] * w;
    
		return v;
}