const COLORS = {
    GREEN: '#4ea94e',
    GREY: {
        LIGHT: '#dddddd',
        MEDIUM: '#b9b9b9'
    }
}

const DEBUG = {
    FONT: '14px Arial',
}
// region TDGame
class TDGame {
    static EVENTS = {
        GAME_OVER: 'game-over',
        GAME_START: 'game-start',
        GAME_PAUSE: 'game-pause',
        GAME_RESUME: 'game-resume',
        ENEMY_KILLED: 'enemy-killed',
        ENEMY_FINISHED: 'enemy-finished',
    };

    #initState = {};

    /**
     * @param {Object} options
     * @param {HTMLCanvasElement} options.canvas
     * @param {number} options.width
     * @param {number} options.height
     * @param {number} options.frameRate
     * @param {number} options.cellSize
     * @param {GameMap} options.map
     * @param {number} [options.gameSpeed=1]
     */
    constructor({ canvas, width, height, frameRate, cellSize, map, gameSpeed = 1 }) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.frameRate = frameRate;
        this.cellSize = cellSize;
        this.gameSpeed = gameSpeed;

        this.map = map;
        this.enemies = [];
        this.towers = [];
        this.entities = [];

        this.isPaused = false;
        this.debug = false;
        this.fps = 0;
        this.lastFrameTime = 0;
        this.frameInterval = 1000 / this.frameRate;
        this.events = new EventEmitter();
    }

    /**
     * Start the game loop
     * @returns {void}
     * @memberof TDGame
     * @emits TDGame.EVENTS.GAME_START
     */
    start() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.init();
        this.events.emit(TDGame.EVENTS.GAME_START);
        this.lastFrameTime = performance.now();
        this.#gameLoop();
    }

    /**
     * End the game
     * @returns {void}
     * @memberof TDGame
     * @emits TDGame.EVENTS.GAME_OVER
     */
    end() {
        this.isPaused = true;
        this.enemies = [];
        this.towers = [];
        this.entities = [];
        this.lastFrameTime = 0;
        this.events.emit(TDGame.EVENTS.GAME_OVER);
    }

    /**
     * Pause the game
     * @returns {void}
     * @memberof TDGame
     * @emits TDGame.EVENTS.GAME_PAUSE
     */
    pause() {
        this.isPaused = true;
        this.events.emit(TDGame.EVENTS.GAME_PAUSE);
    }

    /**
     * Resume the game
     * @returns {void}
     * @memberof TDGame
     * @emits TDGame.EVENTS.GAME_RESUME
     */
    resume() {
        this.isPaused = false;
        this.lastFrameTime = performance.now();
        this.events.emit(TDGame.EVENTS.GAME_RESUME);
        this.#gameLoop();
    }

    #gameLoop(currentTime = performance.now()) {
        if (this.isPaused) return;

        requestAnimationFrame(this.#gameLoop.bind(this));

        const elapsed = currentTime - this.lastFrameTime;

        if (elapsed > this.frameInterval) {
            this.lastFrameTime = currentTime - (elapsed % this.frameInterval);

            const deltaTime = elapsed / 1000;
            this.update(deltaTime);
            this.render();

            this.fps = Math.round(1000 / elapsed);
        }
    }

    /**
     * Update the game state
     * @param {number} deltaTime
     * @returns {void}
     * @memberof TDGame
     */
    update(deltaTime) {
        const state = {
            width: this.width,
            height: this.height,
            cellSize: this.cellSize,
            gameSpeed: this.gameSpeed,
            deltaTime: deltaTime * this.gameSpeed,
            time: this.lastFrameTime,
            enemies: this.enemies,
            towers: this.towers,
        };

        this.map.update(state);
        this.enemies.forEach(enemy => {
            enemy.update(state)

            if (enemy.isFinished || enemy.isDead) {
                this.removeEnemy(enemy);
            }
        });
        this.towers.forEach(tower => tower.update(state));
        this.entities.forEach(entity => entity.update(state));
    }

    /**
     * Render the game
     * @returns {void}
     * @memberof TDGame
     */
    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.map.render(this.ctx, this.debug);
        this.enemies.forEach(enemy => enemy.render(this.ctx, this.debug));
        this.towers.forEach(tower => tower.render(this.ctx, this.debug));
        this.entities.forEach(entity => entity.render(this.ctx, this.debug));

        if (this.debug) {
            this.#renderDebugInfo();
        }
    }

    /**
     * Initialize the game
     * @returns {void}
     * @memberof TDGame
     */
    init() {
        this.#initState = {
            width: this.width,
            height: this.height,
            cellSize: this.cellSize,
            gameSpeed: this.gameSpeed,
        };

        this.map.init(this.#initState);
        this.enemies.forEach(enemy => enemy.init?.(this.#initState));
        this.towers.forEach(tower => tower.init?.(this.#initState));
        this.entities.forEach(entity => entity.init?.(this.#initState));
    }

    #renderDebugInfo() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, 70, 20);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`FPS: ${this.fps}`, 5, 15);
    }

    /**
     * Subscribe to game events
     * @param {TDGame.EVENTS} event
     * @param {Function} callback
     * @returns {void}
     * @memberof TDGame
     */
    on(event, callback) {
        this.events.on(event, callback);
    }

    /**
     * Set the game frame rate
     * @param {number} newFrameRate
     * @returns {void}
     * @memberof TDGame
     */
    setFrameRate(newFrameRate) {
        this.frameRate = newFrameRate;
        this.frameInterval = 1000 / this.frameRate;
    }

    /**
     * Add a new tower
     * @param {Tower} tower
     * @returns {void}
     * @memberof TDGame
     */
    addTower(tower) {
        tower.init(this.#initState);
        this.towers.push(tower);
    }

    /**
     * Get the enemy at the specified position
     * @param {Object} position
     * @param {number} [position.x]
     * @param {number} [position.y]
     * @param {number} [position.col]
     * @param {number} [position.row]
     * @returns {Tower | undefined}
     * @memberof TDGame
     */
    getTowerAt(position) {
        const { x, y } = this.map.getCell(position);
        return this.towers.find(tower => tower.x === x && tower.y === y);
    }

    /**
     * Remove a tower from the game
     * @param {Tower} tower
     * @returns {void}
     * @memberof TDGame
     */
    removeTower(tower) {
        const index = this.towers.indexOf(tower);
        if (index > -1) {
            this.towers.splice(index, 1);
        }
    }

    /**
     * Spawn a new enemy
     * @param {Enemy} enemy
     * @returns {void}
     * @memberof TDGame
     * @emits TDGame.EVENTS.ENEMY_SPAWNED
     */
    addEnemy(enemy) {
        enemy.setGameEvents(this.events);
        this.enemies.push(enemy);
        this.events.emit(TDGame.EVENTS.ENEMY_SPAWNED, enemy);
    }

    /**
     * Remove an enemy from the game
     * @param {Enemy} enemy
     * @returns {void}
     * @memberof TDGame
     */
    removeEnemy(enemy) {
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.enemies.splice(index, 1);
        }
    }

    /**
     * Add a new entity to the game
     * @param {Entity} entity
     * @returns {void}
     * @memberof TDGame
     */
    addEntity(entity) {
        this.entities.push(entity);
    }

    /**
     * Get the entity at the specified position
     * @param {Object} position
     * @param {number} [position.x]
     * @param {number} [position.y]
     * @param {number} [position.col]
     * @param {number} [position.row]
     * @returns {Entity | undefined}
     * @memberof TDGame
     */
    getEntityAt(position) {
        const { x, y } = this.map.getCell(position);
        return this.entities.find(entity => entity.x === x && entity.y === y);
    }

    /**
     * Remove an entity from the game
     * @param {Entity} entity
     * @returns {void}
     * @memberof TDGame
     */
    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }
}

// region Entity
class Entity {
    debug = false;

    /**
     * @param {Object} options
     * @param {number} [options.x=0]
     * @param {number} [options.y=0]
     * @param {number} [options.width=10]
     * @param {number} [options.height=10]
     * @param {string} [options.color='white']
     * @param {Sprite} [options.sprite=null]
     */
    constructor({ x = 0, y = 0, width = 10, height = 10, color = 'white', sprite = null } = {}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.sprite = sprite;
    }

    /**
     * X coordinate of the center of the entity
     * @type {number}
     * @memberof Entity
     */
    get centerX() {
        return this.x + this.width / 2;
    }

    /**
     * Y coordinate of the center of the entity
     * @type {number}
     * @memberof Entity
     */
    get centerY() {
        return this.y + this.height / 2;
    }

    set centerX(value) {
        this.x = value - this.width / 2;
    }

    set centerY(value) {
        this.y = value - this.height / 2;
    }

    /**
     * Left coordinate of the entity
     * @type {number}
     * @memberof Entity
     * @readonly
     */
    get left() {
        return this.x;
    }

    /**
     * Right coordinate of the entity
     * @type {number}
     * @memberof Entity
     * @readonly
     */
    get right() {
        return this.x + this.width;
    }

    /**
     * Top coordinate of the entity
     * @type {number}
     * @memberof Entity
     * @readonly
     */
    get top() {
        return this.y;
    }

    /**
     * Bottom coordinate of the entity
     * @type {number}
     * @memberof Entity
     * @readonly
     */
    get bottom() {
        return this.y + this.height;
    }

    /**
     * Initialize the entity
     * @param {Object} state
     * @returns {void}
     * @memberof Entity
     * @abstract
     */
    init(state) { }

    /**
     * Render the entity
     * @param {CanvasRenderingContext2D} ctx
     * @param {boolean} debug
     * @returns {void}
     * @memberof Entity
     */
    render(ctx, debug) {
        if (this.sprite) {
            this.sprite.render(ctx, this.centerX, this.centerY);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        if (debug) {
            ctx.globalAlpha = 0.5;
            ctx.strokeStyle = "red";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "black";
            ctx.font = DEBUG.FONT;
            ctx.fillText(`x: ${this.x.toFixed(2)}, y: ${this.y.toFixed(2)}`, this.x, this.y - 5);
            ctx.globalAlpha = 1;
        }
    }

    /**
     * Update the entity
     * @param {Object} state
     * @returns {void}
     * @memberof Entity
     */
    update(state) {
        this.debug = state.debug;

        if (this.sprite && this.sprite.isLoaded) {
            this.sprite.update(state);
        }
    }
}
// endregion Entity

// region MovingEntity
class MovingEntity extends Entity {

    /**
     * @param {Object} options
     * @param {number} [options.speed=10]
     * @param {number} [options.rotationSpeed=null]
     * @param {number} [options.angle=0]
     * @param {number} [options.targetX]
     * @param {number} [options.targetY]
     * @param {boolean} [options.isMoving=false]
     */
    constructor({ speed = 10, rotationSpeed = null, angle = 0, ...options } = {}) {
        super(options);
        this.speed = speed
        this.rotationSpeed = rotationSpeed;
        this.angle = angle;
        this.targetX = this.x;
        this.targetY = this.y;
        this.isMoving = false;
    }

    /**
     * Move the entity to the specified coordinates
     * @param {number} x
     * @param {number} y
     * @returns {void}
     * @memberof MovingEntity
     */
    moveTo(x, y) {
        this.targetX = x;
        this.targetY = y;
        this.isMoving = true;
    }

    /**
     * Rotate the entity to the specified angle
     * @param {number} angle
     * @returns {void}
     * @memberof MovingEntity
     */
    rotateTo(angle) {
        this.targetAngle = angle;
    }

    update(state) {
        super.update(state);

        if (this.isMoving) {
            const distanceToTarget = GameMath.distance(this.x, this.y, this.targetX, this.targetY);
            const adjustedSpeed = this.speed * state.gameSpeed * state.deltaTime;

            if (distanceToTarget > adjustedSpeed) {
                const angle = GameMath.angle(this.x, this.y, this.targetX, this.targetY);
                this.x += Math.cos(angle) * adjustedSpeed;
                this.y += Math.sin(angle) * adjustedSpeed;

                // this.x = GameMath.lerp(this.x, this.targetX, adjustedSpeed / distanceToTarget);
                // this.y = GameMath.lerp(this.y, this.targetY, adjustedSpeed / distanceToTarget);
            } else {
                this.x = this.targetX;
                this.y = this.targetY;
                this.isMoving = false;
            }
        }

        const angleDiff = GameMath.angleDifference(this.angle, this.targetAngle);
        if (this.rotationSpeed !== null && angleDiff !== 0) {
            this.angle += Math.sign(angleDiff) * this.rotationSpeed * state.gameSpeed * state.deltaTime;
        } else if (this.targetAngle !== undefined) {
            this.angle = this.targetAngle;
            this.targetAngle = undefined;
        }
    }

    render(ctx, debug) {
        ctx.save();
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate(this.angle);
        if (this.sprite && this.sprite.isLoaded) {
            this.sprite.render(ctx, 0, 0);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        }
        ctx.restore();

        if (debug) {
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = 'black';
            ctx.font = DEBUG.FONT;
            ctx.fillText(`x: ${this.x.toFixed(2)}, y: ${this.y.toFixed(2)}, angle: ${(this.angle * 180 / Math.PI).toFixed(2)}°`, this.x, this.y - 5);
            ctx.globalAlpha = 1;
        }
    }

    /**
     * Check if the entity collides with another entity
     * @param {Entity} entity
     * @returns {boolean}
     * @memberof MovingEntity
     */
    collidesWith(entity) {
        return this.right > entity.left && this.left < entity.right && this.bottom > entity.top && this.top < entity.bottom;
    }

    /**
     * @type {boolean}
     * @readonly
     * @memberof MovingEntity
     */
    get isMovingRight() {
        return this.isMoving && this.targetX > this.x;
    }

    /**
     * @type {boolean}
     * @readonly
     * @memberof MovingEntity
     */
    get isMovingLeft() {
        return this.isMoving && this.targetX < this.x;
    }

    /**
     * @type {boolean}
     * @readonly
     * @memberof MovingEntity
     */
    get isMovingUp() {
        return this.isMoving && this.targetY < this.y;
    }

    /**
     * @type {boolean}
     * @readonly
     * @memberof MovingEntity
     */
    get isMovingDown() {
        return this.isMoving && this.targetY > this.y;
    }
}
// endregion MovingEntity

// region Enemy
class Enemy extends MovingEntity {
    currentPathIndex = 0;
    gameEvents = null;
    isDead = false;
    isFinished = false;

    /**
     * @param {Object} options
     * @param {number} [options.health=100]
     * @param {{x: number, y: number}[]} [options.path=[]]
     * @param {number} [options.speed=50]
     * @param {Sprite} [options.sprite=null]
     * @param {number} [options.width=10]
     * @param {number} [options.height=10]
     * @param {number} [options.x=0]
     * @param {number} [options.y=0]
     * @param {number} [options.angle=0]
     * @param {number} [options.speed=10]
     * @param {number} [options.rotationSpeed=null]
     * @param {number} [options.targetX]
     * @param {number} [options.targetY]
     */
    constructor({ health = 100, path = [], ...options } = {}) {
        options.color = 'red';
        super(options);
        this.health = health;
        this.maxHealth = health;
        this.path = path;
        this.x = this.path[0]?.x;
        this.y = this.path[0]?.y;
    }

    /**
     * Set the game events emitter
     * @param {EventEmitter} events
     * @returns {void}
     * @memberof Enemy
     */
    setGameEvents(events) {
        this.gameEvents = events;
    }

    update(state) {
        super.update(state);

        if (this.isDead || this.isFinished || this.isMoving) {
            return;
        }

        if (this.health <= 0) {
            this.kill();
            return;
        }

        if (this.currentPathIndex >= this.path.length) {
            this.finish();
            return;
        }

        const { x, y } = this.path[this.currentPathIndex++];
        this.moveTo(x, y);
    }

    render(ctx, debug) {
        super.render(ctx, debug);

        this.renderHealthBar(ctx, debug);
    }

    /**
     * Render the health bar of the enemy
     * @param {CanvasRenderingContext2D} ctx
     * @param {boolean} debug
     * @returns {void}
     * @memberof Enemy
     */
    renderHealthBar(ctx, debug) {
        const healthPercentage = this.health / this.maxHealth;
        const healthBarWidth = this.width;
        const healthBarHeight = 4;

        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y - healthBarHeight - 2, healthBarWidth, healthBarHeight);

        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y - healthBarHeight - 2, healthBarWidth * healthPercentage, healthBarHeight);

        if (debug) {
            ctx.fillStyle = 'black';
            ctx.font = '10px Arial';
            ctx.fillText(`HP: ${this.health.toFixed(1)}`, this.x, this.y - healthBarHeight - 10);
        }
    }

    /**
     * Determine if the enemy is active: not dead and not finished
     * @type {boolean}
     * @readonly
     * @memberof Enemy
     */
    get isActive() {
        return !this.isDead && !this.isFinished;
    }

    /**
     * Damage the enemy
     * @param {number} amount
     * @returns {void}
     * @memberof Enemy
     */
    damage(amount) {
        if (this.isDead) return;

        this.health -= amount;
        if (this.health <= 0) {
            this.kill();
        }
    }

    /**
     * Kill the enemy
     * @returns {void}
     * @memberof Enemy
     * @emits TDGame.EVENTS.ENEMY_KILLED
     */
    kill() {
        if (this.isDead) return;
        this.isDead = true;
        this.gameEvents.emit(TDGame.EVENTS.ENEMY_KILLED, this);
    }

    /**
     * Finish the enemy
     * @returns {void}
     * @memberof Enemy
     * @emits TDGame.EVENTS.ENEMY_FINISHED
     */
    finish() {
        if (this.isFinished) return;
        this.isFinished = true;
        this.gameEvents.emit(TDGame.EVENTS.ENEMY_FINISHED, this);
    }

    /**
     * Alias for damage method
     * @param {number} amount
     * @returns {void}
     * @memberof Enemy
     */
    takeDamage(amount) {
        this.damage(amount);
    }
}

// endregion Enemy

// region Tower
class Tower extends Entity {
    showRange = false;

    /**
     * @param {Object} options
     * @param {number} [options.range=100]
     * @param {number} [options.damage=10]
     * @param {number} [options.fireRate=1]
     * @param {Bullet} [options.bulletClass=Bullet]
     * @param {Bullet.constructor} [options.bulletOptions={}]
     * @param {string} [options.color='blue']
     * @param {number} [options.x=0]
     * @param {number} [options.y=0]
     * @param {number} [options.width=10]
     * @param {number} [options.height=10]
     * @param {Sprite} [options.sprite=null]
     */
    constructor({ range = 100, damage = 10, fireRate = 1, bulletClass = Bullet, bulletOptions = {}, ...options }) {
        options.color = 'blue';
        super(options);
        this.range = range;
        this.damage = damage;
        this.fireRate = fireRate;
        this.lastFireTime = 0;
        this.target = null;
        this.bullets = [];
        this.bulletClass = bulletClass;
        this.bulletOptions = bulletOptions;
    }

    /**
     * Update the tower, find a target, fire bullets
     * @param {Object} state
     * @returns {void}
     * @memberof Tower
     */
    update(state) {
        super.update(state);

        if (!this.target || !this.target.isActive || this.getDistanceToEnemy(this.target) > this.range) {
            this.target = this.findEnemyInRange(state.enemies);
        }

        const timeSinceLastFire = (state.time - this.lastFireTime) * state.gameSpeed;

        if (this.target && timeSinceLastFire > 1000 / (this.fireRate * state.gameSpeed)) {
            this.fire(state);
            this.lastFireTime = state.time;
        }

        this.bullets = this.bullets.filter(bullet => bullet.isActive);
        this.bullets.forEach(bullet => bullet.update(state));
    }

    render(ctx, debug) {
        super.render(ctx, debug);
        this.bullets.forEach(bullet => bullet.render(ctx, debug));

        if (this.showRange) {
            this.renderRange(ctx);
        }

        if (debug) {
            ctx.beginPath();
            ctx.arc(this.centerX, this.centerY, this.range, 0, 2 * Math.PI);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
            ctx.stroke();
        }
    }

    /**
     * Render the range of the tower
     * @param {CanvasRenderingContext2D} ctx
     * @returns {void}
     * @memberof Tower
     */
    renderRange(ctx) {
        const gradient = ctx.createRadialGradient(this.centerX, this.centerY, 0, this.centerX, this.centerY, this.range);
        gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0)');
        gradient.addColorStop(0.7, 'rgba(255, 0, 0, 0.02)');
        gradient.addColorStop(0.99, 'rgba(255, 0, 0, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(this.centerX - this.range, this.centerY - this.range, this.range * 2, this.range * 2);
    }

    /**
     * Fire a bullet at the target
     * @param {Object} state
     * @returns {void}
     * @memberof Tower
     */
    fire(state) {
        if (this.target) {
            const bullet = new this.bulletClass({
                damage: this.damage * state.gameSpeed,
                target: this.target,
                origin: { x: this.centerX, y: this.centerY },
                speed: 300 * state.gameSpeed,
                ...this.bulletOptions
            });
            const angle = GameMath.angle(this.centerX, this.centerY, this.target.centerX, this.target.centerY);
            bullet.rotateTo(angle);
            this.bullets.push(bullet);
        }
    }

    /**
     * Find an enemy in range
     * @param {Enemy[]} enemies
     * @returns {Enemy | null}
     * @memberof Tower
     */
    findEnemyInRange(enemies) {
        let closestEnemy = null;
        let closestDistance = Infinity;

        for (const enemy of enemies) {
            const distance = this.getDistanceToEnemy(enemy);
            if (distance <= this.range && distance < closestDistance) {
                closestEnemy = enemy;
                closestDistance = distance;
            }
        }

        return closestEnemy;
    }

    /**
     * Get the distance to an enemy
     * @param {Enemy} enemy
     * @returns {number}
     * @memberof Tower
     */
    getDistanceToEnemy(enemy) {
        return GameMath.distance(this.centerX, this.centerY, enemy.centerX, enemy.centerY);
    }
}
// endregion Tower

// region Bullet
class Bullet extends MovingEntity {

    /**
     * @param {Object} options
     * @param {number} [options.damage=10]
     * @param {Enemy} [options.target=null]
     * @param {{x: number, y: number}} [options.origin={x: 0, y: 0}]
     * @param {number} [options.speed=100]
     * @param {number} [options.size=4]
     * @param {string} [options.color='yellow']
     * @param {Sprite} [options.sprite=null]
     */
    constructor({ damage, target, origin, speed = 100, ...options }) {
        super({
            x: origin.x,
            y: origin.y,
            width: 4,
            height: 4,
            color: "yellow",
            speed,
            ...options
        });
        this.damage = damage;
        this.target = target;
        this.isActive = true;
    }

    /**
     * Update the bullet, move towards the target and check for collisions
     * @param {Object} state
     * @returns {void}
     * @memberof Bullet
     */
    update(state) {
        super.update(state);

        if (!this.isActive) return;

        if (this.target && this.target.isActive) {
            this.moveTo(this.target.centerX, this.target.centerY);
            if (this.collidesWith(this.target)) {
                this.hit();
            }
        } else {
            this.isActive = false;
        }
    }

    /**
     * Hit the target
     * @returns {void}
     * @memberof Bullet
     */
    hit() {
        if (this.target && this.target.isActive) {
            this.target.takeDamage(this.damage);
        }
        this.isActive = false;
    }
}
// endregion Bullet
// region Grid
class Grid extends Entity {
    rows = 0;
    cols = 0;
    cellSize = 0;
    offsets = { x: 0, y: 0 };

    constructor({ width, height, canvasWidth = null, canvasHeight = null, cellSprite = null } = {}) {
        super({ x: 0, y: 0, width, height });
        this.canvasWidth = canvasWidth ?? width;
        this.canvasHeight = canvasHeight ?? height;
        this.cellSprite = cellSprite;
    }

    /**
     * Get the type of the tile at the specified coordinates
     * @overload
     * @param {Object} coordinates
     * @param {number} coordinates.col
     * @param {number} coordinates.row
     * @returns {{ x: number, y: number, col: number, row: number }}
     * @memberof Grid
     */

    /**
     * Get the type of the tile at the specified coordinates
     * @overload
     * @param {Object} coordinates
     * @param {number} coordinates.x
     * @param {number} coordinates.y
     * @returns {{ x: number, y: number, col: number, row: number }}
     * @memberof Grid
     */
    getCell(coordinates) {
        const isCanvasCoordinates = coordinates.hasOwnProperty('x') && coordinates.hasOwnProperty('y');
        const isCellCoordinates = coordinates.hasOwnProperty('col') && coordinates.hasOwnProperty('row');

        let x = 0;
        let y = 0;
        let col = 0;
        let row = 0;

        if (isCanvasCoordinates) {
            coordinates.x -= this.offsets.x;
            coordinates.y -= this.offsets.y;

            col = Math.floor(coordinates.x / this.cellSize);
            row = Math.floor(coordinates.y / this.cellSize);
            x = col * this.cellSize + this.offsets.x;
            y = row * this.cellSize + this.offsets.y;
        } else if (isCellCoordinates) {
            col = coordinates.col;
            row = coordinates.row;
            x = col * this.cellSize + this.offsets.x;
            y = row * this.cellSize + this.offsets.y;
        }

        return {
            x,
            y,
            col,
            row,
        }
    }

    render(ctx, debug = false) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;

        for (let x = 0; x <= this.canvasWidth; x += this.cellSize) {
            for (let y = 0; y <= this.canvasHeight; y += this.cellSize) {
                if (this.cellSprite && this.cellSprite.isLoaded) {
                    this.cellSprite.render(ctx, x + this.cellSize / 2, y + this.cellSize / 2);
                }

                if (debug) {
                    this.renderCell(ctx, x, y);
                }
            }
        }
    }

    renderCell(ctx, x, y) {
        ctx.globalAlpha = 0.3;
        ctx.strokeRect(x, y, this.cellSize, this.cellSize);
        ctx.globalAlpha = 1;
    }

    update(state) {
        super.update(state);

        if (this.cellSprite && this.cellSprite.isLoaded) {
            this.cellSprite.update(state);
        }
    }

    init({ cellSize, width, height }) {
        this.cellSize = cellSize;
        this.width = width;
        this.height = height;
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
    }
}
// region GameMap
class GameMap extends Grid {
    static ENTITIES = {
        EMPTY: 0,
        GROUND: 1,
        ROAD: 2,
        SPAWN: 3,
        DESTINATION: 4,
    }
    static TILE_COLORS = {
        [GameMap.ENTITIES.GROUND]: COLORS.GREEN,
        [GameMap.ENTITIES.ROAD]: COLORS.GREY.MEDIUM,
        [GameMap.ENTITIES.DESTINATION]: COLORS.GREY.MEDIUM,
        [GameMap.ENTITIES.SPAWN]: COLORS.GREY.MEDIUM,
    }
    road = [];
    #animatedSprites = []

    /**
     * @param {Object} options
     * @param {number[][]} options.map
     * @param {Object.<number, TileSprite>} options.tileSprites
     * @param {boolean} [options.centerMap=false]
     * @param {number} [options.width]
     * @param {number} [options.height]
     * @param {number} [options.cellSize]
     * @param {number} [options.x=0]
     * @param {number} [options.y=0]
     * @param {Sprite} [options.cellSprite=null]
     */
    constructor({ map, tileSprites, centerMap = false, ...options }) {
        super(options);
        this.map = map;
        this.tileSprites = tileSprites;
        this.centerMap = centerMap;

        if (this.tileSprites) {
            for (const sprite of Object.values(this.tileSprites)) {
                if (sprite instanceof AnimatedTileSprite) {
                    this.#animatedSprites.push(sprite);
                }
            }
        }
    }

    update(state) {
        super.update(state);

        for (const sprite of this.#animatedSprites) {
            sprite.update(state);
        }
    }

    /**
     * Get the offsets to center the map on the canvas
     * @param {number} canvasWidth
     * @param {number} canvasHeight
     * @returns {{ x: number, y: number }}
     * @memberof GameMap
     */
    getOffsets(canvasWidth, canvasHeight) {
        // count offsets with snapping to the grid cells
        const x = (canvasWidth - this.width) / 2;
        const y = (canvasHeight - this.height) / 2;
        const offsetX = Math.floor(x / this.cellSize) * this.cellSize;
        const offsetY = Math.floor(y / this.cellSize) * this.cellSize;

        return {
            x: offsetX,
            y: offsetY,
        };
    }

    init(state) {
        super.init(state);
        this.canvasWidth = state.width;
        this.canvasHeight = state.height;
        this.rows = this.map.length;
        this.cols = this.map[0].length;

        if (this.centerMap) {
            this.width = this.cols * this.cellSize;
            this.height = this.rows * this.cellSize;
            this.offsets = this.getOffsets(state.width, state.height);
        }

        this.road = this.getRoadPath();
    }

    render(ctx, debug) {
        super.render(ctx, debug);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = (col * this.cellSize) + this.offsets.x;
                const y = (row * this.cellSize) + this.offsets.y;
                const type = this.getTileType(col, row);

                const sprite = this.getTileSprite(type);
                const color = this.getTileColor(type);
                if (sprite) {
                    sprite.render(ctx, x + this.cellSize / 2, y + this.cellSize / 2);
                } else if (color) {
                    ctx.fillStyle = color;
                    ctx.fillRect(x, y, this.cellSize, this.cellSize);
                }

                if (debug) {
                    this.renderCell(ctx, x, y);
                }
            }
        }
    }

    /**
     * Get the sprite for the specified tile type
     * @param {number} type
     * @returns {TileSprite | null}
     * @memberof GameMap
     */
    getTileSprite(type) {
        return this.tileSprites && this.tileSprites[type];
    }

    /**
     * Get the color for the specified tile type
     * @param {number} type
     * @returns {string | null}
     * @memberof GameMap
     */
    getTileColor(type) {
        return GameMap.TILE_COLORS[type];
    }

    /**
     * Get the type of the tile at the specified cell
     * @param {number} col
     * @param {number} row
     * @returns {number}
     * @memberof GameMap
     */
    getTileType(col, row) {
        return this.map?.[row]?.[col];
    }

    #getRoadCell(col, row) {
        return {
            col,
            row,
            x: col * this.cellSize + this.offsets.x,
            y: row * this.cellSize + this.offsets.y,
        }
    }

    /**
     * Get the path from spawn to destination
     * @returns {{ col: number, row: number, x: number, y: number }[]}
     * @memberof GameMap
     * @throws {GameError} No spawn found on the map
     * @throws {GameError} No destination found on the map
     * @throws {GameError} Found another spawn point
     */
    getRoadPath() {
        const path = [];
        // find a path starting from spawn to goal
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.getTileType(col, row) === GameMap.ENTITIES.SPAWN) {
                    path.push(this.#getRoadCell(col, row));
                    break;
                }
            }
        }

        if (!path.length) {
            throw new GameError(`No spawn found on the map. Valid spawn point number is "${GameMap.ENTITIES.SPAWN}"`);
        }

        const roadLength = this.map.flat().filter(tile => tile === GameMap.ENTITIES.ROAD).length;
        const directions = [
            { x: 0, y: -1 }, // up
            { x: 1, y: 0 }, // right
            { x: 0, y: 1 }, // down
            { x: -1, y: 0 }, // left
        ];

        let foundDestination = false;

        for (let i = 0; i < roadLength + 1; i++) {
            const { row, col } = path[path.length - 1];
            for (const dir of directions) {
                const newRow = row + dir.y;
                const newCol = col + dir.x;
                const tile = this.getTileType(newCol, newRow);

                if (tile === GameMap.ENTITIES.DESTINATION) {
                    path.push(this.#getRoadCell(newCol, newRow));
                    foundDestination = true;
                    break;
                } else if (tile === GameMap.ENTITIES.ROAD && !path.some(p => p.col === newCol && p.row === newRow)) {
                    path.push(this.#getRoadCell(newCol, newRow));
                } else if (tile === GameMap.ENTITIES.SPAWN && path[0].col !== newCol && path[0].row !== newRow) {
                    throw new GameError(`Seems like I found another spawn point on row: ${newRow}, col: ${newCol}. Be sure that number "${GameMap.ENTITIES.SPAWN}" is only one.`);
                }
            }
        }

        if (!foundDestination) {
            throw new GameError(`No destination found on the map. Valid destination point number is "${GameMap.ENTITIES.DESTINATION}".\nBe sure the spawn and destination points are connected with a road.`);
        }

        return path;
    }
}

// endregion GameMap

// region Sprite
class Sprite {
    isLoaded = false;

    /**
     * @param {Object} options
     * @param {string} [options.imagePath]
     * @param {Image} [options.image=null]
     * @param {number} options.width
     * @param {number} options.height
     * @param {number} [options.scale=1]
     */
    constructor({ imagePath, image = null, width, height, scale = 1 }) {
        if (image) {
            this.image = image;
            this.isLoaded = true;
        } else {
            this.image = new Image();
            this.image.src = imagePath;
            this.image.onload = () => {
                this.isLoaded = true;
            };
        }
        this.width = width;
        this.height = height;
        this.scale = scale;
    }

    /**
     * Render the sprite on specified coordinates
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x
     * @param {number} y
     * @returns {void}
     * @memberof Sprite
     */
    render(ctx, x, y) {
        if (this.isLoaded) {
            const scaledWidth = this.width * this.scale;
            const scaledHeight = this.height * this.scale;
            ctx.drawImage(
                this.image,
                x - scaledWidth / 2,
                y - scaledHeight / 2,
                scaledWidth,
                scaledHeight
            );
        }
    }

    /**
     * Initialize the sprite
     * @returns {void}
     * @memberof Sprite
     * @abstract
     */
    init() { }

    /**
     * Update the sprite
     * @param {Object} state
     * @returns {void}
     * @memberof Sprite
     * @abstract
     */
    update() { }
}

// region TileSpriteMap
class AtlasTileMap {
    #frames = new Map();
    width = 0;
    height = 0;
    scale = 1;

    /**
     * @param {Object} options
     * @param {string} options.imagePath
     * @param {string} options.tilesDataPath
     */
    constructor({ imagePath, tilesDataPath, }) {
        this.image = new Image();
        this.image.src = imagePath;
        this.tilesDataPath = tilesDataPath;
        this.isLoaded = false;
    }

    /**
     * Load the image and tiles data
     * @returns {Promise<void>}
     * @memberof AtlasTileMap
     */
    load() {
        let isImageLoaded = false;
        let isDataLoaded = false;
        return new Promise((resolve, reject) => {
            this.image.onload = () => {
                this.isLoaded = true;
                if (isDataLoaded) resolve();
            };

            fetch(this.tilesDataPath)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.width = data.size.w;
                    this.height = data.size.h;
                    this.scale = data.scale;

                    this.#setFramesData(data.frames);
                    isDataLoaded = true;
                    if (isImageLoaded) resolve();
                })
                .catch(reject);
        });
    }

    #setFramesData(frames) {
        for (const frame of frames) {
            this.#frames.set(frame.filename, new TileFrame(frame));
        }
    }

    /**
     * Get TileSprite by name of the frame
     * @param {string} name
     * @param {Object} [options={}]
     * @param {number} [options.width]
     * @param {number} [options.height]
     * @param {number} [options.scale=1]
     * @param {number} [options.x]
     * @param {number} [options.y]
     * @param {number} [options.rotate]
     * @returns {TileSprite | null}
     * @memberof AtlasTileMap
     * @throws {GameError} Frame with name not found
     */
    getSprite(name, { width, height, scale = 1, x, y, rotate, } = {}) {
        if (!this.isLoaded) return null;

        if (!this.#frames.has(name)) {
            throw new GameError(`Frame with name "${name}" not found`);
        }

        const frame = this.#frames.get(name);

        return new TileSprite({
            name,
            image: this.image,
            width,
            height,
            scale,
            frame,
            x,
            y,
            rotate,
        });
    }

    /**
     * Get AnimatedTileSprite by names of the frames
     * @param {string[]} names
     * @param {Object} [options={}]
     * @param {number} [options.x]
     * @param {number} [options.y]
     * @param {number} [options.width]
     * @param {number} [options.height]
     * @param {number} [options.scale=1]
     * @param {number} [options.frameDuration=0.1]
     * @param {boolean} [options.loop=true]
     * @returns {AnimatedTileSprite | null}
     * @memberof AtlasTileMap
     * @throws {GameError} Frame with name not found
     */
    getAnimatedSprite(names, { x, y, width, height, scale, frameDuration, loop } = {}) {
        if (!this.isLoaded) return null;

        const sequence = names.map(name => {
            if (!this.#frames.has(name)) {
                throw new GameError(`Frame with name "${name}" not found`);
            }

            return this.#frames.get(name);
        });

        return new AnimatedTileSprite({
            image: this.image,
            width,
            height,
            scale,
            frameSequence: sequence,
            frameDuration,
            loop,
            x,
            y,
        });
    }
}
// region TileFrame
class TileFrame {

    /**
     * @param {Object} options
     * @param {number} options.frame
     * @param {boolean} options.trimmed
     * @param {Object} options.spriteSourceSize
     * @param {Object} options.sourceSize
     * @param {boolean} options.rotated
     * @param {number} options.frame.x
     * @param {number} options.frame.y
     * @param {number} options.frame.w
     * @param {number} options.frame.h
     * @param {number} options.spriteSourceSize.x
     * @param {number} options.spriteSourceSize.y
     * @param {number} options.spriteSourceSize.w
     * @param {number} options.spriteSourceSize.h
     * @param {number} options.sourceSize.w
     * @param {number} options.sourceSize.h
    */
    constructor({ frame, trimmed, spriteSourceSize, sourceSize, rotated }) {
        this.x = frame.x;
        this.y = frame.y;
        this.w = frame.w;
        this.h = frame.h;
        this.trimmed = trimmed;
        this.spriteSourceSize = spriteSourceSize;
        this.sourceSize = sourceSize;
        this.rotated = rotated;
    }
}

// region TileSprite
class TileSprite extends Sprite {

    /**
     * @param {Object} options
     * @param {number} [options.x=0]
     * @param {number} [options.y=0]
     * @param {string} options.name
     * @param {Image} options.image
     * @param {number} options.width
     * @param {number} options.height
     * @param {number} [options.scale=1]
     * @param {number} [options.rotate]
     * @param {TileFrame} options.frame
    */
    constructor({ x = 0, y = 0, name, image, width, height, scale = 1, rotate, frame }) {
        width ??= frame.w;
        height ??= frame.h;
        super({ image, width, height, scale });
        this.x = x;
        this.y = y;
        this.name = name;
        this.frame = frame;
        this.rotate = rotate;
    }

    /**
     * Render the sprite on specified coordinates
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x
     * @param {number} y
     * @returns {void}
     * @memberof TileSprite
     */
    render(ctx, x, y) {
        if (this.isLoaded) {
            if (this.rotate !== undefined) {
                ctx.save();
                ctx.translate(x + this.x, y + this.y);
                ctx.rotate(this.rotate * Math.PI / 180);
                this.#renderImage(ctx, 0, 0);
                ctx.restore();
                return;
            }

            this.#renderImage(ctx, x, y);
        }
    }

    #renderImage(ctx, x, y) {
        const scaledWidth = this.width * this.scale;
        const scaledHeight = this.height * this.scale;
        const scaledPositionX = x - scaledWidth / 2
        const scaledPositionY = y - scaledHeight / 2;
        ctx.drawImage(
            this.image,
            this.frame.x,
            this.frame.y,
            this.frame.w,
            this.frame.h,
            scaledPositionX + this.x,
            scaledPositionY + this.y,
            scaledWidth,
            scaledHeight
        );
    }
}


class AnimatedTileSprite extends TileSprite {

    /**
     * @param {Object} options
     * @param {TileFrame[]} options.frameSequence
     * @param {number} [options.frameDuration=0.1]
     * @param {boolean} [options.loop=true]
     * @param {number} [options.x=0]
     * @param {number} [options.y=0]
     * @param {Image} options.image
     * @param {number} options.width
     * @param {number} options.height
     * @param {number} [options.scale=1]
     */
    constructor({ x, y, image, frameSequence, width, height, scale = 1, frameDuration = 0.1, loop = true }) {
        super({ x, y, image, width, height, scale, frame: frameSequence[0] });
        this.frameSequence = frameSequence;
        this.frameDuration = frameDuration;
        this.loop = loop;
        this.currentFrameIndex = 0;
        this.elapsedTime = 0;
        this.isPlaying = true;
    }

    /**
     * Update the sprite
     * @param {Object} options
     * @param {number} [options.deltaTime]
     * @param {number} [options.gameSpeed=1]
     * @returns {void}
     * @memberof AnimatedTileSprite
     */
    update({ deltaTime, gameSpeed = 1 } = {}) {
        if (!this.isPlaying) return;
        this.elapsedTime += deltaTime * gameSpeed;

        if (this.elapsedTime >= this.frameDuration) {

            this.currentFrameIndex++;
            this.elapsedTime = 0;
            if (this.currentFrameIndex >= this.frameSequence.length) {
                if (this.loop) {
                    this.currentFrameIndex = 0;
                } else {
                    this.currentFrameIndex = this.frameSequence.length - 1;
                    this.isPlaying = false;
                }
            }
        }
    }

    /**
     * Play the animation
     * @returns {void}
     * @memberof AnimatedTileSprite
     */
    play() {
        this.isPlaying = true;
    }

    /**
     * Pause the animation
     * @returns {void}
     * @memberof AnimatedTileSprite
     */
    pause() {
        this.isPlaying = false;
    }

    /**
     * Reset the animation
     * @returns {void}
     * @memberof AnimatedTileSprite
     */
    reset() {
        this.currentFrameIndex = 0;
        this.elapsedTime = 0;
    }

    /**
     * Render the sprite on specified coordinates
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x
     * @param {number} y
     * @returns {void}
     * @memberof AnimatedTileSprite
     */
    render(ctx, x, y) {
        if (!this.isLoaded) return;

        const frame = this.frameSequence[this.currentFrameIndex];
        const scaledWidth = this.width * this.scale;
        const scaledHeight = this.height * this.scale;
        const scaledPositionX = x - scaledWidth / 2
        const scaledPositionY = y - scaledHeight / 2;

        ctx.drawImage(
            this.image,
            frame.x,
            frame.y,
            frame.w,
            frame.h,
            scaledPositionX + this.x,
            scaledPositionY + this.y,
            scaledWidth,
            scaledHeight
        );
    }
}
// endregion Sprite


// region EventEmitter
class EventEmitter {
    #events = new Map();

    /**
     * Add an event listener
     * @param {string} event
     * @param {Function} callback
     * @returns {void}
     * @memberof EventEmitter
     */
    on(event, callback) {
        if (!this.#events.has(event)) {
            this.#events.set(event, []);
        }
        this.#events.get(event).push(callback);
    }

    /**
     * Remove an event listener
     * @param {string} event
     * @param {Function} callback
     * @returns {void}
     * @memberof EventEmitter
     */
    off(event, callback) {
        if (this.#events.has(event)) {
            const callbacks = this.#events.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    /**
     * Emit an event
     * @param {string} event
     * @param {any} data
     * @returns {void}
     * @memberof EventEmitter
     */
    emit(event, data) {
        if (this.#events.has(event)) {
            this.#events.get(event).forEach(callback => callback(data));
        }
    }
}


// region GameError
class GameError extends Error {
    constructor(message) {
        super(message);
        this.name = 'GameError';
    }
}

// region GameMath
class GameMath {
    /**
     * Returns the distance between two points.
     * @param {number} x1 The x-coordinate of the first point.
     * @param {number} y1 The y-coordinate of the first point.
     * @param {number} x2 The x-coordinate of the second point.
     * @param {number} y2 The y-coordinate of the second point.
     * @returns {number} The distance between the two points.
     */
    static distance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Returns the angle between two points.
     * @param {number} x1 The x-coordinate of the first point.
     * @param {number} y1 The y-coordinate of the first point.
     * @param {number} x2 The x-coordinate of the second point.
     * @param {number} y2 The y-coordinate of the second point.
     * @returns {number} The angle between the two points.
     */
    static angle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    /**
     * Returns the linear interpolation between two values.
     * @param {number} start The start value.
     * @param {number} end The end value.
     * @param {number} t The interpolation value.
     * @returns {number} The interpolated value.
     */
    static lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }

    /**
     * Moves a value towards a target value by a maximum delta.
     * @param {number} current The current value.
     * @param {number} target The target value.
     * @param {number} maxDelta The maximum delta.
     * @returns {number} The new value.
     */
    static moveTowards(current, target, maxDelta) {
        const delta = target - current;
        if (Math.abs(delta) <= maxDelta) {
            return target;
        }
        return current + Math.sign(delta) * maxDelta;
    }

    /**
     * Returns the shortest difference between two angles.
     * @param {number} a1 The first angle.
     * @param {number} a2 The second angle.
     * @returns {number} The difference between the two angles.
     */
    static angleDifference(a1, a2) {
        const diff = (a2 - a1 + Math.PI) % (2 * Math.PI) - Math.PI;
        return diff < -Math.PI ? diff + 2 * Math.PI : diff;
    }
}