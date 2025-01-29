// "use client";
// import { socket } from "@/lib/socket";
// import { SendHorizonal } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function ChatPage() {
//     const [room, setRoom] = useState("");
//     const [username, setUsername] = useState("");
//     const [joined, setJoined] = useState(false);
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState("");

//     // Format the current time as HH:MM AM/PM
//     const formatTime = () => {
//         const now = new Date();
//         return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     };

//     useEffect(() => {
//         socket.on("message", (data) => {
//             setMessages((prev) => [...prev, { ...data, time: formatTime() }]);
//         });

//         socket.on("user_joined", (message) => {
//             setMessages((prev) => [...prev, { sender: "system", message, time: formatTime() }]);
//         });

//         socket.on("user_left", (message) => {
//             setMessages((prev) => [...prev, { sender: "system", message, time: formatTime() }]);
//         });

//         // Cleanup listeners
//         return () => {
//             socket.off("message");
//             socket.off("user_joined");
//             socket.off("user_left");
//         };
//     }, []); // Dependency array ensures this runs only once

//     const handleJoin = () => {
//         if (room && username) {
//             socket.emit("join-room", { room, username });
//             setJoined(true);
//         }
//     };

//     const handleLeave = () => {
//         socket.emit("leave-room", { room, username });
//         setJoined(false);
//     };

//     const sendMessage = () => {
//         if (message.trim()) {
//             const data = { room, message, sender: username, time: formatTime() };
//             setMessages((prev) => [...prev, data]);
//             socket.emit("message", data);
//             setMessage(""); // Clear the input field
//         }
//     };

//     return (
//         <div className="relative min-h-screen flex">
//             {/* Background with gradient and floating balls */}
//             <section className="absolute min-h-screen inset-0 bg-gradient-to-b from-rose-900 to-sky-700 flex justify-center items-center">
//                 <div className="absolute -top-20 left-20 bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating" />
//                 <div className="absolute top-1/2 left-20 bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-100" />
//                 <div className="absolute top-[60%] left-[80%] bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-200" />
//                 <div className="absolute top-[20%] left-[50%] bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-300" />
//             </section>

//             {/* Chat UI */}
//             <div className="relative flex flex-col m-auto w-full min-h-screen border rounded-lg shadow-md z-10">
//                 {!joined ? (
//                     <div className="w-96 flex justify-center m-auto bg-black/30 p-6 rounded-lg flex-col items-center">
//                         <h1 className="text-xl font-bold mb-4 text-center text-white">Join a Chat Room</h1>
//                         <input
//                             type="text"
//                             placeholder="Enter your username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             className="w-full mb-4 h-12 px-4 border rounded-lg"
//                         />
//                         <input
//                             type="text"
//                             placeholder="Enter room ID"
//                             value={room}
//                             onChange={(e) => setRoom(e.target.value)}
//                             className="w-full mb-4 h-12 px-4 border rounded-lg"
//                         />
//                         <button
//                             onClick={handleJoin}
//                             className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition"
//                         >
//                             Join Room
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="flex flex-col flex-grow">
//                         {/* Header */}
//                         <div className="sticky w-full top-16 mb-16 text-white py-4 px-6 flex justify-between items-center  shadow-md rounded-t-lg">
//                             <h1 className="text-lg font-bold">Room: {room}</h1>
//                             <button
//                                 onClick={handleLeave}
//                                 className="bg-red-500 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-600 transition"
//                             >
//                                 Leave Room
//                             </button>
//                         </div>

//                         {/* Messages */}
//                         <div className="flex-grow overflow-y-auto p-4">
//                             {messages.map((msg, idx) => (
//                                 <div
//                                     key={idx}
//                                     className={`mb-4 flex flex-col ${msg.sender === "system"
//                                         ? "items-center" // Center the system message
//                                         : msg.sender === username
//                                             ? "items-end"
//                                             : "items-start"
//                                         }`}
//                                 >
//                                     {/* Sender Name */}
//                                     {msg.sender !== username && msg.sender !== "system" && (
//                                         <p className="text-sm font-semibold text-gray-100 mb-1 ml-2 ">{msg.sender}</p>
//                                     )}

//                                     {/* Message Bubble and Avatar */}
//                                     <div
//                                         className={`flex items-start gap-2 ${msg.sender === "system" ? "justify-center w-full" : ""
//                                             }`}
//                                     >
//                                         {/* Avatar */}
//                                         {msg.sender !== "system" && msg.sender !== username && (
//                                             <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
//                                                 {msg.sender.charAt(0).toUpperCase()}
//                                             </div>
//                                         )}

//                                         {/* Message Bubble */}
//                                         <div
//                                             className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${msg.sender === "system"
//                                                 ? "bg-black text-center text-xs text-white"
//                                                 : msg.sender === username
//                                                     ? "bg-blue-500 text-white"
//                                                     : "bg-gray-300 text-gray-800"
//                                                 }`}
//                                         >
//                                             {/* Message Content */}
//                                             <p className="text-sm">{msg.message}</p>
//                                         </div>
//                                     </div>

//                                     {/* Time */}
//                                     {msg.sender !== "system" && (
//                                         <p className="text-xs text-gray-500 mt-1 ml-12">{msg.time}</p>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>




//                         {/* Message Input */}
//                         <div className="sticky bottom-0  py-4 px-6 shadow-md flex items-center gap-2 border-t">
//                             <input
//                                 type="text"
//                                 placeholder="Type your message..."
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 className="flex-grow h-10 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                             />
//                             <button
//                                 onClick={sendMessage}
//                                 className="bg-green-600 text-white py-2 px-6 rounded-lg font-bold hover:bg-green-600 transition"
//                             >
//                                 <SendHorizonal />
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//         </div>

//     );
// }

// "use client";
// import { socket } from "@/lib/socket";
// import { SendHorizonal, X } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function ChatPage() {
//     const [room, setRoom] = useState("");
//     const [username, setUsername] = useState("");
//     const [joined, setJoined] = useState(false);
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState("");
//     const [repliedMessage, setRepliedMessage] = useState(null); // Store the replied message

//     // Format the current time as HH:MM AM/PM
//     const formatTime = () => {
//         const now = new Date();
//         return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     };

//     useEffect(() => {
//         socket.on("message", (data) => {
//             setMessages((prev) => [...prev, { ...data, time: formatTime() }]);
//         });

//         socket.on("user_joined", (message) => {
//             setMessages((prev) => [...prev, { sender: "system", message, time: formatTime() }]);
//         });

//         socket.on("user_left", (message) => {
//             setMessages((prev) => [...prev, { sender: "system", message, time: formatTime() }]);
//         });

//         // Cleanup listeners
//         return () => {
//             socket.off("message");
//             socket.off("user_joined");
//             socket.off("user_left");
//         };
//     }, []); // Dependency array ensures this runs only once

//     const handleJoin = () => {
//         if (room && username) {
//             socket.emit("join-room", { room, username });
//             setJoined(true);
//         }
//     };

//     const handleLeave = () => {
//         socket.emit("leave-room", { room, username });
//         setJoined(false);
//     };

//     const sendMessage = () => {
//         if (message.trim()) {
//             const data = {
//                 room,
//                 message,
//                 sender: username,
//                 time: formatTime(),
//                 repliedMessage, // Include the replied message if any
//             };
//             setMessages((prev) => [...prev, data]);
//             socket.emit("message", data); // Emit the message to the backend
//             setMessage(""); // Clear the input field
//             setRepliedMessage(null); // Clear the replied message after sending
//         }
//     };

//     const handleReply = (msg) => {
//         setRepliedMessage(msg); // Store the message being replied to
//         setMessage(`@${msg.sender}: ${msg.message}`); // Optionally, pre-fill the input field with the reply
//     };

//     return (
//         <div className="relative min-h-screen flex">
//             {/* Background with gradient and floating balls */}
//             <section className="absolute min-h-screen inset-0 bg-gradient-to-b from-rose-900 to-sky-700 flex justify-center items-center">
//                 <div className="absolute -top-20 left-20 bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating" />
//                 <div className="absolute top-1/2 left-20 bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-100" />
//                 <div className="absolute top-[60%] left-[80%] bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-200" />
//                 <div className="absolute top-[20%] left-[50%] bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-300" />
//             </section>

//             {/* Chat UI */}
//             <div className="relative flex flex-col m-auto w-full min-h-screen border rounded-lg shadow-md z-10">
//                 {!joined ? (
//                     <div className="w-96 flex justify-center m-auto bg-black/30 p-6 rounded-lg flex-col items-center">
//                         <h1 className="text-xl font-bold mb-4 text-center text-white">Join a Chat Room</h1>
//                         <input
//                             type="text"
//                             placeholder="Enter your username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             className="w-full mb-4 h-12 px-4 border rounded-lg"
//                         />
//                         <input
//                             type="text"
//                             placeholder="Enter room ID"
//                             value={room}
//                             onChange={(e) => setRoom(e.target.value)}
//                             className="w-full mb-4 h-12 px-4 border rounded-lg"
//                         />
//                         <button
//                             onClick={handleJoin}
//                             className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition"
//                         >
//                             Join Room
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="flex flex-col flex-grow">
//                         {/* Header */}
//                         <div className="sticky w-full top-16 mb-16 text-white py-4 px-6 flex justify-between items-center shadow-md rounded-t-lg">
//                             <h1 className="text-lg font-bold">Room: {room}</h1>
//                             <button
//                                 onClick={handleLeave}
//                                 className="bg-red-500 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-600 transition"
//                             >
//                                 Leave Room
//                             </button>
//                         </div>

//                         {/* Messages */}
//                         <div className="flex-grow overflow-y-auto p-4">
//                             {messages.map((msg, idx) => (
//                                 <div
//                                     key={idx}
//                                     className={`mb-4 flex flex-col ${msg.sender === "system"
//                                         ? "items-center" // Center the system message
//                                         : msg.sender === username
//                                             ? "items-end"
//                                             : "items-start"
//                                         }`}
//                                     onClick={() => handleReply(msg)} // Allow replying by clicking on the message
//                                 >
//                                     {/* Sender Name */}
//                                     {msg.sender !== username && msg.sender !== "system" && (
//                                         <p className="text-sm font-semibold text-gray-100 mb-1 ml-2 ">{msg.sender}</p>
//                                     )}

//                                     {/* Message Bubble and Avatar */}
//                                     <div
//                                         className={`flex items-start gap-2 ${msg.sender === "system" ? "justify-center w-full" : ""
//                                             }`}
//                                     >
//                                         {/* Avatar */}
//                                         {msg.sender !== "system" && msg.sender !== username && (
//                                             <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
//                                                 {msg.sender.charAt(0).toUpperCase()}
//                                             </div>
//                                         )}

//                                         {/* Message Bubble */}
//                                         <div
//                                             className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${msg.sender === "system"
//                                                 ? "bg-black text-center text-xs text-white"
//                                                 : msg.sender === username
//                                                     ? "bg-blue-500 text-white"
//                                                     : "bg-gray-300 text-gray-800"
//                                                 }`}
//                                         >
//                                             {/* Display the replied message */}
//                                             {msg.repliedMessage && (
//                                                 <div className="bg-gray-100 p-2 text-black rounded-lg mb-2">
//                                                     <strong>{msg.repliedMessage.sender}:</strong> {msg.repliedMessage.message}
//                                                 </div>
//                                             )}

//                                             {/* Message Content */}
//                                             <p className="text-sm">{msg.message}</p>
//                                         </div>
//                                     </div>

//                                     {/* Time */}
//                                     {msg.sender !== "system" && (
//                                         <p className="text-xs text-gray-500 mt-1 ml-12">{msg.time}</p>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Show Replied Message */}
//                         {repliedMessage && (
//                             <div className="replied-message p-2 border rounded-lg bg-gray-100 mb-4 mx-5 flex justify-between items-center">
//                                 <div className="flex gap-4">
//                                     <strong>Replying to: </strong>
//                                     <p>{repliedMessage.sender}: {repliedMessage.message}</p>
//                                 </div>
//                                 {/* Close button */}
//                                 <button
//                                     onClick={() => setRepliedMessage(null)} // Clear the reply when clicked
//                                     className="text-black hover:text-gray-700"
//                                 >
//                                     <X />
//                                 </button>
//                             </div>
//                         )}

//                         {/* Message Input */}
//                         <div className="sticky bottom-0 py-4 px-6 shadow-md flex items-center gap-2 border-t">
//                             <input
//                                 type="text"
//                                 placeholder="Type your message..."
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 className="flex-grow h-10 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                             />
//                             <button
//                                 onClick={sendMessage}
//                                 className="bg-green-600 text-white py-2 px-6 rounded-lg font-bold hover:bg-green-600 transition"
//                             >
//                                 <SendHorizonal />
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//         </div>
//     );
// }


"use client";
import { socket } from "@/lib/socket";
import { SendHorizonal, X, Clipboard, LogOut } from "lucide-react";  // Imported Clipboard icon for copy functionality
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";  // Import nanoid for generating unique room IDs

export default function ChatPage() {
    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");
    const [joined, setJoined] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [repliedMessage, setRepliedMessage] = useState(null); // Store the replied message

    // Format the current time as HH:MM AM/PM
    const formatTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Generate a unique room ID using nanoid
    const generateRoomId = () => {
        const newRoomId = nanoid(10); // Generates a 10-character unique room ID
        setRoom(newRoomId);  // Set the generated room ID in the state
    };

    // Handle copy room ID to clipboard
    const copyRoomId = () => {
        navigator.clipboard.writeText(room);
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
            const data = {
                room,
                message,
                sender: username,
                time: formatTime(),
                repliedMessage, // Include the replied message if any
            };
            setMessages((prev) => [...prev, data]);
            socket.emit("message", data); // Emit the message to the backend
            setMessage(""); // Clear the input field
            setRepliedMessage(null); // Clear the replied message after sending
        }
    };

    const handleReply = (msg) => {
        setRepliedMessage(msg); // Store the message being replied to
        setMessage(`@${msg.sender}: ${msg.message}`); // Optionally, pre-fill the input field with the reply
    };

    return (
        <div className="relative min-h-screen overflow-hidden flex">
            {/* Background with gradient and floating balls */}
            <section className="absolute min-h-screen inset-0 bg-gradient-to-b from-rose-900 to-sky-700 flex justify-center items-center">
                <div className="absolute -top-20 left-20 bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating" />
                <div className="absolute top-1/2 left-20 bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-100" />
                <div className="absolute top-[60%] left-[80%] bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-200" />
                <div className="absolute top-[20%] left-[50%] bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-300" />
            </section>

            {/* Chat UI */}
            <div className="relative flex flex-col m-auto w-full min-h-screen  rounded-lg shadow-md z-10">
                {!joined ? (
                    <div className="w-96 flex justify-center m-auto bg-black/30 p-6 rounded-lg flex-col items-center">
                        <h1 className="text-xl  mb-4 text-center text-white">Join a Chat Room</h1>
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
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg  hover:bg-blue-600 transition"
                        >
                            Join Room
                        </button>

                        {/* Generate Room ID Button */}
                        <div className="flex items-center w-full mt-4">
                            <button
                                onClick={generateRoomId}
                                className="bg-purple-500 w-full text-white py-2 px-4 rounded-s-lg  hover:bg-purple-600 transition"
                            >
                                Generate Room ID
                            </button>
                            <button
                                onClick={copyRoomId}
                                className="bg-gray-500 flex justify-center items-center text-white py-2 px-4 rounded-e-lg font-bold hover:bg-gray-600 transition"
                                disabled={!room}
                            >
                                <Clipboard className="" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col flex-grow">
                        {/* Header */}
                        <div className="fixed w-full bg-white/30  backdrop-blur-md md:top-[7%] top-0 left-0 text-white py-3 px-6 flex justify-between items-center shadow-md rounded-t-lg">
                            <h1 className="text-lg ">Room ID: {room}</h1>
                            <button
                                onClick={handleLeave}
                                className="bg-red-500 px-4 py-2 rounded-lg  text-sm hover:bg-red-600 transition"
                            >
                                <span className="flex  justify-center items-center gap-2">Leave <LogOut className="size-5" /></span>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow overflow-y-auto p-4 md:my-32 my-24">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`mb-4 flex flex-col ${msg.sender === "system"
                                        ? "items-center" // Center the system message
                                        : msg.sender === username
                                            ? "items-end"
                                            : "items-start"
                                        }`}
                                    onClick={() => handleReply(msg)} // Allow replying by clicking on the message
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
                                                ? "bg-black text-center text-xs text-white"
                                                : msg.sender === username
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-300 text-gray-800"
                                                }`}
                                        >
                                            {/* Display the replied message */}
                                            {msg.repliedMessage && (
                                                <div className="bg-gray-100 p-2 text-black rounded-lg mb-2">
                                                    <strong>{msg.repliedMessage.sender}:</strong> {msg.repliedMessage.message}
                                                </div>
                                            )}

                                            {/* Message Content */}
                                            <p className="text-sm">{msg.message}</p>
                                        </div>
                                    </div>

                                    {/* Time */}
                                    {msg.sender !== "system" && (
                                        <p className="text-xs text-indigo-300 mt-1 ml-12">{msg.time}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Show Replied Message */}
                        {repliedMessage && (
                            <div className="replied-message p-2 border rounded-lg bg-gray-100 mb-4 mx-5 flex justify-between items-center">
                                <div className="flex gap-4">
                                    <strong>Replying to: </strong>
                                    <p>{repliedMessage.sender}: {repliedMessage.message}</p>
                                </div>
                                {/* Close button */}
                                <button
                                    onClick={() => setRepliedMessage(null)} // Clear the reply when clicked
                                    className="text-black hover:text-gray-700"
                                >
                                    <X />
                                </button>
                            </div>
                        )}

                        {/* Message Input */}
                        <div className="fixed md:bottom-0 bottom-14   left-0 w-full md:py-4 py-3 bg-white/20 backdrop-blur-md md:px-6 px-2 shadow-md flex items-center gap-2 border-t">
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
