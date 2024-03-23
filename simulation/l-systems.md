# L-Systems

L-systems, or Lindenmayer systems, are a way of simulating bacteria, plant, and fractal growth. 
This is done using recursive string rewriting and a way to render strings to a 2D or 3D space, which can be used to create multiple general rulesets.

Recursive string rewriting is used in L-systems to generate the "growth" of the preferred organism. 
This is done using a set of rules that are applied to modify a given string recursively. 
Consider the following L-system: 
```
A -> AB
B -> A
```
Given a "seed" string of "A" at generation `n = 0`, the above rules would generate a string of "AB" at generation `n = 1`.
Following this context, here are some further generations.
```
0: A
1: AB
2: ABA
3: ABAAB
4: ABAAABA
```
Note how this is done on the whole string, and not just the end portion of the string.

### Sources
- [Wikipedia](https://en.wikipedia.org/wiki/L-system)
- [Jordan Santell](https://jsantell.com/l-systems/)