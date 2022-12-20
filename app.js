let tile;
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

let enemies = [];
let map_array = [];
let map_array2 = [];
let map_array_0;
let map_array_1;
let map_array_2;
let map_array_3;
let map_array_4;
let map_array_5;
let map_floor = [];

let assets_array;

let colX, colY, colW, colH = 0;
let hitDX, hitDY, hitDW, hitDH = 0;

let z_index_map = [[],[],[],[],[],[]];
let img_array = [];

let last = new Date().getTime();
let start = new Date().getTime();

let game_scale = 1.0;
let time;

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
  zombie = loadImage('assets/img/zombie.png');
  dwight_img = loadImage('assets/img/dwight.png');
  enemies.push(new Zombie(300,200,36,70,loadImage('assets/img/zombie.png'),2));
  enemies.push(new Zombie(500,500,36,70,loadImage('assets/img/zombie.png'),3));
  enemies.push(new Zombie(500,500,36,70,loadImage('assets/img/zombie.png'),4));
  vomit_puddle_img = loadImage('assets/img/vomit_puddle.png');
  File.load();
  File.loadAssets();
}

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

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  frameRate(fr);
  
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  
  camera = new Camera(0, 0,800,600);
  camera.lookAt(400,300);
 
  img_array.push(data_0)
  img_array.push(data_1)
  img_array.push(data_2)
  img_array.push(data_3)
  
  map_array2.push(map_array_0);
  map_array2.push(map_array_1);
  map_array2.push(map_array_2);
  map_array2.push(map_array_3);
  map_array2.push(map_array_4);
  map_array2.push(map_array_5);
  
  map = new Map(2,0, map_array2,img_array,z_index_map);
  
  
  map.floors[0] = new Floor(0,3,new Boss(500,500,40,80,loadImage('assets/img/basement_boss.png'),6));
  map.floors[0].enemies.push(new Zombie(500,500,36,70,loadImage('assets/img/zombie.png'),100,400,500));
  map.floors[0].enemies.push(new Zombie(500,600,36,70,loadImage('assets/img/zombie.png'),101,300,600));
  map.floors[0].enemies.push(new Zombie(500,700,36,70,loadImage('assets/img/zombie.png'),102,500,700));
  map.floors[1] = new Floor(1,1);
  map.floors[1].enemies.push(new Zombie(500,500,36,70,loadImage('assets/img/zombie.png'),100,500,500));
  map.floors[2] = new Floor(2,1);
  map.floors[2].enemies.push(new Zombie(500,500,36,70,loadImage('assets/img/zombie.png'),100,500,500));
  map.floors[3] = new Floor(3,1);
  map.floors[3].enemies.push(new Zombie(500,500,36,70,loadImage('assets/img/zombie.png'),100,500,500));
  map.floors[4] = new Floor(4,1);
  map.floors[4].enemies.push(new Zombie(500,500,36,70,loadImage('assets/img/zombie.png'),100,500,500));
  map.floors[5] = new Floor(5,2);
  map.floors[5].enemies.push(new Zombie(500,500,36,70,loadImage('assets/img/zombie.png'),100,500,500));
  map.floors[5].enemies.push(new Zombie(500,600,36,70,loadImage('assets/img/zombie.png'),101,500,600));
  
  //console.log("map.floors[map.current_floor] ", map.floors[map.current_floor]);
  
  for(let i = 0; i < 6;i++)
  {
		if(i == 5)
		 map.sort(i,17,10);
		else
		 map.sort(i,10,10);
  }
 
  button = createButton('save');
  button.position(cnv.elt.getBoundingClientRect().x+45, cnv.elt.getBoundingClientRect().y+button.height/2);
  button.mousePressed(saveFile);
  button1 = createButton('new');
  button1.position(cnv.elt.getBoundingClientRect().x, cnv.elt.getBoundingClientRect().y+button1.height/2);
  button1.mousePressed(loadFile);
  input = createFileInput(handleFile);
  input.elt.hidden = true;
  input.elt.id = "load";
  input.elt.accept = ".json";
  
  input.position(cnv.elt.getBoundingClientRect().x+90, cnv.elt.getBoundingClientRect().y+button1.height/2);
  
  label = createElement('label', 'load');
  label.elt.setAttribute("for", "load");
  label.position(cnv.elt.getBoundingClientRect().x+95, cnv.elt.getBoundingClientRect().y+button1.height/2);
  label.elt.id = "button"
  
  sel = createSelect();
  sel.position(cnv.elt.getBoundingClientRect().x + 150, cnv.elt.getBoundingClientRect().y+button.height/2);
  sel.option('basement',0);
  sel.option('ground floor',1);
  sel.option('1st floor',2);
  sel.option('2nd floor',3);
  sel.option('3rd floor',4);
  sel.option('roof',5);
  sel.selected('basement');
  sel.changed(mySelectEvent);
  
  sel2 = createSelect();
  sel2.position(cnv.elt.getBoundingClientRect().x + 250, cnv.elt.getBoundingClientRect().y+button.height/2);
  sel2.option('decalY',0);
  sel2.option('hitboxX',1);
  sel2.option('hitboxY',2);
  sel2.option('hitboxW',3);
  sel2.option('hitboxH',4);
  sel2.selected('decalY');
  sel2.changed(mySelectEvent2);
  
  checkbox = createCheckbox('show tile options', true);
  checkbox.changed(myCheckedEvent);
  checkbox.position(cnv.elt.getBoundingClientRect().x + 350, cnv.elt.getBoundingClientRect().y+button.height/2);
  
  let k = 0;
  for(let i = 0; i < 10;i++)
  {
	  for(let j = 0; j < 10;j++)
	  {
		  
		  inp2[k] = createInput('');
		  inp2[k].position(0, +20);
		  inp2[k].size(50);
		  inp2[k].input(updateTile2);
		  inp2[k].elt.value = 0;
		  inp2[k].hide();
		  button2[k] = createButton('+');
		  button2[k].position(cnv.elt.getBoundingClientRect().x, cnv.elt.getBoundingClientRect().y);
		  button2[k].mousePressed(updateTile);
		  button2[k].hide();
		  k++;
	  }
  }
  
  
  message = new Message(0,0,"");
  
  editor = new Editor();
  
  //dwight.equipWeapon(revolver);
  dwight.equipWeapon(axe);
  
  sel.elt.addEventListener("click", function(event){
  event.preventDefault()
});

sel2.elt.addEventListener("click", function(event){
  event.preventDefault()
});

  Zombie.s_setState(STATE.ROAMING)
  showEditorButtons(false)

}

function myCheckedEvent() {
  if (checkbox.checked()) {
    showOption = true;
  } else {
    showOption = false;
	map.hide_option_buttons();
  }
}

function updateTile()
{
	let i = floor((this.x - camera.offSetX - cnv.elt.getBoundingClientRect().x)/100)
	let j = floor((this.y - camera.offSetY - cnv.elt.getBoundingClientRect().y)/100)
	
	if(tilePropSel == 0)
	{
		let decal = prompt("decalY", map.map_array[map.current_floor][j][i].decalY);
		map.map_array[map.current_floor][j][i].decalY =  parseInt(decal);
		console.log("game id = ", map.map_array[map.current_floor][j][i].game_id);
	}
	else if(tilePropSel == 1)
	{
		let decal = prompt("hitboxX", map.map_array[map.current_floor][j][i].hitboxX);
		map.map_array[map.current_floor][j][i].hitboxX = parseInt(decal);
	}
	else if(tilePropSel == 2)
	{
		let decal = prompt("hitboxY", map.map_array[map.current_floor][j][i].hitboxY);
		map.map_array[map.current_floor][j][i].hitboxY = parseInt(decal);
	}
	else if(tilePropSel == 3)
	{
		let decal = prompt("hitboxW", map.map_array[map.current_floor][j][i].hitboxW);
		map.map_array[map.current_floor][j][i].hitboxW =  parseInt(decal);
	}
	else if(tilePropSel == 4)
	{
		let decal = prompt("hitboxH", map.map_array[map.current_floor][j][i].hitboxH);
		map.map_array[map.current_floor][j][i].hitboxH =  parseInt(decal);
	}
}

function updateTile2()
{
	
	let i = floor((this.x - camera.offSetX - cnv.elt.getBoundingClientRect().x)/100)
	let j = floor((this.y - camera.offSetY - cnv.elt.getBoundingClientRect().y)/100)
	
	map.map_array[map.current_floor][j][i].decalY = this.value();
}

function showEditorButtons(showed)
{
	if(showed)
	{
		button.show();
		button1.show();
		label.show();
		sel.show();
		sel2.show();
		checkbox.show();
		showOption = true;
	}
	else
	{
		button.hide();
		button1.hide();
		label.hide();
		sel.hide();
		sel2.hide();
		checkbox.hide();
		showOption = false;
		map.hide_option_buttons();
	}
}

function getUniqueId(i,j)
{
	return Math.pow(2,j)*Math.pow(3,i);
}

function mySelectEvent() {
	map.current_floor = sel.value();
}

function mySelectEvent2() {
	tilePropSel = sel2.value();
}

function saveFile()
{
	File.save(map.map_array[map.current_floor]);
}

function loadFile()
{
	File.load();
	map.map_array[0] = map_array_0;
	map.map_array[1] = map_array_1;
	map.map_array[2] = map_array_2;
	map.map_array[3] = map_array_3;
	map.map_array[4] = map_array_4;
	map.map_array[5] = map_array_5;
}

function handleFile(file)
{
	
	map.map_array[map.current_floor] = file.data
	input.elt.value = "";
}

function setStartingPoint()
{
	dwight.x = 100;
	dwight.y = 200;
	//Zombie.s_setZombiePosition();
	map.current_floor = 0;
	map.cleaning_platform_pos = 1;
	map.generatorOn = false;
	start = new Date().getTime();
	game_scale = 1;
	map.floors[map.current_floor].setZombiesPosition();
	dwight.revive();
	map.floors[0].boss.revive();
	//camera.lookAtObj(dwight);
	//camera.update();
	
	dwight.init();
}

let end = 0;

function draw() {
  
  switch (gameState) {
	  
	  
	  case EDITOR:
	  map.draw();
	  map.draw_assets_list();
	  map.select_element();
	  camera.move();
	  Menu.s_return();
	  break;
	  
	  case MENU:
	  
	  end = 0;
	  Menu.s_draw();
	  Menu.s_select_option();
	  //setStartingPoint();
	  /*camera.lookAtObj(dwight);
	  camera.update();
	  dwight.alive = true;*/
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
	  if(map.current_floor == 0)
		map.floors[map.current_floor].boss.update();
	  //map.floors[map.current_floor].enemies[0].update();
	  //map.floors[map.current_floor].enemies[1].update();
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
	  
	  /*for(let i = 0; i < 2; i++)
	  {
		enemies[i].update();
	  }*/
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

function mouseWheel(event) {
  if(event.deltaY  >  0)
  {
	   if(editor.decalX!=-7000)
	      editor.decalX-=100;
  }
  else
  {
	  if(editor.decalX!=0)
		  editor.decalX+=100;
  }
}


