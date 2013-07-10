goog.provide('capstone_rpg.stone');
goog.require('lime.Sprite');

/**
 * Land elements
 * 
 * @param {} gameObj
 */
capstone_rpg.stone = function(gameObj) {
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(gameObj.tile_size,gameObj.tile_size);
    this.setFill('stone.png');
}

goog.inherits(capstone_rpg.stone,lime.Sprite);