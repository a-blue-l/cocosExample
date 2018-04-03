"use strict";
cc._RF.push(module, 'c362bEv+ZhLuKqb+gBz4N0w', 'game');
// scripts/game.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 文字部分
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        startBtn: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        this.falsg = true;
        this.score = 0;
        this.randomNum = 8; //消失时间
        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawnNewStar();
        this.startBtn.on(cc.Node.EventType.TOUCH_START, function () {
            cc.director.loadScene('game');
            _this.player.enabled = true;
        });
        this.startBtn.setPositionX(3000);
    },
    spawnNewStar: function spawnNewStar() {
        var newStar = cc.instantiate(this.starPrefab);
        this.starDuration = this.randomNum;
        this.timer = 0;
        this.node.addChild(newStar);
        this.currntStar = newStar;
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent('star').game = this;
    },

    // 随机获得位置
    getNewStarPosition: function getNewStarPosition() {
        var randX = 0;
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 40;
        var maxX = this.node.width / 2;
        randX = cc.randomMinus1To1() * maxX;

        return cc.p(randX, randY);
    },
    start: function start() {},
    gameOver: function gameOver() {
        // 游戏结束
        this.startBtn.setPositionX(0);
        this.player.enabled = false;
        this.falsg = false;
        this.player.destroy();
        this.currntStar.destroy();
        this.player.stopAllActions(); //停止动画
        // cc.director.loadScene('game');
    },
    update: function update(dt) {
        if (!this.falsg) {
            return;
        }
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },
    getNewScore: function getNewScore() {
        this.score += 1;
        this.scoreDisplay.string = 'score : ' + this.score.toString();
    }
});

cc._RF.pop();