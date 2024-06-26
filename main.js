import Game from './GameEngine/Game.js';
import RoomTest1 from './Rooms/RoomTest1.js';
import RoomTest2 from './Rooms/RoomTest2.js';

// -------------------- GAME SETTINGS --------------------- //
const $game = document.querySelector("#game");
const $gameCanvas = document.querySelector("#game__display");
const GAME = new Game($game, $gameCanvas);
GAME.debug = false; 

// -------------------- ROOMS --------------------- //
GAME.addRoom(RoomTest1);
GAME.addRoom(RoomTest2);
GAME.changeRoom("RoomTest1");
GAME.startGame();

