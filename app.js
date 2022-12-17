const express = require("express");
const ws = require("ws");

const app = express();

const wss = new ws.Server({noServer: true}) // websocket server is created
let time = 0;

app.set("view engine",  "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index"); // renders index.ejs
});

let clients = [];
let rooms = [];

wss.on("connection", (socket) => {
    // whenever a socket connects to the server
    // a message eventListener is attatched to socket

    clients.push(socket);
    socket.on("message", (msg) => {
       

        let gameIndex = findGame(socket);
        rooms[gameIndex].forEach((sock) => {
            if (sock !== socket) {
                sock.send(msg.toString()); // sends any data to the other sockets in server
            }
        });

    });

    socket.on("close", () => {
        let gameIndex = findGame(socket);
        rooms[gameIndex].forEach((sock) => {
            if (sock !== socket) {
                sock.terminate();
            }
        });
    });

    if (clients.length % 2 === 0) {
        setGame();
    }
});

// ws server is shared with http server
const server = app.listen(process.env.PORT || 8080)
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, socket => {
      wss.emit('connection', socket, request);
    });
});

function setGame() {
    

    rooms.push([clients[clients.length-2], clients[clients.length-1]]);

    // The needed data to start game is created when 2 clients are connected
    let i = 0; // i is used to keep track of which client in arr
    
    let playerData = [["Martial Hero", {xFactor:0.125, yFactor:0.75}], ["Wizard Pack", {xFactor:0.75, y:0.75}]];
    
    rooms[rooms.length-1].forEach((sock) => {
      
        sock.send(JSON.stringify({
            messageType: "start-game",
            // order of data will change depending on value of i
            data: {
                player1Data: {
                    pos: playerData[i][1],
                    playerName: playerData[i][0],
                    reversed: Boolean(i)
                },

                
                player2Data: {
                    pos: playerData[Number(!i)][1],
                    playerName: playerData[Number(!i)][0],
                    reversed: !i
                } 
            }               
        }));

        i++;
    });
}

function findGame(socket) {
    for (let i = 0; i < rooms.length; i++) {
        for (let n = 0; n < 2; n++) {
            if (socket === rooms[i][n]) {
                return i;
            }
        }
    }
}