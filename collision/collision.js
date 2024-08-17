var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

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


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y
})

function distance(x1, y1, x2, y2){
    const xdist = x2 - x1;
    const ydist = y2 - y1;
    return Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2));
}

function randomint(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function rotate(velocity, angle){
    const rotated = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotated;
}

function resolveCollision(particle1, particle2){

    const xvel = particle1.dx - particle2.dx;
    const yvel = particle1.dy - particle2.dy;

    const xdist = particle2.x - particle1.x;
    const ydist = particle2.y - particle1.y;

    if(xvel * xdist + yvel * ydist >= 0){
        const angle = -Math.atan2(particle2.y - particle1.y, particle2.x - particle1.x);
        
        let m1 = particle1.radius;
        let m2 = particle2.radius;

        const vel1 = {
            x: particle1.dx,
            y: particle1.dy
        }
        const vel2 = {
            x: particle2.dx,
            y: particle2.dy
        }

        const u1 = rotate(vel1, angle);
        const u2 = rotate(vel2, angle);

        const v1 = {x: u1.x * (m2 - m1) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
        const v2 = {x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};

        const vfin1 = rotate(v1, -angle);
        const vfin2 = rotate(v2, -angle);

        particle1.dx = vfin1.x;
        particle1.dy = vfin1.y;

        particle2.dx = vfin2.x;
        particle2.dy = vfin2.y;

    }

}


function Particle(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        

        //for interactivity
        if(Math.abs(mouse.x - this.x) < 100 && Math.abs(mouse.y - this.y) < 100){
            c.strokeStyle = this.color;
            c.stroke();
        }
        else{
            c.fillStyle = this.color;
            c.fill();
        }
        
    }

    this.update = function(){
        for(let i = 0; i < particles.length; i++){
            if(this == particles[i]) continue;
            if(distance(this.x, this.y, particles[i].x, particles[i].y) < this.radius + particles[i].radius){
                resolveCollision(this, particles[i]);
            }


        }


        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;
        
        this.draw();    

    }
}

let particles;
var colorpalette = colorArray[randomint(0, colorArray.length)];

function init(){
    particles = [];

    var arrayLength = Math.floor(innerHeight * innerWidth / 10000);
    console.log(arrayLength, " circles");


    for (var i = 0; i < arrayLength; i++){
        const radius = 18;
        let x = (Math.random() * (innerWidth - 2*radius)) + radius;
        let y = (Math.random() * (innerHeight - 2*radius)) + radius;
        const dx = (Math.random() - 0.5);
        const dy = (Math.random() - 0.5);

        // console.log(colorpalette);
        var color = colorpalette[randomint(0, colorpalette.length)];

        if(i !== 0){
            for(let j = 0; j < particles.length; j++){
                if(distance(x, y, particles[j].x, particles[j].y) < radius + particles[j].radius){
                    x = (Math.random() * (innerWidth - 2*radius)) + radius;
                    y = (Math.random() * (innerHeight - 2*radius)) + radius;
                    j = -1;
                }
            }
        }
        
        particles.push(new Particle(x, y, dx, dy, radius, color));
    }

}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    particles.forEach(element => {
        element.update();
    });
}

init();
animate();
