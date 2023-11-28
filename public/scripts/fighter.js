
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
        this.velocity = {x: 0, y: 0};

        this.health = 100;
        this.state = PLAYERSTATE.IDLE;
        this.reversed;
        this.animations = animations;

        this.currentFrame = 0;

        this.frameWidth = this.animations[0].width / spritesheetData[this.name][0]["frames"];
        this.frameHeight = this.animations[0].height;
        this.maxFrames = spritesheetData[this.name][this.state]["frames"];

        this.gravity = 0.7;
        this.gameFrame = 0;
        this.staggerFrames = 5;
        
        
    }

    stop() {
        this.state = PLAYERSTATE.IDLE;
        this.velocity.x = 0;
        this.currentFrame = 0;
    }

    moveForward() {
        // this.position.x += this.runningSpeed
        this.velocity.x = 5;
        this.state = PLAYERSTATE.RUN;

        this.reversed = false; //whenever this function is called you turn to the right

    }

    moveBackward() {
        // this.position.x -= this.runningSpeed
        this.velocity.x = -5;
        
        this.state = PLAYERSTATE.RUN;
        

        this.reversed = true; //whenever this function is called you turn to the left

        
    }

    attack1() {
        if (this.state === PLAYERSTATE.IDLE) {
            this.state = PLAYERSTATE.ATTACK1;
            this.velocity.x = 0;
        }

    }

    attack2() {
        if (this.state === PLAYERSTATE.IDLE) {
            this.state = PLAYERSTATE.ATTACK2;
            this.velocity.x = 0;

        }
    }

    takehit() {
        this.state = PLAYERSTATE.TAKEHIT;
    }

    death() {
        fighter1.health = 0; // this sets health to 0 since the health sometimes goes below
        this.state = PLAYERSTATE.DEATH;
    }

    update() {
        

        if (this.keys !== undefined) {
            this.velocity.x = 0;


            if (this.keys.a.pressed && this.state !== PLAYERSTATE.ATTACK1 && this.state !== PLAYERSTATE.ATTACK2) {
                this.moveBackward();
                sendPosition(this.position.x, this.position.y, this.state, this.reversed);
            }
    
            if (this.keys.d.pressed && this.state !== PLAYERSTATE.ATTACK1 && this.state !== PLAYERSTATE.ATTACK2) {
                this.moveForward();
                sendPosition(this.position.x, this.position.y, this.state, this.reversed);
            }
    
            if (this.keys.j.pressed && lastKey==="j") {
                this.attack1();
                sendPosition(this.position.x, this.position.y, this.state, this.reversed);
            }
    
            if (this.keys.k.pressed) {
                this.attack2();
                sendPosition(this.position.x, this.position.y, this.state, this.reversed);
            }


            
            if (!this.keys.a.pressed && !this.keys.d.pressed && lastKey !== "j" && lastKey !=="k") {
                this.state = PLAYERSTATE.IDLE;
                sendPosition(this.position.x, this.position.y, this.state, this.reversed);
    
            }
        }

        if (this.position.y + this.frameHeight + this.velocity.y >= height) {
            this.velocity.y = 0;
        }

        else {
            this.velocity.y += this.gravity
        }

        
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

    


        

        
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
            image(frame, -this.position.x-200, this.position.y, this.frameWidth, this.frameHeight);
            pop();
        }

        else {
            let frame = await spriteImg.get(this.currentFrame*this.frameWidth, 0, this.frameWidth, this.frameHeight);

            image(frame, this.position.x, this.position.y, this.frameWidth, this.frameHeight);
        }

        

      
        
        if (this.gameFrame % this.staggerFrames === 0) {
            if (this.currentFrame < this.maxFrames-1) {
                // if the animation is finished go back to the idle state
                this.currentFrame++;
            
            }
    
            else {
                this.stop();
            }
        }

        this.gameFrame++;

        



    }
    
}