let fr = 30;
let dwight;
let axe;
let revolver;

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
const EDITOR = 9;

let font;
let fontSize = 40;

let gameState = MENU;

let map_size_width = 10;
let map_size_height = 10;

let camera;
let map;
let dwight_dead;

let map_array2 = [];
let map_array_0;
let map_array_1;
let map_array_2;
let map_array_3;
let map_array_4;
let map_array_5;

let assets_array = [];

let colX, colY, colW, colH = 0;
let hitDX, hitDY, hitDW, hitDH = 0;

let z_index_map = [[],[],[],[],[],[]];
let img_array = [];

let last = new Date().getTime();
let start = new Date().getTime();

let game_scale = 1.0;
let time;

let end = 0;

let sel;
let input;
let inp = [];
let but = [];
let cnv;
let button;
let button1;
let label;

let button2 = [];
let inp2 = [];

let sel2;

let tilePropSel;
let checkbox;
let showOption = true;

let lvltransframe = 0;

let mySound;

class cpl {
	 constructor (w, h) {
		 this.w = w;
		 this.h = h;
	 }
}

const floor_size = [new cpl(10,10),new cpl(10,10),new cpl(10,10),new cpl(10,10),new cpl(10,10),new cpl(9,17)]

function preload() {
  data_0 = loadImage('assets/img/data_0.png');
  data_1 = loadImage('assets/img/data_1.png');
  data_2 = loadImage('assets/img/data_2.png');
  data_3 = loadImage('assets/img/data_3.png');
  bullet_img = loadImage('assets/img/bullet.png');
  cleaning_platform = loadImage('assets/img/cleaning_platform.png');
  cleaning_platform_up = loadImage('assets/img/cleaning_platform_up.png');
  wc_floor = loadImage('assets/img/wc_floor.png');
  dwight = new Dwight(500,200,36,70,loadImage('assets/img/dwight.png'),1);
  axe = new Axe(500,200,20,42,loadImage('assets/img/axe.png'));
  revolver = new Revolver(500,200,20,13,loadImage('assets/img/revolver.png'));
  font = loadFont('assets/font/joystix.ttf');
  dwight_dead = loadImage('assets/img/dwight_dead.png');
  basement_boss = loadImage('assets/img/basement_boss.png')
  boss_dead = loadImage('assets/img/basement_boss_dead.png');
  ceo_boss = loadImage('assets/img/the_ceo.png');
  creed_boss = loadImage('assets/img/creed.png');
  zombie = loadImage('assets/img/zombie.png');
  dwight_img = loadImage('assets/img/dwight.png');
  vomit_puddle_img = loadImage('assets/img/vomit_puddle.png');
  blink_image = loadImage('assets/img/blink_image.png');
  blood = loadImage('assets/img/blood.png');
  bleed_anim = loadImage('assets/anim/anim_bleeding.png');
  creed_zombie = loadImage('assets/img/zombie_creed.png');
  creed_dead = loadImage('assets/img/creed_dead.png');
  impact = loadImage('assets/anim/impact.png');
  explosion_animation =  loadImage('assets/anim/explosion_animation.png');
  explosion_trace =  loadImage('assets/img/explosion_trace.png');
  hank = loadImage('assets/img/hank.png');
  hank_dead = loadImage('assets/img/hank_dead.png');

  File.load();
  File.loadAssets();
}



function setup() {
	
  cnv = createCanvas(windowWidth, windowHeight);
  frameRate(fr);
  
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  
  camera = new Camera(0, 0,800,600);
 
  map = new Map(2,0, map_array2,img_array,z_index_map);
  
  loadFloors();
  
  message = new Message(0,0,"");
  
  editor = new Editor();

}

function setStartingPoint()
{
	dwight.x = 800;
	dwight.y = 200;
	map.current_floor = 1;
	map.cleaning_platform_pos = 1;
	map.generatorOn = true;
	start = new Date().getTime();
	game_scale = 1;
	map.setZombies();
	dwight.revive();
	map.floors[0].boss.revive();
	map.floors[1].boss.revive();
	map.floors[4].boss.revive();
	map.floors[5].boss.revive();
	dwight.init();
}

function draw() {
  
  switch (gameState) {
	  
	  case EDITOR:
	  map.draw();
	  draw_assets_list();
	  select_element();
	  camera.move();
	  Menu.s_return();
	  break;
	  
	  case MENU:
	  end = 0;
	  Menu.s_draw();
	  Menu.s_select_option();
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
	  for(let i = 0; i < map.floors[map.current_floor].enemyNumber; i++)
	  {
		  map.floors[map.current_floor].enemies[i].update();
	  }
	  if(map.current_floor == 0  || map.current_floor == 1 || map.current_floor == 4 || map.current_floor == 5)
		map.floors[map.current_floor].boss.update();
	  map.draw();
	  if(end == 1)
		  gameState = END;
	  if(gameState!=END)
		  camera.update();
	  Menu.s_return();
	  break;
	  
	  case LVL_TRANSITION:
	  drawlvltrans();
	  break;
	  
	  case GAME_OVER: 
	  map.draw();
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