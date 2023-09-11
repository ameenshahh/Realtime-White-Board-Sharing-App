const express = require("express")
const app = express()


const server = require("http").createServer(app)
const { Server } = require("socket.io")
const { addUser } = require("./utils/users")

const io = new Server(server)

// routes
app.get("/", (req, res) => {
    res.send("mern realtime board sharing application")
})

let roomIdGlobal, imageURLGlobal

io.on("connection", (socket) => {
    console.log("user connected")
    socket.on("userJoined", (data) => {
        const { name, userId, roomId, host, presenter } = data

        roomIdGlobal = roomId
        socket.join(roomId)

        const users = addUser(data)

        socket.emit("userIsJoined", { success: true, users })

        socket.broadcast.to(roomId).emit("allUsers", users)
        socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
            imageURL: imageURLGlobal
        })
    })

    socket.on("whiteboardData", (data) => {
        imageURLGlobal = data
        const { name, userId, roomId, host, presenter } = data
        socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", {
            imageURL: data
        })
    })
})

const port = process.env.PORT || 5000

server.listen(port, (req, res) => {
    console.log(`server connected successfully on http://localhost:5000`)
})