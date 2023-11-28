//  Karar Al-Shanoon
//  Interactive-Scence Assignment
//  My extra for experts is the use of WebSockets and music

// fighter variables
let fighter1; // The fighter that you are controlling
let fighter2; // The fighter that the other user is controlling
let gameState = "start"; 

let animations = {
    "Martial Hero": null,
    "Wizard Pack": null,
}


let bg;
new p5(); // to prevent errors from coming up since p5 functions are used in classes

let gameMusic;
let menuMusic
let btn;

let socket;
let timeOffset;
let time;


function preload() {
    soundFormats('mp3', 'ogg');
    bg = loadImage("/assets/Free Pixel Art Forest/Preview/Background.png"); //loads background
    gameMusic = loadSound('assets/treachery'); // fighting music
    menuMusic = loadSound('assets/numberone'); // start and loadingscreen music

    for (const name of Object.keys(animations)) {
        let arr = [];
        for (let i = 0; i < spritesheetData[name].length; i++) {
            arr.push(loadImage(spritesheetData[name][i]["spritesheet"]));
        }
        animations[name] = arr;
    }

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    btn = new Button(width/2-100, height/2-50, 200, 100, "red", "Join Game"); // creates button for start screen

    menuMusic.play(); //menu music starts playing
    userStartAudio(); // starts audio on any user input
}



function draw() {


    // displays screen depending on gamestate

    if (gameState === "start") {
        startScreen();
    }

    if (gameState === "loading") {

        loadingScreen();
    }

    if (gameState === "main") {
        main();
    }

}


function checkForCollision() {
    let hit = collideRectRect(fighter1.position.x, fighter1.position.y, 200, 200, 
        fighter2.position.x, fighter2.position.y, 200, 200);


    return hit;
}


function startScreen() {
    background("black")

    btn.display();
    btn.onClick(() => { // when the button is clicked, loading screen shows
        clear();
        gameState = "loading";
        socket = new WebSocket('ws://localhost:5500'); // connects to socket server
        socketInit(); // initalizes socket event listeners
    });
}

function loadingScreen() {
    background("black")
    textSize(50);
    fill("white");
    textAlign(CENTER);    // centers text
    text("WAITING FOR PLAYER TO JOIN...", width/2, height/2);
}

function main() {
    background(bg);

    if (fighter2.state !== PLAYERSTATE.DEATH && fighter1.state !== PLAYERSTATE.DEATH) {
        textSize(14);
        fill("red");
        strokeWeight(10);
        text(`${Math.round(fighter1.health)}/100`, fighter1.position.x + 75, fighter1.position.y+50) // fighter1 health
        text(`${Math.round(fighter2.health)}/100`, fighter2.position.x + 75, fighter2.position.y+50) // fighter2 health
    }

    // draws fighters
    

    fighter1.draw();
    fighter2.draw();

    fighter1.update();
    fighter2.update();
}



function socketInit() {
    // 
    socket.addEventListener("message", (e) => {
        let msg = JSON.parse(e.data);

       
    
        if (msg.messageType === "start-game") {
            let fighter1Name = msg.data.player1Data.playerName
            let fighter2Name = msg.data.player2Data.playerName


            // this sets the fighter data once another player joins a game
            fighter1 = new FighterSprite(fighter1Name, animations[fighter1Name]);
            fighter1.position.x = msg.data.player1Data.pos.xFactor * windowWidth;
            fighter1.reversed = msg.data.player1Data.reversed;
            new InputHandler(fighter1); //input only works when both players are alive

    
            fighter2 = new FighterSprite(fighter2Name, animations[fighter2Name]);
            fighter2.position.x = msg.data.player2Data.pos.xFactor * windowWidth;
            fighter2.reversed = msg.data.player2Data.reversed;
            
            gameState = "main";  //switches to actual fighting game
            menuMusic.stop();

            // music switches over
            gameMusic.play();
            gameMusic.jump(35);

            timeOffset = millis();
    
        }
    
    
        else {
            // data is sent whenever changes happen from other player
            // deals with data and changes data to match

            
            
            if (msg.state === PLAYERSTATE.IDLE) {
                if (fighter2.velocity.x !== 0) {
                    fighter2.stop();

                }

                else {
                    fighter2.state = PLAYERSTATE.IDLE;
                }
            }

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
                dealWithHit()
            } 
    
            if (msg.state === PLAYERSTATE.ATTACK2) {
                fighter2.attack2();           
                dealWithHit();
                
            } 
    
            if (msg.state === PLAYERSTATE.TAKEHIT) {
                fighter2.takehit();
                fighter2.health -= 0.3;
    
            }
    
            if (msg.state === PLAYERSTATE.DEATH) {
                fighter2.death()
            }


        }
    });

    socket.addEventListener("close", () => {
        gameState = "start";
    });
}

function dealWithHit() {
    // checks whenever character is in range and is in attack state
    if (checkForCollision()) {
        fighter1.health -= 0.3;
        fighter1.takehit();
        sendPosition(fighter1.position.x, fighter1.position.y, fighter1.state, fighter1.reversed);

        if (fighter1.health <= 0) {
            // checks if player is dead
            fighter1.death();
            sendPosition(fighter1.position.x, fighter1.position.y, fighter1.state, fighter1.reversed);
        }
    }
}

function sendPosition(x, y, state, reversed) {
    // sends position and state of fighter
    socket.send(JSON.stringify({x, y, state, reversed}));
}


window.addEventListener("resize", () => {
    setup();
})