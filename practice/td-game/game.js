const CELL_SIZE = 50;
const canvas = document.getElementById('game');



// game.debug = true;
// const initGame = new Promise(() => {})
    


    class MyTower extends Tower {
        constructor(options) {
            super(options);
        }
    
        // findEnemyInRange(enemies) {
        //     for (const enemy of enemies) {
        //         const distance = this.getDistanceTo(enemy);
        //         if (distance <= this.range) {
        //             return enemy;
        //         }
        //     }
        // }
        getDistanceToEnemy(enemy) {
            // const distance = super.getDistanceToEnemy(enemy);
            const distance = Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2);
            return distance - enemy.width / 2;
        }
    
    
    }
    
const textureMap = new AtlasTileMap({
    imagePath: 'assets/texture_atlas_1.png',
    tilesDataPath: 'assets/texture_atlas_1.json',
});
let map, game;
async function intiGame() {
    await textureMap.load();

    // const someSprite = new Anima({
    //     imagePath: 'src/assets/texture_atlas_1.png',
    //     width: 100,
    //     height: 100,
    //     x: 0,
    //     y: 0,
    // })

    // game.addEntity(someSprite);

    const cellDirtSprite = textureMap.getSprite('cell_dirt', { width: CELL_SIZE, height: CELL_SIZE });
    const cellGrassSprite = textureMap.getSprite('cell_grass_1', { width: CELL_SIZE, height: CELL_SIZE });
    map = new GameMap({
        map: [
            [1, 5, 1, 5, 1, 5, 1, 5, 1, 5],
            [3, 2, 2, 2, 2, 2, 2, 2, 2, 4],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 5, 5, 1, 6, 1, 1, 1, 1, 1],
        ],
        // centerMap: true,
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
    })


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

    game.addEntity(
        new Entity({
            x: 100,
            y: 100,
            width: CELL_SIZE,
            height: CELL_SIZE,
            color: 'red',
            // headSpriteMap: {
            //     45: textureMap.getSprite('cannon_1_top_1'),
            //     90: textureMap.getSprite('cannon_1_top_2'),
            //     135: textureMap.getSprite('cannon_1_top_3'),
            //     180: textureMap.getSprite('cannon_1_top_4'),
            //     225: textureMap.getSprite('cannon_1_top_5'),
            // }
            sprite: textureMap.getSprite('cannon_3_top_6', {  })
        })
    )


    const entity = new Entity({
        x: 400,
        y: 200,
        width: CELL_SIZE,
        height: CELL_SIZE,
        sprite: textureMap.getSprite('red_banner'),
    });

    // game.addEntity(entity);

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

    // const cell = map.getCell({ col: 0, row: 3 });
    // console.log(cell);
    const towerOnCell = game.getTowerAt({ col, row });

    if (towerOnCell) {
        towerOnCell.showRange = !towerOnCell.showRange;
    } else if (map.getTileType(col, row) === GameMap.ENTITIES.GROUND) {



        const bulletSprite = textureMap.getSprite('archer_2_arrow', { scale: 0.6, rotate: 90 });

        const tower = new MyTower({
            x, y,
            width: CELL_SIZE,
            height: CELL_SIZE,
            range: 100,
            fireRate: 5,
            bulletClass: Bullet,
            bulletOptions: {
                speed: 200,
                damage: 5,
                // origin: { x: 0, y: -5, }
                sprite: bulletSprite,
            },
            sprite: textureMap.getSprite('fire_1_base', { scale: 0.9, y: -5, }),
        });
        const fireHead = new Entity({
            x,
            y,
            width: CELL_SIZE,
            height: CELL_SIZE,
            sprite: textureMap.getAnimatedSprite(
                [
                    'fire_00', 'fire_01', 'fire_02', 'fire_03', 'fire_04',
                    'fire_05', 'fire_06', 'fire_07', 'fire_08', 'fire_09',
                    'fire_10', 'fire_11', 'fire_12', 'fire_13', 'fire_14',
                    'fire_15', 'fire_16', 'fire_17', 'fire_18', 'fire_19',
                    'fire_20', 'fire_21', 'fire_22', 'fire_23',
                ],
                { scale: 0.9, frameDuration: 0.05, y: -25 },
            )
        })

        // tower.showRange = true;

        game.addTower(tower);
        game.addEntity(fireHead);
    }
})
intiGame();


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
                speed: 50
            })
        )
    }
});