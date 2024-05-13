import express from "express";
import WebSocket from "ws";
import http from "http";

// Create an Express app
const app = express();

// Set the view engine to pug
app.set("view engine", "pug");
app.set("views", __dirname + "/views"); 
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home")); 
app.get("/*", (req, res) => res.redirect("/")); 

// 
const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
    console.log("Connected to Browser");
    socket.on("close", () => console.log("Disconnected from the Browser"));
    socket.on("message", (message) => console.log(message.toString()));
    socket.send("Hello!");
});

server.listen(3000, handleListen);