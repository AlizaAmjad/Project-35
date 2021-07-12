
var balloon,balloonImage1,balloonImage2;
// create database and position variable here

function preload(){
   CityBackground =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  database.ref("balloon/Position").on("value",function(data){
    var position = data.val()
    balloon.x = position.x
    balloon.y = position.y
  })
  textSize(20); 
}

// function to display UI
function draw() {
  background(CityBackground);

  if(keyDown(LEFT_ARROW)){
    changePosition(-7,0);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(7,0);
}
else if(keyDown(UP_ARROW)){
    changePosition(0,-7);
}
else if(keyDown(DOWN_ARROW)){
    changePosition(0,7);
}

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
}

function changePosition(x,y) {
  database.ref("balloon/Position").update({
    x:balloon.x+x,
    y:balloon.y+y
  })
}
