import { 
    changeNumericalSetting,
    changeTerrainSetting,
    renderAllSettings,
    resetAllSettingsToDefault
} from "./settings/settings-functions.js"
import { navigateToScreen } from "./screen-nav.js";
import { readCookie } from "./read-cookie.js";
import { startGame } from "./game/game-start.js"
import { renderBoard } from "./game/render-board.js";
import { movePlayer } from "./game/move.js";

console.log(document.cookie);

navigateToScreen(readCookie('screen'));
renderAllSettings();
renderBoard();
movePlayer();

//click listeners
const increaseBoardSize = document.querySelector('#increase-board-size');
increaseBoardSize.addEventListener('click', () => changeNumericalSetting("board-size", "up"));

const decreaseBoardSize = document.querySelector('#decrease-board-size');
decreaseBoardSize.addEventListener('click', () => changeNumericalSetting("board-size", "down"));

const increaseDifficulty = document.querySelector('#increase-difficulty');
increaseDifficulty.addEventListener('click', () => changeNumericalSetting("difficulty", "up"));

const decreaseDifficulty = document.querySelector('#decrease-difficulty');
decreaseDifficulty.addEventListener('click', () => changeNumericalSetting("difficulty", "down"));

const prevTerrain = document.querySelector('#previous-terrain');
prevTerrain.addEventListener('click', () => changeTerrainSetting('prev'));

const nextTerrain = document.querySelector('#next-terrain');
nextTerrain.addEventListener('click', () => changeTerrainSetting('next'));

const resetSettings = document.querySelector('#reset-button');
resetSettings.addEventListener('click', () => resetAllSettingsToDefault());

const startGameButton = document.querySelector('#start-game-button');
startGameButton.addEventListener('click', () => {
    navigateToScreen('game');
    startGame();
});

const endGameButton = document.querySelector('#end-game-button');
endGameButton.addEventListener('click', () => navigateToScreen('newGameMenu'));

const moveUp = document.querySelector('#move-up');
moveUp.addEventListener('click', () => movePlayer('up'));

const moveLeft = document.querySelector('#move-left');
moveLeft.addEventListener('click', () => movePlayer('left'));

const moveRight = document.querySelector('#move-right');
moveRight.addEventListener('click', () => movePlayer('right'));

const moveDown= document.querySelector('#move-down');
moveDown.addEventListener('click', () => movePlayer('down'));