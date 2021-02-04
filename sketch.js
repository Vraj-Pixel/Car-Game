var Bground,backgroundImage;
var car,carImage; 
var obstacle,obstacleImage,obstacleGroup;
var ground;
var score=0;
var PLAY =1;
var END=0;
var gameState=PLAY;
var carSound;
var restart,restartImage;
var gameOver,gameOverImage;
var carSound,checkPointSound,dieSound;


function preload(){
 backgroundImage=loadImage("Background.jpg");
 carImage=loadImage("Car1.png");
 obstacleImage=loadImage("stone.png");
 carSound=loadSound("CIVIC+passing+at+high+speed.mp3");
 gameOverImage=loadImage("gameOver.png");
 restartImage=loadImage("restart.png");
 checkPointSound=loadSound("checkPoint.mp3");
 dieSound=loadSound("die.mp3");
  
}

function setup() {
 createCanvas(800,500);
 Bground=createSprite(300,300);
 Bground.addImage(backgroundImage);
 Bground.scale=1;
 
 
  
  car=createSprite(100,350);
  car.addImage(carImage);
  car.scale=0.2;
  
  
    
  
  ground=createSprite(400,410,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver=createSprite(400,230);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5
  
  restart=createSprite(400,275);
  restart.addImage(restartImage);
  restart.scale=0.5;
  
  car.setCollider("circle",0,0);
 
 obstacleGroup=createGroup();
 
  //car.debug=true;
}

function draw(){ 
  background(255);
  
   car.collide(ground);

  camera.position.x;
  
  ground.x=ground.width/2;
  
  Bground.velocityX=-2
  
   if(Bground.x<300){
    Bground.x=Bground.width/2
  }
  
  console.log(car.y);
  
  if(gameState===PLAY){
    
  
    gameOver.visible = false;
    restart.visible = false;
    
    
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    Bground.X=Bground.width/2;
  
   //carSound.play();
 
  
  if(keyDown("space")&&car.y>=150){
    car.velocityY=-10;
  }
  car.velocityY=car.velocityY+1.5;
  
  
  spawnObstacles();
    
  obstacleGroup.velocityX = -(4 + 3* score/100)

  if(obstacleGroup.isTouching(car)){
    gameState=END;
    dieSound.play();
  }
}
  
  else if(gameState===END){
    gameOver.visible = true;
    restart.visible = true;
    
    Bground.velocityX=0;
    obstacleGroup.velocityX=0;
    
    if(mousePressedOver(restart)){
      reset();
    }
    
    car.collide(ground);
    
    //carSound.stop();
    
  }
  
 stroke("white");
 textSize(15);
 fill("black");
  
 drawSprites();
  text("Score:"+score,700,100);
  

  
  
}

function spawnObstacles(){
 if (frameCount % 100 === 0){
    var obstacle = createSprite(500,300,10,40);
    obstacle.y=Math.round(350,400);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-8;
    obstacle.lifetime=600;
    obstacleGroup.add(obstacle);
  }
 }

function reset(){ 
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  obstacleGroup.destroyEach();
  score=0
 
}
