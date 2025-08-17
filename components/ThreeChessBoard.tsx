import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ChessPieceGLB } from './ChessPieceGLB';

// 3D piece now uses GLB model

// 3D Chessboard squares
function Square({ position, color, highlight }: { position: [number, number, number], color: string, highlight?: boolean }) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial color={highlight ? '#ffe066' : color} />
    </mesh>
  );
}

// Main 3D Chessboard
interface ThreeChessBoardProps {
  moves: Array<{ move: string; notation: string; explanation: string; why?: string }>;
  expectedMove?: { from: [number, number], to: [number, number] };
  showHint?: boolean;
  explanationText?: string;
  onUserMove?: (from: [number, number], to: [number, number]) => void;
  allowUserMove?: boolean;
}

export function ThreeChessBoard({
  moves,
  expectedMove,
  showHint,
  explanationText,
  onUserMove,
  allowUserMove
}: ThreeChessBoardProps) {
  // 8x8 board, white bottom right
  const squares = [];
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const isDark = (x + y) % 2 === 1;
      squares.push(
        <Square
          key={`sq-${x}-${y}`}
          position={[x - 3.5, y - 3.5, 0]}
          color={isDark ? '#b58863' : '#f0d9b5'}
        />
      );
    }
  }
  // TODO: Render pieces based on moves using chess.js logic (for now, just pawns as placeholder)
  const pieces = [];
  for (let x = 0; x < 8; x++) {
    pieces.push(<ChessPieceGLB key={`wp-${x}`} piece="pawn" color="white" position={[x - 3.5, 1 - 3.5, 0.6]} />);
    pieces.push(<ChessPieceGLB key={`bp-${x}`} piece="pawn" color="black" position={[x - 3.5, 6 - 3.5, 0.6]} />);
  }
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <Canvas shadows camera={{ position: [0, -10, 10], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
  <group>
  {squares}
  {pieces}
</group>
        <OrbitControls target={[0, 0, 0]} maxPolarAngle={Math.PI / 2.1} minDistance={8} maxDistance={18} />
        {/* Show explanation/hint bubble above the board if present */}
        {(showHint || explanationText) && (
          <Html position={[0, 0, 2.5]} center style={{ pointerEvents: 'none', fontWeight: 700, fontSize: 24, color: '#fbbf24', textShadow: '0 2px 8px #000a' }}>
            {showHint ? 'Try this move!' : explanationText}
          </Html>
        )}
        <color attach="background" args={["#e6cfa7"]} />
      </Canvas>
    </div>
  );
}
