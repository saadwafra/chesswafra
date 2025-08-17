

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <OpeningDetailClient id={params.id} />
        </div>
      </div>
    </div>
  );
}
// Remove all code after this line
