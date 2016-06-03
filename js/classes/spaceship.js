var DIRECTION = {
	"LEFT" : 0,
	"TOP" : 1,
	"RIGHT" : 2,
	"DOWN" : 3
}

var VITESSE = 15;

 function SpaceShip(x, y, width, height){
 	this.x = x;
 	this.y = y;
 	this.etatAnimation = -1;
 	this.munitions = [];
 	this.alive = true;
 	this.width = width;
 	this.height = height;
 }

 SpaceShip.prototype.dessinerShip = function(width, height, context){
 	var x = this.x;
 	var y = this.y;

 	for(var i = 0; i < 6; i++){
 		context.fillStyle ="black";
 		context.fillRect(x, y, width, height);
 		if(this.alive == false){
 			context.clearRect(x,y, width, height);
 		}
 		y += height;
 	}

 	if(i = 1){
 		x += width;
 		y -= height * 5;
 		for(var j = 0; j < 4; j++){
 			context.fillStyle = "black";
 			context.fillRect(x, y, width, height);
 			if(this.alive == false){
 				context.clearRect(x,y, width, height);
 			}
 			y += height;
 		}
 		x += width;
 		y -= height * 3;
 		for(var k = 0; k < 2; k++){
 			context.fillStyle = "black";
 			context.fillRect(x, y, width, height);
 			if(this.alive == false){
 				context.clearRect(x,y, width, height);
 			}
 			y += height;
 		}
 		x += width;
 		y -= height * 1.5;
 		context.fillStyle = "black";
 		context.fillRect(x, y, width, height);
 		if(this.alive == false){
 			context.clearRect(x,y, width, height);
 		}

 	}

 	/*if(this.alive = false){
 		context.clearRect(0,0, canvas.width, canvas.height);
 	}*/

 }

 SpaceShip.prototype.getCoordonnesAdjacentes = function(x, y, direction, context){
 	var move = {'x' : x, 'y' : y};
	//var clearDraw = this.clearShip;
	console.log(move);
	switch(direction){
		case DIRECTION.LEFT :
		for(var i=0; i<20; i++){
			move.x--;
		}
		break;
		case DIRECTION.TOP : 
		for(var i=0; i<20; i++){
			move.y--;
		}
		break;
		case DIRECTION.RIGHT :
		for(var i=0; i<20; i++){
			move.x++;
		}
		break;
		case DIRECTION.DOWN : 
		for(var i=0; i<20; i++){
			move.y++;
		}
		break;
	}
	return move;
}

SpaceShip.prototype.move = function(direction, context){

	//on change la direction
	this.etatAnimation = 1;
	this.direction = direction;
	var nextCase = this.getCoordonnesAdjacentes(this.x, this.y, direction, context);
	console.log(nextCase);
	// On effectue le déplacement
	if(nextCase.x > canvas.width - 24 || nextCase.x < 0 || nextCase.y < 0 || nextCase.y > canvas.height - 24){
		mainship.etatAnimation = -1;
		this.x = this.x;
		this.y = this.y;	
	}else{
		this.x = nextCase.x;
		console.log(this.x);
		this.y = nextCase.y;

		return true;
	}

}

SpaceShip.prototype.addMunitions = function(munition){
	this.munitions.push(munition);
}

SpaceShip.prototype.supprMunition = function(munition){
	this.munitions.shift(munition);
}

SpaceShip.prototype.gameover = function(context){
	this.alive = false;
	//this.context.clearDraw(0, 0, canvas.width, canvas.height);
}

function Bullet(x, y, width, height, speed){
	this.alive  = false; 
	this.speed = speed;
	this.x = mainship.x + width*3;
	this.y = mainship.y + height*2.5;
	this.width = width;
	this.height = height;
	this.etatAnimation = -1;
	this.munitions  = [];
}

Bullet.prototype.dessinerBullet = function(context){
	context.fillStyle = "red";
	context.fillRect(this.x, this.y, this.width, this.height);
}

Bullet.prototype.move = function(){
	for(var i=0; i<10; i++){
		this.x++;
	}
	console.log(this.x);
	
}

Bullet.prototype.suppr = function(){
	bullet.munitions.shift(this.munitions[0]);
}

function Enemy(x,y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.nbreEnemy = [];
	this.munitions = [];
	this.alive = true;
}

Enemy.prototype.dessinerEnemy = function(context){
	context.fillStyle = "blue";
	context.fillRect(this.x, this.y, this.width, this.height);
	if(this.alive == false){
		context.clearRect(this.x, this.y, this.width, this.height);
		this.nbreEnemy.shift(this);
	}
}

Enemy.prototype.addEnemy = function(x, y, width, height){
	this.nbreEnemy.push(new Enemy(x, y, width, height));
}

Enemy.prototype.move = function(){
	for(var i=0; i<3; i++){
		this.x--;
	}
}

Enemy.prototype.addMunitions = function(munition){
	this.munitions.push(munition);
}
/*
Enemy.prototype.shoot = function(context){
	this.munitions.push(new EnemyBullet());
	for(var i=0; i<this.munitions.length; i++){
		context.fillStyle = "green";
		context.fillRect(this.munitions[i].x, this.munitions[i].y, this.width/2, this.height/2);
	}
}*/
/*
Enemy.prototype.shoot = function(){
	this.munitions.push(new EnemyBullet);
	context.fillStyle = "green";
	context.fillRect(this.x, this.y, this.width/2, this.height/2);
}*/

function EnemyBullet(x, y, width, height, speed){
	this.x = x;
	this.y = x;
	this.width = width;
	this.height = height;
}

EnemyBullet.prototype.dessinerBullet = function(x, y, context){
	context.fillStyle = "red";
	//context.fillRect(this.x, this.y, this.width, this.height);
	context.fillRect(x, y+this.width/2, this.width, this.height);
}

EnemyBullet.prototype.move = function(x){
	for(var i=0; i<10; i++){
		this.x = x;
		this.x--;
	}
	//console.log(this.x);
}




function Background(url, context){
	
	this.bg = new Image();
	this.bg.src = 'img/' + url;
	this.x = 0;
	this.y = 0;
	canvas.appendChild(this.bg);
	this.bg.setAttribute("id", url);
	//this.bg.style.display = 'inline-block';
	
}

Background.prototype.dessinerBackground = function(url, context){
	if(url == "bg1.png"){
		context.drawImage(this.bg, this.x, this.y);
		if(this.x < -this.bg.width){
			this.x = this.bg.width;
		}
	}else if(url == "bg2.png"){
		context.drawImage(this.bg, this.x + canvas.width, this.y);
		if(this.x < -this.bg.width*2){
			this.x = 0;
		}
	}
}

Background.prototype.move = function(){
	for(var i=0; i<2; i++){
		this.x--;
	}
	
}
/*
faire un tableau pour mettre des instances de l'objet Bullet (bullet est la première instance et les autres doivent hériter
	des mêmes propriétés)*/


