
class Weapon {
    constructor (x,y,w,h,img) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.img = img;
	}
	
	update(x,y)
	{
		this.x = x;
		this.y = y;
	}
	
	
	draw()
	{
		image(this.img,this.x+camera.offSetX, this.y+camera.offSetY, this.width, this.height);
	}
	
	
	
	
}

class Sniper extends Weapon{
	 constructor (x,y,w,h,img) {
		 super(x,y,w,h,img);
		 this.lastShot  = new Date().getTime();
		 this.gun_fire  = new Gun_Fire(this.x,this.y,5,5,this,false);
		 this.bullets = [];
	 }
	
	update(x,y)
	{
		super.update(x,y);
		for(let i = 0; i < this.bullets.length; i++)
			{
				if(!this.bullets[i].show)
					continue;
				let bullet_hit = this.bullets[i].update();
				if(!bullet_hit)
					{
						
						this.bullets[i].show = false;
						
						map.floors[map.current_floor].shotgun_impact[i] = new Bullet_Impact(this.bullets[i].x,this.bullets[i].y,20,20)
						map.z_index_map[map.current_floor].push(new Tile_To_Draw(floor(this.bullets[i].x/100),floor(this.bullets[i].y/100),1000+i,false,9));
						bullet_impact_sound.play();
						
					}
				if(bullet_hit == 2)
					{
						this.bullets[i].show = false;
						dwight.takeDmg(this.x,this.y);
					}
			}
	}
	
	shoot()
	{
		let now = new Date().getTime();
		let delta = now - this.lastShot;
		if (delta >= 1500) {
			
			console.log("PAN")
		
			this.bullets.push(new Shotgun_Bullet(this.x+this.w,this.y,createVector((dwight.x + (dwight.width/2)), (dwight.y + dwight.height/2))))
			shotgun_sound.play();
			
			this.lastShot = new Date().getTime();
			
			this.gun_fire = new Gun_Fire(this.x,this.y,5,5,this,true)
		}
	}
	
	draw()
	{
		super.draw();
		for(let i = 0; i < this.bullets.length; i++)
			{
				if(this.bullets[i].show)
					this.bullets[i].draw();
			}
		this.gun_fire.draw_shotgun_fire();
	}
	
	
}

class Shotgun_Bullet {
	 constructor (x,y,dest) {
		 this.x = x;
		 this.y = y;
		 this.w = 5;
		 this.h = 5;
		 this.dest = dest;
		 this.ori = createVector(x, y);
		 this.velocity = 6;
		 this.show = true;
	 }
	
	checkCollisionEnv(x,y)
	{
		let i = floor(this.x/100);
		let j = floor(this.y/100);
		let x2 = i*100+map.map_array[map.current_floor][j][i].hitboxX;
		let y2 = j*100+map.map_array[map.current_floor][j][i].hitboxY;
		let x2w = x2+map.map_array[map.current_floor][j][i].hitboxW;
		let y2h = y2+map.map_array[map.current_floor][j][i].hitboxH;
		
		if(x > x2 && x < x2w && y > y2 && y < y2h)
			return true;
		return false;
	}
	
	checkCollision()
	{
		
		let x2 = dwight.x;
		let y2 = dwight.y;
		let x2w = x2+dwight.width;
		let y2h = y2+dwight.height;
		let x = this.x;
		let y = this.y;
		if(x > x2 && x < x2w && y > y2 && y < y2h)
			return true;
		return false;
	}
	
	update()
	{

		let v1 = this.ori;
		let v2 = this.dest;
		  
		  
		  let dx = v1.x - v2.x;
		  let dy = v1.y - v2.y;
		  let angle = atan2(dy, dx)
		  
		  let xVelocity = this.velocity * cos(angle);
		  let yVelocity = this.velocity * sin(angle);
		
		if(this.checkCollision())
			return 2;
		
		if(this.checkCollisionEnv(this.x - xVelocity,this.y - yVelocity))
			return false;
		  
		
		this.x-=xVelocity;
			
		this.y-=yVelocity;
		
		let distance = p5.Vector.dist(v1, v2);
		
		
		return true;
	}
	
	draw()
	{
		push();
		fill('orange')
		
			rect(this.x + camera.offSetX, this.y + camera.offSetY, this.w, this.h)
			
		pop();
	}
}

class Shotgun extends Weapon{
	constructor (x,y,w,h,img,boss) {
		super(x,y,w,h,img);
		this.boss = boss;
		this.bullets = [];
		this.lastShot = new Date().getTime();
		this.gun_fire = new Gun_Fire(this.x,this.y,5,5,this,false);
	}
	
	update()
	{
		this.x = this.boss.x;
		this.y = this.boss.y + 50;
		for(let i = 0; i < this.bullets.length; i++)
			{
				if(!this.bullets[i].show)
					continue;
				let bullet_hit = this.bullets[i].update();
				if(!bullet_hit)
					{
						
						this.bullets[i].show = false;
						
						map.floors[map.current_floor].shotgun_impact[i] = new Bullet_Impact(this.bullets[i].x,this.bullets[i].y,20,20)
						map.z_index_map[map.current_floor].push(new Tile_To_Draw(floor(this.bullets[i].x/100),floor(this.bullets[i].y/100),1000+i,false,9));
						bullet_impact_sound.play();
						
					}
				if(bullet_hit == 2)
					{
						this.bullets[i].show = false;
						dwight.takeDmg(this.x,this.y);
					}
			}
	}
	
	draw()
	{
		for(let i = 0; i < this.bullets.length; i++)
			{
				if(this.bullets[i].show)
					this.bullets[i].draw();
			}
		image(this.img, this.x + camera.offSetX, this.y + camera.offSetY, this.w, this.h);
		
		this.gun_fire.draw_shotgun_fire();
	}
	
	shoot()
	{
		let now = new Date().getTime();
		let delta = now - this.lastShot;
		if (delta >= 1500) {
		
		this.bullets.push(new Shotgun_Bullet(this.x,this.y,createVector((dwight.x + (dwight.width/2)), (dwight.y + dwight.height/2))))
		this.bullets.push(new Shotgun_Bullet(this.x,this.y,createVector((dwight.x + (dwight.width/2)) + 5, (dwight.y + dwight.height/2)+5)))
		this.bullets.push(new Shotgun_Bullet(this.x,this.y,createVector((dwight.x + (dwight.width/2)) - 5, (dwight.y + dwight.height/2)-5)))
			shotgun_sound.play();
			
			this.lastShot = new Date().getTime();
			
			this.gun_fire = new Gun_Fire(this.x,this.y,5,5,this,true)
		}
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
		if(this.swinging)
			return;
		axe_swing_sound.play();
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

class Gun_Fire {
	constructor (x,y,w,h,gun,show) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.img = gun_fire_animation;
		this.last = new Date().getTime();
		this.frame = 0;
		this.show = show;
		this.gun = gun;
	}
	
	draw_shotgun_fire()
	{
		//checking if showing
		if(!this.show)
			return;
		
		//readjusting position
		this.x = this.gun.x + this.gun.w;
		this.y = this.gun.y;
		
		
		//calculating time elapsed
		let now = new Date().getTime();
		let delta = now - this.last;
		
		//enough time passed
		if (delta >= 60) {
			
			//progressing the animation
			this.last = new Date().getTime();
			this.frame++;
			
			//ending the animation
			if(this.frame > 5)
				{
					this.show = false;
					return;
				}
		}
		
		//drawing
		image(this.img, this.x+camera.offSetX,this.y+camera.offSetY,this.w*1.8, this.h*1.5,this.w*this.frame,0,this.w, this.h);
		
	}
	
	draw()
	{
		//checking if showing
		if(!this.show)
			return;
		
		//readjusting position
		this.x = this.gun.x + 19;
		this.y = this.gun.y;
		
		
		//calculating time elapsed
		let now = new Date().getTime();
		let delta = now - this.last;
		
		//enough time passed
		if (delta >= 60) {
			
			//progressing the animation
			this.last = new Date().getTime();
			this.frame++;
			
			//ending the animation
			if(this.frame > 5)
				{
					this.show = false;
					return;
				}
		}
		
		//checks which direction dwight is facing
		if(dwight.faceX == -1)
		{
			
			//mirroring image
			push();
				translate(this.x+camera.offSetX,this.y+camera.offSetY);
				scale(-1,1);
			 	image(this.img, 73,0,this.w*1.5, this.h*1.5,this.w*this.frame,0,this.w, this.h);
			pop();
		}
		else
			image(this.img, this.x+camera.offSetX,this.y+camera.offSetY,this.w*1.5, this.h*1.5,this.w*this.frame,0,this.w, this.h);
		
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
		this.gun_fire = new Gun_Fire(0,0,5,5,this,false);
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
			bullet_impact_sound.play();
			
			
			//hitting an explosive barell
			if(map.map_array[map.current_floor][j][i].game_id == 78)
			{
				console.log(" i " , i)
				console.log(" j " , j)
				
					//hitting explosive barell next to grilled wall (opening way)
					if(i == 2 && j == 3)
					   {
						    //openging way by changing hitbow of wall && appearance
					   		grilledWallOpening.opened = true;
						   	map.map_array[map.current_floor][j-1][i].hitboxW = 0;
					   }
					
					map.map_array[map.current_floor][j][i].game_id = 79;
					map.map_array[map.current_floor][j][i].draw_id = 19;
					//map.explosion = new Explosion(i*100 - 50,j*100,200,200);
					map.explosion = new Explosion(i*100+50,j*100+50,200,200);
					let decalY = map.map_array[map.current_floor][j][i].decalY;
					map.floors[map.current_floor].bloods.push(new Explosion_Trace(i*100,j*100+50+decalY,0,0))
					map.screenShake = true;
					map.lastShake = new Date().getTime();
					explosion_sound.play();
					
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
									//if(map.floors[map.current_floor].boss.state != STATE.DEAD)
									//{
										map.floors[map.current_floor].boss.takeDmg(map.floors[map.current_floor].boss.x,map.floors[map.current_floor].boss.y)
										map.floors[map.current_floor].boss.takeDmg(map.floors[map.current_floor].boss.x,map.floors[map.current_floor].boss.y)
										map.floors[map.current_floor].boss.takeDmg(map.floors[map.current_floor].boss.x,map.floors[map.current_floor].boss.y)
										map.floors[map.current_floor].boss.takeDmg(map.floors[map.current_floor].boss.x,map.floors[map.current_floor].boss.y)
										map.floors[map.current_floor].boss.takeDmg(map.floors[map.current_floor].boss.x,map.floors[map.current_floor].boss.y)
									//}
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
		{
			this.bulletsShot = 0;
			reload_sound.play();
		}
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
		//stroke(255,0,0);
		//line(this.bulletOrigVec.x+20, this.bulletOrigVec.y, this.bulletDestVec.x+20, this.bulletDestVec.y);
		
		this.gun_fire.draw();
		
		//draw ammo text
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
		{
			gun_click_sound.play();
			return;
		}
		
		this.lastShot = new Date().getTime();
		
		let startX;
		if(dwight.faceX == -1)
			startX = this.x - (18+36);
		else
			startX = this.x+18
		
		
		this.bullets[this.bulletsShot] = new Bullet(startX,this.y+3,5,3,dwight.faceX,dwight.faceY);
		
		map.z_index_map[map.current_floor].push(new Tile_To_Draw(this.bullets[this.bulletsShot].x/100,this.bullets[this.bulletsShot].y/100,1000,false,(this.bulletsShot)+400));
		this.bulletsShot++;
		
		revolver_shot_sound.play();
		
		this.gun_fire = new Gun_Fire(this.x,this.y,5,5,this,true)
		
	}
}