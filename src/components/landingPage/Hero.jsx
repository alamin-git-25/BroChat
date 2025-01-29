"use client"
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { MailOpen, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Hero() {
    const router = useRouter();
    return (
        <section className="overflow-hidden relative bg-gradient-to-t from-gray-900 to-gray-800 text-white w-full h-full md:h-[70vh] flex flex-col justify-center items-center">
            <div className="container mx-auto flex flex-col-reverse md:flex-row justify-between w-full space-y-8 md:space-y-0 ">
                {/* Left Section - Text */}
                <div className="flex  justify-center items-center text-center md:text-left z-20">
                    <span>
                        <h3 className="text-7xl md:text-9xl bg-gradient-to-r from-teal-200 to-teal-500 bg-clip-text font-bold text-transparent mb-4">
                            BroChat
                        </h3>
                        <p className="text-xl md:text-3xl text-left mb-4">
                            Chat With Bhai Brother
                        </p>
                        <Button onClick={() => router.push('/chat')} className="bg-white  hover:bg-indigo-300 mb-8  text-gray-900 py-2 px-6 rounded-lg">
                            <MessageCircle /> Let's Chat
                        </Button>
                    </span>
                </div>

                {/* Right Section - Image */}
                <div className="flex justify-center items-center">
                    <Image
                        src={'/chats.png'}
                        width={500}
                        height={500}
                        alt='Chat illustration'
                        className=""
                    />
                </div>
            </div>

            <div className="absolute md:visible invisible -top-20 left-20 bg-gradient-to-t from-fuchsia-900 to-slate-600 w-[200px] h-[200px] rounded-full animate-floating" />
        </section>


    )
}
