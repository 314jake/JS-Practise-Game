import { readCookie } from "../read-cookie.js";
import { settings } from "../settings/settings-themselves.js";

//create board element
function createBoard() {
    const board = document.createElement('div');
    board.id = 'board';
    board.style.width = '30rem';
    board.style.height = '30rem';
    document.querySelector('#game-c').appendChild(board);
}

//create div to act as game tile
function createTile(row, col) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.id = `r${row}c${col}`;

    const currTerrain = readCookie('terrain');
    const terrainSetting = settings.find((s) => s.settingName === 'terrain');
    console.log(terrainSetting);
    const terrainColor = terrainSetting.values[currTerrain].terrainColor;
    console.log(terrainColor);
    tile.style.backgroundColor = terrainColor;
    return tile;
}

export let tileElements = [];

//create grid and fill with tile elements, populate array of tileElements
function putTilesOnBoard(boardSize) {
    //establish CSS grid
    const board = document.querySelector('#board');
    board.style.gridTemplate = `repeat(${boardSize}, 1fr) / repeat(${boardSize}, 1fr)`;

    //reset array of tile elements
    tileElements = [];

    //for every row, create a tile for every column with id assigned to the tile's co-ordinates and append it to both the board and the array
    for (let row = 1; row <= boardSize; row++) {
        for (let col = 1; col <= boardSize; col++) {
            const tile = createTile(row, col);
            board.appendChild(tile);
            tileElements.push(tile);
        }
    }
}

//render the board and all tiles on it
export function renderBoard() {
    //remove previous instances of board
    const gameC = document.querySelector('#game-c')
    while (document.querySelector('#board')) {
        gameC.removeChild(document.querySelector('#board'));
    }

    //create the board and tiles
    createBoard();
    const boardSize = readCookie('board-size');
    putTilesOnBoard(boardSize);
}