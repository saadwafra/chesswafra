"use client";

import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';

type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P' | 'k' | 'q' | 'r' | 'b' | 'n' | 'p' | null;

interface ChessBoardProps {
  moves: Array<{ move: string; notation: string; explanation: string; why?: string }>; 
  why?: string; // Optional property to explain the move
  expectedMove?: { from: [number, number], to: [number, number] };
  showHint?: boolean;
  hintText?: string; // legacy, for compatibility
  explanationText?: string; // always-on explanation bubble
  onUserMove?: (from: [number, number], to: [number, number]) => void;
  allowUserMove?: boolean;
}


// Convert chess.js board to PieceType[][]
const chessJsToBoard = (chess: Chess): PieceType[][] => {
  const board = chess.board();
  return board.map(row =>
    row.map(cell => {
      if (!cell) return null;
      // chess.js uses lowercase for black, uppercase for white
      return cell.color === 'w' ? cell.type.toUpperCase() : cell.type.toLowerCase();
    })
  ) as PieceType[][];
};

const pieceSymbols: Record<string, string> = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
};

// Comprehensive move parsing system
const parseMove = (move: string, board: PieceType[][]): { from: [number, number], to: [number, number], piece: PieceType, captured?: PieceType } | null => {
  // Handle castling
  if (move === 'O-O' || move === '0-0') {
    // Kingside castling
    const whiteKing = findPiece(board, 'K');
    const blackKing = findPiece(board, 'k');
    if (whiteKing && whiteKing[0] === 7) {
      return { from: [7, 4], to: [7, 6], piece: 'K' };
    } else if (blackKing && blackKing[0] === 0) {
      return { from: [0, 4], to: [0, 6], piece: 'k' };
    }
  }
  
  if (move === 'O-O-O' || move === '0-0-0') {
    // Queenside castling
    const whiteKing = findPiece(board, 'K');
    const blackKing = findPiece(board, 'k');
    if (whiteKing && whiteKing[0] === 7) {
      return { from: [7, 4], to: [7, 2], piece: 'K' };
    } else if (blackKing && blackKing[0] === 0) {
      return { from: [0, 4], to: [0, 2], piece: 'k' };
    }
  }

  // Parse algebraic notation
  const cleanMove = move.replace(/[+#!?]/g, ''); // Remove check, checkmate, and annotation symbols
  
  // Handle pawn moves
  if (/^[a-h][1-8]$/.test(cleanMove)) {
    const file = cleanMove.charCodeAt(0) - 97; // a=0, b=1, etc.
    const rank = 8 - parseInt(cleanMove[1]); // 8=0, 7=1, etc.
    
  // Legacy logic, now unused with chess.js
  }
  
  // Handle pawn captures
  if (/^[a-h]x[a-h][1-8]$/.test(cleanMove)) {
    const fromFile = cleanMove.charCodeAt(0) - 97;
    const toFile = cleanMove.charCodeAt(2) - 97;
    const toRank = 8 - parseInt(cleanMove[3]);
    
  // Legacy logic, now unused with chess.js
  }
  
  // Handle piece moves (e.g., Nf3, Bb5, etc.)
  const pieceMatch = cleanMove.match(/^([KQRBN])([a-h]?[1-8]?)(x?)([a-h][1-8])$/);
  if (pieceMatch) {
  const pieceType = pieceMatch[1] as PieceType;
    const disambiguation = pieceMatch[2];
    const isCapture = pieceMatch[3] === 'x';
    const destination = pieceMatch[4];
    
    const toFile = destination.charCodeAt(0) - 97;
    const toRank = 8 - parseInt(destination[1]);
    
  // Legacy logic, now unused with chess.js
  const piece = pieceType;
  // Find all pieces of this type that can move to the destination
  const candidates = findPieceCandidates(board, piece, toRank, toFile);
    
    if (candidates.length === 1) {
      const captured = isCapture ? board[toRank][toFile] : undefined;
      return { from: candidates[0], to: [toRank, toFile], piece, captured };
    } else if (candidates.length > 1 && disambiguation) {
      // Handle disambiguation
      const filtered = candidates.filter(([rank, file]) => {
        if (disambiguation.length === 1) {
          if (/[a-h]/.test(disambiguation)) {
            return file === disambiguation.charCodeAt(0) - 97;
          } else {
            return rank === 8 - parseInt(disambiguation);
          }
        }
        return false;
      });
      
      if (filtered.length === 1) {
        const captured = isCapture ? board[toRank][toFile] : undefined;
        return { from: filtered[0], to: [toRank, toFile], piece, captured };
      }
    }
  }
  
  return null;
};

const findPiece = (board: PieceType[][], piece: PieceType): [number, number] | null => {
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      if (board[rank][file] === piece) {
        return [rank, file];
      }
    }
  }
  return null;
};

// getCurrentPlayer is no longer needed with chess.js

const findPieceCandidates = (board: PieceType[][], piece: PieceType, toRank: number, toFile: number): [number, number][] => {
  const candidates: [number, number][] = [];
  
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      if (board[rank][file] === piece) {
        if (canPieceMoveTo(board, piece, rank, file, toRank, toFile)) {
          candidates.push([rank, file]);
        }
      }
    }
  }
  
  return candidates;
};

const canPieceMoveTo = (board: PieceType[][], piece: PieceType, fromRank: number, fromFile: number, toRank: number, toFile: number): boolean => {
  const pieceType = piece?.toLowerCase();
  const rankDiff = toRank - fromRank;
  const fileDiff = toFile - fromFile;
  const absRankDiff = Math.abs(rankDiff);
  const absFileDiff = Math.abs(fileDiff);
  
  switch (pieceType) {
    case 'p': // Pawn
      const direction = piece === 'P' ? -1 : 1;
      const startRank = piece === 'P' ? 6 : 1;
      
      // Forward move
      if (fileDiff === 0 && board[toRank][toFile] === null) {
        if (rankDiff === direction) return true;
        if (fromRank === startRank && rankDiff === 2 * direction) return true;
      }
      // Capture
      if (absFileDiff === 1 && rankDiff === direction && board[toRank][toFile] !== null) {
        return true;
      }
      return false;
      
    case 'r': // Rook
      if (rankDiff === 0 || fileDiff === 0) {
        return isPathClear(board, fromRank, fromFile, toRank, toFile);
      }
      return false;
      
    case 'n': // Knight
      return (absRankDiff === 2 && absFileDiff === 1) || (absRankDiff === 1 && absFileDiff === 2);
      
    case 'b': // Bishop
      if (absRankDiff === absFileDiff) {
        return isPathClear(board, fromRank, fromFile, toRank, toFile);
      }
      return false;
      
    case 'q': // Queen
      if (rankDiff === 0 || fileDiff === 0 || absRankDiff === absFileDiff) {
        return isPathClear(board, fromRank, fromFile, toRank, toFile);
      }
      return false;
      
    case 'k': // King
      return absRankDiff <= 1 && absFileDiff <= 1;
      
    default:
      return false;
  }
};

const isPathClear = (board: PieceType[][], fromRank: number, fromFile: number, toRank: number, toFile: number): boolean => {
  const rankStep = toRank > fromRank ? 1 : toRank < fromRank ? -1 : 0;
  const fileStep = toFile > fromFile ? 1 : toFile < fromFile ? -1 : 0;
  
  let currentRank = fromRank + rankStep;
  let currentFile = fromFile + fileStep;
  
  while (currentRank !== toRank || currentFile !== toFile) {
    if (board[currentRank][currentFile] !== null) {
      return false;
    }
    currentRank += rankStep;
    currentFile += fileStep;
  }
  
  return true;
};
export function ChessBoard({ moves, expectedMove, showHint, hintText, explanationText, onUserMove, allowUserMove }: ChessBoardProps) {
  const [board, setBoard] = useState<PieceType[][]>(chessJsToBoard(new Chess()));
  const [lastMove, setLastMove] = useState<{from: [number, number], to: [number, number]} | null>(null);
  const [selected, setSelected] = useState<[number, number] | null>(null);

  useEffect(() => {
    const chess = new Chess();
    let lastMoveSquares = null;
    for (const moveObj of moves) {
      const move = chess.move(moveObj.move);
      if (move) {
        lastMoveSquares = {
          from: [8 - parseInt(move.from[1]), move.from.charCodeAt(0) - 97] as [number, number],
          to: [8 - parseInt(move.to[1]), move.to.charCodeAt(0) - 97] as [number, number],
        };
      }
    }
    setBoard(chessJsToBoard(chess));
    setLastMove(lastMoveSquares as { from: [number, number]; to: [number, number] } | null);
    setSelected(null);
  }, [moves]);

  // User move selection logic
  const handleTileClick = (row: number, col: number) => {
    if (!allowUserMove) return;
    if (!selected) {
      // Select piece if it matches the expected from
      if (expectedMove && expectedMove.from[0] === row && expectedMove.from[1] === col) {
        setSelected([row, col]);
      }
    } else {
      // If selecting the destination
      if (expectedMove && expectedMove.to[0] === row && expectedMove.to[1] === col) {
        // Call callback
        if (onUserMove) onUserMove(selected, [row, col]);
        setSelected(null);
      } else {
        // Deselect if wrong
        setSelected(null);
      }
    }
  };

  const isHighlighted = (row: number, col: number) => {
    // Highlight last move
    if (lastMove && ((lastMove.from[0] === row && lastMove.from[1] === col) || (lastMove.to[0] === row && lastMove.to[1] === col))) {
      return true;
    }
    // Highlight hint move
    if (showHint && expectedMove && ((expectedMove.from[0] === row && expectedMove.from[1] === col) || (expectedMove.to[0] === row && expectedMove.to[1] === col))) {
      return true;
    }
    // Highlight selected
    if (selected && selected[0] === row && selected[1] === col) {
      return true;
    }
    return false;
  };

  const isDark = (row: number, col: number) => (row + col) % 2 === 1;

  return (
    <div className="flex justify-center">
      <div className="relative">
        <div
          className={`grid grid-cols-8 gap-0 border-2 border-amber-700/70 rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#b58863] to-[#f0d9b5] board-3d ${lastMove && board[lastMove.to[0]][lastMove.to[1]] === null ? '' : 'board-3d-tilt'}`}
          style={{
            boxShadow: '0 12px 40px 0 rgba(30,20,10,0.30), 0 1.5px 0 #fff8',
            perspective: '900px',
            transformStyle: 'preserve-3d',
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const dark = isDark(rowIndex, colIndex);
              const highlight = isHighlighted(rowIndex, colIndex);
              // Bubble pop-up removed
              // Animate capture: if this is the destination of a capture, add a 3d/zoom effect
              const isCapture = lastMove && lastMove.to[0] === rowIndex && lastMove.to[1] === colIndex && board[rowIndex][colIndex] !== null && moves && moves.length > 0 && /x/.test(moves[moves.length-1].notation || moves[moves.length-1].move);
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-16 h-16 flex items-center justify-center text-4xl relative cursor-pointer
                    transition-all duration-300 hover:scale-105
                    ${dark
                      ? 'bg-gradient-to-br from-[#7a4c1e] to-[#4e2e0e]'
                      : 'bg-gradient-to-br from-[#f0d9b5] to-[#e6cfa7]'}
                    ${highlight
                      ? 'ring-4 ring-amber-400 ring-inset bg-yellow-100/80 shadow-amber-300/40 shadow-lg'
                      : ''}
                    ${isCapture ? 'piece-3d-capture' : ''}
                  `}
                  style={{
                    boxShadow: dark ? 'inset 0 0 8px 0 #2d1a07' : 'inset 0 0 6px 0 #fff8',
                  }}
                  onClick={() => handleTileClick(rowIndex, colIndex)}
                >
                  {/* Bubble pop-up removed */}
                  {piece && (
                    <span
                      className={`
                        drop-shadow-2xl transition-all duration-500 hover:scale-110
                        ${piece === piece.toUpperCase() ? 'text-white' : 'text-black'}
                        ${isCapture ? 'piece-3d-animate' : ''}
                        ${highlight ? 'piece-3d-move' : ''}
                      `}
                      style={{
                        textShadow: piece === piece?.toUpperCase()
                          ? '0 4px 16px #000a, 0 2px 0 #fff8'
                          : '0 4px 16px #fff8, 0 2px 0 #000a',
                        filter: highlight ? 'drop-shadow(0 0 16px #fbbf24) brightness(1.15)' : '',
                        transform: `${highlight ? 'scale(1.12) rotateX(12deg) rotateY(-8deg)' : ''} ${isCapture ? 'scale(1.18) rotateZ(-8deg)' : ''}`,
                        transition: 'all 0.5s cubic-bezier(.4,2,.6,1)',
                      }}
                    >
                      {pieceSymbols[piece]}
                    </span>
                  )}
                  {/* Coordinate labels */}
                  {colIndex === 0 && (
                    <div className="absolute left-1 top-1 text-xs font-bold text-[#4e2e0e] opacity-80">
                      {8 - rowIndex}
                    </div>
                  )}
                  {rowIndex === 7 && (
                    <div className="absolute right-1 bottom-1 text-xs font-bold text-[#4e2e0e] opacity-80">
                      {String.fromCharCode(97 + colIndex)}
                    </div>
                  )}
                </div>
              );
// CSS to add to your global stylesheet:
// .board-3d { transition: box-shadow 0.5s, transform 0.7s cubic-bezier(.4,2,.6,1); }
// .board-3d-tilt { transform: rotateX(14deg) rotateY(-8deg) scale(1.04); box-shadow: 0 24px 60px 0 #fbbf24aa, 0 1.5px 0 #fff8; }
// .piece-3d-move { filter: drop-shadow(0 0 16px #fbbf24) brightness(1.15); }
// .piece-3d-animate { animation: piece3dMove 0.6s cubic-bezier(.4,2,.6,1) 1; }
// .piece-3d-capture { animation: piece3dCapture 0.7s cubic-bezier(.4,2,.6,1) 1; }
// @keyframes piece3dMove { 0% { transform: scale(1) rotateX(0) rotateY(0); } 60% { transform: scale(1.18) rotateX(16deg) rotateY(-12deg); } 100% { transform: scale(1.12) rotateX(12deg) rotateY(-8deg); } }
// @keyframes piece3dCapture { 0% { filter: none; transform: scale(1) rotateZ(0); } 60% { filter: drop-shadow(0 0 32px #fbbf24) brightness(1.5); transform: scale(1.25) rotateZ(-16deg); } 100% { filter: none; transform: scale(1.18) rotateZ(-8deg); } }
            })
          )}
        </div>
      </div>
    </div>
  );
}

// Install the necessary packages:
// npm install three@0.150.1 @react-three/fiber@8.13.7 @react-three/drei@9.56.15 --save