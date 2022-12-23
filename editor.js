class Editor {
	constructor ()
	{
		setupEditor();
		this.selected = 0;
		this.decalX = 0;
	}
}

function setupEditor()
{
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
  
  sel.elt.addEventListener("click", function(event){
  event.preventDefault()
});

sel2.elt.addEventListener("click", function(event){
  event.preventDefault()
});

  showEditorButtons(false)
}

function myCheckedEvent() {
  if (checkbox.checked()) {
    showOption = true;
  } else {
    showOption = false;
	hide_option_buttons();
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
		hide_option_buttons();
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

function hide_option_buttons()
{
	let k = 0;
	for(let k = 0; k < 100; k++)
	{
		button2[k].hide();
	}
}

function show_option_buttons()
{
	let k = 0;
	for(let i = 0; i < 10; i++)
	{
		for(let j = 0; j < 10; j++)
		{
			button2[k].hide();
			if(cnv.elt.getBoundingClientRect().x+camera.offSetX+j*100 > 100 && cnv.elt.getBoundingClientRect().x+camera.offSetX+j*100 < 1500 && cnv.elt.getBoundingClientRect().y+camera.offSetY+i*100 > 200 && cnv.elt.getBoundingClientRect().y+camera.offSetY+i*100 < 700)
			{
				button2[k].show();
				button2[k].position(cnv.elt.getBoundingClientRect().x+camera.offSetX+j*100, cnv.elt.getBoundingClientRect().y+camera.offSetY+i*100);
			}
			k++;
		}
	}
}

function draw_assets_list()
{
	//draw assets background
	fill(255,255,255);
	rect(0,500,800,100)
	rect(0,0,800,20)
	
	//draw assets list
	for(let i = 0; i < assets_array.length; i++)
	{
		let img_array_id = assets_array[i].data_id;
		image(map.img_array[img_array_id], i*100+editor.decalX, 500, 100,100,100*assets_array[i].draw_id,0,100,100)
	}
	
	//draw red selected rect
	stroke(255,0,0);
	noFill();
	rect(editor.selected*100+editor.decalX,500,100,100)
}

function select_element()
{
	
	if (mouseIsPressed === true) {
		//checks if click pos on assets list 
		if((mouseX - editor.decalX) > 0 && (mouseX - editor.decalX) < assets_array.length*100 && mouseY > 500 && mouseY < 600)
		{
			//select asset
			editor.selected = floor((mouseX - editor.decalX)/100);
		}
		//checks if click pos on map
		if(mouseX > 0 && mouseX < 800 && mouseY > 20 && mouseY < 500 && document.activeElement == document.body)
		{
			let iw_i = floor((mouseX - camera.offSetX)/100);
			let iw_j = floor((mouseY - camera.offSetY)/100);
			//checks if click within map boundaries
			if(iw_i >= 0 && iw_i < 10 && iw_j >= 0 && iw_j < floor_size[map.current_floor].h)
			{
				//put tile 
				map.map_array[map.current_floor][iw_j][iw_i] = assets_array[editor.selected];
			}
		}
		mouseIsPressed = false;
	}
}