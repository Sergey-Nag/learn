const gameSpeed = 0.5;
const canvas = document.getElementById('game');
const towerSelect = document.getElementById('tower-select');

const textureMap = new AtlasTileMap({
    imagePath: 'assets/texture_atlas_1.png',
    tilesDataPath: 'assets/texture_atlas_1.json',
});
const enemyMap = new AtlasTileMap({
    imagePath: 'assets/texture_atlas_2.png',
    tilesDataPath: 'assets/texture_atlas_2.json'
});
const bulletMap = new AtlasTileMap({
    imagePath: 'assets/texture_atlas_3.png',
    tilesDataPath: 'assets/texture_atlas_3.json'
});

let map, game;
async function initGame() {
    try {
        await Promise.all([textureMap.load(), enemyMap.load(),bulletMap.load()])
    } catch(e) {
        console.log(e)
    }

    const cellDirtSprite = textureMap.getSprite('cell_dirt', { width: CELL_SIZE, height: CELL_SIZE });
    const cellGrassSprite = textureMap.getSprite('cell_grass_1', { width: CELL_SIZE, height: CELL_SIZE });

    map = new GameMap({
        map: [
            [1, 5, 1, 5, 1, 5, 1, 2, 2, 4],
            [3, 2, 1, 1, 1, 1, 1, 2, 1, 1],
            [1, 2, 1, 1, 1, 1, 1, 2, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 5, 5, 1, 1, 1, 1, 1, 1, 1],
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
    }, 700 / gameSpeed);

    game.addEntity(
        new Entity({
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            sprite: bulletMap.getAnimatedSprite([
                "flame_01",
                "flame_02",
                "flame_03",
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
                "flame_22",
                // "flame_23",
                // "flame_24",
                // "flame_25",
                "flame_26",
                "flame_27",
                "flame_28",
                "flame_29",
            ],{ scale: 0.7, y: -5, rotate: 180, frameDuration: 0.5 }),
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
        const selectedTowerType = towerSelect.value;

        let tower;
        if (selectedTowerType === 'ArcherTower') {
            tower = new ArcherTower({ x, y });
        } else if (selectedTowerType === 'CannonTower') {
            tower = new CannonTower({ x, y });
        } else if (selectedTowerType === 'FireTower') {
            tower = new FireTower({ x, y });
        } else if (selectedTowerType === 'ElectricTower') {
            tower = new ElectricTower({ x, y });
        } else if (selectedTowerType === 'LaserTower') {
            tower = new LaserTower({ x, y });
        } 
        if (tower) {
            game.addTower(tower);
        }
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