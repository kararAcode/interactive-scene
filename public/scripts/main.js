// let x; 
// let y;

// let x2;
// let y2;

// let dx = 2;
// let dy = 2;

// import { FighterSprite } from "./fighter.js";

let fighter1;



function setup() {
    createCanvas(800, 600);
    fighter1 = new FighterSprite("Martial Hero");
    fighter1.setup();
}



function draw() {
    background(220);

    // fill("black")

    circle(50, 50, 50)

    // square(x, y, 50);
    // square(x2, y2, 50);


    // inputHandler();


    
}

function inputHandler() {
    if (keyIsDown(65)) {
        sendPosition(x, y)
        x -= dx;
        
    }

    if (keyIsDown(68)) {
        sendPosition(x, y)
        x += dx;
        
    }

    if (keyIsDown(87)) {
        sendPosition(x, y)
        y -= dy;
        
    }

    if (keyIsDown(83)) {
        sendPosition(x, y)
        y += dy;
    }
}

const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener("open", (e) => {
    // socket.send("Hello Server");
});

socket.addEventListener("message", (e) => {
    let msg = JSON.parse(e.data);

    if (msg.messageType === "setting-position") {
        x = msg.data.yourPos.x;
        y = msg.data.yourPos.y;

        x2 = msg.data.otherPos.x;
        y2 = msg.data.otherPos.y;

    }


    else {
        x2 = msg.x;
        y2 = msg.y;
    }
    

});

function sendPosition(x, y) {
    socket.send(JSON.stringify({x:x, y:y}));

}


