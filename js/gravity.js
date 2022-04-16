const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: undefined,
    y: undefined
}

const colors = ['#8ecae6', '#219ebc', '#023047', '#ffb703', '#fb8500']

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

function Object(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    this.update = function() {
        this.draw()
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}


/**********************************  Main ****************************************/
animate();

