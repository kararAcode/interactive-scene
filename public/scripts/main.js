
let fighter1;
let fighter2;

let bg;
new p5();




function preload() {
    
    bg = loadImage("/assets/Free Pixel Art Forest/Preview/Background.png"); //loads background

    // fighter1 = new FighterSprite("Martial Hero");
    // fighter1.init();
    // fighter2 = new FighterSprite("Wizard Pack");
    // fighter2.init();

    
   
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}



function draw() {

    background(bg);

    inputHandler(fighter1);
    fighter1.draw();
    fighter2.draw();


    // let hit = collideRectRect(fighter1.position.x, fighter1.position.y, fighter1.frameWidth, fighter1.frameHeight, 
    //     fighter2.position.x, fighter2.position.y, fighter2.frameWidth, fighter2.frameHeight);
    // console.log(hit);

    // if (hit && fighter1.state === PLAYERSTATE.ATTACK1){
    //     fighter1.takehit();
    // }



}





function inputHandler(fighter) {
    if (keyIsDown(65)) {
        fighter.moveBackward(); 
        sendPosition(fighter.position.x, fighter.position.y, fighter.state, fighter.reversed);
    }

    if (keyIsDown(68)) {
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

const socket = new WebSocket('ws://interactive-scene.herokuapp.com');

socket.addEventListener("open", (e) => {
    // socket.send("Hello Server");
});

socket.addEventListener("message", (e) => {
    let msg = JSON.parse(e.data);

    if (msg.messageType === "setting-position") {
        console.log(msg)
        fighter1 = new FighterSprite(msg.data.player1Data.playerName);
        fighter1.init();
        fighter1.position.x = msg.data.player1Data.pos.xFactor * windowWidth;
        // fighter1.postiion.y = msg.data.player1Data.pos.yFactor * windowHeight;
        fighter1.reversed = msg.data.player1Data.reversed;

        fighter2 = new FighterSprite(msg.data.player2Data.playerName);
        fighter2.init();
        fighter2.position.x = msg.data.player2Data.pos.xFactor * windowWidth;
        // fighter2.position.y = msg.data.player2Data.pos.yFactor * windowHeight;
        fighter2.reversed = msg.data.player2Data.reversed;

    }


    else {
        if (msg.state === PLAYERSTATE.RUN) {
            if (msg.reversed) {
                fighter2.moveBackward();
            }

            else {
                fighter2.moveForward();
            }
        }
        
        if (msg.state === PLAYERSTATE.ATTACK1) {
            fighter2.attack1();
        } 

        if (msg.state === PLAYERSTATE.ATTACK2) {
            fighter2.attack2();
            
        } 

        if (msg.state === PLAYERSTATE.TAKEHIT) {
            fighter2.takehit();

        } 
    }
    

});

function sendPosition(x, y, state, reversed) {
    socket.send(JSON.stringify({x, y, state, reversed}));

}


