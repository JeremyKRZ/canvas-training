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

var radius = 30
var canvas_border = 5
var limit = radius + canvas_border

var x = Math.random() * ((innerWidth - limit) -limit) + limit
var y = Math.random() * ((innerHeight - limit) - limit) + limit;
vitesse = 5;
var dx = (Math.random() < 0.5 ? -1 : 1) * vitesse;
var dy = (Math.random() < 0.5 ? -1 : 1) * vitesse;

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight)
    c.beginPath()
    c.arc(x, y, radius, 0, Math.PI * 2, false)
    c.strokeStyle = "blue"
    c.stroke()

    if (x + limit > innerWidth || x - limit < 0){
        dx = -dx;
    }

    if (y + limit > innerHeight || y - limit < 0){
        dy = -dy;
    }
    x+=dx
    y+=dy
}

animate()


window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
