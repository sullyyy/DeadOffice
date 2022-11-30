let tile;
let fr = 30;
let dwight;

let windowWidth = 800
let windowHeight = 600;

const MENU = 0;
const PLAY = 1;
const GAME_OVER = 2;
const LVL_TRANSITION = 3;
const END = 4;
const HOW_TO_PLAY = 5;
const DIALOG_BOX = 6;
const GENERATOR_DIALOG = 7;
const ELEVATOR_DIALOG = 8;

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

let z_index_map = [[],[],[],[],[],[]];
let img_array = [];

let last = new Date().getTime();


class cpl {
	 constructor (w, h) {
		 this.w = w;
		 this.h = h;
	 }
}

const floor_size = [new cpl(10,9),new cpl(10,9),new cpl(10,9),new cpl(10,9),new cpl(10,9),new cpl(9,17)]

/*let map_array_0 = [[3,2,12,24,4,3,2,4,3,4],
		   [3,18,1,1,16,17,21,2,20,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,28,27,26,27,27,1,25,28,4],
		   [3,13,14,13,1,1,1,1,33,4],
		   [3,32,9,1,9,1,1,1,1,4],
		   [3,1,10,1,10,"b",26,31,27,4],
		   [3,1,9,1,9,30,1,1,18,4],
		   [3,1,10,1,10,"a",32,1,1,4],
		   [35,2,12,2,12,2,2,12,2,34]]*/
		   
/*let map_array_1 = [[3,12,12,12,12,12,12,12,12,4],
		   [3,1,1,1,1,1,1,1,11,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,10,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [7,5,5,5,5,5,5,5,5,6]]*/
		   
let map_array_0 = [[3,12,12,12,12,4,3,4,3,4],
				   [3,37,37,37,18,16,17,24,20,4],
				   [3,28,31,28,28,1,1,1,1,4],
				   [3,28,28,25,26,27,1,1,28,4],
				[3,13,14,1,1,1,1,1,21,4],
		   [3,32,9,1,9,1,1,1,1,4],
		   [3,1,10,1,10,"b",26,31,27,4],
		   [3,1,9,1,9,30,1,1,18,4],
		   [3,1,10,1,10,"a",32,1,1,4],
		   [35,2,12,2,12,2,2,12,2,34]]
		   
let map_array_lvl_basement = [[3,2,2,2,2,4,3,4,3,4],
		   [3,1,1,9,10,2,2,2,5,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [7,2,2,2,2,2,2,8,2,6]]
		   
let map_array_lvl_0 = [[3,2,2,2,2,4,3,4,3,4],
		   [3,1,1,1,1,10,11,2,5,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [7,2,2,2,8,9,2,2,2,6]]
		   
		   let map_array_lvl_1 = [[3,2,2,2,2,4,3,4,3,4],
		   [3,1,1,1,1,10,11,2,5,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [7,2,9,2,8,8,2,8,2,6]]
		   
		   let map_array_lvl_2 = [[3,2,2,2,2,4,3,4,3,4],
		   [3,1,1,1,1,10,11,2,5,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [7,2,8,2,8,8,2,8,2,6]]
		   
		   let map_array_lvl_3 = [[3,2,2,2,2,4,3,4,3,4],
		   [3,1,1,1,1,10,11,2,5,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [7,2,9,2,8,8,2,8,2,6]]
		   
		   let map_array_lvl_roof = [[9,8,8,8,8,8,8,4,3,4],
		   [3,1,1,1,1,1,1,21,5,13],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [3,1,1,1,1,1,1,1,1,4],
		   [12,8,8,8,8,8,8,8,17,11],
		   [24,39,38,22,37,37,22,37,15,23],
		   [24,22,37,22,37,37,22,37,15,23],
		   [24,39,38,22,37,37,22,37,15,23],
		   [24,22,22,22,26,27,32,22,15,33],
		   [0,0,0,0,0,0,28,25,15,29],
		   [0,0,0,0,0,0,34,0,0,35],
		   [0,0,0,0,0,0,0,30,30,0],
		   [0,0,0,0,0,0,0,36,36,0]]




function preload() {
  //tilemap = loadImage('assets/img/tile_map.png');
  tilemap_0 = loadImage('assets/img/tile_map_0.png');
  tilemap_1 = loadImage('assets/img/tile_map_1.png');
  tilemap_2 = loadImage('assets/img/tile_map_2.png');
  tilemap_3 = loadImage('assets/img/tile_map_3.png');
  tilemap_4 = loadImage('assets/img/tile_map_4.png');
  tilemap_5 = loadImage('assets/img/tile_map_5.png');
  cleaning_platform = loadImage('assets/img/cleaning_platform.png');
  cleaning_platform_up = loadImage('assets/img/cleaning_platform_up.png');
  dwight = new Dwight(500,200,36,70,loadImage('assets/img/dwight.png'),1);
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
  
  /*convertMapArray(map_array_0);
  convertMapArray(map_array_lvl_0);
 
  
  map_array.push(map_array_0);
  map_array.push(map_array_lvl_0);*/
  convertMapArray_01(map_array_lvl_basement,10,10,0);
  convertMapArray_0(map_array_lvl_0,10,10,1);
  convertMapArray_1(map_array_lvl_1,10,10,2);
  convertMapArray_2(map_array_lvl_2,10,10,3);
  convertMapArray_3(map_array_lvl_3,10,10,4);
  convertMapArray(map_array_lvl_roof,18,10,5);
  
  map_array.push(map_array_lvl_basement);
  map_array.push(map_array_lvl_0);
  map_array.push(map_array_lvl_1);
  map_array.push(map_array_lvl_2);
  map_array.push(map_array_lvl_3);
  map_array.push(map_array_lvl_roof);
  
  img_array.push(tilemap_0);
  img_array.push(tilemap_1);
  img_array.push(tilemap_2);
  img_array.push(tilemap_3);
  img_array.push(tilemap_4);
  img_array.push(tilemap_5);
  
  
  //img_array.push(tilemap);
  
  
  
  map = new Map(10,10, map_array,img_array,z_index_map);
  
  //console.log("lenthj ", map.map_array[5][0].length);
  
  for(let i = 0; i < 6;i++)
  {
	  if(i == 5)
		 map.sort(i,18,10);
	  else
		 map.sort(i,10,10);
	  
  }
  
  //Zombie.s_setState(STATE.IDLE);
  
  message = new Message(0,0,"");
  

}

function convertMapArray_01(map_array,w,h,flr)
{
	for(let i = 0; i < w; i++)
	{
		for(let j = 0; j < h; j++)
		{
			if(map_array[i][j] == 0)
			{
				map_array[i][j] = new Floor(map_array[i][j],0,0,0,0);
			}
			if(map_array[i][j] == 1)
			{
				map_array[i][j] = new Floor(map_array[i][j],0,0,0,0);
			}
			else if(map_array[i][j] == 2)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,82,100,18);
			}
			else if(map_array[i][j] == 3)
			{
				map_array[i][j] = new Wall(map_array[i][j],82,0,18,182);
				
			}
			else if(map_array[i][j] == 4)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,18,182);
				
			}
			else if(map_array[i][j] == 5)
			{
				map_array[i][j] = new Stairs(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 6)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 7)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 8)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 9)
			{
				map_array[i][j] = new PositionableTile(map_array[i][j],1,0,98,29,-71);
				
			}
			else if(map_array[i][j] == 10)
			{
				map_array[i][j] = new PositionableTile(map_array[i][j],1,0,98,29,-71);
				
			}
		}
	}
}

function convertMapArray_0(map_array,w,h,flr)
{
	for(let i = 0; i < w; i++)
	{
		for(let j = 0; j < h; j++)
		{
			if(map_array[i][j] == 0)
			{
				map_array[i][j] = new Floor(map_array[i][j],0,0,0,0);
			}
			if(map_array[i][j] == 1)
			{
				map_array[i][j] = new Floor(map_array[i][j],0,0,0,0);
			}
			else if(map_array[i][j] == 2)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,82,100,18);
			}
			else if(map_array[i][j] == 3)
			{
				map_array[i][j] = new Wall(map_array[i][j],82,0,18,182);
				
			}
			else if(map_array[i][j] == 4)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,18,182);
				
			}
			else if(map_array[i][j] == 5)
			{
				map_array[i][j] = new Stairs(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 6)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 7)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 8)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 9)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,83,100,18);
				
			}
			else if(map_array[i][j] == 10)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,83,100,18);
				
			}
			else if(map_array[i][j] == 11)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,83,100,18);
				
			}
		}
	}
}

function convertMapArray_1(map_array,w,h,flr)
{
	for(let i = 0; i < w; i++)
	{
		for(let j = 0; j < h; j++)
		{
			if(map_array[i][j] == 0)
			{
				map_array[i][j] = new Floor(map_array[i][j],0,0,0,0);
			}
			if(map_array[i][j] == 1)
			{
				map_array[i][j] = new Floor(map_array[i][j],0,0,0,0);
			}
			else if(map_array[i][j] == 2)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,82,100,18);
			}
			else if(map_array[i][j] == 3)
			{
				map_array[i][j] = new Wall(map_array[i][j],82,0,18,182);
				
			}
			else if(map_array[i][j] == 4)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,18,182);
				
			}
			else if(map_array[i][j] == 5)
			{
				map_array[i][j] = new Stairs(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 6)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 7)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 8)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 9)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,83,100,18);
				
			}
			else if(map_array[i][j] == 10)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,83,100,18);
				
			}
			else if(map_array[i][j] == 11)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,83,100,18);
				
			}
		}
	}
}

function convertMapArray_2(map_array,w,h,flr)
{
	for(let i = 0; i < w; i++)
	{
		for(let j = 0; j < h; j++)
		{
			if(map_array[i][j] == 0)
			{
				map_array[i][j] = new Floor(map_array[i][j],0,0,0,0);
			}
			if(map_array[i][j] == 1)
			{
				map_array[i][j] = new Floor(map_array[i][j],0,0,0,0);
			}
			else if(map_array[i][j] == 2)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,82,100,18);
			}
			else if(map_array[i][j] == 3)
			{
				map_array[i][j] = new Wall(map_array[i][j],82,0,18,182);
				
			}
			else if(map_array[i][j] == 4)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,18,182);
				
			}
			else if(map_array[i][j] == 5)
			{
				map_array[i][j] = new Stairs(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 6)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 7)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 8)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 9)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,83,100,18);
				
			}
			else if(map_array[i][j] == 10)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,83,100,18);
				
			}
			else if(map_array[i][j] == 11)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,83,100,18);
				
			}
		}
	}
}

function convertMapArray_3(map_array,w,h,flr)
{
	for(let i = 0; i < w; i++)
	{
		for(let j = 0; j < h; j++)
		{
			if(map_array[i][j] == 0)
			{
				map_array[i][j] = new Floor(map_array[i][j],0,0,0,0);
			}
			if(map_array[i][j] == 1)
			{
				map_array[i][j] = new Floor(map_array[i][j],0,0,0,0);
			}
			else if(map_array[i][j] == 2)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,82,100,18);
			}
			else if(map_array[i][j] == 3)
			{
				map_array[i][j] = new Wall(map_array[i][j],82,0,18,182);
				
			}
			else if(map_array[i][j] == 4)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,18,182);
				
			}
			else if(map_array[i][j] == 5)
			{
				map_array[i][j] = new Stairs(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 6)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 7)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 8)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 9)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,83,100,18);
				
			}
			else if(map_array[i][j] == 10)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,83,100,18);
				
			}
			else if(map_array[i][j] == 11)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,83,100,18);
				
			}
		}
	}
}

function convertMapArray(map_array,w,h,flr)
{
	for(let i = 0; i < w; i++)
	{
		for(let j = 0; j < h; j++)
		{
			if(map_array[i][j] == 0)
			{
				map_array[i][j] = new PositionableTile(0,0,0,0,0,0);
			}
			if(map_array[i][j] == 22)
			{
				map_array[i][j] = new PositionableTile(17,0,0,100,100,0);
			}
			if(map_array[i][j] == 23)
			{
				map_array[i][j] = new PositionableTile(18,0,0,20,100,0);
			}
			if(map_array[i][j] == 24)
			{
				map_array[i][j] = new PositionableTile(19,0,0,0,0,0);
			}
			if(map_array[i][j] == 25)
			{
				map_array[i][j] = new PositionableTile(20,0,0,100,100,0);
			}
			if(map_array[i][j] == 26)
			{
				map_array[i][j] = new PositionableTile(21,0,0,0,0,0);
			}
			if(map_array[i][j] == 27)
			{
				map_array[i][j] = new PositionableTile(22,0,0,0,0,0);
			}
			if(map_array[i][j] == 28)
			{
				map_array[i][j] = new PositionableTile(23,0,0,0,0,0);
			}
			if(map_array[i][j] == 29)
			{
				map_array[i][j] = new PositionableTile(24,0,0,20,100,0);
			}
			if(map_array[i][j] == 30)
			{
				map_array[i][j] = new PositionableTile(25,0,50,100,20,-100);
			}
			if(map_array[i][j] == 31)
			{
				map_array[i][j] = new PositionableTile(26,0,0,0,0,0);
			}
			if(map_array[i][j] == 32)
			{
				map_array[i][j] = new PositionableTile(27,0,0,0,0,0);
			}
			if(map_array[i][j] == 33)
			{
				map_array[i][j] = new PositionableTile(28,0,0,20,100,0);
			}
			if(map_array[i][j] == 34)
			{
				map_array[i][j] = new PositionableTile(29,80,0,20,200,0);
			}
			if(map_array[i][j] == 35)
			{
				map_array[i][j] = new PositionableTile(30,0,0,20,200,0);
			}
			if(map_array[i][j] == 36)
			{
				map_array[i][j] = new PositionableTile(0,0,0,0,0,-100);
			}
			if(map_array[i][j] == 37)
			{
				map_array[i][j] = new PositionableTile(31,0,0,100,100,0);
			}
			if(map_array[i][j] == 38)
			{
				map_array[i][j] = new PositionableTile(32,0,0,100,50,0);
			}
			if(map_array[i][j] == 39)
			{
				map_array[i][j] = new PositionableTile(33,0,0,100,100,0);
			}
			if(map_array[i][j] == 17)
			{
				map_array[i][j] = new Wall(16,0,82,0,18);
			}
			if(map_array[i][j] == 14)
			{
				map_array[i][j] = new PositionableTile(14,0,0,0,-10,-20);
			}
			if(map_array[i][j] == 15)
			{
				map_array[i][j] = new PositionableTile(15,0,0,0,0,0);
			}
			if(map_array[i][j] == 16)
			{
				map_array[i][j] = new PositionableTile(15,0,0,0,0,-40);
			}
			if(map_array[i][j] == 316)
			{
				map_array[i][j] = new PositionableTile(15,0,0,0,0,-60);
			}
			if(map_array[i][j] == 416)
			{
				map_array[i][j] = new PositionableTile(15,0,-300,0,0,-80);
			}
			if(map_array[i][j] == 516)
			{
				map_array[i][j] = new PositionableTile(15,0,-400,0,0,-100);
			}
			if(map_array[i][j] == 616)
			{
				map_array[i][j] = new PositionableTile(15,0,-500,0,0,-120);
			}
			if(map_array[i][j] == 21)
			{
				map_array[i][j] = new Wall(2,0,82,100,18);
			}
			if(map_array[i][j] == 206)
			{
				map_array[i][j] = new PositionableTile(6,0,-10,0,-10,-20);
			}
			if(map_array[i][j] == 207)
			{
				map_array[i][j] = new PositionableTile(7,0,-10,0,-10,-20);
			}
			if(map_array[i][j] == 208)
			{
				map_array[i][j] = new PositionableTile(7,0,-100,0,-100,-40);
			}
			if(map_array[i][j] == 209)
			{
				map_array[i][j] = new PositionableTile(6,0,-100,0,-100,-40);
			}
			
			if(map_array[i][j] == 1)
			{
				map_array[i][j] = new Floor(map_array[i][j],0,0,0,0);
			}
			else if(map_array[i][j] == 2)
			{
				if(flr == 5)
				    map_array[i][j] = new PositionableTile(map_array[i][j],0,-10,0,-10,-20);
				else
					map_array[i][j] = new Wall(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 3)
			{
				map_array[i][j] = new Wall(map_array[i][j],82,0,18,182);
				
			}
			else if(map_array[i][j] == 4)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,18,182);
				
			}
			else if(map_array[i][j] == 5)
			{
				map_array[i][j] = new Stairs(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 6)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 7)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 8)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 9)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 10)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 11)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 12)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 13)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,100,100);
				
			}
		}
	}
}

/*function convertMapArray(map_array)
{
	for(let i = 0; i < 10; i++)
	{
		for(let j = 0; j < 10; j++)
		{
			if(map_array[i][j] == 1)
			{
				map_array[i][j] = new Floor(map_array[i][j],0,0,0,0);
			}
			else if(map_array[i][j] == 2 || map_array[i][j] == 12)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,82,100,18);
				
			}
			else if(map_array[i][j] == 3)
			{
				map_array[i][j] = new Wall(map_array[i][j],82,0,18,182);
				
			}
			else if(map_array[i][j] == 4)
			{
				map_array[i][j] = new Wall(map_array[i][j],0,0,18,182);
				
			}
			else if(map_array[i][j] == 8)
			{
				map_array[i][j] = new Door(map_array[i][j],0,80,100,20);
				
			}
			
			
			else if(map_array[i][j] == 9)
			{
				map_array[i][j] = new Table(map_array[i][j],1,72,98,28);
				
			}
			else if(map_array[i][j] == 10)
			{
				map_array[i][j] = new Chair(map_array[i][j],41,0,28,14,-86);
				
			}
			else if(map_array[i][j] == 11 || map_array[i][j] == 19 )
			{
				map_array[i][j] = new Stairs(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 13 || map_array[i][j] == 14)
			{
				map_array[i][j] = new Cupboard(map_array[i][j],3,0,94,17,-83);
				
			}
			else if(map_array[i][j] == 18)
			{
				map_array[i][j] = new Plant(map_array[i][j],43,0,21,12,-55);
				
			}
			else if(map_array[i][j] == 16 || map_array[i][j] == 17)
			{
				map_array[i][j] = new Elevator(map_array[i][j],0,0,100,100);
				
			}
			else if(map_array[i][j] == 21)
			{
				map_array[i][j] = new VendingMachine(map_array[i][j],19,0,64,28,-72);
				
			}
			else if(map_array[i][j] == 25 || map_array[i][j] == 26 || map_array[i][j] == 27 || map_array[i][j] == 28)
			{
				map_array[i][j] = new ThinWall(map_array[i][j],0,90,100,10);
				
			}
			else if(map_array[i][j] == 30)
			{
				map_array[i][j] = new ThinWall(map_array[i][j],90,0,10,100);
				
			}
			else if(map_array[i][j] == 31)
			{
				map_array[i][j] = new ThinDoor(map_array[i][j],0,90,100,10);
				
			}
			else if(map_array[i][j] == 32)
			{
				map_array[i][j] = new Printer(map_array[i][j],9,0,78,20,-80);
				
			}
			else if(map_array[i][j] == 33)
			{
				map_array[i][j] = new Lamp(map_array[i][j],41,0,19,10,-90);
				
			}
			else if(map_array[i][j] == 37)
			{
				map_array[i][j] = new Toilet(map_array[i][j],37,0,29,20,-80);
				
			}
			else if(map_array[i][j] == "a")
			{
				map_array[i][j] = new ThinWallLong(30,90,0,10,200);
			}
			else if(map_array[i][j] == "b")
			{
				map_array[i][j] = new ThinWallLong(30,90,90,10,10);
				
			}
			else
				map_array[i][j] = new Tile(map_array[i][j],0,0,100,100);
		}
	}
	
}*/

function setStartingPoint()
{
	dwight.x = 100;
	dwight.y = 100;
	Zombie.s_setZombiePosition();
	map.current_floor = 3;
	map.cleaning_platform_pos = 1;
	map.generatorOn = false;
}

let end = 0;

function draw() {
  
  switch (gameState) {
	  
	  case MENU:
	  
	  end = 0;
	  Menu.s_draw();
	  Menu.s_select_option();
	  //Menu.s_drawHowToPlay();
	  setStartingPoint();
	  camera.lookAtObj(dwight);
	  camera.update();
	  dwight.alive = true;
	  break;
	  
	  case HOW_TO_PLAY:
	  background(255);
	  Menu.s_drawHowToPlay();
	  Menu.s_return();
	  
	  break;
	  
	  case DIALOG_BOX:
	  DialogBox.drawDialogBox()
	  DialogBox.selectOption()
	  break;
	  
	  case GENERATOR_DIALOG:
	  DialogBox.drawDialogBoxGenerator()
	  DialogBox.selectOptionGenerator()
	  break;
	  
	  case ELEVATOR_DIALOG:
	  DialogBox.drawDialogBoxElevator()
	  DialogBox.selectOptionElevator()
	  break;
	  
	  case PLAY:
	  dwight.move();
	  if(gameState == LVL_TRANSITION)
		  break;
	  for(let i = 0; i < 2; i++)
	  {
		  enemies[i].update();
	  }
	  map.drawZ();
	  camera.update();
	  if(end == 1)
		  gameState = END;
	  Menu.s_return();
	  break;
	  
	  case LVL_TRANSITION:
	  drawlvltrans();
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
	  Menu.s_return();
	  break;
	  
	  case END:
	  Menu.s_drawEnd();
	  Menu.s_return();
	  break;
	  
	  default:
	  break;
  }

}

let lvltransframe = 0;

function drawlvltrans()
{
	let now = new Date().getTime();
	let delta = now - last;
	if (delta >= 33) {
		last = now;
		squareColor = color(47, 47, 47);
		squareColor.setAlpha(128);
		fill(squareColor);
		rect(0,0,windowWidth,windowHeight)
		lvltransframe++;
		if(lvltransframe == 10)
		{
			lvltransframe = 0;
			gameState = PLAY;
			noTint();
		}
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/*function mousePressed() {
  
  if(gameState == MENU)
	  gameState = PLAY;
  if(gameState == GAME_OVER)
	  gameState = MENU;
  if(gameState == END)
	  gameState = MENU;
}*/



