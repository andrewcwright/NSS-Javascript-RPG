//set main namespace 
goog.provide('capstone_rpg'); 

//get requirements
goog.require('lime.Director'); 
goog.require('lime.Scene'); 
goog.require('lime.Layer');
goog.require('lime.fill.LinearGradient');
goog.require('goog.math');
goog.require('lime.GlossyButton');
goog.require('goog.events.KeyCodes');
goog.require('capstone_rpg.grass');
goog.require('capstone_rpg.stone');


//entrypoint 
capstone_rpg.start = function(){   

    //create director       
    var director = new lime.Director(document.body,408,264);     
    director.makeMobileWebAppCapable();     
    director.setDisplayFPS(false);

    //object to store default value for game area
    var gameObj = {
        width: 408,
        height: 264,
        tile_size: 24,
        num_tiles_x: 17,
        num_tiles_y: 11
    }

    //create an array to use as a model for the map
    mapData = [ 
        ['.','#','.','.','.','.','.','.','.','.','.','.','.','.','#','.','.'],
        ['.','#','#','#','.','#','#','#','.','#','#','#','#','#','#','.','.'],
        ['.','#','.','#','.','#','#','#','.','#','#','.','.','.','#','.','#'],
        ['.','#','.','#','.','.','.','.','.','#','.','.','#','.','.','.','.'],
        ['.','#','.','#','.','.','.','#','.','#','.','#','#','#','#','#','#'],
        ['.','#','.','#','.','#','#','#','.','#','.','.','#','#','#','#','#'],
        ['.','#','.','#','.','#','#','#','.','#','#','.','#','.','.','.','.'],
        ['.','#','.','#','.','.','.','.','.','.','.','.','#','.','.','.','.'],
        ['.','#','.','#','.','#','#','.','#','.','.','.','#','.','.','.','.'],
        ['.','#','.','#','.','#','#','.','#','#','#','#','#','#','.','.','#'],
        ['.','.','.','.','.','#','#','.','.','.','.','.','.','.','.','.','.']
    ]; 

    //create mapScene hero
    hero = new lime.Sprite().setSize(100,100).setFill('spellun-sprite.png').setPosition(12,12).setScale(.2);
    hero.life = 20;
    hero.money = 100;
    hero.attack = 5;
    hero.mapPosY = 0;
    hero.mapPosX = 0;

    //create mapScene boss
    var monster = new lime.Sprite().setSize(264,264).setFill('fenrir_wolf.png').setPosition(360, 168).setScale(.2);
    monster.life = 15;
    monster.money = 10;
    monster.attack = 1;

    //create ghosts
    var ghost1 = new lime.Sprite().setSize(24,24).setFill('ghost.png').setPosition(60,60);
    ghost1.life = 10;
    ghost1.money = 10;
    ghost1.attack = 1;

    var ghost2 = new lime.Sprite().setSize(24,24).setFill('ghost.png').setPosition(324,12);
    ghost2.life = 10;
    ghost2.money = 10;
    ghost2.attack = 1;

    //create key
    var key = new lime.Sprite().setSize(36,39).setFill('key.png').setPosition(396, 10).setScale(.5);

    //create door
    var door = new lime.Sprite().setSize(12,24).setFill(184,134,11).setPosition(306,252);

    //create mapScene
    var mapScene = new lime.Scene();  
    var mapLayer = new lime.Layer().setSize(408,264).setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);

    //loop through mapData and write a map based on its contents
    for(var i=0; i<gameObj.num_tiles_x; i++) {
        for(var j=0; j<gameObj.num_tiles_y; j++) {
            if (mapData[j][i] == '.') {
                var landElement = new capstone_rpg.grass(gameObj).setPosition(i*gameObj.tile_size, j*gameObj.tile_size);
                mapLayer.appendChild(landElement);
            }
            if (mapData[j][i] == '#') {
                var stoneElement = new capstone_rpg.stone(gameObj).setPosition(i*gameObj.tile_size,j*gameObj.tile_size);
                mapLayer.appendChild(stoneElement);
            }
        }
    }

    //append map elements to canvas
    mapLayer.appendChild(hero);
    mapLayer.appendChild(monster);
    mapLayer.appendChild(key);
    mapLayer.appendChild(door);
    mapLayer.appendChild(ghost1);
    mapLayer.appendChild(ghost2);
    mapScene.appendChild(mapLayer);
    director.replaceScene(mapScene);

    //create fightScene
    var fightScene = new lime.Scene().setRenderer();
    var fightLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
    var skyGradient = new lime.fill.LinearGradient().setDirection(1,1,1,0).addColorStop(0, '#B2DFEE').addColorStop(1, '#0000CD');
    var sky = new lime.Sprite().setSize(408,132).setPosition(0,0).setAnchorPoint(0,0).setFill(skyGradient);
    var grass = new lime.Sprite().setSize(408,132).setPosition(0,132).setAnchorPoint(0,0).setFill('rgb(0,125,0)');
    fightLayer.appendChild(sky);
    fightLayer.appendChild(grass);

    //create fightScene hero and monster
    var fighter1 = new lime.Sprite().setSize(hero.getSize()).setFill(hero.getFill()).setPosition(50,190);

    //create fightScene labels
    var labelFighter1Life = new lime.Label().setText('Life:' + hero.life).setPosition(124,200);
    var labelFighter1Attack = new lime.Label().setText('Attack:' + hero.attack).setPosition(124, 220);

    //create fightScene buttons
    var attackButton = new lime.GlossyButton().setSize(70,20).setPosition(40,10).setText('ATTACK').setColor('#B0171F');
    var runButton = new lime.GlossyButton().setSize(70,20).setPosition(120,10).setText('RUN').setColor('#B0171F');

    //append fightScene elements to canvas
    fightLayer.appendChild(fighter1);
    fightLayer.appendChild(labelFighter1Life);
    fightLayer.appendChild(labelFighter1Attack);
    fightLayer.appendChild(attackButton);
    fightLayer.appendChild(runButton);
    fightScene.appendChild(fightLayer);

    //create some default values for fighter2
    hero.inFightScene = false;
    labelFighter2Life = new lime.Label().setText('Life:').setPosition(284, 200);
    labelFighter2Attack = new lime.Label().setText('Attack:').setPosition(284, 220);
    fighter2 = new lime.Sprite().setSize(monster.getSize()).setFill(monster.getFill()).setScale(.3).setPosition(360,200);

    //hero monster collision event
    lime.scheduleManager.schedule(function(dt) {
        //if the hero is not in a fight scene
        if (!this.inFightScene) {
            //if the monster isn't dead, and they are intersecting
            if (monster.life>0 && goog.math.Box.intersects(this.getBoundingBox(), monster.getBoundingBox())) {
                //replace scene
                director.replaceScene(fightScene);
                fightLayer.setDirty(255);

                //hide element from previous fight
                fighter2.setHidden(true);
                delete fighter2;
                labelFighter2Life.setHidden(true);
                delete labelFighter2Life;
                labelFighter2Attack.setHidden(true);
                delete labelFighter2Attack;

                //create new values for fighter2
                fighter2 = new lime.Sprite().setSize(monster.getSize()).setFill(monster.getFill()).setScale(.3).setPosition(360,200);
                fightLayer.appendChild(fighter2);
                fighter2.life = 20;
                fighter2.money = 10;
                fighter2.attack = 2;
                currentFighter2 = 'wolf';
                labelFighter2Life = new lime.Label().setText('Life:' + fighter2.life).setPosition(284, 200);
                fightLayer.appendChild(labelFighter2Life);
                labelFighter2Attack = new lime.Label().setText('Attack:' + fighter2.attack).setPosition(284, 220);
                fightLayer.appendChild(labelFighter2Attack);
                
                //track which scene hero is currently in
                hero.inFightScene = true;

            }
        }
    }, hero);

    //hero ghost1 collision event
    hero.inFightScene = false;

    lime.scheduleManager.schedule(function(dt) {
        if (!this.inFightScene) {
            if (ghost1.life>0 && goog.math.Box.intersects(this.getBoundingBox(), ghost1.getBoundingBox())) {


                director.replaceScene(fightScene);
                fightLayer.setDirty(255);
                fighter2.setHidden(true);
                delete fighter2;
                labelFighter2Life.setHidden(true);
                delete labelFighter2Life;
                labelFighter2Attack.setHidden(true);
                delete labelFighter2Attack;
                fighter2 = new lime.Sprite().setSize(ghost1.getSize()).setFill(ghost1.getFill()).setPosition(360,200);
                fightLayer.appendChild(fighter2);
                fighter2.life = 10;
                fighter2.money = 10;
                fighter2.attack = 1;
                currentFighter2 = 'ghost1';
                labelFighter2Life = new lime.Label().setText('Life:' + fighter2.life).setPosition(284, 200);
                fightLayer.appendChild(labelFighter2Life);
                labelFighter2Attack = new lime.Label().setText('Attack:' + fighter2.attack).setPosition(284, 220);
                fightLayer.appendChild(labelFighter2Attack);
                hero.inFightScene = true;
            }
        }
    }, hero);

    //hero ghost2 collision event
    hero.inFightScene = false;

    lime.scheduleManager.schedule(function(dt) {
        if (!this.inFightScene) {
            if (ghost2.life>0 && goog.math.Box.intersects(this.getBoundingBox(), ghost2.getBoundingBox())) {

                director.replaceScene(fightScene);
                fightLayer.setDirty(255);
                fighter2.setHidden(true);
                delete fighter2;
                labelFighter2Life.setHidden(true);
                delete labelFighter2Life;
                labelFighter2Attack.setHidden(true);
                delete labelFighter2Attack;
                fighter2 = new lime.Sprite().setSize(ghost2.getSize()).setFill(ghost2.getFill()).setPosition(360,200);
                fightLayer.appendChild(fighter2);
                fighter2.life = 10;
                fighter2.money = 10;
                fighter2.attack = 1;
                currentFighter2 = 'ghost2';
                labelFighter2Life = new lime.Label().setText('Life:' + fighter2.life).setPosition(284, 200);
                fightLayer.appendChild(labelFighter2Life);
                labelFighter2Attack = new lime.Label().setText('Attack:' + fighter2.attack).setPosition(284, 220);
                fightLayer.appendChild(labelFighter2Attack);
                hero.inFightScene = true;


            }
        }
    }, hero);

    //hero key collision event
    hero.hasKey = false;

    lime.scheduleManager.schedule(function(dt) {
        if (goog.math.Box.intersects(hero.getBoundingBox(), key.getBoundingBox())) {
            hero.hasKey = true;
            key.setHidden(true);
            delete key;
        }
    });

    //hero door collision event
    lime.scheduleManager.schedule(function (dt) {
        if (goog.math.Box.intersects(hero.getBoundingBox(), door.getBoundingBox())) {
            if (!hero.hasKey) {
                var position = hero.getPosition();
                position.x -= 24;
                hero.mapPosX -= 1;
            }
            else {
                door.setHidden(true);
                delete door;
            }
        }
    });

    //keypress event listener 
    goog.events.listen(document, ['keydown'], function(e) {
        var velocity = 24;
        position = hero.getPosition();

        if (e.keyCode == goog.events.KeyCodes.UP) {
            if (mapData[hero.mapPosY-1][hero.mapPosX] != '#' && mapData[hero.mapPosY-1][hero.mapPosX] == '.') {
                position.y -= velocity;
                hero.mapPosY -= 1;
            }
        }
        if (e.keyCode == goog.events.KeyCodes.RIGHT) {
            if (mapData[hero.mapPosY][hero.mapPosX+1] != '#' && mapData[hero.mapPosY][hero.mapPosX+1] == '.') {
                position.x += velocity;
                hero.mapPosX += 1;
            }
        }
        if (e.keyCode == goog.events.KeyCodes.DOWN) {
            if (mapData[hero.mapPosY+1][hero.mapPosX] != '#' && mapData[hero.mapPosY+1][hero.mapPosX] == '.') {
                position.y += velocity;
                hero.mapPosY += 1;
            }
        }
        if (e.keyCode == goog.events.KeyCodes.LEFT) {
            if (mapData[hero.mapPosY][hero.mapPosX-1] != '#' && mapData[hero.mapPosY][hero.mapPosX-1] == '.') {
                position.x -= velocity;
                hero.mapPosX -= 1;
            }
        }
        hero.setPosition(position.x, position.y);
    });

    //run button click event
    goog.events.listen(runButton, ['mousedown', 'touchstart'], function(e) {
        //replace mapScene
        director.replaceScene(mapScene);
        mapLayer.setDirty(255);
        hero.inFightScene = false;
        //move hero away from the monster so fightScene does not retrigger
        position = hero.getPosition();
        if (hero.mapPosY == mapData.length) {
            if (mapData[hero.mapPosY-1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y-24);
                hero.mapPosY -= 1;
            }
            else if (mapData[hero.mapPosY][hero.mapPosX+1] == '.') {
                hero.setPosition(position.x+24, position.y);
                hero.mapPosX += 1;
            }
            else if (mapData[hero.mapPosY][hero.mapPosX-1] == '.') {
                hero.setPosition(position.x-24, position.y);
                hero.mapPosX -= 1;
            }
        }
        else if (hero.mapPosY == 0) {
            if (mapData[hero.mapPosY+1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y+24);
                hero.mapPosY += 1;
            }
            else if (mapData[hero.mapPosY][hero.mapPosX+1] == '.') {
                hero.setPosition(position.x+24, position.y);
                hero.mapPosX += 1;
            }
            else if (mapData[hero.mapPosY][hero.mapPosX-1] == '.') {
                hero.setPosition(position.x-24, position.y);
                hero.mapPosX -= 1;
            }
        }
        else if (hero.mapPosX == mapData[hero.mapPosY].length) {
            if (mapData[hero.mapPosY][hero.mapPosX-1] == '.') {
                hero.setPosition(position.x-24, position.y);
                hero.mapPosX -= 1;
            }
            else if (mapData[hero.mapPosY+1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y+24);
                hero.mapPosY += 1;
            }
            else if (mapData[hero.mapPosY-1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y-24);
                hero.mapPosY -= 1;
            }
        }
        else if  (hero.mapPosX == 0) {
            if (mapData[hero.mapPosY][hero.mapPosX+1] == '.') {
                hero.setPosition(position.x+24, position.y);
                hero.mapPosX += 1;
            }
            else if (mapData[hero.mapPosY-1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y-24);
                hero.mapPosY -= 1;
            }
            else if (mapData[hero.mapPosY+1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y+24);
                hero.mapPosY += 1;
            }
        }
        else {
            if (mapData[hero.mapPosY+1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y+24);
                hero.mapPosY += 1;
            }
            else if (mapData[hero.mapPosY][hero.mapPosX-1] == '.') {
                hero.setPosition(position.x-24, position.y);
                hero.mapPosX -= 1;
            }  
            else if (mapData[hero.mapPosY-1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y-24);
                hero.mapPosY -= 1;
            }
            else if (mapData[hero.mapPosY][hero.mapPosX+1] == '.') {
                hero.setPosition(position.x+24, position.y);
                hero.mapPosX += 1;
            }
        }
        //         movePositions = {
        //     left: {
        //         player: {x: position.x - 24, y: position.y},
        //         is_open: (typeof mapData[hero.mapPosY][hero.mapPosX-1] !== 'undefined') ? mapData[hero.mapPosY][hero.mapPosX-1] : null,
        //         map: {x: hero.mapPosX - 1, y: hero.mapPosY}
        //     },
        //     right: {
        //         player: {x: position.x + 24, y: position.y},
        //         is_open: (typeof mapData[hero.mapPosY][hero.mapPosX+1] !== 'undefined') ? mapData[hero.mapPosY][hero.mapPosX+1] : null,
        //         map: {x: hero.mapPosX + 1, y: hero.mapPosY}
        //     },
        //     bottom: {
        //         player: {x: position.x, y: position.y + 24},
        //         is_open: (typeof mapData[hero.mapPosY+1] !== 'undefined') ? mapData[hero.mapPosY+1][hero.mapPosX] : null,
        //         map: {x: hero.mapPosX, y: hero.mapPosY - 1}
        //     },
        //     top: {
        //         player: {x: position.x, y: position.y - 24},
        //         is_open: (typeof mapData[hero.mapPosY-1] !== 'undefined') ? mapData[hero.mapPosY-1][hero.mapPosX] : null,
        //         map: {x: hero.mapPosX, y: hero.mapPosY + 1}
        //     },
            
        // };

        // for(pos in movePositions) {
        //     if(movePositions[pos].is_open == '.'){
        //         hero.setPosition(movePositions[pos].player.x, movePositions[pos].player.y);
        //         hero.mapPosY = movePositions[pos].map.y;
        //         hero.mapPosX = movePositions[pos].map.x;
        //         break;
        //     }
        // }
    });

    //attack button click event
    goog.events.listen(attackButton, ['mousedown', 'touchstart'], function(e) {
        //make random number
        var randomNum = Math.random();

        if (randomNum < .5) {
            fighter2.life -= hero.attack;
            if (fighter2.life <= 0) {
                console.log('fighter2 dead');
                //add fighter2 money
                hero.money += fighter2.money;
                //return to map
                director.replaceScene(mapScene);
                mapLayer.setDirty(255);
                hero.inFightScene = false;
                //delete fighter2 object
                if (currentFighter2 == 'wolf') {
                    monster.setHidden(true);
                    delete ghost1;
                }
                else if (currentFighter2 == 'ghost1') {
                    ghost1.setHidden(true);
                    delete ghost1;
                }
                else {
                    ghost2.setHidden(true);
                    delete ghost2;
                }
                if (hero.mapPosY == mapData.length) {
            if (mapData[hero.mapPosY-1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y-24);
                hero.mapPosY -= 1;
            }
            else if (mapData[hero.mapPosY][hero.mapPosX+1] == '.') {
                hero.setPosition(position.x+24, position.y);
                hero.mapPosX += 1;
            }
            else if (mapData[hero.mapPosY][hero.mapPosX-1] == '.') {
                hero.setPosition(position.x-24, position.y);
                hero.mapPosX -= 1;
            }
        }
        else if (hero.mapPosY == 0) {
            if (mapData[hero.mapPosY+1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y+24);
                hero.mapPosY += 1;
            }
            else if (mapData[hero.mapPosY][hero.mapPosX+1] == '.') {
                hero.setPosition(position.x+24, position.y);
                hero.mapPosX += 1;
            }
            else if (mapData[hero.mapPosY][hero.mapPosX-1] == '.') {
                hero.setPosition(position.x-24, position.y);
                hero.mapPosX -= 1;
            }
        }
        else if (hero.mapPosX == mapData[hero.mapPosY].length) {
            if (mapData[hero.mapPosY][hero.mapPosX-1] == '.') {
                hero.setPosition(position.x-24, position.y);
                hero.mapPosX -= 1;
            }
            else if (mapData[hero.mapPosY+1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y+24);
                hero.mapPosY += 1;
            }
            else if (mapData[hero.mapPosY-1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y-24);
                hero.mapPosY -= 1;
            }
        }
        else if  (hero.mapPosX == 0) {
            if (mapData[hero.mapPosY][hero.mapPosX+1] == '.') {
                hero.setPosition(position.x+24, position.y);
                hero.mapPosX += 1;
            }
            else if (mapData[hero.mapPosY-1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y-24);
                hero.mapPosY -= 1;
            }
            else if (mapData[hero.mapPosY+1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y+24);
                hero.mapPosY += 1;
            }
        }
        else {
            if (mapData[hero.mapPosY+1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y+24);
                hero.mapPosY += 1;
            }
            else if (mapData[hero.mapPosY][hero.mapPosX-1] == '.') {
                hero.setPosition(position.x-24, position.y);
                hero.mapPosX -= 1;
            }  
            else if (mapData[hero.mapPosY-1][hero.mapPosX] == '.') {
                hero.setPosition(position.x, position.y-24);
                hero.mapPosY -= 1;
            }
            else if (mapData[hero.mapPosY][hero.mapPosX+1] == '.') {
                hero.setPosition(position.x+24, position.y);
                hero.mapPosX += 1;
            }
        }
            }
        }
        else {
            hero.life -= monster.attack;
            //initiate game over if hero is dead
            if (hero.life <= 0) {
                var labelGameOver = new lime.Label().setText('GAMEOVER').setPosition(160,100);
                fightLayer.appendChild(labelGameOver);
            }
        }
        //update life totals
        labelFighter1Life.setText('Life:' + hero.life);
        labelFighter2Life.setText('Life:' + fighter2.life);
    });
}


