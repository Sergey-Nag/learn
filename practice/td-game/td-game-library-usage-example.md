# Tower Defense Game Library Usage Example

This example demonstrates how to set up a basic Tower Defense game using the library.

## Setup

First, include the library in your HTML file:

```html
<canvas id="gameCanvas"></canvas>
<script src="path/to/td-game-library.js"></script>
<script src="your-game-script.js"></script>
```

## Basic Game Setup

In your `your-game-script.js` file:

```javascript
// Define the game map
const gameMap = [
    [1, 1, 1, 1, 1],
    [3, 2, 2, 2, 1],
    [1, 1, 1, 2, 1],
    [1, 2, 2, 2, 4],
    [1, 1, 1, 1, 1]
];

// Create tile sprites (assuming you have a sprite atlas)
const atlasTileMap = new AtlasTileMap({
    imagePath: 'path/to/your/spritesheet.png',
    tilesDataPath: 'path/to/your/spritesheet-data.json'
});

// Load the sprite atlas
await atlasTileMap.load();

const tileSprites = {
    [GameMap.ENTITIES.GROUND]: atlasTileMap.getSprite('ground'),
    [GameMap.ENTITIES.ROAD]: atlasTileMap.getSprite('road'),
    [GameMap.ENTITIES.SPAWN]: atlasTileMap.getSprite('spawn'),
    [GameMap.ENTITIES.DESTINATION]: atlasTileMap.getSprite('destination')
};

// Create the game map
const map = new GameMap({
    map: gameMap,
    tileSprites: tileSprites,
    cellSize: 64,
    centerMap: true
});

// Initialize the game
const game = new TDGame({
    canvas: document.getElementById('gameCanvas'),
    width: 800,
    height: 600,
    frameRate: 60,
    cellSize: 64,
    map: map
});

// Add a tower
const towerSprite = atlasTileMap.getSprite('tower');
const tower = new Tower({
    x: 128,
    y: 128,
    width: 64,
    height: 64,
    sprite: towerSprite,
    range: 150,
    damage: 10,
    fireRate: 1
});
game.addTower(tower);

// Create an enemy spawner
function spawnEnemy() {
    const enemySprite = atlasTileMap.getSprite('enemy');
    const enemy = new Enemy({
        health: 100,
        path: map.road,
        width: 48,
        height: 48,
        sprite: enemySprite,
        speed: 50
    });
    game.addEnemy(enemy);
}

// Spawn an enemy every 2 seconds
setInterval(spawnEnemy, 2000);

// Start the game
game.start();

// Handle game events
game.on(TDGame.EVENTS.ENEMY_KILLED, (enemy) => {
    console.log('Enemy killed!');
});

game.on(TDGame.EVENTS.ENEMY_FINISHED, (enemy) => {
    console.log('Enemy reached the destination!');
});

// Add game controls (example: pause/resume)
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (game.isPaused) {
            game.resume();
        } else {
            game.pause();
        }
    }
});
```

This example demonstrates:

1. Setting up the game map and tile sprites
2. Initializing the game
3. Adding a tower
4. Creating an enemy spawner
5. Starting the game
6. Handling game events
7. Adding basic game controls (pause/resume)

Remember to replace `'path/to/your/spritesheet.png'` and `'path/to/your/spritesheet-data.json'` with the actual paths to your sprite atlas image and data file.

You can expand on this example by adding more towers, implementing different enemy types, creating a user interface for building towers, and adding game logic for player resources and scoring.
