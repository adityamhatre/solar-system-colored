const mainAxis = 600
const center = [800, mainAxis]

let sunImage
let sunRotation = 0

const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
const planetImages = []
const planetYears = [0, 0, 0, 0, 0, 0, 0, 0]
const planetDays = [0, 0, 0, 0, 0, 0, 0, 0]
const planetSpeeds = [0.007, 0.005, 0.004, 0.003, 0.002, 0.001, 0.0005, 0.0001]
const planetDaySpeeds = [0.28, 0.2, 0.16, 0.12, 0.08, 0.04, 0.02, 0.004]
const basePlanetSpeeds = [0.007, 0.005, 0.004, 0.003, 0.002, 0.001, 0.0005, 0.0001]
const planetDistances = [0, 75, 150, 235, 370, 525, 650, 740]
const planetBaseDistance = 490

// saturn size is larger than jupiter because of the ring
const planetSizes = [25, 40, 40, 50, 110, 140, 40, 40]

function setup() {
    createCanvas(windowWidth, windowHeight)
    s = createSlider(1, 100, 1);
}

function preload() {
    // preload() runs once
    sunImage = loadImage('images/sun.png')
    planets.forEach(planet => planetImages.push(loadImage(`images/${planet}.png`)))

}

function draw() {
    background('#241f23')
    scale(1)
    for (let i = 0; i < planetSpeeds.length; i++) {
        planetSpeeds[i] = basePlanetSpeeds[i] * s.value()
    }

    sun()
    orbits()
    for (let i = 0; i < planetImages.length; i++) {
        planet(i)
    }
}

function diag() {
    stroke('#ffffff')
    fill('#ffffff')
    textSize(40)
    text(`x = ${mouseX}, y = ${mouseY}`, mouseX, mouseY)
}

function grid() {
    stroke('#ffffff')

    for (var i = 0; i < width; i += 20) {
        for (var j = 0; j < height; j += 20) {
            point(i, j)
        }
    }

    noStroke()
}

function sun() {
    const size = 400
    push()
    translate(center[0], center[1])
    imageMode(CENTER)
    rotate(sunRotation)
    sunRotation = (sunRotation + 0.01) % 360
    image(sunImage, 0, 0, size, size)
    pop()
}

function planet(planetIndex) {
    const planetDistance = planetBaseDistance + planetDistances[planetIndex]
    const planetSize = planetSizes[planetIndex]
    push()
    translate(center[0], center[1])

    const r = planetDistance
    const x = r * cos(planetYears[planetIndex])
    const y = r * sin(planetYears[planetIndex])

    translate(x, y)
    rotate(planetDays[planetIndex])
    imageMode(CENTER)
    image(planetImages[planetIndex], 0, 0, planetSize, planetSize)

    planetYears[planetIndex] = (planetYears[planetIndex] + planetSpeeds[planetIndex]) % 360
    planetDays[planetIndex] = (planetDays[planetIndex] + planetDaySpeeds[planetIndex]) % 360
    pop()
}

function orbits() {
    push()
    translate(center[0], center[1])
    imageMode(CENTER)

    stroke('#262425')
    strokeWeight(5)
    noFill()
    for (let i = 0; i < planetDistances.length; i++) {
        circle(0, 0, 2 * (planetBaseDistance + planetDistances[i]))
    }
    pop()
}