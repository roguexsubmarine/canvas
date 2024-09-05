window.addEventListener('resize', function() {
    location.reload();
});

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const steps = 5000;

let a = 1.4; // Parameter a
let b = 0.3; // Parameter b
let x = 0; // Initial x
let y = 0; // Initial y

var slider_a = document.getElementById("a");
var slider_b = document.getElementById("b");

slider_a.oninput = function() {
    a = 1 + 0.4 * (this.value / 100);
    drawHenonMap();
}
slider_b.oninput = function() {
    b = 0.2 + 0.1 * (this.value / 100);
    drawHenonMap();
}

// Arrays to store x and y values
const xVals = Array(steps).fill(0);
const yVals = Array(steps).fill(0);

// Scaling functions to map data to canvas
const xScale = (xVal) => ((xVal + 1.5) / 3) * canvas.width; // Adjust scaling based on expected range
const yScale = (yVal) => canvas.height - ((yVal + 0.5) / 1.5) * canvas.height; // Adjust scaling

// Function to calculate the next point in the Hénon map
function calculateHenonMap() {
    for (let i = 0; i < steps; i++) {
        const newX = 1 - a * x * x + y;
        const newY = b * x;
        
        xVals[i] = newX;
        yVals[i] = newY;

        // Update x and y for the next iteration
        x = newX;
        y = newY;
    }
}

var radius = 2; //radius of each dot !!!

// Function to plot the Hénon map
function plotHenonMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    ctx.fillStyle = "#3A3853";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#95F7D0"; // Set the color for plotting points

    // Loop through the points and plot them
    for (let i = 0; i < steps; i++) {
        const xPlot = xScale(xVals[i]);
        const yPlot = yScale(yVals[i]);

        ctx.beginPath();

        ctx.arc(xPlot, yPlot, radius, 0, 2 * Math.PI); // Plot each point as a small circle
        ctx.fill();
    }

    // Display the current values of a and b on the canvas
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText(`a: ${a.toFixed(2)}, b: ${b.toFixed(2)}`, canvas.width - 10, 10);
}

// Function to animate the plotting process
function drawHenonMap() {
    calculateHenonMap(); // Update the x and y values for the Hénon map
    plotHenonMap(); // Plot the updated values

    requestAnimationFrame(drawHenonMap); // Continue the animation
}

// Start the animation
drawHenonMap();
