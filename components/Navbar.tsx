"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Crown, Menu, X, Trophy, User, LogIn, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/20 backdrop-blur-md border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-amber-400" />
            <span className="text-xl font-bold text-white">ChessReps</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white/80 hover:text-white transition-colors flex items-center space-x-1">
              <Target className="h-4 w-4" />
              <span>Learn</span>
            </Link>
            <Link href="/leaderboards" className="text-white/80 hover:text-white transition-colors flex items-center space-x-1">
              <Trophy className="h-4 w-4" />
              <span>Leaderboards</span>
            </Link>
            <Link href="/plans" className="text-white/80 hover:text-white transition-colors">
              <span>Plans</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/signin">
              <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 mt-2 rounded-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-white/80 hover:text-white transition-colors">
                Learn
              </Link>
              <Link href="/leaderboards" className="block px-3 py-2 text-white/80 hover:text-white transition-colors">
                Leaderboards
              </Link>
              <Link href="/plans" className="block px-3 py-2 text-white/80 hover:text-white transition-colors">
                Plans
              </Link>
              <div className="border-t border-white/10 pt-2">
                <Link href="/signin" className="block px-3 py-2 text-white/80 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link href="/signup" className="block px-3 py-2">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}