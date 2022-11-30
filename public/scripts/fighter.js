
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
    constructor(playerName) {
        this.playerName = playerName;
        this.position = {x : 50, y:height*0.75};
        this.runningSpeed = 0.005 * width;
        this.health = 100;
        this.state = PLAYERSTATE.IDLE;
        this.reversed;
        this.spriteData = spritesheetData[this.playerName]; // array of urls for player chosen, spritesheetData refrenced in animations.js
        this.animations = [];

        this.currentFrame = 0;

        this.frameWidth;
        this.frameHeight;


        
        this.lastTime = 0;
        
    }

    async init() {
        // loads all gifs for animations
        for (let i = 0; i < this.spriteData.length; i++) {
            let img = await loadImage(this.spriteData[i]["spritesheet"])
            this.frameWidth = img.width;
            this.frameHeight = img.height;

            this.animations.push(img);

        }


        

                
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
        this.state = PLAYERSTATE.ATTACK1;

    }

    attack2() {
        this.state = PLAYERSTATE.ATTACK2;

    }

    takehit() {
        this.state = PLAYERSTATE.TAKEHIT;
    }

    death() {
        fighter1.health = 0; // this sets health to 0 since the health sometimes goes below
        this.state = PLAYERSTATE.DEATH;
    }

    draw() {
       // this function draws fighter depending on current state

       if (this.lastTime !== -1 && this.state !== PLAYERSTATE.DEATH) {
        this.animations[this.state].play();
       }
       
       let maxFrames = this.animations[this.state].numFrames();

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
            
            if (this.lastTime >= 120) { //this makes sure that the animation is played fully | 120 is used since this animation is 
                this.state = PLAYERSTATE.IDLE; // 2 sec and the draw loop is called 60 times a sec
                this.lastTime = 0;
            }
            
        }

        if (this.state === PLAYERSTATE.DEATH) {

            this.death();
            this.lastTime++;
            
            if (this.lastTime >= 120) {
                this.animations[this.state].pause(); // when you die the animation stops
                this.lastTime = -1; // prevents fighter from be redrawn
            }
            
        }

        else if (this.state !== PLAYERSTATE.TAKEHIT && this.animations[this.state].getCurrentFrame() !== maxFrames) {
            this.state = PLAYERSTATE.IDLE; // defaults to idle whenever you are not in any other state
            // with the exception of takehit 
        }

    }
    
}