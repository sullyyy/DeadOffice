 let keys = [];
 let sens = 1;
 
 class Character {
    constructor (x, y, width, height, img, id) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.img = img;
		this.id = id;
		this.travel = false;
	}
	
	
	
	
	checkCollision(x,y,x2,y2)
	{
		
		let x1 = x;
		let x1halfw = x + 18;
		let x1w = x + 36;
		let x2w = x2 + map.map_array[map.current_floor][floor(y2/100)][floor(x2/100)].hitboxW;
		let y1 = y + 60;
		let y1h = y + 70;
		let y2h = y2 + map.map_array[map.current_floor][floor(y2/100)][floor(x2/100)].hitboxH;
		hitDX = x1;
		hitDY = y1;
		hitDW = x1w - x1;
		hitDH = y1h - y1;
		if(this instanceof Dwight)
			message.displayed(false);
		
		
		if(x1 > x2 && x1 < x2w && y1 > y2 && y1 < y2h)
		{
			//going into a staircase door
			if(map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 4)
			{
				
				gameState = DIALOG_BOX;
				return false;
				
			}
			//going into elevator
			if(map.current_floor > 0 && map.current_floor < 5 && this instanceof Dwight)
			{
				if(map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 12 || map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 13)
				{
					
					if(map.generatorOn)
					{
						gameState = ELEVATOR_DIALOG;
					}
					else
					{
						message.set(0,0,"The elevator is not working...",true)
					}
					return false;
					
				}
				
					
			}
			//outside roof area
			if(map.current_floor == 5)
			{
				//going into basement outside access door
				if(map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 26)
				{
					
					map.travelTo(0,7,8)
					return false;
					
				}
				//going into open window
				if(map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 38 && floor(x1/100) == 2)
				{
					if(map.cleaning_platform_pos == 0)
						map.travelTo(4,2,9)
					else
						map.travelTo(2,2,9)
					return false;
					
				}
				//going into cleaning_platform
				if(map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 123)
				{
					
					if(map.cleaning_platform_pos == 0)
					{
						map.cleaning_platform_pos = 1;
						map.travelTo(5,2,12)
					}
					else
					{
						map.cleaning_platform_pos = 0;
						map.travelTo(5,2,10)
					}
					return false;
					
				}
			}
			//basement
			if(map.current_floor == 0)
			{
				//going into generator
				if(map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 8 || map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 9)
				{
					gameState = GENERATOR_DIALOG;
					return false;
					
				}
				//going into sewer
				if(map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 64)
				{
					message.set(0,0,"DLC REQUIRED",true)
					return false;
					
				}
			}
				
			if(map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].id != 1)
			{
				colX = x2;
				colY = y2;
				colW = x2w - x2;
				colH = y2h - y2;
				
				return false;
			}
			
		}
		if(x1halfw > x2 && x1halfw < x2w && y1 > y2 && y1 < y2h)
		{
			
			//going into elevator
			if(map.current_floor > 0 && map.current_floor < 5 && this instanceof Dwight)
			{
				if(map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 12 || map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 13)
				{
					
					if(map.generatorOn)
					{
						gameState = ELEVATOR_DIALOG;
					}
					else
						message.set(0,0,"The elevator is not working...",true)
					return false;
					
				}
			}
			if(map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].id != 1)
			{
				colX = x2;
				colY = y2;
				colW = x2w - x2;
				colH = y2h - y2;
				
				return false;
			}
		}
		if(x1w > x2 && x1w < x2w && y1 > y2 && y1 < y2h)
		{
			
			if(map.map_array[map.current_floor][floor(y1/100)][floor(x1w/100)].id != 1)
			{
				colX = x2;
				colY = y2;
				colW = x2w - x2;
				colH = y2h - y2;
				
				return false;
			}
		}
		if(x1 > x2 && x1 < x2w && y1h > y2 && y1h < y2h)
		{
			//basement
			if(map.current_floor == 0)
			{
				//going into basement outside access door
				if(map.map_array[map.current_floor][floor(y1h/100)][floor(x1/100)].game_id == 7)
				{
					map.travelTo(5,7,15)
					return false;
					
				}
				//going into sewer
				if(map.map_array[map.current_floor][floor(y1h/100)][floor(x1/100)].game_id == 64)
				{
					message.set(0,0,"DLC REQUIRED",true)
					return false;
					
				}
				
			}
			if(map.current_floor == 1)
			{
				//going into exit / ending game
				if(map.map_array[map.current_floor][floor(y1h/100)][floor(x1/100)].game_id == 10 || map.map_array[map.current_floor][floor(y1h/100)][floor(x1/100)].game_id == 11)
				{
					map.travelTo(5,4,14)
					end = 1;
					game_scale = 0.5;
					
					camera.lookAt(200,700);
					let now = new Date().getTime();
					time = now - start;
					return false;
					
				}
			}
			if(map.current_floor == 2)
			{
				//going into window
				if(map.map_array[map.current_floor][floor(y1h/100)][floor(x1/100)].game_id == 15 && floor(x1/100) == 2)
				{
					if(map.cleaning_platform_pos == 1)
						map.travelTo(5,2,12)
					return false;
					
				}
			}
			if(map.current_floor == 4)
			{
				//going into window
				if(map.map_array[map.current_floor][floor(y1h/100)][floor(x1/100)].game_id == 15)
				{
					if(map.cleaning_platform_pos == 0)
						map.travelTo(5,2,10)
					return false;
					
				}
			}
			if(map.map_array[map.current_floor][floor(y1h/100)][floor(x1/100)].id != 1)
				{
				colX = x2;
				colY = y2;
				colW = x2w - x2;
				colH = y2h - y2;
				
				return false;
				}
		}
		if(x1halfw > x2 && x1halfw < x2w && y1h > y2 && y1h < y2h)
		{
			
			if(map.map_array[map.current_floor][floor(y1h/100)][floor(x1/100)].id != 1)
				{
				colX = x2;
				colY = y2;
				colW = x2w - x2;
				colH = y2h - y2;
				
				return false;
				}
		}
		if(x1w > x2 && x1w < x2w && y1h > y2 && y1h < y2h)
		{
			
			if(map.map_array[map.current_floor][floor(y1h/100)][floor(x1w/100)].id != 1)
				{
					
				colX = x2;
				colY = y2;
				colW = x2w - x2;
				colH = y2h - y2;
				
				return false;
				}
		}
		return true;
	}
	
	//checking 9 tiles around object for collision
	handleCollision(x,y)
	{
		for(let i = -1; i < 2; i++)
		{
			for(let j = -1; j < 2; j++)
			{
				if(floor(y/100)+ j < 0 || floor(x/100)+ i < 0 || floor(y/100)+ j > floor_size[map.current_floor].h || floor(x/100)+ i > floor_size[map.current_floor].w )
					continue;
				let x2 = (floor(x/100))*100 + i*100 + map.map_array[map.current_floor][floor(y/100)+ j][floor(x/100)+ i].hitboxX;
				let y2 = (floor(y/100))*100 + j*100 + map.map_array[map.current_floor][floor(y/100)+ j][floor(x/100)+ i].hitboxY;
				if(this.checkCollision(x,y,x2,y2) == false)
					return false;
			}
		}
		
		return true;
	}
	
	//drawing character
	draw()
	{
		image(this.img, this.x*game_scale + camera.offSetX*game_scale, this.y*game_scale + camera.offSetY*game_scale, this.width*game_scale, this.height*game_scale);
		
	}
	
	
}

class Dwight extends Character{
    constructor (x, y, width, height, img,id) {
		super(x, y, width, height, img,id);
		this.acc = 7;
		this.alive = true;
		this.weapon;
		this.faceX = 1;
		this.faceY = 0;
		
	}
	
	equipWeapon(weapon)
	{
		this.weapon = weapon;
	}
	
	init()
	{
		this.weapon.update();
				camera.update();
				map.resort(this);
	}
	
	move()
	{
		if(keys[32])
		{
			if(this.weapon instanceof Axe) 
				this.weapon.swing();
			if(this.weapon instanceof Revolver) 
				this.weapon.shoot();
			keys[32] = 0;
		}
		if(keys[82])
		{
			if(this.weapon instanceof Revolver) 
				this.weapon.reload();
			keys[82] = 0;
		}
		if(keys[CONTROL])
		{
			if(this.weapon instanceof Revolver) 
				this.weapon = axe;
			else if(this.weapon instanceof Axe) 
				this.weapon = revolver; 
			this.weapon.update();
			keys[CONTROL] = 0;
		}
		if(keys[LEFT_ARROW])
		{
			this.faceX = -1;
			this.faceY = 0;
			if(this.handleCollision(dwight.x - dwight.acc, dwight.y))
			{
				
				dwight.x-= dwight.acc;
				camera.update();
				this.weapon.update();
				map.resort(this);
			}
		}
		if(keys[RIGHT_ARROW])
		{
			this.faceX = 1;
			this.faceY = 0;
			if(this.handleCollision(dwight.x  + dwight.acc, dwight.y))
			{
				
				camera.offSetX -= dwight.acc;
				dwight.x+=dwight.acc;
				this.weapon.update();
				map.resort(this);
			}
			
		}
		if(keys[UP_ARROW])
		{
			this.faceX = 0;
			this.faceY = -1;
			if(this.handleCollision(dwight.x, dwight.y - dwight.acc))
			{
				dwight.y-=dwight.acc;
				
				camera.update();
				this.weapon.update();
				map.resort(this);
			}
		}
		if(keys[DOWN_ARROW])
		{
			this.faceX = 0;
			this.faceY = 1;
			if(this.handleCollision(dwight.x, dwight.y + dwight.acc))
			{
				dwight.y+=dwight.acc;
				
				camera.update();
				this.weapon.update();
				map.resort(this);
			}
		}
	}
	
	handleCollision(x,y)
	{
		return super.handleCollision(x,y);
	}
	
	
}

function keyPressed() {
	keys[keyCode] = 1;
}

function keyReleased() {
	keys[keyCode] = 0;	
}


 const STATE = {
    ROAMING: 0,
	CHASING: 1,
	IDLE: 2,
	DEAD: 3
 }

class Zombie extends Character{
    constructor (x, y, width, height, img, id, initX, initY) {
		super(x, y, width, height, img, id );
		this.dirX = 1;
		this.zombieState = STATE.ROAMING;
		this.velocity = 2;
		this.acc = 2;
		this.chaseLine = [createVector(0, 0),createVector(0, 0)];
		this.initX = initX;
		this.initY = initY;
		this.vecRoam = createVector(0, 0);
		this.life = 3;
		
	}
	
	takeDmg()
	{
		this.life--;
		if(this.life == 0)
			this.die();
	}
	
	revive()
	{
		this.zombieState = STATE.ROAMING;
		this.img = zombie;
		this.width = 36;
		this.height = 70;
		this.life = 3;
	}
	
	die()
	{
		this.zombieState = STATE.DEAD;
		this.img = dwight_dead;
		this.y += 50;
		this.width = 70;
		this.height = 14;
	}
	
	static s_setZombiePosition()
	{
		for(let i = 0; i < 2; i++)
		{
			enemies[i].x = 600-i*200;
			enemies[i].y = 300+i*200;
			enemies[i].zombieState = STATE.IDLE;
		}
	}
	
	draw()
	{
		super.draw();
		//this.drawChaseLine();
		this.drawLife();
	}
	
	drawLife()
	{
		push();
		textSize(10);
		fill(0,0,0);
		text('HP : ' + this.life, this.x+camera.offSetX, this.y+camera.offSetY-10);
		pop();
	}
	
	setZombieInitPosition()
	{
		this.zombieState = STATE.ROAMING;
		this.x = this.initX;
		this.y = this.initY;
		this.vecRoam = createVector(random(0,800), random(0,600));
		this.revive();
	}
	
	update()
	{
		this.move();
		if(dwight.alive && (this.zombieState == STATE.CHASING || this.zombieState == STATE.ROAMING) )
			this.detectPlayer(this.x + 36/2, dwight.x + 36/2, this.y+ 70/2, dwight.y+ 70/2);
	}
	
	move()
	{
		switch (this.zombieState) {
	  
			  case STATE.ROAMING:
			  this.roam();
			  break;
			  
			  case STATE.CHASING:
			  this.chase();
			  break;
			  
			  case STATE.IDLE:
			  break;
			  
			  case STATE.DEAD:
			  break;
			  
			  default:
			  break;
		  }
	}
	
	
	
	roam()
	{
		/*if(this.handleCollision(this.x + this.velocity*this.dirX, this.y))
		{
			this.x+=this.velocity*this.dirX;
			map.resort(this);
		}
		else
			this.dirX*=-1;*/
		let v1 = createVector(this.x + 36/2 + camera.offSetX, this.y + 70/2 + camera.offSetY);
		//let v2 = p5.Vector.random2D();
		let v2 = createVector(this.vecRoam.x+camera.offSetX, this.vecRoam.y+camera.offSetY)
		//v2.x+=camera.offSetX;
		//v2.y+=camera.offSetY;
		 this.chaseLine[0].set(v1.x, v1.y);
		  this.chaseLine[1].set(v2.x, v2.y);
		//console.log("v2 ", v2);
		
		let distance = p5.Vector.dist(v1, v2);
		
		if(distance < 1)
		{
			//console.log("arrivé");
			this.vecRoam = createVector(random(0,800), random(0,600));
			v2 = createVector(this.vecRoam.x+camera.offSetX, this.vecRoam.y+camera.offSetY)
		}
		
		let dx = v1.x - v2.x;
		  let dy = v1.y - v2.y;
		  let angle = atan2(dy, dx)
		  
		  let xVelocity = this.velocity * cos(angle);
		  let yVelocity = this.velocity * sin(angle);
		  if(this.handleCollision(this.x - xVelocity, this.y))
		  {
			this.x-=xVelocity;
			map.resort(this);
		  }
		  else
		  {
			  this.vecRoam = createVector(random(0,800), random(0,600));
			  //console.log(" vecroam ", this.vecRoam);
		  }
		  if(this.handleCollision(this.x, this.y - yVelocity))
		  {
			this.y-=yVelocity;
			map.resort(this);
		  }
		  else
		  {
			   this.vecRoam = createVector(random(0,800), random(0,600));
			  //console.log(" vecroam ", this.vecRoam);
		  }
		  
	}
	
	chase()
	{
		  let v1 = createVector(this.x + 36/2 + camera.offSetX, this.y + 70/2 + camera.offSetY);
		  let v2 = createVector(dwight.x + 36/2 + camera.offSetX, dwight.y + 70/2 + camera.offSetY);
		  this.chaseLine[0].set(v1.x, v1.y);
		  this.chaseLine[1].set(v2.x, v2.y);
		  
		  if(dwight.y > 1000)
			  return;
		  
		  
		  let dx = v1.x - v2.x;
		  let dy = v1.y - v2.y;
		  let angle = atan2(dy, dx)
		  
		  let xVelocity = this.velocity * cos(angle);
		  let yVelocity = this.velocity * sin(angle);
		  if(this.handleCollision(this.x - xVelocity, this.y))
		  {
			this.x-=xVelocity;
			map.resort(this);
		  }
		  if(this.handleCollision(this.x, this.y - yVelocity))
		  {
			this.y-=yVelocity;
			map.resort(this);
		  }
	}
	
	setState(state)
	{
		this.zombieState = state;
	}
	
	drawChaseLine()
	{
		stroke(255,0,0);
		line(this.chaseLine[0].x, this.chaseLine[0].y, this.chaseLine[1].x, this.chaseLine[1].y);
	}
	
	static s_setState(state)
	{
		for(let i = 0; i < 2; i++)
		{
			enemies[i].setState(state);
		}
	}
	
	static s_drawChaseLine()
	{
		for(let i = 0; i < 2; i++)
		{
			if(enemies[i].zombieState == STATE.CHASING)
				enemies[i].drawChaseLine();
		}
	}
	
	detectPlayer(x1,x2,y1,y2)
	{
		var dist = Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
		if(dist < 1000)
		{
			this.zombieState = STATE.CHASING;
		}
		if(dist < 30)
		{
			for(let i = 0; i < 2; i++)
				enemies[i].zombieState = STATE.ROAMING;
			gameState = GAME_OVER;
			//camera.lookAtObj(this);
			dwight.alive = false;
		}
	}
	
	handleCollision(x,y)
	{
		return super.handleCollision(x,y);
	}
	
	stateToString(state)
	{
		if(state == 0)
			return "ROAMING";
		else if(state == 1)
			return "CHASING";
		else if(state == 2)
			return "IDLE";
	}
}