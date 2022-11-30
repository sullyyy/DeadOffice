class Tile_To_Draw {
	constructor (i,j,z_index,bckgrnd,id) {
		this.i = i;
		this.j = j;
		this.z_index = z_index;
		this.bckgrnd = bckgrnd;
		this.id = id;
	}
}


class Map {
    constructor (map_size_width,map_size_height, map_array, img_array,z_index_map) {
		this.map_size_width = map_size_width;
		this.map_size_height = map_size_height;
		this.map_array = map_array;
		this.current_floor = 3;
		this.img_array = img_array;
		this.z_index_map = z_index_map;
		this.cleaning_platform_pos = 1;
		this.generatorOn = false;
	}
	
	set_map_size_height(size)
	{
		this.map_size_height = size;
	}
	
	travelTo(floor,i,j)
	{
		gameState = LVL_TRANSITION;
		map.current_floor = floor;
		dwight.x = i*100 + 50 - 18;
		dwight.y = j*100;
		camera.update();
		map.resort(dwight);
		Zombie.s_setZombiePosition();
	}
	
	//sorting map array by z index
	sort(index,w,h)
	{
		/*console.log("index ", index);
		console.log("w ", w);
		console.log("h ", h);
		console.log("this.current_floor ", this.current_floor);*/
		
		for(let i = 0; i < w; i++)
		{
			for(let j = 0; j < h; j++)
			{
				this.z_index_map[index].push(new Tile_To_Draw(i,j,i*100 + map_array[index][i][j].hitboxY + map_array[index][i][j].hitboxH,true,0))
			}
		}
		this.z_index_map[index].push(new Tile_To_Draw(floor(dwight.x/100),floor(dwight.y/100),dwight.y + dwight.height,false,1));
		this.z_index_map[index].push(new Tile_To_Draw(floor(enemies[0].x/100),floor(enemies[0].y/100),enemies[0].y + enemies[0].height,false,2));
		this.z_index_map[index].push(new Tile_To_Draw(floor(enemies[1].x/100),floor(enemies[1].y/100),enemies[1].y + enemies[1].height,false,3));
		if(index == 5)
		{
			
			this.z_index_map[index].push(new Tile_To_Draw(9,1,1800,false,4));
			//this.z_index_map[index].push(new Tile_To_Draw(12,2,1800,false,5));
			//console.log("this.z_index_map[index] ", this.z_index_map[index]);
		}
		this.z_index_map[index].sort(function(a, b){return a.z_index - b.z_index});
	}
	
	/*sort(index,w,h)
	{
		//for(let i = 0; i < this.map_array[this.current_floor][0].length; i++)
		for(let i = 0; i < this.map_size_width; i++)
		{
			//for(let j = 0; j < this.map_array[this.current_floor].length; j++)
			for(let j = 0; j < this.map_size_height; j++)
			{
				z_index_map.push(new Tile_To_Draw(i,j,i*100 + map_array[this.current_floor][i][j].hitboxY + map_array[this.current_floor][i][j].hitboxH,true,0))
			}
		}
		z_index_map.push(new Tile_To_Draw(floor(dwight.x/100),floor(dwight.y/100),dwight.y + dwight.height,false,1));
		z_index_map.push(new Tile_To_Draw(floor(enemies[0].x/100),floor(enemies[0].y/100),enemies[0].y + enemies[0].height,false,2));
		z_index_map.push(new Tile_To_Draw(floor(enemies[1].x/100),floor(enemies[1].y/100),enemies[1].y + enemies[1].height,false,3));
		z_index_map.sort(function(a, b){return a.z_index - b.z_index});
	}*/
	
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
		//console.log("this.z_index_map[this.current_floor] ", this.z_index_map[this.current_floor]);
	}
	
	//drawing map in fct of z index
	drawZ()
	{
		//paints background grey then paints floor ground
		background(47,47,47);
		if(this.current_floor == 0)
			fill(149,139,89);
		else if(this.current_floor == 5)
			fill(173,173,173);
		else
			fill(98,149,112);
		noStroke();
		if(this.current_floor == 5)
		{
			//paints floor
			rect(camera.offSetX,camera.offSetY + 100,1000,900)
			//paints street
			fill(63,72,204);
			rect(camera.offSetX,camera.offSetY+1400,2000,1000)
		}
		else
			rect(camera.offSetX,camera.offSetY,1000,1000)
		
		for(let k = 0; k < this.z_index_map[this.current_floor].length; k++)
		{
			//checks if tile is within camera viewport
			if(this.z_index_map[this.current_floor][k].j*100+camera.offSetX > -100 && this.z_index_map[this.current_floor][k].i*100+camera.offSetY > -100 && this.z_index_map[this.current_floor][k].j*100+camera.offSetX < camera.width + 100 && this.z_index_map[this.current_floor][k].i*100+camera.offSetY < camera.height + 100)
			{
				//checks if background tile
				if(this.z_index_map[this.current_floor][k].bckgrnd == true)
				{
					//checks if tile is positionable
					if(map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j] instanceof PositionableTile)
						image(this.img_array[this.current_floor], this.z_index_map[this.current_floor][k].j*100+camera.offSetX, this.z_index_map[this.current_floor][k].i*100+camera.offSetY+map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].decalY, 100, 100,map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].id*100,0,100,100);
					else
						image(this.img_array[this.current_floor], this.z_index_map[this.current_floor][k].j*100+camera.offSetX, this.z_index_map[this.current_floor][k].i*100+camera.offSetY, 100, 100,map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].id*100,0,100,100);
					/*fill(0);
					textSize(10);
					text("z " + this.z_index_map[this.current_floor][k].z_index,this.z_index_map[this.current_floor][k].j*100+camera.offSetX+20,this.z_index_map[this.current_floor][k].i*100+camera.offSetY)*/
						
				}
				
			}
			
			//checks if moving tile
			if(this.z_index_map[this.current_floor][k].bckgrnd == false)
			{
				//draws dwight
				if(this.z_index_map[this.current_floor][k].id == 1)
				{
					if(dwight.alive)
						dwight.draw();
				}
				//draws elevator
				if(this.z_index_map[this.current_floor][k].id == 4)
				{
					//console.log("image");
					if(this.cleaning_platform_pos == 1)
						image(cleaning_platform, this.z_index_map[this.current_floor][k].j*100+camera.offSetX, this.z_index_map[this.current_floor][k].i*100+camera.offSetY, 200, 420,0,0,200,420);
					else
						image(cleaning_platform_up, this.z_index_map[this.current_floor][k].j*100+camera.offSetX, this.z_index_map[this.current_floor][k].i*100+camera.offSetY, 200, 420,0,0,200,420);
				}
				if(this.z_index_map[this.current_floor][k].id == 2)
				{
					enemies[0].draw();
					
				}
				if(this.z_index_map[this.current_floor][k].id == 3)
				{
					enemies[1].draw();
					
				}
			}
		}
		//this.drawHitBox();
		Zombie.s_drawChaseLine();
		Menu.s_drawCurrentFloor();
		message.draw();
		
	}
	
	drawHitBox()
	{
		noFill();
		stroke(255, 0, 0);
		rect(colX+camera.offSetX, colY+camera.offSetY, colW, colH);
		rect(hitDX+camera.offSetX, hitDY+camera.offSetY, hitDW, hitDH);
	}
	
	changeFloor()
	{
		
	}
	
	
	
	
	
	//old draw function /!\ (deprecated) /!\
	draw()
	{
		background(98,149,112);
		let dwightDrawn = false;
		let zombiesDrawn = [0,0];
		for(let i = 0; i < this.map_size_width; i++)
		{
			for(let j = 0; j < this.map_size_height; j++)
			{
				//does not display floor tile
				if(map_array[this.current_floor][i][j].id == 1)
					continue;
		
				//draws zombies
				for(let k = 0; k < 2 ;k++)
				{
					if(floor((enemies[k].y+70)/100) == i+1 && j == 9 && zombiesDrawn[k] == 0)
					{
						zombiesDrawn[k] = 1;
						enemies[k].draw();
					}
				}
				
				//only displays tiles within camera viewport
				if(j*100+camera.offSetX > camera.offSetX-100 && i*100+camera.offSetY > camera.offSetY-100 && j*100+camera.offSetX < camera.width && i*100+camera.offSetY < camera.height)
				{
					image(tilemap, j*100+camera.offSetX, i*100+camera.offSetY, 100, 100,map_array[this.current_floor][i][j].id*100,0,100,100);
				}
				
				if(floor((dwight.y+70)/100) == i+1 && j == 9 && dwightDrawn == false && dwight.alive == true)
				{
					dwightDrawn = true;
					dwight.draw();
				}
				
				
			}
		}
	}
}