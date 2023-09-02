const express = require("express")
const app = express()


const server = require("http").createServer(app)
const {Server} = require("socket.io")

const io = new Server(server)
// routes
app.get("/", (req, res) => {
    res.send("mern realtime board sharing application")
})

io.on("connection", (socket) => {
    console.log("user connected")
})

const port = process.env.PORT || 5000
server.listen(port, (req, res) => {
    console.log(`server connected successfully on http://localhost:5000`)
})