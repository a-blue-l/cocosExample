"use strict";
cc._RF.push(module, 'b19fdYIY2lG9aSopqEM32C8', 'star');
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