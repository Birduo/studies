# Boids
Boids is an artificial life program simulating flocking that was created by Craig Reynolds in 1986. Each individual boid moves according to three "steering behaviors":

1. **Separation**: Avoid crowding local flockmates
2. **Alignment**: Align with the average heading of local flockmates
3. **Cohesion**: Move toward the average position of local flockmates

Each boid has access to the rest of the flock's position/velocity, but adjusts according to flockmates in a neighborhood around it. The neighborhood is defined by a distance and angle from the boid's position and heading.

::boids

### Sources
- [Craig Reynolds](http://www.red3d.com/cwr/boids/)
- [Boids Pseudocode](http://www.kfish.org/boids/pseudocode.html)
- [Boids Algorithm](https://vanhunteradams.com/Pico/Animal_Movement/Boids-algorithm.html)
- [p5.min.js](https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.2/p5.min.js)
- [boids.js](/simulation/boids.js)
