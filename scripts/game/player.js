import { readCookie } from "../read-cookie.js"

export const player = {
    _rCoord: parseInt(readCookie('player-r-coord')),
    _cCoord: parseInt(readCookie('player-c-coord')),

    get rCoord() {
        return this._rCoord;
    },

    get cCoord() {
        return this._cCoord;
    },

    set rCoord(newVal) {
        if (typeof newVal !== 'number') {
            console.log(`New row co-ordinate not set; must be a number`)
        } else if (newVal > readCookie('board-size') || newVal <= 0) {
            console.log(`New row co-ordinate not set; there is no row '${newVal}'`);
        } else {
            document.cookie = `player-r-coord=${newVal}; max-age=${10 ** 9}`;
            this._rCoord = parseInt(readCookie('player-r-coord'));
        }
        console.log(document.cookie);
    },

    set cCoord(newVal) {
        if (typeof newVal !== 'number') {
            console.log(`New column co-ordinate not set; must be a number`)
        } else if (newVal > readCookie('board-size') || newVal <= 0) {
            console.log(`New column co-ordinate not set; there is no column '${newVal}'`);
        } else {
            document.cookie = `player-c-coord=${newVal}; max-age=${10 ** 9}`;
            this._cCoord = parseInt(readCookie('player-c-coord'));
        }
        console.log(document.cookie);
    }
}