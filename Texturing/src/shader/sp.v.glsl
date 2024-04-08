#version 300 es 

#define PI 3.1415926538

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
uniform vec3 cameraPosition;

uniform sampler2D uTexture;

// default vertex attributes provided by Geometry and BufferGeometry
in vec3 position;
in vec3 normal;
in vec2 uv;

out vec2 uv_o;

// main function gets executed for every vertex
void main()
{
  float u = (PI + atan(position.x,position.z))/(2.0*PI);
  float v = atan(sqrt(((position.z) * (position.z)) + ((position.x) * position.x)),-position.y)/(PI);
  uv_o.x = u;
  uv_o.y = v;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
