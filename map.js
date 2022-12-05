class Tile_To_Draw {
	constructor (i,j,z_index,bckgrnd,id) {
		this.i = i;
		this.j = j;
		this.z_index = z_index;
		this.bckgrnd = bckgrnd;
		this.id = id;
	}
}

class Editor {
	constructor ()
	{
		this.selected = 0;
		this.decalX = 0;
	}
}


class Map {
    constructor (map_size_width,map_size_height, map_array, img_array,z_index_map) {
		this.map_size_width = map_size_width;
		this.map_size_height = map_size_height;
		this.map_array = map_array;
		this.current_floor = 5;
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
		for(let i = 0; i < w; i++)
		{
			for(let j = 0; j < h; j++)
			{
				this.z_index_map[index].push(new Tile_To_Draw(i,j,i*100 + this.map_array[index][i][j].hitboxY + this.map_array[index][i][j].hitboxH,true,0))
			}
		}
		this.z_index_map[index].push(new Tile_To_Draw(floor(dwight.x/100),floor(dwight.y/100),dwight.y + dwight.height,false,1));
		this.z_index_map[index].push(new Tile_To_Draw(floor(enemies[0].x/100),floor(enemies[0].y/100),enemies[0].y + enemies[0].height,false,2));
		this.z_index_map[index].push(new Tile_To_Draw(floor(enemies[1].x/100),floor(enemies[1].y/100),enemies[1].y + enemies[1].height,false,3));
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
		
		//draw floor colour
		fill(98,149,112);
		if(this.current_floor == 0)
			fill(149,139,89);
		if(this.current_floor == 5)
			fill(173,173,173);
		rect(camera.offSetX*scale,camera.offSetY*scale+100,1000*scale,900*scale)
		
		stroke(255,0,0);
		noFill();
		
		for(let k = 0; k < this.z_index_map[this.current_floor].length; k++)
		{
			
			//checks if tile is within camera viewport
			if(this.z_index_map[this.current_floor][k].j*100*scale+camera.offSetX*scale > -100 && this.z_index_map[this.current_floor][k].i*100*scale+camera.offSetY*scale > -100 && this.z_index_map[this.current_floor][k].j*100*scale+camera.offSetX*scale < camera.width + 100 && this.z_index_map[this.current_floor][k].i*100*scale+camera.offSetY*scale < camera.height + 100)
			{
				//checks if background tile
				if(this.z_index_map[this.current_floor][k].bckgrnd == true)
				{
					//draw tile
					let i = this.z_index_map[this.current_floor][k].i;
					let j = this.z_index_map[this.current_floor][k].j;
					let img_array_id = this.map_array[this.current_floor][i][j].data_id;
					image(this.img_array[img_array_id], this.z_index_map[this.current_floor][k].j*100*scale+camera.offSetX*scale,this.z_index_map[this.current_floor][k].i*100*scale+camera.offSetY*scale+this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].decalY*scale,100*scale,100*scale,this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].draw_id*100,0,100,100)					
					
					
					//draw hitbox
					if(gameState == EDITOR)
					{
						let x = this.z_index_map[this.current_floor][k].j*100*scale+camera.offSetX+this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].hitboxX
						let y = this.z_index_map[this.current_floor][k].i*100*scale+camera.offSetY+this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].hitboxY
						let w = this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].hitboxW
						let h = this.map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].hitboxH
						rect(x,y,w,h)
					}
				}
				
			}
			if(gameState == EDITOR)
				continue;
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
					if(this.cleaning_platform_pos == 1)
						image(cleaning_platform, this.z_index_map[this.current_floor][k].j*100*scale+camera.offSetX*scale, this.z_index_map[this.current_floor][k].i*100*scale+camera.offSetY*scale, 200*scale, 420*scale,0,0,200,420);
					else
						image(cleaning_platform_up, this.z_index_map[this.current_floor][k].j*100*scale+camera.offSetX*scale, this.z_index_map[this.current_floor][k].i*100*scale+camera.offSetY*scale, 200*scale, 420*scale,0,0,200,420);
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
		//Zombie.s_drawChaseLine();
		Menu.s_drawCurrentFloor();
		message.draw();
	}
	
	draw_assets_list()
	{
		//draw assets background
		fill(255,255,255);
		rect(0,500,800,100)
		rect(0,0,800,20)
		
		//draw assets list
		for(let i = 0; i < assets_array.length; i++)
		{
			let img_array_id = assets_array[i].data_id;
			image(this.img_array[img_array_id], i*100+editor.decalX, 500, 100,100,100*assets_array[i].draw_id,0,100,100)
		}
		
		//draw red selected rect
		stroke(255,0,0);
		noFill();
		rect(editor.selected*100+editor.decalX,500,100,100)
	}
	
	select_element()
	{
		
		if (mouseIsPressed === true) {
			//checks if click pos on assets list 
			if((mouseX - editor.decalX) > 0 && (mouseX - editor.decalX) < assets_array.length*100 && mouseY > 500 && mouseY < 600)
			{
				//select asset
				editor.selected = floor((mouseX - editor.decalX)/100);
			}
			//checks if click pos on map
			if(mouseX > 0 && mouseX < 800 && mouseY > 20 && mouseY < 500 && document.activeElement == document.body)
			{
				let iw_i = floor((mouseX - camera.offSetX)/100);
				let iw_j = floor((mouseY - camera.offSetY)/100);
				//checks if click within map boundaries
				if(iw_i >= 0 && iw_i < 10 && iw_j >= 0 && iw_j < floor_size[map.current_floor].h)
				{
					//put tile 
					this.map_array[this.current_floor][iw_j][iw_i] = assets_array[editor.selected];
				}
			}
			mouseIsPressed = false;
		}
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
			rect(camera.offSetX*scale,camera.offSetY*scale+100*scale,1000*scale,1000*scale)
			//paints street
			fill(63,72,204);
			rect(camera.offSetX*scale-500,camera.offSetY*scale+1400*scale,2000,1000)
		}
		else
			rect(camera.offSetX,camera.offSetY,1000,1000)
		
		for(let k = 0; k < this.z_index_map[this.current_floor].length; k++)
		{
			//checks if tile is within camera viewport
			if(this.z_index_map[this.current_floor][k].j*100*scale+camera.offSetX*scale > -100 && this.z_index_map[this.current_floor][k].i*100*scale+camera.offSetY*scale > -100 && this.z_index_map[this.current_floor][k].j*100*scale+camera.offSetX*scale < camera.width + 100 && this.z_index_map[this.current_floor][k].i*100*scale+camera.offSetY*scale < camera.height + 100)
			{
				//checks if background tile
				if(this.z_index_map[this.current_floor][k].bckgrnd == true)
				{
					//checks if tile is positionable
					if(map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j] instanceof PositionableTile)
						image(this.img_array[this.current_floor], this.z_index_map[this.current_floor][k].j*100*scale+camera.offSetX*scale, this.z_index_map[this.current_floor][k].i*100*scale+camera.offSetY*scale+map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].decalY*scale, 100*scale, 100*scale,map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].id*100,0,100,100);
					else
						image(this.img_array[this.current_floor], (this.z_index_map[this.current_floor][k].j*100*scale+camera.offSetX*scale), (this.z_index_map[this.current_floor][k].i*100*scale+camera.offSetY*scale), 100*scale, 100*scale,map_array[this.current_floor][this.z_index_map[this.current_floor][k].i][this.z_index_map[this.current_floor][k].j].id*100,0,100,100);
						
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
					if(this.cleaning_platform_pos == 1)
						image(cleaning_platform, this.z_index_map[this.current_floor][k].j*100*scale+camera.offSetX*scale, this.z_index_map[this.current_floor][k].i*100*scale+camera.offSetY*scale, 200*scale, 420*scale,0,0,200,420);
					else
						image(cleaning_platform_up, this.z_index_map[this.current_floor][k].j*100*scale+camera.offSetX*scale, this.z_index_map[this.current_floor][k].i*100*scale+camera.offSetY*scale, 200*scale, 420*scale,0,0,200,420);
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
}