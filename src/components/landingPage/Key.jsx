'use client';

import Image from 'next/image';

export default function KeyFeatures() {
    return (
        <section className="py-12 bg-gradient-to-b from-rose-900 to-sky-700 relative h-full md:h-[70vh] flex flex-col justify-center items-center text-center ">
            <h2 className="text-3xl font-bold text-white mb-8 z-30">Key Features</h2>
            <div className="grid grid-cols-1 z-20 md:grid-cols-3 gap-6 container mx-auto md:px-0 px-4">
                <FeatureCard
                    icon="/live-chat.png"
                    title="Real-time Messaging"
                    description="Enjoy instant messaging with friends and family."
                />
                <FeatureCard
                    icon="/fa.png"
                    title="Group Chats"
                    description="Create and join group chats with your loved ones."
                />
                <FeatureCard
                    icon="/gp.png"
                    title="File Sharing"
                    description="Easily share photos, videos, and documents."
                />
            </div>

            {/* Animated Gradient Balls */}
            <div className="absolute -top-20 left-20 bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating" />
            <div className="absolute top-1/2 left-20 bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-100" />
            <div className="absolute top-[60%] left-[80%] bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-200" />
            <div className="absolute top-[20%] left-[50%] bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating delay-300" />
        </section>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-black/20 backdrop-blur-md w-full  p-6 rounded-2xl shadow-lg flex flex-col items-center text-center border border-white/20">
            <Image src={icon} width={100} height={100} alt="" className="mb-4" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-gray-100 mt-2">{description}</p>
        </div>
    );
}
