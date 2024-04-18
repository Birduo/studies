// creating an l-system in p5.js

let width = window.innerWidth * .60
let height = window.innerHeight * .40
let angle = 30

let rules = {
    'F': ['F', 'F+F-F-F+F', 'F-F+F+F-F', 'FF+[+F-F-F]-[-F+F+F]', 'F[+F]F[-F]F', 'FF-[-F+F+F]+[+F-F-F]']
}

function setup() {
    let canvas = createCanvas(width, height)
    canvas.parent('lsystem')
    angleMode(DEGREES)

    background(34, 29, 35)

    let system = l_system('F', rules, 5)
    draw_system(system, width / 2, height, width, height)
}

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

function draw_system(system, x, y, w, h) {
    strokeWeight(2)
    stroke(112, 174, 110)

    // length of each line segment as a fn of width and height
    let fcount = system.match(/F/g).length
    let len = Math.min(w, h) / (log(fcount) + 1) ** 2

    push()

    translate(x, y)
    for (let i = 0; i < system.length; i++) {
        let c = system[i]
        
        switch (c) {
            case 'F':
                line(0, 0, 0, -len)
                translate(0, -len)
                break
            case '+':
                rotate(angle)
                break
            case '-':
                rotate(-angle)
                break
            case '[':
                push()
                break
            case ']':
                pop()
                break
            default: break
        }
    }

    pop()
}


