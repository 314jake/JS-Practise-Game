import { readCookie } from "../read-cookie.js";
import { settings } from "./settings-themselves.js"

//display current settings in New game settings menu
function renderNumericalSetting(requestedSetting) {
    //find setting instance from 'settings' array
    const setting = settings.find((s) => s.settingName === requestedSetting);

    //set setting cookie to its default value if no value has been set (first time page load)
    if (!readCookie(setting.settingName)) {
        document.cookie = `${setting.settingName}=${setting.defaultValue}; max-age=${10 ** 9}`;
        console.log(`${setting.settingName} set to default`)
    }

    //display setting value in the appropriate DOM element if present
    const value = readCookie(setting.settingName);
    const element = document.querySelector(`#${setting.settingName}-value`);
    element.innerHTML = value;

    
    //grey out decrease arrow if reduced to minimum, otherwise black in
    const decreaseButton = document.querySelector(`#decrease-${setting.settingName}`);
    if (value <= setting.minVal) {
        decreaseButton.style.opacity = 0.3;
    } else {
        decreaseButton.style.opacity = 1;
    }
}

//increase or decrease passed NumericalSetting by its increment
export function changeNumericalSetting(requestedSetting, upOrDown) {
    //find relevant setting instance
    const changedSetting = settings.find((setting) => setting.settingName === requestedSetting);
    if (!changedSetting) {
        console.log(`setting ${requestedSetting} not found`);
        return 0;
    }

    //read value of relevant cookie
    const valueString = readCookie(changedSetting.settingName);
    let value = parseFloat(valueString);

    //create new value
    if (upOrDown === 'up') {
        value += changedSetting.increment;
    } else if (upOrDown === 'down') {
        const min = changedSetting.minVal;
        //only decrease value if above the setting's minVal
        if (value > min) {
            value -= changedSetting.increment;
        }
        //if reducing the value takes it below the setting's minVal, set it to minVal
        if (value < min) {
            value = min;
        }
    } else {
        console.log(`Value of ${changedSetting.settingName} not changed: must be passed 'up' or 'down'`);
    }

    if (value % 1 !== 0) {
        value = value.toFixed(1);
    }

    //update cookie
    document.cookie = `${changedSetting.settingName}=${value}; max-age=${10 ** 9}`;
    console.log(document.cookie);

    //render new value to DOM
    renderNumericalSetting(changedSetting.settingName);
}

//display current terrain setting in the New game settings menu
function renderTerrainSetting() {
    //set terrain cookie to a default value if no value has been set (first time page load)
    if(!readCookie('terrain')) {
        document.cookie = `terrain=0; max-age=${10 ** 9}`;
        console.log(`terrain set to default`);
    }

    //update css of terrain DOM element with values of selected terrain
    const value = readCookie('terrain');
    const terrainSetting = settings.find((s) => s.settingName === 'terrain');
    const terrainDisplay = document.querySelector("#terrain-value");
    terrainDisplay.innerHTML = terrainSetting.values[value].terrainName;
    terrainDisplay.style.backgroundColor = terrainSetting.values[value].terrainColor;
}

//TODO: update the terrain setting to next or previous value
export function changeTerrainSetting(prevOrNext) {
    //read necessary data
    const valueString = readCookie('terrain');
    let value = parseInt(valueString);
    const terrainSetting = settings.find((s) => s.settingName === 'terrain');
    const numValues = terrainSetting.values.length;
    //update value
    if (prevOrNext === 'prev') {
        if (value === 0) {
            value = numValues -1;
        } else {
            value--;
        }
    } else if (prevOrNext === 'next') {
        if (value === numValues - 1) {
            value = 0;
        } else {
            value++;
        }
    } else {
        console.log(`terrain not changed: not passed 'prev' or 'next'`);
    }
    //update cookie
    document.cookie = `terrain=${value}; max-age=${10 ** 9}`;
    console.log(document.cookie);

    //update DOM to reflect new value
    renderTerrainSetting();
}

//update every setting's display with up-to-date value
export function renderAllSettings() {
    //render numerical settings
    settings.forEach(setting => {
        //the setting's increment property will be truthy if it is a numerical setting
        if (setting.increment) {
            renderNumericalSetting(setting.settingName);
        }
    });

    //render terrain setting
    renderTerrainSetting();
}

//TODO add confirmation dialogue
//updates all cookies to their starting values
export function resetAllSettingsToDefault() {
    //reset numerical settings
    settings.forEach(setting => {
        //the setting's increment property will be truthy if it is a numerical setting
        if (setting.increment) {
            document.cookie = `${setting.settingName}=${setting.defaultValue}; max-age=${10 ** 9}`;
        }
    });

    //reset terrain to its (arbitrary) starting value
    document.cookie = `terrain=0; max-age=${10 ** 9}`;

    console.log(document.cookie);
    
    //re-render all settings to display new values
    renderAllSettings();
}