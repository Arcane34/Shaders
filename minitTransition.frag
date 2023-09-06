#ifdef GL_ES
precision mediump float;
#endif 

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
    
    float angle = atan(uv.y,uv.x) + TWO_PI/2.0 + (1.0/(u_time/2. + 0.1));
    float parts = sin(angle*4.0);
    //
    vec3 col = vec3(step(u_time/1.5,parts));

    
    
    gl_FragColor=vec4(col,1.0);
}