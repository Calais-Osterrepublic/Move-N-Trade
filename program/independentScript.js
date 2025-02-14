//PART 1: Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var blockSize = 20;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;
var drawBorder = function () {
  ctx.fillStyle = "Black";
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0, blockSize, height);
};
var circle = function (x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};

//PART 2: Text
var text = document.getElementById("text");
var mlg = text.getContext("2d");
var text = function (input, x, y) {
  mlg.font = "20px Courier";
  mlg.fillStyle = "Black";
  mlg.textAlign = "left";
  mlg.textBaseline = "top";
  mlg.fillText(input, x, y);
};

//PART 3: SlavMath
var randnum = function () {
  return Math.floor(Math.random() * 10);
};
var coinFlip = function () {
  var result = Math.floor(Math.random() * 2) + 1;
  if (result === 1) {
    return true;
  } else {
    return false;
  }
};

//MUST BE REDIRECTED
var tradeX = 1;
var tradeY = 1;

//PART 4: Block
class Block {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
  drawSquare(color) {
    let x = this.col * blockSize;
    let y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
  }
  drawCircle(color) {
    var centerX = this.col * blockSize + blockSize / 2;
    var centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
  }
  equal(otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
  }
}
//MUST BE REDIRECTED
var playX = 10;
var playY = 10;
var stonk = 50;

function checkKey(e) {
  e = window.event;

  if (e.keyCode == "87") {
    playY--;
  } else if (e.keyCode == "83") {
    playY++;
  } else if (e.keyCode == "65") {
    playX--;
  } else if (e.keyCode == "68") {
    playX++;
  }
}
//PART 5: PLAYER
var Player = function (startX, startY) {
  this.person = new Block(startX, startY);
  this.wood = 0;
  this.rock = 0;
  this.coin = 0;
  this.mint = 0;
  this.bots = 0;
  this.transits = 0;
};

Player.prototype.draw = function (color) {
  this.person = new Block(playX, playY);
  this.person.drawSquare(color);
};

Player.prototype.collide = function (local) {
  var leftCollision = local.col === 0;
  var topCollision = local.row === 0;
  var rightCollision = local.row === widthInBlocks - 1;
  var bottomCollision = local.col === heightInBlocks - 1;

  var wallCollision =
    leftCollision || topCollision || rightCollision || bottomCollision;
  if (wallCollision) {
    if (leftCollision) {
      playX++;
    }
    if (rightCollision) {
      playY--;
    }
    if (topCollision) {
      playY++;
    }
    if (bottomCollision) {
      playX--;
    }
  }
};

//MUST BE REDIRECTED
var makeCoin = function () {
  player.coin++;
  player.coin += player.mint;
  player.coin += player.transits;
};
var buyMint = function () {
  if (player.coin >= player.transits * 5 + 50 && player.wood >= 10) {
    player.coin -= player.transits * 5 + 50;
    player.mint++;
    player.wood -= 10;
  }
};
var recycleMint = function () {
  if (player.bots >= 1 && player.transits >= 1) {
    player.bots--;
    player.coin += 50;
    player.mint++;
  }
};
var constructBot = function () {
  if (player.coin >= player.bots * 10 + 50 && player.mint >= player.transits) {
    player.coin -= player.bots * 10 + 50;
    player.mint -= player.transits;
    player.bots++;
  }
};

var transcend = function () {
  if (player.bots >= 10 && player.coin >= 1000 && player.mint >= 100) {
    player.bots = 0;
    player.coin = 0;
    player.mint = 0;
    player.transits += 1;
    player.wood = 0;
  }
};

var stockValue = function () {
  if (coinFlip()) {
    stonk += randnum();
  } else {
    stonk -= randnum();
  }
  if (stonk < 1) {
    stonk = 0;
  }
};

var buyRock = function () {
  if (player.coin > stonk) {
    player.rock++;
    player.coin -= stonk;
    stonk += randnum();
  }
};
var sellRock = function () {
  if (player.coin > 0) {
    if (player.rock > 0) {
      player.rock--;
      player.coin += stonk;
      stonk -= randnum();
    }
  }
};

//PART 6: Food
var Food = function () {
  this.loc = [
    new Block(
      Math.floor(Math.random() * 23) + 1,
      Math.floor(Math.random() * 23) + 1
    ),
    new Block(
      Math.floor(Math.random() * 23) + 1,
      Math.floor(Math.random() * 23) + 1
    ),
    new Block(
      Math.floor(Math.random() * 23) + 1,
      Math.floor(Math.random() * 23) + 1
    ),
    new Block(
      Math.floor(Math.random() * 23) + 1,
      Math.floor(Math.random() * 23) + 1
    ),
    new Block(
      Math.floor(Math.random() * 23) + 1,
      Math.floor(Math.random() * 23) + 1
    ),
    new Block(
      Math.floor(Math.random() * 23) + 1,
      Math.floor(Math.random() * 23) + 1
    ),
    new Block(
      Math.floor(Math.random() * 23) + 1,
      Math.floor(Math.random() * 23) + 1
    ),
    new Block(
      Math.floor(Math.random() * 23) + 1,
      Math.floor(Math.random() * 23) + 1
    ),
    new Block(
      Math.floor(Math.random() * 23) + 1,
      Math.floor(Math.random() * 23) + 1
    ),
    new Block(
      Math.floor(Math.random() * 23) + 1,
      Math.floor(Math.random() * 23) + 1
    ),
    new Block(
      Math.floor(Math.random() * 23) + 1,
      Math.floor(Math.random() * 23) + 1
    ),
    new Block(
      Math.floor(Math.random() * 23) + 1,
      Math.floor(Math.random() * 23) + 1
    ),
  ];
};
//This one gave me too much trouble.
Food.prototype.draw = function () {
  for (var i = 0; i < this.loc.length; i++) {
    this.loc[i].drawSquare("Green");
    if (this.loc[i].col === playX && this.loc[i].row === playY) {
      player.wood += 1 + player.transits;
      this.loc[i].col = Math.floor(Math.random() * 23) + 1;
      this.loc[i].row = Math.floor(Math.random() * 23) + 1;
    }
  }
};

//MUST BE REDIRECTED

//PART 7: Tech
var trader = new Block(1, 1);
var player = new Player(playX, playY);
player.draw("blue");
var tree = new Food();
tree.draw();
trader.drawCircle();

if (typeof Storage !== "undefined") {
  if (localStorage.coin && localStorage.coin !== "NaN") {
    player.coin = Number(localStorage.coin);
  }
  if (localStorage.mint && localStorage.mint !== "NaN") {
    player.mint = Number(localStorage.mint);
  }
  if (localStorage.bots && localStorage.bots !== "NaN") {
    player.bots = Number(localStorage.bots);
  }
  if (localStorage.transits && localStorage.transits !== "NaN") {
    player.transits = Number(localStorage.transits);
  }
  if (localStorage.wood && localStorage.wood !== "NaN") {
    player.wood = Number(localStorage.wood);
  }
  if (localStorage.rock && localStorage.rock !== "NaN") {
    player.rock = Number(localStorage.rock);
  }
  if (localStorage.stonk && localStorage.stonk !== "NaN") {
    stonk = Number(localStorage.stonk);
  }
} else {
  alert("No saving here on this browser, sorry!");
}

var ticker = 0;

setInterval(function () {
  ctx.clearRect(0, 0, width, height);
  mlg.clearRect(0, 0, 500, 300);
  drawBorder();
  text("Wood:" + player.wood, 10, 10);
  text("Coin:" + player.coin, 10, 30);
  text("Mint:" + player.mint, 10, 50);
  text("Bots:" + player.bots, 10, 70);
  text("Transcendence Points (TP):" + player.transits, 10, 90);
  text("RockStocks:" + player.rock, 10, 110);
  text("Rock Price:" + stonk, 10, 130);
  document.onkeydown = checkKey;
  player.collide(player.person);
  player.draw("blue");
  tree.draw();
  trader.drawCircle();

  if (ticker >= 120) {
    ticker = 0;
    stockValue();
  }

  if (ticker === 60) {
    player.coin += player.mint * player.transits;
    player.wood += player.bots;
  }

  ticker++;

  localStorage.coin = player.coin.toString();
  localStorage.mint = player.mint.toString();
  localStorage.bots = player.bots.toString();
  localStorage.transits = player.transits.toString();
  localStorage.wood = player.wood.toString();
  localStorage.rock = player.rock.toString();
  localStorage.stonk = stonk.toString();
}, 1);
