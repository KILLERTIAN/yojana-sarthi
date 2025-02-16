"use client";
import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const schemesData = [
    {
        title: "Immediate Relief Assistance",
        category: "Financial Assistance",
        description:
            "Extends financial aid to fishermen's families affected by loss of a breadwinner.",
        state: "Puducherry",
        tags: ["Family", "Financial Assistance", "Fisherman", "Relief"],
    },
    {
        title: "AICTE Short Term Training Programme - SFURTI",
        category: "Education",
        description:
            "Provides financial assistance for faculty and student training in technical education.",
        ministry: "Ministry of Education",
        tags: ["AICTE", "Financial Assistance", "Trainings"],
    },
    {
        title: "Burial and Ex-gratia Payment Scheme",
        category: "Labor Welfare",
        description:
            "Provides funeral assistance for unregistered construction workers in Madhya Pradesh.",
        state: "Madhya Pradesh",
        tags: ["Construction Workers", "Funeral", "Death", "Labor"],
    },
    {
        title: "Pradhan Mantri Jan Dhan Yojana",
        category: "Financial Inclusion",
        description:
            "A national mission for financial inclusion offering banking, credit, and insurance services.",
        ministry: "Ministry of Finance",
        tags: ["Banking", "Financial Inclusion", "Government Scheme"],
    },
    {
        title: "National Apprenticeship Training Scheme (NATS)",
        category: "Skill Development",
        description:
            "Provides skill training and stipends for graduates and diploma holders.",
        ministry: "Ministry of Skill Development",
        tags: ["Apprenticeship", "Skill Development", "Training"],
    },
    {
        title: "Stand-Up India Scheme",
        category: "Entrepreneurship",
        description:
            "Supports women and SC/ST entrepreneurs by providing bank loans for setting up enterprises.",
        ministry: "Ministry of Finance",
        tags: ["Entrepreneurship", "Women", "SC/ST", "Finance"],
    },
    {
        title: "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
        category: "Employment",
        description:
            "Guarantees 100 days of wage employment in a financial year to rural households.",
        ministry: "Ministry of Rural Development",
        tags: ["Employment", "Rural Development", "Government Scheme"],
    },
    {
        title: "Pradhan Mantri Awas Yojana (PMAY)",
        category: "Housing",
        description:
            "Aims to provide affordable housing for all urban and rural citizens.",
        ministry: "Ministry of Housing and Urban Affairs",
        tags: ["Housing", "Affordable Housing", "Urban Development"],
    },
    {
        title: "Sukanya Samriddhi Yojana",
        category: "Savings",
        description:
            "A savings scheme aimed at the education and marriage expenses of girl children.",
        ministry: "Ministry of Finance",
        tags: ["Girl Child", "Savings", "Education", "Government Scheme"],
    },
    {
        title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        category: "Agriculture",
        description:
            "Provides income support to small and marginal farmers.",
        ministry: "Ministry of Agriculture",
        tags: ["Farmers", "Agriculture", "Financial Assistance"],
    },
    {
        title: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PMJAY)",
        category: "Health",
        description:
            "Provides health insurance coverage of up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
        ministry: "Ministry of Health and Family Welfare",
        tags: ["Healthcare", "Insurance", "Government Scheme"],
    },
    {
        title: "National Pension Scheme (NPS)",
        category: "Retirement",
        description:
            "A voluntary pension scheme for long-term retirement planning.",
        ministry: "Ministry of Finance",
        tags: ["Pension", "Retirement", "Investment"],
    },
];


const Scheme = () => {
    const [filteredSchemes, setFilteredSchemes] = useState(schemesData);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("A-Z");

    useEffect(() => {
        let filtered = schemesData.filter((scheme) =>
            scheme.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortOrder === "A-Z") {
            filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilteredSchemes(filtered);
    }, [searchTerm, sortOrder]);

    return (
        <div className="grid grid-cols-12 gap-6 p-6">
            {/* Left Sidebar - Filters */}
            <div className="col-span-3 bg-gray-100 p-4 rounded-lg shadow-lg gap-10">
                <h2 className="text-xl font-semibold mb-4">Filter By</h2>
                <Button className="w-full mb-4">Reset Filters</Button>

                <Accordion type="single" collapsible >
                    <AccordionItem value="state" title="State" className="mb-2">
                        <Select onValueChange={(value) => console.log(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                                <SelectItem value="Arunachal Pradesh">Arunachal Pradesh</SelectItem>
                                <SelectItem value="Assam">Assam</SelectItem>
                                <SelectItem value="Bihar">Bihar</SelectItem>
                                <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                                <SelectItem value="Goa">Goa</SelectItem>
                                <SelectItem value="Gujarat">Gujarat</SelectItem>
                                <SelectItem value="Haryana">Haryana</SelectItem>
                                <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                                <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                                <SelectItem value="Karnataka">Karnataka</SelectItem>
                                <SelectItem value="Kerala">Kerala</SelectItem>
                                <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                                <SelectItem value="Manipur">Manipur</SelectItem>
                                <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                                <SelectItem value="Mizoram">Mizoram</SelectItem>
                                <SelectItem value="Nagaland">Nagaland</SelectItem>
                                <SelectItem value="Odisha">Odisha</SelectItem>
                                <SelectItem value="Punjab">Punjab</SelectItem>
                                <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                                <SelectItem value="Sikkim">Sikkim</SelectItem>
                                <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                                <SelectItem value="Telangana">Telangana</SelectItem>
                                <SelectItem value="Tripura">Tripura</SelectItem>
                                <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                                <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                                <SelectItem value="West Bengal">West Bengal</SelectItem>
                                <SelectItem value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</SelectItem>
                                <SelectItem value="Chandigarh">Chandigarh</SelectItem>
                                <SelectItem value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</SelectItem>
                                <SelectItem value="Lakshadweep">Lakshadweep</SelectItem>
                                <SelectItem value="Delhi">Delhi</SelectItem>
                                <SelectItem value="Puducherry">Puducherry</SelectItem>
                                <SelectItem value="Ladakh">Ladakh</SelectItem>
                                <SelectItem value="Jammu and Kashmir">Jammu and Kashmir</SelectItem>
                            </SelectContent>
                        </Select>
                    </AccordionItem>
                    <AccordionItem value="category" title="Scheme Category" className="mb-2">
                        <Select onValueChange={(value) => console.log(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Financial Assistance">Financial Assistance</SelectItem>
                                <SelectItem value="Education">Education</SelectItem>
                            </SelectContent>
                        </Select>
                    </AccordionItem>

                    <AccordionItem value="gender" title="Gender" className="mb-2">
                        <Select onValueChange={(value) => console.log(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Transgender">Transgender</SelectItem>
                            </SelectContent>
                        </Select>
                    </AccordionItem>

                    <AccordionItem value="age" title="Age" className="mb-2">
                        <Select onValueChange={(value) => console.log(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Age" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="18-25">18-25</SelectItem>
                                <SelectItem value="26-40">26-40</SelectItem>
                                <SelectItem value="41-60">41-60</SelectItem>
                                <SelectItem value="60+">60+</SelectItem>
                            </SelectContent>
                        </Select>
                    </AccordionItem>

                    <AccordionItem value="ministry" title="Ministry Name" className="mb-2">
                        <Select onValueChange={(value) => console.log(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Ministry" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="Ministry of Education">Ministry of Education</SelectItem>
                            </SelectContent>
                        </Select>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Right Section - Schemes List */}
            <div className="col-span-9">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Available Schemes</h2>

                    {/* Search & Sort */}
                    <div className="flex gap-4">
                        <Input
                            type="text"
                            placeholder="Search schemes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-64"
                        />
                        <Select onValueChange={setSortOrder} value={sortOrder}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="A-Z">Scheme Name (A→Z)</SelectItem>
                                <SelectItem value="Z-A">Scheme Name (Z→A)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Schemes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSchemes.length > 0 ? (
                        filteredSchemes.map((scheme, index) => (
                            <div key={index} className="p-4 border rounded-lg shadow-lg bg-white">
                                <h3 className="text-xl font-semibold line-clamp-2">{scheme.title}</h3>
                                <p className="text-gray-700 mt-2 line-clamp-3">{scheme.description}</p>
                                <p className="mt-2 text-sm text-gray-500">
                                    <strong>Category:</strong> {scheme.category}
                                </p>
                                {scheme.state && (
                                    <p className="mt-1 text-sm text-gray-500">
                                        <strong>State:</strong> {scheme.state}
                                    </p>
                                )}
                                {scheme.ministry && (
                                    <p className="mt-1 text-sm text-gray-500">
                                        <strong>Ministry:</strong> {scheme.ministry}
                                    </p>
                                )}
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {scheme.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No schemes found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Scheme;
