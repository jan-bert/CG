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

// = camera position in world space
uniform vec3 cameraPosition;

in vec3 normal_o;

in vec3 position_o;

out vec4 fragColor;

// main function gets executed for every pixel
void main()
{
  vec3 normal_p = normal_o + position_o;
  float ndotc = dot(normal_p, cameraPosition);
  if(ndotc > 0.25){
  fragColor = vec4(104.0/ 0.0, 13.0 / 255.0, 13.0 / 255.0, 1.0);
  }
   if(ndotc > 0.0 && ndotc <= 0.25){
  fragColor = vec4(176.0 / 255.0, 17.0 / 255.0, 17.0 / 255.0, 1.0);
  }
   if(ndotc <= 0.0 && ndotc >-0.9){
  fragColor = vec4(166.0 / 255.0, 14.0 / 255.0, 14.0 / 255.0, 1.0);
  }
   if(ndotc <= -0.9){
  fragColor = vec4(61.0 / 255.0, 7.0 / 255.0, 7.0 / 255.0, 1.0);
  }
}
