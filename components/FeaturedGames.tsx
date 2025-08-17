"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { chessOpenings, featuredOpenings } from '@/data/chessOpenings';

// Generate realistic stats for each opening
const getOpeningStats = (id: string) => {
  const stats = {
    'vienna-gambit': { popularity: 92, avgTime: '4 min', players: '12.5k', rating: 4.8 },
    'sicilian-dragon': { popularity: 87, avgTime: '6 min', players: '8.2k', rating: 4.9 },
    'queens-gambit': { popularity: 95, avgTime: '5 min', players: '15.7k', rating: 4.7 },
    'french-defense': { popularity: 78, avgTime: '3 min', players: '9.1k', rating: 4.6 },
    'ruy-lopez': { popularity: 89, avgTime: '5 min', players: '11.3k', rating: 4.8 },
    'caro-kann': { popularity: 73, avgTime: '4 min', players: '7.8k', rating: 4.5 }
  };
  return stats[id as keyof typeof stats] || { popularity: 80, avgTime: '4 min', players: '10k', rating: 4.5 };
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    case 'Intermediate':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
    case 'Advanced':
      return 'bg-red-500/20 text-red-400 border-red-500/50';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

export function FeaturedGames() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Chess Openings
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Master the most important chess openings with our interactive learning system
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOpenings.map((openingId) => {
            const opening = chessOpenings[openingId];
            const stats = getOpeningStats(openingId);
            
            if (!opening) return null;
            
            // Get first few moves for display
            const displayMoves = opening.moves.slice(0, 5).map(m => m.move);
            
            return (
            <Link key={opening.id} href={`/opening/${opening.id}`}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-xl mb-2 group-hover:text-amber-400 transition-colors">
                        {opening.title}
                      </CardTitle>
                      <CardDescription className="text-white/60 text-sm">
                        {opening.category}
                      </CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(opening.difficulty)}>
                      {opening.difficulty}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {opening.description}
                  </p>

                  {/* Opening moves */}
                  <div className="mb-4">
                    <p className="text-white/60 text-xs mb-2">Opening moves:</p>
                    <div className="flex flex-wrap gap-1">
                      {displayMoves.map((move, index) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="text-xs border-amber-500/50 text-amber-400 bg-amber-500/10"
                        >
                          {index + 1}. {move}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-white/60">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{stats.avgTime}</span>
                    </div>
                    <div className="flex items-center text-white/60">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{stats.players}</span>
                    </div>
                    <div className="flex items-center text-white/60">
                      <Star className="h-4 w-4 mr-1" />
                      <span>{stats.rating}/5</span>
                    </div>
                    <div className="flex items-center text-white/60">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>{stats.popularity}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/openings">
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg border border-white/20 transition-all duration-300">
              View All Openings
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}