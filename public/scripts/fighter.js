
// an object containing possible states
// the numbers map to their index in the this.spriteData array
const PLAYERSTATE = {
    IDLE: 0,
    ATTACK1: 1,
    ATTACK2: 2,
    RUN: 3,
    TAKEHIT: 4,
    DEATH: 5
};


class FighterSprite {
    constructor(name, animations) {
        this.name = name;
        this.position = {x : 50, y:height*0.75};
        this.runningSpeed = 0.005 * width;
        this.health = 100;
        this.state = PLAYERSTATE.IDLE;
        this.reversed;
        this.animations = animations;

        this.currentFrame = 0;

        this.frameWidth = this.animations[0].width / spritesheetData[this.name][0]["frames"];
        this.frameHeight = this.animations[0].height;
        this.maxFrames = spritesheetData[this.name][this.state]["frames"];

        this.gameFrame = 0;
        this.staggerFrames = 7;
        
        
    }

    stop() {
        this.state = PLAYERSTATE.IDLE;
        this.currentFrame = 0;
    }

    moveForward() {
        this.position.x += this.runningSpeed
        this.state = PLAYERSTATE.RUN;

        this.reversed = false; //whenever this function is called you turn to the right

    }

    moveBackward() {
        this.position.x -= this.runningSpeed
        this.state = PLAYERSTATE.RUN;
        

        this.reversed = true; //whenever this function is called you turn to the left

        
    }

    attack1() {
        if (this.state === PLAYERSTATE.IDLE) {
            this.state = PLAYERSTATE.ATTACK1;
        }

    }

    attack2() {
        if (this.state === PLAYERSTATE.IDLE) {
            this.state = PLAYERSTATE.ATTACK2;
        }
    }

    takehit() {
        this.state = PLAYERSTATE.TAKEHIT;
    }

    death() {
        fighter1.health = 0; // this sets health to 0 since the health sometimes goes below
        this.state = PLAYERSTATE.DEATH;
    }

    async draw() {
       // this function draws fighter depending on current state
       this.maxFrames = await spritesheetData[this.name][this.state]["frames"];

       let spriteImg = this.animations[this.state];
       let frameDuration = (1/spritesheetData[this.name][this.state]["fps"]) * 1000;
       

       if (this.reversed) {

            let frame = await spriteImg.get(this.currentFrame*this.frameWidth, 0, this.frameWidth, this.frameHeight);

            push();
            scale(-1, 1);
            image(frame, -this.position.x-200, this.position.y);
            pop();
        }

        else {
            let frame = await spriteImg.get(this.currentFrame*this.frameWidth, 0, this.frameWidth, this.frameHeight);

            image(frame, this.position.x, this.position.y);
        }

        

        if (millis() - timeOffset > this.lastTime + frameDuration) {
            this.currentFrame++;
            this.lastTime = millis() - timeOffset;
        }

        else  if (this.currentFrame < this.maxFrames-1) {
            if (this.state !== PLAYERSTATE.IDLE) {
                this.state = PLAYERSTATE.IDLE;
            }

            this.currentFrame =0;
        }
        
        // if (this.gameFrame % this.staggerFrames === 0) {
        //     if (this.currentFrame < this.maxFrames-1) {
        //         // if the animation is finished go back to the idle state
        //         this.currentFrame++;
            
        //     }
    
        //     else {
        //         if (this.state !== PLAYERSTATE.IDLE) {
        //             this.state = PLAYERSTATE.IDLE;
        //         }
    
        //         this.currentFrame =0;
        //     }
        // }

        this.gameFrame++;

        



    }
    
}