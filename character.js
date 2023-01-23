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
		this.bleeding = false;
		this.lastBleed = new Date().getTime(); 
		this.bleedX;
		this.bleedY;
		this.bleedFrame = 0;
	}
	 
	speak(text_message)
	{
		push();
			noStroke();
			fill("white")
			triangle(this.x+camera.offSetX, this.y+camera.offSetY, this.x+camera.offSetX-20, this.y+camera.offSetY-100,this.x+camera.offSetX-50, this.y+camera.offSetY-100)
			ellipse(this.x+camera.offSetX, this.y+camera.offSetY-100, 300, 100);
			fill("black")
			textSize(12);
			text(text_message,this.x+camera.offSetX, this.y+camera.offSetY-100);
		pop();
	}
	 
	takeDmg(x,y)
	{
		
		this.bleeding = true;
		this.lastBleed = new Date().getTime(); 
		//this.bleedX = x - camera.offSetX;
		this.bleedX = this.x;
		this.bleedY = (y-15) - camera.offSetY;
		this.bleedFrame = 0;
		
		
		if(this.bleedY + 30 > this.y + this.height)
			this.bleedY = this.y + this.height - 30;
		
		
		this.bleed(this.x, this.y+this.height,0,0)
	}
     
	bleed(x,y,w,h)
	{
		map.floors[map.current_floor].bloods.push(new Blood(x, y,w,h))
	}
	 
	 
	
	
	
	checkCollision(x,y,x2,y2)
	{
		
		let x1 = x;
		//let x1halfw = x + 18;
		let x1halfw = x + this.width/2;
		//let x1w = x + 36;
		let x1w = x + this.width;
		let x2w = x2 + map.map_array[map.current_floor][floor(y2/100)][floor(x2/100)].hitboxW;
		//let y1 = y + 60;
		let y1 = y + (this.height - 10);
		//let y1h = y + 70;
		let y1h = y + this.height;
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
			if(map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 4  && this instanceof Dwight)
			{
				
				gameState = DIALOG_BOX;
				return false;
				
			}
			//going into a vending machine
			if(map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 45  && this instanceof Dwight)
			{
				
				dwight.life = 3;
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
						message.set(0,0,"The elevator is not working...",true);
					}
					return false;
					
				}
				
					
			}
			//outside roof area
			if(map.current_floor == 5  && this instanceof Dwight)
			{
				//going into basement outside access door
				if(map.map_array[map.current_floor][floor(y1/100)][floor(x1/100)].game_id == 26)
				{
					door_sound.play();
					map.travelTo(0,7,8);
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
			if(map.current_floor == 0  && this instanceof Dwight)
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
			if(map.current_floor == 0 && this instanceof Dwight)
			{
				//going into basement outside access door
				if(map.map_array[map.current_floor][floor(y1h/100)][floor(x1/100)].game_id == 7)
				{
					door_sound.play();
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
			if(map.current_floor == 1  && this instanceof Dwight)
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
			if(map.current_floor == 2  && this instanceof Dwight)
			{
				//going into window
				if(map.map_array[map.current_floor][floor(y1h/100)][floor(x1/100)].game_id == 15 && floor(x1/100) == 2)
				{
					if(map.cleaning_platform_pos == 1)
						map.travelTo(5,2,12)
					return false;
					
				}
			}
			if(map.current_floor == 4  && this instanceof Dwight)
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
		this.drawBleeding();
		
	}
	 
	drawBleeding()
	{
		if(!this.bleeding)
			return;
		
		image(bleed_anim,this.bleedX+camera.offSetX, this.bleedY+camera.offSetY,40,40,this.bleedFrame*20,0,20,20)
		
		let now = new Date().getTime();
		let delta = now - this.lastBleed;
		
		if (delta >= 50) {
			this.bleedFrame++;
			if(this.bleedFrame > 6)
				{
					this.bleedFrame = 0;
					this.bleeding = false;
				}
		}
	}
	
	
}



class Dwight extends Character{
    constructor (x, y, width, height, img,id) {
		super(x, y, width, height, img,id);
		this.acc = 7;
		this.alive = true;
		this.weapon;
		this.faceX = 1;
		this.faceXX = 1;
		this.anim = dwight_animation;
		this.frame = 0;
		this.lastFrame = new Date().getTime();
		
		this.faceY = 0;
		this.life = 3;
		this.invulnerable = false;
		this.lastInvulnerable;
		
	}
	
	/*speak()
	{
		push();
			noStroke();
			fill("white")
			triangle(this.x+camera.offSetX, this.y+camera.offSetY, this.x+camera.offSetX-20, this.y+camera.offSetY-100,this.x+camera.offSetX-50, this.y+camera.offSetY-100)
			ellipse(this.x+camera.offSetX, this.y+camera.offSetY-100, 300, 100);
			fill("black")
			textSize(12);
			text("AIE !!!",this.x+camera.offSetX, this.y+camera.offSetY-100);
		pop();
	}*/
	
	revive()
	{
		this.img = dwight_img;
		this.width = 36;
		this.height = 70;
		this.life = 3;
	}
	
	
	
	die()
	{
		gameState = GAME_OVER;
		dwight.alive = false;
		//map.floors[map.current_floor].bloods.push(new Blood(this.x, this.y+this.height,40,20))
		this.bleed(this.x, this.y+this.height, 40,20)
		music_sound.stop();
		dark_piano_sound.loop();
	}
	
	takeDmg()
	{
		if(this.invulnerable)
			return;
		this.life--;
		//map.floors[map.current_floor].bloods.push(new Blood(this.x + camera.offSetX, this.y + 80 + camera.offSetY))
		super.takeDmg(this.x+this.width/2 + camera.offSetX,this.y+20+camera.offSetY);
		//dwight_hit_sound.setVolume(0.2);
		dwight_hit_sound.play();
		if(this.life == 0)
		{
			this.die();
			return;
		}
		this.lastInvulnerable = new Date().getTime();
		this.invulnerable = true;
		
		
	}
	
	equipWeapon(weapon)
	{
		this.weapon = weapon;
	}
	
	init()
	{
		dwight.alive = true;
		dwight.equipWeapon(axe);
		this.weapon.update();
		camera.lookAtObj(this);
		camera.update();
		map.resort(this);
	}
	
	update_invulnerable()
	{
		let now = new Date().getTime();
		let delta = now - this.lastInvulnerable;
		if (delta >= 1000) {
			this.invulnerable = false;
			
		}
	}
	
	move()
	{
		
		this.update_invulnerable();
		revolver.updateBullets();
		//if(this.weapon instanceof Revolver) 
				//this.weapon.updateBullets();
		//this.weapon.update();
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
			else if(this.weapon instanceof Axe && !this.weapon.swinging) 
				this.weapon = revolver; 
			this.weapon.update();
			keys[CONTROL] = 0;
		}
		
		//left arrow pushed
		if(keys[LEFT_ARROW])
		{
			this.faceX = -1;
			this.faceXX = -1;
			this.faceY = 0;
			if(this.handleCollision(dwight.x - dwight.acc, dwight.y))
			{
				
				dwight.x-= dwight.acc;
				camera.update();
				this.weapon.update();
				map.resort(this);
				//this.walkOverVomit()
				
				//progressing the walking animation
				let now = new Date().getTime();
				let delta = now - this.lastFrame;
				if (delta >= 100) {
					this.lastFrame = new Date().getTime();
					this.frame++;
					if(this.frame > 5)
						this.frame = 0;
				}
			}
			
		}
		if(keys[RIGHT_ARROW])
		{
			this.faceX = 1;
			this.faceXX = 1;
			
			this.faceY = 0;
			if(this.handleCollision(dwight.x  + dwight.acc, dwight.y))
			{
				
				camera.offSetX -= dwight.acc;
				dwight.x+=dwight.acc;
				this.weapon.update();
				map.resort(this);
				//this.walkOverVomit()
				
				//progressing the walking animation
				let now = new Date().getTime();
				let delta = now - this.lastFrame;
				if (delta >= 100) {
					this.lastFrame = new Date().getTime();
					this.frame++;
					if(this.frame > 5)
						this.frame = 0;
				}
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
				//this.walkOverVomit()
				
				//progressing the walking animation
				let now = new Date().getTime();
				let delta = now - this.lastFrame;
				if (delta >= 70) {
					this.lastFrame = new Date().getTime();
					this.frame++;
					if(this.frame > 5)
						this.frame = 0;
				}
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
				//this.walkOverVomit()
				
				//progressing the walking animation
				let now = new Date().getTime();
				let delta = now - this.lastFrame;
				if (delta >= 70) {
					this.lastFrame = new Date().getTime();
					this.frame++;
					if(this.frame > 5)
						this.frame = 0;
				}
			}
			
		}
	}
	
	checkVomit(x2,y2)
	{
		let x = this.x;
		let y = this.y + (this.height - 10);
		let xw = x + this.width;
		let yh = y + 10;
		let x2w = x2 + 50;
		let y2h = y2 + 30;
		
		if(x > x2 && x < x2w && y > y2 && y < y2h)
			return true;
		if(xw > x2 && xw < x2w && y > y2 && y < y2h)
			return true;
		if(x > x2 && x < x2w && yh > y2 && yh < y2h)
			return true;
		if(xw > x2 && xw < x2w && yh > y2 && yh < y2h)
			return true;
		
		return false;
	}
	
	
	
	walkOverVomit()
	{
		
		//if(this.invulnerable)
			//return;
		
		//if(map.floors[0].boss.state == STATE.VOMITING)
			//return;
		if(map.current_floor != 0)
			return;
		
		this.acc = 7;
		
		for(let i = 0; i < map.floors[0].boss.vomits.length; i++)
		{
			if(this.checkVomit( map.floors[0].boss.vomits[i].x,map.floors[0].boss.vomits[i].y))
			{
				//this.life = 1;
				//this.lastInvulnerable = new Date().getTime();
				//this.invulnerable = true;
				this.acc = 2;
				break;
			}
		}
	}
	
	getSourceY()
	{
		if(this.faceY == 1 || this.faceY == 0)
			return 0;
		else
			return 70;
	}
	
	draw()
	{
		if(this.invulnerable)
		{
			let now = new Date().getTime();
			let delta = now - this.lastInvulnerable;
			if(this.invulnerable && delta > 0 && delta < 50)
			{
				push();
				tint(255,0,0,255);
				super.draw();
				this.drawLife();
				pop();
				return;
			}
			if ((delta >= 50 && delta < 100) || (delta >= 300 && delta < 400) || (delta >= 600 && delta < 700) || (delta >= 900 && delta < 1000)) {
				return;
			}
			this.speak("AIE !!!");
		}
		//super.draw();
		
		if(this.faceX != 0)
		{
			let sourceX = this.frame;
			//if(this.frame >= 6)
				//sourceX = this.frame - 6;
			if(this.faceX > 0)
				image(dwight_side_animation, this.x + camera.offSetX, this.y + camera.offSetY, 36, 70, sourceX*36,0,36,70)
			else
				{
					push();
						let sourceX = this.frame;
						//if(this.frame >= 6)
							//sourceX = this.frame - 6;
						translate(this.x+camera.offSetX,this.y+camera.offSetY);
						scale(-1,1);
						//image(dwight_side_animation, -36, 0, this.w, this.h,0,0,36,70)
						image(dwight_side_animation, -36, 0, 36, 70,36*sourceX,0,36,70)
					pop();
				}
			
		}
		else
			image(this.anim, this.x + camera.offSetX, this.y + camera.offSetY, this.width, this.height, this.width*this.frame,this.getSourceY(),this.width,this.height)
		//console.log("this.anim ", this.anim);
		//image(this.anim, this.x + camera.offSetX, this.y + camera.offSetY, 36, 70, 36*this.frame,0,36,70)
		this.drawBleeding();
		
		this.drawLife();
		
	}
	
	drawLife()
	{
		push();
			textSize(10);
			fill(0,0,0);
			//text('HP : ' + this.life, this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-10);
			textSize(12);
			text('Dwight', this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-10);
		pop();
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
	DEAD: 3,
	VOMITING: 4,
	STUNNED: 5,
	WAITING: 6,
	SPITTING: 7,
	RUSHING: 8,
	 SPEAKING: 9
 }
 
 
 
class Boss extends Character{
	constructor (x, y, width, height, img,id,life,state,velocity,name) {
		super(x, y, width, height, img,id);
		this.life = life;
		this.state = state;
		this.chaseLine = [createVector(0, 0),createVector(0, 0)];
		this.vecRoam = createVector(0, 0);
		this.velocity = velocity;
		this.name = name;
		this.alive_img = img;
		this.max_life = life;
		this.last = new Date().getTime();
		
		this.init_width = width;
		this.init_height = height;
		this.start_x = x;
		this.start_y = y;
		
		//this.lastStunned = new Date().getTime();
		
	}
	
	die()
	{
		this.state = STATE.DEAD;
		this.img = boss_dead;
		this.y += 70;
		this.width = 80;
		this.height = 22;
		//map.floors[map.current_floor].bloods.push(new Blood(this.x, this.y+this.height,40,20))
		this.bleed(this.x+10, this.y+this.height/2,40,20)
		boss_death_sound.play();
	}
	
	revive()
	{
		this.state = STATE.ROAMING;
		this.img = this.alive_img;
		this.width = this.init_width;
		this.height = this.init_height;
		this.life = this.max_life;
		this.x = this.start_x;
		this.y = this.start_y;
	}
	
	takeDmg(x,y)
	{
		this.life--;
		this.state = STATE.STUNNED
		this.lastStunned = new Date().getTime();
		super.takeDmg(x,y);
		dwight_hit_sound.play();
		if(this.life == 0)
			this.die();
	}
	
	stunned()
	{
		let now = new Date().getTime();
		let delta = now - this.lastStunned;
		if (delta >= 100) {
			this.state = STATE.CHASING
		}
	}
	
	update()
	{
		switch (this.state) {
	  
			  case STATE.ROAMING:
			  this.roam();
			  this.detectPlayer();
			  break;
			  
			  case STATE.CHASING:
			  this.chase();
			  this.detectPlayer();
			  break;
			  
			  case STATE.IDLE:
			  break;
			  
			  case STATE.DEAD:
			  break;
			  
			  case STATE.STUNNED:
			  this.stunned();
			  break;
			  
			  default:
			  break;
		  }
	}
	
	roam()
	{
		let v1 = createVector(this.x + 40/2 + camera.offSetX, this.y + 80/2 + camera.offSetY);
		let v2 = createVector(this.vecRoam.x+camera.offSetX, this.vecRoam.y+camera.offSetY)
		this.chaseLine[0].set(v1.x, v1.y);
		this.chaseLine[1].set(v2.x, v2.y);
		
		let distance = p5.Vector.dist(v1, v2);
		
		if(distance < 5)
		{
			this.vecRoam = createVector(random(100,900), random(100,900));
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
		  this.vecRoam = createVector(random(100,900), random(100,900));
	  
	    if(this.handleCollision(this.x, this.y - yVelocity))
	    {
		  this.y-=yVelocity;
		  map.resort(this);
	    }
	    else
		  this.vecRoam = createVector(random(100,900), random(100,900)); 
	}
	
	chase()
	{
		  let v1 = createVector(this.x + 40/2 + camera.offSetX, this.y + 80/2 + camera.offSetY);
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
	
	detectPlayer()
	{ 
		let x1 = this.x + 40/2;
		let x2 = dwight.x + 36/2;
		let y1 = this.y+ 80/2;
		let y2 = dwight.y+ 70/2;
		
		var dist = Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
		if(dist < 300)
		{
			if(this.state == STATE.ROAMING)
				this.state = STATE.CHASING;
		}
		if(dist < 20)
		{
			dwight.takeDmg();
		}
		return dist;
	}
	
	draw()
	{
		super.draw();
		this.drawLife();
	}
	
	drawLife()
	{
		if(this.state == STATE.DEAD)
			return;
		push();
			textSize(10);
			fill(0,0,0);
			//text('HP : ' + this.life, this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-10);
			textSize(12);
			text(this.name, this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-10);
		pop();
	}
	
	drawChaseLine()
	{
		stroke(255,0,0);
		line(this.chaseLine[0].x, this.chaseLine[0].y, this.chaseLine[1].x, this.chaseLine[1].y);
	}
}

class CEO_Boss extends Boss{
	constructor (x, y, width, height, img,id,life,state,velocity,name) {
		super(x, y, width, height, img,id,life,state,velocity,name);
		this.weapon = new Shotgun(this.x,this.y,38,9,shotgun,this)
		this.shot = false;
		this.speach = false;
		this.lastSpeak = new Date().getTime();
		this.speach_list=["TAKE THAT DWIGHT !!", "DIE !!!", "HERE'S YOUR PROMOTION DWIGHT !", "MOUHAHAHAHAHAHA", "YOU WILL DIE TODAY", "EMPLOYEE OF THE MONTH MY ASS", "IM THE CEO IM THE BOSS"]
		this.speach_index = 0;
	}
	
	speaking()
	{
		let now = new Date().getTime();
		let delta = now - this.lastSpeak;
		if (delta >= 800) {
			this.state = STATE.CHASING;
			this.speach_index++;
			if(this.speach_index >= this.speach_list.length)
				this.speach_index = 0;
		}
	}
	
	update()
	{
		super.update();
		
		if(this.state != STATE.DEAD)
			this.weapon.update();
		
		switch (this.state) {
	  
			  case STATE.SPEAKING:
			  //this.speak("HAHAHAHAHA");
				this.speaking();
			  break;
		}
		
		
	}
	
	draw()
	{
		super.draw();
		if(this.state == STATE.SPEAKING)
			//this.speak("TAKE THAT DWIGHT !!!");
			this.speak(this.speach_list[this.speach_index]);
		
		if(this.state != STATE.DEAD)
			this.weapon.draw();
	}
	
	die()
	{
		super.die();
		this.img = ceo_boss_dead;
	}
	
	roam()
	{
		if(this.vecRoam.x > 500 || this.vecRoam.y > 500 - 60)
			this.vecRoam = createVector(random(100,500), random(100,440)); 
		super.roam();
	}
	
	chase()
	{
		if(dwight.x > 500 || dwight.y > 500 - 60)
			{
				this.state = STATE.ROAMING;
				return;
			}
		super.chase();
	}
	
	detectPlayer()
	{
		if(dwight.x > 500 || dwight.y > 500 - 60)
			return;
		let dist = super.detectPlayer();
		
		if(dist < 300)
		{
			this.weapon.shoot();
			let now = new Date().getTime();
			let delta = now - this.lastSpeak;
			if (delta < 1500) {
				return;
			}
			this.lastSpeak = new Date().getTime();
			this.state = STATE.SPEAKING;
			//if(this.speach_index != 0)
				
		}
	}
	
	/*drawLife()
	{
		super.drawLife();
		push();
			textSize(10);
			fill(0,0,0);
			text('STATE : ' + this.state, this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-30);
		pop();
	}*/
}

class Vomit_puddle{
	 constructor (x, y, width, height, id) {
		 this.x = x;
		 this.y = y;
		 this.width = width;
		 this.height = -10;
		 this.draw_height = height;
		 this.id = id;
		 this.img = vomit_puddle_img;
		 this.lastStunned;
	 }
	 
	 draw()
	 {
		 image(this.img, this.x+camera.offSetX,this.y+camera.offSetY,this.width,this.draw_height)
	 }
 }

class Hank_Boss extends Boss{
	constructor (x, y, width, height, img,id,life,state,velocity,name) {
		super(x, y, width, height, img,id,life,state,velocity,name);
		this.lastRush = new Date().getTime();
		this.v1;
		this.v2;
		this.saveState = this.state;
	}
	
	stunned()
	{
		let now = new Date().getTime();
		let delta = now - this.lastStunned;
		if (delta >= 100) {
		   
			this.state = this.saveState;
		}
		if (delta >= 2000) {
		   
			this.state = STATE.ROAMING;
		}
	}
	
	takeDmg(x,y)
	{
		this.saveState = this.state;
		super.takeDmg(x,y);
	}
	
	die()
	{
		super.die();
		this.img = hank_dead;
	}
	
	detectPlayer()
	{
		let dist = super.detectPlayer();
		let now = new Date().getTime();
		let delta = now - this.lastRush;
		
		if(dist > 150 && dist < 800)
			{
				if(delta > 2500)
					{
						this.lastRush = new Date().getTime();
						this.state = STATE.RUSHING;
				
						this.v1 = createVector(this.x + 40/2 , this.y + 80/2);
						
						let posX = dwight.x + 36/2;
						let posY = dwight.y + 70/2;
						this.v2 = createVector(posX , posY );
						
						this.velocity = 5;
					}
			}
	}
	
	rush()
	{
			
		this.v1 = createVector(this.x + 40/2 , this.y + 80/2 );
		
		let distance = p5.Vector.dist(this.v1, this.v2);
		
		if(distance < 5)
		{
			this.state = STATE.CHASING;
			this.velocity = 2;
			return;
		}
		  let dx = this.v1.x - this.v2.x;
		  let dy = this.v1.y - this.v2.y;
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
				  this.velocity = 2;
				  this.state = STATE.STUNNED;
				  this.lastStunned = new Date().getTime();
				  return;
				  //this.lastRush = new Date().getTime();
			  }
		  if(this.handleCollision(this.x, this.y - yVelocity))
		  {
			this.y-=yVelocity;
			map.resort(this);
		  }
		  else
			  {
				  this.velocity = 2;
				  this.state = STATE.STUNNED;
				  this.lastStunned = new Date().getTime();
				  //this.lastRush = new Date().getTime();
			  }
		
	}
	
	update()
	{
		super.update();
		
		switch (this.state) {
				
			case STATE.RUSHING:
				this.detectPlayer();
				this.rush();
				
				break;
		}
	}
	
	/*drawLife()
	{
		super.drawLife();
		push();
			textSize(10);
			fill(0,0,0);
			text('STATE : ' + this.state, this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-30);
		    text('saveState : ' + this.saveState, this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-40);
		pop();
		
	}*/
	
	
}

class Creed_Boss extends Boss{
	constructor (x, y, width, height, img,id,life,state,velocity,name) {
		super(x, y, width, height, img,id,life,state,velocity,name);
		this.phase = 1;
		this.blinking = false;
		this.blinkingX;
		this.blinkingY;
		this.lastBlink = new Date().getTime();
	}
	
	blink()
	{
		this.lastBlink = new Date().getTime();
		this.blinking = true;
		this.blinkingX = this.x;
		this.blinkingY = this.y;
		this.x = random(100,800);
		this.y = random(100,900);
		blink_sound.play();
	}
	
	revive()
	{
		super.revive();
		this.phase = 1;
		this.name = "CREED";
	}
	
	update()
	{
		super.update();
		
		if(this.phase != 1)
			return;
		if(this.blinking)
			return;
		
		let now = new Date().getTime();
		let delta = now - this.lastBlink;
		
		let dist = this.detectPlayer();
		
		if(dist < 150)
			{
				this.velocity = 10;
			}
		if(dist < 20)
			{
				this.velocity = 2;
				this.blink();
			}
		
		if(dist > 150 && dist < 1000 && delta > 1500)
			{
				this.blink();
			}
	}
	
	takeDmg(x,y)
	{
		super.takeDmg(x,y);
		if(this.phase == 1)
		{
			this.velocity = 2;
			this.blink();
		}
		//super.takeDmg(this.x,this.y);
		
	}
	
	die()
	{
		if(this.phase == 1)
		{
			this.phase = 2;	
			this.width *= 1.5;
			this.height *= 1.5;
			this.life = 15;
			this.name = "ZOMBIE CREED";
			this.velocity = 2;
			this.blink();
			this.img = creed_zombie;
			boss_death_sound.play();
			
		}
		else if(this.phase == 2)
		{
			super.die();
			this.img = creed_dead;
			this.width = 70;
			this.height = 14;
			this.width *= 1.5;
			this.height *= 1.5;
			map.resort(this);
		}
		
	}
	
	
	
	draw()
	{
		super.draw();
		
		if(this.blinking)
		{
			let now = new Date().getTime();
			let delta = now - this.lastBlink;
			if (delta >= 800) {
				this.blinking = false;
			}
			push();
				tint(255,255-delta)
				image(blink_image,this.blinkingX+camera.offSetX, this.blinkingY+camera.offSetY, this.width, this.height);
				noTint();
			pop();
			
		}
	}
}

class Spit{
	constructor (x, y, w, h,id){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.id = id;
		this.spitOrig = createVector(this.x + 18, this.y+ 18 );
		this.spitDest = createVector(dwight.x + 36/2 , dwight.y + 70/2);
		this.velocity = 5;
		this.going = true;
		
	}
	
	handleCollision()
	{
		let x = this.x
		let x2 = dwight.x
		let y = this.y
		let y2 = dwight.y
		let xw = x + this.w
		let x2w = x2 + dwight.width
		let yh = y + this.h
		let y2h = y2 + dwight.height
		if(x > x2 && x < x2w && y > y2 && y < y2h)
			return false;
		if(xw > x2 && xw < x2w && y > y2 && y < y2h)
			return false;
		if(x > x2 && x < x2w && yh > y2 && yh < y2h)
			return false;
		if(xw > x2 && xw < x2w && yh > y2 && yh < y2h)
			return false;
		return true;
	}
	
	createVomit()
	{
		
		map.z_index_map[map.current_floor] = map.z_index_map[map.current_floor].filter(x => x.id !== this.id)
		this.going = false;
		//map.floors[map.current_floor].boss.spits = map.floors[map.current_floor].boss.spits.filter(x => x.id != this.id);
		
		map.floors[map.current_floor].boss.vomits.push(new Vomit_puddle(this.x,this.y,0,30,(map.floors[map.current_floor].boss.vomits.length)+200));
		//map.z_index_map[map.current_floor].push(new Tile_To_Draw(map.floors[map.current_floor].boss.vomits[map.floors[map.current_floor].boss.vomits.length - 1].x/100,map.floors[map.current_floor].boss.vomits[map.floors[map.current_floor].boss.vomits.length - 1].y/100,1,true,(map.floors[map.current_floor].boss.vomits.length - 1)+200));
		//map.resort(map.floors[map.current_floor].boss.vomits[map.floors[map.current_floor].boss.vomits.length - 1]);
		map.floors[map.current_floor].bloods.push(new Vomit_puddle(this.x,this.y,0,30,(map.floors[map.current_floor].boss.vomits.length)+200));
	}
	
	
	update()
	{
		if(!this.going)
			return;

		let v1 = this.spitOrig;
		let v2 = this.spitDest;
		  
		  
		  let dx = v1.x - v2.x;
		  let dy = v1.y - v2.y;
		  let angle = atan2(dy, dx)
		  
		  let xVelocity = this.velocity * cos(angle);
		  let yVelocity = this.velocity * sin(angle);
		  
		
			this.x-=xVelocity;
			
			this.y-=yVelocity;
		
		if(!this.handleCollision())
		{
			this.createVomit();
			dwight.takeDmg();
			return;
			
		}
		
		v1 = createVector(this.x+18, this.y+18);
		
		let distance = p5.Vector.dist(v1, v2);
		
		if(distance < 5)
			{
				this.createVomit();
			}
		  
	}
	
	draw()
	{
		push();
		fill(0,255,0)
		noStroke();
		circle(this.x + camera.offSetX, this.y+camera.offSetY, 15)
		pop();
	}
}

class Basement_Boss extends Boss{
	constructor (x, y, width, height, img,id,life,state,velocity,name) {
		super(x, y, width, height, img,id,life,state,velocity,name);
		this.vomiting = false;
		this.vomits = [];
		this.vomitProgression = 0;
		this.lastSpit = new Date().getTime();
		this.spits = [];
		this.spitCount = 0;
	}
	
	die()
	{
		super.die();
		
		if(this.state == STATE.VOMITING)
			this.vomitProgression = 0;
		
		this.vomits.push(new Vomit_puddle(this.x,this.y,100,60,(this.vomits.length)+200));
		map.floors[map.current_floor].bloods.push(new Vomit_puddle(this.x,this.y,100,60,(this.vomits.length)+200))
		/*map.z_index_map[map.current_floor].push(new Tile_To_Draw(this.vomits[this.vomits.length - 1].x/100,this.vomits[this.vomits.length - 1].y/100,1,true,(this.vomits.length - 1)+200));
		map.resort(this.vomits[this.vomits.length - 1]);*/
		
	}
	
	takeDmg(x,y)
	{
		if(this.state == STATE.VOMITING)
			this.vomitProgression = 0;
		
		
		super.takeDmg(x,y);
	}
	
	vomit()
	{
		let now = new Date().getTime();
		let delta = now - this.last;
		this.vomitProgression += 4;
		
		if (delta >= 500) {
			this.vomitProgression = 0;
			this.state = STATE.CHASING;
			this.vomits.push(new Vomit_puddle(this.x,this.y+80,0,30,(this.vomits.length)+200));
			/*map.z_index_map[map.current_floor].push(new Tile_To_Draw(this.vomits[this.vomits.length - 1].x/100,this.vomits[this.vomits.length - 1].y/100,-1,true,(this.vomits.length - 1)+200));
			map.resort(this.vomits[this.vomits.length - 1]);*/
			map.floors[map.current_floor].bloods.push(new Vomit_puddle(this.x,this.y+80,0,30,(this.vomits.length)+200))
			//vomit_sound.play();
		}
		
	}
	
	spit()
	{
		let now = new Date().getTime();
		let delta = now - this.lastSpit;
		
		
		if (delta >= 300) {
			this.state = STATE.CHASING;
			
			spit_sound.play();
			this.spits.push(new Spit(this.x+18, this.y+18,10,10,(this.spitCount)+300));
			this.spitCount++;
			if(this.spitCount > 100)
				this.spitCount = 0;
			map.z_index_map[map.current_floor].push(new Tile_To_Draw(this.spits[this.spits.length - 1].x/100,this.spits[this.spits.length - 1].y/100,1000,false,(this.spits.length - 1)+300));
			//map.resort(this.spits[this.spits.length - 1]);
		}
	}
	
	
	
	detectPlayer()
	{ 
		let dist = super.detectPlayer();
		if(this.state != STATE.CHASING)
			return;
		
		if(dist > 150 && dist < 800)
		{
			let now = new Date().getTime();
			let delta = now - this.lastSpit;
			if (delta >= 1500)
			{
				this.state = STATE.SPITTING;
				this.lastSpit = new Date().getTime();
			}
		}
		if(dist < 150)
		{
			
			let now = new Date().getTime();
			let delta = now - this.last;
			if (delta >= 4000)
			{
				this.state = STATE.VOMITING;
				this.last = new Date().getTime();
			}

		}
	}
	
	update()
	{
		
		super.update();
		dwight.walkOverVomit();
		for(let i = 0; i < this.spits.length; i++)
			{
				this.spits[i].update();
			}
		switch (this.state) {
	
			case STATE.VOMITING:
			  this.vomit();
			  break;
			
			case STATE.SPITTING:
				this.spit();
				break;
			
			
		}
	}
	
	draw()
	{
		super.draw();
		
		if(this.state == STATE.VOMITING)
		{
			push();
			noStroke();
			fill(50,250,50)
			rect(this.x+camera.offSetX + 18, this.y+camera.offSetY + 18,5,this.vomitProgression)
			pop();
			
			this.speak("BEUUUARGHLOUGHARG");
		}
		if(this.state == STATE.SPITTING)
			this.speak("SPFIOUUU");
	}
	
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
		this.life = 5;
		this.lastWait = new Date().getTime(); 
		this.speaking = false;
		this.lastStunned;
		this.frame = 0;
		this.lastFrame = new Date().getTime();
		this.sourceY = 0;
		this.sensAnim = 1;
		
		
	}
	
	takeDmg(x,y)
	{
		if(this.zombieState == STATE.DEAD)
			return;
		
		this.life--;
		this.zombieState = STATE.STUNNED
		this.lastStunned = new Date().getTime(); 
		super.takeDmg(x,y);
		
		if(this.life == 0)
			this.die();
		else
		{
			if(!zombie_hit_sound.isPlaying())
				zombie_hit_sound.play();
		}
	}
	
	revive()
	{
		this.zombieState = STATE.ROAMING;
		this.img = zombie;
		this.width = 36;
		this.height = 70;
		this.life = 5;
	}
	
	die()
	{
		this.zombieState = STATE.DEAD;
		this.img = dwight_dead;
		this.y += 56;
		this.width = 70;
		this.height = 14;
		//map.floors[map.current_floor].bloods.push(new Blood(this.x+10, this.y+this.height/2,40,20))
		this.bleed(this.x+10, this.y+this.height/2,40,20)
		this.speaking = false;
		if(!zombie_death_sound.isPlaying())
			zombie_death_sound.play();
		
	}
	
	
	draw()
	{
		if(this.zombieState == STATE.DEAD)
			{
				
				if(this.sourceY == 2)
					{
						 push();
						translate(this.x+camera.offSetX,this.y+camera.offSetY);
						scale(-1,1);
						image(this.img,-70,0);
						pop();
					}
				else
					image(this.img,this.x+camera.offSetX,this.y+camera.offSetY);
				this.drawBleeding();
				return;
			}
		let now = new Date().getTime();
		let delta = now - this.lastFrame;
			if (delta >= 100)
			{
				this.frame+=this.sensAnim;
				
				if(this.frame == 5 || this.frame == 0)
					this.sensAnim*=-1;
				this.lastFrame = new Date().getTime();
			}
		
		   if(this.sourceY == 3)
			   {
				   push();
					translate(this.x+camera.offSetX,this.y+camera.offSetY);
					scale(-1,1);
					image(zombie_animation,-36, 0, this.width, this.height,this.frame*this.width,(this.sourceY-1)*this.height,this.width, this.height);
					pop();
				   
			   }
			else
				image(zombie_animation,this.x+camera.offSetX, this.y+camera.offSetY, this.width, this.height,this.frame*this.width,this.sourceY*this.height,this.width, this.height);
		
		this.drawBleeding();
		//super.draw();
		//this.drawChaseLine();
		//this.drawLife();
		//this.drawBleeding();
		if(this.speaking)
			this.speak("bleuargh ?!?!!")
	}
	
	drawLife()
	{
		if(this.zombieState == STATE.DEAD)
			return;
		push();
		textSize(10);
		fill(0,0,0);
		text('HP : ' + this.life, this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-10);
		textSize(12);
		text('ZOMBIE', this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-20);
		text('ID ' + this.id, this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-30);
		pop();
	}
	
	setZombieInitPosition()
	{
		this.zombieState = STATE.ROAMING;
		this.x = this.initX;
		this.y = this.initY;
		this.vecRoam = createVector(random(100,900), random(100,900));
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
				
			case STATE.WAITING:
				this.wait();
				break;
			  
			  case STATE.DEAD:
			  break;
				
			case STATE.STUNNED:
				this.stunned();
				break;
			  
			  default:
			  break;
		  }
	}
	
	wait()
	{
		let now = new Date().getTime();
		let delta = now - this.lastWait;
		if (delta >= 500) {
			this.zombieState = STATE.ROAMING;
			this.speaking = false;
		}
	}
	
	stunned()
	{
		let now = new Date().getTime();
		let delta = now - this.lastStunned;
		if (delta >= 100) {
			this.zombieState = STATE.CHASING
		}
	}
	
	setSourceY(xVel,yVel)
	{
		if(Math.abs(xVel) > Math.abs(yVel))
			{
				if(xVel > 0)
					this.sourceY = 3;
		  		else
					this.sourceY = 2;
			}
		else
			{
				if(yVel > 0)
				  this.sourceY = 1;
			    else
				  this.sourceY = 0;
			}
	}
	
	roam()
	{
		let v1 = createVector(this.x + 36/2 + camera.offSetX, this.y + 70/2 + camera.offSetY);
		
		let v2 = createVector(this.vecRoam.x+camera.offSetX, this.vecRoam.y+camera.offSetY)
		
	    this.chaseLine[0].set(v1.x, v1.y);
		this.chaseLine[1].set(v2.x, v2.y);
		
		
		let distance = p5.Vector.dist(v1, v2);
		
		if(distance < 5)
		{
			
			this.vecRoam = createVector(random(0,800), random(0,600));
			v2 = createVector(this.vecRoam.x+camera.offSetX, this.vecRoam.y+camera.offSetY)
			this.zombieState = STATE.WAITING;
			this.lastWait = new Date().getTime();  
			this.speaking = true;
		}
		
		  let dx = v1.x - v2.x;
		  let dy = v1.y - v2.y;
		  let angle = atan2(dy, dx)
		  
		  let xVelocity = this.velocity * cos(angle);
		  let yVelocity = this.velocity * sin(angle);
		
		  /*if(yVelocity > 0)
			  this.sourceY = 1;
		  else
			  this.sourceY = 0;*/
		  this.setSourceY(xVelocity,yVelocity);
		  if(this.handleCollision(this.x - xVelocity, this.y))
		  {
			this.x-=xVelocity;
			map.resort(this);
		  }
		  else
		  {
			  this.vecRoam = createVector(random(0,800), random(0,600));
			  this.zombieState = STATE.WAITING;
			  this.lastWait = new Date().getTime(); 
			  this.speaking = true;
		  }
		  if(this.handleCollision(this.x, this.y - yVelocity))
		  {
			this.y-=yVelocity;
			map.resort(this);
		  }
		  else
		  {
			   this.vecRoam = createVector(random(0,800), random(0,600));
			   this.zombieState = STATE.WAITING;
			   this.lastWait = new Date().getTime(); 
			   this.speaking = true;
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
		/*if(yVelocity > 0)
			  this.sourceY = 1;
		  else
			  this.sourceY = 0;*/
		  this.setSourceY(xVelocity,yVelocity);
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
	
	detectPlayer(x1,x2,y1,y2)
	{
		var dist = Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
		if(dist < 300)
		{
			this.zombieState = STATE.CHASING;
		}
		if(dist < 30)
		{
			dwight.takeDmg();
		}
	}
	
	checkCollisionMovObj(x,y,i)
	{
		let xw = x + 36;
		let yh = y + 70;
		y = y + 60;
		let x2 = map.floors[map.current_floor].enemies[i].x;
		let x2w = x2 + map.floors[map.current_floor].enemies[i].width;
		let y2 = map.floors[map.current_floor].enemies[i].y;
		let y2h = y2 + map.floors[map.current_floor].enemies[i].height;
		y2 = y2 + 60;
		if(x > x2 && x < x2w && y > y2 && y < y2h)
			return false;
		if(xw > x2 && xw < x2w && y > y2 && y < y2h)
			return false;
		if(x > x2 && x < x2w && yh > y2 && yh < y2h)
			return false;
		if(xw > x2 && xw < x2w && yh > y2 && yh < y2h)
			return false;
		return true;
	}
	
	checkCollisionBoss(x,y)
	{
		if(map.floors[map.current_floor].boss == null)
			return true;
		
		let xw = x + 36;
		let yh = y + 70;
		y = y + 60;
		let x2 = map.floors[map.current_floor].boss.x;
		let x2w = x2 + map.floors[map.current_floor].boss.width;
		let y2 = map.floors[map.current_floor].boss.y;
		let y2h = y2 + map.floors[map.current_floor].boss.height;
		y2 = y2 + map.floors[map.current_floor].boss.height - 10;
		if(x > x2 && x < x2w && y > y2 && y < y2h)
			return false;
		if(xw > x2 && xw < x2w && y > y2 && y < y2h)
			return false;
		if(x > x2 && x < x2w && yh > y2 && yh < y2h)
			return false;
		if(xw > x2 && xw < x2w && yh > y2 && yh < y2h)
			return false;
		return true;
	}
	
	handleCollisionMovObj(x,y)
	{
		for(let i = 0; i < map.floors[map.current_floor].enemies.length; i++)
			{
				if( map.floors[map.current_floor].enemies[i].id === this.id)
				{
					//console.log("this")
					continue;
				}
				if(!this.checkCollisionMovObj(x,y,i))
					return false;
					
			}
		if(!this.checkCollisionBoss(x,y))
			return false;
		return true;
	}
	
	handleCollision(x,y)
	{
		if(!this.handleCollisionMovObj(x,y))
			return;
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