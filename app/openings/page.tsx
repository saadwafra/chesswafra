"use client";
import { Navbar } from '@/components/Navbar';
import { chessOpenings } from '@/data/chessOpenings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState } from 'react';

const PAGE_SIZE = 3;

export default function OpeningsPage() {
  const allOpenings = Object.values(chessOpenings);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleOpenings = allOpenings.slice(0, visibleCount);
  const hasMore = visibleCount < allOpenings.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8"> {/* Added pt-24 for top spacing */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-white">All Chess Openings</h1>
            <Link href="/" className="px-4 py-2 bg-amber-500 text-black font-semibold rounded hover:bg-amber-600 transition">Back to Home</Link>
          </div>
          <div className="grid gap-8">
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
