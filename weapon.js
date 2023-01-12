
class Weapon {
    constructor (x,y,w,h,img) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.img = img;
	}
	
	
}



class Axe extends Weapon{
    constructor (x,y,w,h,img) {
		super(x,y,w,h,img);
		this.rotation = 0;
		this.swinging = false;
		this.cutting = false;
	}
	
	update()
	{
		if(dwight.faceXX == -1)
			this.x = dwight.x-10;
		else
			this.x = dwight.x+10;
		this.y = dwight.y+10;
	}
	
	draw()
	{
		push();
		
			angleMode(DEGREES);
			translate(this.x+camera.offSetX+this.w,this.y+camera.offSetY+this.h);
			if(dwight.faceXX == 1)
				scale(-1,1);
			stroke(255,0,0);
			rotate(-this.rotation);
			image(this.img, -(this.w/2), -this.h, this.w, this.h);
		
		pop();
		let angle = this.rotation * Math.PI / 180.0;
		if(dwight.faceXX == 1)
			angle = -angle;
		let x =(Math.cos(-angle) * ((this.x+10)-((this.x)+20)) - Math.sin(-angle) * (this.y-(this.y+42)) + ((this.x)+20))
		let y = (Math.sin(-angle) * ((this.x+10)-((this.x)+20)) + Math.cos(-angle) * (this.y-(this.y+42)) + (this.y+42))
		
		
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
	
	checkCollisionEnv(x,y)
	{
		//let x = this.x;
		//let y = this.y;
		let i = floor(this.x/100);
		let j = floor(this.y/100);
		let x2 = i*100+map.map_array[map.current_floor][j][i].hitboxX
		let y2 = j*100+map.map_array[map.current_floor][j][i].hitboxY
		let x2w = x2+map.map_array[map.current_floor][j][i].hitboxW
		let y2h = y2+map.map_array[map.current_floor][j][i].hitboxH
		fill(255,0,0);
		rect(x2+camera.offSetX,y2+camera.offSetY,x2w-x2,y2h-y2);
		if(x > x2 && x < x2w && y > y2 && y < y2h)
		{
			return true;
		}
		return false;
	}
	
	
	
	checkCollision(x,y,x2,y2,x2w,y2h)
	{
		if(x > x2 && x < x2w && y > y2 && y < y2h)
			return true;
		return false;
	}
	
	handleCollision(x,y)
	{
		/*if(this.checkCollisionEnv(x-camera.offSetX,y-camera.offSetY))
			{
				this.swinging = false;
				this.cutting = false;
				this.rotation = 0;
				return true;
			}*/

		for(let i = 0; i < map.floors[map.current_floor].enemyNumber; i++)
		{
			
			
			let x2w = map.floors[map.current_floor].enemies[i].x+camera.offSetX+map.floors[map.current_floor].enemies[i].width;
			let y2h = map.floors[map.current_floor].enemies[i].y+camera.offSetY+map.floors[map.current_floor].enemies[i].height;
			if(this.checkCollision(x,y,map.floors[map.current_floor].enemies[i].x+camera.offSetX,map.floors[map.current_floor].enemies[i].y+camera.offSetY,x2w,y2h))
			{
				
				if(map.floors[map.current_floor].enemies[i].zombieState != STATE.DEAD)
				{
					if(this.cutting)
						map.floors[map.current_floor].enemies[i].takeDmg(x,y);
				}
				return true;
			}
		}
		if(map.current_floor != 0 && map.current_floor != 1 && map.current_floor != 4 && map.current_floor != 5)
			return;
		let x2w = map.floors[map.current_floor].boss.x+camera.offSetX+map.floors[map.current_floor].boss.width;
		let y2h = map.floors[map.current_floor].boss.y+camera.offSetY+map.floors[map.current_floor].boss.height;
		if(this.checkCollision(x,y,map.floors[map.current_floor].boss.x+camera.offSetX,map.floors[map.current_floor].boss.y+camera.offSetY,x2w,y2h))
			{
				
				if(map.floors[map.current_floor].boss.state != STATE.DEAD)
				{
					if(this.cutting)
						map.floors[map.current_floor].boss.takeDmg(x,y);
					
					
				}
				return true;
			}
		return false;
	}
}

class Bullet {
	constructor (x,y,w,h,dirX,dirY) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.going = true;
		this.hurting = true;
		this.img = bullet_img;
		this.dirX = dirX;
		this.dirY = dirY;
	}
	
	update()
	{
		this.x+=10*this.dirX;
		if(this.x > 1000 || this.x < 0)
			this.going = false;
		this.y+=10*this.dirY;
		if(this.y > 900 || this.y < 0)
			this.going = false;
	}
	
	draw()
	{
		if(this.going)
		{
			if(this.dirY == 0)
				image(this.img, this.x+camera.offSetX,this.y+camera.offSetY,this.w, this.h);
			else
			{
				push();
			
				angleMode(DEGREES);
				translate(this.x+camera.offSetX+5,this.y+camera.offSetY);
				rotate(90);
				image(this.img, 0, 0, this.w, this.h);
				
				pop();
			}
		}
	}
}

class Revolver extends Weapon {
    constructor (x,y,w,h,img) {
		super(x,y,w,h,img);
		this.shooting = false;
		this.bulletOrigVec;
		this.bulletDestVec;
		this.bullets = [];
		this.bulletsNbr= 6;
		this.bulletsShot = 0;
		this.lastShot = new Date().getTime();
	}
	
	checkCollisionEnv(obj)
	{
		
				
		let x = obj.x;
		let y = obj.y;
		let i = floor(obj.x/100);
		let j = floor(obj.y/100);
		let y2 = j*100+map.map_array[map.current_floor][j][i].hitboxY
		let y2h = y2+map.map_array[map.current_floor][j][i].hitboxH
		
		
		if(map.map_array[map.current_floor][j][i].game_id == 78)
			{
				y2 = j*100+40;
				y2h = y2+60;
			}
		let x2 = i*100+map.map_array[map.current_floor][j][i].hitboxX
		
		let x2w = x2+map.map_array[map.current_floor][j][i].hitboxW
		
		
		
		fill(255,0,0);
		rect(x2+camera.offSetX,y2+camera.offSetY,x2w-x2,y2h-y2);
		
		
		
		if(x > x2 && x < x2w && y > y2 && y < y2h)
		{
			map.floors[map.current_floor].bullet_impact.push(new Bullet_Impact(x,y,20,20))
			map.z_index_map[map.current_floor] = map.z_index_map[map.current_floor].filter(x => x.id !== 8)
			map.z_index_map[map.current_floor].push(new Tile_To_Draw(floor(x/100),floor(y/100),1000,false,8));
			
			
			//hitting an explosive barell
			if(map.map_array[map.current_floor][j][i].game_id == 78)
			{
				map.map_array[map.current_floor][j][i].game_id = 79;
					map.map_array[map.current_floor][j][i].draw_id = 19;
					//map.explosion = new Explosion(i*100 - 50,j*100,200,200);
					map.explosion = new Explosion(i*100+50,j*100+50,200,200);
					map.floors[map.current_floor].bloods.push(new Explosion_Trace(i*100,j*100+50,0,0))
					map.screenShake = true;
					map.lastShake = new Date().getTime();
					
					let v1 = createVector(i*100+50, j*100+50);
					//circle(i*100-50, j*100, 200)
					for(let k = 0; k < map.floors[map.current_floor].enemyNumber;k++)
						{
							
		
							let v2 = createVector(map.floors[map.current_floor].enemies[k].x + 36/2, map.floors[map.current_floor].enemies[k].y + 70/2)

							let distance = p5.Vector.dist(v1, v2);
							//console.log("distance ", distance)
							//console.log("v1 ", v1)
							//console.log("v2 ", v2)
							
							if(distance < 150)
								{
									map.floors[map.current_floor].enemies[k].takeDmg(map.floors[map.current_floor].enemies[k].x,map.floors[map.current_floor].enemies[k].y)
									map.floors[map.current_floor].enemies[k].takeDmg(map.floors[map.current_floor].enemies[k].x,map.floors[map.current_floor].enemies[k].y)
									map.floors[map.current_floor].enemies[k].takeDmg(map.floors[map.current_floor].enemies[k].x,map.floors[map.current_floor].enemies[k].y)
									map.floors[map.current_floor].enemies[k].takeDmg(map.floors[map.current_floor].enemies[k].x,map.floors[map.current_floor].enemies[k].y)
									map.floors[map.current_floor].enemies[k].takeDmg(map.floors[map.current_floor].enemies[k].x,map.floors[map.current_floor].enemies[k].y)
								}
						}
					
		
							let v2 = createVector(map.floors[map.current_floor].boss.x + 40/2, map.floors[map.current_floor].boss.y + 80/2)

							let distance = p5.Vector.dist(v1, v2);
							//console.log("distance ", distance)
							//console.log("v1 ", v1)
							//console.log("v2 ", v2)
							
							if(distance < 150)
								{
									map.floors[map.current_floor].boss.takeDmg(map.floors[map.current_floor].boss.x,map.floors[map.current_floor].boss.y)
									map.floors[map.current_floor].boss.takeDmg(map.floors[map.current_floor].boss.x,map.floors[map.current_floor].boss.y)
								}
					
					
		
							v2 = createVector(dwight.x + 36/2, dwight.y + 70/2)

							distance = p5.Vector.dist(v1, v2);
							//console.log("distance ", distance)
							//console.log("v1 ", v1)
							//console.log("v2 ", v2)
							
							if(distance < 150)
								{
									dwight.takeDmg(dwight.x,dwight.y)
									
								}
			}
			
			return true;
		}
		return false;
	}
	
	checkCollision(x,y,x2,y2,x2w,y2h)
	{
		if(x > x2 && x < x2w && y > y2 && y < y2h)
			return true;
		return false;
	}
	
	handleCollision(obj)
	{
		if(!obj.going)
			return;
		
		if(this.checkCollisionEnv(obj))
		{
			obj.going = false;
			return false;
			
		}
		

		for(let i = 0; i < map.floors[map.current_floor].enemyNumber; i++)
		{
			let x2w = map.floors[map.current_floor].enemies[i].x+camera.offSetX + map.floors[map.current_floor].enemies[i].width;
			let y2h = map.floors[map.current_floor].enemies[i].y+camera.offSetY + map.floors[map.current_floor].enemies[i].height;
			if(this.checkCollision(obj.x+camera.offSetX,obj.y+camera.offSetY,map.floors[map.current_floor].enemies[i].x+camera.offSetX,map.floors[map.current_floor].enemies[i].y+camera.offSetY,x2w,y2h))
			{
				
				if(map.floors[map.current_floor].enemies[i].zombieState != STATE.DEAD)
				{
					
					if(obj.hurting)
					{
						map.floors[map.current_floor].enemies[i].takeDmg(obj.x+camera.offSetX,obj.y+camera.offSetY);
						obj.hurting = false;
						obj.going = false;
					}
				}
				return true;
			}
			
		}
		if(map.current_floor != 0 && map.current_floor != 1 && map.current_floor != 4 && map.current_floor != 5)
			return;
		
		let x2w = map.floors[map.current_floor].boss.x+camera.offSetX + map.floors[map.current_floor].boss.width;
		let y2h = map.floors[map.current_floor].boss.y+camera.offSetY + map.floors[map.current_floor].boss.height;
		if(this.checkCollision(obj.x+camera.offSetX,obj.y+camera.offSetY,map.floors[map.current_floor].boss.x+camera.offSetX,map.floors[map.current_floor].boss.y+camera.offSetY,x2w,y2h))
			{
				
				if(map.floors[map.current_floor].boss.state != STATE.DEAD)
				{
					if(obj.hurting)
					{
						map.floors[map.current_floor].boss.takeDmg(obj.x+camera.offSetX,obj.y+camera.offSetY);
						obj.hurting = false;
						obj.going = false;
					}
				}
				return true;
			}
		return false;
	}

	
	
	
	update()
	{
		let startX;
		if(dwight.faceX == -1)
			startX = this.x - (36+36) + camera.offSetX;
		else
			startX = this.x+camera.offSetX;
		this.x = dwight.x+36;
		this.y = dwight.y+35;
		this.bulletDestVec = createVector(this.x+camera.offSetX+800*dwight.faceX, (this.y+camera.offSetY+4)+600*dwight.faceY);
		this.bulletOrigVec = createVector(startX, this.y+camera.offSetY+4);
	}
	
	updateBullets()
	{
		for(let i = 0; i < this.bullets.length; i++)
		{	
			if(this.bullets[i].going == false)
				continue;
			this.bullets[i].update();
			this.handleCollision(this.bullets[i])
			if(this.bullets[i].going == false)
			{
				map.z_index_map[map.current_floor] = map.z_index_map[map.current_floor].filter(x => x.id !== i+400)
				
			}
		}
	}
	
	reload()
	{
		if(this.bulletsShot == this.bulletsNbr)
			this.bulletsShot = 0;
	}
	
	draw()
	{
		if(dwight.faceX == -1)
		{
			push();
			translate(this.x+camera.offSetX,this.y+camera.offSetY);
			scale(-1,1);
			image(this.img, 36, 0, this.w, this.h);
			pop();
		}
		else
			image(this.img, this.x+camera.offSetX, this.y+camera.offSetY, this.w, this.h);
		stroke(255,0,0);
		line(this.bulletOrigVec.x+20, this.bulletOrigVec.y, this.bulletDestVec.x+20, this.bulletDestVec.y);
		fill(0);
		textSize(10);
		text((this.bulletsNbr - this.bulletsShot)+'/'+this.bulletsNbr, this.x+camera.offSetX+10, this.y+camera.offSetY-5);
	}
	
	shoot()
	{
		let now = new Date().getTime();
		let delta = now - this.lastShot;
		if (delta < 500) {
			return;
		}
		
		if(this.bulletsShot == this.bulletsNbr)
			return;
		
		this.lastShot = new Date().getTime();
		
		let startX;
		if(dwight.faceX == -1)
			startX = this.x - (18+36);
		else
			startX = this.x+18
		
		
		this.bullets[this.bulletsShot] = new Bullet(startX,this.y+3,5,3,dwight.faceX,dwight.faceY);
		
		map.z_index_map[map.current_floor].push(new Tile_To_Draw(this.bullets[this.bulletsShot].x/100,this.bullets[this.bulletsShot].y/100,1000,false,(this.bulletsShot)+400));
		this.bulletsShot++;
		
	}
}