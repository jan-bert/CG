// external dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import RenderWidget from './lib/rendererWidget';
import { Application, createWindow, Window } from './lib/window';

import * as helper from './helper';
// put your imports here

/*******************************************************************************
 * Main entrypoint. Previouly declared functions get managed/called here.
 * Start here with programming.
 ******************************************************************************/

var camera: THREE.PerspectiveCamera;
var controls: OrbitControls;
var rendererDiv: Window;


function main(){
    var root = Application("Robot");
  	root.setLayout([["renderer"]]);
    root.setLayoutColumns(["100%"]);
    root.setLayoutRows(["100%"]);

    // ---------------------------------------------------------------------------
    // create RenderDiv
    rendererDiv = createWindow("renderer");
    root.appendChild(rendererDiv);

    // create renderer
    var renderer = new THREE.WebGLRenderer({
        antialias: true,  // to enable anti-alias and get smoother output
    });

    // important exercise specific limitation, do not remove this line
    THREE.Object3D.DefaultMatrixAutoUpdate = false;

    // create scene
    var scene = new THREE.Scene();
    var robot = new THREE.Object3D();
    robot.name = "robot"
    scene.add(robot);
    
    helper.setupRobot(robot);
    
    // manually set matrixWorld
    scene.matrixWorld.copy(scene.matrix);

    helper.setupLight(scene);

    // create camera
    camera = new THREE.PerspectiveCamera();
  
    helper.setupCamera(camera, scene);

    // create controls
    controls = new OrbitControls(camera, rendererDiv);
    helper.setupControls(controls);

    // start the animation loop (async)
    var wid = new RenderWidget(rendererDiv, renderer, camera, scene, controls);
    wid.animate();

    var activ = robot;
    var show = false;
    var axes = new THREE.AxesHelper;
    var sib = 0;
    document.addEventListener("keydown", (event) => {
      if(event.isComposing || event.keyCode === 87){
        if(activ.parent != null && activ != robot){
        helper.isnotActiv(activ,robot);
        activ = activ.parent
        helper.isActiv(activ, robot);
        if(show){
          
          axes.removeFromParent();
          if(activ != robot){
          axes = helper.showAxes(activ);
          }
        }
        }
        if(activ == robot.getObjectByName("body")){
          sib = 0;
        }
        
      }
      if (event.isComposing || event.keyCode === 83){
        if(activ.children[0] != null && (activ == robot.getObjectByName("body") || activ == robot.getObjectByName("legleft") || activ == robot.getObjectByName("legright"))){
        helper.isnotActiv(activ,robot);
        activ = activ.children[0];
        helper.isActiv(activ,robot);
        if(show){
          axes.removeFromParent();
          axes = helper.showAxes(activ);
        }
        }
        if(activ == robot){
          helper.isnotActiv(activ,robot);
        activ = activ.children[0];
        helper.isActiv(activ,robot);
        }
       
      }
      if (event.isComposing || event.keyCode === 65){
        
        if(sib <= 4 && sib > 0 && activ.parent == robot.getObjectByName("body")){
          sib--;
          helper.isnotActiv(activ,robot);
          activ = activ.parent.children[sib];
          helper.isActiv(activ,robot);
          if(show){
            axes.removeFromParent();
            axes = helper.showAxes(activ);
          }
          
        }
        
      }

      if (event.isComposing || event.keyCode === 68){
        
        if(sib < 4  && sib >= 0 && activ.parent == robot.getObjectByName("body")){
          sib++;
          helper.isnotActiv(activ,robot);
          activ = activ.parent.children[sib];
          helper.isActiv(activ,robot);
          if(show){
            axes.removeFromParent();
            axes = helper.showAxes(activ);
          }
          
        }
        
      }
      if(event.isComposing || event.keyCode === 67){
        if(activ != robot){
          if(!show){
            axes = helper.showAxes(activ);
          }
        if(show){
          axes.removeFromParent();
        }
        show = !show;
        }
      }
      if(event.isComposing || event.keyCode === 38){
        if(activ != robot){
          helper.rotate(activ);
        }
      }

      if(event.isComposing || event.keyCode === 82){
        helper.resetrobot(robot.children[0], robot)
        axes.removeFromParent()
        show = false
      }



    });
    
}
// call main entrypoint
main();
