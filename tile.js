
class Test_Tile {
	constructor (game_id,draw_id,data_id,hitboxX,hitboxY,hitboxW,hitboxH,decalY) {
		this.game_id = game_id;
		this.draw_id = draw_id;
		this.data_id = data_id;
		this.hitboxX = hitboxX;
		this.hitboxY = hitboxY;
		this.hitboxW = hitboxW;
		this.hitboxH = hitboxH;
		this.decalY = decalY;
	}
}


class Tile {
    constructor (id,hitboxX,hitboxY,hitboxW,hitboxH) {
		this.id = id;
		this.hitboxX = hitboxX;
		this.hitboxY = hitboxY;
		this.hitboxW = hitboxW;
		this.hitboxH = hitboxH;
	}
}

class PositionableTile extends Tile {
	constructor (id,hitboxX,hitboxY,hitboxW,hitboxH,decalY) {
		super(id,hitboxX,hitboxY,hitboxW,hitboxH);
		this.decalY = decalY;
	}
}