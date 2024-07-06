const enemyScale = 0.7;
const enemyAnimationFrameDuration = 0.055;

class BaseEnemy extends Enemy {
    constructor(options) {
        super(options);
        this.spriteMap = options.spriteMap || {};
        this.currentEnemySprite = this.enemySpriteMap?.[0];
        this.direction = 'right';
        this.sprite = this.spriteMap.right;
    }

    update(state) {
        super.update(state);

        if (this.isMovingRight) {
            this.direction = 'right';
        } else if (this.isMovingLeft) {
            this.direction = 'left';
        } else if (this.isMovingDown) {
            this.direction = 'down';
        } else if (this.isMovingUp) {
            this.direction = 'up';
        }

        this.sprite = this.spriteMap[this.direction];
    }
}