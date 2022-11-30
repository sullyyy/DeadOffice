
 let keys = [];

class Dwight{
    constructor (x, y, width, height, img) {
		//super(x, y, width, height, img);
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.img = img;
		this.acc = 7;
		this.alive = true;
		
	}
	
	draw()
	{
		this.move();
		image(this.img, this.x + camera.offSetX, this.y + camera.offSetY, this.width, this.height);
	}
	
	move()
	{
		if(keys[LEFT_ARROW])
		{
			if(this.handleCollision(dwight.x - dwight.acc, dwight.y))
			{
				camera.offSetX += dwight.acc;
				dwight.x-= dwight.acc;
			}
		}
		if(keys[RIGHT_ARROW])
		{
			if(this.handleCollision(dwight.x  + dwight.acc, dwight.y))
			{
				camera.offSetX -= dwight.acc;
				dwight.x+=dwight.acc;
			}
			
		}
		if(keys[UP_ARROW])
		{
			if(this.handleCollision(dwight.x, dwight.y - dwight.acc))
			{
				camera.offSetY += dwight.acc;
				dwight.y-=dwight.acc;
			}
		}
		if(keys[DOWN_ARROW])
		{
			if(this.handleCollision(dwight.x, dwight.y + dwight.acc))
			{
				camera.offSetY -= dwight.acc;
				dwight.y+=dwight.acc;
			}
		}
	}
	
	handleCollision(x,y)
	{
		
		if(map.map_array[map.current_floor][floor((y+60)/100)][floor(x/100)] == 11)
		{
			if(map.current_floor == 1)
				map.current_floor = 0;
			else
				map.current_floor = 1;
			
		}
		if(x/100 < 0 || y/100 < 0 || x/100 > 10 || y/100 > 10 )
			return false;
		if(map.map_array[map.current_floor][floor((y+60)/100)][floor(x/100)] != 1)
		    return false;
		if(map.map_array[map.current_floor][floor((y+60)/100)][floor((x+36)/100)] != 1)
		    return false;
		return true;
		//super.handleCollision(x,y);
	}
	
	
}

function keyPressed() {
	keys[keyCode] = 1;
}

function keyReleased() {
	keys[keyCode] = 0;	
}
