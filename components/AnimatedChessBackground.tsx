// Floating 3D chess piece background, reusable for all pages
"use client";
import React, { useEffect, useRef, useState } from "react";

export default function AnimatedChessBackground() {
  const [inView, setInView] = useState(true);
  const bgRef = useRef<HTMLDivElement>(null);

  // SVGs for 3D-looking chess pieces (simple, stylized)
  const Pawn = (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="absolute animate-pawn3d" style={{left: '10%', top: '60%'}}><ellipse cx="20" cy="32" rx="10" ry="5" fill="#fff" opacity="0.15"/><circle cx="20" cy="18" r="7" fill="#fff" opacity="0.18"/><rect x="16" y="25" width="8" height="8" rx="4" fill="#fff" opacity="0.13"/></svg>
  );
  const Bishop = (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className={`piece-hero animate-bishop3d transition-transform duration-700 ${inView ? 'bishop-in' : 'bishop-out'}`} style={{top: '20%', left: '-60px'}}><ellipse cx="22" cy="36" rx="12" ry="6" fill="#fff" opacity="0.13"/><ellipse cx="22" cy="22" rx="7" ry="13" fill="#fff" opacity="0.16"/><rect x="18" y="30" width="8" height="10" rx="4" fill="#fff" opacity="0.10"/></svg>
  );
  const Knight = (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={`piece-hero animate-knight3d transition-transform duration-700 ${inView ? 'knight-in' : 'knight-out'}`} style={{top: '65%', right: '-70px'}}><ellipse cx="24" cy="40" rx="13" ry="7" fill="#fff" opacity="0.13"/><path d="M24 36 Q28 28 20 18 Q30 20 32 10 Q38 18 28 32 Z" fill="#fff" opacity="0.18"/></svg>
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const rect = bgRef.current.getBoundingClientRect();
      setInView(rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.2);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={bgRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-full w-full z-0 flex items-center justify-center cinematic-bg-fade"
      style={{
        opacity: 1,
        filter: 'blur(2.5px) brightness(1.2)',
        background: 'none',
        pointerEvents: 'none',
        transition: 'opacity 1.5s cubic-bezier(.4,2,.6,1)',
      }}
    >
      <div
        style={{
          perspective: '1800px',
          width: 600,
          height: 600,
          maxWidth: '98vw',
          maxHeight: '98vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
        }}
      >
        <div
          className="cinematic-chessboard-anim"
          style={{
            width: 560,
            height: 560,
            borderRadius: 32,
            background: 'radial-gradient(ellipse at 60% 40%, #fffbe622 60%, #eab30811 100%)',
            boxShadow: '0 0 120px 0 #fff6, 0 0 80px 0 #eab30844',
            backdropFilter: 'blur(3.5px)',
            transform: 'rotateX(38deg) rotateZ(-24deg) scale(0.7)',
            overflow: 'hidden',
            willChange: 'transform',
            filter: 'drop-shadow(0 0 32px #eab30888) drop-shadow(0 0 80px #fffbe6cc)',
            animation: 'cinematicCameraIn 2.2s cubic-bezier(.4,2,.6,1) 0.1s both, tiltWobble 8s ease-in-out 2.2s infinite alternate',
          }}
        >
          {/* No chessboard, just background */}
        </div>
        <style>{`
          .cinematic-chessboard-anim {
            /* animation is set inline for entrance and loop */
          }
          @keyframes cinematicCameraIn {
            0% { opacity: 0; filter: blur(16px) brightness(0.7); transform: rotateX(80deg) rotateZ(-60deg) scale(0.2); }
            40% { opacity: 1; filter: blur(6px) brightness(1.1); }
            80% { filter: blur(1.5px) brightness(1.18); }
            100% { opacity: 1; filter: blur(0) brightness(1.2); transform: rotateX(38deg) rotateZ(-24deg) scale(0.7); }
          }
          @keyframes tiltWobble {
            0% { transform: rotateX(38deg) rotateZ(-24deg) scale(0.7); }
            20% { transform: rotateX(42deg) rotateZ(-20deg) scale(0.74); }
            50% { transform: rotateX(36deg) rotateZ(-28deg) scale(0.72); }
            80% { transform: rotateX(40deg) rotateZ(-18deg) scale(0.76); }
            100% { transform: rotateX(38deg) rotateZ(-24deg) scale(0.7); }
          }
        `}</style>
      </div>
      {Bishop}
      {Knight}
      <style>{`
        .piece-hero {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          filter: drop-shadow(0 0 16px #eab30888) drop-shadow(0 0 32px #fffbe6cc);
        }
        @keyframes bishopFloat3d {
          0% { transform: translateY(0) scale(1) rotateZ(0deg) rotateY(0deg); }
          30% { transform: translateY(-24px) scale(1.08) rotateZ(8deg) rotateY(10deg); }
          60% { transform: translateY(-10px) scale(1.12) rotateZ(-8deg) rotateY(-8deg); }
          100% { transform: translateY(0) scale(1) rotateZ(0deg) rotateY(0deg); }
        }
        @keyframes knightFloat3d {
          0% { transform: translateY(0) scale(1) rotateZ(0deg) rotateX(0deg); }
          40% { transform: translateY(-14px) scale(1.04) rotateZ(-10deg) rotateX(10deg); }
          80% { transform: translateY(-6px) scale(1.09) rotateZ(8deg) rotateX(-8deg); }
          100% { transform: translateY(0) scale(1) rotateZ(0deg) rotateX(0deg); }
        }
        .animate-bishop3d { animation: bishopFloat3d 8.5s ease-in-out infinite; }
        .animate-knight3d { animation: knightFloat3d 9.5s ease-in-out infinite; }
        .bishop-in { transform: translateX(80px) !important; opacity: 1 !important; }
        .bishop-out { transform: translateX(-200px) !important; opacity: 0 !important; }
        .knight-in { transform: translateX(-80px) !important; opacity: 1 !important; }
        .knight-out { transform: translateX(200px) !important; opacity: 0 !important; }
      `}</style>
    </div>
  );
}
