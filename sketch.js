let currentkey = '1';

let bgc;
let gkcount;
let isSaving = false;  // Prevent multiple saves

function setup() {
    createCanvas(800, 600);
    background(255);
    smooth();
    bgc = color(255);
    gkcount = 20;
}

function draw() {

    if (keyIsPressed) {
        clear_print();
    }
    
    if (mouseIsPressed) {
        drawChoice();
    }
}

// Main function to call specific brush functions based on key press
function drawChoice() {
    let currentkey = key;

    switch (currentkey) {
        case '1':
            console.log("1");  // Random sized black circles
            drawRandomCirclesAK();
            break;
        case '2':
            console.log("2");  // Semi-bold pink line
            drawPinkLineAK();
            break;
        case '3':
            console.log("3");  // Star
            drawRotatingLineAK();
            break;
        case '4':
            console.log("4");  // Horizontal bright green lines
            drawHorizontalGreenLineAK();  
            break;
        case '5':
            console.log("5");  // Eraser
            eraserAK(bgc, mouseX, mouseY, 25);
            break;
        case '6':
            console.log("6");  // Random rainbow squares with random opacity
            drawRandomSquaresAK();
            break;
        default:
            console.log("None");
            break;
    }
}

function drawRandomCirclesAK() {
    let circleSize = random(10, 50);  // Random size for the circle
    fill(0); 
    noStroke();
    ellipse(mouseX, mouseY, circleSize, circleSize);  // Draw the circle at mouse position
}

function drawPinkLineAK() {
    strokeWeight(5);  // Set the stroke weight to semi-bold
    stroke(255, 60, 223);
    line(mouseX, mouseY, pmouseX, pmouseY);  // Draw the line from previous to current mouse position
}

function drawRotatingLineAK() {
    push();
    translate(mouseX, mouseY);  // Move the origin to the mouse position
    let angleOffset = random(0, TWO_PI);  // Add randomness to the rotation for spacing
    for (let i = 0; i < 5; i++) {
        rotate(TWO_PI / 5 + angleOffset); 
        stroke(255, 255, 0); 
        line(0, 0, 30 + random(10, 20), 0);
    }
    pop();
}

function drawHorizontalGreenLineAK() {
    let lineLength = 100;
    stroke(0, 255, 0);
    strokeWeight(4);
    let offset = random(10, 20);
    line(mouseX - lineLength / 2 + offset, mouseY, mouseX + lineLength / 2 + offset, mouseY);  // Draw a horizontal line with spacing
}

function eraserAK(k, lx, ly, sz) {
    fill(k); 
    noStroke();
    ellipse(lx, ly, sz, sz);
}

function drawRandomSquaresAK() {
    // Set the color mode to HSB for a rainbow effect, then set the fill with random hue, full saturation, and brightness, with random opacity
    colorMode(HSB, 360, 100, 100, 255);

    let squareSize = random(20, 50);  // Random size for the square
    let alphaValue = random(50, 255);  // Random opacity
    let hueValue = random(360);  // Random hue value for the rainbow color

    fill(hueValue, 100, 100, alphaValue); 
    noStroke(); 
    rect(mouseX - squareSize / 2, mouseY - squareSize / 2, squareSize, squareSize);  // Draw the square with the mouse at the center

    colorMode(RGB, 255); 
}

function clear_print() {

    if (key == 'x' || key == 'X') {
        background(255);
    } else if (key == 'p' || key == 'P') { 

        if (!isSaving) {
            isSaving = true;  // Set the flag to true to indicate saving
            // Save the current canvas as a PNG file
            let filename = 'paintImage_' + frameCount + '.png';  // Unique filename based on frame count
            save(filename);  // Save the canvas as a PNG
            
        }
    }
}

function keyReleased() {
    if (key == 'p' || key == 'P') {
        isSaving = false;
    }
}
