// SVGs for realistic chess pieces, styled for theme
export const KingSVG = (
  <svg width="100" height="100" viewBox="0 0 45 45" fill="none">
    <g>
      <defs>
        <radialGradient id="kingBody" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fffbe6"/>
          <stop offset="100%" stopColor="#eab308"/>
        </radialGradient>
        <filter id="kingShadow" x="-10" y="60" width="65" height="20" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      <ellipse cx="22.5" cy="80" rx="18" ry="7" fill="#000" opacity=".18" filter="url(#kingShadow)"/>
      <rect x="17" y="19" width="11" height="15" rx="5.5" fill="url(#kingBody)" stroke="#eab308" strokeWidth="1.5"/>
      <ellipse cx="22.5" cy="14.5" rx="4.5" ry="4.5" fill="url(#kingBody)" stroke="#eab308" strokeWidth="1.5"/>
      <rect x="15" y="34" width="15" height="5" rx="2.5" fill="#222" />
      <ellipse cx="22.5" cy="36.5" rx="7.5" ry="3.5" fill="#eab308" fillOpacity=".7"/>
      <path d="M22.5 11V6" stroke="#eab308" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M19 8.5h7" stroke="#eab308" strokeWidth="2.2" strokeLinecap="round"/>
    </g>
  </svg>
);

export const QueenSVG = (
  <svg width="90" height="90" viewBox="0 0 45 45" fill="none">
    <g>
      <defs>
        <radialGradient id="queenBody" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fffbe6"/>
          <stop offset="100%" stopColor="#eab308"/>
        </radialGradient>
        <filter id="queenShadow" x="-10" y="60" width="65" height="20" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      <ellipse cx="22.5" cy="80" rx="18" ry="7" fill="#000" opacity=".18" filter="url(#queenShadow)"/>
      <ellipse cx="22.5" cy="20" rx="8.5" ry="5.5" fill="url(#queenBody)" stroke="#eab308" strokeWidth="1.5"/>
      <rect x="15" y="34" width="15" height="5" rx="2.5" fill="#222" />
      <ellipse cx="22.5" cy="36.5" rx="7.5" ry="3.5" fill="#eab308" fillOpacity=".7"/>
      <circle cx="13" cy="15" r="2.2" fill="#fff" stroke="#eab308" strokeWidth="1.2"/>
      <circle cx="22.5" cy="10" r="2.2" fill="#fff" stroke="#eab308" strokeWidth="1.2"/>
      <circle cx="32" cy="15" r="2.2" fill="#fff" stroke="#eab308" strokeWidth="1.2"/>
      <path d="M13 15L22.5 35L32 15" stroke="#eab308" strokeWidth="1.5"/>
    </g>
  </svg>
);

export const KnightSVG = (
  <svg width="90" height="90" viewBox="0 0 45 45" fill="none">
    <g>
      <defs>
        <radialGradient id="knightBody" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fffbe6"/>
          <stop offset="100%" stopColor="#eab308"/>
        </radialGradient>
        <filter id="knightShadow" x="-10" y="60" width="65" height="20" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      <ellipse cx="22.5" cy="80" rx="18" ry="7" fill="#000" opacity=".18" filter="url(#knightShadow)"/>
      <path d="M32 35Q38 25 25 15Q35 18 36 8Q44 18 32 35Z" fill="url(#knightBody)" stroke="#eab308" strokeWidth="1.5"/>
      <ellipse cx="32" cy="36.5" rx="7.5" ry="3.5" fill="#eab308" fillOpacity=".7"/>
      <rect x="25" y="34" width="15" height="5" rx="2.5" fill="#222" />
      <circle cx="35" cy="13" r="1.2" fill="#eab308" />
    </g>
  </svg>
);

export const PawnSVG = (
  <svg width="70" height="70" viewBox="0 0 45 45" fill="none">
    <g>
      <defs>
        <radialGradient id="pawnBody" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fffbe6"/>
          <stop offset="100%" stopColor="#eab308"/>
        </radialGradient>
        <filter id="pawnShadow" x="-10" y="60" width="65" height="20" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      <ellipse cx="22.5" cy="80" rx="18" ry="7" fill="#000" opacity=".18" filter="url(#pawnShadow)"/>
      <circle cx="22.5" cy="15" r="5" fill="url(#pawnBody)" stroke="#eab308" strokeWidth="1.5"/>
      <rect x="17" y="20" width="11" height="15" rx="5.5" fill="url(#pawnBody)" stroke="#eab308" strokeWidth="1.5"/>
      <ellipse cx="22.5" cy="36.5" rx="7.5" ry="3.5" fill="#eab308" fillOpacity=".7"/>
      <rect x="15" y="34" width="15" height="5" rx="2.5" fill="#222" />
    </g>
  </svg>
);
