"use client";
import { Navbar } from '@/components/Navbar';
import AnimatedChessBackground from '@/components/AnimatedChessBackground';
import { chessOpenings } from '@/data/chessOpenings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const PAGE_SIZE = 3;

export default function OpeningsPage() {
  const allOpenings = Object.values(chessOpenings);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardGridRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const visibleOpenings = allOpenings.slice(0, visibleCount);
  const hasMore = visibleCount < allOpenings.length;

  useEffect(() => {
    const tl = gsap.timeline();
    if (headerRef.current) {
      tl.fromTo(headerRef.current, { opacity: 0, y: 60, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power4.out' });
    }
    if (cardGridRef.current) {
      tl.fromTo(cardGridRef.current.children, { opacity: 0, y: 60, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.13, ease: 'power3.out' }, '-=0.7');
    }
    if (btnRef.current) {
      tl.fromTo(btnRef.current, { opacity: 0, y: 60, scale: 0.8, filter: 'blur(8px)' }, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'back.out(1.7)' }, '-=0.7');
    }
  }, [visibleCount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <AnimatedChessBackground />
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8" ref={headerRef}>
            <h1 className="text-4xl font-bold text-white">All Chess Openings</h1>
            <Link href="/" className="px-4 py-2 bg-amber-500 text-black font-semibold rounded hover:bg-amber-600 transition">Back to Home</Link>
          </div>
          <div className="grid gap-8" ref={cardGridRef}>
            {visibleOpenings.map(opening => (
              <Card key={opening.id} className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    {opening.title}
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 ml-2">{opening.category}</Badge>
                    <Badge variant="outline" className="text-white border-white/20 ml-2">ECO: {opening.eco}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-2">{opening.description}</p>
                  <Link href={`/opening/${opening.id}`} className="text-amber-400 hover:underline font-medium">View Details</Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            {hasMore ? (
              <button
                ref={btnRef}
                onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                className="px-6 py-2 bg-amber-500 text-black font-semibold rounded hover:bg-amber-600 transition"
              >
                Load More Games
              </button>
            ) : (
              <span className="px-6 py-2 bg-slate-700 text-white font-semibold rounded">No more games to load</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
