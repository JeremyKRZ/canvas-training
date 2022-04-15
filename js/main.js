var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

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

//Cercle

// for (var i = 0; i < 500; i++){
//     var x = Math.random() * window.innerWidth
//     var y = Math.random() * window.innerHeight
//     c.beginPath()
//     c.arc(x, y, 30, 0, Math.PI * 2, false)
//     c.strokeStyle = "#00f"
//     c.stroke()
// }

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = (Math.random() < 0.5 ? 'blue' : 'red');

    if (x < innerWidth / 2) {
        this.color = 'blue';
    }
    else {
        this.color = 'red';
    }

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

        this.draw();
    }
}

var nb_circle = 100;
var min_speed = 1;
var max_speed = 4;

var circleArray = [];
for (var i = 0; i < nb_circle; i++) {

    var radius = 30;
    var x = Math.random() * ((innerWidth - radius) - radius) + radius;
    var y = Math.random() * ((innerHeight - radius) - radius) + radius;
    var vx = Math.floor(Math.random() * (max_speed - min_speed + 1)) + min_speed;
    var vy = Math.floor(Math.random() * (max_speed - min_speed + 1)) + min_speed;
    var dx = (Math.random() < 0.5 ? -1 : 1) * vx;
    var dy = (Math.random() < 0.5 ? -1 : 1) * vy;

    circleArray.push(new Circle(x, y, dx, dy, radius))
}

// MAIN
console.log(circleArray);
animate();


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
