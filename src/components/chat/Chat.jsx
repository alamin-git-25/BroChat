"use client";
import { socket } from "@/lib/socket";
import { SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";

export default function ChatPage() {
    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");
    const [joined, setJoined] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    // Format the current time as HH:MM AM/PM
    const formatTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    useEffect(() => {
        socket.on("message", (data) => {
            setMessages((prev) => [...prev, { ...data, time: formatTime() }]);
        });

        socket.on("user_joined", (message) => {
            setMessages((prev) => [...prev, { sender: "system", message, time: formatTime() }]);
        });

        socket.on("user_left", (message) => {
            setMessages((prev) => [...prev, { sender: "system", message, time: formatTime() }]);
        });

        // Cleanup listeners
        return () => {
            socket.off("message");
            socket.off("user_joined");
            socket.off("user_left");
        };
    }, []); // Dependency array ensures this runs only once

    const handleJoin = () => {
        if (room && username) {
            socket.emit("join-room", { room, username });
            setJoined(true);
        }
    };

    const handleLeave = () => {
        socket.emit("leave-room", { room, username });
        setJoined(false);
    };

    const sendMessage = () => {
        if (message.trim()) {
            const data = { room, message, sender: username, time: formatTime() };
            setMessages((prev) => [...prev, data]);
            socket.emit("message", data);
            setMessage(""); // Clear the input field
        }
    };

    return (
        <div className="relative flex">
            {/* Background with gradient and floating balls */}
            <section className="absolute inset-0 bg-gradient-to-b from-rose-900 to-sky-700 flex justify-center items-center">
                <div className="absolute -top-20 left-20 bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating" />
                <div className="absolute top-1/2 left-20 bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-100" />
                <div className="absolute top-[60%] left-[80%] bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-200" />
                <div className="absolute top-[20%] left-[50%] bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-300" />
            </section>

            {/* Chat UI */}
            <div className="relative flex flex-col m-auto w-full h-screen border rounded-lg shadow-md z-10">
                {!joined ? (
                    <div className="w-96 flex justify-center m-auto bg-black/30 p-6 rounded-lg flex-col items-center">
                        <h1 className="text-xl font-bold mb-4 text-center text-white">Join a Chat Room</h1>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full mb-4 h-12 px-4 border rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Enter room ID"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            className="w-full mb-4 h-12 px-4 border rounded-lg"
                        />
                        <button
                            onClick={handleJoin}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition"
                        >
                            Join Room
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col flex-grow">
                        {/* Header */}
                        <div className="sticky w-full top-16 mb-16 text-white py-4 px-6 flex justify-between items-center  shadow-md rounded-t-lg">
                            <h1 className="text-lg font-bold">Room: {room}</h1>
                            <button
                                onClick={handleLeave}
                                className="bg-red-500 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-600 transition"
                            >
                                Leave Room
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow overflow-y-auto p-4">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`mb-4 flex flex-col ${msg.sender === "system"
                                        ? "items-center" // Center the system message
                                        : msg.sender === username
                                            ? "items-end"
                                            : "items-start"
                                        }`}
                                >
                                    {/* Sender Name */}
                                    {msg.sender !== username && msg.sender !== "system" && (
                                        <p className="text-sm font-semibold text-gray-100 mb-1 ml-2 ">{msg.sender}</p>
                                    )}

                                    {/* Message Bubble and Avatar */}
                                    <div
                                        className={`flex items-start gap-2 ${msg.sender === "system" ? "justify-center w-full" : ""
                                            }`}
                                    >
                                        {/* Avatar */}
                                        {msg.sender !== "system" && msg.sender !== username && (
                                            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
                                                {msg.sender.charAt(0).toUpperCase()}
                                            </div>
                                        )}

                                        {/* Message Bubble */}
                                        <div
                                            className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${msg.sender === "system"
                                                ? "bg-gray-800 text-center text-xs text-white"
                                                : msg.sender === username
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-300 text-gray-800"
                                                }`}
                                        >
                                            {/* Message Content */}
                                            <p className="text-sm">{msg.message}</p>
                                        </div>
                                    </div>

                                    {/* Time */}
                                    {msg.sender !== "system" && (
                                        <p className="text-xs text-gray-500 mt-1 ml-12">{msg.time}</p>
                                    )}
                                </div>
                            ))}
                        </div>




                        {/* Message Input */}
                        <div className="sticky bottom-0  py-4 px-6 shadow-md flex items-center gap-2 border-t">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-grow h-10 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-green-600 text-white py-2 px-6 rounded-lg font-bold hover:bg-green-600 transition"
                            >
                                <SendHorizonal />
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>

    );
}
