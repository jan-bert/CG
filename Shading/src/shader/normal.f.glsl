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

out vec4 fragColor;

// main function gets executed for every pixel
void main()
{
  vec3 normal_c = normalize(normal_o);
  vec3 rgb = normal_c * 0.5 + 0.5;
  fragColor = vec4(rgb , 1.0);
}
