class InputHandler {
    constructor(fighter) {
        if (keyIsDown(65) && fighter.position.x >= -70) {
            fighter.moveBackward(); 
            sendPosition(fighter.position.x, fighter.position.y, fighter.state, fighter.reversed);
        }
    
        if (keyIsDown(68) && fighter.position.x <= windowWidth - 150) {
            fighter.moveForward();
            sendPosition(fighter.position.x, fighter.position.y, fighter.state, fighter.reversed);
        }
    
        if (keyIsDown(74)) {
            fighter.attack1();
            sendPosition(fighter.position.x, fighter.position.y, fighter.state, fighter.reversed);
        }
    
        if (keyIsDown(75)) {
            fighter.attack2();
            sendPosition(fighter.position.x, fighter.position.y, fighter.state, fighter.reversed);
        }


    }
}

