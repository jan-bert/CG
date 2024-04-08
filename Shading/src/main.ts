// external dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// local from us provided utilities
import RenderWidget from './lib/rendererWidget';
import { Application, createWindow } from './lib/window';
import type * as utils from './lib/utils';

// helper lib, provides exercise dependent prewritten Code
import * as helper from './helper';

// load shaders
import basicVertexShader from './shader/basic.v.glsl?raw';
import basicFragmentShader from './shader/basic.f.glsl?raw';
import normalVertexShader from './shader/normal.v.glsl?raw';
import normalFragmentShader from './shader/normal.f.glsl?raw';
import toonVertexShader from './shader/toon.v.glsl?raw';
import toonFragmentShader from './shader/toon.f.glsl?raw';
import diffuseVertexShader from './shader/diffuse.v.glsl?raw';
import diffuseFragmentShader from './shader/diffuse.f.glsl?raw';
import gouraudVertexShader from './shader/gouraud.v.glsl?raw';
import gouraudFragmentShader from './shader/gouraud.f.glsl?raw';
import PhongVertexShader from './shader/phong.v.glsl?raw';
import PhongFragmentShader from './shader/phong.f.glsl?raw';

// defines callback that should get called whenever the
// params of the settings get changed (eg. via GUI)
var scene = new THREE.Scene();
//var material2 : THREE.RawShaderMaterial;
var settings = new helper.Settings();
var camera = new THREE.PerspectiveCamera();
helper.setupCamera(camera, scene);
helper.createGUI(settings);
// adds the callback that gets called on params change
settings.addCallback(callback);

var { model0, model1, model2, model3 } = helper.setupGeometry(scene);
//material2 = material;
var lightgeo = new THREE.SphereGeometry(0.1, 32, 32);
var lightMaterial = new THREE.MeshBasicMaterial({color: 0xff8010});
var light = new THREE.Mesh(lightgeo, lightMaterial);
light.position.set(settings.lightX,settings.lightY,settings.lightZ);
scene.add(light);

function callback(changed: utils.KeyValuePair<helper.Settings>) {
  if(changed.key == 'ambient_color'){
    if(settings.shader == 'Ambient'){
      let uniforms = {color_v: {type: 'vec3', value: new THREE.Vector3((settings.ambient_color[0] * settings.ambient_reflectance /255),(settings.ambient_color[1] * settings.ambient_reflectance /255),(settings.ambient_color[2] * settings.ambient_reflectance/255))}}
      var material = new THREE.RawShaderMaterial( {
      uniforms: uniforms,
      vertexShader: basicVertexShader,
      fragmentShader: basicFragmentShader
      });
      model0.material = material; 
      model1.material = material; 
      model2.material = material; 
      model3.material = material; 
    }
    else if (settings.shader == 'Phong'){
      applyPhongshader(light.position,camera.position);
    }
  }

  else if(changed.key == 'ambient_reflectance'){
    if(settings.shader == 'Ambient'){
      let uniforms = {color_v: {type: 'vec3', value: new THREE.Vector3((settings.ambient_color[0] * settings.ambient_reflectance /255),(settings.ambient_color[1] * settings.ambient_reflectance /255),(settings.ambient_color[2] * settings.ambient_reflectance/255))}}
      var material = new THREE.RawShaderMaterial( {
      uniforms: uniforms,
      vertexShader: basicVertexShader,
      fragmentShader: basicFragmentShader
      });
      model0.material = material; 
      model1.material = material; 
      model2.material = material; 
      model3.material = material; 
    }
    else if (settings.shader == 'Phong'){
      applyPhongshader(light.position, camera.position);
    }
  }
  else if(changed.key == 'lightX'){
    light.position.setX(settings.lightX);
    if(settings.shader == 'Lambert'){
    applylambertshader(light.position);
    }
    if(settings.shader == 'Phong'){
      applyPhongshader(camera.position, light.position);
    }
  }
  else if(changed.key == 'lightY'){
    light.position.setY(settings.lightY);
    if(settings.shader == 'Lambert'){
      applylambertshader(light.position);
    }
    if(settings.shader == 'Phong'){
      applyPhongshader(camera.position, light.position);
    }
  }
  else if(changed.key == 'lightZ'){
    light.position.setZ(settings.lightZ);
    if(settings.shader == 'Lambert'){
      applylambertshader(light.position);
    }
    if(settings.shader == 'Phong'){
      applyPhongshader(camera.position, light.position);
    }
  }

  else if (changed.key == 'diffuse_color'){
    if (settings.shader == 'Lambert'){
      applylambertshader(light.position);
    }
    else if (settings.shader == 'Phong'){
      applyPhongshader(light.position, camera.position);
    }
  }
  else if (changed.key == 'diffuse_reflectance'){
    if (settings.shader == 'Lambert'){
      applylambertshader(light.position);
    }
    else if (settings.shader == 'Phong'){
      applyPhongshader(light.position, camera.position);
    }
  }
  else if (changed.key == 'specular_reflectance'){
    if(settings.shader == 'Gouraud'){
      applygouraudshader(light.position, camera.position);
    }
    else if(settings.shader == 'Phong'){
      applyPhongshader(light.position, camera.position);
    }
  }
  else if (changed.key == 'specular_color'){
    if(settings.shader == 'Gouraud'){
      applygouraudshader(light.position, camera.position);
    }
    else if(settings.shader == 'Phong'){
      applyPhongshader(light.position, camera.position);
    }
  }
  else if (changed.key == 'magnitude'){
    if(settings.shader == 'Gouraud'){
      applygouraudshader(light.position, camera.position);
    }
    else if(settings.shader == 'Phong'){
      applyPhongshader(light.position, camera.position);
    }
  }

  else if(changed.key == 'shader'){
    //console.log(settings.shader);
    if(settings.shader == 'Basic'){
      let uniforms = {color_v: {type: 'vec3', value: new THREE.Vector3((0),(0),(0))}}
      var material = new THREE.RawShaderMaterial( {
      uniforms: uniforms,
      vertexShader: basicVertexShader,
      fragmentShader: basicFragmentShader
      });
      //material2 = material;
      model0.material = material; 
      model1.material = material; 
      model2.material = material; 
      model3.material = material; 
    }
    if(settings.shader == 'Ambient'){
      let uniforms = {color_v: {type: 'vec3', value: new THREE.Vector3((settings.ambient_color[0] * settings.ambient_reflectance /255),(settings.ambient_color[1] * settings.ambient_reflectance /255),(settings.ambient_color[2] * settings.ambient_reflectance/255))}}
      var material = new THREE.RawShaderMaterial( {
      uniforms: uniforms,
      vertexShader: basicVertexShader,
      fragmentShader: basicFragmentShader
      });
      //material2 = material;
      model0.material = material; 
      model1.material = material; 
      model2.material = material; 
      model3.material = material; 
    }
    else if(settings.shader == 'Normal'){
      let uniforms0 = {projectionMatrixInverse: {type : 'mat4', value: model0.matrixWorld.invert().transpose()}}
      var material0 = new THREE.RawShaderMaterial( {
        uniforms: uniforms0,
       vertexShader: normalVertexShader,
       fragmentShader: normalFragmentShader,
      });

      let uniforms1 = {projectionMatrixInverse: {type : 'mat4', value: model1.matrixWorld.invert().transpose()}}
      var material1 = new THREE.RawShaderMaterial( {
        uniforms: uniforms1,
       vertexShader: normalVertexShader,
       fragmentShader: normalFragmentShader,
      });

      let uniforms = {projectionMatrixInverse: {type : 'mat4', value: model2.matrixWorld.identity()}}
      var material = new THREE.RawShaderMaterial( {
        uniforms: uniforms,
       vertexShader: normalVertexShader,
       fragmentShader: normalFragmentShader,
      });

      let uniforms3 = {projectionMatrixInverse: {type : 'mat4', value: model3.matrixWorld.invert().transpose()}}
      var material3 = new THREE.RawShaderMaterial( {
        uniforms: uniforms3,
       vertexShader: normalVertexShader,
       fragmentShader: normalFragmentShader,
      });

      model0.material = material0; 
      model1.material = material1; 
      model2.material = material; 
      model3.material = material3; 
    }

    else if(settings.shader == 'Toon'){
      camera.updateMatrix();
      camera.updateMatrixWorld();
      applytoonshader(camera.position);
    }

    else if(settings.shader == 'Lambert'){

      applylambertshader(light.position);
    }
    else if(settings.shader == 'Gouraud'){
      applygouraudshader(light.position, camera.position);
    }
    else if(settings.shader == 'Phong'){
      applyPhongshader(light.position, camera.position);
    }
  }
}

// feel free to declar certain variables outside the main function to change them somewhere else
// e.g. settings, light or material
function main(){
  // setup/layout root Application.
  // Its the body HTMLElement with some additional functions.
  // More complex layouts are possible too.
  var root = Application("Shader");
	root.setLayout([["renderer"]]);
  root.setLayoutColumns(["100%"]);
  root.setLayoutRows(["100%"]);

  // ---------------------------------------------------------------------------
  // create Settings and create GUI settings
  

  // ---------------------------------------------------------------------------
  // create RenderDiv
	var rendererDiv = createWindow("renderer");
  root.appendChild(rendererDiv);

  // create renderer
  var renderer = new THREE.WebGLRenderer({
      antialias: true,  // to enable anti-alias and get smoother output
  });


  // add light proxy
  
  // create camera
  var camera = new THREE.PerspectiveCamera();
  helper.setupCamera(camera, scene);

  // create controls
  var controls = new OrbitControls(camera, rendererDiv);
  helper.setupControls(controls);

  controls.addEventListener('change', ( ) => {
    if(settings.shader == 'Toon'){
      camera.updateMatrix();
      camera.updateMatrixWorld();
      applytoonshader(camera.position);
    }
    if(settings.shader == 'Gouraud'){
      camera.updateMatrix();
      camera.updateMatrixWorld();
      applygouraudshader(light.position, camera.position);
    }
    if(settings.shader == 'Phong'){
      camera.updateMatrix();
      camera.updateMatrixWorld();
      applyPhongshader(light.position, camera.position);
    }
  });
  

  // fill the renderDiv. In RenderWidget happens all the magic.
  // It handles resizes, adds the fps widget and most important defines the main animate loop.
  // You dont need to touch this, but if feel free to overwrite RenderWidget.animate
  var wid = new RenderWidget(rendererDiv, renderer, camera, scene, controls);
  // start the draw loop (this call is async)
  wid.animate();
}

// call main entrypoint
main();


function applytoonshader(camerapos: THREE.Vector3){
  let uniforms0 = {projectionMatrixInverse: {type : 'mat4', value: model0.matrixWorld.invert().transpose()},
                   cameraPosition: {type : 'vec3', value: camerapos}}
  var material0 = new THREE.RawShaderMaterial( {
  uniforms: uniforms0,
  vertexShader: toonVertexShader,
  fragmentShader: toonFragmentShader,
  });

  let uniforms1 = {projectionMatrixInverse: {type : 'mat4', value: model1.matrixWorld.invert().transpose()},
                  cameraPosition: {type : 'vec3', value: camerapos}}
  var material1 = new THREE.RawShaderMaterial( {
  uniforms: uniforms1,
  vertexShader: toonVertexShader,
  fragmentShader: toonFragmentShader,
  });

  let uniforms = {projectionMatrixInverse: {type : 'mat4', value: model2.matrixWorld.identity()},
                  cameraPosition: {type : 'vec3', value: camerapos}}
  var material = new THREE.RawShaderMaterial( {
  uniforms: uniforms,
  vertexShader: toonVertexShader,
  fragmentShader: toonFragmentShader,
  });

  let uniforms3 = {projectionMatrixInverse: {type : 'mat4', value: model3.matrixWorld.invert().transpose()},
  cameraPosition: {type : 'vec3', value: camerapos}}
  var material3 = new THREE.RawShaderMaterial( {
  uniforms: uniforms3,
  vertexShader: toonVertexShader,
  fragmentShader: toonFragmentShader,
  });
  //console.log(material0);
  model0.material = material0; 
  model1.material = material1; 
  model2.material = material; 
  model3.material = material3; 
}

function applylambertshader(lightpos: THREE.Vector3){
  //console.log('innen')
  //console.log(lightpos);
  let uniforms0 = {projectionMatrixInverse: {type : 'mat4', value: model0.matrixWorld.invert().transpose()},
                   lightPosition: {type : 'vec3', value: lightpos},
                   color_v: {type: 'vec3', value: new THREE.Vector3((settings.diffuse_color[0] * settings.diffuse_reflectance /255),(settings.diffuse_color[1] * settings.diffuse_reflectance/255),(settings.diffuse_color[2] * settings.diffuse_reflectance /255))}
                  }
  var material0 = new THREE.RawShaderMaterial( {
  uniforms: uniforms0,
  vertexShader: diffuseVertexShader,
  fragmentShader: diffuseFragmentShader,
  });

  let uniforms1 = {projectionMatrixInverse: {type : 'mat4', value: model1.matrixWorld.invert().transpose()},
                  lightPosition: {type : 'vec3', value: lightpos},
                  color_v: {type: 'vec3', value: new THREE.Vector3((settings.diffuse_color[0] * settings.diffuse_reflectance * 1 /255),(settings.diffuse_color[1] * settings.diffuse_reflectance /255),(settings.diffuse_color[2] * settings.diffuse_reflectance /255))}
                }
  var material1 = new THREE.RawShaderMaterial( {
  uniforms: uniforms1,
  vertexShader: diffuseVertexShader,
  fragmentShader: diffuseFragmentShader,
  });

  let uniforms = {projectionMatrixInverse: {type : 'mat4', value: model2.matrixWorld.identity()},
                  lightPosition: {type : 'vec3', value: lightpos},
                  color_v: {type: 'vec3', value: new THREE.Vector3((settings.diffuse_color[0] * settings.diffuse_reflectance * 1 /255),(settings.diffuse_color[1] * settings.diffuse_reflectance /255),(settings.diffuse_color[2] * settings.diffuse_reflectance /255))}
                }
  var material = new THREE.RawShaderMaterial( {
  uniforms: uniforms,
  vertexShader: diffuseVertexShader,
  fragmentShader: diffuseFragmentShader,
  });

  let uniforms3 = {projectionMatrixInverse: {type : 'mat4', value: model3.matrixWorld.invert().transpose()},
                   lightPosition: {type : 'vec3', value: lightpos},
                   color_v: {type: 'vec3', value: new THREE.Vector3((settings.diffuse_color[0] * settings.diffuse_reflectance * 1 /255),(settings.diffuse_color[1] * settings.diffuse_reflectance /255),(settings.diffuse_color[2] * settings.diffuse_reflectance  /255))}
                  }
  var material3 = new THREE.RawShaderMaterial( {
  uniforms: uniforms3,
  vertexShader: diffuseVertexShader,
  fragmentShader: diffuseFragmentShader,
  });
  //console.log(material0);
  model0.material = material0; 
  model1.material = material1; 
  model2.material = material; 
  model3.material = material3; 
}
function applygouraudshader(lightpos: THREE.Vector3, camerapos: THREE.Vector3 ){
  //console.log('innen')
  //console.log(lightpos);
  let uniforms0 = {projectionMatrixInverse: {type : 'mat4', value: model0.matrixWorld.invert().transpose()},
                   lightPosition: {type : 'vec3', value: lightpos},
                   cameraPosition: {type : 'vec3', value: camerapos},
                   color_d: {type: 'vec3', value: new THREE.Vector3((settings.diffuse_color[0] * settings.diffuse_reflectance/255),(settings.diffuse_color[1] * settings.diffuse_reflectance/255),(settings.diffuse_color[2] * settings.diffuse_reflectance/255))},
                   color_a: {type: 'vec3', value: new THREE.Vector3((settings.ambient_color[0] * settings.ambient_reflectance /255),(settings.ambient_color[1] * settings.ambient_reflectance /255),(settings.ambient_color[2] * settings.ambient_reflectance/255))},
                   color_s: {type: 'vec3', value: new THREE.Vector3((settings.specular_color[0] * settings.specular_reflectance /255),(settings.specular_color[1] * settings.specular_reflectance /255),(settings.specular_color[2] * settings.specular_reflectance/255))},
                   magnitude: {type : 'float', value: settings.magnitude}
                  }
  var material0 = new THREE.RawShaderMaterial( {
  uniforms: uniforms0,
  vertexShader: gouraudVertexShader,
  fragmentShader: gouraudFragmentShader,
  });

  let uniforms1 = {projectionMatrixInverse: {type : 'mat4', value: model1.matrixWorld.invert().transpose()},
                  lightPosition: {type : 'vec3', value: lightpos},
                  cameraPosition: {type : 'vec3', value: camerapos},
                  color_d: {type: 'vec3', value: new THREE.Vector3((settings.diffuse_color[0] * settings.diffuse_reflectance/255),(settings.diffuse_color[1] * settings.diffuse_reflectance/255),(settings.diffuse_color[2] * settings.diffuse_reflectance/255))},
                  color_a: {type: 'vec3', value: new THREE.Vector3((settings.ambient_color[0] * settings.ambient_reflectance /255),(settings.ambient_color[1] * settings.ambient_reflectance /255),(settings.ambient_color[2] * settings.ambient_reflectance/255))},
                  color_s: {type: 'vec3', value: new THREE.Vector3((settings.specular_color[0] * settings.specular_reflectance /255),(settings.specular_color[1] * settings.specular_reflectance /255),(settings.specular_color[2] * settings.specular_reflectance/255))},
                  magnitude: {type : 'float', value: settings.magnitude}
                }
  var material1 = new THREE.RawShaderMaterial( {
  uniforms: uniforms1,
  vertexShader: gouraudVertexShader,
  fragmentShader: gouraudFragmentShader,
  });

  let uniforms = {projectionMatrixInverse: {type : 'mat4', value: model2.matrixWorld.identity()},
                  lightPosition: {type : 'vec3', value: lightpos},
                  cameraPosition: {type : 'vec3', value: camerapos},
                  color_d: {type: 'vec3', value: new THREE.Vector3((settings.diffuse_color[0] * settings.diffuse_reflectance/255),(settings.diffuse_color[1] * settings.diffuse_reflectance/255),(settings.diffuse_color[2] * settings.diffuse_reflectance/255))},
                  color_a: {type: 'vec3', value: new THREE.Vector3((settings.ambient_color[0] * settings.ambient_reflectance /255),(settings.ambient_color[1] * settings.ambient_reflectance /255),(settings.ambient_color[2] * settings.ambient_reflectance/255))},
                  color_s: {type: 'vec3', value: new THREE.Vector3((settings.specular_color[0] * settings.specular_reflectance /255),(settings.specular_color[1] * settings.specular_reflectance /255),(settings.specular_color[2] * settings.specular_reflectance/255))},
                  magnitude: {type : 'float', value: settings.magnitude}
                  }
  var material = new THREE.RawShaderMaterial( {
  uniforms: uniforms,
  vertexShader: gouraudVertexShader,
  fragmentShader: gouraudFragmentShader,
  });

  let uniforms3 = {projectionMatrixInverse: {type : 'mat4', value: model3.matrixWorld.invert().transpose()},
                   lightPosition: {type : 'vec3', value: lightpos},
                   cameraPosition: {type : 'vec3', value: camerapos},
                   color_d: {type: 'vec3', value: new THREE.Vector3((settings.diffuse_color[0] * settings.diffuse_reflectance/255),(settings.diffuse_color[1] * settings.diffuse_reflectance/255),(settings.diffuse_color[2] * settings.diffuse_reflectance/255))},
                   color_a: {type: 'vec3', value: new THREE.Vector3((settings.ambient_color[0] * settings.ambient_reflectance /255),(settings.ambient_color[1] * settings.ambient_reflectance /255),(settings.ambient_color[2] * settings.ambient_reflectance/255))},
                   color_s: {type: 'vec3', value: new THREE.Vector3((settings.specular_color[0] * settings.specular_reflectance /255),(settings.specular_color[1] * settings.specular_reflectance /255),(settings.specular_color[2] * settings.specular_reflectance/255))},
                   magnitude: {type : 'float', value: settings.magnitude}
                  }
  var material3 = new THREE.RawShaderMaterial( {
  uniforms: uniforms3,
  vertexShader: gouraudVertexShader,
  fragmentShader: gouraudFragmentShader,
  });
  //console.log(material0);
  model0.material = material0; 
  model1.material = material1; 
  model2.material = material; 
  model3.material = material3; 
}

function applyPhongshader(lightpos: THREE.Vector3, camerapos: THREE.Vector3 ){
  //console.log('innen')
  //console.log(lightpos);
  let uniforms0 = {projectionMatrixInverse: {type : 'mat4', value: model0.matrixWorld.invert().transpose()},
                   lightPosition: {type : 'vec3', value: lightpos},
                   cameraPosition: {type : 'vec3', value: camerapos},
                   color_d: {type: 'vec3', value: new THREE.Vector3((settings.diffuse_color[0] * settings.diffuse_reflectance/255),(settings.diffuse_color[1] * settings.diffuse_reflectance/255),(settings.diffuse_color[2] * settings.diffuse_reflectance/255))},
                   color_a: {type: 'vec3', value: new THREE.Vector3((settings.ambient_color[0] * settings.ambient_reflectance /255),(settings.ambient_color[1] * settings.ambient_reflectance /255),(settings.ambient_color[2] * settings.ambient_reflectance/255))},
                   color_s: {type: 'vec3', value: new THREE.Vector3((settings.specular_color[0] * settings.specular_reflectance /255),(settings.specular_color[1] * settings.specular_reflectance /255),(settings.specular_color[2] * settings.specular_reflectance/255))},
                   magnitude: {type : 'float', value: settings.magnitude}
                  }
  var material0 = new THREE.RawShaderMaterial( {
  uniforms: uniforms0,
  vertexShader: PhongVertexShader,
  fragmentShader: PhongFragmentShader,
  });

  let uniforms1 = {projectionMatrixInverse: {type : 'mat4', value: model1.matrixWorld.invert().transpose()},
                  lightPosition: {type : 'vec3', value: lightpos},
                  cameraPosition: {type : 'vec3', value: camerapos},
                  color_d: {type: 'vec3', value: new THREE.Vector3((settings.diffuse_color[0] * settings.diffuse_reflectance/255),(settings.diffuse_color[1] * settings.diffuse_reflectance/255),(settings.diffuse_color[2] * settings.diffuse_reflectance/255))},
                  color_a: {type: 'vec3', value: new THREE.Vector3((settings.ambient_color[0] * settings.ambient_reflectance /255),(settings.ambient_color[1] * settings.ambient_reflectance /255),(settings.ambient_color[2] * settings.ambient_reflectance/255))},
                  color_s: {type: 'vec3', value: new THREE.Vector3((settings.specular_color[0] * settings.specular_reflectance /255),(settings.specular_color[1] * settings.specular_reflectance /255),(settings.specular_color[2] * settings.specular_reflectance/255))},
                  magnitude: {type : 'float', value: settings.magnitude}
                }
  var material1 = new THREE.RawShaderMaterial( {
  uniforms: uniforms1,
  vertexShader: PhongVertexShader,
  fragmentShader: PhongFragmentShader,
  });

  let uniforms = {projectionMatrixInverse: {type : 'mat4', value: model2.matrixWorld.identity()},
                  lightPosition: {type : 'vec3', value: lightpos},
                  cameraPosition: {type : 'vec3', value: camerapos},
                  color_d: {type: 'vec3', value: new THREE.Vector3((settings.diffuse_color[0] * settings.diffuse_reflectance/255),(settings.diffuse_color[1] * settings.diffuse_reflectance/255),(settings.diffuse_color[2] * settings.diffuse_reflectance/255))},
                  color_a: {type: 'vec3', value: new THREE.Vector3((settings.ambient_color[0] * settings.ambient_reflectance /255),(settings.ambient_color[1] * settings.ambient_reflectance /255),(settings.ambient_color[2] * settings.ambient_reflectance/255))},
                  color_s: {type: 'vec3', value: new THREE.Vector3((settings.specular_color[0] * settings.specular_reflectance /255),(settings.specular_color[1] * settings.specular_reflectance /255),(settings.specular_color[2] * settings.specular_reflectance/255))},
                  magnitude: {type : 'float', value: settings.magnitude}
                  }
  var material = new THREE.RawShaderMaterial( {
  uniforms: uniforms,
  vertexShader: PhongVertexShader,
  fragmentShader: PhongFragmentShader,
  });

  let uniforms3 = {projectionMatrixInverse: {type : 'mat4', value: model3.matrixWorld.invert().transpose()},
                   lightPosition: {type : 'vec3', value: lightpos},
                   cameraPosition: {type : 'vec3', value: camerapos},
                   color_d: {type: 'vec3', value: new THREE.Vector3((settings.diffuse_color[0] * settings.diffuse_reflectance/255),(settings.diffuse_color[1] * settings.diffuse_reflectance/255),(settings.diffuse_color[2] * settings.diffuse_reflectance/255))},
                   color_a: {type: 'vec3', value: new THREE.Vector3((settings.ambient_color[0] * settings.ambient_reflectance /255),(settings.ambient_color[1] * settings.ambient_reflectance /255),(settings.ambient_color[2] * settings.ambient_reflectance/255))},
                   color_s: {type: 'vec3', value: new THREE.Vector3((settings.specular_color[0] * settings.specular_reflectance /255),(settings.specular_color[1] * settings.specular_reflectance /255),(settings.specular_color[2] * settings.specular_reflectance/255))},
                   magnitude: {type : 'float', value: settings.magnitude}
                  }
  var material3 = new THREE.RawShaderMaterial( {
  uniforms: uniforms3,
  vertexShader: PhongVertexShader,
  fragmentShader: PhongFragmentShader,
  });
  //console.log(material0);
  model0.material = material0; 
  model1.material = material1; 
  model2.material = material; 
  model3.material = material3; 
}