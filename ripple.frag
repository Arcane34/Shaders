#ifdef GL_ES
precision mediump float;
#endif 


uniform vec2 u_resolution;
uniform float u_time;

vec3 palette( float t){
    vec3 a = vec3(0.558, 0.838, 0.500);
    vec3 b = vec3(0.418, 0.500, 0.500);
    vec3 c = vec3(0.998, 1.000, 1.000);
    vec3 d = vec3(0.078, 0.308, 0.667);
    
    return a + b*cos( 6.28318*(c*t+d));
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
    

    for (float i = 0.0; i < 3.0; i++){
        float angle = atan(uv.y,uv.x) + i*0.4;

        float d = length(uv);
        d += exp(-length(uv0));

        vec3 col = palette(length(uv0) + i*0.4+ u_time*0.4);

        d -= 0.5 ;
        d = sin(d*8. - u_time)/8.;
        d = abs(d);
        d = pow(0.01/d, 1.2) * smoothstep(0.,-length(uv)*9.,sin(angle*3.+u_time*(i+1.)));

        finalColor += col * d;    
        uv = fract(uv * 1.5) - 0.5; 
    }

    gl_FragColor=vec4(finalColor,1.2);
}