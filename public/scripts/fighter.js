
const PLAYERSTATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK1: 2,
    ATTACK2: 3,
    TAKEHIT: 4,
    DEATH: 5,
};

class FighterSprite {
    constructor(playerName) {
        this.playerName = playerName;
        this.position = {x : 50, y:50};
        this.runningSpeed;
        this.health = 100;
        this.state = PLAYERSTATE.IDLE;
        this.reversed;
        this.img;
        
        this.spriteData = spritesheetData[this.playerName]
        this.animations = []

        
    }

    init() {
        for (let i = 0; i < this.spriteData.length; i++) {
            let img = loadImage(this.spriteData[i]["spritesheet"])
            this.animations.push(img);
        }
                
    }

    moveForward() {
        this.state = PLAYERSTATE.RUN;
        this.position.x += this.runningSpeed
    }

    moveBackward() {
        this.state = PLAYERSTATE.RUN;
        this.position.x -= this.runningSpeed
    }

    attack1() {
        this.state = PLAYERSTATE.ATTACK1;

    }

    attack2() {
        this.state = PLAYERSTATE.ATTACK2;

    }

    draw() {
       this.animations[this.state].play();

       image(this.animations[this.state], this.position.x, this.position.y);
    }

    
}