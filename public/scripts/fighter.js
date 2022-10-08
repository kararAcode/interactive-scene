
const PLAYERSTATE = {
    IDLE: 0,
    ATTACK1: 1,
    ATTACK2: 2,
    RUN: 3,
    TAKEHIT: 4
};

class FighterSprite {
    constructor(playerName) {
        this.playerName = playerName;
        this.position = {x : 50, y:windowHeight*0.75};
        this.runningSpeed = 4;
        this.health = 100;
        this.state = PLAYERSTATE.IDLE;
        this.reversed;
        this.spriteData = spritesheetData[this.playerName];
        this.animations = [];

        
    }

    init() {
        for (let i = 0; i < this.spriteData.length; i++) {
            let img = loadImage(this.spriteData[i]["spritesheet"])
            this.animations.push(img);
        }
                
    }

    moveForward() {
        this.position.x += this.runningSpeed
        this.state = PLAYERSTATE.RUN;

        this.reversed = false;

        
    }

    moveBackward() {
        this.position.x -= this.runningSpeed
        this.state = PLAYERSTATE.RUN;

        this.reversed = true;

        
    }

    attack1() {
        this.state = PLAYERSTATE.ATTACK1;

    }

    attack2() {
        this.state = PLAYERSTATE.ATTACK2;

    }

    draw() {
        
       
       
       this.animations[this.state].play();

       if (this.reversed) {
            push()
            scale(-1, 1);
            image(this.animations[this.state], -this.position.x-200, this.position.y);
            pop()
        }

        else {
            image(this.animations[this.state], this.position.x, this.position.y);
        }



       this.state = PLAYERSTATE.IDLE;
    }

    
}