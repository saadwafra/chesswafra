"use client";

import React, { useState, useEffect } from 'react';

type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P' | 'k' | 'q' | 'r' | 'b' | 'n' | 'p' | null;

interface ChessBoardProps {
  moves: Array<{ move: string; notation: string; explanation: string }>; 
  expectedMove?: { from: [number, number], to: [number, number] };
  showHint?: boolean;
  hintText?: string; // legacy, for compatibility
  explanationText?: string; // always-on explanation bubble
  onUserMove?: (from: [number, number], to: [number, number]) => void;
  allowUserMove?: boolean;
}

const getInitialBoard = (): PieceType[][] => [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

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
    
    // Find the pawn that can move to this square
    const isWhiteMove = getCurrentPlayer(board) === 'white';
    const pawnSymbol = isWhiteMove ? 'P' : 'p';
    
    // Check for pawn move from one or two squares back
    if (isWhiteMove) {
      if (rank < 7 && board[rank + 1][file] === 'P') {
        return { from: [rank + 1, file], to: [rank, file], piece: 'P' };
      }
      if (rank === 4 && board[6][file] === 'P' && board[5][file] === null) {
        return { from: [6, file], to: [rank, file], piece: 'P' };
      }
    } else {
      if (rank > 0 && board[rank - 1][file] === 'p') {
        return { from: [rank - 1, file], to: [rank, file], piece: 'p' };
      }
      if (rank === 3 && board[1][file] === 'p' && board[2][file] === null) {
        return { from: [1, file], to: [rank, file], piece: 'p' };
      }
    }
  }
  
  // Handle pawn captures
  if (/^[a-h]x[a-h][1-8]$/.test(cleanMove)) {
    const fromFile = cleanMove.charCodeAt(0) - 97;
    const toFile = cleanMove.charCodeAt(2) - 97;
    const toRank = 8 - parseInt(cleanMove[3]);
    
    const isWhiteMove = getCurrentPlayer(board) === 'white';
    const pawnSymbol = isWhiteMove ? 'P' : 'p';
    const fromRank = isWhiteMove ? toRank + 1 : toRank - 1;
    
    if (board[fromRank] && board[fromRank][fromFile] === pawnSymbol) {
      const captured = board[toRank][toFile];
      return { from: [fromRank, fromFile], to: [toRank, toFile], piece: pawnSymbol, captured };
    }
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
    
    const isWhiteMove = getCurrentPlayer(board) === 'white';
  const piece = isWhiteMove ? pieceType : (pieceType ? pieceType.toLowerCase() as PieceType : null);
    
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

const getCurrentPlayer = (board: PieceType[][]): 'white' | 'black' => {
  // Simple heuristic: count moves made by looking at initial position changes
  let moveCount = 0;
  const initial = getInitialBoard();
  
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      if (board[rank][file] !== initial[rank][file]) {
        moveCount++;
      }
    }
  }
  
  return moveCount % 2 === 0 ? 'white' : 'black';
};

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
  const [board, setBoard] = useState<PieceType[][]>(getInitialBoard());
  const [lastMove, setLastMove] = useState<{from: [number, number], to: [number, number]} | null>(null);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  useEffect(() => {
    // Reset to initial position
    let currentBoard = getInitialBoard();
    let currentLastMove = null;
    // Apply each move
    for (const moveObj of moves) {
      const moveResult = parseMove(moveObj.move, currentBoard);
      if (moveResult) {
        const newBoard = currentBoard.map(row => [...row]);
        if (moveObj.move === 'O-O' || moveObj.move === '0-0') {
          if (moveResult.piece === 'K') {
            newBoard[7][4] = null; newBoard[7][6] = 'K'; newBoard[7][7] = null; newBoard[7][5] = 'R';
          } else { newBoard[0][4] = null; newBoard[0][6] = 'k'; newBoard[0][7] = null; newBoard[0][5] = 'r'; }
        } else if (moveObj.move === 'O-O-O' || moveObj.move === '0-0-0') {
          if (moveResult.piece === 'K') {
            newBoard[7][4] = null; newBoard[7][2] = 'K'; newBoard[7][0] = null; newBoard[7][3] = 'R';
          } else { newBoard[0][4] = null; newBoard[0][2] = 'k'; newBoard[0][0] = null; newBoard[0][3] = 'r'; }
        } else {
          newBoard[moveResult.from[0]][moveResult.from[1]] = null;
          newBoard[moveResult.to[0]][moveResult.to[1]] = moveResult.piece;
        }
        currentBoard = newBoard;
        currentLastMove = { from: moveResult.from, to: moveResult.to };
      }
    }
    setBoard(currentBoard);
    setLastMove(currentLastMove);
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
        <div className="grid grid-cols-8 gap-0 border-2 border-amber-700/70 rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#b58863] to-[#f0d9b5]" style={{boxShadow: '0 8px 32px 0 rgba(30,20,10,0.25)'}}>
          {board.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const dark = isDark(rowIndex, colIndex);
              const highlight = isHighlighted(rowIndex, colIndex);
              // Render explanation bubble above the destination square (always-on)
              const showExplanationBubble = explanationText && expectedMove && expectedMove.to[0] === rowIndex && expectedMove.to[1] === colIndex;
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
                      ? 'ring-2 ring-amber-400 ring-inset bg-yellow-300/60'
                      : ''}
                  `}
                  style={{
                    boxShadow: dark ? 'inset 0 0 8px 0 #2d1a07' : 'inset 0 0 6px 0 #fff8',
                  }}
                  onClick={() => handleTileClick(rowIndex, colIndex)}
                >
                  {showExplanationBubble && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 min-w-[180px] max-w-[260px] bg-gradient-to-br from-amber-100 to-yellow-50 text-amber-900 text-sm font-bold px-4 py-2 rounded-2xl shadow-2xl border-2 border-amber-400 animate-fade-in flex items-center gap-2">
                      <span className="inline-block align-middle">💡</span>
                      <span className="inline-block align-middle">{explanationText}</span>
                    </div>
                  )}
                  {piece && (
                    <span
                      className={`
                        drop-shadow-lg transition-all duration-200 hover:scale-110
                        ${piece === piece.toUpperCase() ? 'text-white' : 'text-black'}
                      `}
                      style={{
                        textShadow: piece === piece?.toUpperCase()
                          ? '0 2px 8px #000a, 0 1px 0 #fff8'
                          : '0 2px 8px #fff8, 0 1px 0 #000a',
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
            })
          )}
        </div>
      </div>
    </div>
  );
}