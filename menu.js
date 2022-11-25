class Menu {
  constructor() {}

  static s_draw() {
    background(220);
    fill(0);
    textSize(40);
    text("DEAD OFFICE", windowWidth / 2, windowHeight / 4);
    textSize(30);
    text("Click to play", windowWidth / 2, windowHeight / 2);
  }

  static s_drawGameOver() {
    fill(255, 0, 0);
    textSize(40);
    text("GAME OVER !!!", windowWidth / 2, windowHeight / 4);
  }
}
