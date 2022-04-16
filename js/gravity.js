var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: undefined,
    y: undefined
}

var colors = ['#8ecae6', '#219ebc', '#023047', '#ffb703', '#fb8500']

var gravity = 1;
var defaultGravity = gravity;
var friction = 0.9;
var nbBalls = 50;
var defaultNbBalls = nbBalls;
var minRadius = 20;
var defaultMinRadius = minRadius;
var maxRadius = 40;
var defaultMaxRadius = maxRadius;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener('keydown', function (e) {
    if (e.key == ' ') {
        init();
    }
})

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }

    this.update = function () {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius + this.dx < 0) {
            this.dx = -this.dx * (friction/2);
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

var ballArray;

function init() {
    ballArray = [];
    for (var i = 0; i < nbBalls; i++) {
        var radius = randomIntFromRange(minRadius, maxRadius);
        var x = randomIntFromRange(maxRadius, canvas.width - maxRadius)
        var y = randomIntFromRange(maxRadius, canvas.height / 2)
        var dx = randomIntFromRange(-2, 2);
        var dy = randomIntFromRange(-2, 2);
        var color = randomColor(colors)
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

document.querySelector('.options-button').addEventListener('click', function () {
    options = document.querySelector('.options-content')
    if (options.classList.contains('show')) {
        options.classList.remove('show')
    } else {
        options.classList.add('show')
    }
})
document.querySelector('.apply').addEventListener('click', function () {
    userBalls = parseInt(document.getElementById("nb-billes").value)
    userMin = parseInt(document.getElementById("min-size").value)
    userMax = parseInt(document.getElementById("max-size").value)
    userGravity = parseFloat(document.getElementById("gravity").value)

    nbBalls = (isNaN(userBalls) ? defaultNbBalls : userBalls);
    minRadius = (isNaN(userMin) ? defaultMinRadius : userMin);
    maxRadius = (isNaN(userMax) ? defaultMaxRadius : userMax);
    gravity = (isNaN(userGravity) ? defaultGravity : userGravity);


    init();
})


/**********************************  Main ****************************************/
init();
animate();




//Add gravity Force
//Add Mass to balls
//Add collision coeff with ground
//Add real velocity and direction
//Add friction on ground
//Bonus : Add air resistance
//Bonus : Add collision between balls

