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
const canvas = document.getElementById('game');

class CannonTower extends Tower {
    constructor(options) {
    super(options);
    this.headSpriteMap = options.headSpriteMap || {};
    this.currentSprite = null;
    }

    calculateAngle(targetX, targetY) {
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return angle;
    }

    updateSprite(targetX, targetY) {
    const angle = this.calculateAngle(targetX, targetY);
    let closestAngle = Object.keys(this.headSpriteMap).reduce((prev, curr) => {
        return Math.abs(curr - angle) < Math.abs(prev - angle) ? curr : prev;
    });
    this.currentSprite = this.headSpriteMap[closestAngle];
    }

    draw(context) {
    if (this.currentSprite) {
        context.drawImage(
        this.currentSprite,
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.health
        );
    }
    }

    getDistanceToEnemy(enemy) {
    const distance = Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2);
    return distance - enemy.width / 2;
    }
}

class NewEnemy extends Enemy {
    constructor(options) {
    super(options);
    this.spriteMap = options.spriteMap || {};
    this.currentSprite = null;
    this.direction = 'right';
    }

    updateDirection(dx, dy) {
    if (dx > 0) {
        this.spriteMap.getSprite = 'enemy_runner_right_01'
        this.direction = 'right';
    } else if (dx < 0) {
        this.spriteMap.getSprite = 'enemy_runner_left_01'
        this.direction = 'left';
    } else if (dy > 0) {
        this.spriteMap.getSprite = 'enemy_runner_front_01'
        this.direction = 'down';
    } else if (dy < 0) {
        this.spriteMap.getSprite = 'enemy_runner_back_01'
        this.direction = 'up';
    }
    this.currentSprite = this.spriteMap[this.direction];
    }

    draw(context) {
    if (this.currentSprite) {
        context.drawImage(
        this.currentSprite,
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.health
        );
    }
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

let map, game;
async function initGame() {
    try {
        await textureMap.load();
        await enemyMap.load();
    } catch(e) {
        console.log(e)
    }

    const cellDirtSprite = textureMap.getSprite('cell_dirt', { width: CELL_SIZE, height: CELL_SIZE });
    const cellGrassSprite = textureMap.getSprite('cell_grass_1', { width: CELL_SIZE, height: CELL_SIZE });

    map = new GameMap({
    map: [
        [1, 5, 1, 5, 1, 5, 1, 5, 1, 5],
        [3, 2, 2, 2, 2, 2, 2, 2, 2, 4],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
        gameSpeed: 1,
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
        const enemy = new Enemy({
        health: 100,
        speed: 100,
        path: map.getRoadPath(),
        height: CELL_SIZE,
        width: CELL_SIZE,
        });
        game.addEnemy(enemy);
    }, 1000);
    }

    canvas.addEventListener('click', (e) => {
    const { offsetX, offsetY } = e;
    const { x, y, col, row } = map.getCell({ x: offsetX, y: offsetY });
    const towerOnCell = game.getTowerAt({ col, row });

    if (towerOnCell) {
        towerOnCell.showRange = !towerOnCell.showRange;
    } else if (map.getTileType(col, row) === GameMap.ENTITIES.GROUND) {
        const bulletSprite = textureMap.getSprite('cannon_1_bullet_01', { scale: 0.6, rotate: 90 });

        const tower = new CannonTower({
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
            sprite: bulletSprite,
        },
        headSpriteMap: {
            45: textureMap.getSprite('cannon_1_top_1'),
            90: textureMap.getSprite('cannon_1_top_2'),
            135: textureMap.getSprite('cannon_1_top_3'),
            180: textureMap.getSprite('cannon_1_top_4'),
            225: textureMap.getSprite('cannon_1_top_5'),
        },
        sprite: textureMap.getSprite('fire_1_base', { scale: 0.9, y: -5 }),
        });

        game.addTower(tower);
    }
});

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