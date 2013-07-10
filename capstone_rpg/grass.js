goog.provide('capstone_rpg.grass');
goog.require('lime.Sprite');

/**
 * Land elements
 * 
 * @param {} gameObj
 */
capstone_rpg.grass = function(gameObj) {
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(gameObj.tile_size,gameObj.tile_size);
    this.setFill('grass.png');
}

goog.inherits(capstone_rpg.grass,lime.Sprite);