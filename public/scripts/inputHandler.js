class InputHandler {
    constructor(fighter) {

        if (keyIsDown(65) && fighter.position.x >= -70) { //moves backwards whenever A is pressed and in boundries
            fighter.moveBackward(); 
            sendPosition(fighter.position.x, fighter.position.y, fighter.state, fighter.reversed); //sends state to other socket
        }
    
        if (keyIsDown(68) && fighter.position.x <= windowWidth - 150) {//moves forward whenever D is pressed and in boundries
            fighter.moveForward();
            sendPosition(fighter.position.x, fighter.position.y, fighter.state, fighter.reversed);
        }
    
        if (keyIsDown(74)) { // whenever J is presseed attack1 is executed
            fighter.attack1();
            sendPosition(fighter.position.x, fighter.position.y, fighter.state, fighter.reversed);
        }
    
        if (keyIsDown(75)) { // whenever K is presseed attack2 is executed
            fighter.attack2();
            sendPosition(fighter.position.x, fighter.position.y, fighter.state, fighter.reversed);
        }

        document.addEventListener("keyup", (e) => {
            if (e.key === "d") {
                fighter.stop();
                sendPosition(fighter.position.x, fighter.position.y, fighter.state, fighter.reversed);

            }

            if (e.key === "a") {
                fighter.stop();
                sendPosition(fighter.position.x, fighter.position.y, fighter.state, fighter.reversed);

            }
        });


    }
}

