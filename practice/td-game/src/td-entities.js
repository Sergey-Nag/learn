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