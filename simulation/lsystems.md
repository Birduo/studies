# L-Systems
L-systems, or Lindenmayer systems, are a way of simulating bacteria, plant, and fractal growth. 
This is done using recursive string rewriting and a way to render strings to a 2D or 3D space, which can be used to create multiple general rulesets.

Recursive string rewriting is used in L-systems to generate the "growth" of the preferred organism. 
This is done using a set of rules that are applied to modify a given string recursively. 
Consider the following L-system: 
```
F -> F, F+F-F-F+F, F-F+F+F-F, FF+[+F-F-F]-[-F+F+F], F[+F]F[-F]F, FF-[-F+F+F]+[+F-F-F]
```
This ruleset is used to generate a plant-like structure in 2D space.
Note how this is done on the whole string, and not just the end portion of the string.

::lsystem

This system was built in a string format with this code:
```javascript
function l_system(current, rules, generations) {
    let next = '';
    for (let i = 0; i < generations; i++) {
        for (let j = 0; j < current.length; j++) {
            let c = current[j]
            if (rules[c]) {
                next += random(rules[c])
            } else {
                next += c
            }
        }
        current = next
        next = ''
    }

    return current
}
```

### Sources
- [Wikipedia](https://en.wikipedia.org/wiki/L-system)
- [Jordan Santell](https://jsantell.com/l-systems/)
- [p5.min.js](https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.2/p5.min.js)
- [lsystems.js](/simulation/lsystems.js)

### Navigation
- [Home](/README.md)
- [Simulation](/simulation)

```js
document.title = "L-Systems";
```
