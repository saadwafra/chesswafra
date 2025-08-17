"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { KingSVG, QueenSVG, KnightSVG, PawnSVG } from "./ChessPieceSVGs";



export default function ChessPreloader({ onFinish }: { onFinish?: () => void } = {}) {
  const [exiting, setExiting] = useState(false);
  // Fade out when preloader is about to end
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typeof window !== 'undefined') {
      // Listen for preloader exit (2s after mount)
      timeout = setTimeout(() => setExiting(true), 1700);
    }
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-opacity duration-700 ${exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ willChange: 'opacity' }}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-end gap-8 mb-2">
          <div style={{ width: 90, height: 90 }} className={`cinematic-queen3d`}>{QueenSVG}</div>
          <div style={{ width: 100, height: 100 }} className={`cinematic-king3d`}>{KingSVG}</div>
          <div style={{ width: 100, height: 100 }} className={`cinematic-knight3d`}>{KnightSVG}</div>
        </div>
        <div className="flex gap-4 mb-2">
          <div style={{ width: 70, height: 70 }} className={`cinematic-pawn3d`}>{PawnSVG}</div>
        </div>
        <div className="mt-10 flex gap-2 text-4xl font-extrabold tracking-widest text-amber-400"
          style={{ fontFamily: 'Figtree, Inter, sans-serif', letterSpacing: '0.18em', lineHeight: 1, width: '100vw', justifyContent: 'center' }}
        >
          {Array.from("LOADING").map((char, i) => (
            <span key={i} style={{ minWidth: '2.5rem', display: 'inline-block', filter: 'drop-shadow(0 2px 8px #eab30888)', opacity: exiting ? 0 : 1, transition: 'opacity 0.7s cubic-bezier(.4,2,.6,1)' }}>{char}</span>
          ))}
        </div>
      </div>
      <style>{`
        /* Cinematic entrance and camera movement for each piece */
        @keyframes kingCinematic {
          0% { opacity: 0; transform: translateY(80px) scale(0.7) rotateZ(-30deg) rotateX(0deg); filter: blur(6px); }
          12% { opacity: 1; filter: blur(0.5px); }
          30% { transform: translateY(-18px) scale(1.08) rotateZ(-8deg) rotateX(8deg); }
          60% { transform: translateY(-8px) scale(1.13) rotateZ(-12deg) rotateX(-6deg); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0) scale(1) rotateZ(0deg) rotateX(0deg); }
        }
        @keyframes queenCinematic {
          0% { opacity: 0; transform: translateY(-80px) scale(0.7) rotateZ(30deg) rotateY(0deg); filter: blur(6px); }
          10% { opacity: 1; filter: blur(0.5px); }
          35% { transform: translateY(-14px) scale(1.12) rotateZ(8deg) rotateY(10deg); }
          60% { transform: translateY(-8px) scale(1.18) rotateZ(-8deg) rotateY(-8deg); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0) scale(1) rotateZ(0deg) rotateY(0deg); }
        }
        @keyframes knightCinematic {
          0% { opacity: 0; transform: translateX(-120px) scale(0.7) rotateZ(-40deg) rotateX(0deg); filter: blur(6px); }
          15% { opacity: 1; filter: blur(0.5px); }
          40% { transform: translateY(-14px) scale(1.14) rotateZ(-10deg) rotateX(10deg); }
          80% { transform: translateY(-6px) scale(1.19) rotateZ(8deg) rotateX(-8deg); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0) scale(1) rotateZ(0deg) rotateX(0deg); }
        }
        @keyframes pawnCinematic {
          0% { opacity: 0; transform: translateY(120px) scale(0.7) rotateZ(0deg) rotateX(-30deg); filter: blur(6px); }
          18% { opacity: 1; filter: blur(0.5px); }
          25% { transform: translateY(-10px) scale(1.09) rotateZ(-6deg) rotateX(8deg); }
          50% { transform: translateY(-8px) scale(1.13) rotateZ(-12deg) rotateX(-6deg); }
          75% { transform: translateY(-6px) scale(1.08) rotateZ(4deg) rotateX(4deg); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0) scale(1) rotateZ(0deg) rotateX(0deg); }
        }
        .cinematic-king3d {
          animation: kingCinematic 1.7s cubic-bezier(.4,2,.6,1) 0.1s both, kingFloat3d 7s ease-in-out 1.7s infinite;
        }
        .cinematic-queen3d {
          animation: queenCinematic 1.8s cubic-bezier(.4,2,.6,1) 0.2s both, queenFloat3d 8.5s ease-in-out 1.8s infinite;
        }
        .cinematic-knight3d {
          animation: knightCinematic 1.9s cubic-bezier(.4,2,.6,1) 0.3s both, knightFloat3d 9.5s ease-in-out 1.9s infinite;
        }
        .cinematic-pawn3d {
          animation: pawnCinematic 2s cubic-bezier(.4,2,.6,1) 0.4s both, pawnFloat3d 7s ease-in-out 2s infinite;
        }
        /* The floating infinite movement reused from before */
        @keyframes kingFloat3d {
          0% { transform: translateY(0) scale(1) rotateZ(0deg); }
          30% { transform: translateY(-18px) scale(1.04) rotateZ(-6deg); }
          60% { transform: translateY(-8px) scale(1.08) rotateZ(-12deg); }
          100% { transform: translateY(0) scale(1) rotateZ(0deg); }
        }
        @keyframes queenFloat3d {
          0% { transform: translateY(0) scale(1) rotateZ(0deg); }
          25% { transform: translateY(-14px) scale(1.05) rotateZ(8deg); }
          50% { transform: translateY(-8px) scale(1.08) rotateZ(-8deg); }
          75% { transform: translateY(-10px) scale(1.03) rotateZ(4deg); }
          100% { transform: translateY(0) scale(1) rotateZ(0deg); }
        }
        @keyframes knightFloat3d {
          0% { transform: translateY(0) scale(1) rotateZ(0deg); }
          40% { transform: translateY(-14px) scale(1.04) rotateZ(-10deg); }
          80% { transform: translateY(-6px) scale(1.09) rotateZ(8deg); }
          100% { transform: translateY(0) scale(1) rotateZ(0deg); }
        }
        @keyframes pawnFloat3d {
          0% { transform: translateY(0) scale(1) rotateZ(0deg); }
          25% { transform: translateY(-10px) scale(1.05) rotateZ(-6deg); }
          50% { transform: translateY(-8px) scale(1.08) rotateZ(-12deg); }
          75% { transform: translateY(-6px) scale(1.03) rotateZ(4deg); }
          100% { transform: translateY(0) scale(1) rotateZ(0deg); }
        }
      `}</style>
    </div>
  );
}
