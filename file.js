class File {
    constructor () {
		
	}
	
	
	static load()
	{
		loadJSON("./data/map_0.json", function loadjson(json){
			map_array_0 = json;
		}
		
		);
		
		loadJSON("./data/map_1.json", function loadjson(json){
			map_array_1 = json;
		}
		
		);
		
		loadJSON("./data/map_2.json", function loadjson(json){
			map_array_2 = json;
		}
		
		);
		
		loadJSON("./data/map_3.json", function loadjson(json){
			map_array_3 = json;
		}
		
		);
		
		loadJSON("./data/map_4.json", function loadjson(json){
			map_array_4 = json;
		}
		
		);
		
		loadJSON("./data/map_5.json", function loadjson(json){
			map_array_5 = json;
		}
		
		);
		
		
	}
	
	static loadAssets()
	{
		loadJSON("./data/assets.json", function loadAssets_c(json){
			assets_array = json;
		}
		
		);
		
		
	}
	
	static save(obj)
	{
		saveJSON(obj, "map.json");
	}
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








