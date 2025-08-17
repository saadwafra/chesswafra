

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import AnimatedChessBackground from '@/components/AnimatedChessBackground';
import { ChessBoard } from '@/components/ChessBoard';
import { GameAnalysis } from '@/components/GameAnalysis';
// import { Navbar } from '@/components/Navbar';
import OpeningDetailClient from './OpeningDetailClient';

// Required for static export
export async function generateStaticParams() {
  return [
    { id: 'vienna-gambit' },
    { id: 'sicilian-dragon' },
    { id: 'queens-gambit' },
    { id: 'french-defense' },
    { id: 'ruy-lopez' },
    { id: 'caro-kann' },
  ];
}
interface PageProps {
  params: { id: string };
}


export default function Page({ params }: PageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.35 }}>
        <AnimatedChessBackground />
      </div>
      <Navbar />
      <div className="flex-1 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <OpeningDetailClient id={params.id} />
        </div>
      </div>
    </div>
  );
}
