#version 300 es
precision mediump float;

#define PI 3.14159265359

/**
 * \file
 * \author Rudy Castan
 * \author Jaejin Chae
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
*/

uniform vec2 u_resolution;
uniform float u_time;

out vec4 fragColor;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main()
{
    vec2 st = gl_FragCoord.xy / u_resolution;
    
    float y1 = 0.5 + 0.25 * sin(st.x * PI * 6.0 + u_time);
    float y2 = 0.5 + 0.25 * sin(st.x * PI * 6.0 - u_time);
    
    float x1 = 0.5 + 0.25 * sin(st.y * PI * 6.0 + u_time);
    float x2 = 0.5 + 0.25 * sin(st.y * PI * 6.0 - u_time);
  

    vec3 color = vec3(0,0,0);

    float pct1 = plot(st, y1);
    float pct2 = plot(st, y2);
    float pct3 = plot(st, x1);
    float pct4 = plot(st, x2);
    
    color += pct1 * vec3(0.0706, 0.0824, 0.8314);
    color += pct2 * vec3(0.8314, 0.0824, 0.0706);
    color += pct3 * vec3(0.0706, 0.8314, 0.0824);
    color += pct4 * vec3(0.8314, 0.8314, 0.0706);
    
    fragColor = vec4(color, 1.0);
}