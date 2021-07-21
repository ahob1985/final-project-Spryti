// Author: Jordan Muturi

// Global UI Variables
let canvasDiv;
let canvas;
let button;
let buttonDiv;



// Global ML Variables
let soundClassifier
let isModelReady
//https://teachablemachine.withgoogle.com/models/ygn8eLEP0/model.json

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  background(0, 100, 200);
  buttonDiv = createDiv();
  button = createButton("Listen");
  button.parent(buttonDiv);
  soundClassifier = ml5.soundClassifier
}

function draw() {

}

function isModelReady() {
  
}

function checkAnswer() {

}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    let label = results[0].label;
    let confidence =  round(results[0].confidence, 2);
  }
}
