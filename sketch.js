var dog, happyDog, database, foodS, foodStock;
var dogImg, dogHappy;

function preload() {
  // images folder is not there
  dogImg = loadImage("dogImg.png");
  dogHappy = loadImage("dogImg1.png");
}

function setup() {

  createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250, 300);
  dog.addImage("Bob", dogImg);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);

    //use same label name
   dog.addImage("Bob",dogHappy);
  
  }

  drawSprites();

  textSize(20);
  fill("white");
  stroke(5);


  //added food remaining to display and read values from database
  text("Food remaining : "+foodS,170,200);
  var Text = text("Note: Press UP_ARROW Key to Feed Drago Milk!", 30, 100);

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x<=0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food:x
  })

}




 
