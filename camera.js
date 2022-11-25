class Camera {
  constructor(startX, startY, width, height) {
    this.offSetX = startX;
    this.offSetY = startY;
    this.width = width;
    this.height = height;
    this.obj;
  }

  lookAt(x, y) {
    this.offSetX = windowWidth / 2 - x;
    this.offSetY = windowHeight / 2 - y;
  }

  lookAtObj(obj) {
    this.obj = obj;
  }

  update() {
    if (this.obj == null) return;

    this.offSetX = windowWidth / 2 - this.obj.x;
    this.offSetY = windowHeight / 2 - this.obj.y;
  }
}
