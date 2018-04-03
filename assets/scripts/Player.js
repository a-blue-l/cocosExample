cc.Class({
    extends: cc.Component,

    properties: {
        // 跳跃高度
        jumpHeight: 0,
        // 跳跃持续需时间
        jumpDuration: 0,
        // 最大移动速度
        MaxMoveSpeed: 0,
        // 加速度
        accel: 0
    },

    // LIFE-CYCLE CALLBACKS:
    // 跳跃动画
    setJumpAction () {
        // 创建动作
        // 向上跳跃
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 向下掉落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },
    // 控制部分
    setInputControl () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event){
                switch(keyCode) {
                    case cc.KEY.a:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.d:
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                }
            },
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                        self.accRight = false;
                        break;
                }
            }
        } ,self.node);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){
                var touchLoc = touch.getLocation();
                if (touchLoc.x > cc.winSize.width / 2) {
                    self.accLeft = false;
                    self.accRight = true;
                } else {
                    self.accLeft = true;
                    self.accRight = false;
                }
            },
            onTouchEnded: function(touch, event) {
                self.accLeft = false;
                self.accRight = false;
            }
        } ,self.node);
    },

    onLoad () {
        // 初始化函数
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        this.accLeft = false;
        this.accRight = false;

        this.xSpeed = 0;
        
        this.setInputControl();
    },
    start () {

    },

    update (dt) {
        if (this.accLeft) {
            this.xSpeed -= this.accel*dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel*dt;
        }

        if (Math.abs(this.xSpeed) > this.MaxMoveSpeed) {
            this.xSpeed = this.MaxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        // 更新位置
        this.node.x += this.xSpeed * dt;
    },
});
