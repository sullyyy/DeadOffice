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
const INGAME_MENU = 10;
const CAKE_DIALOG = 11;
const CONVERSATION = 12;
const START_SCRIPT = 13;
const CLEANING_PLATFORM_SCRIPT = 14;
const NOTE_DIALOG = 15;
const NOTE_READING = 16;
const CEO_CONVERSATION = 17;
const CREED_CONVERSATION = 18;

let textId = 0;
let g_noteTexts = ["Im sorry... \nI never wanted this to happen...\nPlease forgive me...","text2"]

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

let gun_fire_animation;
let dwight_animation;
let dwight_side;
let dwight_side_animation;
let zombie_animation;

let shotgun_sound;
let dwight_hit_sound;
let explosion_sound;
let reload_sound;
let revolver_shot_sound;
let zombie_hit_sound;
let zombie_death_sound;
let bullet_impact_sound;
let axe_swing_sound;
let spit_sound;
let vomit_sound;
let music_sound;
let gun_click_sound;
let blink_sound;
let dark_piano_sound;
let elevator_sound;
let door_sound;
let boss_death_sound;
let closet_open_sound;
let generator_sound;
let indoor_open_sound;
let indoor_close_sound;
let cleaning_platform_sound;

let global_volume = 0.3;

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
  data_4 = loadImage('assets/img/data_4.png');
  bullet_img = loadImage('assets/img/bullet.png');
  cleaning_platform = loadImage('assets/img/cleaning_platform.png');
  cleaning_platform_up = loadImage('assets/img/cleaning_platform_up.png');
  wc_floor = loadImage('assets/img/wc_floor.png');
  dwight_animation = loadImage('assets/anim/dwight_animation_1.png');
  dwight = new Dwight(500,200,36,70,loadImage('assets/img/dwight.png'),1);
  axe = new Axe(500,200,20,42,loadImage('assets/img/axe.png'));
  revolver = new Revolver(470,810,20,13,loadImage('assets/img/revolver.png'));
  empty_weapon = new Weapon(0,0,0,0,loadImage('assets/img/empty_weapon.png'));
  font = loadFont('assets/font/joystix.ttf');
  dwight_dead = loadImage('assets/img/dwight_dead.png');
  basement_boss = loadImage('assets/img/basement_boss.png')
  boss_dead = loadImage('assets/img/basement_boss_dead.png');
	heart = loadImage('assets/img/heart.png');
  dwight_side = loadImage('assets/img/dwight_side.png');
  dead_pnj = loadImage('assets/img/dead_pnj.png');
  notes_png = loadImage('assets/img/notes.png');
  sniper_img = loadImage('assets/img/sniper_ground.png');
	
  ceo_boss = loadImage('assets/img/the_ceo.png');
  ceo_boss_dead = loadImage('assets/img/the_ceo_dead.png');
  shotgun = loadImage('assets/img/shotgun_ground.png');
	
  //sounds
  shotgun_sound = loadSound('assets/sound/shotgun_sound.wav');
  dwight_hit_sound = loadSound('assets/sound/dwight_hit.wav');
  dwight_hit_sound.setVolume(0.1);
  explosion_sound = loadSound('assets/sound/explosion.wav');
  reload_sound = loadSound('assets/sound/reload.wav');
  revolver_shot_sound = loadSound('assets/sound/revolver_shot.wav');
  zombie_hit_sound = loadSound('assets/sound/zombie_hit.wav');
  zombie_death_sound = loadSound('assets/sound/zombie_death.mp3');
  bullet_impact_sound = loadSound('assets/sound/bullet_impact.wav');
  bullet_impact_sound.setVolume(0.1);
  axe_swing_sound = loadSound('assets/sound/axe_swing.mp3');
  spit_sound = loadSound('assets/sound/spit.wav');
  vomit_sound = loadSound('assets/sound/vomit.wav');
  music_sound = loadSound('assets/sound/music.mp3');
  music_sound.setVolume(0.1)
  gun_click_sound = loadSound('assets/sound/gun_click.wav');
  blink_sound = loadSound('assets/sound/blink.wav');
  dark_piano_sound = loadSound('assets/sound/dark_piano.mp3');
  elevator_sound = loadSound('assets/sound/elevator.wav');
  door_sound = loadSound('assets/sound/door_open.wav');
  boss_death_sound = loadSound('assets/sound/boss_death.wav');
  closet_open_sound = loadSound('assets/sound/closet_open.wav');
  generator_sound = loadSound('assets/sound/generator.wav');
  indoor_open_sound = loadSound('assets/sound/indoor_open_sound.wav');
  indoor_close_sound = loadSound('assets/sound/indoor_close_sound.wav');
  cleaning_platform_sound = loadSound('assets/sound/cleaning_platform_sound.mp3');
  
	
  creed_boss = loadImage('assets/img/creed.png');
  zombie = loadImage('assets/img/zombie.png');
  dwight_img = loadImage('assets/img/dwight.png');
  vomit_puddle_img = loadImage('assets/img/vomit_puddle.png');
  blink_image = loadImage('assets/img/blink_image.png');
  blood = loadImage('assets/img/blood.png');
  bleed_anim = loadImage('assets/anim/anim_bleeding.png');
  creed_zombie = loadImage('assets/img/zombie_creed.png');
  creed_dead = loadImage('assets/img/creed_dead.png');
	
  //animation
  gun_fire_animation = loadImage('assets/anim/gun_fire_animation.png');
  impact = loadImage('assets/anim/impact.png');
  explosion_animation =  loadImage('assets/anim/explosion_animation.png');
  explosion_trace =  loadImage('assets/img/explosion_trace.png');
  dwight_side_animation = loadImage('assets/anim/dwight_side_animation_2.png');
  zombie_animation = loadImage('assets/anim/zombie_animation.png');
  jim_animation = loadImage('assets/anim/jim_animation.png');
  creed_animation = loadImage('assets/anim/creed_animation.png');
  
	
  hank = loadImage('assets/img/hank.png');
  hank_dead = loadImage('assets/img/hank_dead.png');
	
  

  File.load();
  File.loadAssets();
}



function setup() {
	
  cnv = createCanvas(windowWidth, windowHeight);
  let ctx = cnv.canvas.getContext('2d', {willReadFrequently: true});
	
  outputVolume(0.5);
	
  frameRate(fr);
  
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  
  camera = new Camera(0, 0,800,600);
 
  map = new Map(2,0, map_array2,img_array,z_index_map);
  
  loadFloors();
  
  message = new Message(0,0,"");
  
  editor = new Editor();
	
	amp = new p5.Amplitude();
	
	closetAnimation = new ClosetAnimation();
	
	grilledWallOpening = new GrilledWallOpening();
	
	//console.log("dqi ", dwight_animation);

}

function setStartingPoint()
{
	dwight.x = 300;
	dwight.y = 200;
	map.current_floor = 3;
	map.cleaning_platform_pos = 1;
	map.generatorOn = false;
	start = new Date().getTime();
	game_scale = 1;
	map.setZombies();
	dwight.revive();
	map.floors[0].boss.revive();
	map.floors[1].boss.revive();
	map.floors[4].boss.revive();
	map.floors[5].boss.revive();
	dwight.init();
	map.floors[3].pnjs[0].state = STATE.IDLE;
	map.floors[3].enemies[0].zombieState = STATE.IDLE;
	map.floors[3].enemies[0].show = false;
	map.floors[3].enemies[0].chaseTarget = map.floors[map.current_floor].pnjs[0];
	
	
	map.floors[3].enemies[1].activeArea = new Area(600,600,900,900)
	
	if(!music_sound.isPlaying())
		music_sound.loop();
	
	dark_piano_sound.stop();
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
		  
	  case INGAME_MENU:
		  Menu.s_draw_ingame_menu();
		  Menu.s_select_option_ingame_menu();
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
		  
	  case CAKE_DIALOG:
	  DialogBox.drawDialogBoxCake()
	  DialogBox.selectOptionCake()
	  break;
	  
	  case ELEVATOR_DIALOG:
	  DialogBox.drawDialogBoxElevator()
	  DialogBox.selectOptionElevator()
	  break;
		  
	  case CONVERSATION:
	  map.draw();
	  map.draw_conv_screen();
	  map.floors[map.current_floor].updateScript();
	  Menu.s_return();
	  break;
		  
	  case CREED_CONVERSATION:
	  map.draw();
	  map.draw_conv_screen();
	  map.floors[map.current_floor].boss.updateScript();
	  Menu.s_return();
	  break;
		  
		  
	  case CEO_CONVERSATION:
	  map.draw();
	  map.draw_conv_screen();
	  map.floors[map.current_floor].boss.updateScript();
	  Menu.s_return();
	  break;
		  
	  case START_SCRIPT:
	  map.draw();
	  map.draw_conv_screen();
	  map.floors[map.current_floor].updateScript1();
	  Menu.s_return();
	  break;
		  
	  case CLEANING_PLATFORM_SCRIPT:
	  map.cleaning_platform.updateScript();
	  for(let i = 0; i < map.floors[map.current_floor].enemyNumber; i++)
	  {
		  map.floors[map.current_floor].enemies[i].update();
	  }
	  map.draw();
	  map.draw_conv_screen();
	  Menu.s_return();
	  camera.update();
	  break;
		  
	  case NOTE_DIALOG:
		 DialogBox.s_drawNoteDialog();
		  DialogBox.s_selectOptionNote();
		  Menu.s_return();
		  break;
	  case NOTE_READING:
		  DialogBox.s_drawNote();
		  Menu.s_return();
		  break;
		  
	  case PLAY:
	  dwight.move();
	  
	  if(gameState == LVL_TRANSITION)
		  break;
	  for(let i = 0; i < map.floors[map.current_floor].enemyNumber; i++)
	  {
		  map.floors[map.current_floor].enemies[i].update();
	  }
	  for(let i = 0; i < map.floors[map.current_floor].pnjs.length; i++)
		  map.floors[map.current_floor].pnjs[i].update();
	  if(map.current_floor == 0  || map.current_floor == 1 || map.current_floor == 4 || map.current_floor == 5)
		map.floors[map.current_floor].boss.update();
	  map.draw();
	  if(end == 1)
	  {
		  gameState = END;
	  }
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