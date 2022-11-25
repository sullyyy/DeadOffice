class Tile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH) {
    this.id = id;
    this.hitboxX = hitboxX;
    this.hitboxY = hitboxY;
    this.hitboxW = hitboxW;
    this.hitboxH = hitboxH;
  }
}

class PositionableTile extends Tile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH, decalY) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH);
    this.decalY = decalY;
  }
}

class Door extends Tile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH);
  }
}

class WallRight extends Tile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH);
  }
}

class WallLeft extends Tile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH);
  }
}

class Chair extends PositionableTile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH, decalY) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH, decalY);
  }
}

class Table extends Tile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH);
  }
}

class Cupboard extends PositionableTile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH, decalY) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH, decalY);
  }
}

class Wall extends Tile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH);
  }
}

class Plant extends PositionableTile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH, decalY) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH, decalY);
  }
}

class Floor extends Tile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH);
  }
}

class Elevator extends Tile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH);
  }
}

class Stairs extends Tile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH);
  }
}

class VendingMachine extends PositionableTile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH, decalY) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH, decalY);
  }
}

class ThinWall extends Tile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH);
  }
}

class ThinDoor extends Tile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH);
  }
}

class ThinWallLong extends Tile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH);
  }
}

class Printer extends PositionableTile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH, decalY) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH, decalY);
  }
}

class Lamp extends PositionableTile {
  constructor(id, hitboxX, hitboxY, hitboxW, hitboxH, decalY) {
    super(id, hitboxX, hitboxY, hitboxW, hitboxH, decalY);
  }
}
