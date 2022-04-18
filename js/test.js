var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: undefined,
    y: undefined
}

var colors = ['#8ecae6', '#219ebc', '#023047', '#ffb703', '#fb8500']

let nbParticles = 10;
let minOpacity = 0.1;
let maxOpacity = 0.6;
let mouseRadius = 250;
let opacityStep = 0.02;

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

function Particle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: dx,
        y: dy
    }
    this.radius = radius;
    this.color = color;
    this.mass = radius * 2;
    //this.opacity = minOpacity;
    this.opacity = maxOpacity;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.save()
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }

    this.update = particles => {

        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue;
            if (distance(this.x, this.y, particles[i].x, particles[i].y) - (this.radius + particles[i].radius) < 0) {
                resolveCollision(this, particles[i])
            }
        }

        if (this.y + this.radius + this.velocity.y > canvas.height || this.y - this.radius + this.velocity.y < 0) {
            this.velocity.y = -this.velocity.y;
        }
        if (this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius + this.velocity.x < 0) {
            this.velocity.x = -this.velocity.x;
        }
        this.draw();

        //mouse collision
        /*if(distance(mouse.x, mouse.y, this.x, this.y) < mouseRadius && this.opacity < maxOpacity){
            this.opacity += opacityStep;
        }else if (this.opacity > minOpacity){
            this.opacity -= opacityStep

            this.opacity = Math.max(minOpacity, this.opacity);
        }*/

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

let particles;
function init() {
    particles = []
    var color = randomColor(colors);
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, 0, 0, 10, 'blue'));
    particles.push(new Particle(105, canvas.height / 2, 2, 0, 100, 'orange'))
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update(particles);
    })
}

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}
function distance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

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
