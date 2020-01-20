"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var GameObject_1 = require("./GameObject");
var Bomb = /** @class */ (function (_super) {
    tslib_1.__extends(Bomb, _super);
    /**
     *
     * @param x x position of the bomb
     * @param y y position of the bomb
     * @param untilExplostion time left until explosion in milliseconds
     */
    function Bomb(x, y, untilExplostion) {
        var _this = this;
        // set position
        var position = { x: x, y: y };
        _this = _super.call(this, position) || this;
        // set planted time
        _this._plantedTime = Date.now();
        _this._exploded = false;
        console.log(_this._plantedTime);
        // set timer
        setTimeout(function () {
            console.log('exploded: true');
            _this._exploded = true;
        }, untilExplostion);
        return _this;
    }
    Object.defineProperty(Bomb.prototype, "isExploded", {
        get: function () {
            return this._exploded;
        },
        enumerable: true,
        configurable: true
    });
    return Bomb;
}(GameObject_1.GameObject));
exports.Bomb = Bomb;
//# sourceMappingURL=Bomb.js.map