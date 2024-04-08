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

uniform sampler2D uTexture;

uniform sampler2D uct;

in vec2 uv_o;

out vec4 fragColor;

// main function gets executed for every pixel
void main()
{
  vec4 tex = texture(uTexture, uv_o);
  vec4 draw = texture(uct,uv_o);
  fragColor = tex + draw;
}
