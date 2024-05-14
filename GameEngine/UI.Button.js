import UI from "./UI.js";
import Vector2 from "./Vector2.js";

export default class UIButton extends UI {
  constructor(game, x, y, w, h, text) {
    super(game, x, y, w, h);

    this.text = text;
    this.font = "16px sans-serif";
    this.backgroundColor = "#aaa";
    this.color = "#222";
    this.fill = true;
    this.border = false;
    this.align = "left";
    this.textMetrics = new Vector2(0, 0);

    this.backgroundColorHover = "#0ea5e9";
    this.colorHover = "#fff";
    this.backgroundColorPressed = "#0089C6";
    this.colorPressed = "#6BC8F2";
  }

  draw = (ctx) => {
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.clip();

    ctx.font = this.font;
    this.textMetrics.x = Math.ceil(ctx.measureText(this.text).width);
    this.textMetrics.y = Math.ceil(ctx.measureText(this.text).hangingBaseline);

    // boton
    if (this.hover && !this.pressed) {
      ctx.fillStyle = this.backgroundColorHover;
    } else if (this.hover && this.pressed) {
      ctx.fillStyle = this.backgroundColorPressed;
    } else {
      ctx.fillStyle = this.backgroundColor;
    }
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);

    // texto
    if (this.hover && !this.pressed) {
      ctx.fillStyle = this.colorHover;
      ctx.strokeStyle = this.colorHover;
    } else if (this.hover && this.pressed) {
      ctx.fillStyle = this.colorPressed;
      ctx.strokeStyle = this.colorPressed;
    } else {
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
    }

    let textAlign =
      this.align === "center"
        ? this.size.x / 2 - this.textMetrics.x / 2
        : this.align === "right"
        ? this.size.x - this.textMetrics.x
        : 0;
    if (this.fill) {
      ctx.fillText(
        this.text,
        this.position.x + textAlign,
        this.position.y + this.textMetrics.y / 2 + this.size.y / 2
      );
    } else {
      ctx.strokeText(
        this.text,
        this.position.x + textAlign,
        this.position.y + this.textMetrics.y / 2 + this.size.y / 2
      );
    }
    ctx.restore();
  };
}