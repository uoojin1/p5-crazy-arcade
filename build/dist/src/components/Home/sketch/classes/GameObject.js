"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject = /** @class */ (function () {
    function GameObject(position) {
        this._x = position.x;
        this._y = position.y;
    }
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    return GameObject;
}());
exports.GameObject = GameObject;
//# sourceMappingURL=GameObject.js.map