"use client";

// import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedGames } from '@/components/FeaturedGames';
import { LearningStreakSidebar } from '@/components/LearningStreakSidebar';
import { ChessBoard } from '@/components/ChessBoard'; // Keep this line for reference
import { ThreeChessBoard } from '@/components/ThreeChessBoard';

// Sample moves for animation (e4, e5, Nf3, Nc6, Bb5)
const animatedMoves = [
  { move: 'e4', notation: 'e4', explanation: 'White plays King\'s Pawn forward.' },
  { move: 'e5', notation: 'e5', explanation: 'Black responds symmetrically.' },
  { move: 'Nf3', notation: 'Nf3', explanation: 'White develops the knight.' },
  { move: 'Nc6', notation: 'Nc6', explanation: 'Black develops the knight.' },
  { move: 'Bb5', notation: 'Bb5', explanation: 'White plays the Ruy Lopez.' },
];

// Faded animated chessboard background
import React, { useEffect, useRef, useState } from 'react';
function AnimatedChessBackground() {
  const [inView, setInView] = useState(true);
  const bgRef = useRef<HTMLDivElement>(null);
  // SVGs for 3D-looking chess pieces (simple, stylized)
  const Pawn = (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="absolute animate-pawn3d" style={{left: '10%', top: '60%'}}><ellipse cx="20" cy="32" rx="10" ry="5" fill="#fff" opacity="0.15"/><circle cx="20" cy="18" r="7" fill="#fff" opacity="0.18"/><rect x="16" y="25" width="8" height="8" rx="4" fill="#fff" opacity="0.13"/></svg>
  );
  // Bishop and Knight are now relative to the hero section, not the chessboard
  const Bishop = (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className={`piece-hero animate-bishop3d transition-transform duration-700 ${inView ? 'bishop-in' : 'bishop-out'}`} style={{top: '20%', left: '-60px'}}><ellipse cx="22" cy="36" rx="12" ry="6" fill="#fff" opacity="0.13"/><ellipse cx="22" cy="22" rx="7" ry="13" fill="#fff" opacity="0.16"/><rect x="18" y="30" width="8" height="10" rx="4" fill="#fff" opacity="0.10"/></svg>
  );
  const Knight = (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={`piece-hero animate-knight3d transition-transform duration-700 ${inView ? 'knight-in' : 'knight-out'}`} style={{top: '65%', right: '-70px'}}><ellipse cx="24" cy="40" rx="13" ry="7" fill="#fff" opacity="0.13"/><path d="M24 36 Q28 28 20 18 Q30 20 32 10 Q38 18 28 32 Z" fill="#fff" opacity="0.18"/></svg>
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const rect = bgRef.current.getBoundingClientRect();
      // If the hero section is at least 40% visible, show pieces
      setInView(rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.2);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={bgRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-full w-full z-0 flex items-center justify-center"
      style={{
        opacity: 0.13,
        filter: 'blur(1.5px)',
        background: 'none',
        pointerEvents: 'none',
      }}
    >
      {/* 3D Tilted Chessboard with camera animation */}
      <div className="chessboard-3d-anim" style={{
        width: 600,
        height: 600,
        maxWidth: '80vw',
        maxHeight: '80vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 80px 0 #fff2',
      }}>
  <ThreeChessBoard />
        {/* Animated 3D pawn stays on the board */}
        {Pawn}
      </div>
      {/* Bishop and Knight float relative to hero section, not the board */}
      {Bishop}
      {Knight}
      <style>{`
        .piece-hero {
          position: absolute;
          z-index: 1;
          pointer-events: none;
        }
        @keyframes camera3d {
          0% { transform: perspective(1200px) rotateX(32deg) rotateZ(-18deg) scale(1.1); }
          20% { transform: perspective(1200px) rotateX(38deg) rotateZ(-10deg) scale(1.18); }
          40% { transform: perspective(1200px) rotateX(28deg) rotateZ(-25deg) scale(1.05); }
          60% { transform: perspective(1200px) rotateX(35deg) rotateZ(-12deg) scale(1.13); }
          80% { transform: perspective(1200px) rotateX(30deg) rotateZ(-20deg) scale(1.08); }
          100% { transform: perspective(1200px) rotateX(32deg) rotateZ(-18deg) scale(1.1); }
        }
        .chessboard-3d-anim {
          animation: camera3d 14s ease-in-out infinite;
        }
        @keyframes pawnFloat3d {
          0% { transform: translateY(0) scale(1) rotateZ(0deg) rotateX(0deg); }
          25% { transform: translateY(-18px) scale(1.05) rotateZ(-6deg) rotateX(8deg); }
          50% { transform: translateY(-8px) scale(1.08) rotateZ(-12deg) rotateX(-6deg); }
          75% { transform: translateY(-14px) scale(1.03) rotateZ(4deg) rotateX(4deg); }
          100% { transform: translateY(0) scale(1) rotateZ(0deg) rotateX(0deg); }
        }
        @keyframes bishopFloat3d {
          0% { transform: translateY(0) scale(1) rotateZ(0deg) rotateY(0deg); }
          30% { transform: translateY(-24px) scale(1.08) rotateZ(8deg) rotateY(10deg); }
          60% { transform: translateY(-10px) scale(1.12) rotateZ(-8deg) rotateY(-8deg); }
          100% { transform: translateY(0) scale(1) rotateZ(0deg) rotateY(0deg); }
        }
        @keyframes knightFloat3d {
          0% { transform: translateY(0) scale(1) rotateZ(0deg) rotateX(0deg); }
          40% { transform: translateY(-14px) scale(1.04) rotateZ(-10deg) rotateX(10deg); }
          80% { transform: translateY(-6px) scale(1.09) rotateZ(8deg) rotateX(-8deg); }
          100% { transform: translateY(0) scale(1) rotateZ(0deg) rotateX(0deg); }
        }
        .animate-pawn3d { animation: pawnFloat3d 7s ease-in-out infinite; }
        .animate-bishop3d { animation: bishopFloat3d 8.5s ease-in-out infinite; }
        .animate-knight3d { animation: knightFloat3d 9.5s ease-in-out infinite; }
  .bishop-in { transform: translateX(80px) !important; opacity: 1 !important; }
  .bishop-out { transform: translateX(-200px) !important; opacity: 0 !important; }
  .knight-in { transform: translateX(-80px) !important; opacity: 1 !important; }
  .knight-out { transform: translateX(200px) !important; opacity: 0 !important; }
      `}</style>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <Navbar />
      <div className="flex flex-col items-center">
        {/* Hero Section (text only) with background chessboard */}
        <section className="w-full flex flex-col items-center justify-center pt-20 pb-8 max-w-7xl mx-auto px-4 relative">
          <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center">
            <AnimatedChessBackground />
          </div>
          <div className="relative z-10 w-full">
            <Hero />
          </div>
        </section>
        {/* Rest of the page */}
        <div className="flex w-full">
          <main className="flex-1">
            <FeaturedGames />
          </main>
          <LearningStreakSidebar />
        </div>
      </div>
    </div>
  );
}