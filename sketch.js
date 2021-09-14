var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop,obsTop1,obsTop2;
var obsBot1,obsBot3,obsBot2;
var gameOver,gameOverimg;
var restart,restartImg;
var obstacleBottom;
var score =0

var PLAY=1;
var END=0;
var gamestate= PLAY;


function preload(){
bgImg = loadImage("assets/bg.png")
bgImg2 = loadImage("assets/bgImg2.jpg");

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

gameOverimg= loadImage("assets/gameOver.png");
restartImg= loadImage("assets/restart.png");


obsTop1=loadImage("assets/obsTop1.png");
obsTop2=loadImage("assets/obsTop2.png");

obsBot1= loadImage("assets/obsBottom1.png");
obsBot2= loadImage("assets/obsBottom2.png");
obsBot3= loadImage("assets/obsBottom3.png");

jumpSound= loadSound ("assets/jump.mp3");
dieSound = loadSound("assets/die.mp3");
}

function setup(){

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;
balloon.debug= true;

topObstacleGroup= new Group();
BottomObstacleGroup= new Group();

barGroup= new Group();

gameOver= createSprite(220,200);
restart= createSprite(220,240);
gameOver.addImage(gameOverimg);
gameOver.scale=0.5;
restart.addImage(restartImg);
restart.scale=0.5;
gameOver.visible= false;
restart.visible= false;



}

function draw() {
  
  background("black");

  if(gamestate=== PLAY){
    balloon.velocityY= -6;
  }
        balloon.velocityY= balloon.velocityX +2;
        jumpSound.play();
        BarProp();

        spawnObstaclesTop();
        spawnObstaclesBottom();

        if(topObstacleGroup.isTouching(balloon) || balloon.isTouching(topGround) || balloon.isTouching(bottomGround) || BottomObstacleGroup.isTouching(balloon)){

gamestate= END;
dieSound.play();

        }

      if(gamestate=== END){
       
        gameOver.visible= true;
        gameOver.depth = gameOver.depth+1
        restart.visible = true;
        restart.depth = restart.depth+1

        balloon.velocityX= 0;
        balloon.velocityY= 0;


        topObstacleGroup.setLifetimeEach(-1);
        BottomObstacleGroup.setLifetimeEach(-1);

  
        balloon.y=200;

        if(mousePressedOver(restart)){
          reset();

        }


      }


    



        //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
   
        drawSprites();
        
}

function spawnObstaclesTop(){

if(World.frameCount % 60===0){
  obstacleTop= createSprite(400,50,40,50);

  obstacleTop.scale= 0.1;
  obstacleTop.velocity=-4;

  obstacleTop.y= Math.round(random(10,100));

var rand= Math.round(random(1,2));
switch(rand){
case 1:obstacleTop.addImage(obsTop1);
  break;
  case 2:obstacleTop.addImage(obsTop2);
  break;
  default:break;

}

obstacleTop.lifetime= 100;

balloon.depth= balloon.depth+1;

topObstacleGroup.add(obstacleTop);

}
}
function spawnObstaclesBottom(){
  if(World.frameCount % 60===0){
    obstacleBottom= createSprite(400,350,40,50);
  
    obstacleBottom.scale= 0.7;
    obstacleBottom.velocityX=-4;

  
  var rand= Math.round(random(1,3));
  switch(rand){
  case 1:obstacleBottom.addImage(obsBot1);
    break;
    case 2:obstacleBottom.addImage(obsBot2);
    break;
    case 3:obstacleBottom.addImage(obsBot3);
    break;
    default:break;
  
  }
  
  obstacleBottom.lifetime= 100;
  
  balloon.depth= balloon.depth+1;
  
  BottomObstacleGroup.add(obstacleBottom);

  
}




}
function BarProp(){

if(World.frameCount%60 ===0){
  var bar = createSprite(400,200,10,800)
  bar.velocityX=-6

  bar.velocityX=-6
  bar.depth= balloon.depth;
  bar.lifetime=70;
  bar.visible= false;

  barGroup.add(bar);


}

}
function score(){
if(balloon.isTouching(barGroup)){
  score=score+1;

}
textFont("algerian");
textSize(30)
Fill("yellow");
text("score:"+ score,250,50);
}

async function getBackgroundImg(){

var response =await fetch("http: //worldtimeapi.org/api/timezone/Asia/Kolkata");

var responseJSON =await response.json();

var datetime =responseJSON.datetime;
var hour = datetime.slice(11,13);

if(hour>=06 && hour<=19){

  bg.addImage(bgImg);
  bg.scale= 1.3;



}

else{
  bg.addImage(bgImg2);
  bg.scale= 1.5;
  bg.x=200;
  bg.y=200;
}


  
}