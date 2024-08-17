var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

const colorArray = [
    [
        "#FF4858",
        "#1B7F79",
        "#00CCC0",
        "#72F2EB",
        "#747F7F"
    ],
    [
        "#FFEED8",
        "#FFEFBF",
        "#C78880",
        "#FFA081",
        "#D4FFE4"
    ],
    [
        "#73AAE1",
        "#ACEED4",
        "#FA6965",
        "#FC8784",
        "#F0F4F2"
    ],
    [
        "#B4CBD9",
        "#496773",
        "#F2D7B6",
        "#A67153",
        "#D2E8E3"
    ],
    [
        "#DAFDBA",
        "#9AEBA3",
        "#45C4B0",
        "#13678A",
        "#D2E8E3"
    ],
    [
        "#F25C84",
        "#8596A6",
        "#4D6473",
        "#D6F299",
        "#F2F2F2"
    ],
    [
        "#D95970",
        "#F28D9F",
        "#999FBF",
        "#C4D9BF",
        "#C6D984"
    ]
];

var mouse = {
    x: canvas.innerWidth/2,
    y: canvas.innerHeight/2
}

const gravity = 0.08;
let particles = [];
var alphasub = 0.005;
var colorpalette = colorArray[(Math.floor(Math.random() * colorArray.length))];

window.addEventListener('click', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    particleCount = 400;
    const angle = (Math.PI * 2) / particleCount;

    for(let i = 0; i < particleCount; i++){

        var radius = 4;
        var scale = 8;
        var x = mouse.x;
        var y = mouse.y;
        var vel = {
            x: Math.cos(i * angle) * Math.random() * scale,
            y: Math.sin(i * angle) * Math.random() * scale
        }

        // console.log(colorpalette);
        var color = colorpalette[Math.floor(Math.random() * colorpalette.length)];
        
        particles.push(new Particle(x, y, radius, color, vel));
        console.log(x, y, vel, radius)
    }

    colorpalette = colorArray[(Math.floor(Math.random() * colorArray.length))];
    console.log(particles.length, " particles.")

})

class Particle {
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw(){
        c.save()
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore();
    }

    update() {
        this.x += this.velocity.x;
        this.velocity.y += gravity;
        this.y += this.velocity.y;
        this.alpha -= alphasub;
        this.draw();
    }
}

function init(){
    particles = [];
}

//animation loop
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
    c.fillRect  (0, 0, innerWidth, innerHeight);

    particles.forEach((particle, i) => {
        if(particle.alpha >= alphasub){
            particle.update();
        } else {
            particles.splice(i, 1);
        }
        
    })
}



init();
animate();
