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

uniform sampler2D normals;

in vec3 position_o;
in vec3 normal_o;
in vec2 uv_o;

out vec4 fragColor;

// main function gets executed for every pixel
void main()
{ 
  vec3 normal_m = 2.0 * (texture(normals,uv_o).rgb - 0.5);
  normal_m = normalize(normal_m);
  normal_m = normal_m + position_o;  
  vec3 lightPosition;
  lightPosition.x = 2.0;
  lightPosition.y = 2.0;
  lightPosition.z = 3.0;
  vec3 l_s = lightPosition + position_o; 
  vec3 c_s = cameraPosition + position_o;
  vec3 cameranormal = normalize(c_s);
  vec3 lightnormal = normalize(l_s);
  float ndotl = dot(normal_m, lightnormal);
  vec3 R = 2.0 * (normal_o * dot(normal_m, lightnormal)) -lightnormal;
  float ndotc = dot(R, cameranormal);
   if(ndotc < 0.0){
    ndotc = 0.0;
  }
  ndotc = pow(ndotc,50.0);
  ndotc = (50.0 + 2.0)/(2.0 * PI) * ndotc;
  if(ndotl<0.0){
    ndotc == 0.0;
  }
  if(ndotl < 0.0){
    ndotl = 0.0;
  }
  vec4 texture_c = texture(uTexture, uv_o);
  fragColor = vec4(texture_c.x * 0.25 + (texture_c.x * ndotl + 1.0 * ndotc), texture_c.y * 0.25 + (texture_c.y * ndotl + 1.0 * ndotc), texture_c.z * 0.25 + (texture_c.z * ndotl + 1.0 * ndotc), 1.0);
}