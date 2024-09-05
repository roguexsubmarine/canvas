var canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var rD = Math.min(canvas.width / 20, 30);

window.addEventListener('resize', function(){
    location.reload();
});

function lorenz(x, y, z, s = 10, r = rD, b = 2.667) {
    const x_dot = s * (y - x);
    const y_dot = r * x - y - x * z;
    const z_dot = x * y - b * z;
    return [x_dot, y_dot, z_dot];
}

function drawLorenz() {

    const dt = 0.01;
    // const numSteps = 10000;
    let [x, y, z] = [0, 1, 1.05];
    let step = 0;

    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 1;

    function drawStep() {
        // if (step >= numSteps) return;

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + x * 10, canvas.height / 1.5 - z * 10);

        const [x_dot, y_dot, z_dot] = lorenz(x, y, z);
        x += x_dot * dt;
        y += y_dot * dt;
        z += z_dot * dt;
        ctx.lineTo(canvas.width / 2 + x * 10, canvas.height / 1.5 - z * 10);
        ctx.stroke();

        step++;
        requestAnimationFrame(drawStep);
    }

    drawStep();
}

drawLorenz();