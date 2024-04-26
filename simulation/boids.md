# Boids
::boids

## About
Boids is an artificial life program simulating flocking that was created by Craig Reynolds in 1986. Each boid has access to the rest of the flock's position/velocity, but adjusts according to flockmates in a neighborhood around it. The neighborhood is defined by a distance and angle from the boid's position and heading.

The `Boid` class contains the following traits:
- `pos`: position vector (can get heading from `p5.Vector.heading()`)
- `vel`: velocity vector
- `accel`: acceleration vector
- `maxVel`: maximum velocity
- `separation_distance`: distance from boid to consider flockmates
- `angle`: angle of the boid's vision from their heading

## Steering
Each individual boid moves according to three "steering behaviors":

1. **Alignment**: Align with the average heading of local flockmates
```javascript
function align(others) {
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
```
2. **Cohesion**: Move toward the average position of local flockmates
```javascript
function cohere(others) {
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
```
3. **Separation**: Avoid crowding local flockmates
```javascript
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
```

### Sources
- [Craig Reynolds](http://www.red3d.com/cwr/boids/)
- [Boids Pseudocode](http://www.kfish.org/boids/pseudocode.html)
- [Boids Algorithm](https://vanhunteradams.com/Pico/Animal_Movement/Boids-algorithm.html)
- [p5.min.js](https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.2/p5.min.js)
- [boids.js](/simulation/boids.js)

### Navigation
- [Home](/README.md)
- [Simulation](/simulation)
