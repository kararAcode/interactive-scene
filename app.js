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

    // socket.on("message", (msg) => {
    //     wss.clients.forEach((sock) => {
    //         if (sock !== socket) {
    //             sock.send(msg.toString());
    //         }
    //     });

    // });

    // if (wss.clients.size === 2) {
    //     let i = 0;
        
    //     let positions = [{x:0, y:50}, {x:350, y:50}];
        
    //     wss.clients.forEach((sock) => {
          
    //         sock.send(JSON.stringify({
    //             messageType: "setting-position",
    //             data: {
    //                 yourPos: positions[i],
    //                 otherPos: positions[Number(!i)]
    //             }
    //         }));

    //         i++;
    //     });
    // }


});

const server = app.listen(8080)
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, socket => {
      wss.emit('connection', socket, request);
    });
});