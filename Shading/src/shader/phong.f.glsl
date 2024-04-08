#version 300 es

#define PI 3.1415926535897932384626433832795

// defines the precision
precision highp float;

// we have access to the same uniforms as in the vertex shader
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

uniform vec3 color_d;

uniform vec3 color_a;

uniform vec3 color_s;

// = camera position in world space
uniform vec3 lightPosition;

uniform vec3 cameraPosition;

uniform float magnitude;

in vec3 normal_o;

in vec3 position_o;

out vec4 fragColor;

// main function gets executed for every pixel
void main()
{
  vec3 l_s = lightPosition + position_o;
  vec3 c_s = cameraPosition + position_o;
  vec3 normalcamera = normalize(c_s);
  vec3 lightnormal = normalize(l_s);
  float ndotl = dot(normal_o, lightnormal);
  vec3 R = 2.0 * (normal_o * dot(normal_o, lightnormal)) -lightnormal;
  float ndotc = dot(R, normalcamera);
  if(ndotc < 0.0){
    ndotc = 0.0;
  }
  ndotc = pow(ndotc,magnitude);
  ndotc = (magnitude + 2.0)/(2.0 * PI)  * ndotc;
  if(ndotl < 0.0){
    ndotl = 0.0;
  }
  fragColor = vec4(color_a.x + (color_d.x * ndotl + color_s.x * ndotc), color_a.y + (color_d.y * ndotl + color_s.y * ndotc), color_a.z + (color_d.z * ndotl + color_s.z * ndotc), 1.0);
}