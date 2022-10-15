const express = require("express");
const ws = require("ws");

const app = express();

const wss = new ws.Server({noServer: true})

app.set("view engine",  "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("index");
});


wss.on("connection", (socket) => {

    socket.on("message", (msg) => {
        wss.clients.forEach((sock) => {
            if (sock !== socket) {
                sock.send(msg.toString());
            }
        });

    });

    if (wss.clients.size === 2) {
        let i = 0;
        
        let playerData = [["Martial Hero", {xFactor:0.125, yFactor:0.75}], ["Wizard Pack", {xFactor:0.75, y:0.75}]];
        
        wss.clients.forEach((sock) => {
          
            sock.send(JSON.stringify({
                messageType: "setting-position",
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


});

const server = app.listen(process.env.PORT || 8080)
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, socket => {
      wss.emit('connection', socket, request);
    });
});