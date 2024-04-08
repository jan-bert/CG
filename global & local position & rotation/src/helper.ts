import * as THREE from 'three';

import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function setupLight(scene: THREE.Scene){
  // add two point lights and a basic ambient light
  // https://threejs.org/docs/#api/lights/PointLight
  var light = new THREE.PointLight(0xffffcc, 1, 100);
  light.position.set( 10, 30, 15 );
  light.matrixAutoUpdate = true;
  scene.add(light);

  var light2 = new THREE.PointLight(0xffffcc, 1, 100);
  light2.position.set( 10, -30, -15 );
  light2.matrixAutoUpdate = true;
  scene.add(light2);

  //https://threejs.org/docs/#api/en/lights/AmbientLight
  scene.add(new THREE.AmbientLight(0x999999));
  return scene;
};



export function setupRobot(robot: THREE.Object3D){
  var geometry = new THREE.BoxGeometry( 0.26, 0.4, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
    var bodymesh = new THREE.Mesh( geometry, material );
    var body = new THREE.Object3D;
    robot.add(body);
    let matrix = new THREE.Matrix4;
    body.name ="body";
    
    body.matrix.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );

    var geometry2 = new THREE.SphereGeometry(0.12);
    var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
    var headmesh = new THREE.Mesh( geometry2, material );
    var head = new THREE.Object3D;
    body.add(head);
    headmesh.name="headmesh";
    head.name="head";

    head.matrix.set(
      1, 0, 0, 0,
      0, 1, 0, 0.33,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );
    head.add(headmesh)
    headmesh.matrix.set
    (
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );
   
    updateMatrix(head)
    updateMatrix(headmesh)
    
    var geometry = new THREE.BoxGeometry( 0.3, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
    var armleftmesh = new THREE.Mesh( geometry, material);
    var armleft = new THREE.Object3D
    //console.log(armleft.matrixWorld)
    armleft.add(armleftmesh)
    body.add(armleft);
    armleft.name = "armleft";
    armleftmesh.name = "armleftmesh"
  
    armleft.matrix.set(
      1, 0, 0, -0.15,
      0, 1, 0, 0.15,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    //console.log(armleftmesh.matrixWorld)
    matrix.set(
      1, 0, 0, -0.15,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );
    

    armleftmesh.matrix.multiply(matrix)
    //console.log(armleftmesh.matrixWorld)
    updateMatrix(armleft)
    updateMatrix(armleftmesh)
    //console.log(armleft.matrixWorld)

   
    var geometry = new THREE.BoxGeometry( 0.3, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
    var armrightmesh = new THREE.Mesh( geometry, material);
    var armright = new THREE.Object3D;
    body.add(armright);
    armright.add(armrightmesh)
    armright.name="armright";
    armright.matrix.set(
      1, 0, 0, 0.15,
      0, 1, 0, 0.15,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    armrightmesh.matrix.set(
      1, 0, 0, 0.15,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );
    
    updateMatrix(armright)
    updateMatrix(armrightmesh) 

    var geometry = new THREE.BoxGeometry( 0.1, 0.3, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
    var legleftmesh = new THREE.Mesh( geometry, material);
    var legleft = new THREE.Object3D;
    body.add(legleft);
    
    legleft.name = "legleft";
    legleft.matrix.set(
      1, 0, 0, -0.08,
      0, 1, 0, -0.21,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );
   
  
    updateMatrix(legleft)
    
    
    var geometry = new THREE.BoxGeometry( 0.1, 0.3, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
    var legrightmesh = new THREE.Mesh( geometry, material);
    var legright = new THREE.Object3D;
    body.add(legright);
    
    legright.name = "legright";

    legright.matrix.set(
      1, 0, 0, 0.08,
      0, 1, 0, -0.21,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );
    
    updateMatrix(legright)

    var geometry = new THREE.BoxGeometry( 0.1, 0.03, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
    var footleftmesh = new THREE.Mesh( geometry, material);
    var footleft = new THREE.Object3D;
    legleft.add(footleft);
    footleft.add(footleftmesh);
    footleft.name = "footleft";
    footleft.matrix.set(
      1, 0, 0, 0,
      0, 1, 0, -0.28,
      0, 0, 1, 0.06,
      0, 0, 0, 1,
    );
    footleftmesh.matrix.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0.05,
      0, 0, 0, 1,
    );
    //console.log("footleft")
    //console.log(footleft.matrix)
    //console.log("footleft mesh")
    //console.log(footleftmesh.matrix)
    updateMatrix(footleft)
    updateMatrix(footleftmesh)
      
    var geometry = new THREE.BoxGeometry( 0.1, 0.03, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
    var footrightmesh = new THREE.Mesh( geometry, material);
    var footright = new THREE.Object3D;
    footright.add(footrightmesh);
    footright.name = "footright";
    footright.matrix.set(
      1, 0, 0, 0,
      0, 1, 0, -0.28,
      0, 0, 1, 0.06,
      0, 0, 0, 1,
    );
    footrightmesh.matrix.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0.05,
      0, 0, 0, 1,
    );

    legright.add(footright);
    updateMatrix(footright)
    updateMatrix(footrightmesh) 

    legleft.add(legleftmesh)
    
    legleftmesh.matrix.set(
      1, 0, 0, 0,
      0, 1, 0, -0.15,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );
    updateMatrix(legleftmesh)

    legright.add(legrightmesh);
    legrightmesh.matrix.set(
      1, 0, 0, 0,
      0, 1, 0, -0.15,
      0, 0, 1, 0,
      0, 0, 0, 1,
    );
    updateMatrix(legrightmesh)

    body.add(bodymesh);
  };
export function isActiv(activ: THREE.Object3D, robot: THREE.Object3D){
  if(activ == robot.getObjectByName("body")){
    
    var geometry = new THREE.BoxGeometry( 0.26, 0.4, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00  } );
    var body = new THREE.Mesh( geometry, material );
    body.matrixWorld.copy(activ.children[5].matrixWorld);
    body.matrix.copy(activ.children[5].matrix);
    activ.children[5].removeFromParent() 
    activ.add(body)
  }
  if(activ == robot.getObjectByName("head")){
    var geometry2 = new THREE.SphereGeometry(0.12);
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00  } );
    var head = new THREE.Mesh( geometry2, material );
    head.matrixWorld.copy(activ.children[0].matrixWorld);
    head.matrix.copy(activ.children[0].matrix);
    activ.children[0].removeFromParent()
    activ.add(head)
  }
  if(activ == robot.getObjectByName("armleft")){
    var geometry = new THREE.BoxGeometry( 0.3, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00  } );
    var armleft = new THREE.Mesh( geometry, material);
    armleft.matrixWorld.copy(activ.children[0].matrixWorld);
    armleft.matrix.copy(activ.children[0].matrix);
    activ.children[0].removeFromParent()
    activ.add(armleft)
  }
  if(activ == robot.getObjectByName("armright")){
    var geometry = new THREE.BoxGeometry( 0.3, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00  } );
    var armright = new THREE.Mesh( geometry, material);

    armright.matrixWorld.copy(activ.children[0].matrixWorld);
    armright.matrix.copy(activ.children[0].matrix);
    activ.children[0].removeFromParent()
    activ.add(armright)
  }
  if(activ == robot.getObjectByName("legleft")){
  var geometry = new THREE.BoxGeometry( 0.1, 0.3, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00  } );
    var legleft = new THREE.Mesh( geometry, material);

    legleft.matrixWorld.copy(activ.children[1].matrixWorld);
    legleft.matrix.copy(activ.children[1].matrix);
    activ.children[1].removeFromParent()
    activ.add(legleft)
  }
  if(activ == robot.getObjectByName("legright")){
    var geometry = new THREE.BoxGeometry( 0.1, 0.3, 0.1);
      var material = new THREE.MeshBasicMaterial( { color: 0xffff00  } );
      var legleft = new THREE.Mesh( geometry, material);
  
      legleft.matrixWorld.copy(activ.children[1].matrixWorld);
      legleft.matrix.copy(activ.children[1].matrix);
      activ.children[1].removeFromParent()
      activ.add(legleft)
    }
  if(activ ==robot.getObjectByName("footleft")){
    var geometry = new THREE.BoxGeometry( 0.1, 0.03, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00  } );
    var footleft = new THREE.Mesh( geometry, material);
    
    footleft.matrixWorld.copy(activ.children[0].matrixWorld);
    footleft.matrix.copy(activ.children[0].matrix);
    activ.children[0].removeFromParent()
    activ.add(footleft)
  }
  if(activ ==robot.getObjectByName("footright")){
    var geometry = new THREE.BoxGeometry( 0.1, 0.03, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00  } );
    var footleft = new THREE.Mesh( geometry, material);

    footleft.matrixWorld.copy(activ.children[0].matrixWorld);
    footleft.matrix.copy(activ.children[0].matrix);
    activ.children[0].removeFromParent()
    activ.add(footleft)
  }
};

export function isnotActiv(activ: THREE.Object3D, robot: THREE.Object3D){

  if(activ == robot.getObjectByName("body")){
    var geometry = new THREE.BoxGeometry( 0.26, 0.4, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
    var body = new THREE.Mesh( geometry, material );
  
    body.matrixWorld.copy(activ.children[5].matrixWorld)
    body.matrix.copy(activ.children[5].matrix)
    activ.children[5].removeFromParent()
    activ.add(body)
    //console.log(activ.matrixWorld);
  }
  if(activ == robot.getObjectByName("head")){
    var geometry2 = new THREE.SphereGeometry(0.12);
    var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
    var head = new THREE.Mesh( geometry2, material );
    
    head.matrixWorld.copy(activ.children[0].matrixWorld);
    head.matrix.copy(activ.children[0].matrix);
    activ.children[0].removeFromParent()
    activ.add(head)
  }
  if(activ == robot.getObjectByName("armleft")){
    var geometry = new THREE.BoxGeometry( 0.3, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
    var armleft = new THREE.Mesh( geometry, material);

    armleft.matrixWorld.copy(activ.children[0].matrixWorld);
    armleft.matrix.copy(activ.children[0].matrix);
    activ.children[0].removeFromParent()
    activ.add(armleft)
  }
  if(activ == robot.getObjectByName("armright")){
    var geometry = new THREE.BoxGeometry( 0.3, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
    var armright = new THREE.Mesh( geometry, material);

    armright.matrixWorld.copy(activ.children[0].matrixWorld);
    armright.matrix.copy(activ.children[0].matrix);
    activ.children[0].removeFromParent()
    activ.add(armright)
  }
  if(activ == robot.getObjectByName("legleft")){
    var geometry = new THREE.BoxGeometry( 0.1, 0.3, 0.1);
      var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
      var legleft = new THREE.Mesh( geometry, material);
  
      legleft.matrixWorld.copy(activ.children[1].matrixWorld);
      legleft.matrix.copy(activ.children[1].matrix);
      activ.children[1].removeFromParent()
      activ.add(legleft)
  }
  if(activ == robot.getObjectByName("legright")){
    var geometry = new THREE.BoxGeometry( 0.1, 0.3, 0.1);
      var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
      var legright = new THREE.Mesh( geometry, material);
  
      legright.matrixWorld.copy(activ.children[1].matrixWorld);
      legright.matrix.copy(activ.children[1].matrix);
      activ.children[1].removeFromParent()
      activ.add(legright)
    }
    if(activ ==robot.getObjectByName("footleft")){
      var geometry = new THREE.BoxGeometry( 0.1, 0.03, 0.1);
      var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
      var footleft = new THREE.Mesh( geometry, material);

      footleft.matrixWorld.copy(activ.children[0].matrixWorld);
      footleft.matrix.copy(activ.children[0].matrix);
      activ.children[0].removeFromParent()
      activ.add(footleft)
    }
    if(activ == robot.getObjectByName("footright")){
      var geometry = new THREE.BoxGeometry( 0.1, 0.03, 0.1);
      var material = new THREE.MeshBasicMaterial( { color: 0x887766  } );
      var footleft = new THREE.Mesh( geometry, material);

      footleft.matrixWorld.copy(activ.children[0].matrixWorld);
      footleft.matrix.copy(activ.children[0].matrix);
      activ.children[0].removeFromParent()
      activ.add(footleft)
    }
};

export function updateMatrix(activ: THREE.Object3D){
  var temp = activ
  var matrix = new THREE.Matrix4
  while(temp.parent != null && temp.name != "robot"){
    matrix.multiply(temp.matrix) 
    temp = temp.parent
  }
  activ.matrixWorld.copy(matrix)
}

export function showAxes(activ: THREE.Object3D){
  var axes = new THREE.AxesHelper(0.3);
  axes.matrixWorld.copy(activ.matrixWorld);
  axes.name = "axes"
  activ.add(axes);
  return axes;
}

export function rotationmatrixx(matrix: THREE.Matrix4){
  matrix.set(
    1, 0, 0, 0,
    0, Math.cos(-Math.PI/360), -Math.sin(-Math.PI/360), 0,
    0, Math.sin(-Math.PI/360), Math.cos(-Math.PI/360), 0,
    0, 0, 0, 1,
    );
    return matrix;
}

export function rotate(activ: THREE.Object3D){
  if(activ.parent != null){
    let R = new THREE.Matrix4
    let a = new THREE.Matrix4
    let ai = new THREE.Matrix4
    var x = activ.matrixWorld.elements[12]
    var y = activ.matrixWorld.elements[13]
    var z = activ.matrixWorld.elements[14]
    a.set(
      1, 0, 0, -x,
      0, 1, 0, -y,
      0, 0, 1, -z,
      0, 0, 0, 1
    )
    ai.set(
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1
    )
    //console.log("vorher")
    //console.log(activ.matrixWorld)
    rotationmatrixx(R)
    R.multiply(a);
    ai.multiply(R)
    activ.matrix.multiply(ai)
    //console.log("nachher")
    //console.log(activ.matrix)
    updateMatrix(activ)
  
    activ.children.forEach(element => {
      passdown(element)
    });
  }
}
  
export function passdown(activ: THREE.Object3D){
  updateMatrix(activ)
  //console.log(activ.matrix)
  if(activ.parent != null){
  //var y = activ.parent.matrix.elements[13]
  //var z = activ.parent.matrix.elements[14]
  //var r = Math.sqrt(y*y+ z*z)
  }
}
export function resetrobot(activ: THREE.Object3D, robot: THREE.Object3D){
  if(activ == robot.getObjectByName("body")){
    activ.matrix.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    activ.children[5].matrix.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    updateMatrix(activ)
    updateMatrix(activ.children[5])
    //console.log(activ.matrixWorld);
  }
  if(activ == robot.getObjectByName("head")){
    activ.matrix.set(
      1, 0, 0, 0,
      0, 1, 0, 0.33,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    activ.children[0].matrix.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    updateMatrix(activ)
    updateMatrix(activ.children[0])
  }
  if(activ == robot.getObjectByName("armleft")){
    activ.matrix.set(
      1, 0, 0, -0.15,
      0, 1, 0, 0.15,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    activ.children[0].matrix.set(
      1, 0, 0, -0.15,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    updateMatrix(activ)
    updateMatrix(activ.children[0])
  }
  if(activ == robot.getObjectByName("armright")){
    activ.matrix.set(
      1, 0, 0, 0.15,
      0, 1, 0, 0.15,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    activ.children[0].matrix.set(
      1, 0, 0, 0.15,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    updateMatrix(activ)
    updateMatrix(activ.children[0])
  }
  if(activ == robot.getObjectByName("legleft")){
    activ.matrix.set(
      1, 0, 0, -0.08,
      0, 1, 0, -0.21,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    activ.children[1].matrix.set(
      1, 0, 0, 0,
      0, 1, 0, -0.15,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    updateMatrix(activ)
    updateMatrix(activ.children[1])
  }
  if(activ == robot.getObjectByName("legright")){
    activ.matrix.set(
      1, 0, 0, 0.08,
      0, 1, 0, -0.21,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    activ.children[1].matrix.set(
      1, 0, 0, 0,
      0, 1, 0, -0.15,
      0, 0, 1, 0,
      0, 0, 0, 1,
    )
    updateMatrix(activ)
    updateMatrix(activ.children[1])
    }
    if(activ ==robot.getObjectByName("footleft")){
      activ.matrix.set(
        1, 0, 0, 0,
        0, 1, 0, -0.28,
        0, 0, 1, 0.06,
        0, 0, 0, 1,
      )
      activ.children[0].matrix.set(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0.05,
        0, 0, 0, 1,
      )
      updateMatrix(activ)
      updateMatrix(activ.children[0])
    }
    if(activ == robot.getObjectByName("footright")){
      activ.matrix.set(
        1, 0, 0, 0,
        0, 1, 0, -0.28,
        0, 0, 1, 0.06,
        0, 0, 0, 1,
      )
      activ.children[0].matrix.set(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0.05,
        0, 0, 0, 1,
      )
      updateMatrix(activ)
      updateMatrix(activ.children[0])
    }
    activ.children.forEach(element => {
      resetrobot(element, robot)
   });
}


// define camera that looks into scene
export function setupCamera(camera: THREE.PerspectiveCamera, scene: THREE.Scene){
  // https://threejs.org/docs/#api/cameras/PerspectiveCamera
  camera.near = 0.01;
  camera.far = 10;
  camera.fov = 70;
  camera.position.z = 1;
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix();
  camera.matrixAutoUpdate = true;
  return camera
}

// define controls (mouse interaction with the renderer)
export function setupControls(controls: OrbitControls){
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.enableZoom = true;
  controls.minDistance = 0.1;
  controls.maxDistance = 5;
  return controls;
};
