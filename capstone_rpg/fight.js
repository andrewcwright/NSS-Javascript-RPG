goog.provide('capstone_rpg.fight');
goog.require('lime.Director'); 
goog.require('lime.Scene'); 
goog.require('lime.Layer');
goog.require('lime.fill.LinearGradient');
goog.require('goog.math');
goog.require('lime.GlossyButton');

capstone_rpg.fight = function(director, fighter1, fighter1InFightScene, fighter1Life, fighter1Attack, fighter2, fighter2Life, fighter2Attack) {
    //create fightScene
    var fightScene = new lime.Scene().setRenderer();
    var fightLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
    var skyGradient = new lime.fill.LinearGradient().setDirection(1,1,1,0).addColorStop(0, '#B2DFEE').addColorStop(1, '#0000CD');
    var sky = new lime.Sprite().setSize(408,132).setPosition(0,0).setAnchorPoint(0,0).setFill(skyGradient);
    var grass = new lime.Sprite().setSize(408,132).setPosition(0,132).setAnchorPoint(0,0).setFill('rgb(0,125,0)');
    fightLayer.appendChild(sky);
    fightLayer.appendChild(grass);

    //create fightScene hero and monster
    //var fighter1 = new lime.Sprite().setSize(hero.getSize()).setFill(hero.getFill()).setPosition(50,190);
    //var fighter2 = new lime.Sprite().setSize(monster.getSize()).setFill(monster.getFill()).setScale(.3).setPosition(360,200);

    //create fightScene labels
    var labelFighter1Life = new lime.Label().setText('Life:' + fighter1Life).setPosition(124,200);
    var labelFighter1Attack = new lime.Label().setText('Attack:' + fighter1Attack).setPosition(124, 220);
    var labelFighter2Life = new lime.Label().setText('Life:' + fighter2Life).setPosition(284, 200);
    var labelFighter2Attack = new lime.Label().setText('Attack:' + fighter2Attack).setPosition(284, 220);

    //create fightScene buttons
    var attackButton = new lime.GlossyButton().setSize(70,20).setPosition(40,10).setText('ATTACK').setColor('#B0171F');
    var runButton = new lime.GlossyButton().setSize(70,20).setPosition(120,10).setText('RUN').setColor('#B0171F');

    fightLayer.appendChild(fighter1);
    fightLayer.appendChild(fighter2);
    fightLayer.appendChild(labelFighter1Life);
    fightLayer.appendChild(labelFighter1Attack);
    fightLayer.appendChild(labelFighter2Life);
    fightLayer.appendChild(labelFighter2Attack);
    fightLayer.appendChild(attackButton);
    fightLayer.appendChild(runButton);
    fightScene.appendChild(fightLayer);
	
	director.replaceScene(fightScene);
	fightLayer.setDirty(255);
    hero.inFightScene = true;
}
