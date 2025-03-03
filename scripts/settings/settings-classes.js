class Setting {
    constructor(name) {
        this._settingName = name;
    }

    get settingName() {
        return this._settingName;
    }
}

export class NumericalSetting extends Setting {
    constructor(name, defaultValue, increment, minVal) {
        super(name);
        this._defaultValue = defaultValue;
        this._increment = increment;
        this._minVal = minVal;
    }

    get defaultValue() {
        return this._defaultValue;
    }

    get increment() {
        return this._increment;
    }

    get minVal() {
        return this._minVal;
    }
}

export class ModalSetting extends Setting {
    constructor(name, values) {
        super(name);
        this._values = values;
    }

    get values() {
        return this._values;
    }
}