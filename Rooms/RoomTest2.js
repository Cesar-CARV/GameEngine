import Room from "./../GameEngine/Room.js";

import UILabel from "../GameEngine/UI.Label.js";
import UIInput from "../GameEngine/UI.Input.js";

export default class RoomTest2 extends Room {
  constructor(GAME) {
    super(GAME, GAME.w, GAME.h);

    // Input improvizado
    const inputTest = new UIInput(
      GAME,
      10,
      10,
      300,
      30,
      "",
      "Escribe lo que quieras aqui"
    );
    inputTest.backgroundColor = "#fff";
    inputTest.backgroundColorHover = "#eee";
    inputTest.color = "#000";
    inputTest.placeholderColor = "#aaa";
    inputTest.colorHover = "#111";
    inputTest.colorPointer = "#000";
    inputTest.activeBorderColor = "#00f";
    inputTest.steps = () => {
      if (inputTest.text === "cambiar a nivel 1") {
        inputTest.text = "";
        inputTest.pointer = 0;
        GAME.changeRoom("RoomTest1");
      } else if (inputTest.text === "stop game") {
        GAME.stopGame();
      }
    };
    // -------------------------------------------------------------
    // Titulo de nivel 2
    const title2 = new UILabel(
      GAME,
      40,
      GAME.h - 80,
      GAME.w - 80,
      60,
      "ROOM TEST 2"
    );
    title2.backgroundColor = "#346";
    title2.color = "#fff";
    title2.align = "center";

    this.addInstance(inputTest, true, "inputTest");
    this.addInstance(title2, true, "title2");
  }
}
