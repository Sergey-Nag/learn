/*

    Создать свой базовый класс для Башен и Монстров, который будет содержать общие методы и свойства.
    Башни должны рисовать пушки (head).
    - Башня (или Head в случае отдельного класса) должна считать угол до цели. 
        На основании этого угла рисовать соответствующий спрайт поворота пущки.
        Класс должен принимать "карту" (map) спрайтов для разных углов.
        headSpriteMap: {
            45: textureMap.getSprite('cannon_1_top_1'),
            90: textureMap.getSprite('cannon_1_top_2'),
            135: textureMap.getSprite('cannon_1_top_3'),
            180: textureMap.getSprite('cannon_1_top_4'),
            225: textureMap.getSprite('cannon_1_top_5'),
        }

    - Монстры должны рисовать соответствующий спрайт в зависимости от направления движения.
        spriteMap: {
            right: textureMap.getSprite('enemy_1_right'),
            down: textureMap.getSprite('enemy_1_down'),
            left: textureMap.getSprite('enemy_1_left'),
            up: textureMap.getSprite('enemy_1_up'),
        }

*/
const CELL_SIZE=50;
const gameSpeed = 1;
const canvas = document.getElementById('game');

const towerHeadOffset = -15;
const enemyScale = 0.7;
const enemyAnimationFrameDuration = 0.055;

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
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        return angle;
    }

    getDistanceToEnemy(enemy) {
        const distance = Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2);
        return distance - enemy.width / 2;
    }
}

class BaseEnemy extends Enemy {
    constructor(options) {
        super(options);
        this.spriteMap = options.spriteMap || {};
        this.currentEnemySprite = this.enemySpriteMap?.[0]
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

const textureMap = new AtlasTileMap({
    imagePath: 'assets/texture_atlas_1.png',
    tilesDataPath: 'assets/texture_atlas_1.json',
});
const enemyMap = new AtlasTileMap({
    imagePath: 'assets/texture_atlas_2.png',
    tilesDataPath: 'assets/texture_atlas_2.json'
})

class CannonTower extends BaseTower {
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
                sprite: textureMap.getSprite('granade', { scale: 0.6, rotate: 10 }),
            },
            bulletOffset: {
                x: 0,
                y: towerHeadOffset
            },
            sprite: textureMap.getSprite('fire_1_base', { scale: 0.7, y: -5 }),
            headSprite: textureMap.getSprite('cannon_1_top_1', { scale: 0.7, y: towerHeadOffset}),
        })

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


let map, game;
async function initGame() {
    try {
        await Promise.all([textureMap.load(), enemyMap.load()])
    } catch(e) {
        console.log(e)
    }

    const cellDirtSprite = textureMap.getSprite('cell_dirt', { width: CELL_SIZE, height: CELL_SIZE });
    const cellGrassSprite = textureMap.getSprite('cell_grass_1', { width: CELL_SIZE, height: CELL_SIZE });

    map = new GameMap({
    map: [
        [1, 5, 1, 5, 1, 5, 1, 5, 1, 5],
        [3, 2, 2, 2, 1, 2, 2, 2, 2, 4],
        [1, 1, 1, 2, 1, 2, 1, 1, 1, 1],
        [1, 1, 1, 2, 1, 2, 2, 1, 1, 1],
        [1, 1, 1, 2, 1, 1, 2, 1, 1, 1],
        [1, 5, 5, 2, 2, 2, 2, 1, 1, 1],
        [1, 5, 5, 1, 6, 1, 1, 1, 1, 1],
    ],
    centerMap: true,
    tileSprites: {
        [GameMap.ENTITIES.SPAWN]: cellDirtSprite,
        [GameMap.ENTITIES.ROAD]: cellDirtSprite,
        [GameMap.ENTITIES.DESTINATION]: cellDirtSprite,
        [GameMap.ENTITIES.GROUND]: cellGrassSprite,
        5: textureMap.getSprite('cell_grass_2', { width: CELL_SIZE, height: CELL_SIZE }),
        6: textureMap.getAnimatedSprite([
            'halloween_cell_water_01', 'halloween_cell_water_02', 'halloween_cell_water_03',
            'halloween_cell_water_04', 'halloween_cell_water_05', 'halloween_cell_water_06',
            'halloween_cell_water_07', 'halloween_cell_water_08', 'halloween_cell_water_09',
            'halloween_cell_water_10', 'halloween_cell_water_11', 'halloween_cell_water_12',
            'halloween_cell_water_13', 'halloween_cell_water_14', 'halloween_cell_water_15',
            'halloween_cell_water_16', 'halloween_cell_water_17', 'halloween_cell_water_18',
            'halloween_cell_water_19', 'halloween_cell_water_20', 'halloween_cell_water_21',
            'halloween_cell_water_22', 'halloween_cell_water_23', 'halloween_cell_water_24',
            'halloween_cell_water_25',
        ], { width: CELL_SIZE, height: CELL_SIZE })
    },
    cellSprite: textureMap.getAnimatedSprite(
        [
            'cell_water_01', 'cell_water_02', 'cell_water_03', 'cell_water_04', 'cell_water_05',
            'cell_water_06', 'cell_water_07', 'cell_water_08', 'cell_water_09', 'cell_water_10',
            'cell_water_11', 'cell_water_12', 'cell_water_13', 'cell_water_14', 'cell_water_15',
            'cell_water_16', 'cell_water_17', 'cell_water_18', 'cell_water_19', 'cell_water_20',
            'cell_water_21', 'cell_water_22', 'cell_water_23', 'cell_water_24', 'cell_water_25',
        ],
        { width: CELL_SIZE, height: CELL_SIZE },
    )
    });

    game = new TDGame({
        canvas,
        map,
        cellSize: CELL_SIZE,
        gameSpeed,
        frameRate: 60,
        width: 1000,
        height: 500,
    });

    game.on(TDGame.EVENTS.ENEMY_FINISHED, (enemy) => {
        console.log('Enemy finished', enemy);
    });

    game.on(TDGame.EVENTS.ENEMY_KILLED, (enemy) => {
        console.log('Enemy killed', enemy);
    });

    game.debug = true;
    game.start();

    setInterval(() => {
        const enemy = new BaseEnemy({
        spriteMap: {
            right: enemyMap.getAnimatedSprite([
                'enemy_runner_right_01',
                'enemy_runner_right_02',
                'enemy_runner_right_03',
                'enemy_runner_right_04',
                'enemy_runner_right_05',
                'enemy_runner_right_06',
                'enemy_runner_right_07',
                'enemy_runner_right_08',
                'enemy_runner_right_09',
                'enemy_runner_right_10',
                'enemy_runner_right_11',
            ], { scale: enemyScale, frameDuration: enemyAnimationFrameDuration }),
            left: enemyMap.getAnimatedSprite([
                'enemy_runner_left_01',
                'enemy_runner_left_02',
                'enemy_runner_left_03',
                'enemy_runner_left_04',
                'enemy_runner_left_05',
                'enemy_runner_left_06',
                'enemy_runner_left_07',
                'enemy_runner_left_08',
                'enemy_runner_left_09',
                'enemy_runner_left_10',
                'enemy_runner_left_11',
            ], { scale: enemyScale, frameDuration: enemyAnimationFrameDuration }),
            up: enemyMap.getAnimatedSprite([
                'enemy_runner_back_01',
                'enemy_runner_back_02',
                'enemy_runner_back_03',
                'enemy_runner_back_04',
                'enemy_runner_back_05',
                'enemy_runner_back_06',
                'enemy_runner_back_07',
                'enemy_runner_back_08',
                'enemy_runner_back_09',
                'enemy_runner_back_10',
                'enemy_runner_back_11',
            ], { scale: enemyScale, frameDuration: enemyAnimationFrameDuration }),
            down: enemyMap.getAnimatedSprite([
                'enemy_runner_front_01',
                'enemy_runner_front_02',
                'enemy_runner_front_03',
                'enemy_runner_front_04',
                'enemy_runner_front_05',
                'enemy_runner_front_06',
                'enemy_runner_front_07',
                'enemy_runner_front_08',
                'enemy_runner_front_09',
                'enemy_runner_front_10',
                'enemy_runner_front_11',
            ], { scale: enemyScale, frameDuration: enemyAnimationFrameDuration })
        },
        health: 100,
        speed: 100,
        path: map.getRoadPath(),
        height: CELL_SIZE,
        width: CELL_SIZE,
        });
        game.addEnemy(enemy);
    }, 1000 / gameSpeed);

    game.addEntity(
        new Entity({
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            sprite: textureMap.getSprite('granade')
        })
    )
}


canvas.addEventListener('click', (e) => {
    const { offsetX, offsetY } = e;
    const { x, y, col, row } = map.getCell({ x: offsetX, y: offsetY });
    const towerOnCell = game.getTowerAt({ col, row });

    if (towerOnCell) {
        towerOnCell.showRange = !towerOnCell.showRange;
    } else if (map.getTileType(col, row) === GameMap.ENTITIES.GROUND) {
    

        const tower = new CannonTower({ x, y });
        game.addTower(tower);
    }
})
    
    


initGame();

document.addEventListener('keyup', (e) => {
    console.log(e.code);
    if (e.code === 'KeyP') {
        if (game.isPaused) {
        game.resume();
        } else {
        game.pause();
        }
    }

    if (e.code === 'Enter') {
        game.addEnemy(
        new Enemy({
        path: map.getRoadPath(),
        width: CELL_SIZE,
        height: CELL_SIZE,
        speed: 50,
        })
        );
    }
});