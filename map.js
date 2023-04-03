class Tile_To_Draw {
	constructor (i,j,z_index,bckgrnd,id) {
		this.i = i;
		this.j = j;
		this.z_index = z_index;
		this.bckgrnd = bckgrnd;
		this.id = id;
	}
}

class Explosion{
	constructor(x,y,w,h)
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.last = new Date().getTime();
		this.frame = 0;
		this.going = true;
	}
	
	draw()
	{
		if(!this.going)
			return;
		//circle(this.x + camera.offSetX, this.y + camera.offSetY, 300)
		image(explosion_animation, this.x + camera.offSetX - 50 - 25 - 12, this.y + camera.offSetY - 50 - 25 , this.w,  this.h,50*this.frame,0,50,50)
		
		
		let now = new Date().getTime();
		let delta = now - this.last;
		if (delta >= 70) {
			
			this.frame++;
			if(this.frame > 14)
			{
				this.going = false;
				
			}
		}
		
	}
}

class Bullet_Impact{
	constructor(x,y,w,h)
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.last = new Date().getTime();
		this.frame = 0;
		this.show = true;
	}
	
	draw()
	{
		image(impact, this.x + camera.offSetX, this.y + camera.offSetY, this.w,  this.h,20*this.frame,0,20,20)
		
		let now = new Date().getTime();
		let delta = now - this.last;
		if (delta >= 40) {
			
			this.frame++;
			if(this.frame > 4)
			{
				this.frame = 0;
				map.floors[map.current_floor].bullet_impact.pop();
				//console.log("map.z_index_map[map.current_floor] ",map.z_index_map[map.current_floor])
				//map.z_index_map[map.current_floor] = map.z_index_map[map.current_floor].filter(x => x.id !== 8)
				
			}
		}
		//image(blood, this.bloods[i].x + camera.offSetX, this.bloods[i].y + camera.offSetY, this.bloods[i].w,  this.bloods[i].h)
		
		
		
	}
	
	drawv2()
	{
		if(!this.show)
			return;
		image(impact, this.x + camera.offSetX, this.y + camera.offSetY, this.w*1.5,  this.h*1.5,20*this.frame,0,20,20)
		
		let now = new Date().getTime();
		let delta = now - this.last;
		if (delta >= 40) {
			
			this.frame++;
			if(this.frame > 4)
			{
				this.frame = 0;
				this.show = false;
				//map.floors[map.current_floor].bullet_impact.pop();
				//console.log("map.z_index_map[map.current_floor] ",map.z_index_map[map.current_floor])
				//map.z_index_map[map.current_floor] = map.z_index_map[map.current_floor].filter(x => x.id == 9 && x.z_index == )
				
			}
		}
	}
}

class Explosion_Trace {
	constructor(x,y,w,h)
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	
	draw()
	{
		//image(blood, this.bloods[i].x + camera.offSetX, this.bloods[i].y + camera.offSetY, this.bloods[i].w,  this.bloods[i].h)
		image(explosion_trace, this.x + camera.offSetX, this.y + camera.offSetY, this.w,  this.h)
	}
}

class Blood {
	constructor(x,y,w,h)
	{
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	
	draw()
	{
		//image(blood, this.bloods[i].x + camera.offSetX, this.bloods[i].y + camera.offSetY, this.bloods[i].w,  this.bloods[i].h)
		image(blood, this.x + camera.offSetX, this.y + camera.offSetY, this.w,  this.h)
	}
}

class Door {
	constructor (id,floor,i,j,opened)
	{
		this.id = id;
		this.i = i;
		this.j = j;
		this.floor = floor;
		this.sourceY = 0;
		this.sourceH = 100;
		this.opened = opened;
		this.obj = map.map_array[this.floor][this.j][this.i];
		this.originHitBoxY = this.obj.hitboxY;
		if(this.opened)
			this.open();
		else
			this.close();
		this.locked = false;
		
	}
	
	open()
	{
		this.sourceY = 100;
		this.sourceH = 115;
		this.opened = true;
		this.obj.hitboxH = 0;
		if(gameState == PLAY)
			indoor_open_sound.play();
	}
	
	close()
	{
		this.sourceY = 0;
		this.sourceH = 100;
		this.opened = false;
		this.obj.hitboxH = 10;
		this.obj.hitboxX = 0;
		this.obj.hitboxW = 100;
		this.obj.hitboxY = this.originHitBoxY;
		if(gameState == PLAY)
			indoor_close_sound.play();
		
	}
	
	tryOpen()
	{
		//getting dwight map position
		let i2 = round(dwight.x/100);
		let j2 = round(dwight.y/100);
		
		//checking if dwight is near door
		if(this.i == i2 && this.j == j2)
			{
				if(this.locked)
				{
					message.set(0,0,"DOOR IS LOCKED",true)
					return;
				}
				
				if(!this.opened)
					this.open();
				else
					this.close();
					//this.tryClose();
			}
	}
	
	tryClose()
	{
		let doorY = this.j*100;
		let doorH = 10;
		let doorYH = doorY + doorH;
		
		console.log("doorY ", doorY)
		console.log("doorYH ", doorYH)
		console.log("dwight.y - 10 ", dwight.y - 10)
		console.log("dwight.y ", dwight.y)
		
		//checking if dwight is not in door way
		if((doorY > dwight.y - 10 && doorY < dwight.y) || (doorYH > dwight.y - 10 && doorYH < dwight.y))
			return;
		else
			this.close();
	}
	
	static getDoorIndex(i,j)
	{
		for(let k = 0; k < map.floors[map.current_floor].doors.length; k++)
			{
				if(map.floors[map.current_floor].doors[k].i == i && map.floors[map.current_floor].doors[k].j == j)
					return k;
			}
		return -1;
	}
	
	
	
	
}

class Note {
	constructor (x,y,id)
	{
		this.x = x;
		this.y = y;
		this.id = id;
		this.display = true;
	}
	
	static pickUpNote()
	{
		for(let i = 0; i < map.floors[map.current_floor].notes.length; i++)
			{
				if(!map.floors[map.current_floor].notes[i].display)
					continue;
				
				if(Math.round(map.floors[map.current_floor].notes[i].x/100) == Math.round((dwight.x+dwight.width/2)/100) && Math.round(map.floors[map.current_floor].notes[i].y/100) == Math.round((dwight.y+dwight.height/2)/100))
				{
					map.floors[map.current_floor].notes[i].display = false;
					textId = map.floors[map.current_floor].notes[i].id;
					gameState = NOTE_DIALOG;
				}
			}
	}
	
	draw()
	{
		if(this.display)
			image(notes_png,this.x + camera.offSetX,this.y + camera.offSetY);
	}
}

class Floor {
	constructor (floor,enemyNumber,boss)
	{
		this.floor = floor;
		this.enemyNumber = enemyNumber;
		this.enemies = [];
		this.pnjs = [];
		this.boss = boss;
		this.bloods = [];
		this.bullet_impact = [];
		this.shotgun_impact = [];
		this.items = [];
		this.lastStar = new Date().getTime();
		this.starColor = color(255, 255, 255);
		this.starAlpha = 255;
		this.sensStarAlpha = -1;
		this.scripts = [];
		this.doors = [];
		this.lastStartScript = new Date().getTime();
		this.notes = [];
	}
	
	updateScript()
	{
		map.floors[map.current_floor].pnjs[0].update();
		map.floors[map.current_floor].enemies[0].update();
		if(map.floors[map.current_floor].pnjs[0].state == STATE.DEAD)
			gameState = PLAY;
		if(keys[32])
		{
			keys[32] = 0;
			gameState = PLAY;
		}
	}
	
	//scripted monologue when game starts
	updateScript1()
	{
		//making dwight speak
		dwight.speak(dwight.speechList1[dwight.speechList1_ind])
		
		//checking elapsed time
		let now = new Date().getTime();
		let delta = now - this.lastStartScript;
			//1.5 seconds elapsed
			if (delta >= 2000) {
				this.lastStartScript = now;
				//next speech text
				dwight.speechList1_ind++;
				
				//speechlist end -> return to play state
				if(dwight.speechList1_ind > 1)
					gameState = PLAY;
			}
			
		//skipping 
		if(keys[32])
		{
			keys[32] = 0;
			gameState = PLAY;
		}
	}
	
	
	
	drawBulletImpact()
	{
		for(let i = 0; i < this.bullet_impact.length;i++)
			this.bullet_impact[i].draw();
	}
	
	
	
	setZombiesPosition()
	{
		for(let i = 0; i < this.enemyNumber; i++)
		{
			this.enemies[i].setZombieInitPosition();
		}
	}
	
	
	pickUpItems()
	{
		let indexToSupp = -1;
		//for every items on floor
		for(let i = 0; i < this.items.length; i++)
			{
				//checking if dwight is on items
				if(dwight.checkItems(this.items[i]))
					{
						indexToSupp = i;
					}
			}
		//if items found 
		if(indexToSupp != -1)
			{
				//adding item to dwight inventory and remove from floor inventory
				dwight.items.push(this.items.splice(indexToSupp,1)[0]);
				dwight.change_item();
				
				//if axe -> trigger zombie closet jumpscare 
				if(dwight.items[dwight.items.length-1] instanceof Axe)
				{
					//starting closet animation
					closetAnimation.started = true;
					
					//adding new zombie to floor at closet location
					map.floors[map.current_floor].enemyNumber++;
					map.floors[map.current_floor].enemies.push(new Zombie(350,80,36,70,zombie,103,350,80));
					map.floors[map.current_floor].enemies[map.floors[map.current_floor].enemyNumber - 1].activeArea = new Area(0,30,500,270)
					let index = map.current_floor;
					let i = map.floors[map.current_floor].enemyNumber - 1;
					map.z_index_map[index].push(new Tile_To_Draw(floor(map.floors[index].enemies[i].initX/100),floor(map.floors[index].enemies[i].initY/100),map.floors[index].enemies[i].y + map.floors[index].enemies[i].height,false,100+i));
					
					//sounds
					closet_open_sound.play();
					zombie_hit_sound.play();
				}
			}
	}
	
	drawHitBox(item)
	{
		push()
		stroke("red");
		rect(item.x+camera.offSetX,item.y+camera.offSetY,item.w,item.h)
		rect(dwight.x+camera.offSetX,dwight.y+camera.offSetY,dwight.width,item.height)
		pop();
	}
	
	drawItems()
	{
		
		if(this.items.length == 0)
			return;
		
		//checking if items picked
		this.pickUpItems();
		
		//drawing every items on floor
		for(let i = 0; i < this.items.length; i++)
			{
				
				let now = new Date().getTime();
				let delta = now - this.lastStar;
				if (delta >= 40) {

					this.lastStar = now;
					this.starAlpha += 10*this.sensStarAlpha;
					if(this.starAlpha > 255 || this.starAlpha < 100)
						this.sensStarAlpha *= -1;
				}
				tint(this.starAlpha, this.starAlpha, this.starAlpha);
				
				if(this.items[i] instanceof Revolver)
					{
									//mirroring image
									push();
										//angleMode(DEGREES);
										translate(this.items[i].x+camera.offSetX,this.items[i].y+camera.offSetY);
										scale(-1,1);
										//rotate(15);
										image(this.items[i].img,-20,0);
									pop();
					}
				else
					image(this.items[i].img,this.items[i].x+camera.offSetX, this.items[i].y+camera.offSetY);
				
				//not working :'(
				//this.star(this.items[i].x + this.items[i].w/2+camera.offSetX,this.items[i].y+ this.items[i].h/2+camera.offSetY,2,5,6)
			}
		noTint();
		
		
	}
	
	star(x, y, radius1, radius2, npoints) {
		
		let now = new Date().getTime();
		let delta = now - this.lastStar;
		if (delta >= 20) {
			
			this.lastStar = now;
			this.starAlpha += 10*this.sensStarAlpha;
			if(this.starAlpha > 255 || this.starAlpha < 100)
				this.sensStarAlpha *= -1;
		}
		  push();
			
		  this.starColor.setRed(this.starAlpha);
		  this.starColor.setGreen(this.starAlpha);
		  this.starColor.setBlue(this.starAlpha);
		  fill(this.starColor)
		
		  noStroke();
		  /*var angle = TWO_PI / npoints;
		  var halfAngle = angle/2.0;
		  beginShape();
		  console.log("halfAngle ",halfAngle);
		  for (var a = 0; a < TWO_PI; a += angle) {
			var sx = x + cos(a) * radius2;
			var sy = y + sin(a) * radius2;
			vertex(sx, sy);
			sx = x + cos(a+halfAngle) * radius1;
			sy = y + sin(a+halfAngle) * radius1;
			vertex(sx, sy);
		  }
		  
		  endShape(CLOSE);*/
		  triangle(x, y, x+5, y-5, x+5, y+5)
		  triangle(x+5, y-5, x, y, x+5, y+5)
		  //rect(x,y,5,5);
		 pop();
}
	
	drawAnimCloset()
	{
		
	}
	
	
	
	drawBlood()
	{
		for(let i = 0; i < this.bloods.length; i++)
			{
				
				//if(this.bloods[i] instanceof Blood)
					
				//if(this.bloods[i] instanceof Vomit_puddle)
					this.bloods[i].draw();
					
			}
	}
	
	static drawFloor(floor)
	{
		if(floor == 0)
			{
				fill(149,139,89);
				rect(camera.offSetX*game_scale,camera.offSetY*game_scale+100,1000*game_scale,900*game_scale)
			}
		else if(floor == 1)
			{
				fill(98,149,112);
				rect(camera.offSetX*game_scale,camera.offSetY*game_scale+100,1000*game_scale,900*game_scale)
				image(wc_floor, camera.offSetX+100,camera.offSetY+100,400,280);
			}
		else if(floor == 2)
			{
				fill(98,149,112);
				rect(camera.offSetX*game_scale,camera.offSetY*game_scale+100,1000*game_scale,900*game_scale)
			}
		else if(floor == 3)
			{
				fill(98,149,112);
				rect(camera.offSetX*game_scale,camera.offSetY*game_scale+100,1000*game_scale,900*game_scale)
				image(wc_floor, camera.offSetX+100,camera.offSetY+100,400,280);
			}
		else if(floor == 4)
			{
				fill(98,149,112);
				rect(camera.offSetX*game_scale,camera.offSetY*game_scale+100,1000*game_scale,900*game_scale)
				fill(78,145,100);
				rect(camera.offSetX*game_scale+500,camera.offSetY*game_scale+100,1000*game_scale-500,900*game_scale)
				rect(camera.offSetX*game_scale,camera.offSetY*game_scale+500,1000*game_scale,200*game_scale)
			}
		else if(floor == 5)
			{
				fill(173,173,173);
				rect(camera.offSetX*game_scale,camera.offSetY*game_scale+100,1000*game_scale,900*game_scale)
			}
		
		
	}
	
	clearImpact()
	{
		for(let i = 0; i < this.bullet_impact.length; i++)
			{
				if(this.bullet_impact[i].show == false)
					{
						//map.z_index_map[map.current_floor] = map.z_index_map[map.current_floor].filter(x => x.id == 9)
					}
			}
	}
}

function setupMap()
{
  img_array.push(data_0)
  img_array.push(data_1)
  img_array.push(data_2)
  img_array.push(data_3)
  img_array.push(data_4)
  
  map_array2.push(map_array_0);
  map_array2.push(map_array_1);
  map_array2.push(map_array_2);
  map_array2.push(map_array_3);
  map_array2.push(map_array_4);
  map_array2.push(map_array_5);
}

function loadFloors()
{
  //basement
  map.floors[0] = new Floor(0,0,new Basement_Boss(500,500,40,80,basement_boss,6,1,STATE.ROAMING,1.5,"FATTY FAT BOB"));
  /*map.floors[0].enemies.push(new Zombie(500,500,36,70,zombie,100,400,500));
  map.floors[0].enemies.push(new Zombie(500,600,36,70,zombie,101,300,600));
  map.floors[0].enemies.push(new Zombie(500,700,36,70,zombie,102,500,700));
  map.floors[0].enemies.push(new Zombie(500,800,36,70,zombie,103,500,800));
  map.floors[0].enemies.push(new Zombie(500,900,36,70,zombie,104,500,900));
  map.floors[0].enemies.push(new Zombie(500,400,36,70,zombie,105,500,400));
  map.floors[0].enemies.push(new Zombie(500,300,36,70,zombie,106,500,300));
  map.floors[0].enemies.push(new Zombie(100,100,36,70,zombie,107,100,100));
  map.floors[0].enemies.push(new Zombie(100,200,36,70,zombie,108,100,200));
  map.floors[0].enemies.push(new Zombie(100,300,36,70,zombie,109,100,300));
  map.floors[0].enemies.push(new Zombie(100,400,36,70,zombie,110,100,400));
  map.floors[0].enemies.push(new Zombie(100,500,36,70,zombie,111,100,500));
  map.floors[0].enemies.push(new Zombie(100,600,36,70,zombie,112,100,600));
  map.floors[0].enemies.push(new Zombie(300,700,36,70,zombie,113,300,700));
  map.floors[0].enemies.push(new Zombie(400,800,36,70,zombie,114,400,800));*/
	
  //ground floor
  map.floors[1] = new Floor(1,1,new Hank_Boss(500,500,40,80,hank,6,15,STATE.ROAMING,1.5,"HANK"));
  map.floors[1].enemies.push(new Zombie(500,500,36,70,zombie,100,500,500));
  map.floors[1].doors.push(new Door(0,1,2,3,false))
	
  //1st floor
  map.floors[2] = new Floor(2,4);
  map.floors[2].enemies.push(new Zombie(200,800,36,70,zombie,100,200,800));
  map.floors[2].enemies.push(new Zombie(500,800,36,70,zombie,101,500,800));
  map.floors[2].enemies.push(new Zombie(550,800,36,70,zombie,102,550,800));
  map.floors[2].enemies.push(new Zombie(700,400,36,70,zombie,103,700,400));
	map.floors[2].enemies[1].activeArea = new Area(500,670,900,970)
	map.floors[2].enemies[2].activeArea = new Area(500,670,900,970)
	map.floors[2].enemies[0].activeArea = new Area(100,670,500,970)
	map.floors[2].enemies[3].activeArea = new Area(600,370,900,570)
	map.floors[2].items.push(new Axe(450,50,20,42,loadImage('assets/img/axe.png')))
	map.floors[2].doors.push(new Door(0,2,2,2,false))
	map.floors[2].doors.push(new Door(0,2,7,2,true))
	map.floors[2].doors.push(new Door(0,2,2,3,false))
	map.floors[2].doors.push(new Door(0,2,7,3,false))
	map.floors[2].doors.push(new Door(0,2,3,6,false))
	map.floors[2].doors.push(new Door(0,2,6,6,false))
	map.floors[2].pnjs.push(new PNJ(300,420,36,70,zombie,500,300,450));
	map.floors[2].pnjs[0].scriptState = STATE_04;
	map.floors[2].pnjs[0].state = STATE.SCRIPTED;
	map.floors[2].pnjs[0].show = true;
	map.floors[2].doors[2].locked = true;
	
	//map.floors[2].items.push(new Weapon(450,50,20,42,loadImage('assets/img/axe.png')))
	//map.floors[2].items.push(axe);
	
  //2nd floor
  map.floors[3] = new Floor(3,2);
  map.floors[3].enemies.push(new Zombie(850,150,36,70,zombie,100,850,150));
  map.floors[3].enemies.push(new Zombie(800,800,36,70,zombie,101,800,800));
  map.floors[3].pnjs.push(new PNJ(850,200,36,70,zombie,500,850,200));
  map.floors[3].doors.push(new Door(0,3,2,3,false))
  map.floors[3].doors.push(new Door(0,3,7,6,false))
	
  //3r floor
  map.floors[4] = new Floor(4,1,new CEO_Boss(300,200,40,80,ceo_boss,6,1,STATE.WAITING,1.5,"THE CEO"));
  map.floors[4].enemies.push(new Zombie(500,500,36,70,zombie,100,500,500));
	map.floors[4].enemies[0].activeArea = new Area(500,200,900,970)
	//map.floors[4].items.push(new Revolver(300,700,20,13,loadImage('assets/img/revolver.png')))
  map.floors[4].items.push(revolver);
  map.floors[4].pnjs.push(new Dead_PNJ(460,750,36,70,dead_pnj,500,460,750));
  map.floors[4].doors.push(new Door(0,4,3,4,false))
  map.floors[4].doors.push(new Door(0,4,3,6,false))
  map.floors[4].notes.push(new Note(440,800,0));
	
  //roof
  map.floors[5] = new Floor(5,0, new Creed_Boss(300,200,36,70,creed_boss,6,1,STATE.ROAMING,1.5,"CREED"));
  //map.floors[5].enemies.push(new Zombie(500,500,36,70,zombie,100,500,500));
  //map.floors[5].enemies.push(new Zombie(500,600,36,70,zombie,101,500,600));
  
  for(let i = 0; i < 6;i++)
  {
		if(i == 5)
		 map.sort(i,17,10);
		else
		 map.sort(i,10,10);
  }
}

class GrilledWallOpening{
	constructor(){
		this.opened = false;
	}
	
	getSourceY()
	{
		if(this.opened)
			return 100;
		return 0;
	}
}

class Generator{
	constructor(){
		
	}
}

class ClosetAnimation{
	constructor () {
		this.frame = 0;
		this.last = new Date().getTime(); 
		this.ended = false;
		this.started = false;
	}
	
	update()
	{
		if(!this.started)
			return;
		if(this.ended)
			return this.frame*100;
		let now = new Date().getTime();
		let delta = now - this.last;
		if (delta >= 200) {
			this.last = new Date().getTime();
			this.frame++;
			if(this.frame > 2)
			{
				this.ended = true;
				this.frame = 2;
				
			}
		}
		
		return this.frame*100;
	}
}

class Cleaning_plaform{
	constructor(x,y){
		this.x = x;
		this.y = y + 350;
		this.origin_x = x;
		this.origin_y = y;
		this.last;
		this.wireLength = 350;
		//this.img = img;
	}
	
	updateScript()
	{
		/*let now = new Date().getTime();
		let delta = now - this.last;
		if (delta >= 200) {*/
			
		
		if(map.cleaning_platform_pos == 1)
		{
			
			this.y--;
			dwight.y--;
			dwight.weapon.update()
			this.wireLength--;
			
			if(this.y == 700 + 350)
			{
				cleaning_platform_sound.stop();
				map.cleaning_platform_pos = 0;
				gameState = PLAY;
			}
		}
		else
			{
				this.y++;
				dwight.y++;
				this.wireLength++;
				dwight.weapon.update()
				map.resort(dwight);
				if(this.y == 900 + 350)
				{
					cleaning_platform_sound.stop();
					map.cleaning_platform_pos = 1;
					gameState = PLAY;
				}
			}
	}
}


class Map {
    constructor (map_size_width,map_size_height, map_array, img_array,z_index_map) {
		setupMap();
		this.map_size_width = map_size_width;
		this.map_size_height = map_size_height;
		this.map_array = map_array;
		this.current_floor = 5;
		this.img_array = img_array;
		this.z_index_map = z_index_map;
		this.cleaning_platform_pos = 1;
		this.generatorOn = false;
		this.floors = [];
		this.explosion;
		this.screenShake = false;
		this.lastShake  = new Date().getTime();
		this.lastShakeGen  = new Date().getTime();
		this.genSourceY = 100;
		this.cleaning_platform = new Cleaning_plaform(100,900);
	}
	
	
	draw_conv_screen()
	{
		fill('black')
		rect(0, 0, 1000, 100);
		rect(0, 500, 1000, 100);
	}
	
	setZombies()
	{
		for(let i = 0; i < this.floors.length; i++)
			{
				this.floors[i].setZombiesPosition();
	
			}
	}
	
	getGeneratorSourceY()
	{
		if(this.generatorOn)
		{
			let now = new Date().getTime();
			let delta = now - this.lastShakeGen;
			if (delta >= 150) {
				this.lastShakeGen = now;
				this.genSourceY = 99;
			}
			else
				this.genSourceY = 100;
			
		}
		else
			this.genSourceY = 0;
		
	}
	
	set_map_size_height(size)
	{
		this.map_size_height = size;
	}
	
	//travel to another floor
	travelTo(floor,i,j)
	{
		gameState = LVL_TRANSITION;
		this.current_floor = floor;
		dwight.x = i*100 + 50 - 18;
		dwight.y = j*100;
		dwight.weapon.update();
		camera.update();
		this.resort(dwight);
		
		//this.floors[this.current_floor].setZombiesPosition();
	}
	
	//sorting map array by z index
	sort(index,w,h)
	{
		for(let i = 0; i < w; i++)
		{
			for(let j = 0; j < h; j++)
			{
				this.z_index_map[index].push(new Tile_To_Draw(i,j,i*100 + this.map_array[index][i][j].hitboxY + this.map_array[index][i][j].hitboxH,true,0))
			}
		}
		this.z_index_map[index].push(new Tile_To_Draw(floor(dwight.x/100),floor(dwight.y/100),dwight.y + dwight.height,false,1));
		for(let i = 0; i < map.floors[index].enemyNumber; i++)
		{
			this.z_index_map[index].push(new Tile_To_Draw(floor(this.floors[index].enemies[i].initX/100),floor(this.floors[index].enemies[i].initY/100),this.floors[index].enemies[i].y + this.floors[index].enemies[i].height,false,100+i));
		}
		if(map.floors[index].boss != null)
			this.z_index_map[index].push(new Tile_To_Draw(5,5,this.floors[index].boss.y + this.floors[index].boss.height,false,6));
		if(index == 5)
		{
			this.z_index_map[index].push(new Tile_To_Draw(9,1,1800,false,4));
		}
		//adding pnj to draw list
		for(let i = 0; i < map.floors[index].pnjs.length; i++)
		{
			this.z_index_map[index].push(new Tile_To_Draw(floor(this.floors[index].pnjs[i].initX/100),floor(this.floors[index].pnjs[i].initY/100),this.floors[index].pnjs[i].y + this.floors[index].pnjs[i].height,false,500+i));
		}
		this.z_index_map[index].sort(function(a, b){return a.z_index - b.z_index});
	}
	
	resortAll(index,w,h)
	{
		let k = 0;
		for(let i = 0; i < w; i++)
		{
			for(let j = 0; j < h; j++)
			{
				this.z_index_map[index][k].z_index = this.map_array[index][i][j].hitboxY + this.map_array[index][i][j].hitboxH;
				k++;
			}
		}
		this.z_index_map[index].sort(function(a, b){return a.z_index - b.z_index});
	}
	
	//updating moving tile z index
	modify(obj)
	{
		let ind = this.z_index_map[this.current_floor].findIndex(x => x.id == obj.id);
		//console.log("index", ind);
		this.z_index_map[this.current_floor][ind].i = floor(obj.x/100);
		this.z_index_map[this.current_floor][ind].j = floor(obj.y/100);
		this.z_index_map[this.current_floor][ind].z_index = obj.y + obj.height;
	}
	
	//resorting map array with updated moving tile z index
	resort(obj)
	{
		this.modify(obj);
		this.z_index_map[this.current_floor].sort(function(a, b){return a.z_index - b.z_index});
	}
	
	//shaking screen 
	shake()
	{
		//camera.offSetX += random(-10,10);
		camera.offSetY += random(-15,15);
		
		let now = new Date().getTime();
		let delta = now - this.lastShake;
		if (delta >= 500) {
			this.screenShake = false;
		}
	}
	
	
	draw()
	{
		//shaking screen
		if(this.screenShake)
			this.shake();
			
		//draw background
		background(47,47,47);
		
		noStroke();
		
		//draws floor
		Floor.drawFloor(map.current_floor);
		
		stroke(255,0,0);
		noFill();
		
		this.floors[this.current_floor].drawBlood();
		
		for(let k = 0; k < this.z_index_map[this.current_floor].length; k++)
		{
			//checks if tile is within camera viewport
			if(this.z_index_map[this.current_floor][k].j*100*game_scale+camera.offSetX*game_scale > -100 && this.z_index_map[this.current_floor][k].i*100*game_scale+camera.offSetY*game_scale > -100 && this.z_index_map[this.current_floor][k].j*100*game_scale+camera.offSetX*game_scale < camera.width + 100 && this.z_index_map[this.current_floor][k].i*100*game_scale+camera.offSetY*game_scale < camera.height + 100)
			{
				//checks if background tile
				if(this.z_index_map[this.current_floor][k].bckgrnd == true)
				{
					//draw tile
					let i = this.z_index_map[this.current_floor][k].i;
					let j = this.z_index_map[this.current_floor][k].j;
					let img_array_id = this.map_array[this.current_floor][i][j].data_id;
					
					let sourceY = 0;
					let sourceH = 100;
					
					if(this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].game_id == 8)
					{
						
						map.getGeneratorSourceY();
						sourceY = this.genSourceY;
					}
					
					if(this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].game_id == 9)
						sourceY = this.genSourceY;
					
					if(this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].game_id == 65 && i == 2 && j == 2)
						sourceY = grilledWallOpening.getSourceY();
					
					if(this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].game_id == 80)
						sourceY = closetAnimation.update();
					
					if(this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].game_id == 59 || this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].game_id == 54)
					{
						
						let ind = Door.getDoorIndex(j,i)
						if(ind != -1)
						{
							sourceY = map.floors[map.current_floor].doors[ind].sourceY;
							sourceH = map.floors[map.current_floor].doors[ind].sourceH;
						}
					}
					
					
					image(this.img_array[img_array_id], this.z_index_map[this.current_floor][k].j*100*game_scale+camera.offSetX*game_scale,this.z_index_map[this.current_floor][k].i*100*game_scale+camera.offSetY*game_scale+this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].decalY*game_scale,100*game_scale,sourceH*game_scale,this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].draw_id*100,sourceY,100,sourceH)					
					
					
					//draw hitbox if in editor
					if(gameState == EDITOR)
					{
						let x = this.z_index_map[this.current_floor][k].j*100*game_scale+camera.offSetX+this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].hitboxX
						let y = this.z_index_map[this.current_floor][k].i*100*game_scale+camera.offSetY+this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].hitboxY
						let w = this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].hitboxW
						let h = this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].hitboxH
						rect(x,y,w,h)
					}
					
				}
				
			}
			
			//draws elevator
				if(this.z_index_map[this.current_floor][k].id == 4)
				{
					/*if(this.cleaning_platform_pos == 1)
						image(cleaning_platform, this.z_index_map[this.current_floor][k].j*100*game_scale+camera.offSetX*game_scale, this.z_index_map[this.current_floor][k].i*100*game_scale+camera.offSetY*game_scale, 200*game_scale, 420*game_scale,0,0,200,420);
					else
						image(cleaning_platform_up, this.z_index_map[this.current_floor][k].j*100*game_scale+camera.offSetX*game_scale, this.z_index_map[this.current_floor][k].i*100*game_scale+camera.offSetY*game_scale, 200*game_scale, 420*game_scale,0,0,200,420);*/
					
					//wires
					image(cleaning_platform, this.cleaning_platform.origin_x*game_scale+camera.offSetX*game_scale, this.cleaning_platform.origin_y*game_scale+camera.offSetY*game_scale, 200*game_scale, this.cleaning_platform.wireLength*game_scale,0,0,200,this.cleaning_platform.wireLength);
					
					
					//platform
					image(cleaning_platform, this.cleaning_platform.x*game_scale+camera.offSetX*game_scale, this.cleaning_platform.y*game_scale+camera.offSetY*game_scale, 200*game_scale, 420*game_scale,0,350,200,420);
				}
			
			if(gameState == EDITOR)
				continue;
			
			//draws items on floor
			this.floors[this.current_floor].drawItems();
			
			//draws spits
			if(this.z_index_map[this.current_floor][k].id >= 300 && this.z_index_map[this.current_floor][k].id < 400)
			{
				
				let ind = this.z_index_map[this.current_floor][k].id;
				this.floors[this.current_floor].boss.spits[ind - 300].draw();
			}
			//draws bullets
			if(this.z_index_map[this.current_floor][k].id >= 400 && this.z_index_map[this.current_floor][k].id < 407)
			{
				
				let ind = this.z_index_map[this.current_floor][k].id;
				//dwight.weapon.bullets[ind - 400].draw();
				revolver.bullets[ind - 400].draw();
			}
			
			//draws vomit
			/*if(this.z_index_map[this.current_floor][k].id >= 200 && this.z_index_map[this.current_floor][k].id < 300)
			{
				let ind = this.z_index_map[this.current_floor][k].id;
				this.floors[this.current_floor].boss.vomits[ind - 200].draw();
			}*/
			
			
				
			
			
			//checks if moving tile
			if(this.z_index_map[this.current_floor][k].bckgrnd == false)
			{
				//draws boss
				if(this.z_index_map[this.current_floor][k].id == 6)
				{
					this.floors[this.current_floor].boss.draw();
				}
				//draws bullet impact
				if(this.z_index_map[this.current_floor][k].id == 8)
				{
					this.floors[this.current_floor].drawBulletImpact();
				}
				
				//draws shotgun impact
				if(this.z_index_map[this.current_floor][k].id == 9)
				{
					this.floors[this.current_floor].shotgun_impact[this.z_index_map[this.current_floor][k].z_index - 1000].drawv2();
				}
				
				
				//draws dwight
				if(this.z_index_map[this.current_floor][k].id == 1)
				{
					if(dwight.alive)
					{
						dwight.draw();
						dwight.weapon.draw();
					}
				}
				
				//draws zombies
				if(this.z_index_map[this.current_floor][k].id >= 100 && this.z_index_map[this.current_floor][k].id < 200)
				{
					
					let ind = this.z_index_map[this.current_floor][k].id;
					this.floors[this.current_floor].enemies[ind-100].draw();
				}
				//draws PNJ
				if(this.z_index_map[this.current_floor][k].id >= 500 && this.z_index_map[this.current_floor][k].id < 600)
				{
					
					let ind = this.z_index_map[this.current_floor][k].id;
					this.floors[this.current_floor].pnjs[ind-500].draw();
				}
			}
			
			
		}
		
		
		//this.floors[this.current_floor].clearImpact();
		
		//draws other stuff
		if(map.explosion != null)
			map.explosion.draw();
		
		Note.pickUpNote();
		
		for(let i = 0; i < this.floors[this.current_floor].notes.length; i++)
			{
				//console.log("derawn");
				this.floors[this.current_floor].notes[i].draw();
			}
		
		if(map.current_floor == 0)
			{
				if(map.explosion != null)
					{
						if(!map.explosion.going)
							this.draw_darkness();
					}
				else
					this.draw_darkness();
				
			}
		if(showOption)
			show_option_buttons();
		//Menu.s_drawCurrentFloor();
		Menu.s_drawHud();
		dwight.drawItemsHUD();
		message.draw();
		//this.drawHitBox();
	}
	
	draw_darkness()
	{
		//fill(0,0,0,120)
		//rect(0,0,800,600)
		push()
		//noFill();
		//strokeWeight(400)
		//stroke(0,0,0,250);
		
		fill(0,0,0,120)
		rect(0,0,1000,1000)
		//rect(dwight.x+camera.offSetX,dwight.y+camera.offSetY,100,100)
		/*rect(dwight.x+camera.offSetX+100,dwight.y+camera.offSetY,1000,1000)
		rect(0,dwight.y+camera.offSetY,dwight.x+camera.offSetX,1000)
		rect(0,0,dwight.x+camera.offSetX,dwight.y+camera.offSetY)*/
		
		//circle(dwight.x+camera.offSetX+dwight.width/2,dwight.y+camera.offSetY+dwight.height/2,800,600)
		//circle(dwight.x+camera.offSetX+dwight.width/2,dwight.y+camera.offSetY+dwight.height/2,300,300)
		pop()
	}
	
	drawHitBox()
	{
		noFill();
		stroke(255, 0, 0);
		rect(colX+camera.offSetX, colY+camera.offSetY, colW, colH);
		rect(hitDX+camera.offSetX, hitDY+camera.offSetY, hitDW, hitDH);
	}
}