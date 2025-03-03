import { NumericalSetting, ModalSetting } from "./settings-classes.js";

//declare terrain colors
class Terrain {
    constructor(terrainName, terrainColor) {
        this._terrainName = terrainName;
        this._terrainColor = terrainColor;
    }

    get terrainName() {
        return this._terrainName;
    }

    get terrainColor() {
        return this._terrainColor;
    }
}

const terrainValues = [
    new Terrain("Desert", "#f8da7f"), 
    new Terrain("Grass", "#9bcf3d"),
    new Terrain("Snow", "#cafeff")
];

//declare each setting
const boardSizeSetting = new NumericalSetting("board-size", 9, 2, 9);
const difficultySetting = new NumericalSetting("difficulty", 1, 0.1, 1);
const terrainSetting = new ModalSetting("terrain", terrainValues);

//export all settings as an array
export const settings = [boardSizeSetting, difficultySetting, terrainSetting];