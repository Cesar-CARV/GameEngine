import Object from "./Object.js";
import Vector2 from "./Vector2.js";

export default class Camara extends Object {
  constructor(GAME, x, y, w, h) {
    super(GAME, x, y, w, h);
    this.absolutePosition = new Vector2(x, y);
    this.MODES = { Center: "Center", Borders: "Borders" };
    this.mode = this.MODES.Center;
    this.paddingX = 100;
    this.paddingY = 100;
    this.scaleX = 1;
    this.scaleY = 1;
    this._ROOM = undefined;
    this.LIMITS = { l: undefined, t: undefined, r: undefined, b: undefined };

    // -----------------------
    this.normalPaddingX;
    this.normalPaddingY;
  }

  setScale = (x, y) => {
    this.scaleX = x;
    this.scaleY = y;
  };

  setCamaraLimits = (x, y, x2, y2) => {
    this.LIMITS.l = x;
    this.LIMITS.t = y;
    this.LIMITS.r = x2;
    this.LIMITS.b = y2;
  };

  steps = () => {
    if (!this._ROOM) {
      this._ROOM = this._GAME.currentRoom;
    } else {
      this._ROOM.scaleContextRoom.x = this.scaleX;
      this._ROOM.scaleContextRoom.y = this.scaleY;

      this._ROOM.sizeContextRoom = this.size;

      // mover camara
      this._ROOM.positionContextRoom.x = -this.position.x;
      this._ROOM.positionContextRoom.y = -this.position.y;

      // si los limites no estan definidos saltarse este las colisiones
      if (
        !this.LIMITS.l &&
        !this.LIMITS.r &&
        !this.LIMITS.t &&
        !this.LIMITS.b
      ) {
        return;
      }

      let normalizedSize = {
        x: this.scaleX > 1 ? (this.size.x - this.size.x / this.scaleX) / 2 : 0,
        y: this.scaleY > 1 ? (this.size.y - this.size.y / this.scaleY) / 2 : 0,
      };

      // colision L
      if (this.absolutePosition.x + normalizedSize.x < this.LIMITS.l) {
        this._ROOM.positionContextRoom.x = this.LIMITS.l + normalizedSize.x;
      }
      // colsion R
      else if (
        this.absolutePosition.x + this.size.x - normalizedSize.x >
        this.LIMITS.r
      ) {
        this._ROOM.positionContextRoom.x = -(
          this.LIMITS.r -
          this.size.x +
          normalizedSize.x
        );
      }
      // colision T
      if (this.absolutePosition.y + normalizedSize.y < this.LIMITS.t) {
        this._ROOM.positionContextRoom.y = this.LIMITS.t + normalizedSize.y;
      }
      // colsion B
      else if (
        this.absolutePosition.y + this.size.y - normalizedSize.y >
        this.LIMITS.b
      ) {
        this._ROOM.positionContextRoom.y = -(
          this.LIMITS.b -
          this.size.y +
          normalizedSize.y
        );
      }
    }
  };

  // actualiza la posicion de el objeto segun la posicion del padre
  updatePosition = () => {
    if (this.mode === this.MODES.Center) {
      this.position = this._PARENT
        ? new Vector2(
            this._PARENT.position.x +
              this.position.x -
              this.size.x / 2 +
              this._PARENT.size.x / 2,
            this._PARENT.position.y +
              this.position.y -
              this.size.y / 2 +
              this._PARENT.size.y / 2
          )
        : this.position;
    } else if (this.mode === this.MODES.Borders) {
      const hitRight = -Math.floor(
        this.absolutePosition.x +
          this.size.x -
          this._PARENT.position.x -
          (this._PARENT.size.x + this.paddingX)
      );

      const hitLeft = -Math.floor(
        this._PARENT.position.x - this.absolutePosition.x - this.paddingX
      );

      const hitBottom = -Math.floor(
        this.absolutePosition.y +
          this.size.y -
          this._PARENT.position.y -
          (this._PARENT.size.y + this.paddingY)
      );

      const hitTop = -Math.floor(
        this._PARENT.position.y - this.absolutePosition.y - this.paddingY
      );


      if (hitLeft > 0) this.normalPaddingX = -hitLeft;
      else if (hitRight > 0) this.normalPaddingX = hitRight;
      else this.normalPaddingX = 0;

      if (hitTop > 0) this.normalPaddingY = -hitTop;
      else if (hitBottom > 0) this.normalPaddingY = hitBottom;
      else this.normalPaddingY = 0;

      this.position = this._PARENT
        ? new Vector2(
            this.position.x + this.normalPaddingX,
            this.position.y + this.normalPaddingY
          )
        : this.position;
    }

    this.absolutePosition = this.position.Copy();
  };

  // reinicia la posicion del objeto para que no cresca exponecialmente al sumar la posicion del padre
  restartPosition = () => {
    if (this.mode === this.MODES.Center) {
      this.position = this._PARENT
        ? new Vector2(
            this.position.x -
              this._PARENT.position.x +
              this.size.x / 2 -
              this._PARENT.size.x / 2,
            this.position.y -
              this._PARENT.position.y +
              this.size.y / 2 -
              this._PARENT.size.y / 2
          )
        : this.position;
    }
  };
}
