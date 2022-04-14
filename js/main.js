var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//rectangles
c.fillRect(100, 100, 200, 200)
c.fillStyle = '#ccc'
c.fillRect(300, 300, 200, 200)
c.fillStyle = '#00f'
c.fillRect(500, 100, 200, 200)

//Lines
c.beginPath()
c.moveTo(50, 300)
c.lineTo(700, 50)
c.strokeStyle = "#f00"
c.stroke()

//Cercle

for (var i = 0; i < 1000; i++){
    var x = Math.random() * window.innerWidth
    var y = Math.random() * window.innerHeight
    c.beginPath()
    c.arc(x, y, 30, 0, Math.PI * 2, false)
    c.strokeStyle = "#f15477"
    c.stroke()
}

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
