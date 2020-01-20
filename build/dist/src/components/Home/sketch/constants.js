"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = /** @class */ (function () {
    /**
     * constructor
     * @param p5Instance an instance of the p5 class
     */
    function Constants(p5Instance) {
        this._p5 = p5Instance;
    }
    Object.defineProperty(Constants.prototype, "backgroundColor", {
        get: function () {
            return this._p5.color(160, 183, 117);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants.prototype, "canvasSize", {
        get: function () {
            return [600, 600];
        },
        enumerable: true,
        configurable: true
    });
    return Constants;
}());
exports.Constants = Constants;
//# sourceMappingURL=constants.js.map