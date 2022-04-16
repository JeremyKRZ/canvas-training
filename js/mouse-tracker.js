var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var effectRange = 50;
var effectSpeed = 3;
var maxBaseRadius = 5;
var minBaseRadius = 1;
var nb_circle = 2000;
var minSpeed = 3;
var maxSpeed = 3;

var colors = [
    '#8ecae6',
    '#219ebc',
    '#023047',
    '#ffb703',
    '#fb8500'
]

var circleArray = [];

for (var i = 0; i < nb_circle; i++) {

    var radius = randomIntFromRange(minBaseRadius, maxBaseRadius);
    var x = randomIntFromRange(radius, innerWidth-radius);
    var y = randomIntFromRange(radius, innerHeight-radius);
    var vx = randomIntFromRange(minSpeed, maxSpeed);
    var vy = randomIntFromRange(minSpeed, maxSpeed);
    var dx = (Math.random() < 0.5 ? -1 : 1) * vx;
    var dy = (Math.random() < 0.5 ? -1 : 1) * vy;

    circleArray.push(new Circle(x, y, dx, dy, radius))
}

animate();



/*************************** FONCTIONS **************************************/
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = randomColor(colors)

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interact
        if (mouse.x - this.x < effectRange && mouse.x - this.x > -effectRange
            && mouse.y - this.y < effectRange && mouse.y - this.y > -effectRange) {
            if (this.radius < effectRange) {
                this.radius += effectSpeed;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= effectSpeed;
        }

        this.draw();
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)];
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

// //rectangles
// c.fillRect(100, 100, 200, 200)
// c.fillStyle = '#ccc'
// c.fillRect(300, 300, 200, 200)
// c.fillStyle = '#00f'
// c.fillRect(500, 100, 200, 200)

// //Lines
// c.beginPath()
// c.moveTo(50, 300)
// c.lineTo(700, 50)
// c.strokeStyle = "#f00"
// c.stroke()
