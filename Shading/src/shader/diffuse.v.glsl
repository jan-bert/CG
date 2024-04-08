#version 300 es 


// These uniforms and attributes are provided by threejs.
// If you want to add your own, look at https://threejs.org/docs/#api/en/materials/ShaderMaterial #Custom attributes and uniforms
// defines the precision
precision highp float;

// = object.matrixWorld
uniform mat4 modelMatrix;

// = camera.matrixWorldInverse * object.matrixWorld
uniform mat4 modelViewMatrix;

// = camera.projectionMatrix
uniform mat4 projectionMatrix;

// = camera.matrixWorldInverse
uniform mat4 viewMatrix;

// = inverse transpose of modelViewMatrix
uniform mat3 normalMatrix;

// = camera position in world space
uniform vec3 lightPosition;

uniform mat4 projectionMatrixInverse;

uniform vec3 color_v;

// default vertex attributes provided by Geometry and BufferGeometry
in vec3 position;
in vec3 normal;
in vec2 uv;

out vec3 normal_o;

out vec3 position_o;

// main function gets executed for every vertex
void main()
{
  vec4 normal_c2 = projectionMatrixInverse * vec4(normal, 0.0);
  vec3 normal_c = vec3(normal_c2.x, normal_c2.y, normal_c2.z);
  vec3 normal_n = normalize(normal_c);
  normal_o = normal_n;
  vec4 position_c = modelMatrix * vec4(position.x, position.y, position.z, -1.0);
  position_o =  vec3(position_c.x,position_c.y,position_c.z);
  //position_o = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z, 1.0);
}