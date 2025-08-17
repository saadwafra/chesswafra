"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { Play, Crown, Target, BookOpen } from 'lucide-react';
import Link from 'next/link';


export function Hero() {
  const crownRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const repRef = useRef<HTMLSpanElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(crownRef.current, { y: -80, opacity: 0, scale: 2.2, filter: 'blur(12px)' }, { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power4.out' })
      .fromTo(h1Ref.current, { y: 80, opacity: 0, letterSpacing: '0.5em', filter: 'blur(8px)' }, { y: 0, opacity: 1, letterSpacing: '0.02em', filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }, '-=0.7')
      .fromTo(repRef.current, { scale: 2.2, opacity: 0, color: '#fff' }, { scale: 1, opacity: 1, color: '#fbbf24', duration: 1.1, ease: 'expo.out' }, '-=0.8')
      .fromTo(pRef.current, { y: 60, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' }, '-=0.7')
      .fromTo(btnsRef.current, { y: 60, opacity: 0, scale: 0.8, filter: 'blur(8px)' }, { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'back.out(1.7)' }, '-=0.8');
    if (cardsRef.current) {
      tl.fromTo(cardsRef.current.children, { opacity: 0, y: 60, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.13, ease: 'power3.out' }, '-=0.7');
    }
  }, []);

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center mb-6" ref={crownRef}>
            <Crown className="h-16 w-16 text-amber-400 animate-pulse" />
          </div>
          <h1 ref={h1Ref} className="text-4xl md:text-6xl font-bold text-white mb-6 movie-title-shadow">
            Master Chess with
            <span ref={repRef} className="text-amber-400 block">Repetition</span>
          </h1>
          <p ref={pRef} className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Learn chess openings, tactics, and endgames through spaced repetition. 
            Track your progress and become a stronger player with our comprehensive training system.
          </p>
          <div ref={btnsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/signup">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black text-lg px-8 py-4">
                <Play className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
            </Link>
            <Link href="/plans">
              <Button size="lg" variant="outline" className="border-amber-400/70 text-amber-300 bg-zinc-900/70 hover:bg-amber-400/10 hover:text-amber-400 text-lg px-8 py-4 shadow-md">
                <Crown className="mr-2 h-5 w-5 text-amber-400" />
                View Plans
              </Button>
            </Link>
          </div>
          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-16" ref={cardsRef}>
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
      <style jsx>{`
        .movie-title-shadow {
          text-shadow: 0 8px 32px #000, 0 1px 0 #fff2, 0 0px 40px #eab30844;
        }
      `}</style>
    </section>
  );
}