# Tower Defense Game Library Documentation

## Table of Contents
1. [TDGame](#tdgame)
2. [Entity](#entity)
3. [MovingEntity](#movingentity)
4. [Enemy](#enemy)
5. [Tower](#tower)
6. [Bullet](#bullet)
7. [Grid](#grid)
8. [GameMap](#gamemap)
9. [Sprite](#sprite)
10. [AtlasTileMap](#atlastilemap)
11. [TileFrame](#tileframe)
12. [TileSprite](#tilesprite)
13. [AnimatedTileSprite](#animatedtilesprite)
14. [EventEmitter](#eventemitter)
15. [GameError](#gameerror)
16. [GameMath](#gamemath)

## TDGame

The main game class that manages the game loop, entities, and rendering.

### Properties
- `canvas`: The game canvas
- `ctx`: The 2D rendering context
- `width`, `height`: Dimensions of the game
- `frameRate`: The target frame rate
- `cellSize`: Size of each cell in the grid
- `gameSpeed`: Speed multiplier for the game
- `map`: The game map
- `enemies`, `towers`, `entities`: Arrays of game objects
- `isPaused`: Pause state of the game
- `debug`: Debug mode flag
- `fps`: Current frames per second
- `events`: EventEmitter for game events

### Methods
- `constructor(options)`: Initialize the game
- `start()`: Start the game loop
- `end()`: End the game
- `pause()`: Pause the game
- `resume()`: Resume the game
- `update(deltaTime)`: Update game state
- `render()`: Render the game
- `init()`: Initialize game objects
- `on(event, callback)`: Subscribe to game events
- `setFrameRate(newFrameRate)`: Set the game frame rate
- `addTower(tower)`: Add a tower to the game
- `getTowerAt(position)`: Get the tower at a specific position
- `removeTower(tower)`: Remove a tower from the game
- `addEnemy(enemy)`: Add an enemy to the game
- `removeEnemy(enemy)`: Remove an enemy from the game
- `addEntity(entity)`: Add an entity to the game
- `getEntityAt(position)`: Get the entity at a specific position
- `removeEntity(entity)`: Remove an entity from the game

## Entity

Base class for all game entities.

### Properties
- `x`, `y`: Position
- `width`, `height`: Dimensions
- `color`: Color of the entity
- `sprite`: Optional sprite for rendering

### Methods
- `constructor(options)`: Initialize the entity
- `init(state)`: Initialize the entity state
- `render(ctx, debug)`: Render the entity
- `update(state)`: Update the entity state

## MovingEntity

Extends Entity with movement capabilities.

### Additional Properties
- `speed`: Movement speed
- `rotationSpeed`: Rotation speed
- `angle`: Current angle
- `targetX`, `targetY`: Target position for movement
- `isMoving`: Flag indicating if the entity is moving

### Additional Methods
- `constructor(options)`: Initialize the moving entity
- `moveTo(x, y)`: Set a new target position
- `rotateTo(angle)`: Set a new target angle
- `collidesWith(entity)`: Check collision with another entity

## Enemy

Represents an enemy in the game.

### Additional Properties
- `health`, `maxHealth`: Enemy health
- `path`: Path the enemy follows
- `isDead`, `isFinished`: Status flags

### Additional Methods
- `constructor(options)`: Initialize the enemy
- `setGameEvents(events)`: Set the game events emitter
- `damage(amount)`: Apply damage to the enemy
- `kill()`: Mark the enemy as dead
- `finish()`: Mark the enemy as finished
- `takeDamage(amount)`: Alias for damage method

## Tower

Represents a defensive tower in the game.

### Properties
- `range`: Attack range
- `damage`: Damage dealt per attack
- `fireRate`: Rate of fire
- `target`: Current target enemy
- `bullets`: Array of active bullets

### Methods
- `constructor(options)`: Initialize the tower
- `update(state)`: Update tower state, find targets, and fire
- `render(ctx, debug)`: Render the tower and its range
- `fire(state)`: Fire a bullet at the current target
- `findEnemyInRange(enemies)`: Find the nearest enemy in range
- `getDistanceToEnemy(enemy)`: Calculate distance to an enemy

## Bullet

Represents a projectile fired by a tower.

### Properties
- `damage`: Damage dealt on hit
- `target`: Target enemy
- `isActive`: Flag indicating if the bullet is active

### Methods
- `constructor(options)`: Initialize the bullet
- `update(state)`: Update bullet position and check for collisions
- `hit()`: Handle collision with the target

## Grid

Base class for grid-based game elements.

### Properties
- `rows`, `cols`: Grid dimensions
- `cellSize`: Size of each cell
- `offsets`: Grid offsets

### Methods
- `constructor(options)`: Initialize the grid
- `getCell(coordinates)`: Get cell coordinates from pixel position or grid position
- `render(ctx, debug)`: Render the grid
- `update(state)`: Update grid state
- `init(options)`: Initialize grid dimensions

## GameMap

Represents the game map, extending Grid.

### Properties
- `map`: 2D array representing the map layout
- `tileSprites`: Mapping of tile types to sprites
- `road`: Array of road tile positions

### Methods
- `constructor(options)`: Initialize the game map
- `update(state)`: Update map state
- `init(state)`: Initialize map dimensions and calculate road path
- `render(ctx, debug)`: Render the map
- `getTileSprite(type)`: Get the sprite for a tile type
- `getTileColor(type)`: Get the color for a tile type
- `getTileType(col, row)`: Get the tile type at a specific position
- `getRoadPath()`: Calculate the road path from spawn to destination

## Sprite

Base class for game sprites.

### Properties
- `image`: The sprite image
- `width`, `height`: Dimensions of the sprite
- `scale`: Scale factor for rendering
- `isLoaded`: Flag indicating if the image is loaded

### Methods
- `constructor(options)`: Initialize the sprite
- `render(ctx, x, y)`: Render the sprite
- `init()`: Initialize the sprite (placeholder)
- `update()`: Update the sprite (placeholder)

## AtlasTileMap

Manages a collection of tile sprites from a spritesheet.

### Methods
- `constructor(options)`: Initialize the atlas tile map
- `load()`: Load the spritesheet and tile data
- `getSprite(name, options)`: Get a single tile sprite
- `getAnimatedSprite(names, options)`: Get an animated tile sprite

## TileFrame

Represents a single frame in a tile spritesheet.

### Properties
- `x`, `y`, `w`, `h`: Position and size of the frame in the spritesheet
- `trimmed`, `spriteSourceSize`, `sourceSize`, `rotated`: Additional frame data

## TileSprite

Represents a single tile sprite, extending Sprite.

### Additional Properties
- `frame`: The TileFrame for this sprite
- `rotate`: Rotation angle for the sprite

### Additional Methods
- `constructor(options)`: Initialize the tile sprite
- `render(ctx, x, y)`: Render the tile sprite with optional rotation

## AnimatedTileSprite

Represents an animated tile sprite, extending TileSprite.

### Additional Properties
- `frameSequence`: Array of frames for the animation
- `frameDuration`: Duration of each frame
- `loop`: Whether the animation should loop
- `currentFrameIndex`: Current frame in the animation
- `elapsedTime`: Time elapsed in the current frame
- `isPlaying`: Whether the animation is playing

### Additional Methods
- `constructor(options)`: Initialize the animated tile sprite
- `update(options)`: Update the animation state
- `play()`: Start playing the animation
- `pause()`: Pause the animation
- `reset()`: Reset the animation to the first frame
- `render(ctx, x, y)`: Render the current frame of the animation

## EventEmitter

Simple event emitter for handling game events.

### Methods
- `on(event, callback)`: Add an event listener
- `off(event, callback)`: Remove an event listener
- `emit(event, data)`: Emit an event

## GameError

Custom error class for game-specific errors.

## GameMath

Utility class with mathematical helper functions.

### Static Methods
- `distance(x1, y1, x2, y2)`: Calculate distance between two points
- `angle(x1, y1, x2, y2)`: Calculate angle between two points
- `lerp(start, end, t)`: Linear interpolation
- `moveTowards(current, target, maxDelta)`: Move a value towards a target
- `angleDifference(a1, a2)`: Calculate the smallest difference between two angles

This documentation provides an overview of the main classes and their functionalities in your Tower Defense game library. You can expand on this documentation by adding more detailed descriptions, usage examples, and any additional methods or properties that are important for users of your library.
