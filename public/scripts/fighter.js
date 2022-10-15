
const PLAYERSTATE = {
    IDLE: 0,
    ATTACK1: 1,
    ATTACK2: 2,
    RUN: 3,
    TAKEHIT: 4,
    DEATH: 5
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

        this.frameWidth;
        this.frameHeight;
        this.lastTime = 0;
        
    }

    init() {
        for (let i = 0; i < this.spriteData.length; i++) {
            let img = loadImage(this.spriteData[i]["spritesheet"])
            this.frameHeight = img.height;
            this.frameWidth = img.width;
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

    takehit() {
        this.state = PLAYERSTATE.TAKEHIT;
    }

    death() {
        fighter1.health = 0;
        this.state = PLAYERSTATE.DEATH;
    }

    draw() {
       

       if (this.lastTime !== -1 && this.state !== PLAYERSTATE.DEATH) {
        this.animations[this.state].play();

       }
       

       if (this.reversed) {
            push()
            scale(-1, 1);
            image(this.animations[this.state], -this.position.x-200, this.position.y);
            pop()
        }

        else {
            image(this.animations[this.state], this.position.x, this.position.y);
        }


        if (this.state === PLAYERSTATE.TAKEHIT) {

            this.takehit();
            this.lastTime++;
            
            if (this.lastTime >= 120) {
                this.state = PLAYERSTATE.IDLE;
                this.lastTime = 0;
            }
            
        }

        if (this.state === PLAYERSTATE.DEATH) {

            this.death();
            this.lastTime++;
            
            if (this.lastTime >= 120) {
                this.animations[this.state].pause();
                this.lastTime = -1;
            }
            
        }

        else if (this.state !== PLAYERSTATE.TAKEHIT) {
            this.state = PLAYERSTATE.IDLE;
        }

    }

    
}