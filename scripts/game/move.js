import { readCookie } from "../read-cookie.js";
import { player } from "./player.js";

export function movePlayer(to){
    //remove image from old tile
    const oldTile = document.querySelector(`#r${readCookie('player-r-coord')}c${readCookie('player-c-coord')}`);
    if (oldTile) {
        oldTile.style.backgroundImage = 'none';
    } else {
        player.rCoord = 1;
        player.cCoord = 1;
    }

    //adjust coords according to input
    switch (to) {
        case 'up':
            player.rCoord -= 1;
            break;
        case 'down':
            player.rCoord += 1;
            break;
        case 'left':
            player.cCoord -= 1;
            break;
        case 'right':
            player.cCoord += 1;
            break;
        case 'center':
            const center = Math.ceil(readCookie('board-size') / 2);
            player.rCoord = center;
            player.cCoord = center;
            console.log(document.cookie);
            break;
        default:
            console.log(`player not moved`);
    }

    //set image of new tile
    const newTile = document.querySelector(`#r${readCookie('player-r-coord')}c${readCookie('player-c-coord')}`);
    newTile.style.backgroundImage = "url('/resources/images/alien-face.webp')";
}