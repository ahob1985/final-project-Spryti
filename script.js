// Author: Jordan Muturi

// Global UI Variables
let canvasDiv;
let canvas;
let buttonDiv;
let nextButton;
let previousButton;
let restartButton;
let questions;
let answers;
let currentQuestion;

// Global ML Variables
let soundClassifier;
let isModelReady;


//https://teachablemachine.withgoogle.com/models/WU_JjxmsK/

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  background(230);
  textDiv = createDiv();
  textP = createP("Model loading, please wait...");
  textP.parent(textDiv);
  buttonDiv = createDiv();
  previousButton = createButton("Previous");
  previousButton.parent(buttonDiv);
  previousButton.mousePressed(function (){
    if(currentQuestion === 0) {
      currentQuestion = questions.length-1;
    } else {
      currentQuestion--;
    }
  })
  nextButton = createButton("Next");
  nextButton.parent(buttonDiv);
  nextButton.mousePressed(function () {
    if(currentQuestion === questions.length-1) {
      currentQuestion = 0;
    } else {
      currentQuestion++;
    }
  });
  restartButton = createButton("Restart");
  restartButton.parent(buttonDiv);

  let options = {
    probabilityThreshhold: 0.95
  };
  soundClassifier = ml5.soundClassifier( "https://teachablemachine.withgoogle.com/models/WU_JjxmsK/model.json", options, modelReady);
  questions = [
    'True or False: George Washington was the first president of the United States',
    'True or False: 2+2*2=8',
    'True or False: Whales are mammals',
    'True or False: The lungs are part of the digestive system'
  ];
  answers = [
    'true',
    'false',
    'true',
    'false',
    
  ]
  // if results[0].label === answers[currentQuestion], then "Correct!"
  currentQuestion = 0;
}

function draw() {
  if(isModelReady) {
    background(230);
    textSize(50);
    textAlign(CENTER);
    text(questions[currentQuestion], 20, 100, 600, 460);
    fill(0);
  }
}

function modelReady() {
  isModelReady = true;
  soundClassifier.classify(gotResults);
  textP.html("Answer the questions by saying 'true' or 'false'.");
}



function checkCommand() {
  let label = textP.html();
  if(label.includes("true")) {
    background(255, 0, 0);
  }
}

function gotResults(error, results) {
  if(error) {
    console.error(error);
  } else {
    let label = results[0].label;
    let confidence = round(results[0].confidence, 2) * 100;
    console.log(label);
  }
}
