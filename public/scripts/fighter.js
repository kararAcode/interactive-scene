
const PLAYERSTATE = {
    IDLE: 0,
    RUN: 1,
    ATTACK1: 2,
    ATTACK2: 3,
    TAKEHIT: 4,
    JUMP: 5,
    DEATH: 6
};

class FighterSprite {
    constructor(playerName) {
        this.playerName = playerName;
        this.position;
        this.runningSpeed;
        this.health = 100;
        this.state = PLAYERSTATE.IDLE;
        this.reversed;

        
        let data = fetch("./scripts/animations.json")
                        .then((response) => response.json())
                        .then((json) => {
                            return json[this.playerName];
                        });
                        
        this.spriteData
    }

    setup() {

                     
                

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

    }

    attack2() {

    }

    draw() {
        let spriteSheetUrl = this.spriteData[this.state]["spritesheet"];
        let frames = this.spriteData[this.state]["frames"];

        let animation = [];

        let img = loadImage(spriteSheetUrl);
        let imgHeight = img.height;
        let imgWidth = img.width;

        let frameWidth = imgWidth/frames;



        for (let i = 0; i < frames; i++) {
            let frame = img.get(i*frameWidth, 0, frameWidth, imgHeight);
            animation.push(frame);
        }

        let sprite = createSprite(this.position.x, this.position.y);
        sprite.addAnimation('', animation);

        drawSprites();

    
    }

    async fetchData(){
        let response = await fetch('./scripts/animations.json');
        let data = await response.json();
        data = JSON.stringify(data);
        data = JSON.parse(data);
        return data;
    }
}