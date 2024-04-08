#version 300 es



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

in float ndotc_o;

out vec4 fragColor;

// main function gets executed for every pixel
void main()
{
  vec3 l_s = lightPosition + position_o;
  vec3 lightnormal = normalize(l_s);
  float ndotl = dot(normal_o, lightnormal);
  if(ndotl < 0.0){
    ndotl = 0.0;
  }
  vec3 color_sd = color_s / 20.0;
  fragColor = vec4(color_a.x + (color_d.x * ndotl + color_sd.x * ndotc_o), color_a.y + (color_d.y * ndotl + color_sd.y * ndotc_o), color_a.z + (color_d.z * ndotl + color_sd.z * ndotc_o), 1.0);
}