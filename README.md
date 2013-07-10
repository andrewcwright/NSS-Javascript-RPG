============
Capstone RPG
============

This is my capstone project for the first half of the Nashville Software School. It uses the limeJS javascript framework to create a small top down rpg environment. You can start the game by running capstone_rpg.html from the capstone_rpg folder. You can use the arrow keys to move around, and the mouse to click buttons in combat.

===========================
03/18/2013 - MAJOR REDESIGN
===========================

I have decided to move the project to the limeJS framework. You can run the game by going to the capstone_rpg directory and running the html file there. The current functionality allows the player to move around the screen with a mouseclick or screen tap. If the player moves on top of the wolf, the collision is detected and a fight scene engages. In the fight scene the hero can either run or fight. If the hero runs he is returned to his starting position in the game. If he chooses to fight, a random number is used to calculate whether the hero hits the monster or vice-versa. The person who gets hit has the opponent's attack score subtracted from their life. This continues until someone is dead. If the heros wins the monster vanishes. Otherwise a game over message is displayed.

===============================================
03/19/2012 - More controls, collision detection
===============================================

I have added movement with the arrow keys. I changed the map to be dynamically generated from tile objects. The stone object has some problems with collision detection. The player will not move through it but becomes stuck on the object.

=====================================
03/22/2012 - Map Generation, Key/Door
=====================================

I got collision detection working properly. I have added dynamic map generation based on an array of ASCII characters. I have added a key on the map which opens the door to the boss room. 

==================================
03/25/2012 - New Monster, New Bugs
==================================

After many failed attempts, I was able to add a new ghost monster to the map. This required a major overhaul of the combat system, which still has a few bugs. The labels displaying the monster's life total and attack rating are not refreshing correctly. Also the hero is not able to return to the map properly once combat has concluded. For now I am returning him to his starting position so that he does not wind up in an infinite combat loop.

===================
Future Design Goals
===================
* add menus for battle system and inventory
* improve complexity of the battle system
* make code more modular
* create a larger map, making the screen scroll over as the character moves
* improve tile art

==================
Special Thanks To:
==================
* http://www.limejs.com/
* http://www.chimou.com/8-bit-avatar/
* http://opengameart.org/
