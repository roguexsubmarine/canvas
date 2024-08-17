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

var gravity = 1;
var friction = 0.9;
var maxVelocity = 25;

var mouse = {
    x: undefined,
    y: undefined
}

function Circle(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
        if(this.x + this.radius + this.dx > innerWidth || this.x - this.radius + this.dx < 0){
            this.dx = -this.dx;

        }
        if(this.y + this.radius + this.dy > innerHeight || this.y - this.radius + this.dy < 0){
            this.dy = -this.dy * friction;
            this.dx = this.dx * friction;


        } else {
            this.dy += gravity;
        }
    
        this.x += this.dx;
        this.y += this.dy;
        
        this.draw();
    }


    this.updateClick = function(){
        if(mouse.y - this.y < 0){
            ratio = 1 - (Math.abs(mouse.x - this.x) / canvas.width);
            ratio *= ratio;
            this.dy = - maxVelocity * ratio * Math.random();
            this.dx =  - Math.random() * (this.dy / 5 * ((mouse.x - this.x) / Math.abs(mouse.x - this.x)));
        }
        
    }
}

var circleArray = [];
var colorpalette = colorArray[(Math.floor(Math.random() * colorArray.length))];

function init(){
    circleArray = [];

    var arrayLength = Math.floor(innerHeight * innerWidth / 5000);
    console.log(arrayLength, " circles");


    for (var i = 0; i < arrayLength; i++){
        var radius = 15 + (Math.random() * 10);
        var x = (Math.random() * (innerWidth - 2*radius)) + radius;
        var y = (Math.random() * (innerHeight - 2*radius)) + radius;
        var dx = (Math.random() - 0.5) * 5;
        var dy = (Math.random() - 0.5) * 5;

        // console.log(colorpalette);
        var color = colorpalette[Math.floor(Math.random() * colorpalette.length)];
        
        circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

window.addEventListener('click', function(event){
    // console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;

    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].updateClick();
    }
    
})

window.addEventListener('keypress', function(){
    init();
})

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

init();
animate();
