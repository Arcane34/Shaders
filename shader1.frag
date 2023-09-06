#ifdef GL_ES
precision mediump float;
#endif 


uniform vec2 u_resolution;
uniform float u_time;

// a palette of colours generated via a website
vec3 palette( float t){
    vec3 a = vec3(0.500, 0.500, 0.500);
    vec3 b = vec3(0.500, 0.500, 0.500);
    vec3 c = vec3(1.000, 1.000, 1.000);
    vec3 d = vec3(-0.972, 0.198, -0.802);
    
    return a + b*cos( 6.28318*(c*t+d));
}

// main loop for where the shader gets animated/drawn
void main() {
    
    // This takes the range of 0 to 1 of the shader and accurately extrapolates the reolution of the screen to it while moving the origin to the center
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;

    // storing the state of the original uv when first created
    vec2 uv0 = uv;

    // creating a black screen to add colours to and allow for multiple iterations of displaying
    vec3 finalColor = vec3(0.0);

    // for loop for how many time the screen will be fract-ed (split) into smaller subsections
    // 1 being the original screen partitioned once, 2 being all screens onscreen partitioned again
    for (float i = 0.0; i < 4.0; i++){

        // splitting the screen and then centering those mini screens
        uv = fract(uv * 1.5) - 0.5;

        // determining the distance from the origin of the current pixel
        float d = length(uv);

        // adding variability to the distance giving it smoothness
        d *= exp(-length(uv0));
        
        // giving it a colour dependent on the distance from the centre + the offset of how long the shader has been played
        // i value gives next iterations have slight differences in colour
        vec3 col = palette(length(uv0) + i*0.4 + u_time*0.4);

        // operations on the distance to make it repeat multiple times via sin 
        d = sin(d*8.0 + u_time)/8.0;
        // unfilling the circle created
        d = abs(d);

        // creating the neon effect by changing the brightness to 1/brightness the closer you get to each circle
        // lower the number, faster falloff of brightness
        // use power function to increase contrast of image (basically the final brightness is the same but the area in which it will be bright is less as the beginning will be darker)
        d = pow(0.01 / d, 1.2);

        // adding the pixel color to our final color screen
        finalColor += col * d;    
    }

    // displaying the screen after all pixels are given a value
    gl_FragColor = vec4 ( finalColor, 1.0);
}