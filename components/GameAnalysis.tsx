"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, TrendingUp, TrendingDown, Lightbulb, Target, Trophy } from 'lucide-react';
import { ChessOpening } from '@/data/chessOpenings';

interface GameAnalysisProps {
  opening: ChessOpening;
}

export function GameAnalysis({ opening }: GameAnalysisProps) {
  return (
    <div className="space-y-6">
      {/* Main Ideas */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-amber-400" />
            Key Ideas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {opening.mainIdeas.map((idea, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Target className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{idea}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advantages */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
            Advantages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {opening.advantages.map((advantage, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{advantage}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disadvantages */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingDown className="h-5 w-5 mr-2 text-red-400" />
            Disadvantages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {opening.disadvantages.map((disadvantage, index) => (
              <div key={index} className="flex items-start space-x-3">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">{disadvantage}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Positions */}
      {opening.keyPositions && opening.keyPositions.length > 0 && (
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-purple-400" />
              Key Positions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {opening.keyPositions.map((position, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-400 text-xs font-bold">{index + 1}</span>
                  </div>
                  <span className="text-white/80">{position}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Study Tips */}
      <Card className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/90 to-amber-900/70 border-amber-900/60 shadow-lg backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-amber-300 flex items-center drop-shadow-md">
            <Target className="h-5 w-5 mr-2 text-amber-400 drop-shadow" />
            Study Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-zinc-100/90">
              <strong className="text-amber-300">Practice regularly:</strong> Play through the moves multiple times to build muscle memory.
            </p>
            <p className="text-zinc-100/90">
              <strong className="text-amber-300">Understand the ideas:</strong> Don't just memorize moves, understand the strategic goals.
            </p>
            <p className="text-zinc-100/90">
              <strong className="text-amber-300">Study master games:</strong> Look at how masters have played this opening in practice.
            </p>
            <p className="text-zinc-100/90">
              <strong className="text-amber-300">Analyze complete games:</strong> See how the opening principles translate to the middlegame and endgame.
            </p>
            <div className="mt-4">
              <Badge className="bg-amber-900/80 text-amber-200 border-amber-700/80 shadow font-bold px-4 py-1">
                Result: {opening.gameResult}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}