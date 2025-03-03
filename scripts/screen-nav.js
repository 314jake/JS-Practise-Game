import { readCookie } from "./read-cookie.js";

//initialise cookie to New game menu for new users
if (!readCookie('screen')) {
    document.cookie = `screen=newGameMenu; max-age=${10 ** 9}`;
}

//declare screens
class Screen {
    constructor(name, element, displayType) {
        this._name = name;
        this._element = element;
        this._displayType = displayType;
    }

    get name() {
        return this._name;
    }

    get element() {
        return this._element;
    }

    get displayType() {
        return this._displayType;
    }
}

const newGameMenuScreen = new Screen("newGameMenu", document.querySelector('#game-start-options-c'), 'block');
const gameScreen = new Screen('game', document.querySelector('#game-c'), 'flex');

const screens = [newGameMenuScreen, gameScreen];

//display screen indicated by cookie, hiding all others
function renderScreen() {
    const currScreen = readCookie('screen');
    screens.forEach(screen => {
        if (screen.name === currScreen) {
            screen.element.style.display = screen.displayType;
        } else {
            screen.element.style.display = 'none';
        }
    });
}

//navigate to passed screen by name
export function navigateToScreen(screen) {
    //truthy if requested screen exists
    const targetScreen = screens.find(s => s.name === screen);
    if (!targetScreen) {
        console.log(`screen name not found`);
    }

    //update cookie and display if so
    if (targetScreen.name) {
        document.cookie = `screen=${screen}; max-age=${10 ** 9}`;
        console.log(document.cookie);
        renderScreen();
    }
}