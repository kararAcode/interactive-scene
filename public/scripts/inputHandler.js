let lastKey = "";


class InputHandler {
    constructor(fighter) {

        fighter.keys = {
            a: {
                pressed: false
            },
        
            d: {
                pressed: false
            },
        
            w: {
                pressed: false
            },
        
            s: {
                pressed: false
            },
        
            j: {
                pressed: false
            },
        
            k: {
                pressed: false
            }
        
        
            
        
        
        }
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "a":
                    fighter.keys.a.pressed = true;
                    lastKey = "a";
                    break;

                case "w":
                    fighter.velocity.y = -10;
                    break;

                case "s":
                    fighter.keys.s.pressed = true;
                    lastKey = "s";
                    break;

                case "d":
                    fighter.keys.d.pressed = true;
                    lastKey = "d";
                    break;

                case "j":
                    fighter.keys.j.pressed = true;
                    lastKey = "j";
                    break;

                case "k":
                    fighter.keys.k.pressed = true;
                    lastKey = "k";
                    break;
                    
            }
        })

        document.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "a":
                    fighter.keys.a.pressed = false;
                    
                    break;

                case "w":
                    fighter.keys.w.pressed = false;
                    break;

                case "s":
                    fighter.keys.s.pressed = false;
                    break;

                case "d":
                    fighter.keys.d.pressed = false;
                    
                    break;

                case "j":
                    fighter.keys.j.pressed = false;
                    break;

                case "k":
                    fighter.keys.k.pressed = false;
                    break;
                    
            }
        });


    }
}

