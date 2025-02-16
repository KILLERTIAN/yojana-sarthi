import Image from 'next/image';
import React from 'react';
// import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="h-screen w-full flex flex-col md:flex-row items-center justify-between relative">
            {/* Left Side - Cover Image with Background Shape */}
            <div className="relative w-full md:w-1/2 flex justify-center">
                {/* Background Shape */}
                <div className="absolute overflow-hidden w-auto md:w-[450px] h-[450px]  md:h-[500px] bg-blue-500 rounded-full blur-3xl opacity-30 -z-10"></div>

                <Image 
                    src="/cover1.png" 
                    alt="Cover Image" 
                    width={700} 
                    height={500} 
                    className="object-contain relative z-10 overflow-hidden"
                />
            </div>

            {/* Right Side - Text with Rectangle Background */}
            <div className="relative w-full md:w-1/2 flex flex-col items-center justify-center text-center">
                <div className="relative bg-blue-400 md:h-[100vh] rounded-tl-5xl shadow-xl w-full p-10 flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Find the Right Government Schemes
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mt-4">
                        Yojana Sarthi helps you discover the most suitable government schemes tailored to your needs.
                    </p>

                    {/* 🔎 Big Search Bar */}
                    <div className="relative w-full max-w-lg mt-6">
                        <input 
                            type="text" 
                            placeholder="Search for schemes..." 
                            className="w-full px-6 py-4 rounded-full shadow-md border-2 border-white bg-white text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full">
                            <Search size={24} />
                        </button>
                    </div>

                    {/* CTA Button */}
                    {/* <Button className="mt-6 bg-white text-blue-600 hover:bg-gray-200 px-6 py-3 rounded-lg shadow-lg text-lg">
                        Find Schemes Now
                    </Button> */}
                </div>
            </div>
        </section>
    );
};
