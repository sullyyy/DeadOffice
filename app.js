let tile;
let fr = 30;
let dwight;

let windowWidth = 800
let windowHeight = 600;

const MENU = 0;
const PLAY = 1;
const GAME_OVER = 2;

let font;
let fontSize = 40;

let gameState = MENU;

let map_size_width = 10;
let map_size_height = 10;

let camera;
let map;
let dwight_dead;

let enemies = [];
let map_array = [];
let map_floor = [];

let colX, colY, colW, colH = 0;
let hitDX, hitDY, hitDW, hitDH = 0;

let z_index_map = [];


let map_array_0 = [[3,2,12,24,4,3,2,4,3,4],
		   [3,18,1,1,16,17,21,2,20,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,28,27,26,27,27,1,25,28,4],
		   [3,13,14,13,1,1,1,1,33,4],
		   [3,32,9,1,9,1,1,1,1,4],
		   [3,1,10,1,10,"b",26,31,27,4],
		   [3,1,9,1,9,30,1,1,18,4],
		   [3,1,10,1,10,"a",32,1,1,4],
		   [35,2,12,2,12,2,2,12,2,34]]
		   
let map_array_1 = [[3,12,12,12,12,12,12,12,12,4],
		   [3,1,1,1,1,1,1,1,11,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,10,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [7,5,5,5,5,5,5,5,5,6]]




function preload() {
  tilemap = loadImage('assets/img/tile_map.png');
  dwight = new Dwight(100,100,36,70,loadImage('assets/img/dwight.png'),1);
  font = loadFont('assets/font/joystix.ttf');
  dwight_dead = loadImage('assets/img/dwight_dead.png');
  enemies.push(new Zombie(300,200,36,70,loadImage('assets/img/zombie.png'),2));
  enemies.push(new Zombie(500,500,36,70,loadImage('assets/img/zombie.png'),3));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fr);
  
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  
  camera = new Camera(0, 0,800,600);
  
  convertMapArray();
 
  
  map_array.push(map_array_0);
  //map_array.push(map_array_1);
  
  map = new Map(10,10, map_array);
  
  map.sort();
  
  Zombie.s_setState(STATE.IDLE);
  

}

function convertMapArray()
{
	for(let i = 0; i < 10; i++)
	{
		for(let j = 0; j < 10; j++)
		{
			if(map_array_0[i][j] == 1)
			{
				map_array_0[i][j] = new Floor(map_array_0[i][j],0,0,0,0);
			}
			else if(map_array_0[i][j] == 2 || map_array_0[i][j] == 12)
			{
				map_array_0[i][j] = new Wall(map_array_0[i][j],0,82,100,18);
				
			}
			else if(map_array_0[i][j] == 3)
			{
				map_array_0[i][j] = new Wall(map_array_0[i][j],82,0,18,182);
				
			}
			else if(map_array_0[i][j] == 4)
			{
				map_array_0[i][j] = new Wall(map_array_0[i][j],0,0,18,182);
				
			}
			else if(map_array_0[i][j] == 8)
			{
				map_array_0[i][j] = new Door(map_array_0[i][j],0,80,100,20);
				
			}
			
			
			else if(map_array_0[i][j] == 9)
			{
				map_array_0[i][j] = new Table(map_array_0[i][j],1,72,98,28);
				
			}
			else if(map_array_0[i][j] == 10)
			{
				map_array_0[i][j] = new Chair(map_array_0[i][j],41,0,28,14,-86);
				
			}
			else if(map_array_0[i][j] == 11 || map_array_0[i][j] == 19)
			{
				map_array_0[i][j] = new Stairs(map_array_0[i][j],0,0,100,100);
				
			}
			else if(map_array_0[i][j] == 13 || map_array_0[i][j] == 14)
			{
				map_array_0[i][j] = new Cupboard(map_array_0[i][j],3,0,94,17,-83);
				
			}
			else if(map_array_0[i][j] == 18)
			{
				map_array_0[i][j] = new Plant(map_array_0[i][j],43,0,21,12,-55);
				
			}
			else if(map_array_0[i][j] == 16 || map_array_0[i][j] == 17)
			{
				map_array_0[i][j] = new Elevator(map_array_0[i][j],0,0,100,100);
				
			}
			else if(map_array_0[i][j] == 21)
			{
				map_array_0[i][j] = new VendingMachine(map_array_0[i][j],19,0,64,28,-72);
				
			}
			else if(map_array_0[i][j] == 25 || map_array_0[i][j] == 26 || map_array_0[i][j] == 27 || map_array_0[i][j] == 28)
			{
				map_array_0[i][j] = new ThinWall(map_array_0[i][j],0,90,100,10);
				
			}
			else if(map_array_0[i][j] == 30)
			{
				map_array_0[i][j] = new ThinWall(map_array_0[i][j],90,0,10,100);
				
			}
			else if(map_array_0[i][j] == 31)
			{
				map_array_0[i][j] = new ThinDoor(map_array_0[i][j],0,90,100,10);
				
			}
			else if(map_array_0[i][j] == 32)
			{
				map_array_0[i][j] = new Printer(map_array_0[i][j],9,0,78,20,-80);
				
			}
			else if(map_array_0[i][j] == 33)
			{
				map_array_0[i][j] = new Lamp(map_array_0[i][j],41,0,19,10,-90);
				
			}
			else if(map_array_0[i][j] == "a")
			{
				map_array_0[i][j] = new ThinWallLong(30,90,0,10,200);
			}
			else if(map_array_0[i][j] == "b")
			{
				map_array_0[i][j] = new ThinWallLong(30,90,90,10,10);
				
			}
			else
				map_array_0[i][j] = new Tile(map_array_0[i][j],0,0,100,100);
		}
	}
	
}

function setStartingPoint()
{
	dwight.x = 100;
	dwight.y = 100;
	enemies[0].x = 300;
	enemies[0].y = 200;
	enemies[1].x = 500;
	enemies[1].y = 500;
}

function draw() {
  
  switch (gameState) {
	  
	  case MENU:
	  Menu.s_draw();
	  setStartingPoint();
	  camera.lookAtObj(dwight);
	  camera.update();
	  dwight.alive = true;
	  break;
	  
	  case PLAY:
	  dwight.move();
	  for(let i = 0; i < 2; i++)
	  {
		  enemies[i].update();
	  }
	  map.drawZ();
	  camera.update();
	  break;
	  
	  case GAME_OVER: 
	  
	  for(let i = 0; i < 2; i++)
	  {
		enemies[i].update();
	  }
	  map.drawZ();
	  image(dwight_dead, dwight.x + camera.offSetX, dwight.y + 70 + camera.offSetY, dwight_dead.width, dwight_dead.height);
	  Menu.s_drawGameOver();
	  camera.update();
	  break;
	  
	  default:
	  break;
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  
  if(gameState == MENU)
	  gameState = PLAY;
  if(gameState == GAME_OVER)
	  gameState = MENU;
}



