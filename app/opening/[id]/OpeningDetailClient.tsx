"use client";
// ...existing code...
// Helper: parse move string to board coordinates
function parseMoveToCoords(move: string | undefined): { from: [number, number], to: [number, number] } | undefined {
  if (!move) return undefined;
  const fileMap: Record<string, number> = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };
  // Pawn move: e4
  if (/^[a-h][1-8]$/.test(move)) {
    const to: [number, number] = [8 - parseInt(move[1]), fileMap[move[0]]];
    const from: [number, number] = [to[0] + 1, to[1]];
    return { from, to };
  }
  // Piece move: Nf3
  if (/^[KQRBN][a-h][1-8]$/.test(move)) {
    const to: [number, number] = [8 - parseInt(move[2]), fileMap[move[1]]];
    return { from: to, to };
  }
  // Castling
  if (move === 'O-O' || move === '0-0') return { from: [7, 4], to: [7, 6] };
  if (move === 'O-O-O' || move === '0-0-0') return { from: [7, 4], to: [7, 2] };
  return undefined;
}

// Helper: convert board coordinates to move string (for basic moves)
function coordsToMove(from: [number, number], to: [number, number]): string {
  const file = ['a','b','c','d','e','f','g','h'];
  return file[to[1]] + (8 - to[0]);
}
// ...existing code...
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChessBoard } from '@/components/ChessBoard';
import { GameAnalysis } from '@/components/GameAnalysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, SkipBack, SkipForward, BookOpen, Target, Pause, FastForward, Trophy } from 'lucide-react';
import { chessOpenings } from '@/data/chessOpenings';
interface OpeningDetailClientProps {
  id: string;
}

export default function OpeningDetailClient({ id }: OpeningDetailClientProps) {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showCompleteGame, setShowCompleteGame] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [victory, setVictory] = useState(false);
  const [pendingBlackMove, setPendingBlackMove] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [autoPlayComplete, setAutoPlayComplete] = useState(false);

  // Animation refs
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Only animate cards and text, not the background
    // Cinematic homepage-style animation for all cards and headings
    useEffect(() => {
      const tl = gsap.timeline();
      // Animate all major headings
      const headingEls = document.querySelectorAll('.opening-heading-animate');
      if (headingEls.length) {
        tl.fromTo(headingEls,
          { opacity: 0, y: 80, filter: 'blur(12px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.15, stagger: 0.12, ease: 'power4.out' }
        );
      }
      // Animate all cards
      const cardEls = document.querySelectorAll('.opening-card-animate');
      if (cardEls.length) {
        tl.fromTo(cardEls,
          { opacity: 0, y: 60, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.05, stagger: 0.13, ease: 'power3.out' },
          '-=0.7'
        );
      }
    }, [id]);

  const opening = chessOpenings[id] || chessOpenings['vienna-gambit'];
  const currentMoves = showCompleteGame ? opening.completeGame || opening.moves : opening.moves;
  const isCompleteGame = showCompleteGame && opening.completeGame && opening.completeGame.length > 0;


  // Handlers for controls
  const resetGame = () => {
    setCurrentMoveIndex(0);
    setIsAutoPlaying(false);
    setShowHint(false);
    setShowExplanation(false);
    setVictory(false);
    setUserInput('');
  };

  const prevMove = () => {
    if (currentMoveIndex > 0) {
      setCurrentMoveIndex(prev => prev - 1);
    }
  };

  const nextMove = () => {
    if (currentMoveIndex < currentMoves.length - 1) {
      setCurrentMoveIndex(prev => prev + 1);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const toggleGameView = () => {
    setShowCompleteGame(!showCompleteGame);
    setCurrentMoveIndex(0);
    setIsAutoPlaying(false);
    setShowHint(false);
    setShowExplanation(false);
    setVictory(false);
    setUserInput('');
  };

  // Handle user move input in complete game mode
  const handleUserMove = () => {
    if (!isCompleteGame) return;
    const move = userInput.trim();
    const expectedMove = currentMoves[currentMoveIndex].move;
    if (move === expectedMove) {
      setShowExplanation(true);
      setTimeout(() => {
        setShowExplanation(false);
        setUserInput('');
        // After user's move, if next is Black's move, animate it
        if (currentMoveIndex + 1 < currentMoves.length) {
          setCurrentMoveIndex(prev => prev + 1);
          // If next move is Black, set pendingBlackMove to true
          const nextMoveIndex = currentMoveIndex + 1;
          const isBlackMove = nextMoveIndex % 2 === 1;
          if (isBlackMove && nextMoveIndex < currentMoves.length) {
            setPendingBlackMove(true);
          }
        } else {
          setVictory(true);
        }
      }, 900);
    } else {
      setShowHint(true);
    }
  };

  // Animate Black's move after user's move (in complete game mode)
  useEffect(() => {
    if (!isCompleteGame || victory) return;
    if (pendingBlackMove) {
      setShowExplanation(true);
      const timer = setTimeout(() => {
        setShowExplanation(false);
        setCurrentMoveIndex(prev => {
          if (prev + 1 >= currentMoves.length) {
            setVictory(true);
            return prev;
          }
          return prev + 1;
        });
        setPendingBlackMove(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [pendingBlackMove, isCompleteGame, victory, currentMoves]);

  return (
    <>
      {/* Header */}
      <div className="mb-8 opening-heading-animate">
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">
            {opening.category}
          </Badge>
          <Badge variant="outline" className="text-white border-white/20">
            ECO: {opening.eco}
          </Badge>
          <Badge className={
            opening.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
            opening.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' :
            'bg-red-500/20 text-red-400 border-red-500/50'
          }>
            {opening.difficulty}
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
            {opening.gameResult}
          </Badge>
        </div>
  <h1 className="text-4xl font-bold text-white mb-4 opening-heading-animate">{opening.title}</h1>
  <p className="text-xl text-white/70 max-w-4xl opening-heading-animate">{opening.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chess Board Section */}
        <div className="lg:col-span-2">
          {/* Game Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-1">
              <Button
                onClick={() => { if (showCompleteGame) toggleGameView(); }}
                className={`px-4 py-2 transition-all duration-300 rounded-md font-semibold shadow focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2
                  ${showCompleteGame
                    ? 'bg-zinc-800 text-amber-200 hover:bg-zinc-700 hover:text-amber-100 border border-amber-700/40'
                    : 'bg-amber-600 text-zinc-900 hover:bg-amber-700 hover:text-white border border-amber-700/60'}`}
              >
                Main Line
              </Button>
              <Button
                onClick={() => { if (!showCompleteGame) toggleGameView(); }}
                className={`px-4 py-2 transition-all duration-300 rounded-md font-semibold shadow focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2
                  ${showCompleteGame
                    ? 'bg-amber-600 text-zinc-900 hover:bg-amber-700 hover:text-white border border-amber-700/60'
                    : 'bg-zinc-800 text-amber-200 hover:bg-zinc-700 hover:text-amber-100 border border-amber-700/40'}`}
              >
                Complete Game
              </Button>
            </div>
          </div>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 opening-card-animate">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-amber-400" />
                {showCompleteGame ? 'Complete Game' : 'Main Line'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Interactive ChessBoard in complete game mode */}
              {isCompleteGame ? (
                <ChessBoard
                  moves={currentMoves.slice(0, currentMoveIndex + 1)}
                  expectedMove={
                    // Only allow user move if it's user's turn
                    currentMoveIndex < currentMoves.length
                      ? parseMoveToCoords(currentMoves[currentMoveIndex]?.move)
                      : undefined
                  }
                  showHint={showHint}
                  explanationText={
                    currentMoveIndex > 0
                      ? currentMoves[currentMoveIndex - 1]?.explanation
                      : currentMoves[0]?.explanation
                  }
                  onUserMove={async (from, to) => {
                    const move = coordsToMove(from, to);
                    const expected = currentMoves[currentMoveIndex]?.move;
                    // Determine if user is White or Black by first move
                    const userIsWhite = currentMoves[0]?.move?.charAt(0) === currentMoves[currentMoveIndex]?.move?.charAt(0);
                    const userTurn = userIsWhite ? currentMoveIndex % 2 === 0 : currentMoveIndex % 2 === 1;
                    if (move === expected && userTurn) {
                      setShowExplanation(true);
                      setShowHint(false);
                      await new Promise(res => setTimeout(res, 900));
                      setShowExplanation(false);
                      setCurrentMoveIndex(prev => prev + 1);
                    } else {
                      setShowHint(true);
                    }
                  }}
                  allowUserMove={!victory && !showExplanation && ((currentMoves[0]?.move?.charAt(0) === currentMoves[currentMoveIndex]?.move?.charAt(0)) ? currentMoveIndex % 2 === 0 : currentMoveIndex % 2 === 1)}
                />
              ) : (
                <ChessBoard
                  moves={currentMoves.slice(0, currentMoveIndex + 1)}
                  showHint={showHint}
                  explanationText={currentMoves[currentMoveIndex]?.explanation}
                />
              )}
              {/* Controls for both modes: always show reset, others only in main line mode */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetGame}
                  className="bg-zinc-800 text-amber-200 border-amber-700/40 hover:bg-zinc-700 hover:text-amber-100 focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                {!isCompleteGame && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevMove}
                      disabled={currentMoveIndex === 0}
                      className="bg-zinc-800 text-amber-200 border-amber-700/40 hover:bg-zinc-700 hover:text-amber-100 focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 disabled:opacity-30"
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={toggleAutoPlay}
                      className={`px-6 rounded-md font-semibold shadow focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2
                        ${isAutoPlaying
                          ? 'bg-red-600 text-white hover:bg-red-700 border border-red-700/60'
                          : 'bg-amber-600 text-zinc-900 hover:bg-amber-700 hover:text-white border border-amber-700/60'}`}
                    >
                      {isAutoPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                      {isAutoPlaying ? 'Pause' : 'Auto Play'}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextMove}
                      disabled={currentMoveIndex >= currentMoves.length - 1}
                      className="bg-zinc-800 text-amber-200 border-amber-700/40 hover:bg-zinc-700 hover:text-amber-100 focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 disabled:opacity-30"
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentMoveIndex(currentMoves.length - 1)}
                      disabled={currentMoveIndex >= currentMoves.length - 1}
                      className="bg-zinc-800 text-amber-200 border-amber-700/40 hover:bg-zinc-700 hover:text-amber-100 focus-visible:ring-2 focus-visible:ring-amber-400/80 focus-visible:ring-offset-2 disabled:opacity-30"
                    >
                      <FastForward className="h-4 w-4 mr-2" />
                      End
                    </Button>
                  </>
                )}
              </div>
              {/* Manual move input for complete game mode */}
              {isCompleteGame && !victory && (
                <div className="flex flex-col items-center gap-3 mt-6">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={userInput}
                      onChange={e => setUserInput(e.target.value)}
                      placeholder={`Enter your move (e.g. ${currentMoves[currentMoveIndex]?.move})`}
                      className="px-3 py-2 rounded-md bg-zinc-900 text-amber-200 border border-amber-700/40 focus:outline-none focus:ring-2 focus:ring-amber-400/80"
                      onKeyDown={e => { if (e.key === 'Enter') handleUserMove(); }}
                      disabled={showExplanation}
                    />
                    <Button onClick={handleUserMove} disabled={showExplanation} className="bg-amber-600 text-zinc-900 hover:bg-amber-700 hover:text-white border border-amber-700/60 px-4 py-2 rounded-md font-semibold">Submit</Button>
                  </div>
                  {showHint && (
                    <div className="text-amber-300 bg-zinc-800 border border-amber-700/40 rounded-md px-3 py-2 mt-1 animate-pulse">Hint: {currentMoves[currentMoveIndex]?.move}</div>
                  )}
                  {showExplanation && (
                    <div className="text-amber-100 bg-zinc-900 border border-amber-700/40 rounded-md px-3 py-2 mt-1 shadow-lg animate-fade-in">{currentMoves[currentMoveIndex]?.explanation}</div>
                  )}
                </div>
              )}
              {/* Victory popup */}
              {victory && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="bg-zinc-900 border-amber-700/60 border-2 rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center animate-fade-in">
                    <Trophy className="h-12 w-12 text-amber-400 mb-4 animate-bounce" />
                    <h2 className="text-3xl font-bold text-amber-200 mb-2">Congratulations!</h2>
                    <p className="text-lg text-amber-100 mb-4">You won the game by following the strategy!</p>
                    <Button onClick={toggleGameView} className="bg-amber-600 text-zinc-900 hover:bg-amber-700 hover:text-white border border-amber-700/60 px-6 py-2 rounded-md font-semibold">Play Again</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Current Move Analysis */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mt-8 opening-card-animate">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Move Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentMoves[currentMoveIndex] && (
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 text-lg px-4 py-2">
                      {currentMoves[currentMoveIndex].notation}
                    </Badge>
                    <span className="text-2xl font-mono text-amber-400">{currentMoves[currentMoveIndex].move}</span>
                    {currentMoves[currentMoveIndex].evaluation && (
                      <Badge variant="outline" className="text-white border-white/20">
                        Eval: {currentMoves[currentMoveIndex].evaluation}
                      </Badge>
                    )}
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {currentMoves[currentMoveIndex].explanation}
                  </p>
                  {currentMoves[currentMoveIndex].alternatives && (
                    <div className="mt-4">
                      <p className="text-white/60 text-sm mb-2">Alternative moves:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentMoves[currentMoveIndex].alternatives?.map((alt, index) => (
                          <Badge key={index} variant="outline" className="text-white/70 border-white/30">
                            {alt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Game Result Display */}
              {showCompleteGame && currentMoveIndex >= currentMoves.length - 1 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-lg">
                  <h3 className="text-xl font-bold text-amber-400 mb-2">Game Result</h3>
                  <p className="text-white text-lg">{opening.gameResult}</p>
                  <p className="text-white/70 mt-2">
                    This game demonstrates the key strategic and tactical themes of the {opening.title}.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analysis Section */}
        <div className="space-y-6">
          <GameAnalysis opening={opening} />
          {/* Master Games */}
          {opening.masterGames && opening.masterGames.length > 0 && (
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 opening-card-animate">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                  Master Games
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {opening.masterGames.map((game, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white font-medium">
                            {game.white} vs {game.black}
                          </p>
                          <p className="text-white/60 text-sm">
                            {game.event} ({game.year})
                          </p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          {game.result}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
