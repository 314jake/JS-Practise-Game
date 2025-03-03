import { readCookie } from "../read-cookie.js"
import { movePlayer } from "./move.js";
import { renderBoard } from "./render-board.js";

export function startGame() {
    //initialise coord cookies if not set (first time load)
    if (!readCookie('player-r-coord') || !readCookie('player-c-coord')) {
        document.cookie = 'player-r-coord=1';
        document.cookie = 'player-c-coord=1';
    }

    //refresh the board to reflect new game settings and recenter player
    renderBoard();
    movePlayer('center');
}