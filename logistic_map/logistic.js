
window.addEventListener('resize', function(){
    location.reload();
});

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dim = Math.min(window.innerHeight, window.innerHeight);
canvas.width = dim;
canvas.height = dim;


const steps = Math.floor(dim / 10);

//creating array of 0 to 50 range
const x = Array(steps + 1).fill(0);
const y = Array(steps + 1).fill(0);
y[0] = 0.4;



const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let r = 0.1;
const minR = 0;
const maxR = 4;
let rStep = 0.001; // Speed of changing r
let step = 0;
const dt = 0.1;

// Scaling functions to map data to canvas
const xScale = (xVal) => (xVal / steps) * canvasWidth;
const yScale = (yVal) => canvasHeight - (yVal * canvasHeight);

// Function to calculate population values based on r
function calculatePopulation() {
    for (let i = 0; i < steps; i++) {
        y[i + 1] = r * y[i] * (1 - y[i]);
        x[i + 1] = x[i] + 1;
    }
}

// Function to plot the data for the current value of r
function plotLine() {

    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear canvas for each frame

    ctx.fillStyle = "#2D2926FF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(xScale(x[0]), yScale(y[0]));
    
    for (let i = 1; i < x.length; i++) {
        ctx.lineTo(xScale(x[i]), yScale(y[i]));
    }
    
    ctx.strokeStyle = "#E94B3CFF"; // semi-transparent blue line
    ctx.stroke();
}


// Animation loop to change r over time
function drawStep() {
    if (r > maxR || r <= minR){
        rStep = rStep * -1;
    } // Stop when r exceeds maxR
    
    calculatePopulation(); // Calculate y values for the current r
    plotLine(); // Plot the calculated values

    r += rStep; // Increment r
    
    requestAnimationFrame(drawStep); // Continue the animation
}

drawStep(); // Start animation