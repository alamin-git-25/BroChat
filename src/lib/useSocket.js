import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

export const useSocket = () => {
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (!socket) {
            // Connect to the Socket.io server
            socket = io("http://localhost:3000"); // Use the same port as the Socket.io server

            socket.on("connect", () => {
                console.log("Connected to the server!");
                setConnected(true);
            });

            socket.on("disconnect", () => {
                console.log("Disconnected from the server!");
                setConnected(false);
            });
        }

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    return socket;
};
