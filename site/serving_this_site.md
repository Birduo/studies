# Serving This Site 

... I'm back.


This website was made a while ago with the help of [hgen](https://github.com/Birduo/hgen), my haskell-based static site generator.
But that only generates the site, it doesn't serve it. So, I wrote a simple server to host the site.

However, running the server became problematic between moving, where it would be run, and how I would even get a public IP to run it on. 
Thankfully, this problem is solved by a raspberry pi! Using reverse tunneling, I can run the server from my home, and have it served from the raspberry pi.

Now, adding files like this one becomes as easy as a "make" and "git push" before pulling it on the server for the rest of you to see!
It's a bit more motivating to write when there's something to write on, so hopefully I will continue to add to this site after that "small" (a couple years?) hiatus.


I have a lot of ideas for this site, and I'm sure I will add more to it over time.
For Quantum Computing, I'm thinking of adding discussion on:
- QML (Quantum Machine Learning)
- Google's Sycamore Chip

And potentially more on language learning, as learning Mandarin has taught me quite a bit about both the structure of languages as well as how to effectively learn and acquire them.

### Navigation
- [Home](/)
- [Site](/site.md)

```js
document.title = "Serving This Site"
```
