"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="w-full bg-[#1f1f1f] text-white px-6 md:px-12 py-3 shadow-md z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={70} height={70} className="cursor-pointer" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10 text-lg">
          <Link href="/" className="hover:text-blue-400 transition duration-300 cursor-pointer">
            <li>Home</li>
          </Link>
          <Link href="/scheme" className="hover:text-blue-400 transition duration-300 cursor-pointer">
            <li>Schemes</li>
          </Link>
          <Link href="/about" className="hover:text-blue-400 transition duration-300 cursor-pointer">
            <li>About</li>
          </Link>
          <Link href="/contact" className="hover:text-blue-400 transition duration-300 cursor-pointer">
            <li>Contact</li>
          </Link>
        </ul>

        {/* Desktop Login Button */}
        <div className="hidden md:flex">
          <Button variant="outline" className="border-white text-black hover:scale-110">
            Login
          </Button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden flex flex-col items-center bg-[#1f1f1f] py-6 space-y-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ul className="flex flex-col items-center gap-6 text-lg">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-400 transition duration-300 cursor-pointer">Home</li>
            </Link>
            <Link href="/scheme" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-400 transition duration-300 cursor-pointer">Schemes</li>
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-400 transition duration-300 cursor-pointer">About</li>
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-400 transition duration-300 cursor-pointer">Contact</li>
            </Link>
          </ul>
          <Button variant="outline" className="border-white text-black hover:scale-110">
            Login
          </Button>
        </motion.div>
      )}
    </motion.nav>
  );
};
