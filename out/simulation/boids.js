// creating boids in p5.js

let width = window.innerWidth * .60
let height = window.innerHeight * .40

let boids = []

const size = Math.min(width, height) / 20
const separation_distance = size * 2
console.log(`Size: ${size}`)
console.log(`Separation distance: ${separation_distance}`)

let boid_count = Math.min(100, Math.floor(width / size))

class Boid {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.vel = p5.Vector.random2D()
        this.accel = createVector()
        this.maxVel = 2
        this.angle = 90
        this.maxForce = 0.03 // max steering force
    }

    // boids try to match velocity with nearby boids
    align(others) {
        let steering = createVector()
        let total = 0
        for (let other of others) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
            // add to steering if in neighborhood
            if (other != this && d < this.angle) {
                steering.add(other.vel)
                total++
            }
        }
        
        // align with the average heading if flockmates in neighborhood
        if (total > 0) {
            steering.div(total)
            steering.setMag(this.maxVel)
            steering.sub(this.vel)
            steering.limit(this.maxForce)
        }

        return steering
    }

    // boids try to move towards the center of mass of nearby boids
    cohere(others) {
        let steering = createVector()
        let total = 0
        for (let other of others) {
            // get distance between this boid and the other
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
            if (other != this && d < this.angle) {
                steering.add(other.pos)
                total++
            }
        }

        // move towards the average position of flockmates in neighborhood
        if (total > 0) {
            steering.div(total)
            steering.sub(this.pos)
            steering.setMag(this.maxVel)
            steering.sub(this.vel)
            steering.limit(this.maxForce)
        }

        return steering
    }

    // boids try to keep a small distance from other boids
    separate(others) {
        let steering = createVector()
        let total = 0
        for (let other of others) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
            if (other != this && d < separation_distance) {
                // track the difference between the two positions
                let diff = p5.Vector.sub(this.pos, other.pos)
                diff.div(d)
                steering.add(diff)
                total++
            }
        }

        // move away from nearby flockmates
        if (total > 0) {
            steering.div(total)
            steering.setMag(this.maxVel)
            steering.sub(this.vel)
            steering.limit(this.maxForce)
        }

        return steering
    }

    flock(others) {
        let alignment = this.align(others)
        let cohesion = this.cohere(others)
        let separation = this.separate(others)
        this.accel.add(alignment)
        this.accel.add(cohesion)
        this.accel.add(separation)
    }

    move() {
        // update position, velocity, and acceleration
        this.accel.set()
        this.flock(boids)

        this.vel.add(this.accel)
        this.pos.add(this.vel)

        // loop around the edges
        if (this.pos.x > width) this.pos.x = 0
        if (this.pos.x < 0) this.pos.x = width
        if (this.pos.y > height) this.pos.y = 0
        if (this.pos.y < 0) this.pos.y = height
    }

    show() {
        noStroke()
        fill(112, 174, 110)
        circle(this.pos.x, this.pos.y, size)
    }
}


function setup() {
    let canvas = createCanvas(width, height)
    console.log(`Successfully created canvas with dims {width, height}: {${width}, ${height}}`)
    canvas.parent('boids')
    angleMode(DEGREES)

    background(34, 29, 35)

    fill(112, 174, 110)

    for (let i = 0; i < boid_count; i++) {
        boids.push(new Boid(random(width), random(height)))
    }
}

function draw() {
    background(34, 29, 35)

    // enumerate over boid and the others
    for (let boid of boids) {
        boid.move()
        boid.show()
    }
}
