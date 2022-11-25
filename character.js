 let keys = [];
 
 class Character {
    constructor (x, y, width, height, img, id) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.img = img;
		this.id = id;
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
		
		if(x1 > x2 && x1 < x2w && y1 > y2 && y1 < y2h)
		{
			
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
				
				if(floor(y/100)+ j < 0 || floor(x/100)+ i < 0 || floor(y/100)+ j > 9 || floor(x/100)+ i > 10 )
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
		image(this.img, this.x + camera.offSetX, this.y + camera.offSetY, this.width, this.height);
	}
	
	
}

class Dwight extends Character{
    constructor (x, y, width, height, img,id) {
		super(x, y, width, height, img,id);
		this.acc = 7;
		this.alive = true;
		
	}
	
	move()
	{
		if(keys[LEFT_ARROW])
		{
			if(this.handleCollision(dwight.x - dwight.acc, dwight.y))
			{
				dwight.x-= dwight.acc;
				camera.update();
				map.resort(this);
			}
		}
		if(keys[RIGHT_ARROW])
		{
			if(this.handleCollision(dwight.x  + dwight.acc, dwight.y))
			{
				camera.offSetX -= dwight.acc;
				dwight.x+=dwight.acc;
				map.resort(this);
			}
			
		}
		if(keys[UP_ARROW])
		{
			if(this.handleCollision(dwight.x, dwight.y - dwight.acc))
			{
				dwight.y-=dwight.acc;
				camera.update();
				map.resort(this);
			}
		}
		if(keys[DOWN_ARROW])
		{
			if(this.handleCollision(dwight.x, dwight.y + dwight.acc))
			{
				dwight.y+=dwight.acc;
				camera.update();
				map.resort(this);
			}
		}
	}
	
	handleCollision(x,y)
	{
		
		/*if(map.map_array[map.current_floor][floor((y+60)/100)][floor(x/100)].id == 11)
		{
			if(map.current_floor == 1)
				map.current_floor = 0;
			else
				map.current_floor = 1;
			
		}*/
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
 }

class Zombie extends Character{
    constructor (x, y, width, height, img, id) {
		super(x, y, width, height, img, id );
		this.dirX = 1;
		this.zombieState = STATE.ROAMING;
		this.velocity = 2;
		this.acc = 2;
		this.chaseLine = [createVector(0, 0),createVector(0, 0)];
		
	}
	
	update()
	{
		this.move();
		if(dwight.alive && this.zombieState != STATE.IDLE)
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
			  
			  default:
			  break;
		  }
	}
	
	
	
	roam()
	{
		if(this.handleCollision(this.x + this.velocity*this.dirX, this.y))
		{
			this.x+=this.velocity*this.dirX;
			map.resort(this);
		}
		else
			this.dirX*=-1;
	}
	
	chase()
	{
		  let v1 = createVector(this.x + 36/2 + camera.offSetX, this.y + 70/2 + camera.offSetY);
		  let v2 = createVector(dwight.x + 36/2 + camera.offSetX, dwight.y + 70/2 + camera.offSetY);
		  this.chaseLine[0].set(v1.x, v1.y);
		  this.chaseLine[1].set(v2.x, v2.y);
		  
		  
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
		if(dist < 200)
		{
			this.zombieState = STATE.CHASING;
		}
		if(dist < 30)
		{
			for(let i = 0; i < 2; i++)
				enemies[i].zombieState = STATE.ROAMING;
			gameState = GAME_OVER;
			camera.lookAtObj(this);
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