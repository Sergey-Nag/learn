const CELL_SIZE = 50;
const towerHeadOffset = -15;

class LaserBullet extends Bullet {
    #lifeTime;
    #elapsedTime = 0;
    #isDamaged = false;

    constructor(options) {
        super({
            ...options,
            sprite: bulletMap.getSprite("plasma_blast_1", { scale: 0.7, y: -5 }),
        });
        this.enemies = [];
        this.laserAngle = 0;
        this.canvasWidth = 0;
        this.canvasHeight = 0;

        // Convert speed (pixels per second) to lifetime (milliseconds)
        this.#lifeTime = this.speed; // Multiply by 1000 to get milliseconds
    }


    update(state){
        this.canvasWidth = state.width;
        this.canvasHeight = state.height;
        if (!this.target || !this.isActive) {
            return;
        }

        this.enemies = this.filterEnemiesInLaserPath(state.enemies);

        this.#elapsedTime += state.deltaTime * 1000; // Convert deltaTime to milliseconds

        if (this.#elapsedTime >= this.#lifeTime) {
            this.isActive = false;
        } else if (!this.#isDamaged) {
            this.enemies.forEach((enemy) => {
                enemy.takeDamage(this.damage);
            });
            this.#isDamaged = true;
        }
    }
    
    filterEnemiesInLaserPath(enemies) {
        const laserEnd = this.calculateLaserEndPoint();
        return enemies.filter((enemy) => {

            // Check if the enemy intersects with the laser line
            const intersects = this.lineIntersectsCircle(
                this.centerX, this.centerY, laserEnd.x, laserEnd.y,
                enemy.centerX, enemy.centerY, enemy.width / 2
            );

            return intersects;
        });
    }
    
    calculateLaserEndPoint() {
        const angle = this.laserAngle;
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);

        let t1 = (0 - this.centerX) / dx;
        let t2 = (this.canvasWidth - this.centerX) / dx;
        let t3 = (0 - this.centerY) / dy;
        let t4 = (this.canvasHeight - this.centerY) / dy;

        const ts = [t1, t2, t3, t4].filter(t => t > 0);
        const t = Math.min(...ts);

        return {
            x: this.centerX + dx * t,
            y: this.centerY + dy * t
        };
    }

    lineIntersectsCircle(x1, y1, x2, y2, cx, cy, r) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const a = dx * dx + dy * dy;
        const b = 2 * (dx * (x1 - cx) + dy * (y1 - cy));
        const c = cx * cx + cy * cy + x1 * x1 + y1 * y1 - 2 * (cx * x1 + cy * y1) - r * r;
        const discriminant = b * b - 4 * a * c;

        return discriminant >= 0;
    }

    rotateTo(angle) {
        this.laserAngle = angle;
    }

    render(ctx) {
        const laserEnd = this.calculateLaserEndPoint();
        const laserLength = Math.sqrt(
            Math.pow(laserEnd.x - this.centerX, 2) + 
            Math.pow(laserEnd.y - this.centerY, 2)
        );
        const segmentWidth = this.sprite.width * this.sprite.scale;
        const numSegments = Math.ceil(laserLength / segmentWidth);

        ctx.save();
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate(this.laserAngle);

        const opacity = Math.max(0, 1 - (this.#elapsedTime / this.#lifeTime));
        ctx.globalAlpha = opacity;

        for (let i = 0; i < numSegments; i++) {
            this.sprite.render(ctx, (i * segmentWidth) + this.sprite.width / 2, 0);
        }

        ctx.restore();

        this.enemies.forEach((enemy) => {
            ctx.strokeStyle = 'red';
            ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
        });
    }
}

class RangeBullet extends Bullet {
    constructor(options) {
        super(options)
        this.damageRange = options.damageRange ?? 100;
        this.enemies = []
    }

    update(state) {
        this.enemies = state.enemies;
        super.update(state);
    }

    hit() {
        if (this.target && this.target.isActive) {
            this.target.takeDamage(this.damage);
            this.filterEnemiesInRange(this.enemies).forEach(({enemy, distance}) => {
                const percents = distance / this.damageRange * 100
                enemy.takeDamage(this.damage * (1 - percents / 100));
            });
        }
        this.isActive = false;
    }

    filterEnemiesInRange(enemies) {
        return enemies.reduce((acc, enemy) => {
            const distance = GameMath.distance(this.centerX, this.centerY, enemy.centerX, enemy.centerY);
            if (distance <= this.damageRange) {
                acc.push({
                    enemy, distance,
                })
            }
            return acc;
        }, []);
    }

}

class BaseTower extends Tower {
    constructor(options) {
        super(options);
        this.headSprite = options.headSprite || null;
        this.headAngle = 0;
    }

    update(state) {
        super.update(state);

        if (this.target) {
            this.headAngle = this.calculateAngle(this.target.centerX, this.target.centerY);
        }

        if (this.headSprite) {
            this.headSprite.update(state);
        }
    }

    render(ctx, debug) {
        super.render(ctx, debug);

        if (this.headSprite) {
            this.headSprite.render(ctx, this.centerX, this.centerY)
        }
    }

    calculateAngle(targetX, targetY) {
        // const dx = targetX - this.x;
        // const dy = targetY - this.y;
        // const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const { x, y } = this.bulletOffset;
        return GameMath.angle(this.centerX + x, this.centerY + y, targetX, targetY) * (180 / Math.PI)
    }

    getDistanceToEnemy(enemy) {
        const distance = Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2);
        return distance - enemy.width / 2;
    }
}

class ArcherTower extends BaseTower {
    constructor({ x, y }) {
        super({
            x,
            y,
            width: CELL_SIZE,
            height: CELL_SIZE,
            range: 100,
            fireRate: 5,
            bulletClass: Bullet,
            bulletOptions: {
                speed: 200,
                damage: 5,
                sprite: textureMap.getSprite('archer_1_arrow', { scale: 0.6, rotate: 90 }),
            },
            bulletOffset: {
                x: 0,
                y: towerHeadOffset
            },
            sprite: textureMap.getSprite('archer_1_base', { scale: 0.7, y: -5 }),
            headSprite: textureMap.getSprite('archer_1_top', { scale: 0.7, y: towerHeadOffset}),
        });
    }

    update(state) {
        super.update(state);

        if (this.target) {
            this.updateHeadSprite();
        }
    }

    updateHeadSprite() {
        // const dx = this.target.x - this.x;
        // const dy = this.target.y - this.y;
        // const angle = Math.atan2(dy, dx);
        this.headSprite.rotate = this.headAngle;
    }
}

class CannonTower extends BaseTower {
    constructor({ x, y }) {
        super({
            x,
            y,
            width: CELL_SIZE,
            height: CELL_SIZE,
            range: 100,
            fireRate: 5,
            bulletClass: RangeBullet,
            bulletOptions: {
                speed: 200,
                damage: 5,
                sprite: textureMap.getSprite('granade', { scale: 0.6, rotate: 10 }),
            },
            bulletOffset: {
                x: 0,
                y: towerHeadOffset
            },
            sprite: textureMap.getSprite('cannon_1_base', { scale: 0.7, y: -5 }),
            headSprite: textureMap.getSprite('cannon_1_top_1', { scale: 0.7, y: towerHeadOffset}),
        });

        this.headSpriteMap = {
            0: textureMap.getSprite('cannon_1_top_1', { scale: 0.7, y: towerHeadOffset}),
            15: textureMap.getSprite('cannon_1_top_2', { scale: 0.7, y: towerHeadOffset}),
            30: textureMap.getSprite('cannon_1_top_3', { scale: 0.7, y: towerHeadOffset}),
            45: textureMap.getSprite('cannon_1_top_4', { scale: 0.7, y: towerHeadOffset}),
            60: textureMap.getSprite('cannon_1_top_5', { scale: 0.7, y: towerHeadOffset}),
            75: textureMap.getSprite('cannon_1_top_6', { scale: 0.7, y: towerHeadOffset}),
            90: textureMap.getSprite('cannon_1_top_7', { scale: 0.7, y: towerHeadOffset}),
            105: textureMap.getSprite('cannon_1_top_8', { scale: 0.7, y: towerHeadOffset}),
            120: textureMap.getSprite('cannon_1_top_9', { scale: 0.7, y: towerHeadOffset}),
            135: textureMap.getSprite('cannon_1_top_10', { scale: 0.7, y: towerHeadOffset}),
            150: textureMap.getSprite('cannon_1_top_11', { scale: 0.7, y: towerHeadOffset}),
            165: textureMap.getSprite('cannon_1_top_12', { scale: 0.7, y: towerHeadOffset}),
            180: textureMap.getSprite('cannon_1_top_13', { scale: 0.7, y: towerHeadOffset}),
            [-165]: textureMap.getSprite('cannon_1_top_14', { scale: 0.7, y: towerHeadOffset}),
            [-150]: textureMap.getSprite('cannon_1_top_15', { scale: 0.7, y: towerHeadOffset}),
            [-135]: textureMap.getSprite('cannon_1_top_16', { scale: 0.7, y: towerHeadOffset}),
            [-120]: textureMap.getSprite('cannon_1_top_17', { scale: 0.7, y: towerHeadOffset}),
            [-105]: textureMap.getSprite('cannon_1_top_18', { scale: 0.7, y: towerHeadOffset}),
            [-90]: textureMap.getSprite('cannon_1_top_19', { scale: 0.7, y: towerHeadOffset}),
            [-75]: textureMap.getSprite('cannon_1_top_20', { scale: 0.7, y: towerHeadOffset}),
            [-60]: textureMap.getSprite('cannon_1_top_21', { scale: 0.7, y: towerHeadOffset}),
            [-45]: textureMap.getSprite('cannon_1_top_22', { scale: 0.7, y: towerHeadOffset}),
            [-30]: textureMap.getSprite('cannon_1_top_23', { scale: 0.7, y: towerHeadOffset}),
            [-15]: textureMap.getSprite('cannon_1_top_24', { scale: 0.7, y: towerHeadOffset}),
        };
    }

    update(state) {
        super.update(state);

        if (this.target) {
            this.updateHeadSprite();
        }
    }

    updateHeadSprite() {
        let closestAngle = Object.keys(this.headSpriteMap).reduce((prev, curr) => {
            return Math.abs(curr - this.headAngle) < Math.abs(prev - this.headAngle) ? curr : prev;
        });
        this.headSprite = this.headSpriteMap[closestAngle];
    }
}

class FireTower extends BaseTower {
    constructor({ x, y }) {
        super({
            x,
            y,
            width: CELL_SIZE,
            height: CELL_SIZE,
            range: 100,
            fireRate: 1,
            bulletClass: Bullet,
            bulletOptions: {
                speed: 200,
                damage: 5,
                sprite: bulletMap.getAnimatedSprite([
                    
                    "flame_01",
                    "flame_02",
                    "flame_03",
                    "flame_22",
                    "flame_26",
                    "flame_27",
                    "flame_28",
                    "flame_29",

                    // "flame_01",
                    // "flame_02",
                    // "flame_03",
                    // "flame_04",
                    // "flame_05",
                    // "flame_06",
                    // "flame_07",
                    // "flame_08",
                    // "flame_09",
                    // "flame_10",
                    // "flame_11",
                    // "flame_12",
                    // "flame_13",
                    // "flame_14",
                    // "flame_15",
                    // "flame_16",
                    // "flame_17",
                    // "flame_18",
                    // "flame_19",
                    // "flame_20",
                    // "flame_21",
                    // "flame_22",
                    // "flame_23",
                    // "flame_24",
                    // "flame_25",
                    // "flame_26",
                    // "flame_27",
                    // "flame_28",
                    // "flame_29",
                ],{ scale: 0.7, y: -5, rotate: 180, frameDuration: 0.09 }),
            },
            bulletOffset: {
                x: 0,
                y: towerHeadOffset
            },
            sprite: textureMap.getSprite('fire_1_base', { scale: 0.7, y: -5 }),
            headSprite: textureMap.getAnimatedSprite([
                'fire_01',
                'fire_02',
                'fire_03',
                'fire_04',
                'fire_05',
                'fire_06',
                'fire_07',
                'fire_08',
                'fire_09',
                'fire_10',
                'fire_11',
                'fire_12',
                'fire_13',
                'fire_14',
                'fire_15',
                'fire_16',
                'fire_17',
                'fire_18',
                'fire_19',
                'fire_20',
                'fire_21',
                'fire_22',
                'fire_23',
            ], { scale: 0.9, y: towerHeadOffset}),
        });
    }

    update(state) {
        super.update(state);
    }
}

class ElectricTower extends BaseTower {
    constructor({ x, y }) {
        super({
            x,
            y,
            width: CELL_SIZE,
            height: CELL_SIZE,
            range: 100,
            fireRate: 5,
            bulletClass: Bullet,
            bulletOptions: {
                speed: 200,
                damage: 5,
                sprite: bulletMap.getAnimatedSprite([
                    "bolt_01",
                    "bolt_02",
                    "bolt_03",
                    "bolt_04",
                    "bolt_05",
                    "bolt_06",
                    "bolt_07",
                    "bolt_08",
                    "bolt_09",
                    "bolt_10",
                    "bolt_11",
                    "bolt_12",
                    "bolt_13",
                ],{ scale: 0.7, y: -5 }),
            },
            bulletOffset: {
                x: 0,
                y: towerHeadOffset
            },
            sprite: textureMap.getSprite('fire_2_base', { scale: 0.7, y: -5 }),
            headSprite: textureMap.getAnimatedSprite([
                "electricity_01",
                "electricity_02",
                "electricity_03",
                "electricity_04",
                "electricity_05",
                "electricity_06",
                "electricity_07",
                "electricity_08",
                "electricity_09",
                "electricity_10",
                "electricity_11",
            ], { scale: 0.7, y: towerHeadOffset}),
        });
    }

    update(state) {
        super.update(state);
    }
}
class LaserTower extends BaseTower {
    constructor({ x, y }) {
        super({
            x,
            y,
            width: CELL_SIZE,
            height: CELL_SIZE,
            range: 100,
            fireRate: 1,
            bulletClass: LaserBullet,
            bulletOptions: {
                speed: 1000,
                damage: 25,
            },
            bulletOffset: {
                x: 0,
                y: towerHeadOffset
            },
            sprite: textureMap.getSprite('fire_3_base', { scale: 0.7, y: -5 }),
            headSprite: textureMap.getAnimatedSprite([
                "plasma_01", "plasma_02", "plasma_03", "plasma_04",
                "plasma_05", "plasma_06", "plasma_07", "plasma_08",
                "plasma_09", "plasma_10", "plasma_11", "plasma_12",
                "plasma_13", "plasma_14", "plasma_15", "plasma_16",
                "plasma_17",
            ], { scale: 0.7, y: towerHeadOffset }),
        });

        this.targets = [];
        this.laserAngle = 0;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
    }

    // update(state) {
    //     super.update(state);
    //     this.canvasWidth = state.width;
    //     this.canvasHeight = state.height;

    //     this.targets = this.filterEnemiesInLaserPath(state.enemies);

    //     if (this.targets.length > 0) {
    //         this.target = this.targets[0]; // Target the first enemy in the path
    //         this.laserAngle = this.calculateLaserAngle();
    //         this.headAngle = this.laserAngle * (180 / Math.PI); // Convert to degrees for the head sprite
    //     } else {
    //         this.target = null;
    //     }

    //     const timeSinceLastFire = (state.time - this.lastFireTime) * state.gameSpeed;

    //     if (this.target && timeSinceLastFire > 1000 / (this.fireRate * state.gameSpeed)) {
    //         this.fire(state);
    //         this.lastFireTime = state.time;
    //     }

    //     this.bullets = this.bullets.filter(bullet => bullet.isActive);
    //     this.bullets.forEach(bullet => bullet.update(state));
    // }

    filterEnemiesInLaserPath(enemies) {
        const laserEnd = this.calculateLaserEndPoint();
        
        return enemies.filter((enemy) => {
            const distanceToEnemy = this.getDistanceToEnemy(enemy);
            if (distanceToEnemy > this.range) {
                return false;
            }

            // Check if the enemy intersects with the laser line
            const intersects = this.lineIntersectsCircle(
                this.centerX, this.centerY, laserEnd.x, laserEnd.y,
                enemy.centerX, enemy.centerY, enemy.width / 2
            );

            return intersects;
        });
    }

    calculateLaserAngle() {
        if (this.target) {
            return Math.atan2(this.target.centerY - this.centerY, this.target.centerX - this.centerX);
        }
        return this.laserAngle; // Return the last known angle if there's no target
    }

    calculateLaserEndPoint() {
        const angle = this.laserAngle;
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);

        let t1 = (0 - this.centerX) / dx;
        let t2 = (this.canvasWidth - this.centerX) / dx;
        let t3 = (0 - this.centerY) / dy;
        let t4 = (this.canvasHeight - this.centerY) / dy;

        const ts = [t1, t2, t3, t4].filter(t => t > 0);
        const t = Math.min(...ts);

        return {
            x: this.centerX + dx * t,
            y: this.centerY + dy * t
        };
    }

    lineIntersectsCircle(x1, y1, x2, y2, cx, cy, r) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const a = dx * dx + dy * dy;
        const b = 2 * (dx * (x1 - cx) + dy * (y1 - cy));
        const c = cx * cx + cy * cy + x1 * x1 + y1 * y1 - 2 * (cx * x1 + cy * y1) - r * r;
        const discriminant = b * b - 4 * a * c;

        return discriminant >= 0;
    }

    fire(state) {
        if (this.target) {
            const bullet = new this.bulletClass({
                damage: this.damage * state.gameSpeed,
                target: this.target,
                origin: { 
                    x: this.centerX + this.bulletOffset.x,
                    y: this.centerY + this.bulletOffset.y,
                },
                speed: 300 * state.gameSpeed,
                ...this.bulletOptions
            });
            const angle = GameMath.angle(this.centerX, this.centerY, this.target.centerX, this.target.centerY);
            bullet.rotateTo(angle);
            this.bullets.push(bullet);
        }
    }
}