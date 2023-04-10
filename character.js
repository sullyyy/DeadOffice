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
					if(map.generatorOn)
						generator_sound.loop();
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
					
					/*if(map.cleaning_platform_pos == 0)
					{
						gameState = CLEANING_PLATFORM_SCRIPT
						//map.cleaning_platform_pos = 1;
						//map.travelTo(5,2,12)
					}
					else
					{
						gameState = CLEANING_PLATFORM_SCRIPT
						//map.cleaning_platform_pos = 0;
						//map.travelTo(5,2,10)
					}*/
					gameState = CLEANING_PLATFORM_SCRIPT;
					cleaning_platform_sound.play();
					dwight.faceY = 0;
					dwight.faceX = 0;
					dwight.faceXX = 0;
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
					generator_sound.stop();
					door_sound.play();
					map.travelTo(5,7,15)
					map.floors[5].boss.state = STATE.WAITING;
					map.floors[5].boss.phase = 3;
					map.floors[5].boss.x = 800;
					map.floors[5].boss.y = 200;
					
					//f
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
					dwight.acc = 4;
					//dwight.scale = 0.5;
					//game_scale = 0.5;
					//dwight.x = 300;
					//dwight.y = 1000;
					camera.lookAtObj(null);
					camera.lookAt(200,1400);
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
				//eating cake
				if(map.map_array[map.current_floor][floor(y1h/100)][floor(x1/100)].game_id == 81)
				{
					gameState = CAKE_DIALOG;
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

let cop;
const STATE_01 = 0
const STATE_02 = 1
const STATE_03 = 2
const STATE_04 = 3
const STATE_05 = 4

class Dead_PNJ extends Character{
	constructor (x, y, width, height, img,id) {
		super(x, y, width, height, img, id );
	}
	
	draw(){
		image(this.img,this.x+camera.offSetX, this.y+camera.offSetY, this.width, this.height);
	}
	
	update(){
		
	}
}

class PNJ extends Character{
	constructor (x, y, width, height, img,id) {
		super(x, y, width, height, img, id );
		this.anim = jim_animation;
		this.frame = 0;
		this.lastFrame = new Date().getTime();
		
		this.sensAnim = 1;
		this.sourceY = 0;
		this.state = STATE.WAITING;
		this.moving = false;
		this.speech = false;
		this.scriptState = STATE_01;
		this.life = 1;
		this.speechList = ["DWIGHT HELP !!!","OMG DWIGHT\nthere's zombies everywhere","We were eating cake and...\nEveryone started to turn into\nZOMBIES !!!", "OH NO !!!","GO AWAY !!!"]
		this.speechInd = 0;
		this.lastSpeech = new Date().getTime();
		this.show = false;
		this.dirX = 1;
	}
	
	wait()
	{
		
		
		if(dwight.x > 400 && dwight.y > 300)
		{
			//this.STATE = STATE.SCRIPTED;
			gameState = CONVERSATION;
			this.state = STATE.SCRIPTED;
			
			this.moving = true;
			this.speech = true;
			this.show = true;
		}
	}
	
	roam()
	{
		
	}
	
	script()
	{
		switch(this.scriptState)
			{
				case STATE_01:
					this.move(3,-2);
					if(this.x < 650 && this.y + 50 > dwight.y)
					{
						this.scriptState = STATE_02;
						this.moving = false;
						this.speech = true;
						//map.floors[map.current_floor].enemies[0].zombieState = STATE.CHASING;
					}
					break;
					
				case STATE_02:
					let now = new Date().getTime();
					let delta = now - this.lastSpeech;
					if (delta >= 1500) {
						this.speechInd++;
						this.lastSpeech = now;
						if(this.speechInd == 2)
						{
							map.floors[map.current_floor].enemies[0].zombieState = STATE.CHASING;
							map.floors[map.current_floor].enemies[0].show = true;
						}
						if(this.speechInd == 4)
						{
							//map.floors[map.current_floor].enemies[0].zombieState = STATE.CHASING;
							this.scriptState = STATE_03;
							this.speech = false;
						}
					}
					break;
					
				case STATE_03:
					this.move(0,-1.5);
					this.moving = true;
					break;
					
				case STATE_04:
					let mov = this.move(this.dirX,0);
					this.moving = true;
					if(!mov)
						this.dirX *=-1;
					break;
					
				case STATE_05:
					this.moving = false;
					this.speech = true;
					let noww = new Date().getTime();
					let deltaw = noww - this.lastSpeech;
					if (deltaw >= 2000) {
						this.scriptState = STATE_04;
						this.speech = false;
					}
					break;
			}
		
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
	
	
	
	move(xVel,yVel)
	{
		let xVelocity = xVel;
		let yVelocity = yVel;
		 this.setSourceY(xVelocity,yVelocity);
		let moving = false;
		  if(this.handleCollision(this.x - xVelocity, this.y))
		  {
			this.x-=xVelocity;
			map.resort(this);
			  moving = true;
		  }
		  if(this.handleCollision(this.x, this.y - yVelocity))
		  {
			this.y-=yVelocity;
			map.resort(this);
			  //moving = true;
		  }
		return moving;
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
	
	takeDmg()
	{
		this.life--;
		super.takeDmg(this.x+this.width/2 + camera.offSetX,this.y+20+camera.offSetY);
		dwight_hit_sound.play();
		if(this.life == 0)
			this.die();
	}
	
	die()
	{
		this.bleed(this.x, this.y+this.height, 40,20)
		this.state = STATE.DEAD;
		map.floors[map.current_floor].enemies[0].chaseTarget = dwight;
		this.y += 70;
		this.width = 70;
		this.height = 14;
		
	}
	
	
	update()
	{
		switch (this.state) {
				
			case STATE.IDLE:
				
				this.wait()
				break;
				
			case STATE.SCRIPTED:
				this.script();
				break;
				
			case STATE.WAITING:
				this.wait();
				break;
			  
			  case STATE.DEAD:
			  break;
				
			case STATE.ROAMING:
				this.roam();
				break;
			  
			  default:
			  break;
		  }
	}
	
	draw()
	{
		if(!this.show)
			return;
		if(this.state == STATE.DEAD)
			{
				image(this.anim,this.x+camera.offSetX, this.y+camera.offSetY, this.width, this.height,0,210,this.width, this.height);
				this.drawBleeding();
				return;
			}
		if(!this.moving)
			{
				image(this.anim,this.x+camera.offSetX, this.y+camera.offSetY, this.width, this.height,0,0,this.width, this.height);
				this.drawBleeding();
				//this.drawLife();
				if(this.speech)
					//this.speak("OMG DWIGHT\nthere's zombies everywhere");
					this.speak(this.speechList[this.speechInd]);
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
					image(this.anim,-36, 0, this.width, this.height,this.frame*this.width,(this.sourceY-1)*this.height,this.width, this.height);
					pop();
				   
			   }
			else
				image(this.anim,this.x+camera.offSetX, this.y+camera.offSetY, this.width, this.height,this.frame*this.width,this.sourceY*this.height,this.width, this.height);
		if(this.speech)
		//this.speak("OMG DWIGHT\nthere's zombies everywhere");
			this.speak(this.speechList[0]);
		this.drawBleeding();
		
		//this.drawLife();
		
	}
	
	drawLife()
	{
		push();
			textSize(10);
			fill(0,0,0);
			//text('HP : ' + this.life, this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-10);
			textSize(12);
			text('Jim', this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-10);
			text('scrsta : '+this.scriptState, this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-15);
		pop();
	}
}



class Dwight extends Character{
    constructor (x, y, width, height, img,id) {
		super(x, y, width, height, img,id);
		this.acc = 7;
		this.alive = true;
		this.weapon;
		this.faceX = 0;
		this.faceXX = 0;
		this.anim = dwight_animation;
		this.frame = 0;
		this.lastFrame = new Date().getTime();
		this.items = [];
		this.currItems = 0;
		this.faceY = 0;
		this.life = 3;
		this.invulnerable = false;
		this.lastInvulnerable;
		this.speechList1 = ["PFFFF I HATE CAKE\nAND I HATE PARTIES","I THINK ITS OVER NOW\nI BETTER GET BACK"]
		this.speechList1_ind = 0;
		this.moving = false;
		this.scale = 1.0;
		
		this.endScriptStep = 0;
		
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
	
	updateEndScript()
	{
		if(this.endScriptStep == 0)
			{
				keys[DOWN_ARROW] = 1;
				if(dwight.y > 1430)
				{
					keys[DOWN_ARROW] = 0;
					this.endScriptStep = 1;
				}
			}
		else
			{
				keys[LEFT_ARROW] = 1;
				if(dwight.x < -200)
				{
					gameState = MENU;
				}
			}
		
		
		//keys[LEFT_ARROW] = 1;
		this.move();
	}
	
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
		dwight.speechList1_ind = 0;
		dwight.alive = true;
		dwight.addItems(empty_weapon)
		//dwight.addItems(axe)
		//dwight.addItems(revolver)
		dwight.weapon = this.items[0];
		//dwight.equipWeapon(empty_weapon);
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
	
	addItems(item)
	{
		this.items.push(item);
	}
	
	change_item()
	{
		this.currItems++;
		if(this.currItems >= this.items.length)
			this.currItems = 0;
			//let copiedPerson = JSON.parse(JSON.stringify(this.items[this.currItems]));
			//let copiedPerson = Object.assign({}, this.items[this.currItems]);
			//let copiedPerson = Object.create(this.items[this.currItems]);
			//this.weapon = copiedPerson;
			//this.weapon = axe;
			//cop = new Axe(500,200,20,42,loadImage('assets/img/axe.png'));
			//if(this.items[this.currItems] instanceof Axe)
				//console.log("oui")
			//this.weapon = cop;
			/*if(this.items[this.currItems] instanceof Axe)
				this.weapon = axe;
			if(this.items[this.currItems] instanceof Revolver)
				this.weapon = revolver;*/
		this.weapon = this.items[this.currItems];
		this.weapon.update();
		keys[CONTROL] = 0;
	}
	
	move()
	{
		this.moving = false;
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
		if(keys[69])
			{
				//map.floors[3].doors[0].open();
				for(let i = 0; i < map.floors[map.current_floor].doors.length; i++)
				{
					map.floors[map.current_floor].doors[i].tryOpen();
					//console.log(" dw y ", dwight.y)
					//console.log(" door j ", map.current_floor == 2 && map.floors[map.current_floor].doors[2].j)
					
					//trying to open pnj locked door
					if(map.current_floor == 2 && map.floors[map.current_floor].doors[2].j == Math.round((dwight.y)/100) && map.floors[map.current_floor].doors[2].i == Math.round((dwight.x)/100))
						{
							map.floors[2].pnjs[0].scriptState = STATE_05;
							map.floors[2].pnjs[0].lastSpeech = new Date().getTime();
							map.floors[2].pnjs[0].speechInd = 4;
						}
				}
				keys[69] = 0;
			}
		if(keys[82])
		{
			if(this.weapon instanceof Revolver) 
				this.weapon.reload();
			keys[82] = 0;
		}
		if(keys[CONTROL])
		{
			this.change_item();
			/*if(this.weapon instanceof Revolver) 
			{
				this.weapon = axe;
				//this.weapon = empty_weapon;
				keys[CONTROL] = 0;
			}
			else if(this.weapon instanceof Axe && !this.weapon.swinging) 
				this.weapon = revolver; 
			this.weapon.update();
			keys[CONTROL] = 0;*/
			
			
			//let copiedPerson = JSON.parse(JSON.stringify(this.items[this.currItems]));
			//let copiedPerson = Object.assign({}, this.items[this.currItems]);
			//let copiedPerson = Object.create(this.items[this.currItems]);
			//this.weapon = copiedPerson;
			//this.weapon = axe;
			//cop = new Axe(500,200,20,42,loadImage('assets/img/axe.png'));
			//if(this.items[this.currItems] instanceof Axe)
				//console.log("oui")
			//this.weapon = cop;
			/*if(this.items[this.currItems] instanceof Axe)
				this.weapon = axe;
			if(this.items[this.currItems] instanceof Revolver)
				this.weapon = revolver;*/
			
			/*this.currItems++;
			if(this.currItems >= this.items.length)
				this.currItems = 0;
			this.weapon = this.items[this.currItems];
			this.weapon.update();
			keys[CONTROL] = 0;*/
			
			//console.log("this.wzapon ", this.weapon)
			
		}
		
		//left arrow pushed
		if(keys[LEFT_ARROW])
		{
			this.moving = true;
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
			this.moving = true;
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
			this.moving = true;
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
			this.moving = true;
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
		if(!this.moving)
			this.frame = 0;
	}
	
	checkItems(item)
	{
		/*let x = this.x;
		let y = this.y;
		let xw = x + this.width;
		let yh = y + this.height;
		let x2 = item.x;
		let y2 = item.y;
		let x2w = x2 + item.w;
		let y2h = y2 + item.h;*/
		let x2 = this.x;
		let y2 = this.y;
		let x2w = x2 + this.width;
		let y2h = y2 + this.height;
		let x = item.x;
		let y = item.y;
		let xw = x + item.w;
		let yh = y + item.h;
		
		
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
				image(dwight_side_animation, this.x + camera.offSetX, this.y + camera.offSetY, this.width*this.scale, this.height*this.scale, sourceX*36,0,36,70)
			else
				{
					push();
						let sourceX = this.frame;
						//if(this.frame >= 6)
							//sourceX = this.frame - 6;
						translate(this.x+camera.offSetX,this.y+camera.offSetY);
						scale(-1,1);
						//image(dwight_side_animation, -36, 0, this.w, this.h,0,0,36,70)
						image(dwight_side_animation, -36, 0, this.width*this.scale, this.height*this.scale,36*sourceX,0,36,70)
					pop();
				}
			
		}
		else
			image(this.anim, this.x + camera.offSetX, this.y + camera.offSetY, this.width*this.scale, this.height*this.scale, this.width*this.frame,this.getSourceY(),this.width,this.height)
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
	
	drawItemsHUD()
	{
		push();
		stroke("black");
		noFill();
		for(let i = 0; i < this.items.length; i++)
			{
				rect(650+i*50,500,50,50);
				image(this.items[i].img,650+i*50,500,50,50);
				
			}
		stroke("red");
		rect(650+this.currItems*50,500,50,50);
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
	 SPEAKING: 9,
	 SCRIPTED: 10
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
		
		this.anim = creed_animation;
		this.frame = 0;
		this.lastFrame = new Date().getTime();
		this.moving = false;
		this.sensAnim = 1;
		this.sourceY = 0;
		
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
		this.setSourceY(xVelocity,yVelocity);
	  
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
	
	move(xVel,yVel)
	{
		let xVelocity = xVel;
		let yVelocity = yVel;
		 this.setSourceY(xVelocity,yVelocity);
		let moving = false;
		  if(this.handleCollision(this.x - xVelocity, this.y))
		  {
			this.x-=xVelocity;
			map.resort(this);
			  moving = true;
		  }
		  if(this.handleCollision(this.x, this.y - yVelocity))
		  {
			this.y-=yVelocity;
			map.resort(this);
			  //moving = true;
		  }
		return moving;
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
	
	
	
	drawAnim()
	{
		if(!this.moving)
			{
				image(this.anim,this.x+camera.offSetX, this.y+camera.offSetY, this.width, this.height,0,0,this.init_width, this.init_height);
				this.drawBleeding();
				this.drawLife();
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
					image(this.anim,-36, 0, this.width, this.height,this.frame*this.init_width,(this.sourceY-1)*this.init_height,this.init_width, this.init_height);
					pop();
				   
			   }
			else
				image(this.anim,this.x+camera.offSetX, this.y+camera.offSetY, this.width, this.height,this.frame*this.init_width,this.sourceY*this.init_height,this.init_width, this.init_height);
		this.drawBleeding();
		this.drawLife();
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
			text('STATE : ' + this.state, this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-20);
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
		this.speach_list=["DWIGHT YOU WERE\nSUPPOSED TO EAT THE CAKE\nWITH THE OTHERS","NOW I HAVE TO KILL YOU !","TAKE THAT DWIGHT !!", "DIE !!!", "HERE'S YOUR PROMOTION DWIGHT !", "MOUHAHAHAHAHAHA", "YOU WILL DIE TODAY", "EMPLOYEE OF THE MONTH MY ASS", "IM THE CEO IM THE BOSS"]
		this.speach_index = 0;
		this.state = STATE.WAITING;
		this.saveState = this.state;
		this.anim = ceo_animation;
		this.moving = false;
	}
	
	revive()
	{
		super.revive();
		this.state = STATE.WAITING;
		//console.log("this.state ", this.state);
	}
	
	speaking()
	{
		let now = new Date().getTime();
		let delta = now - this.lastSpeak;
		if (delta >= 1000) {
			//this.state = STATE.CHASING;
			this.lastSpeak = new Date().getTime();
			this.state = this.saveState;
			this.speach_index++;
			if(this.speach_index >= this.speach_list.length)
				this.speach_index = 2;
		}
	}
	
	updateScript()
	{
		this.update();
		if(this.speach_index > 2)
		{
			this.state = STATE.CHASING;
			this.saveState = STATE.CHASING;
			gameState = PLAY;
			camera.lookAtObj(dwight);
			this.moving = true;
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
				
			case STATE.WAITING:
				if(dwight.y < 430 && dwight.x < 500)
				{
					//this.saveState = this.state;
					this.saveState = STATE.SPEAKING;
					this.state = STATE.SPEAKING;
					camera.lookAtObj(this)
					gameState = CEO_CONVERSATION;
					this.lastSpeak = new Date().getTime();
					//this.state = STATE.SPEAKING;
				}
				break;
				
			
		}
		
		
	}
	
	draw()
	{
		if(this.state == STATE.DEAD)
			{
				super.draw();
				return;
			}
		super.drawAnim();
		//super.draw();
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
		message.set(0,0,"YOU OBTAINED THE KEY TO THE ROOF",true)
		
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
		this.anim = hank_animation;
		this.moving = true;
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
	
	draw()
	{
		if(this.state == STATE.DEAD)
		{
			super.draw();
			return;
		}
		if(this.state == STATE.RUSHING)
			{
				push();
				tint(178, 34, 34);
			}
		super.drawAnim();
		if(this.state == STATE.RUSHING)
			pop();
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
		this.phase = 0;
		this.blinking = false;
		this.blinkingX;
		this.blinkingY;
		this.lastBlink = new Date().getTime();
		this.scriptState = STATE_01;
		this.lastSpeak = new Date().getTime();
		this.speach_list=["Dwight !","What are you doing here ?","Me ? Im just uh...", "enjoying the view !", "Why dont you go to the basement ?\nYou could restore the power", "There's a backup generator\n down there","Dont worry\n there's no zombies down there..", "Y-y you can t-trust me !\n(clears throat)","Im sorry Dwight...", "I cant let you escape.", "Ill make it quick"]
		this.speach_index = 0;
		this.weapon = new Sniper(this.x, this.y, 77,15, sniper_img);
		this.blink_cnter = 0;
	}
	
	speaking()
	{
		let now = new Date().getTime();
		let delta = now - this.lastSpeak;
		if (delta >= 2000) {
			//this.state = STATE.CHASING;
			this.lastSpeak = new Date().getTime();
			//this.state = this.saveState;
			this.speach_index++;
			if(this.speach_index >= 8 && this.phase == 0)
				//this.speach_index = 0;
				{
					//this.state = STATE.IDLE;
					this.scriptState = STATE_03;
					gameState = PLAY;
				}
			if(this.speach_index >= this.speach_list.length && this.phase == 3)
				//this.speach_index = 0;
				{
					this.moving = true;
					this.state = STATE.ROAMING;
					this.phase = 1;
					this.scriptState = STATE_03;
					camera.lookAtObj(dwight)
					gameState = PLAY;
				}
		}
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
		//this.blink_cnter++;
	}
	
	revive()
	{
		super.revive();
		this.phase = 0;
		this.name = "CREED";
		this.state = STATE.WAITING;
	}
	
	updateScript()
	{
		this.weapon.update(this.x, this.y+35);
		switch(this.scriptState)
			{
				case STATE_01:
					//this.x+=2;
					this.moving = this.move(-2,0);
					if(this.x > 550)
					{
						//this.state = STATE.IDLE;
						//gameState = PLAY;
						this.moving = false;
						this.scriptState = STATE_02;
						this.lastSpeak = new Date().getTime();
						
						/*this.moving = true;
						this.state = STATE.ROAMING;
						this.phase = 1;
						this.scriptState = STATE_03;
						camera.lookAtObj(dwight)
						gameState = PLAY;*/
					}
					break;
					
				case STATE_02:
					this.speaking();
					break;
					
				case STATE_03:
					
					break;
					
					case STATE_04:
					this.speaking();
					break;
			}
	}
	
	update()
	{
		this.weapon.update(this.x, this.y+35);
		if(dwight.y > 900)
			return;
		
		super.update();
		
		switch(this.state)
			{
				case STATE.WAITING:
					if(dwight.y > 100 && this.phase == 0)
					{
						this.lastSpeak = new Date().getTime();
						this.state = STATE.SCRIPTED;
						gameState = CREED_CONVERSATION;
					}
					if(dwight.y < 450 && this.phase == 3)
					{
						camera.lookAtObj(this)
						this.lastSpeak = new Date().getTime();
						this.scriptState = STATE_04;
						this.state = STATE.SCRIPTED;
						gameState = CREED_CONVERSATION;
					}
					return;
					break;
					
				case STATE.SCRIPTED:
					this.updateScript();
					return;
					break;
			}
		
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
		
		if(dist > 150 && dist < 1000 && delta > 2000)
			{
				//console.log("this.blink_cnter ", this.blink_cnter)
				//this.blink_cnter++;
				this.weapon.shoot();
				//this.blink();
				if(this.blink_cnter > 2)
					{
						this.blink();
						this.blink_cnter = 0;
					}
				
			}
	}
	
	takeDmg(x,y)
	{
		if(this.state == STATE.SCRIPTED)
			return;
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
			this.life = 12;
			this.name = "ZOMBIE CREED";
			this.velocity = 2;
			this.blink();
			//this.img = creed_zombie;
			this.anim = creed_zombie_animation;
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
		//super.draw();
		if(this.state == STATE.DEAD)
		{
			super.draw();
			return;
		}
		super.drawAnim();
		if(this.phase == 3 || this.phase == 1)
			this.weapon.draw();
		if(this.scriptState == STATE_02 || this.scriptState == STATE_04)
			this.speak(this.speach_list[this.speach_index],10);
		
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
	
	speak(text_message,text_size)
	{
		push();
			noStroke();
			fill("white")
			triangle(this.x+camera.offSetX, this.y+camera.offSetY, this.x+camera.offSetX-20, this.y+camera.offSetY-100,this.x+camera.offSetX-50, this.y+camera.offSetY-100)
			ellipse(this.x+camera.offSetX, this.y+camera.offSetY-100, 300, 100);
			fill("black")
			textSize(text_size);
			text(text_message,this.x+camera.offSetX, this.y+camera.offSetY-100);
		pop();
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
		this.anim = basement_boss_animation;
		this.moving = true;
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
		if(this.state == STATE.DEAD)
			return;
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
		if(this.state == STATE.DEAD)
		{
			super.draw();
			return;
		}
		super.drawAnim();
		
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

class Area{
	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
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
		this.chaseTarget = dwight;
		this.show = true;
		this.activeArea = new Area(0,0,1000,1000)
		
		
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
		if(!this.show)
			return;
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
		//if(this.speaking)
			//this.speak("bleuargh ?!?!!")
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
		text('AREA ' + this.activeArea.x, this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-30);
		text('AREA ' + this.activeArea.w, this.x+camera.offSetX + this.width/2, this.y+camera.offSetY-30);
		pop();
	}
	
	setZombieInitPosition()
	{
		this.zombieState = STATE.IDLE;
		this.x = this.initX;
		this.y = this.initY;
		this.vecRoam = createVector(random(100,900), random(100,900));
		this.revive();
	}
	
	update()
	{
		this.move();
		if(dwight.alive && (this.zombieState == STATE.CHASING || this.zombieState == STATE.ROAMING))
			//this.detectPlayer(this.x + 36/2, map.floors[map.current_floor].pnjs[0].x + 36/2, this.y+ 70/2, map.floors[map.current_floor].pnjs[0].y+ 70/2);
			//this.detectPlayer(this.x + 36/2, dwight.x + 36/2, this.y+ 70/2, dwight.y+ 70/2);
			this.detectPlayer(this.x + 36/2, this.chaseTarget.x + 36/2, this.y+ 70/2, this.chaseTarget.y+ 70/2);
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
				
			case STATE.SCRIPTED:
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
			
			/*this.vecRoam = createVector(random(0,800), random(0,600));
			if(this.id == 101 && map.current_floor == 3)
				this.vecRoam = createVector(random(this.activeArea.x,this.activeArea.w), random(this.activeArea.y,this.activeArea.h));*/
			this.vecRoam = createVector(random(this.activeArea.x,this.activeArea.w), random(this.activeArea.y,this.activeArea.h));
			v2 = createVector(this.vecRoam.x+camera.offSetX, this.vecRoam.y+camera.offSetY)
			this.zombieState = STATE.WAITING;
			this.lastWait = new Date().getTime();  
			//this.speaking = true;
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
			  /*this.vecRoam = createVector(random(0,800), random(0,600));
			  if(this.id == 101 && map.current_floor == 3)
				this.vecRoam = createVector(random(this.activeArea.x,this.activeArea.w), random(this.activeArea.y,this.activeArea.h));*/
			  this.vecRoam = createVector(random(this.activeArea.x,this.activeArea.w), random(this.activeArea.y,this.activeArea.h));
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
			  /* this.vecRoam = createVector(random(0,800), random(0,600));
			  if(this.id == 101 && map.current_floor == 3)
				this.vecRoam = createVector(random(this.activeArea.x,this.activeArea.w), random(this.activeArea.y,this.activeArea.h));*/
			  this.vecRoam = createVector(random(this.activeArea.x,this.activeArea.w), random(this.activeArea.y,this.activeArea.h));
			   this.zombieState = STATE.WAITING;
			   this.lastWait = new Date().getTime(); 
			   this.speaking = true;
		  }
		  
	}
	
	chase()
	{
		  let v1 = createVector(this.x + 36/2 + camera.offSetX, this.y + 70/2 + camera.offSetY);
		  //let v2 = createVector(dwight.x + 36/2 + camera.offSetX, dwight.y + 70/2 + camera.offSetY);
		  //let v2 = createVector(map.floors[map.current_floor].pnjs[0].x + 36/2 + camera.offSetX, map.floors[map.current_floor].pnjs[0].y + 70/2 + camera.offSetY);
		  let v2 = createVector(this.chaseTarget.x + 36/2 + camera.offSetX, this.chaseTarget.y + 70/2 + camera.offSetY);
		  this.chaseLine[0].set(v1.x, v1.y);
		  this.chaseLine[1].set(v2.x, v2.y);
		  
		if(!zombie_hit_sound.isPlaying())
		  zombie_hit_sound.play();
		  
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
		
		if(dist < 300 && x2 > this.activeArea.x && y2 > this.activeArea.y && x2 < this.activeArea.w && y2 < this.activeArea.h)
		{
			this.zombieState = STATE.CHASING;
		}
		else
			{
				this.zombieState = STATE.ROAMING;
			}
		if(dist < 30)
		{
			//map.floors[map.current_floor].pnjs[0].takeDmg();
			this.chaseTarget.takeDmg();
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