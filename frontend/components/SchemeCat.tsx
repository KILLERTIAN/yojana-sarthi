import React from 'react';
import { 
    Sprout, Banknote, BriefcaseBusiness, GraduationCap, HeartPulse, Home, Shield, 
    Laptop, Wrench, Users, Trophy, Bus, Plane, Droplet, Baby 
} from 'lucide-react';

const schemeCategories = [
    { name: "Agriculture, Rural & Environment", count: 417, icon: Sprout, color: "text-green-600" },
    { name: "Banking, Financial Services and Insurance", count: 214, icon: Banknote, color: "text-yellow-600" },
    { name: "Business & Entrepreneurship", count: 442, icon: BriefcaseBusiness, color: "text-blue-600" },
    { name: "Education & Learning", count: 768, icon: GraduationCap, color: "text-purple-600" },
    { name: "Health & Wellness", count: 214, icon: HeartPulse, color: "text-red-500" },
    { name: "Housing & Shelter", count: 93, icon: Home, color: "text-orange-600" },
    { name: "Public Safety, Law & Justice", count: 10, icon: Shield, color: "text-gray-700" },
    { name: "Science, IT & Communications", count: 61, icon: Laptop, color: "text-blue-500" },
    { name: "Skills & Employment", count: 251, icon: Wrench, color: "text-teal-500" },
    { name: "Social Welfare & Empowerment", count: 1235, icon: Users, color: "text-pink-500" },
    { name: "Sports & Culture", count: 116, icon: Trophy, color: "text-indigo-500" },
    { name: "Transport & Infrastructure", count: 52, icon: Bus, color: "text-green-500" },
    { name: "Travel & Tourism", count: 35, icon: Plane, color: "text-blue-400" },
    { name: "Utility & Sanitation", count: 35, icon: Droplet, color: "text-cyan-600" },
    { name: "Women and Child", count: 362, icon: Baby, color: "text-pink-600" },
];

export const SchemeCat = () => {
    return (
        <section className="py-12 px-6 md:px-16 bg-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
                All Scheme Categories
            </h2>

            {/* 🏗 Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {schemeCategories.map((category, index) => (
                    <div 
                        key={index} 
                        className="bg-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer flex flex-col items-center text-center"
                    >
                        {/* Icon with Color */}
                        <category.icon className={`w-12 h-12 ${category.color} mb-4`} />
                        
                        <h3 className="text-xl font-semibold text-gray-700">{category.name}</h3>
                        <p className="text-blue-600 font-medium text-lg mt-2">{category.count} Schemes</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
