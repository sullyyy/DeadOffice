class Tile_To_Draw {
	constructor (i,j,z_index,bckgrnd,id) {
		this.i = i;
		this.j = j;
		this.z_index = z_index;
		this.bckgrnd = bckgrnd;
		this.id = id;
	}
}

class Floor {
	constructor (floor,enemyNumber,boss)
	{
		this.floor = floor;
		this.enemyNumber = enemyNumber;
		this.enemies = [];
		this.boss = boss;
	}
	
	setZombiesPosition()
	{
		for(let i = 0; i < this.enemyNumber; i++)
		{
			this.enemies[i].setZombieInitPosition();
		}
	}
}

function setupMap()
{
  img_array.push(data_0)
  img_array.push(data_1)
  img_array.push(data_2)
  img_array.push(data_3)
  
  map_array2.push(map_array_0);
  map_array2.push(map_array_1);
  map_array2.push(map_array_2);
  map_array2.push(map_array_3);
  map_array2.push(map_array_4);
  map_array2.push(map_array_5);
}

function loadFloors()
{
  map.floors[0] = new Floor(0,1,new Basement_Boss(500,500,40,80,basement_boss,6,25,STATE.ROAMING,1.5,"FATTY FAT BOB"));
  map.floors[0].enemies.push(new Zombie(500,500,36,70,zombie,100,400,500));
  /*map.floors[0].enemies.push(new Zombie(500,600,36,70,zombie,101,300,600));
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
  map.floors[0].enemies.push(new Zombie(100,700,36,70,zombie,113,100,700));
  map.floors[0].enemies.push(new Zombie(100,800,36,70,zombie,114,100,800));*/
  map.floors[1] = new Floor(1,1);
  map.floors[1].enemies.push(new Zombie(500,500,36,70,zombie,100,500,500));
  map.floors[2] = new Floor(2,1);
  map.floors[2].enemies.push(new Zombie(500,500,36,70,zombie,100,500,500));
  map.floors[3] = new Floor(3,1);
  map.floors[3].enemies.push(new Zombie(500,500,36,70,zombie,100,500,500));
  map.floors[4] = new Floor(4,1,new Boss(300,300,40,80,ceo_boss,6,8,STATE.ROAMING,1.5,"THE CEO"));
  map.floors[4].enemies.push(new Zombie(500,500,36,70,zombie,100,500,500));
  map.floors[5] = new Floor(5,2, new Boss(500,500,36,70,creed_boss,6,6,STATE.ROAMING,1.5,"CREED"));
  map.floors[5].enemies.push(new Zombie(500,500,36,70,zombie,100,500,500));
  map.floors[5].enemies.push(new Zombie(500,600,36,70,zombie,101,500,600));
  
  for(let i = 0; i < 6;i++)
  {
		if(i == 5)
		 map.sort(i,17,10);
		else
		 map.sort(i,10,10);
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
	
	
	draw()
	{
		//draw background
		background(47,47,47);
		
		noStroke();
		
		//draw floor colour
		fill(98,149,112);
		if(this.current_floor == 0)
			fill(149,139,89);
		if(this.current_floor == 5)
			fill(173,173,173);
		rect(camera.offSetX*game_scale,camera.offSetY*game_scale+100,1000*game_scale,900*game_scale)
		
		if(this.current_floor == 3 || this.current_floor == 1)
		{
			image(wc_floor, camera.offSetX+100,camera.offSetY+100,400,200);
		}
		
		stroke(255,0,0);
		noFill();
		
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
					image(this.img_array[img_array_id], this.z_index_map[this.current_floor][k].j*100*game_scale+camera.offSetX*game_scale,this.z_index_map[this.current_floor][k].i*100*game_scale+camera.offSetY*game_scale+this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].decalY*game_scale,100*game_scale,100*game_scale,this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].draw_id*100,0,100,100)					
					
					
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
			
			if(gameState == EDITOR)
				continue;
			
			//draws vomit
			if(this.z_index_map[this.current_floor][k].id >= 200)
			{
				let ind = this.z_index_map[this.current_floor][k].id;
				this.floors[this.current_floor].boss.vomits[ind - 200].draw();
			}
			
			//checks if moving tile
			if(this.z_index_map[this.current_floor][k].bckgrnd == false)
			{
				//draws boss
				if(this.z_index_map[this.current_floor][k].id == 6)
				{
					this.floors[this.current_floor].boss.draw();
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
				//draws elevator
				if(this.z_index_map[this.current_floor][k].id == 4)
				{
					if(this.cleaning_platform_pos == 1)
						image(cleaning_platform, this.z_index_map[this.current_floor][k].j*100*game_scale+camera.offSetX*game_scale, this.z_index_map[this.current_floor][k].i*100*game_scale+camera.offSetY*game_scale, 200*game_scale, 420*game_scale,0,0,200,420);
					else
						image(cleaning_platform_up, this.z_index_map[this.current_floor][k].j*100*game_scale+camera.offSetX*game_scale, this.z_index_map[this.current_floor][k].i*100*game_scale+camera.offSetY*game_scale, 200*game_scale, 420*game_scale,0,0,200,420);
				}
				//draws zombies
				if(this.z_index_map[this.current_floor][k].id >= 100 && this.z_index_map[this.current_floor][k].id < 200)
				{
					
					let ind = this.z_index_map[this.current_floor][k].id;
					this.floors[this.current_floor].enemies[ind-100].draw();
				}
			}
		}
		
		//draws other stuff
		if(showOption)
			show_option_buttons();
		Menu.s_drawCurrentFloor();
		message.draw();
		this.drawHitBox();
	}
	
	drawHitBox()
	{
		noFill();
		stroke(255, 0, 0);
		rect(colX+camera.offSetX, colY+camera.offSetY, colW, colH);
		rect(hitDX+camera.offSetX, hitDY+camera.offSetY, hitDW, hitDH);
	}
}