"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Crown, Target, BookOpen } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Crown className="h-16 w-16 text-amber-400 animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Master Chess with
            <span className="text-amber-400 block">Repetition</span>
          </h1>
          
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Learn chess openings, tactics, and endgames through spaced repetition. 
            Track your progress and become a stronger player with our comprehensive training system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/signup">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black text-lg px-8 py-4">
                <Play className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
            </Link>
            <Link href="/plans">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4">
                <Crown className="mr-2 h-5 w-5" />
                View Plans
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Target className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Spaced Repetition</h3>
              <p className="text-white/70">
                Learn efficiently with our scientifically-proven spaced repetition system
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <BookOpen className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Database</h3>
              <p className="text-white/70">
                Access thousands of chess openings, tactics, and endgame positions
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Crown className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Track Progress</h3>
              <p className="text-white/70">
                Monitor your improvement with detailed statistics and learning streaks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}