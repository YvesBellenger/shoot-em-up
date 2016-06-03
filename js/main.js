var mainship = new SpaceShip(150, 200, 32, 48); 
var bullet = new Bullet(0, 0, 8, 8, 10);
//var enemy = new Enemy(1260 - Math.random()*800, Math.random()*300, 15, 15);
var enemy = new Enemy(1260 + Math.random()*1260, Math.random()*300, 16, 16);

for(var i=0; i<200; i++){
	enemy.addEnemy(1260 + Math.random()*(1260*100), Math.random()*300, 16, 16);

	//test
	var enemyBullet = new EnemyBullet(enemy.nbreEnemy[i].x , enemy.nbreEnemy[i].y, 8, 8, 10);
	enemy.nbreEnemy[i].addMunitions(enemyBullet);
}

alert(enemy.nbreEnemy[0].x);
alert(enemy.nbreEnemy[0].munitions[0].x);

var updateScore = 0;
score.innerHTML = "Score : " + updateScore;
// tableau munitions
function addMunitions(){
	var munitions = [];
	munitions.push(new Bullet(0, 0, 8, 8, 10));
	console.log(munitions);
}


window.onload = function(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	//mainship.addMunitions(bullet);

	
	console.log(enemy.nbreEnemy);
	console.log(enemy.x);
	//addEnemy();
	var bg1 = new Background("bg1.png", context);
	var bg2 = new Background("bg2.png", context);

	//cmainship.addMunitions(bullet);

	var onupdate = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		mainship.dessinerShip(8, 8, context);	



		for(var i=0; i < mainship.munitions.length; i++){
			mainship.munitions[i].move();
			mainship.munitions[i].dessinerBullet(context);
			if(mainship.munitions[i].x > canvas.width){
				mainship.supprMunition(mainship.munitions[i]);
			}
		}

		for(var i=0; i < enemy.nbreEnemy.length; i++){
			
			enemy.nbreEnemy[i].move();
			enemy.nbreEnemy[i].dessinerEnemy(context);
			//enemy.nbreEnemy[i].munitions[0].dessinerBullet(context);
			//enemy.nbreEnemy[i].munitions[0].move();
			enemy.nbreEnemy[i].munitions[0].dessinerBullet(enemy.nbreEnemy[i].x, enemy.nbreEnemy[i].y, context);
			enemy.nbreEnemy[i].munitions[0].move(enemy.nbreEnemy[i].x);

			
			//enemy.nbreEnemy[i].munitions.dessinerBullet(context);

			
			//enemyBullet.move;
			//console.log(enemy.nbreEnemy[i].munitions);

			if(!(enemy.nbreEnemy[i].x > mainship.x + mainship.width 
				|| mainship.x > enemy.nbreEnemy[i].x + enemy.nbreEnemy[i].width
				|| enemy.nbreEnemy[i].y > mainship.y + mainship.height 
				|| enemy.nbreEnemy[i].y + enemy.nbreEnemy[i].height < mainship.y)){
				mainship.gameover();
			//location.reload();
		}

		for(var j=0; j < mainship.munitions.length; j++){
			if(!( enemy.nbreEnemy[i].x > mainship.munitions[j].x + mainship.munitions[j].width
				|| mainship.munitions[j].x > enemy.nbreEnemy[i].x + enemy.nbreEnemy[i].width
				|| enemy.nbreEnemy[i].y > mainship.munitions[j].y + mainship.munitions[j].height
				|| enemy.nbreEnemy[i].y + enemy.nbreEnemy[i].height < mainship.munitions[j].y)){
				mainship.supprMunition(mainship.munitions[i]);
			enemy.nbreEnemy.splice([i],1);
			var score = document.getElementById("score");
			updateScore += 10;
			score.innerHTML = "Score : " + updateScore;

		}	
	}


}


bg1.move();
bg1.dessinerBackground("bg1.png", context);
bg2.move();
bg2.dessinerBackground("bg2.png", context);


window.requestAnimationFrame(onupdate);
}

onupdate();


window.onkeydown = function(){
	var e = event || window.event;
	var key = e.which || e.keyCode;

		//alert(key);	
		switch(key){
			case 37: mainship.move(DIRECTION.LEFT, context);
			//mainship.munitions[0].move(DIRECTION.LEFT, context);			
			e.preventDefault();
			break;
			case 38: mainship.move(DIRECTION.TOP, context);
			//mainship.munitions[0].move(DIRECTION.TOP, context);
			e.preventDefault();
			break;
			case 39: mainship.move(DIRECTION.RIGHT, context);
			//mainship.munitions[0].move(DIRECTION.RIGHT, context);
			e.preventDefault();
			break;
			case 40: e.preventDefault();
			mainship.move(DIRECTION.DOWN, context);
			//mainship.munitions[0].move(DIRECTION.DOWN, context);
			
			break;
			case 32:
			e.preventDefault();
			var bullet = new Bullet(0, 0, 8, 8, 10);
			mainship.addMunitions(bullet);
			//enemy.clearEnemy(enemy.nbreEnemy[i]);

			default : return true;
		}


	}	
}

	/*
	context.fillStyle = "black";
	context.fillRect(50,50,15,15);

	context.fillStyle = "red";
	context.beginPath();
	context.moveTo(100,100);
	context.lineTo(150, 100);
	context.lineTo(150, 150);
	context.lineTo(200, 150);
	context.lineTo(200, 200);
	context.lineTo(250, 200);
	context.lineTo(250, 250);
	context.lineTo(200, 250);
	context.lineTo(200, 300);
	context.lineTo(150, 300);
	context.lineTo(150, 200);
	context.lineTo(150, 250);
	context.lineTo(100, 250);
	context.closePath();
	context.fill();*/

/*setInterval(function() {
		mainship.dessinerShip(8, 8);
	}, 10);*/
