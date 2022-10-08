class InputHandler {
    constructor(fighter) {
        if (keyIsDown(65)) {
            fighter.moveBackward();
            
        }
    
        if (keyIsDown(68)) {
            fighter.moveForward();
        }

        if (keyIsDown(74)) {
            fighter.attack1();
        }

        if (keyIsDown(75)) {
            fighter.attack2();
        }


    }
}

