let whiteDots = []; // Empty array holding the white dots in the background

// The size of the background circle
let backgroundCircleSize = 50;

// This class is for circles with colours, including x and y position, radius and colour.
class ColoredCircle {
  constructor(x, y, radius, colors) {
    this.position = createVector(x, y);
    this.initialPosition = createVector(x, y);
    this.radius = radius;
    this.colors = colors;
    this.colorIndex = 0; // Colour index for tracking the current small circle
    this.targetColorIndex = 1; // tracking the target colour index
    this.lerpAmount = 0; 
    this.lerpSpeed = 0.2; // Interpolation speed
  }

  draw() {
    noStroke();
    
    for (let i = this.colors.length - 1; i >= 0; i--) {
      fill(this.colors[i]);
      ellipse(this.position.x, this.position.y, backgroundCircleSize * (i + 1) * 2);
    }

    // Draw the small circle in the middle and perform a colour transformation
    fill(this.colors[this.colorIndex]);
    ellipse(this.position.x, this.position.y, this.radius * 2);

    this.lerpAmount += this.lerpSpeed;
    if (this.lerpAmount >= 2) {
      //When the interpolated amount is greater than or equal to 1, the colour is switched and the amount is reset
      this.colorIndex = this.targetColorIndex;
      this.targetColorIndex = (this.targetColorIndex + 1) % this.colors.length;
      this.lerpAmount = 0;
    }
  }

  reset() {
    this.position.set(this.initialPosition);
    this.colorIndex = 0; // Reset colour index to 0 on recovery
    this.targetColorIndex = 1; 
    this.lerpAmount = 0; 
  }
}

let coloredCircles = [];
let lines = []; 
let whiteDotParticles = []; // Particle system for saving white dots particles
let isDrawing = false;

function setup() {
  createCanvas(600, 600);
  background(4, 80, 111);

  // Randomly draw white dots on the background
  for (let i = 0; i < 200; i++) {
    let x = random(width); // randomly x position
    let y = random(height); // randomly y position
    whiteDots.push(createVector(x, y));  
    noStroke();
    fill(255); 
    ellipse(x, y, 5); 
  }

  // draw background circle
  let largeCircleColors = [
    color(217, 233, 237),
    color(174, 195, 112),
    color(253, 185, 93),
    color(255, 200, 198),
    color(246, 232, 141),
    color(235, 203, 246),
    color(67, 200, 176)
  ];

  let mediumCircleColors = [
    color(14, 13, 116),
    color(9, 102, 23),
    color(244, 68, 46),
    color(229, 83, 192),
    color(239, 126, 45),
    color(253, 185, 93),
    color(250, 251, 253)
  ];

  let smallCircleColors = [
    color(244, 147, 96),
    color(228, 93, 86),
    color(0, 0, 0),
    color(174, 195, 112),
    color(38, 75, 207),
    color(155, 100, 209),
    color(63, 73, 97)
  ];

  let circlePositions = [
    createVector(250, 10),
    createVector(40, 200),
    createVector(510, 100),
    createVector(300, 300),
    createVector(80, 470),
    createVector(340, 580),
    createVector(560, 400)
  ];

  for (let i = 0; i < circlePositions.length; i++) {
    let colorsSet = [largeCircleColors[i], mediumCircleColors[i], smallCircleColors[i]];
    coloredCircles.push(new ColoredCircle(circlePositions[i].x, circlePositions[i].y, 120, colorsSet));
  }

  // Particle system for creating white dots particles(search)
  let whiteDotSystemPosition = createVector(width / 2, height / 2);
  whiteDotParticles.push(new ParticleSystem(whiteDotSystemPosition));
}

function draw() {
  background(4, 80, 111);

  for (let circle of coloredCircles) {
    circle.draw();
  }

  // draw background dot
  for (let dot of whiteDots) {
    noStroke();
    fill(255);
    ellipse(dot.x, dot.y, 5);
  }

  // Updating and displaying the white dots particle system
  for (let particleSystem of whiteDotParticles) {
    particleSystem.run();
    particleSystem.addParticle(); // add new particle
  }

  // draw line
  for (let line of lines) {
    line.draw();
  }

  fill(1);
  textSize(16);
  textAlign(LEFT);
  text('Use arrow keys to move circles', 10, height - 60);
  text('Press "A" to enlarge circles', 10, height - 40);
  text('Press "B" to shrink circles', 10, height - 20);
  text('Right-click to create particle system', 10, height - 80);
  text('hold mouse to draw line', 10, height - 100);
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    // If it's the up arrow key, you can move all the circles upwards
    for (let circle of coloredCircles) {
      circle.position.y -= 5; // Move up 5 pixels
    }
  } else if (keyCode === DOWN_ARROW) {
    // If it's the down arrow key, you can move all the circles downwards
    for (let circle of coloredCircles) {
      circle.position.y += 5; 
    }
  } else if (keyCode === RIGHT_ARROW) {
    // If it is the right arrow key, you can move all the circles to the right
    for (let circle of coloredCircles) {
      circle.position.x += 5; 
    }
  } else if (keyCode === LEFT_ARROW) {
    // If it is the left arrow key, you can move all circles to the left
    for (let circle of coloredCircles) {
      circle.position.x -= 5; 
    }
  } else if (key === 'b' || key === 'B') {
    // If you press the ‘s’ key, you can reduce the size of all the circles.
    for (let circle of coloredCircles) {
      circle.radius -= 5; 
    }
  } else if (key === 'a' || key === 'A') {
    // If you press the ‘b’ key, you can increase the size of all circles.
    for (let circle of coloredCircles) {
      circle.radius += 5;
    }
  } else if (key === ' ' || key === ' ') {
    // If you press the keyboard, you can restore all circles and strokes to their original state.
    for (let circle of coloredCircles) {
      circle.reset(); 
    }
    lines = []; 
  }
}

function mousePressed() {
  isDrawing = true; // Starts drawing when the mouse is pressed
    if (mouseButton === RIGHT) { // If the right mouse button is pressed
      let particleSystem = new ParticleSystem(createVector(mouseX, mouseY));
      whiteDotParticles.push(particleSystem);
    }
  }


function mouseReleased() {
  isDrawing = false; //Stop drawing when the mouse is released.

}

function mouseDragged() {
  if (isDrawing) {
    let line = new Line(pmouseX, pmouseY, mouseX, mouseY, color(random(255), random(255), random(255))); // 创建一个新的线条，颜色随机
    lines.push(line);
  }
}

// line classication
class Line {
  constructor(x1, y1, x2, y2, strokeColor) {
    this.start = createVector(x1, y1);
    this.end = createVector(x2, y2);
    this.strokeColor = strokeColor;
  }

  // draw line
  draw() {
    stroke(this.strokeColor);
    strokeWeight(2);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}

// particle classication
class Particle {
  constructor(position) {
    this.position = position.copy();
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.alpha = 255;
  }

  // update particle 
  update() {
    this.position.add(this.velocity);
    this.alpha -= 1; // Reduced transparency
  }

  draw() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.position.x, this.position.y, 5, 5);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

// particle system classication
class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
  }

  // add new particle
  addParticle() {
    let p = new Particle(this.origin);
    this.particles.push(p);
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.update();
      p.draw();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}

