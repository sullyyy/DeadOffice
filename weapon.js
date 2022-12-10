class Weapon {
    constructor (x,y,w,h,img) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.img = img;
		this.rotation = 0;
		this.swinging = false;
		this.cutting = false;
	}
	
	update()
	{
		this.x = dwight.x-10;
		this.y = dwight.y+10;
	}
	
	draw()
	{
		
		push();
		
		angleMode(DEGREES);
		translate(this.x+camera.offSetX+this.w,this.y+camera.offSetY+this.h);
		stroke(255,0,0);
		rotate(-this.rotation);
		rect(-(this.w/2),-this.h,weapon.w,this.h)
		image(this.img, -(this.w/2), -this.h, this.w, this.h);
		
		pop();
		
		let angle = this.rotation * Math.PI / 180.0;
		let x = Math.cos(-angle) * ((this.x+10)-((this.x)+20)) - Math.sin(-angle) * (this.y-(this.y+42)) + ((this.x)+20)
		let y = Math.sin(-angle) * ((this.x+10)-((this.x)+20)) + Math.cos(-angle) * (this.y-(this.y+42)) + (this.y+42)
		rect(x+camera.offSetX,y+camera.offSetY,10,10);
		
		if(this.swinging)
		{
			this.rotation+=7;
			if(this.rotation > 90)
			{
				this.rotation = 0;
				this.swinging = false;
				this.cutting = false;
			}
			if(this.handleCollision(x+camera.offSetX,y+camera.offSetY))
			{
				this.cutting = false;
			}
		}
	}
	
	swing()
	{
		this.swinging = true;
		this.cutting = true;
	}
	
	checkCollision(x,y,x2,y2)
	{
		let x2w = x2 + 36
		let y2h = y2 + 70
		if(x > x2 && x < x2w && y > y2 && y < y2h)
			return true;
		return false;
	}
	
	handleCollision(x,y)
	{

		for(let i = 0; i < map.floors[map.current_floor].enemyNumber; i++)
		{
			
			rect(map.floors[map.current_floor].enemies[i].x+camera.offSetX,map.floors[map.current_floor].enemies[i].y+camera.offSetY,36,70);
			
			if(this.checkCollision(x,y,map.floors[map.current_floor].enemies[i].x+camera.offSetX,map.floors[map.current_floor].enemies[i].y+camera.offSetY))
			{
				
				if(map.floors[map.current_floor].enemies[i].zombieState != STATE.DEAD)
				{
					if(this.cutting)
						map.floors[map.current_floor].enemies[i].takeDmg();
				}
				return true;
			}
		}
		return false;
	}
}