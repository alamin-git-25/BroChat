import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare()
    .then(() => {
        const httpServer = createServer(handler);
        const io = new Server(httpServer, {
            cors: {
                origin: "*", // Update this to your frontend's domain in production
                methods: ["GET", "POST"]
            }
        });

        io.on("connection", (socket) => {
            console.log(`User connected: ${socket.id}`);

            // Handle join-room event
            socket.on("join-room", ({ room, username }) => {
                socket.join(room);
                console.log(`User ${username} joined Room ${room}`);
                socket.to(room).emit("user_joined", ` ${username} joined the Chat`);
            });

            // Handle message event
            socket.on("message", ({ room, message, sender }) => {
                console.log(`Message from ${sender} in Room ${room}: ${message}`);
                socket.to(room).emit("message", { sender, message });
            });

            // Handle leave-room event (if client sends this when leaving)
            socket.on("leave-room", ({ room, username }) => {
                console.log(`User ${username} left Room ${room}`);
                socket.leave(room);
                socket.to(room).emit("user_left", `${username} left the Chat`);
            });

            // Handle disconnect event
            socket.on("disconnect", () => {
                console.log(`User disconnected: ${socket.id}`);
                // You can also add logic here to emit a message if the user disconnects unexpectedly
                // but this will require tracking which room the user was in
            });
        });

        // Start the server
        httpServer.listen(port, () => {
            console.log(`Server is running on http://${hostname}:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error starting the server:", err);
        process.exit(1); // Exit with failure
    });
