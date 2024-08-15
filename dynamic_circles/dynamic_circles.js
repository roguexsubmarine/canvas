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

var maxRadius = 50;
var minRadius = 2;

window.addEventListener('mousemove', function(event){
    // console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse);
})


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
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if(Math.abs(mouse.x - this.x) < maxRadius && Math.abs(mouse.y - this.y) < maxRadius){
            if(this.radius < maxRadius){
                this.radius += 1;
            }
            
        } else if (this.radius > minRadius){
            this.radius -= 1;
        }

        
        this.draw();

    }
}

var circleArray = [];
var colorpalette = colorArray[(Math.floor(Math.random() * colorArray.length))];

function init(){
    circleArray = [];

    var arrayLength = Math.floor(innerHeight * innerWidth / 1500);
    console.log(arrayLength, " circles");


    for (var i = 0; i < arrayLength; i++){
        var radius = minRadius;
        var x = (Math.random() * (innerWidth - 2*radius)) + radius;
        var y = (Math.random() * (innerHeight - 2*radius)) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);

        // console.log(colorpalette);
        var color = colorpalette[Math.floor(Math.random() * colorpalette.length)];
        
        circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }

}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

init();
animate();
