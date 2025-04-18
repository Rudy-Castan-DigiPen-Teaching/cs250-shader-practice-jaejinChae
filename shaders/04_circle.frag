#version 300 es
precision mediump float;

/**
 * \file
 * \author Rudy Castan
 * \author Jaejin Chae
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */


out vec4 FragColor;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 to_coord(vec2 pixel_point)
{
    vec2 point = pixel_point / u_resolution;
    if (u_resolution.x > u_resolution.y)
    {
        // Wide, not tall
        point.x *= u_resolution.x / u_resolution.y;
        point.x += (u_resolution.y - u_resolution.x) / (u_resolution.y / 0.5);
    }
    else
    {
        // Tall, not wide
        point.y *= u_resolution.y / u_resolution.x;
        point.y += (u_resolution.x - u_resolution.y) / (u_resolution.x / 0.5);
    }

    return point;
}

float sCircle(vec2 point, vec2 center, float radius)
{
    // assume the circle is centered at (0.5, 0.5)
    float d = distance(point, center);
    return d - radius;
}

//return 0 means not in circle, 1 means in circle
float circle(vec2 point, vec2 center, float radius)
{
    float sd = sCircle(point, center, radius);
    //return 1.0 - step(0., sd);
    float E = fwidth(sd);
    return 1.0 - smoothstep(-E, E, sd);
}

void main(void)
{
    vec2 positon = to_coord(gl_FragCoord.xy);
    vec3 color = vec3(0.1804, 0.8275, 0.8039);
    vec2 mp = to_coord(u_mouse);

    vec2 p1 = vec2(cos(u_time), sin(u_time))* 0.25 + mp;
    float t1 = circle(positon, p1, 0.25);
    color = mix(color, vec3(1), t1);

    vec2 p2 = vec2(-cos(u_time), sin(u_time))* 0.125 + p1;
    float t2 = circle(positon, p2, 0.125);
    color = mix(color, vec3(0.1843, 0.8824, 0.6118), t2);
    
    vec2 p3 = vec2(cos(u_time), -sin(u_time))* 0.0625 + p2;
    float t3 = circle(positon, p3, 0.0625);
    color = mix(color, vec3(0.9176, 1.0, 0.0196), t3);
    
    FragColor = vec4(color, 1.0);
}
