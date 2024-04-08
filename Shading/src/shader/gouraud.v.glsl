#version 300 es 

#define PI 3.1415926535897932384626433832795

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

uniform mat4 projectionMatrixInverse;

uniform vec3 lightPosition;

uniform vec3 cameraPosition;

uniform vec3 color_d;

uniform vec3 color_a;

uniform vec3 color_s;

uniform float magnitude;

// default vertex attributes provided by Geometry and BufferGeometry
in vec3 position;
in vec3 normal;
in vec2 uv;

out float ndotc_o;

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

  vec3 l_s = lightPosition + position_o;
  vec3 c_s = cameraPosition + position_o;
  vec3 lightnormal = normalize(l_s);
  vec3 normalcamera = normalize(c_s);
  vec3 R = 2.0 * (normal_o * dot(normal_o, lightnormal)) -lightnormal;
  float ndotc= dot(R, normalcamera);
  if(ndotc < 0.0){
    ndotc = 0.0;
  }
  ndotc = pow(ndotc,magnitude);
  ndotc_o = (magnitude + 2.0)/(2.0 * PI)  * ndotc;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z, 1.0);
}