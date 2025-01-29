"use client";
import React from "react";
import { MessageCircle, Users, Settings, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ChatNav = () => {
    const pathname = usePathname();

    const navItems = [
        { label: "Home", icon: Home, id: "home", to: "/" },
        { label: "Chats", icon: MessageCircle, id: "chat", to: "/chat" },
        { label: "Contacts", icon: Users, id: "contacts", to: "#" },
        { label: "Settings", icon: Settings, id: "settings", to: "#" },
    ];

    return (
        <>
            {/* Bottom Navigation for Mobile */}
            <nav className="lg:hidden z-50 fixed bottom-0 left-0 w-full bg-black shadow-md border-t">
                <div className="flex justify-around items-center py-2">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.id}
                            label={item.label}
                            Icon={item.icon}
                            active={pathname === item.to}
                            to={item.to}
                            layout="vertical"
                        />
                    ))}
                </div>
            </nav>

            {/* Top Navigation for Desktop */}
            <nav className="hidden lg:flex fixed top-0 left-0 w-full bg-black/50 shadow-md z-30">
                <div className="container mx-auto flex items-center justify-between py-4">
                    {/* App Name */}
                    <h1 className="text-4xl font-bold text-blue-600 cursor-pointer">
                        <Link href="/">BroChat</Link>
                    </h1>

                    {/* Navigation Items */}
                    <div className="flex space-x-6">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.id}
                                label={item.label}
                                Icon={item.icon}
                                to={item.to}
                                active={pathname === item.to}
                                layout="horizontal"
                            />
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
};

const NavItem = ({ label, Icon, active, layout, to }) => {
    const isHorizontal = layout === "horizontal";

    return (
        <Link href={to} className="focus:outline-none">
            <button
                className={`flex ${isHorizontal ? "flex-row items-center space-x-2" : "flex-col items-center"} 
                text-sm transition-colors duration-300 
                ${active ? "text-blue-600 font-medium" : "text-white hover:text-blue-400"}`}
            >
                <Icon size={isHorizontal ? 20 : 24} />
                <span>{label}</span>
            </button>
        </Link>
    );
};

export default ChatNav;
