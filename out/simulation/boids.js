// creating boids in p5.js

let width = window.innerWidth * .60
let height = window.innerHeight * .40

let boids = []

class Boid {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.vx = random(-1, 1)
        this.vy = random(-1, 1)
        this.angle = random(360)

        this.close_dx = 0
        this.close_dy = 0
    }

    move() {
        
    }

    show() {
        fill(112, 174, 110)
        circle(this.x, this.y, 5)
    }
}

function setup() {
    let canvas = createCanvas(width, height)
    canvas.parent('boids')
    angleMode(DEGREES)

    background(34, 29, 35)

    fill(112, 174, 110)
    for (let i = 0; i < 100; i++) {
        boids.push(new Boid(random(width), random(height)))
    }
}

function draw() {
    background(34, 29, 35)

    for (let boid of boids) {
        boid.move()
        boid.show()
    }
}
