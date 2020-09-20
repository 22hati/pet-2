var dog,happyDog,database,foodStock=0,foodObj;
var foodS,fedTime,lastFed,addFood,feed;

function preload() {
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 400);

  database = firebase.database();

  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  feed=createButton("Feed Clifford");
  feed.position(700,65);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(620,65);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
  
  doggy= createSprite(250,250);
  doggy.addImage(dog);
  doggy.scale=0.15;
}


function draw() { 
  background("green"); 

  foodObj.display();

  fedTime=database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  textSize(15);
  textAlign(CENTER);
  fill("white");
  if(lastFed>=12) {
    text("Last Fed : "+lastFed%12 +"PM",200,30);
  }else if(lastFed===0) {
    text("Last Fed : 12 AM",200,30);
  }else {
    text("Last Fed : "+lastFed +"AM",200,30);
  }

  console.log(foodStock);

  drawSprites();
}

function readStock(data) {
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog() {
  doggy.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    food:foodObj.getFoodStock(),
    feedTime:hour()
  });
}

function addFoods() {
  doggy.addImage(dog);

  foodS++

  database.ref("/").update({
    food:foodS
  });
}



