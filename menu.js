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
				//console.log(" map.current_floor + 1 ", map.current_floor + 1);
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
				text('travel to ' + floorAliases[map.current_floor + 1], windowWidth/2, windowHeight/4 + 20);
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
				text('travel to ' + floorAliases[map.current_floor + 1], windowWidth/2, windowHeight/4 + 20);
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
			if(map.current_floor != 5 && map.current_floor != 0 && map.current_floor != 1 && map.current_floor != 3)
				map.travelTo(map.current_floor+1,8,2)
		}
		if(keys[32] && selected == 1)
		{
			if(map.current_floor != 0 && map.current_floor != 1 && map.current_floor != 2 && map.current_floor != 4)
				map.travelTo(map.current_floor-1,8,2)
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
		}
		if(keys[DOWN_ARROW] && selected != 1)
		{
			selected = 1;
		}
		if(keys[32] && selected == 0)
		{
			map.generatorOn = true;
			gameState = PLAY;
			message.set(0,0,"GENERATOR IS NOW ON !!!\nTHE ELEVATOR IS NOW WORKING !!!",true)
			console.log("map.generatorOn ", map.generatorOn);
		}
		if(keys[32] && selected == 1)
		{
			message.set(0,0,"GENERATOR IS NOW OFF !!!\nTHE ELEVATOR IS NOT WORKING ANYYMORE !!!",true)
			map.generatorOn = false;
			gameState = PLAY;
			
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
		}
		if(keys[DOWN_ARROW] && selected != 3)
		{
			selected++;
		}
		if(keys[32])
		{
			map.travelTo(selected+1,5,2)
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
	
	static s_select_option()
	{
		if(keys[UP_ARROW] && selected != 0)
		{
			selected--;
		}
		if(keys[DOWN_ARROW] && selected != 2)
		{
			selected++;
		}
		if(keys[32] && selected == 0)
		{
			keys[32] = 0;
			gameState = PLAY;
			showEditorButtons(false)
			dwight.init();
			
		}
		if(keys[32] && selected == 1)
		{
			gameState = HOW_TO_PLAY;
			showEditorButtons(false)
		}
		if(keys[32] && selected == 2)
		{
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
				gameState = MENU;
			else if(gameState == END)
				gameState = MENU;
			else if(gameState == GAME_OVER)
				gameState = MENU;
			else if(gameState == EDITOR)
			{
				gameState = MENU;
				showEditorButtons(false)
			}
		}
	}
	
	static s_draw()
	{
		background(220);
		fill(0);
		textSize(40);
		text('DEAD OFFICE', windowWidth/2, windowHeight/4);
		textSize(25);
		
		text('->', 250, windowHeight/4 + 150+selected*25);
		text('PLAY', windowWidth/2, windowHeight/4 + 150);
		text('HOW TO PLAY', windowWidth/2, windowHeight/4 + 175);
		text('EDITOR', windowWidth/2, windowHeight/4 + 200);
		//textAlign(LEFT);
		/*if(selected == 0)
		{
			text('->', 250, windowHeight/4 + 150);
			text('PLAY', windowWidth/2, windowHeight/4 + 150);
			text('HOW TO PLAY', windowWidth/2, windowHeight/4 + 175);
		}
		else
		{
			text('->', 250, windowHeight/4 + 175);
			text('PLAY', windowWidth/2, windowHeight/4 + 150);
			text('HOW TO PLAY', windowWidth/2, windowHeight/4 + 175);
		}*/
		//textAlign(CENTER);
	}
	
	static s_drawHowToPlay()
	{
		background(220);
		fill(0);
		textSize(40);
		text('HOW TO PLAY', windowWidth/2, windowHeight/4);
		textSize(20);
		text('Move = ← → ↑ ↓', windowWidth/2, (windowHeight/4)+100);
		text('Action = Space', windowWidth/2, (windowHeight/4)+120);
		text('Cancel/Menu = Esc', windowWidth/2, (windowHeight/4)+140);
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
