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
in vec3 normal_o;

out vec4 fragColor;

// main function gets executed for every pixel
void main()
{ 
  vec3 c_s = cameraPosition - position_o;
  vec3 cameranormal = normalize(c_s);
  vec3 s_normal = normal_o + position_o;
  s_normal = normalize(s_normal); 

  vec3 R = cameranormal - 2.0 * dot(cameranormal, s_normal) * s_normal; 
  R = normalize(R);
  R.x = -R.x;
  float u = 1.0 - (PI + atan(R.z,R.x))/(2.0*PI);
  float v = atan(sqrt(((R.x) * (R.x)) + ((R.z) * R.z)),R.y)/(PI);
  vec2 uv;
  uv.x = u;
  uv.y = v;
  fragColor = texture(uTexture, uv);
}