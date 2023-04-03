const floorAliases = ["Basement","Ground floor","1st floor","2nd floor", "3rd floor", "roof"]

class Message {
	constructor (x,y,message,display) {
		this.x = x;
		this.y = y;
		this.message = message;
		this.display = display;
	}
	
	set(x,y,message,display)
	{
		this.x = x;
		this.y = y;
		this.message = message;
		this.display = display;
	}
	
	displayed(bool)
	{
		this.display = bool;
	}
	
	draw()
	{
		if(!this.display)
			return
		fill(255,255,255);
		rect(windowWidth/2 - (windowWidth/2)/2, windowHeight/4 - (windowHeight/4)/2, 400, 200);
		textSize(12);
		fill(0,0,0);
		text(this.message,windowWidth/2,windowHeight/4)
	}
}

let selected = 0;

class DialogBox {
	constructor () {
		
	}
	
	static drawDialogBox()
	{
		fill(255,255,255);
		rect(windowWidth/2 - (windowWidth/2)/2, windowHeight/4 - (windowHeight/4)/2, 400, 200);
		textSize(15);
		fill(0,0,0);
		if(map.current_floor == 5)
			selected = 1;
		if(selected == 0)
		{
			if(map.current_floor != 5)
				text('->', 230, windowHeight/4+20);
			
			if(map.current_floor == 0)
			{
				text(floorAliases[map.current_floor + 1] + ' door locked', windowWidth/2, windowHeight/4 + 20);
			}
			if(map.current_floor == 1)
			{
				text(floorAliases[map.current_floor + 1] + ' door locked', windowWidth/2, windowHeight/4 + 20);
				text(floorAliases[map.current_floor - 1] + ' door locked', windowWidth/2, windowHeight/4 + 45);
			}
			if(map.current_floor == 2)
			{
				text('travel to ' + floorAliases[map.current_floor + 1], windowWidth/2, windowHeight/4 + 20);
				text(floorAliases[map.current_floor - 1] + ' door locked', windowWidth/2, windowHeight/4 + 45);
			}
			if(map.current_floor == 3)
			{
				text(floorAliases[map.current_floor + 1] + ' door locked', windowWidth/2, windowHeight/4 + 20);
				text('travel to ' + floorAliases[map.current_floor - 1], windowWidth/2, windowHeight/4 + 45);
			}
			if(map.current_floor == 4)
			{
				if(map.floors[map.current_floor].boss.state == STATE.DEAD)
					text('travel to ' + floorAliases[map.current_floor + 1], windowWidth/2, windowHeight/4 + 20);
				else
					text(floorAliases[map.current_floor + 1] + ' door locked', windowWidth/2, windowHeight/4 + 20);
				
				text(floorAliases[map.current_floor - 1] + ' door locked', windowWidth/2, windowHeight/4 + 45);
			}
			if(map.current_floor == 5)
			{
				text('travel to ' + floorAliases[map.current_floor - 1], windowWidth/2, windowHeight/4 + 45);
			}
			
		}
		else
		{
			if(map.current_floor != 0)
				text('->', 230, windowHeight/4 + 45);
			
			if(map.current_floor == 0)
			{
				text(floorAliases[map.current_floor + 1] + ' door locked', windowWidth/2, windowHeight/4 + 20);
			}
			if(map.current_floor == 1)
			{
				text(floorAliases[map.current_floor + 1] + ' door locked', windowWidth/2, windowHeight/4 + 20);
				text(floorAliases[map.current_floor - 1] + ' door locked', windowWidth/2, windowHeight/4 + 45);
			}
			if(map.current_floor == 2)
			{
				text('travel to ' + floorAliases[map.current_floor + 1], windowWidth/2, windowHeight/4 + 20);
				text(floorAliases[map.current_floor - 1] + ' door locked', windowWidth/2, windowHeight/4 + 45);
			}
			if(map.current_floor == 3)
			{
				text(floorAliases[map.current_floor + 1] + ' door locked', windowWidth/2, windowHeight/4 + 20);
				text('travel to ' + floorAliases[map.current_floor - 1], windowWidth/2, windowHeight/4 + 45);
			}
			if(map.current_floor == 4)
			{
				if(map.floors[map.current_floor].boss.state == STATE.DEAD)
					text('travel to ' + floorAliases[map.current_floor + 1], windowWidth/2, windowHeight/4 + 20);
				else
					text(floorAliases[map.current_floor + 1] + ' door locked', windowWidth/2, windowHeight/4 + 20);
				text(floorAliases[map.current_floor - 1] + ' door locked', windowWidth/2, windowHeight/4 + 45);
			}
			if(map.current_floor == 5)
			{
				text('travel to ' + floorAliases[map.current_floor - 1], windowWidth/2, windowHeight/4 + 45);
			}
		}
	}
	
	static selectOption()
	{
		if(keys[ESCAPE])
		{
			gameState = PLAY;
			keys[ESCAPE] = 0;	
		}
		if(keys[UP_ARROW] && selected != 0 && map.current_floor != 5)
		{
			selected = 0;
		}
		if(keys[DOWN_ARROW] && selected != 1 && map.current_floor != 0)
		{
			selected = 1;
		}
		if(keys[32] && selected == 0)
		{
			if(map.current_floor == 4 && map.floors[map.current_floor].boss.state != STATE.DEAD)
				return;
			
			if(map.current_floor != 5 && map.current_floor != 0 && map.current_floor != 1 && map.current_floor != 3)
			{
				
				map.travelTo(map.current_floor+1,8,2)
				door_sound.play();
			}
		}
		if(keys[32] && selected == 1)
		{
			if(map.current_floor != 0 && map.current_floor != 1 && map.current_floor != 2 && map.current_floor != 4)
			{
				map.travelTo(map.current_floor-1,8,2)
				door_sound.play();
			}
		}
		
	}
	
	static drawDialogBoxCake()
	{
		fill(255,255,255);
		rect(windowWidth/2 - (windowWidth/2)/2, windowHeight/4 - (windowHeight/4)/2, 400, 200);
		textSize(15);
		fill(0,0,0);
		if(selected == 0)
		{
			
				text('->', 250, windowHeight/4+45);
			
				text('EAT CAKE ?', windowWidth/2, windowHeight/4 + 20);
			
				text('YES', windowWidth/2, windowHeight/4 + 45);
			
				text('NO', windowWidth/2, windowHeight/4 + 65);
		}
		else
		{
			
				text('->', 250, windowHeight/4 + 65);
			
				text('EAT CAKE ?', windowWidth/2, windowHeight/4 + 20);
			
				text('YES', windowWidth/2, windowHeight/4 + 45);
			
				text('NO', windowWidth/2, windowHeight/4 + 65);
		}
	}
	
	static selectOptionCake()
	{
		if(keys[UP_ARROW] && selected != 0)
		{
			selected = 0;
			keys[UP_ARROW] = 0;
		}
		if(keys[DOWN_ARROW] && selected != 1)
		{
			selected = 1;
			keys[DOWN_ARROW] = 0;
		}
		if(keys[32] && selected == 0)
		{
			keys[32] = 0;
			dwight.die();
			//gameState = PLAY;
		}
		if(keys[32] && selected == 1)
		{
			keys[32] = 0;
			gameState = PLAY;
			
		}
		if(keys[ESCAPE])
		{
			gameState = PLAY;
			keys[ESCAPE] = 0;	
		}
	}
	
	static drawDialogBoxGenerator()
	{
		fill(255,255,255);
		rect(windowWidth/2 - (windowWidth/2)/2, windowHeight/4 - (windowHeight/4)/2, 400, 200);
		textSize(15);
		fill(0,0,0);
		if(selected == 0)
		{
			
				text('->', 250, windowHeight/4+20);
			
				text('Turn generator on', windowWidth/2, windowHeight/4 + 20);
			
				text('Turn generator off', windowWidth/2, windowHeight/4 + 45);
		}
		else
		{
			
				text('->', 250, windowHeight/4 + 45);
			
				text('Turn generator on', windowWidth/2, windowHeight/4 + 20);
			
				text('Turn generator off', windowWidth/2, windowHeight/4 + 45);
		}
	}
	
	static selectOptionGenerator()
	{
		if(keys[UP_ARROW] && selected != 0)
		{
			selected = 0;
			keys[UP_ARROW] = 0;
		}
		if(keys[DOWN_ARROW] && selected != 1)
		{
			selected = 1;
			keys[DOWN_ARROW] = 0;
		}
		if(keys[32] && selected == 0)
		{
			keys[32] = 0;
			if(map.generatorOn)
				{
					gameState = PLAY;
					message.set(0,0,"GENERATOR ALREADY ON",true)

				}
			else
				{
					map.generatorOn = true;
					gameState = PLAY;
					message.set(0,0,"GENERATOR IS NOW ON !!!\nTHE ELEVATOR IS NOW WORKING !!!",true)
					generator_sound.loop();
				}
			
			//console.log("map.generatorOn ", map.generatorOn);
		}
		if(keys[32] && selected == 1)
		{
			keys[32] = 0;
			if(!map.generatorOn)
				{
					gameState = PLAY;
					message.set(0,0,"GENERATOR ALREADY OFF",true)

				}
			else
				{
					message.set(0,0,"GENERATOR IS NOW OFF !!!\nTHE ELEVATOR IS NOT WORKING ANYYMORE !!!",true)
					map.generatorOn = false;
					generator_sound.stop();
					gameState = PLAY;
				}
			
		}
		if(keys[ESCAPE])
		{
			gameState = PLAY;
			keys[ESCAPE] = 0;	
		}
	}
	static drawDialogBoxElevator()
	{
		fill(255,255,255);
		rect(windowWidth/2 - (windowWidth/2)/2, windowHeight/4 - (windowHeight/4)/2, 400, 200);
		textSize(15);
		fill(0,0,0);
		text('->', 250, windowHeight/4+25*selected);
		text('TRAVEL TO ' + floorAliases[1], windowWidth/2, windowHeight/4);
					text('TRAVEL TO ' + floorAliases[2], windowWidth/2, windowHeight/4 + 25);
					text('TRAVEL TO ' + floorAliases[3], windowWidth/2, windowHeight/4 + 50);
					text('TRAVEL TO ' + floorAliases[4], windowWidth/2, windowHeight/4 + 75);

	}
	
	static selectOptionElevator()
	{
		if(keys[UP_ARROW] && selected != 0)
		{
			selected--;
			keys[UP_ARROW] = 0;
		}
		if(keys[DOWN_ARROW] && selected != 3)
		{
			selected++;
			keys[DOWN_ARROW] = 0;
		}
		if(keys[32])
		{
			keys[32] = 0;
			map.travelTo(selected+1,5,2)
			elevator_sound.play();
		}
		if(keys[ESCAPE])
		{
			gameState = PLAY;
			keys[ESCAPE] = 0;	
		}
	}
	
	static s_drawNoteDialog()
	{
		let x = windowWidth/2;
		let y = windowHeight/4 - (windowHeight/4)/2;
		fill(255,255,255);
		rect(windowWidth/2 - (windowWidth/2)/2, windowHeight/4 - (windowHeight/4)/2, 400, 200);
		textSize(15);
		fill(0,0,0);
		text('->', windowWidth/2 - 50, windowHeight/4+20*selected);
		text('You found a note !', x, windowHeight/4-40);
		text('Read it ?', x, windowHeight/4-20);
		text('Yes', x, windowHeight/4);
		text('No', x, windowHeight/4+20);
		
	}
	
	static s_drawNote()
	{
		fill(255,255,255);
		rect(windowWidth/2 - (windowWidth/2)/2, windowHeight/4 - (windowHeight/4)/2, 400, 400);
		textSize(15);
		fill(0,0,0);
		text(g_noteTexts[textId], windowWidth/2, windowHeight/4);
		text('(ESC to close)', windowWidth/2, windowHeight/4+100);
	}
	
	static s_selectOptionNote()
	{
		if(keys[UP_ARROW] && selected != 0)
		{
			selected--;
			keys[UP_ARROW] = 0;
		}
		if(keys[DOWN_ARROW] && selected != 1)
		{
			selected++;
			keys[DOWN_ARROW] = 0;
		}
		if(keys[32])
		{
			keys[32] = 0;
			if(selected == 0)
				gameState = NOTE_READING;
			else if(selected == 1)
				gameState = PLAY;
		}
		if(keys[ESCAPE])
		{
			gameState = PLAY;
			keys[ESCAPE] = 0;	
		}
	}
}




class Menu {
    constructor () {
		
	}
	
	static s_select_option_ingame_menu()
	{
		if(keys[UP_ARROW] && selected != 0)
		{
			selected--;
			keys[UP_ARROW] = 0;
		}
		if(keys[DOWN_ARROW] && selected != 2)
		{
			selected++;
			keys[DOWN_ARROW] = 0;
		}
		if(keys[LEFT_ARROW] && selected == 2)
		{
			
			global_volume-=0.1;
			if(global_volume < 0.0)
				global_volume = 0.0;
			outputVolume(global_volume);
			
			
			keys[LEFT_ARROW] = 0;
		}
		if(keys[RIGHT_ARROW] && selected == 2)
		{
			
			global_volume+=0.1;
			if(global_volume > 1.0)
				global_volume = 1.0;
			outputVolume(global_volume);
			
			keys[RIGHT_ARROW] = 0;
		}
		if(keys[32] && selected == 0)
		{
			keys[32] = 0;
			gameState = PLAY;
			music_sound.play();
			if(generator_sound.isPaused())
				generator_sound.loop();
			//showEditorButtons(false)
			//setStartingPoint();
			
		}
		if(keys[32] && selected == 1)
		{
			keys[32] = 0;
			gameState = MENU;
			music_sound.stop();
			if(generator_sound.isLooping())
				generator_sound.stop();
			//showEditorButtons(false)
		}
	}
	
	static s_select_option()
	{
		if(keys[UP_ARROW] && selected != 0)
		{
			selected--;
			keys[UP_ARROW] = 0;
		}
		if(keys[DOWN_ARROW] && selected != 3)
		{
			selected++;
			keys[DOWN_ARROW] = 0;
		}
		if(keys[LEFT_ARROW] && selected == 3)
		{
			
			global_volume-=0.1;
			if(global_volume < 0.0)
				global_volume = 0.0;
			outputVolume(global_volume);
			
			
			keys[LEFT_ARROW] = 0;
		}
		if(keys[RIGHT_ARROW] && selected == 3)
		{
			
			global_volume+=0.1;
			if(global_volume > 1.0)
				global_volume = 1.0;
			outputVolume(global_volume);
			
			keys[RIGHT_ARROW] = 0;
		}
		if(keys[32] && selected == 0)
		{
			keys[32] = 0;
			//gameState = PLAY;
			gameState = START_SCRIPT;
			map.floors[3].lastStartScript = new Date().getTime();
			showEditorButtons(false)
			setStartingPoint();
			
		}
		if(keys[32] && selected == 1)
		{
			keys[32] = 0;
			gameState = HOW_TO_PLAY;
			showEditorButtons(false)
		}
		if(keys[32] && selected == 2)
		{
			keys[32] = 0;
			gameState = EDITOR;
			showEditorButtons(true);
		}
	}
	
	static s_return()
	{
		if(keys[ESCAPE])
		{
			if(gameState == HOW_TO_PLAY)
				gameState = MENU;
			else if(gameState == PLAY)
			{
				gameState = INGAME_MENU;
				music_sound.pause();
				generator_sound.pause();
			}
			else if(gameState == END)
			{
				gameState = MENU;
				dark_piano_sound.stop();
			}
			else if(gameState == GAME_OVER)
			{
				gameState = MENU;
				dark_piano_sound.stop();
			}
			else if(gameState == EDITOR)
			{
				gameState = MENU;
				showEditorButtons(false)
			}
			else if(gameState > 9)
				gameState = PLAY;
			/*if(music_sound.isPlaying())
				music_sound.stop();
			if(dark_piano_sound.isPlaying())
				dark_piano_sound.stop();*/
			keys[ESCAPE] = 0;
		}
	}
	
	static s_draw()
	{
		background(220);
		fill(0);
		textSize(40);
		text('DEAD OFFICE', windowWidth/2, windowHeight/4);
		textSize(25);
		
		
		let vol = Math.floor(global_volume*10)
		let stringVol = "";
		for(let i = 0; i < vol;i++)
			stringVol += "-";
		
		
			textAlign(LEFT)
			text('->', 250, windowHeight/4 + 150+selected*25);
			text('PLAY', windowWidth/2 - 50, windowHeight/4 + 150);
			text('HOW TO PLAY', windowWidth/2 - 50, windowHeight/4 + 175);
			text('EDITOR', windowWidth/2 - 50, windowHeight/4 + 200);
			text('VOLUME ' + stringVol, windowWidth/2 - 50, windowHeight/4 + 225);
			textAlign(CENTER)
		
		
	}
	
	static s_draw_ingame_menu()
	{
		background(220);
		fill(0);
		textSize(40);
		text('DEAD OFFICE', windowWidth/2, windowHeight/4);
		textSize(25);
		
		
		let vol = Math.floor(global_volume*10)
		let stringVol = "";
		for(let i = 0; i < vol;i++)
			stringVol += "-";
		
		
			textAlign(LEFT)
			text('->', 250, windowHeight/4 + 150+selected*25);
			text('RESUME', windowWidth/2 - 50, windowHeight/4 + 150);
			text('MAIN MENU', windowWidth/2 - 50, windowHeight/4 + 175);
			text('VOLUME ' + stringVol, windowWidth/2 - 50, windowHeight/4 + 200);
			textAlign(CENTER)
		
		
	}
	
	static s_drawHowToPlay()
	{
		background(220);
		fill(0);
		textSize(40);
		text('HOW TO PLAY', windowWidth/2, windowHeight/4);
		textSize(20);
		text('Move = ← → ↑ ↓', windowWidth/2, (windowHeight/4)+100);
		text('Action/Attack = Space', windowWidth/2, (windowHeight/4)+120);
		text('Switch weapon = Ctrl', windowWidth/2, (windowHeight/4)+140);
		text('Reload weapon = R', windowWidth/2, (windowHeight/4)+160);
		text('Cancel/Menu = Esc', windowWidth/2, (windowHeight/4)+180);
		
		textSize(30);
		text('ESCAPE THE BUILDING !', windowWidth/2, (windowHeight/4)+250);
		text('DONT LET THE ZOMBIES TOUCH YOU !', windowWidth/2, (windowHeight/4)+280);
	}
	
	static s_drawGameOver()
	{
		fill(255,0,0);
		textSize(40);
		text('GAME OVER !!!', windowWidth/2, windowHeight/4);
	}
	
	static s_drawCurrentFloor()
	{
		fill(255,0,0);
		stroke(0, 0, 0);
		textSize(25);
		text("current floor : " + floorAliases[map.current_floor],windowWidth/2,50)
	}
	
	static s_drawHud()
	{
		fill(0,0,0);
		stroke(0, 0, 0);
		textSize(12);
		text("Floor : " + floorAliases[map.current_floor],windowWidth-100,10)
		for(let i = 0; i < dwight.life; i++)
			image(heart, 10+i*20,10,20,16);
		
		if(map.floors[map.current_floor].boss != null)
			{
				push()
			        let bit = "";
					for(let i = 0; i < map.floors[map.current_floor].boss.life; i++)
						bit += "_"
				    if(map.floors[map.current_floor].boss.state != STATE.DEAD)
						{
							fill(255,0,0);
							stroke(0, 0, 0);
							textSize(20);
							text(map.floors[map.current_floor].boss.name,windowWidth/2,20)
						}
					else
					{
						fill(0,0,0);
						stroke(0, 0, 0);
						textSize(20);
						text(map.floors[map.current_floor].boss.name + " dead",windowWidth/2,20)
					}
					textSize(40);
					text(bit,windowWidth/2,40)
				pop()
			}
	}
	
	static s_drawEnd()
	{
		
		textSize(40);
		fill(255,0,0);
		text('YOU ESCAPED !!!', windowWidth/2, windowHeight/4);
		
		fill(0);
		textSize(20);
		if(floor(time/1000) < 60)
			text('TIME : ' + floor(time/1000) + " sec", windowWidth/2, windowHeight/4 + 100);
		else
		{
			let min = floor((time/1000)/60);
			let sec = floor(time/1000)%60;
			text('TIME : ' + min + " min " + sec + " sec", windowWidth/2, windowHeight/4 + 100);
		}
	}
	
	
	
}
