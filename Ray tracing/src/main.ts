// custom imports
import * as THREE from 'three';
import { CanvasWidget } from './canvasWidget';
import * as helper from './helper';
import { Application, createWindow } from './lib/window';
import * as utils from './lib/utils';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import RenderWidget from './lib/rendererWidget';
import { Mesh } from 'three';

let root = Application("ray");
root.setLayout([["canvas", "renderer"]]);
root.setLayoutColumns(["50%", "50%"]);
root.setLayoutRows(["100%"]);

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera();
helper.setupCamera(camera);
helper.setupGeometry(scene);

var intensity = 0.25;
  var lights = [];
  var light1 = new THREE.PointLight( 0xffffff, intensity * 2 );
  light1.position.set( 0, 1, 300/300 );
  scene.add(light1);
  lights.push(light1);
  light1.updateMatrixWorld();

  var light2 = new THREE.PointLight( 0xffaa55, intensity );
  light2.position.set( - 200/300, 100/300, 100/300 );
  scene.add(light2);
  lights.push(light2);
  light2.updateMatrixWorld();

  var light3 = new THREE.PointLight( 0x55aaff, intensity );
  light3.position.set( 200/300, 100/300, 100/300 );
  scene.add(light3);
  lights.push(light3);
  light3.updateMatrixWorld();

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
box.name = "box";
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
planeback.name = "back";
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
var sphereGeometry = new THREE.SphereGeometry( 50/300, 8, 4 );

var redsphere = new THREE.Mesh( sphereGeometry, phongMaterialRed );
redsphere.position.set( - 50/300, - 250/300 + 250/300, - 50/300 );
redsphere.name = "red";
scene.add(redsphere);

var greensphere = new THREE.Mesh( sphereGeometry, phongMaterialGreen );
greensphere.position.set( 175/300, - 250/300 + 150/300, - 150/300 );
scene.add(greensphere);

var bluesphere = new THREE.Mesh( sphereGeometry, phongMaterialBlue );
bluesphere.position.set( 75/300, - 250/300 + 200/300, - 75/300 );
bluesphere.rotation.y = 0.5;
scene.add( bluesphere );

let settings = new helper.Settings();
let gui = helper.createGUI(settings);
gui.name;
let canvasDiv = createWindow("canvas");
root.appendChild(canvasDiv);
let canWid = new CanvasWidget(canvasDiv,settings.width,settings.height);

function callback(changed: utils.KeyValuePair<helper.Settings>){
 if(changed.key == "width" || changed.key == "height"){
   canWid.changeDimensions(settings.width,settings.height);
 }
 if(changed.key == "saveImg"){
    canWid.savePNG();
 }
 if(changed.key == "render"){
  reset();
  render();
  
}
}

function main(){
  

  // ---------------------------------------------------------------------------
  // create Settings and create GUI settings

  // adds the callback that gets called on settings change
  settings.addCallback(callback);
 
  // ---------------------------------------------------------------------------
  // create RenderDiv
	let rendererDiv = createWindow("renderer");
  root.appendChild(rendererDiv);

  // create renderer
  let renderer = new THREE.WebGLRenderer({
      antialias: true,  // to enable anti-alias and get smoother output
  });

  // create controls
  let controls = new OrbitControls(camera, rendererDiv);
  helper.setupControls(controls);

  let wid = new RenderWidget(rendererDiv, renderer, camera, scene, controls);
  wid.animate();
}


// call main entrypoint
main();

export function save(){
  canWid.savePNG();
}

function render(){
 
  for(var i = 0; i < settings.width; i++){
    for(var j = 0; j < settings.height; j++){
      var color = new THREE.Color(0,0,0);
      var colorarray = new Array(settings.subsamples * settings.subsamples);
      for(var g = 0; g < 1; g = g + 1/settings.subsamples ){
        for(var k = 0; k < 1; k = k + 1/settings.subsamples ){ 
          colorarray.push(getcolor(i+g,j+k));
        }
      }
      colorarray.forEach(element =>  {
        //console.log(element);
        color.add(element);
      });
      color.multiplyScalar(1/(settings.subsamples*settings.subsamples));
      //console.log(color);
      canWid.setPixel(i,j,color);
      
    } 
  }
}

function reset(){
  for(var i = 0; i < settings.width; i++){
    for(var j = 0; j < settings.height; j++){
      var color = new THREE.Color(0,0,0);
      canWid.setPixel(i,j,color); 
    } 
  }
}

function intersection(sphere: THREE.Mesh, dir: THREE.Vector3, point: THREE.Vector3){
  var t = 1000000000000;
  var t0 = 1000000000000;
  var t1 = 1000000000000;
  var L = sphere.position.clone();
  L.sub(point);
  var tca = L.dot(dir);
  if(tca < 0){
    return t;
  }
  var d2 = L.dot(L) - (tca * tca); 
  d2 = Math.sqrt(d2);
  if(sphere.geometry instanceof THREE.SphereGeometry){
    if(d2 > sphere.geometry.parameters.radius){
      return t;
    }
    var thc = Math.sqrt(sphere.geometry.parameters.radius - d2);
    t0 = tca - thc;
    t1 = tca + thc;
    if (t0 > t1){ 
      var temp = t0;
      t0 = t1;
      t1 = temp;
    }
    if(t0 < 0){
      t0 = t1;
      if(t0 < 0){
        return t;
      }
    }
  }
  t = t0;
  return t;
}

function intersectionPoint(raycaster: THREE.Raycaster,t: number, O :THREE.Vector3){
  var inter = raycaster.ray.direction.clone();
  inter.normalize();
  inter.multiplyScalar(t);
  inter.add(O);
  return inter;
}
function phongsphear(sphere: THREE.Mesh,P :THREE.Vector3, light: THREE.PointLight){
  var color = new THREE.Color(0,0,0);
  var colord = new THREE.Color(0,0,0);
  var colors = new THREE.Color(0,0,0);

  var LI = light.color.clone();
  var I = P.clone();
  LI.multiplyScalar(light1.intensity * 4);
  var L = light.position.clone();
  var V = camera.position.clone();
  var N = calculateNormalsphere(sphere, I);
  L.sub(I);
  V.sub(I);
  V.normalize();
  var distance = L.length() * L.length();
  
  N.normalize();
  var NdotL = N.dot(L);
  if(NdotL < 0){
    NdotL = 0;
  }
  L.normalize();
  var R = L.clone();
  var NdotDir = N.dot(L);
  var N2 = N.clone();
  N2.multiplyScalar(-2*NdotDir);
  R.add(N2);
  R.normalize();
  var VdotR = V.dot(R);
  var shadow = false;
  if(settings.shadows){
    shadow = shadowab(L,I);
  }
  if(!settings.shadows|| !shadow){
      if(sphere.material instanceof THREE.MeshPhongMaterial){
        intensity = 0;
        if(VdotR < 0 && NdotL > 0){
          intensity = Math.pow(VdotR, sphere.material.shininess);
          intensity = intensity * ((sphere.material.shininess+2)/2*Math.PI);
        }
        colord = sphere.material.color.clone();
          colord.multiply(LI);
          colord.multiplyScalar(NdotL);
          colord.multiplyScalar(1/distance);
        colors = sphere.material.specular.clone();
        colors.multiply(LI);
        colors.multiplyScalar(intensity);
        colors.multiplyScalar(1/distance);
        colors.multiplyScalar(sphere.material.shininess / 25000);
        colord.add(colors);
        color = colord;
      
      }
  }
  return color;
}

function phongElse(intersects: THREE.Intersection, light: THREE.PointLight){
  var color = new THREE.Color(0,0,0);
  if(intersects == null){
    return color;
  }
  
  var colord = new THREE.Color(0,0,0);
  var colors = new THREE.Color(0,0,0);
  var LI = light.color.clone();
  var I = intersects.point.clone();
  LI.multiplyScalar(light1.intensity * 4);
  var L = light.position.clone();
  var V = camera.position.clone();
  var N = calculateNormals(intersects);
  //N.sub(I);
  L.sub(I);
  V.sub(I);
  V.normalize();
  var distance = L.length() * L.length();
  
  N.normalize();
  var NdotL = N.dot(L);
  if(NdotL < 0){
    NdotL = 0;
  }
  L.normalize();
  var R = L.clone();
  var NdotDir = N.dot(L);
  var N2 = N.clone();
  N2.multiplyScalar(-2*NdotDir);
  R.add(N2);
  R.normalize();
  var VdotR = V.dot(R);
  var shadow = false;
  if(settings.shadows){
    shadow = shadowab(L,I);
  }
  if(!settings.shadows|| !shadow){
    if(intersects.object instanceof THREE.Mesh){
      intersects.object.material as THREE.MeshPhongMaterial & { mirror: boolean };
        intensity = 0;
        if(VdotR < 0 && NdotL > 0){
          intensity = Math.pow(VdotR, intersects.object.material.shininess);
          intensity = intensity * ((intersects.object.material.shininess+2)/2*Math.PI);
        }
        colord = intersects.object.material.color.clone();
          colord.multiply(LI);
          colord.multiplyScalar(NdotL);
          colord.multiplyScalar(1/distance);
        if(intersects.object.material.mirror && settings.mirrors){
         colord.setRGB(0,0,0);
        }
        colors = intersects.object.material.specular.clone();
        colors.multiply(LI);
        colors.multiplyScalar(intensity);
        colors.multiplyScalar(1/distance);
        colors.multiplyScalar(intersects.object.material.shininess / 50);
        colord.add(colors);
        color = colord;
      
    }
  }
  return color;
}
function calculateNormalsphere(sphere: THREE.Mesh, inter : THREE.Vector3){
  var normal = new THREE.Vector3;
  var I = inter.clone();
  var P = sphere.position.clone();
  
  normal = I.sub(P);
  normal.normalize();   
   
  return normal;
}

function calculateNormals(intersects: THREE.Intersection){
  var normal = new THREE.Vector3;
    if(intersects.face != null){
      normal = intersects.face?.normal.clone();
      var normalMatrix = new THREE.Matrix3().getNormalMatrix(intersects.object.matrixWorld);
      normal.applyMatrix3(normalMatrix);
      normal.normalize();
    }
  return normal;
}

function shadowab(L: THREE.Vector3,I: THREE.Vector3){
  var shadowcaster = new THREE.Raycaster;
  shadowcaster.set(I,L);
  if(settings.correctSpheres){
    var tr = intersection(redsphere, shadowcaster.ray.direction,I);
    var tg = intersection(greensphere, shadowcaster.ray.direction,I);
    var tb = intersection(bluesphere, shadowcaster.ray.direction,I);
    if(tr != 1000000000000){
      return true;
    }
    if(tg != 1000000000000 ){
      return true;
    }
    if(tb != 1000000000000){
      return true;
    }
  }
  var intersectsshadow = shadowcaster.intersectObjects(scene.children);
  if(intersectsshadow[0]!= null){
    return true;
  }
  return false;
}

function mirror(rd :number, color: THREE.Color,intersects: THREE.Intersection, raycaster: THREE.Raycaster, light: THREE.PointLight){
  if(intersects == null){
    
    return color;
  }
  if(rd < settings.maxDepth){
    var use = 1000000000000;
    if(intersects.object instanceof Mesh){
      intersects.object.material as THREE.MeshPhongMaterial & { mirror: boolean };
        if(intersects.object.material.mirror){
          var R = raycaster.ray.direction.clone();
          var N = calculateNormals(intersects);
          var NdotDir = N.dot(raycaster.ray.direction);
          var N2 = N.clone();
          N2.multiplyScalar(-2*NdotDir);
          R.add(N2);
          var mirrorcaster = new THREE.Raycaster;
          mirrorcaster.set(intersects.point, R);
          var mirrorintersects = mirrorcaster.intersectObjects(scene.children)
          var tr = intersection(redsphere, mirrorcaster.ray.direction,intersects.point);
          var tg = intersection(greensphere, mirrorcaster.ray.direction,intersects.point);
          var tb = intersection(bluesphere, mirrorcaster.ray.direction,intersects.point);
          if(tr < tg){
            use = tr;
          }
          else{
            use = tg;
          }
          if(use > tb){
            use = tb;
          }

            if(tr > 0 && use != 1000000000000 &&  tr == use){      
              color.add(phongsphear(redsphere,intersectionPoint(mirrorcaster,tr,intersects.point),light1));
              if(settings.alllights){
                color.add(phongsphear(redsphere,intersectionPoint(mirrorcaster,tr,intersects.point),light2));
                color.add(phongsphear(redsphere,intersectionPoint(raycaster,tr,intersects.point),light3));
                color.multiplyScalar(1/3);
              }      
            
            }
            if(tg > 0 && use != 1000000000000 &&  tg == use){
              color.add(phongsphear(greensphere,intersectionPoint(mirrorcaster,tg,intersects.point),light1));
              if(settings.alllights){
                color.add(phongsphear(greensphere,intersectionPoint(mirrorcaster,tg,intersects.point),light2));
                color.add(phongsphear(greensphere,intersectionPoint(mirrorcaster,tg,intersects.point),light3));
              }
              
            }
            if(tb > 0 && use != 1000000000000 &&  tb == use){
              color.add(phongsphear(bluesphere,intersectionPoint(mirrorcaster,tb,intersects.point),light1));
              if(settings.alllights){
                color.add(phongsphear(bluesphere,intersectionPoint(mirrorcaster,tb,intersects.point),light2));
                color.add(phongsphear(bluesphere,intersectionPoint(mirrorcaster,tb,intersects.point),light3));
              }
              
            }
          if(mirrorintersects[0] != null && use == 1000000000000){
          
            color.add(phongElse(mirrorintersects[0], light));
          
          }
          mirror(rd+1,color, mirrorintersects[0],mirrorcaster,light);
        }
    }
  }
  return color;
}

function getcolor(i: number,j:number){
  //console.log("getcolor");
  var raycaster = new THREE.Raycaster();
  var color = new THREE.Color(0,0,0);
  var pionter = new THREE.Vector2();
  pionter.x = (i / settings.width) * 2 - 1;
  pionter.y = -(j / settings.height) * 2 + 1;
  raycaster.setFromCamera(pionter, camera);
  var use = 1000000000000;
  var intersects = raycaster.intersectObjects(scene.children);
  if(settings.correctSpheres){
    var tr = intersection(redsphere, raycaster.ray.direction,camera.position);
    var tg = intersection(greensphere, raycaster.ray.direction,camera.position);
    var tb = intersection(bluesphere, raycaster.ray.direction,camera.position);
    if(tr < tg){
      use = tr;
    }
    else{
      use = tg;
          }
    if(use > tb){
      use = tb;
    }
    if(tr > 0 && use != 1000000000000 && use == tr){
      
      if(settings.phong){
        
        color.add(phongsphear(redsphere,intersectionPoint(raycaster,tr,camera.position),light1));
        if(settings.alllights){
          color.add(phongsphear(redsphere,intersectionPoint(raycaster,tr,camera.position),light2));
          color.add(phongsphear(redsphere,intersectionPoint(raycaster,tr,camera.position),light3));
          color.multiplyScalar(1/3);
        }
        
        //console.log(color);
        return color;
      }
      else{
        color = redsphere.material.color;
        return color;
      }
    }
        if(tg > 0 && use != 1000000000000 && tg == use){
          if(settings.phong){
          
            
            color.add(phongsphear(greensphere,intersectionPoint(raycaster,tg,camera.position),light1));
            if(settings.alllights){
              color.add(phongsphear(greensphere,intersectionPoint(raycaster,tg,camera.position),light2));
              color.add(phongsphear(greensphere,intersectionPoint(raycaster,tg,camera.position),light3));
            }
            
            return color;
          }
          else{
            var color =greensphere.material.color;
            return color;
          }
        }
      if(tb > 0 && use != 1000000000000 &&  tb == use){
          if(settings.phong){
            color.add(phongsphear(bluesphere,intersectionPoint(raycaster,tb,camera.position),light1));
            if(settings.alllights){
              color.add(phongsphear(bluesphere,intersectionPoint(raycaster,tb,camera.position),light2));
              color.add(phongsphear(bluesphere,intersectionPoint(raycaster,tb,camera.position),light3));
            }
            return color;
          }
          else{
          color = bluesphere.material.color;
          return color;
            
          }
      }
    }
    if(use == 1000000000000 ){
      if(intersects[0] != null){
        if(intersects[0].object instanceof THREE.Mesh){
          if(intersects[0].object.material instanceof THREE.MeshPhongMaterial){
            if(settings.phong){
              if(settings.mirrors){
                mirror(0,color,intersects[0],raycaster,light1);
                if(settings.alllights){
                  mirror(0,color,intersects[0],raycaster,light2);
                  mirror(0,color,intersects[0],raycaster,light2);
                }
              } 
              color.add(phongElse(intersects[0],light1));
              if(settings.alllights){
                color.add(phongElse(intersects[0],light2));
                color.add(phongElse(intersects[0],light3));
                color.multiplyScalar(1/3);
              }
              
              return color;
            }
            else{
              color = new THREE.Color(intersects[0].object.material.color.r,intersects[0].object.material.color.g, intersects[0].object.material.color.b);
              return color;
            }
          }
      }
    }
  } 
  return color;
}
