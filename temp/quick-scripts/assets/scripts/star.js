(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/star.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b19fdYIY2lG9aSopqEM32C8', 'star', __filename);
// scripts/star.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        pickRdius: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    getPlayerDistance: function getPlayerDistance() {
        // 获取距离
        var playPos = this.game.player.getPosition();

        var dist = cc.pDistance(this.node.position, playPos);
        return dist;
    },
    onPick: function onPick() {
        this.game.spawnNewStar();
        this.game.getNewScore();
        this.node.destroy();
    },
    start: function start() {},
    update: function update(dt) {
        if (this.getPlayerDistance() < this.pickRdius) {
            this.onPick();
            return;
        }
        // 设置透明度变化
        var opacityRadio = 1 - this.game.timer / this.game.starDuration;
        this.node.opacity = 50 + Math.floor(opacityRadio * (255 - 50));
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=star.js.map
        