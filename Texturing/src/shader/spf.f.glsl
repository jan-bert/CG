#version 300 es

#define PI 3.1415926538

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

uniform sampler2D uTexture;

in vec3 position_o;

out vec4 fragColor;

// main function gets executed for every pixel
void main()
{
  float u = (PI + atan(position_o.x,position_o.z))/(2.0*PI);
  float v = atan(sqrt(((position_o.z) * (position_o.z)) + ((position_o.x) * position_o.x)),-position_o.y)/(PI);
  vec2 uv;
  uv.x = u;
  uv.y = v;
  fragColor = texture(uTexture, uv);
}
