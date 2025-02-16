import React from 'react';
import { User, Search, FileCheck, ArrowRight } from 'lucide-react';

export const HowToUse = () => {
    return (
        <section className="py-12 px-6 md:px-16 bg-gray-50">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
                Easy Steps to Apply for Government Schemes
            </h2>

            {/* 🏗 User Flow Layout */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">

                {/* Step 1 - Enter Details */}
                <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105 w-64">
                    <User className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">Enter Details</h3>
                    <p className="text-gray-500 mt-2">
                        Start by entering your basic details such as state, gender, and income.
                    </p>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-10 h-10 text-gray-400 hidden md:block" />

                {/* Step 2 - Search */}
                <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105 w-64">
                    <Search className="w-12 h-12 text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">Search</h3>
                    <p className="text-gray-500 mt-2">
                        Our AI-powered engine will find the best schemes based on eligibility.
                    </p>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-10 h-10 text-gray-400 hidden md:block" />

                {/* Step 3 - Select & Apply */}
                <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105 w-64">
                    <FileCheck className="w-12 h-12 text-purple-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700">Select & Apply</h3>
                    <p className="text-gray-500 mt-2">
                        Choose the best recommended scheme and apply seamlessly.
                    </p>
                </div>
            </div>

            {/* 🔄 AI Learning Process */}
            <div className="mt-12 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6 px-6 rounded-xl shadow-lg max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
                    <span>🔍 Smarter Recommendations Over Time</span>
                </h3>
                <p className="mt-2 text-lg">
                    Your <span className="font-semibold">upvotes & downvotes</span> help our AI refine recommendations,
                    ensuring <span className="font-semibold">better, more personalized schemes</span> over time!
                </p>
            </div>

        </section>
    );
};
