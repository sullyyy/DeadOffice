const STATE = {
  ROAMING: 0,
  CHASING: 1,
};

class Zombie {
  constructor(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
    this.dirX = 1;
    this.zombieState = STATE.ROAMING;
    this.velocity = 2;
  }

  draw() {
    this.move();
    if (dwight.alive)
      this.detectPlayer(
        this.x + 36 / 2,
        dwight.x + 36 / 2,
        this.y + 70 / 2,
        dwight.y + 70 / 2
      );
    image(
      this.img,
      this.x + camera.offSetX,
      this.y + camera.offSetY,
      this.width,
      this.height
    );
    fill(0);
    textSize(10);
    text(
      "STATE : " + this.stateToString(this.zombieState),
      this.x + camera.offSetX,
      this.y + camera.offSetY - 10
    );
  }

  move() {
    switch (this.zombieState) {
      case STATE.ROAMING:
        if (this.handleCollision(this.x + this.velocity * this.dirX, this.y)) {
          this.x += this.velocity * this.dirX;
        } else this.dirX *= -1;
        break;

      case STATE.CHASING:
        let v1 = createVector(
          this.x + 36 / 2 + camera.offSetX,
          this.y + 70 / 2 + camera.offSetY
        );
        let v2 = createVector(
          dwight.x + 36 / 2 + camera.offSetX,
          dwight.y + 70 / 2 + camera.offSetY
        );
        line(v1.x, v1.y, v2.x, v2.y);

        let dx = v1.x - v2.x;
        let dy = v1.y - v2.y;
        let angle = atan2(dy, dx);

        let xVelocity = this.velocity * cos(angle);
        let yVelocity = this.velocity * sin(angle);
        if (this.handleCollision(this.x - xVelocity, this.y)) {
          this.x -= xVelocity;
        }
        if (this.handleCollision(this.x, this.y - yVelocity)) {
          this.y -= yVelocity;
        }

        break;

      default:
        break;
    }
  }

  detectPlayer(x1, x2, y1, y2) {
    var dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    if (dist < 200) {
      this.zombieState = STATE.CHASING;
    }
    if (dist < 30) {
      for (let i = 0; i < 2; i++) enemies[i].zombieState = STATE.ROAMING;
      gameState = GAME_OVER;
      camera.lookAtObj(this);
      dwight.alive = false;
    }
  }

  handleCollision(x, y) {
    if (x / 100 < 0 || y / 100 < 0 || x / 100 > 10 || y / 100 > 10)
      return false;
    if (
      map.map_array[map.current_floor][floor((y + 60) / 100)][floor(x / 100)] !=
      1
    )
      return false;
    if (
      map.map_array[map.current_floor][floor((y + 60) / 100)][
        floor((x + 36) / 100)
      ] != 1
    )
      return false;
    return true;
  }

  stateToString(state) {
    if (state == 0) return "ROAMING";
    else if (state == 1) return "CHASING";
  }
}
