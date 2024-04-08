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

uniform vec3 color_v;

// = camera position in world space
uniform vec3 lightPosition;

in vec3 normal_o;

in vec3 position_o;

out vec4 fragColor;

// main function gets executed for every pixel
void main()
{
  vec3 normal_p = normal_o;
  vec3 l_s = lightPosition + position_o;
  vec3 lightnormal = normalize(l_s);
  float ndotc = dot(normal_o, lightnormal);
  if(ndotc < 0.0){
    ndotc = 0.0;
  }
  fragColor = vec4(ndotc * color_v.x ,ndotc * color_v.y ,ndotc * color_v.z , 1.0);
}
