"use client";
import React, { useState } from "react";
import { MessageCircle, Users, Settings, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ChatNav = () => {
    const [active, setActive] = useState("chat");

    const navItems = [
        { label: "Home", icon: Home, id: "home", to: '/' },
        { label: "Chats", icon: MessageCircle, id: "chat", to: '/chat' },
        { label: "Contacts", icon: Users, id: "contacts", to: '/chat' },
        { label: "Settings", icon: Settings, id: "settings", to: '/chat' },

    ];
    const router = useRouter()
    return (
        <>



            {/* Bottom Navigation for Mobile */}
            <nav className="lg:hidden z-50 fixed bottom-0 left-0 w-full bg-white shadow-md border-t">
                <div className="flex justify-around items-center py-2">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.id}
                            label={item.label}
                            Icon={item.icon}
                            active={active === item.id}
                            to={item.to}
                            onClick={() => setActive(item.id)}
                            layout="vertical"
                        />
                    ))}
                </div>
            </nav>

            {/* Top Navigation for Desktop */}
            <nav className="hidden lg:flex fixed top-0 left-0  w-full bg-black/50 shadow-md  z-30">
                <div className="container mx-auto flex items-center justify-between py-4 ">
                    {/* App Name */}
                    <h1 className="text-4xl font-bold text-blue-600 cursor-pointer" onClick={() => router.push('/')}>BroChat</h1>

                    {/* Navigation Items */}
                    <div className="flex space-x-6">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.id}
                                label={item.label}
                                Icon={item.icon}
                                to={item.to}
                                active={active === item.id}
                                onClick={() => setActive(item.id)}
                                layout="horizontal"
                            />
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
};

const NavItem = ({ label, Icon, active, onClick, layout, to }) => {
    const isHorizontal = layout === "horizontal";

    return (
        <Link href={to}>
            <button
                onClick={onClick}
                className={`flex ${isHorizontal ? "flex-row items-center space-x-2" : "flex-col items-center"
                    } text-sm transition-colors duration-300 ${active
                        ? "text-blue-600 font-medium"
                        : "text-gray-500 hover:text-blue-400"
                    }`}
            >
                <Icon size={isHorizontal ? 20 : 24} />
                <span>{label}</span>
            </button>
        </Link>
    );
};

export default ChatNav;




