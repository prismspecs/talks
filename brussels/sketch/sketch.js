/*

  - show a couple programming languages
  - get more into the syntax
  - prepare some links for Orsi
    - also some key concepts like variables, functions, loops, if statements, etc.
  - everything I will show will be in browser
    - so take a screenshot of VS Code
    - pictures of other languages
  - writing the code vs running the code example
    - this is what is handy about p5js, you can write and run in the same place
    - show a screenshot of terminal editing too


*/



// declaring variables
var x = 100;
var y = 100;

var speed = 4;
var xSpeed = 4;
var ySpeed = 5;

var life = 100;


function setup() {

  // full screen canvas
  createCanvas(windowWidth, windowHeight);


  // built-in variables
  x = width / 2;
  y = width / 2;

  // good example of only needing to run something in setup
  noStroke();
}

function draw() {
  background(220);
  fill(20, 20, 20);
  // first draw static
  // rect(100,200, 50,50);

  // then at mouse position, then talk about center
  // rect(mouseX, mouseY, 50, 50);

  // then make it move automatically
  rect(x, y, 50, 50);
  // x += 1;
  // then set speed var
  // x += speed;

  // then if statement
  if (x > width) {
    randomStart();
  }
  if (x < 0) {
    randomStart();
  }

  if (y > height) {
    randomStart();
  }
  if (y < 0) {
    randomStart();
  }

  // then random
  // ...

  x += xSpeed;
  y += ySpeed;

  // then because there is redundant code we speak about functions

}

function randomStart() {
  xSpeed = random(-5, 5);
  ySpeed = random(-5, 5);
  x = random(0, width);
  y = random(0, height);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
