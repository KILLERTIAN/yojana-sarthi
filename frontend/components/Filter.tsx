"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { schemesData } from "@/app/scheme/page";

export const Filter = ({ onFilterChange }: { onFilterChange: (filtered: any[]) => void }) => {
  const [filteredSchemes, setFilteredSchemes] = useState(schemesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");

  const [filters, setFilters] = useState({
    state: "all",
    category: "all",
    gender: "all",
    age: "all",
    ministry: "all",
  });

  useEffect(() => {
    let filtered = schemesData.filter((scheme) => {
      return (
        (filters.state === "all" || scheme.state === filters.state) &&
        (filters.category === "all" || scheme.category === filters.category) &&
        (filters.ministry === "all" || scheme.ministry === filters.ministry)
      );
    });

    // Apply search term filtering
    filtered = filtered.filter((scheme) =>
      scheme.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sorting
    if (sortOrder === "A-Z") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredSchemes(filtered);
    onFilterChange(filtered); // Pass filtered data to parent component
  }, [searchTerm, sortOrder, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div className="col-span-3 bg-gray-100 p-4 rounded-lg shadow-lg gap-10">
      <h2 className="text-xl font-semibold mb-4">Filter By</h2>

      {/* Search Bar */}
      <Input
        placeholder="Search Schemes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {/* Reset Button */}
      <Button
        className="w-full mb-4"
        onClick={() => {
          setFilters({ state: "all", category: "all", gender: "all", age: "all", ministry: "all" });
          setSearchTerm("");
          setSortOrder("A-Z");
        }}
      >
        Reset Filters
      </Button>

      {/* Sorting Options */}
      <Select onValueChange={(value) => setSortOrder(value)} value={sortOrder}>
        <SelectTrigger>
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="A-Z">A-Z</SelectItem>
          <SelectItem value="Z-A">Z-A</SelectItem>
        </SelectContent>
      </Select>

      {/* Filter Accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="state" title="State" className="mb-2">
          <Select onValueChange={(value) => handleFilterChange("state", value)} value={filters.state}>
            <SelectTrigger>
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Puducherry">Puducherry</SelectItem>
              <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
            </SelectContent>
          </Select>
        </AccordionItem>

        <AccordionItem value="category" title="Scheme Category" className="mb-2">
          <Select onValueChange={(value) => handleFilterChange("category", value)} value={filters.category}>
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

        <AccordionItem value="ministry" title="Ministry Name" className="mb-2">
          <Select onValueChange={(value) => handleFilterChange("ministry", value)} value={filters.ministry}>
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
  );
};
