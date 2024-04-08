// external dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// local from us provided utilities
import * as utils from './lib/utils';
import RenderWidget from './lib/rendererWidget';
import { Application, createWindow } from './lib/window';

// helper lib, provides exercise dependent prewritten Code
import * as helper from './helper';
import ImageWidget from './imageWidget';
import { Mesh } from 'three';

import uvVertexShader from './shader/uv.v.glsl?raw';
import uvFragmentShader from './shader/uv.f.glsl?raw';
import spVertexShader from './shader/sp.v.glsl?raw';
import spFragmentShader from './shader/sp.f.glsl?raw';
import spfVertexShader from './shader/spf.v.glsl?raw';
import spfFragmentShader from './shader/spf.f.glsl?raw';
import emVertexShader from './shader/em.v.glsl?raw';
import emFragmentShader from './shader/em.f.glsl?raw';
import nmVertexShader from './shader/nm.v.glsl?raw';
import nmFragmentShader from './shader/nm.f.glsl?raw';

let root = Application("Texturing");
root.setLayout([["texture", "renderer"]]);
root.setLayoutColumns(["50%", "50%"]);
root.setLayoutRows(["100%"]);

let textureDiv = createWindow("texture");
root.appendChild(textureDiv);
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera();
helper.setupCamera(camera, scene);


let settings = new helper.Settings();
let gui = helper.createGUI(settings);
let ImgWid = new ImageWidget(textureDiv);
ImgWid.enableDrawing();
gui.name;
ImgWid.setImage('./src/textures/earth.jpg');
applyUVShader();

function callback(changed: utils.KeyValuePair<helper.Settings>) {
  if(changed.key == "pen"){
    ImgWid.clearDrawing();
  }
  switch (changed.key) {
    case "geometry":
      if(changed.key == 'geometry'){
        if(settings.shader == 'UV attribute'){
          applyUVShader();
        }
        if(settings.shader == "Spherical"){
          applySphericalShader();
        }
        if(settings.shader =="Spherical (fixed)"){
          applyfixedSphericalShader();
        }
        if(settings.shader == "Environment Mapping"){
          applyEnvironmentMappingShader();
        }
        if(settings.shader == "Normal Map"){
          applyNormalMapping()
        }
      }
      break;
    case "texture":
      if(changed.key == 'texture'){
        if(settings.environment){
          applyBackgroundTexture();
        }
        ImgWid.setImage('./src/textures/' + settings.texture +'.jpg');
        if(settings.shader == 'UV attribute'){
          applyUVShader();
        }
        if(settings.shader == "Spherical"){
          applySphericalShader();
        }
        if(settings.shader =="Spherical (fixed)"){
          applyfixedSphericalShader();
        }
        if(settings.shader == "Environment Mapping"){
          applyEnvironmentMappingShader();
        }
        if(settings.shader == "Normal Map"){
          applyNormalMapping()
        }
      }

      break;
    case "shader":
      if(changed.key == "shader"){
        if(settings.shader == 'UV attribute'){
          applyUVShader();
        }
        if(settings.shader == "Spherical"){
          applySphericalShader();
        }
        if(settings.shader =="Spherical (fixed)"){
          applyfixedSphericalShader();
        }
        if(settings.shader == "Environment Mapping"){
          applyEnvironmentMappingShader();
        }
        if(settings.shader == "Normal Map"){
          applyNormalMapping()
        }
    }

      break;
    case "environment":
      if(changed.key == "environment"){
        if(changed.value){
          applyBackgroundTexture();
        }
        else{
          scene.background = new THREE.Color(0,0,0);
        }
      }

      break;
    case "normalmap":
    if(changed.key == "normalmap"){
      if(settings.shader == "Normal Map"){
        applyNormalMapping()
      }
    }
    

      break;
    default:
      break;
  }
}

function main(){
  

  // ---------------------------------------------------------------------------
  // create Settings and create GUI settings

  // adds the callback that gets called on settings change
  settings.addCallback(callback);

  // ---------------------------------------------------------------------------
 
  // the image widget. Change the image with setImage
  // you can enable drawing with enableDrawing
  // and it triggers the event "updated" while drawing

  // ---------------------------------------------------------------------------
  // create RenderDiv
	let rendererDiv = createWindow("renderer");
  root.appendChild(rendererDiv);

  // create renderer
  let renderer = new THREE.WebGLRenderer({
      antialias: true,  // to enable anti-alias and get smoother output
  });

  // create scene
  ImgWid.DrawingCanvas.addEventListener('updated', ( ) => {
    if(settings.shader == 'UV attribute'){
      applyUVShader();
    }
  })

  // create camera


  // create controls
  let controls = new OrbitControls(camera, rendererDiv);
  helper.setupControls(controls);

  let wid = new RenderWidget(rendererDiv, renderer, camera, scene, controls);
  wid.animate();

  
}


// call main entrypoint
main();

function applyUVShader(){
  if(scene.children[0]!=null){
    scene.children[0].removeFromParent();
  }
  var texture = new THREE.TextureLoader().load('./src/textures/' + settings.texture +'.jpg');
  var ct = new THREE.CanvasTexture(ImgWid.DrawingCanvas);
  if(settings.geometry == "Quad"){
    var geometry_1 = new THREE.BufferGeometry();

    var vertices = new Float32Array ( [
      -1.0, -1.0, 0.0,
       1.0, -1.0, 0.0,
       1.0,  1.0, 0.0,

       1.0,  1.0, 0.0,
      -1.0,  1.0, 0.0,
      -1.0, -1.0, 0.0
    ] ); 
    var uv = new Float32Array ( [
       0.0,  0.0,
       1.0,  0.0, 
       1.0,  1.0,

       1.0,  1.0,
       0.0,  1.0,
       0.0,  0.0,
    ] ); 
    geometry_1.setAttribute('position', new THREE.BufferAttribute(vertices,3));
    geometry_1.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    let uniforms = {uTexture: {type: 'sampler2D', value: texture },
                    uct: {type: 'sampler2D', value: ct }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: uvVertexShader,
    fragmentShader: uvFragmentShader
    });
    var quad = new THREE.Mesh(geometry_1,material);
    scene.add(quad);
  }
  if(settings.geometry == 'Box'){
    var geometry = helper.createBox();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture },
                    uct: {type: 'sampler2D', value: ct }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: uvVertexShader,
    fragmentShader: uvFragmentShader
    });
    var box = new Mesh(geometry,material);
    scene.add(box);
  }
  if(settings.geometry == 'Sphere'){
    var geometry_2 = helper.createSphere();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture },
                    uct: {type: 'sampler2D', value: ct }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: uvVertexShader,
    fragmentShader: uvFragmentShader
    });
    var sphere = new Mesh(geometry_2,material);
    scene.add(sphere);
  }
  if(settings.geometry == 'Knot'){
    var geometry_3 = helper.createKnot();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture },
                    uct: {type: 'sampler2D', value: ct }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: uvVertexShader,
    fragmentShader: uvFragmentShader
    });
    var knot = new Mesh(geometry_3,material);
    scene.add(knot);
  }
}

function applySphericalShader(){
  if(scene.children[0]!=null){
    scene.children[0].removeFromParent();
  }
  var texture = new THREE.TextureLoader().load('./src/textures/' + settings.texture +'.jpg');
  if(settings.geometry == "Quad"){

    var geometry_1 = new THREE.BufferGeometry();
    var vertices = new Float32Array ( [
      -1.0, -1.0, 0.0,
       1.0, -1.0, 0.0,
       1.0,  1.0, 0.0,

       1.0,  1.0, 0.0,
      -1.0,  1.0, 0.0,
      -1.0, -1.0, 0.0
    ] ); 
    var uv = new Float32Array ( [
       0.0,  0.0,
       1.0,  0.0, 
       1.0,  1.0,

       1.0,  1.0,
       0.0,  1.0,
       0.0,  0.0,
    ] ); 
    geometry_1.setAttribute('position', new THREE.BufferAttribute(vertices,3));
    geometry_1.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    let uniforms = {uTexture: {type: 'sampler2D', value: texture }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: spVertexShader,
    fragmentShader: spFragmentShader
    });
    var quad = new THREE.Mesh(geometry_1,material);
    scene.add(quad);
  }
  if(settings.geometry == 'Box'){
    var geometry = helper.createBox();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: spVertexShader,
    fragmentShader: spFragmentShader
    });
    var box = new Mesh(geometry,material);
    scene.add(box);
  }
  if(settings.geometry == 'Sphere'){
    var geometry_2 = helper.createSphere();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: spVertexShader,
    fragmentShader: spFragmentShader
    });
    var sphere = new Mesh(geometry_2,material);
    scene.add(sphere);
  }
  if(settings.geometry == 'Knot'){
    var geometry_3 = helper.createKnot();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: spVertexShader,
    fragmentShader: spFragmentShader
    });
    var knot = new Mesh(geometry_3,material);
    scene.add(knot);
  }
  if(settings.geometry == 'Bunny'){
    var geometry_4 = helper.createBunny();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: spVertexShader,
    fragmentShader: spFragmentShader
    });
    var bunny = new Mesh(geometry_4,material);
    scene.add(bunny);
  }
  
}

function applyfixedSphericalShader(){
  if(scene.children[0]!=null){
    scene.children[0].removeFromParent();
  }
  var texture = new THREE.TextureLoader().load('./src/textures/' + settings.texture +'.jpg');
  if(settings.geometry == "Quad"){

    var geometry_1 = new THREE.BufferGeometry();
    var vertices = new Float32Array ( [
      -1.0, -1.0, 0.0,
       1.0, -1.0, 0.0,
       1.0,  1.0, 0.0,

       1.0,  1.0, 0.0,
      -1.0,  1.0, 0.0,
      -1.0, -1.0, 0.0
    ] ); 
    var uv = new Float32Array ( [
       0.0,  0.0,
       1.0,  0.0, 
       1.0,  1.0,

       1.0,  1.0,
       0.0,  1.0,
       0.0,  0.0,
    ] ); 
    geometry_1.setAttribute('position', new THREE.BufferAttribute(vertices,3));
    geometry_1.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    let uniforms = {uTexture: {type: 'sampler2D', value: texture }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: spfVertexShader,
    fragmentShader: spfFragmentShader
    });
    var quad = new THREE.Mesh(geometry_1,material);
    scene.add(quad);
  }
  if(settings.geometry == 'Box'){
    var geometry = helper.createBox();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: spfVertexShader,
    fragmentShader: spfFragmentShader
    });
    var box = new Mesh(geometry,material);
    scene.add(box);
  }
  if(settings.geometry == 'Sphere'){
    var geometry_2 = helper.createSphere();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: spfVertexShader,
    fragmentShader: spfFragmentShader
    });
    var sphere = new Mesh(geometry_2,material);
    scene.add(sphere);
  }
  if(settings.geometry == 'Knot'){
    var geometry_3 = helper.createKnot();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: spfVertexShader,
    fragmentShader: spfFragmentShader
    });
    var knot = new Mesh(geometry_3,material);
    scene.add(knot);
  }
  if(settings.geometry == 'Bunny'){
    var geometry_4 = helper.createBunny();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture }}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: spfVertexShader,
    fragmentShader: spfFragmentShader
    });
    var bunny = new Mesh(geometry_4,material);
    scene.add(bunny);
  } 
}

function applyEnvironmentMappingShader(){
  if(scene.children[0]!=null){
    scene.children[0].removeFromParent();
  }
  var texture = new THREE.TextureLoader().load('./src/textures/' + settings.texture +'.jpg');
  if(settings.geometry == "Quad"){

    var geometry_1 = new THREE.BufferGeometry();
    var vertices = new Float32Array ( [
      -1.0, -1.0, 0.0,
       1.0, -1.0, 0.0,
       1.0,  1.0, 0.0,

       1.0,  1.0, 0.0,
      -1.0,  1.0, 0.0,
      -1.0, -1.0, 0.0
    ] ); 
    var uv = new Float32Array ( [
       0.0,  0.0,
       1.0,  0.0, 
       1.0,  1.0,

       1.0,  1.0,
       0.0,  1.0,
       0.0,  0.0,
    ] ); 
    geometry_1.setAttribute('position', new THREE.BufferAttribute(vertices,3));
    geometry_1.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    let uniforms = {uTexture: {type: 'sampler2D', value: texture},
                    cameraPosition: {type : 'vec3', value: camera.position}}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: emVertexShader,
    fragmentShader: emFragmentShader
    });
    var quad = new THREE.Mesh(geometry_1,material);
    scene.add(quad);
  }
  if(settings.geometry == 'Box'){
    var geometry = helper.createBox();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture},
                    cameraPosition: {type : 'vec3', value: camera.position}}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: emVertexShader,
    fragmentShader: emFragmentShader
    });
    var box = new Mesh(geometry,material);
    scene.add(box);
  }
  if(settings.geometry == 'Sphere'){
    var geometry_2 = helper.createSphere();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture},
                    cameraPosition: {type : 'vec3', value: camera.position}}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: emVertexShader,
    fragmentShader: emFragmentShader
    });
    var sphere = new Mesh(geometry_2,material);
    scene.add(sphere);
  }
  if(settings.geometry == 'Knot'){
    var geometry_3 = helper.createKnot();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture},
                    cameraPosition: {type : 'vec3', value: camera.position}}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: emVertexShader,
    fragmentShader: emFragmentShader
    });
    var knot = new Mesh(geometry_3,material);
    scene.add(knot);
  }
  if(settings.geometry == 'Bunny'){
    var geometry_4 = helper.createBunny();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture},
                    cameraPosition: {type : 'vec3', value: camera.position},
                    //mmit: {type : 'mat4', value: geometry_4.}
                  }
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: emVertexShader,
    fragmentShader: emFragmentShader
    });
    var bunny = new Mesh(geometry_4,material);
    scene.add(bunny);
  } 
}

function applyBackgroundTexture(){
  var background = new THREE.TextureLoader().load('./src/textures/' + settings.texture +'.jpg');
          background.mapping = THREE.EquirectangularReflectionMapping;
          scene.background = background;
}

function applyNormalMapping(){
  if(scene.children[0]!=null){
    scene.children[0].removeFromParent();
  }
  var texture = new THREE.TextureLoader().load('./src/textures/' + settings.texture +'.jpg');
  var normals = new THREE.TextureLoader().load('./src/textures/' + settings.normalmap +'.jpg');
  if(settings.geometry == "Quad"){

    var geometry_1 = new THREE.BufferGeometry();
    var vertices = new Float32Array ( [
      -1.0, -1.0, 0.0,
       1.0, -1.0, 0.0,
       1.0,  1.0, 0.0,

       1.0,  1.0, 0.0,
      -1.0,  1.0, 0.0,
      -1.0, -1.0, 0.0
    ] ); 
    var uv = new Float32Array ( [
       0.0,  0.0,
       1.0,  0.0, 
       1.0,  1.0,

       1.0,  1.0,
       0.0,  1.0,
       0.0,  0.0,
    ] ); 
    geometry_1.setAttribute('position', new THREE.BufferAttribute(vertices,3));
    geometry_1.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    let uniforms = {uTexture: {type: 'sampler2D', value: texture},
                    normals: {type: 'sampler2D', value: normals},
                    cameraPosition: {type : 'vec3', value: camera.position}}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: nmVertexShader,
    fragmentShader: nmFragmentShader
    });
    var quad = new THREE.Mesh(geometry_1,material);
    scene.add(quad);
  }
  if(settings.geometry == 'Box'){
    var geometry = helper.createBox();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture},
                    normals: {type: 'sampler2D', value: normals},
                    cameraPosition: {type : 'vec3', value: camera.position}}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: nmVertexShader,
    fragmentShader: nmFragmentShader
    });
    var box = new Mesh(geometry,material);
    scene.add(box);
  }
  if(settings.geometry == 'Sphere'){
    var geometry_2 = helper.createSphere();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture},
                    normals: {type: 'sampler2D', value: normals},
                    cameraPosition: {type : 'vec3', value: camera.position}}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: nmVertexShader,
    fragmentShader: nmFragmentShader
    });
    var sphere = new Mesh(geometry_2,material);
    scene.add(sphere);
  }
  if(settings.geometry == 'Knot'){
    var geometry_3 = helper.createKnot();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture},
                    normals: {type: 'sampler2D', value: normals},
                    cameraPosition: {type : 'vec3', value: camera.position}}
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: nmVertexShader,
    fragmentShader: nmFragmentShader
    });
    var knot = new Mesh(geometry_3,material);
    scene.add(knot);
  }
  if(settings.geometry == 'Bunny'){
    var geometry_4 = helper.createBunny();
    let uniforms = {uTexture: {type: 'sampler2D', value: texture},
                    normals: {type: 'sampler2D', value: normals},
                    cameraPosition: {type : 'vec3', value: camera.position},
                    
                  }
    var material = new THREE.RawShaderMaterial( {
    uniforms: uniforms,
    vertexShader: nmVertexShader,
    fragmentShader: nmFragmentShader
    });
    var bunny = new Mesh(geometry_4,material);
    scene.add(bunny);
  } 
}