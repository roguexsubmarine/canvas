window.addEventListener('resize', function() {
    location.reload();
});

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let steps = 2000;
let mScale = 10;
let animationFrameId;  // For storing the requestAnimationFrame ID

// Generate random initial values for x and y within a sensible range
let x = Math.random() * mScale - mScale/2;
let y = Math.random() * mScale - mScale/2;

// Scaling functions to map data to canvas
let scale = 50;
const xScale = (xVal) => (xVal + scale / 2) / scale * canvas.width; // Adjust scaling based on expected range
const yScale = (yVal) => canvas.height - (yVal + scale / 2) / scale * canvas.height; // Adjust scaling


let zoom_slider = document.getElementById("zoom");


zoom_slider.oninput = function() {
    scale = 50 * this.value / 1000;
    reinitializeAndRedraw();
}

// Arrays to store x, y values and their corresponding colors
let xVals = Array(steps).fill(0);
let yVals = Array(steps).fill(0);
let colors = Array(steps).fill(0).map(() => getRandomColor()); // Assign random colors

// Function to generate a random color in hex format
function getRandomColor() {
    const colors = [
        '#FABC3F',
        '#E85C0D',
        '#E85C0D',
        '#821131',
    ]
    let random_color = Math.floor(Math.random() * colors.length);
    return colors[random_color];
}

// Function to calculate the next point in the Gingerbreadman map
function calculateGingerbreadmanMap() {
    for (let i = 0; i < steps; i++) {
        const newX = 1 - y + Math.abs(x);
        const newY = x;

        xVals[i] = newX;
        yVals[i] = newY;

        // Update x and y for the next iteration
        x = newX;
        y = newY;
    }
}

var radius = 2; // Radius of each dot

// Function to draw the axes at the center of the canvas
function drawAxes() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;

    // Draw the x-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    // Draw the y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
}

// Function to plot the Gingerbreadman map
function plotGingerbreadmanMap() {

    drawAxes(); // Draw axes through the center of the canvas

    // Loop through the points and plot them with their random colors
    for (let i = 0; i < steps; i++) {
        const xPlot = xScale(xVals[i]);
        const yPlot = yScale(yVals[i]);

        ctx.fillStyle = colors[i]; // Use the random color for each point

        ctx.beginPath();
        ctx.arc(xPlot, yPlot, radius, 0, 2 * Math.PI); // Plot each point as a small circle
        ctx.fill();
    }

    
}

// Function to animate the plotting process
function drawGingerbreadmanMap() {
    calculateGingerbreadmanMap(); // Update the x and y values for the Gingerbreadman map
    plotGingerbreadmanMap(); // Plot the updated values
    
    animationFrameId = requestAnimationFrame(drawGingerbreadmanMap); // Continue the animation
}

// Function to re-initialize the map with new values
function reinitializeAndRedraw() {
    // Cancel the current animation
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    // Re-initialize x, y, colors, xVals, and yVals
    x = Math.random() * mScale - mScale / 2;
    y = Math.random() * mScale - mScale / 2;

    xVals = Array(steps).fill(0);
    yVals = Array(steps).fill(0);
    colors = Array(steps).fill(0).map(() => getRandomColor());

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = "#000000"; // Background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // // Display the current iteration details on the canvas (for debugging)
    // ctx.fillStyle = "#FFFFFF";
    // ctx.font = "20px Arial";
    // ctx.textAlign = "right";
    // ctx.textBaseline = "top";
    // ctx.fillText("Gingerbreadman Map", canvas.width - 10, 10);


    // Start the new animation
    drawGingerbreadmanMap();
}


ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
ctx.fillStyle = "#000000"; // Background color
ctx.fillRect(0, 0, canvas.width, canvas.height);


// Start the animation
drawGingerbreadmanMap();
