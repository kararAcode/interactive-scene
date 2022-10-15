
let fighter1;
let fighter2;
let state;

let bg;
new p5();

let music;


function preload() {
    soundFormats('mp3', 'ogg');
    bg = loadImage("/assets/Free Pixel Art Forest/Preview/Background.png"); //loads background
    music = loadSound('assets/treachery');


}

function setup() {
    createCanvas(windowWidth, windowHeight);

    music.play();
    music.jump(35);
    userStartAudio();
    
    
}



function draw() {

    background(bg);

    if (fighter2.state !== PLAYERSTATE.DEATH && fighter1.state !== PLAYERSTATE.DEATH) {
        new InputHandler(fighter1);
    }

    textSize(14);
    fill("red");
    strokeWeight(10);


    text(`${fighter1.health}/100`, fighter1.position.x + 75, fighter1.position.y+50)
    fighter1.draw();
    text(`${fighter2.health}/100`, fighter2.position.x +75, fighter2.position.y+50)
    fighter2.draw();

}


function checkForCollision() {
    let hit = collideRectRect(fighter1.position.x, fighter1.position.y, 200, 200, 
        fighter2.position.x, fighter2.position.y, 200, 200);


    return hit;
}


function startScreen() {

}



const socket = new WebSocket('ws://localhost:8080');

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
             
            if (checkForCollision()) {
                fighter1.health -= 1;
                // fighter1.health = Math.floor(fighter1.health);
                fighter1.takehit();
                sendPosition(fighter1.position.x, fighter1.position.y, fighter1.state, fighter1.reversed);

                if (fighter1.health <= 0) {
                    fighter1.death();
                    sendPosition(fighter1.position.x, fighter1.position.y, fighter1.state, fighter1.reversed);
                }
            }
        } 

        if (msg.state === PLAYERSTATE.ATTACK2) {
            fighter2.attack2();

            if (checkForCollision()) {
                fighter1.health -= 1;
                // fighter1.health = Math.floor(fighter1.health);
                fighter1.takehit();
                sendPosition(fighter1.position.x, fighter1.position.y, fighter1.state, fighter1.reversed);

                if (fighter1.health <= 0) {
                    fighter1.death();
                    sendPosition(fighter1.position.x, fighter1.position.y, fighter1.state, fighter1.reversed);
                }
            }
            
        } 

        if (msg.state === PLAYERSTATE.TAKEHIT) {
            fighter2.takehit();
            fighter2.health -= 1;
            // fighter2.health = Math.floor(fighter2.health);

        }

        if (msg.state === PLAYERSTATE.DEATH) {
            fighter2.death()
        }
    
    }
});

function sendPosition(x, y, state, reversed) {
    socket.send(JSON.stringify({x, y, state, reversed}));
}


