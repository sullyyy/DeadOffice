class Tile_To_Draw {
  constructor(i, j, z_index, bckgrnd, id) {
    this.i = i;
    this.j = j;
    this.z_index = z_index;
    this.bckgrnd = bckgrnd;
    this.id = id;
  }
}

class Map {
  constructor(map_size_width, map_size_height, map_array) {
    this.map_size_width = map_size_width;
    this.map_size_height = map_size_height;
    this.map_array = map_array;
    this.current_floor = 0;
  }

  //sorting map array by z index
  sort() {
    for (let i = 0; i < this.map_size_width; i++) {
      for (let j = 0; j < this.map_size_height; j++) {
        z_index_map.push(
          new Tile_To_Draw(
            i,
            j,
            i * 100 +
              map_array[this.current_floor][i][j].hitboxY +
              map_array[this.current_floor][i][j].hitboxH,
            true,
            0
          )
        );
      }
    }
    z_index_map.push(
      new Tile_To_Draw(
        floor(dwight.x / 100),
        floor(dwight.y / 100),
        dwight.y + dwight.height,
        false,
        1
      )
    );
    z_index_map.push(
      new Tile_To_Draw(
        floor(enemies[0].x / 100),
        floor(enemies[0].y / 100),
        enemies[0].y + enemies[0].height,
        false,
        2
      )
    );
    z_index_map.push(
      new Tile_To_Draw(
        floor(enemies[1].x / 100),
        floor(enemies[1].y / 100),
        enemies[1].y + enemies[1].height,
        false,
        3
      )
    );
    z_index_map.sort(function (a, b) {
      return a.z_index - b.z_index;
    });
  }

  //updating moving tile z index
  modify(obj) {
    let ind = z_index_map.findIndex((x) => x.id == obj.id);
    z_index_map[ind].i = floor(obj.x / 100);
    z_index_map[ind].j = floor(obj.y / 100);
    z_index_map[ind].z_index = obj.y + obj.height;
  }

  //resorting map array with updated moving tile z index
  resort(obj) {
    this.modify(obj);
    z_index_map.sort(function (a, b) {
      return a.z_index - b.z_index;
    });
  }

  //drawing map in fct of z index
  drawZ() {
    //paints background grey then paints floor green
    background(47, 47, 47);
    fill(98, 149, 112);
    noStroke();
    rect(camera.offSetX, camera.offSetY, 1000, 1000);

    for (let k = 0; k < z_index_map.length; k++) {
      //checks if tile is within camera viewport
      if (
        z_index_map[k].j * 100 + camera.offSetX > -100 &&
        z_index_map[k].i * 100 + camera.offSetY > -100 &&
        z_index_map[k].j * 100 + camera.offSetX < camera.width + 100 &&
        z_index_map[k].i * 100 + camera.offSetY < camera.height + 100
      ) {
        //checks if background tile
        if (z_index_map[k].bckgrnd == true) {
          //checks if tile is positionable
          if (
            map_array[this.current_floor][z_index_map[k].i][
              z_index_map[k].j
            ] instanceof PositionableTile
          )
            image(
              tilemap,
              z_index_map[k].j * 100 + camera.offSetX,
              z_index_map[k].i * 100 +
                camera.offSetY +
                map_array[this.current_floor][z_index_map[k].i][
                  z_index_map[k].j
                ].decalY,
              100,
              100,
              map_array[this.current_floor][z_index_map[k].i][z_index_map[k].j]
                .id * 100,
              0,
              100,
              100
            );
          else
            image(
              tilemap,
              z_index_map[k].j * 100 + camera.offSetX,
              z_index_map[k].i * 100 + camera.offSetY,
              100,
              100,
              map_array[this.current_floor][z_index_map[k].i][z_index_map[k].j]
                .id * 100,
              0,
              100,
              100
            );
        }
      }

      //checks if moving tile
      if (z_index_map[k].bckgrnd == false) {
        if (z_index_map[k].id == 1) {
          if (dwight.alive) dwight.draw();
        } else if (z_index_map[k].id == 2) {
          enemies[0].draw();
        } else if (z_index_map[k].id == 3) {
          enemies[1].draw();
        }
      }
    }
    this.drawHitBox();
    Zombie.s_drawChaseLine();
  }

  drawHitBox() {
    noFill();
    stroke(255, 0, 0);
    rect(colX + camera.offSetX, colY + camera.offSetY, colW, colH);
    rect(hitDX + camera.offSetX, hitDY + camera.offSetY, hitDW, hitDH);
  }

  //old draw function /!\ (deprecated) /!\
  draw() {
    background(98, 149, 112);
    let dwightDrawn = false;
    let zombiesDrawn = [0, 0];
    for (let i = 0; i < this.map_size_width; i++) {
      for (let j = 0; j < this.map_size_height; j++) {
        //does not display floor tile
        if (map_array[this.current_floor][i][j].id == 1) continue;

        //draws zombies
        for (let k = 0; k < 2; k++) {
          if (
            floor((enemies[k].y + 70) / 100) == i + 1 &&
            j == 9 &&
            zombiesDrawn[k] == 0
          ) {
            zombiesDrawn[k] = 1;
            enemies[k].draw();
          }
        }

        //only displays tiles within camera viewport
        if (
          j * 100 + camera.offSetX > camera.offSetX - 100 &&
          i * 100 + camera.offSetY > camera.offSetY - 100 &&
          j * 100 + camera.offSetX < camera.width &&
          i * 100 + camera.offSetY < camera.height
        ) {
          image(
            tilemap,
            j * 100 + camera.offSetX,
            i * 100 + camera.offSetY,
            100,
            100,
            map_array[this.current_floor][i][j].id * 100,
            0,
            100,
            100
          );
        }

        if (
          floor((dwight.y + 70) / 100) == i + 1 &&
          j == 9 &&
          dwightDrawn == false &&
          dwight.alive == true
        ) {
          dwightDrawn = true;
          dwight.draw();
        }
      }
    }
  }
}
