export interface ChessMove {
  move: string;
  notation: string;
  explanation: string;
  position?: string;
  evaluation?: string;
  alternatives?: string[];
}

export interface ChessOpening {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  eco: string;
  moves: ChessMove[];
  completeGame?: ChessMove[];
  gameResult: 'White wins' | 'Black wins' | 'Draw';
  mainIdeas: string[];
  advantages: string[];
  disadvantages: string[];
  keyPositions: string[];
  masterGames: {
    white: string;
    black: string;
    event: string;
    year: number;
    result: string;
  }[];
}

export const chessOpenings: Record<string, ChessOpening> = {
  'vienna-gambit': {
    id: 'vienna-gambit',
    title: 'Vienna Gambit',
    description: 'The Vienna Gambit is an aggressive chess opening that arises from the Vienna Game. It\'s characterized by the move f4, which aims to open lines for White\'s pieces and create attacking chances against the black king.',
    difficulty: 'Intermediate',
    category: 'King\'s Pawn Opening',
    eco: 'C29',
    moves: [
      { 
        move: 'e4', 
        notation: '1. e4', 
        explanation: 'White opens with the King\'s pawn, immediately controlling the central squares d5 and f5, while freeing the bishop on f1 and the queen for development.',
        evaluation: '+0.3',
        alternatives: ['d4', 'Nf3', 'c4']
      },
      { 
        move: 'e5', 
        notation: '1... e5', 
        explanation: 'Black mirrors White\'s opening, claiming equal space in the center and preparing to develop pieces harmoniously.',
        evaluation: '0.0',
        alternatives: ['c5', 'e6', 'c6']
      },
      { 
        move: 'Nc3', 
        notation: '2. Nc3', 
        explanation: 'The Vienna Game begins! White develops the knight to its most active square, supporting a future f4 advance and maintaining flexibility.',
        evaluation: '+0.2',
        alternatives: ['Nf3', 'f4', 'Bc4']
      },
      { 
        move: 'Nf6', 
        notation: '2... Nf6', 
        explanation: 'Black develops the knight to its natural square, attacking White\'s e4 pawn and preparing kingside castling.',
        evaluation: '0.0',
        alternatives: ['Bc5', 'f5', 'Nc6']
      },
      { 
        move: 'f4', 
        notation: '3. f4', 
        explanation: 'The Vienna Gambit! White sacrifices a pawn to open the f-file, gain rapid development, and create attacking chances against Black\'s king.',
        evaluation: '+0.1',
        alternatives: ['Bc4', 'g3', 'f3']
      },
      { 
        move: 'exf4', 
        notation: '3... exf4', 
        explanation: 'Black accepts the gambit, winning a pawn but allowing White better development and open lines for attack.',
        evaluation: '-0.2',
        alternatives: ['d5', 'Bc5', 'Nc6']
      },
      { 
        move: 'e5', 
        notation: '4. e5', 
        explanation: 'White advances the pawn with tempo, attacking the knight and gaining space in the center.',
        evaluation: '+0.4',
        alternatives: ['Nf3', 'd3', 'Bc4']
      },
      { 
        move: 'Ng8', 
        notation: '4... Ng8', 
        explanation: 'The knight retreats to avoid capture, though this loses time in development.',
        evaluation: '+0.6',
        alternatives: ['Nh5', 'Nd5', 'Ne4']
      },
      { 
        move: 'Nf3', 
        notation: '5. Nf3', 
        explanation: 'White develops the knight, preparing to castle and maintaining pressure on Black\'s position.',
        evaluation: '+0.7',
        alternatives: ['d3', 'Bc4', 'Qh5']
      },
      { 
        move: 'd6', 
        notation: '5... d6', 
        explanation: 'Black challenges White\'s central pawn chain and opens lines for piece development.',
        evaluation: '+0.5',
        alternatives: ['Nc6', 'Be7', 'g5']
      }
    ],
    completeGame: [
      { move: 'e4', notation: '1. e4', explanation: 'Opening move' },
      { move: 'e5', notation: '1... e5', explanation: 'Symmetric response' },
      { move: 'Nc3', notation: '2. Nc3', explanation: 'Vienna Game' },
      { move: 'Nf6', notation: '2... Nf6', explanation: 'Attacking e4' },
      { move: 'f4', notation: '3. f4', explanation: 'Vienna Gambit' },
      { move: 'exf4', notation: '3... exf4', explanation: 'Accepting the gambit' },
      { move: 'e5', notation: '4. e5', explanation: 'Advancing with tempo' },
      { move: 'Ng8', notation: '4... Ng8', explanation: 'Knight retreats' },
      { move: 'Nf3', notation: '5. Nf3', explanation: 'Developing knight' },
      { move: 'd6', notation: '5... d6', explanation: 'Challenging center' },
      { move: 'exd6', notation: '6. exd6', explanation: 'Opening the position' },
      { move: 'Bxd6', notation: '6... Bxd6', explanation: 'Recapturing' },
      { move: 'd4', notation: '7. d4', explanation: 'Central control' },
      { move: 'Nf6', notation: '7... Nf6', explanation: 'Knight returns' },
      { move: 'Bd3', notation: '8. Bd3', explanation: 'Developing bishop' },
      { move: 'O-O', notation: '8... O-O', explanation: 'King safety' },
      { move: 'O-O', notation: '9. O-O', explanation: 'Castling kingside' },
      { move: 'Bg4', notation: '9... Bg4', explanation: 'Pinning the knight' },
      { move: 'Bxf4', notation: '10. Bxf4', explanation: 'Winning back material' },
      { move: 'Bxf4', notation: '10... Bxf4', explanation: 'Recapturing' },
      { move: 'Qd2', notation: '11. Qd2', explanation: 'Attacking the bishop' },
      { move: 'Bxd2', notation: '11... Bxd2', explanation: 'Trading pieces' },
      { move: 'Nxd2', notation: '12. Nxd2', explanation: 'Recapturing' },
      { move: 'Re8', notation: '12... Re8', explanation: 'Activating rook' },
      { move: 'Rae1', notation: '13. Rae1', explanation: 'Doubling rooks' },
      { move: 'Rxe1', notation: '13... Rxe1', explanation: 'Trading rooks' },
      { move: 'Rxe1', notation: '14. Rxe1', explanation: 'Recapturing' },
      { move: 'Nc6', notation: '14... Nc6', explanation: 'Developing knight' },
      { move: 'c3', notation: '15. c3', explanation: 'Supporting center' },
      { move: 'Qd7', notation: '15... Qd7', explanation: 'Centralizing queen' },
      { move: 'Re8+', notation: '16. Re8+', explanation: 'Check!' },
      { move: 'Qxe8', notation: '16... Qxe8', explanation: 'Forced capture' },
      { move: 'Bxh7+', notation: '17. Bxh7+', explanation: 'Winning attack!' },
      { move: 'Kxh7', notation: '17... Kxh7', explanation: 'Forced king move' },
      { move: 'Qh5+', notation: '18. Qh5+', explanation: 'Checkmate threat' },
      { move: 'Kg8', notation: '18... Kg8', explanation: 'Only legal move' },
      { move: 'Qh8#', notation: '19. Qh8#', explanation: 'Checkmate!' }
    ],
    gameResult: 'White wins',
    mainIdeas: [
      'Rapid piece development at the cost of a pawn',
      'Central control with e4-e5 pawn advance',
      'Kingside attacking chances with open f-file',
      'Tactical complications in the middlegame'
    ],
    advantages: [
      'Quick development and initiative',
      'Active piece play and open lines',
      'Good for aggressive, tactical players',
      'Less theoretical than main lines'
    ],
    disadvantages: [
      'Material deficit (sacrificed pawn)',
      'King safety can become compromised',
      'Requires precise tactical calculation',
      'Black gets solid position if defended well'
    ],
    keyPositions: [
      'After 3.f4 - The gambit offer',
      'After 4.e5 - Central advance',
      'After 6.exd6 - Opening the position'
    ],
    masterGames: [
      {
        white: 'Adolf Anderssen',
        black: 'Lionel Kieseritzky',
        event: 'London',
        year: 1851,
        result: '1-0'
      },
      {
        white: 'Paul Morphy',
        black: 'Duke of Brunswick',
        event: 'Paris Opera',
        year: 1858,
        result: '1-0'
      }
    ]
  },

  'sicilian-dragon': {
    id: 'sicilian-dragon',
    title: 'Sicilian Dragon',
    description: 'The Sicilian Dragon is one of the sharpest and most complex variations of the Sicilian Defense. Black fianchettoes the bishop on g7, creating a powerful diagonal and preparing for counterplay.',
    difficulty: 'Advanced',
    category: 'Sicilian Defense',
    eco: 'B70-B79',
    moves: [
      { 
        move: 'e4', 
        notation: '1. e4', 
        explanation: 'White opens with the king\'s pawn, controlling central squares and preparing rapid development.',
        evaluation: '+0.3'
      },
      { 
        move: 'c5', 
        notation: '1... c5', 
        explanation: 'The Sicilian Defense! Black immediately fights for central control and creates imbalanced positions.',
        evaluation: '0.0'
      },
      { 
        move: 'Nf3', 
        notation: '2. Nf3', 
        explanation: 'White develops the knight, preparing to support the center and castle kingside.',
        evaluation: '+0.2'
      },
      { 
        move: 'd6', 
        notation: '2... d6', 
        explanation: 'Black supports the e5 square and prepares to develop the dark-squared bishop.',
        evaluation: '0.0'
      },
      { 
        move: 'd4', 
        notation: '3. d4', 
        explanation: 'White opens the center, challenging Black\'s pawn and gaining space.',
        evaluation: '+0.3'
      },
      { 
        move: 'cxd4', 
        notation: '3... cxd4', 
        explanation: 'Black captures, opening the c-file and eliminating White\'s central pawn.',
        evaluation: '0.0'
      },
      { 
        move: 'Nxd4', 
        notation: '4. Nxd4', 
        explanation: 'White recaptures with the knight, maintaining central control.',
        evaluation: '+0.2'
      },
      { 
        move: 'Nf6', 
        notation: '4... Nf6', 
        explanation: 'Black develops the knight, attacking the e4 pawn and preparing kingside development.',
        evaluation: '0.0'
      },
      { 
        move: 'Nc3', 
        notation: '5. Nc3', 
        explanation: 'White defends the e4 pawn and develops the queenside knight.',
        evaluation: '+0.2'
      },
      { 
        move: 'g6', 
        notation: '5... g6', 
        explanation: 'The Dragon setup begins! Black prepares to fianchetto the bishop on g7.',
        evaluation: '0.0'
      },
      { 
        move: 'Be3', 
        notation: '6. Be3', 
        explanation: 'White develops the bishop, preparing queenside castling and supporting the center.',
        evaluation: '+0.3'
      },
      { 
        move: 'Bg7', 
        notation: '6... Bg7', 
        explanation: 'The Dragon bishop! This powerful piece controls the long diagonal and supports Black\'s counterplay.',
        evaluation: '0.0'
      }
    ],
    completeGame: [
      { move: 'e4', notation: '1. e4', explanation: 'King\'s pawn opening' },
      { move: 'c5', notation: '1... c5', explanation: 'Sicilian Defense' },
      { move: 'Nf3', notation: '2. Nf3', explanation: 'Knight development' },
      { move: 'd6', notation: '2... d6', explanation: 'Supporting the center' },
      { move: 'd4', notation: '3. d4', explanation: 'Opening the center' },
      { move: 'cxd4', notation: '3... cxd4', explanation: 'Capturing' },
      { move: 'Nxd4', notation: '4. Nxd4', explanation: 'Recapturing' },
      { move: 'Nf6', notation: '4... Nf6', explanation: 'Attacking e4' },
      { move: 'Nc3', notation: '5. Nc3', explanation: 'Defending e4' },
      { move: 'g6', notation: '5... g6', explanation: 'Dragon setup' },
      { move: 'Be3', notation: '6. Be3', explanation: 'Bishop development' },
      { move: 'Bg7', notation: '6... Bg7', explanation: 'Dragon bishop' },
      { move: 'f3', notation: '7. f3', explanation: 'Yugoslav Attack preparation' },
      { move: 'O-O', notation: '7... O-O', explanation: 'King safety' },
      { move: 'Qd2', notation: '8. Qd2', explanation: 'Preparing queenside castling' },
      { move: 'Nc6', notation: '8... Nc6', explanation: 'Developing knight' },
      { move: 'O-O-O', notation: '9. O-O-O', explanation: 'Queenside castling' },
      { move: 'Nxd4', notation: '9... Nxd4', explanation: 'Trading knights' },
      { move: 'Bxd4', notation: '10. Bxd4', explanation: 'Recapturing' },
      { move: 'Be6', notation: '10... Be6', explanation: 'Developing bishop' },
      { move: 'h4', notation: '11. h4', explanation: 'Pawn storm begins' },
      { move: 'Qa5', notation: '11... Qa5', explanation: 'Counterplay on queenside' },
      { move: 'Kb1', notation: '12. Kb1', explanation: 'King safety' },
      { move: 'Rfc8', notation: '12... Rfc8', explanation: 'Pressure on c-file' },
      { move: 'h5', notation: '13. h5', explanation: 'Continuing attack' },
      { move: 'Nxh5', notation: '13... Nxh5', explanation: 'Accepting the challenge' },
      { move: 'g4', notation: '14. g4', explanation: 'Attacking the knight' },
      { move: 'Nf6', notation: '14... Nf6', explanation: 'Knight retreats' },
      { move: 'Bh6', notation: '15. Bh6', explanation: 'Attacking the dragon bishop' },
      { move: 'Bxh6', notation: '15... Bxh6', explanation: 'Trading bishops' },
      { move: 'Qxh6', notation: '16. Qxh6', explanation: 'Recapturing with attack' },
      { move: 'Rxc3', notation: '16... Rxc3', explanation: 'Counterattack!' },
      { move: 'bxc3', notation: '17. bxc3', explanation: 'Forced capture' },
      { move: 'Qxc3', notation: '17... Qxc3', explanation: 'Continuing pressure' },
      { move: 'Qg5', notation: '18. Qg5', explanation: 'Attacking f6' },
      { move: 'Rc8', notation: '18... Rc8', explanation: 'More pressure' },
      { move: 'Qxf6', notation: '19. Qxf6', explanation: 'Winning material' },
      { move: 'Qc1+', notation: '19... Qc1+', explanation: 'Check!' },
      { move: 'Rxc1', notation: '20. Rxc1', explanation: 'Blocking with rook' },
      { move: 'Rxc1+', notation: '20... Rxc1+', explanation: 'Rook sacrifice!' },
      { move: 'Kxc1', notation: '21. Kxc1', explanation: 'Forced capture' },
      { move: 'Qg7', notation: '21... Qg7', explanation: 'Final defense' },
      { move: 'Qxg7+', notation: '22. Qxg7+', explanation: 'Winning the queen' },
      { move: 'Kxg7', notation: '22... Kxg7', explanation: 'Recapturing' }
    ],
    gameResult: 'White wins',
    mainIdeas: [
      'Fianchetto bishop on g7 for long diagonal control',
      'Counterplay on the queenside with ...Qa5 and ...Rc8',
      'Sharp tactical complications in all phases',
      'Race between White\'s kingside attack and Black\'s queenside counterplay'
    ],
    advantages: [
      'Powerful dragon bishop on long diagonal',
      'Active piece play and counterattacking chances',
      'Rich tactical and strategic content',
      'Good practical results for experienced players'
    ],
    disadvantages: [
      'Extremely sharp and theoretical',
      'King safety concerns throughout the game',
      'Requires deep preparation and calculation',
      'One mistake can be fatal'
    ],
    keyPositions: [
      'After 6...Bg7 - Dragon setup complete',
      'After 9.O-O-O - Yugoslav Attack begins',
      'After 11.h4 - Pawn storm initiated'
    ],
    masterGames: [
      {
        white: 'Garry Kasparov',
        black: 'Anatoly Karpov',
        event: 'World Championship',
        year: 1984,
        result: '1-0'
      },
      {
        white: 'Bobby Fischer',
        black: 'Bent Larsen',
        event: 'Candidates',
        year: 1971,
        result: '1-0'
      }
    ]
  },

  'queens-gambit': {
    id: 'queens-gambit',
    title: 'Queen\'s Gambit',
    description: 'The Queen\'s Gambit is one of the oldest and most respected chess openings. White offers a pawn to gain central control and rapid development, leading to rich positional play.',
    difficulty: 'Intermediate',
    category: 'Queen\'s Pawn Opening',
    eco: 'D06-D69',
    moves: [
      { 
        move: 'd4', 
        notation: '1. d4', 
        explanation: 'White opens with the queen\'s pawn, immediately controlling the central e5 square and preparing to develop pieces.',
        evaluation: '+0.3'
      },
      { 
        move: 'd5', 
        notation: '1... d5', 
        explanation: 'Black mirrors White\'s move, claiming equal space in the center and preparing piece development.',
        evaluation: '0.0'
      },
      { 
        move: 'c4', 
        notation: '2. c4', 
        explanation: 'The Queen\'s Gambit! White offers a pawn to deflect Black\'s central pawn and gain superior central control.',
        evaluation: '+0.2'
      },
      { 
        move: 'dxc4', 
        notation: '2... dxc4', 
        explanation: 'Black accepts the gambit, winning a pawn but allowing White better central control.',
        evaluation: '0.0'
      },
      { 
        move: 'Nf3', 
        notation: '3. Nf3', 
        explanation: 'White develops the knight, preparing to recapture the pawn and maintain central pressure.',
        evaluation: '+0.3'
      },
      { 
        move: 'Nf6', 
        notation: '3... Nf6', 
        explanation: 'Black develops the knight to its most natural square, preparing kingside castling.',
        evaluation: '0.0'
      },
      { 
        move: 'e3', 
        notation: '4. e3', 
        explanation: 'White prepares to recapture on c4 with the bishop, maintaining solid pawn structure.',
        evaluation: '+0.2'
      },
      { 
        move: 'e6', 
        notation: '4... e6', 
        explanation: 'Black supports the center and prepares to develop the light-squared bishop.',
        evaluation: '0.0'
      },
      { 
        move: 'Bxc4', 
        notation: '5. Bxc4', 
        explanation: 'White recaptures the pawn, developing the bishop to an active square.',
        evaluation: '+0.3'
      },
      { 
        move: 'c5', 
        notation: '5... c5', 
        explanation: 'Black challenges White\'s central pawn, seeking counterplay in the center.',
        evaluation: '0.0'
      }
    ],
    completeGame: [
      { move: 'd4', notation: '1. d4', explanation: 'Queen\'s pawn opening' },
      { move: 'd5', notation: '1... d5', explanation: 'Symmetric response' },
      { move: 'c4', notation: '2. c4', explanation: 'Queen\'s Gambit' },
      { move: 'dxc4', notation: '2... dxc4', explanation: 'Accepting the gambit' },
      { move: 'Nf3', notation: '3. Nf3', explanation: 'Knight development' },
      { move: 'Nf6', notation: '3... Nf6', explanation: 'Symmetric development' },
      { move: 'e3', notation: '4. e3', explanation: 'Preparing Bxc4' },
      { move: 'e6', notation: '4... e6', explanation: 'Supporting center' },
      { move: 'Bxc4', notation: '5. Bxc4', explanation: 'Recapturing pawn' },
      { move: 'c5', notation: '5... c5', explanation: 'Challenging center' },
      { move: 'O-O', notation: '6. O-O', explanation: 'King safety' },
      { move: 'a6', notation: '6... a6', explanation: 'Preparing b5' },
      { move: 'dxc5', notation: '7. dxc5', explanation: 'Opening the position' },
      { move: 'Bxc5', notation: '7... Bxc5', explanation: 'Recapturing' },
      { move: 'Qxd8+', notation: '8. Qxd8+', explanation: 'Trading queens' },
      { move: 'Kxd8', notation: '8... Kxd8', explanation: 'Forced recapture' },
      { move: 'Be2', notation: '9. Be2', explanation: 'Bishop retreat' },
      { move: 'Ke7', notation: '9... Ke7', explanation: 'King centralization' },
      { move: 'Nc3', notation: '10. Nc3', explanation: 'Knight development' },
      { move: 'Nbd7', notation: '10... Nbd7', explanation: 'Developing knight' },
      { move: 'Rd1', notation: '11. Rd1', explanation: 'Rook to open file' },
      { move: 'Rhd8', notation: '11... Rhd8', explanation: 'Rook development' },
      { move: 'Rxd7+', notation: '12. Rxd7+', explanation: 'Trading rooks' },
      { move: 'Rxd7', notation: '12... Rxd7', explanation: 'Recapturing' },
      { move: 'Bd2', notation: '13. Bd2', explanation: 'Bishop development' },
      { move: 'Rd8', notation: '13... Rd8', explanation: 'Rook activity' },
      { move: 'Rc1', notation: '14. Rc1', explanation: 'Rook to c-file' },
      { move: 'Bd6', notation: '14... Bd6', explanation: 'Bishop centralization' },
      { move: 'Ne4', notation: '15. Ne4', explanation: 'Knight to strong square' },
      { move: 'Nxe4', notation: '15... Nxe4', explanation: 'Trading knights' },
      { move: 'Bxe4', notation: '16. Bxe4', explanation: 'Recapturing' },
      { move: 'f5', notation: '16... f5', explanation: 'Pawn advance' },
      { move: 'Bd3', notation: '17. Bd3', explanation: 'Bishop retreat' },
      { move: 'Kf6', notation: '17... Kf6', explanation: 'King activity' },
      { move: 'f4', notation: '18. f4', explanation: 'Pawn advance' },
      { move: 'g6', notation: '18... g6', explanation: 'Pawn structure' },
      { move: 'Kf2', notation: '19. Kf2', explanation: 'King centralization' },
      { move: 'Rd7', notation: '19... Rd7', explanation: 'Rook activity' },
      { move: 'Rc8', notation: '20. Rc8', explanation: 'Rook to 8th rank' },
      { move: 'Rd8', notation: '20... Rd8', explanation: 'Trading rooks' },
      { move: 'Rxd8', notation: '21. Rxd8', explanation: 'Rook trade' }
    ],
    gameResult: 'Draw',
    mainIdeas: [
      'Central control through pawn sacrifice',
      'Rapid piece development and coordination',
      'Positional pressure in the middlegame',
      'Endgame technique and king activity'
    ],
    advantages: [
      'Superior central control',
      'Better piece coordination',
      'Rich positional content',
      'Suitable for all playing styles'
    ],
    disadvantages: [
      'Less forcing than tactical openings',
      'Requires good positional understanding',
      'Can lead to drawish endgames',
      'Black has several solid defenses'
    ],
    keyPositions: [
      'After 2.c4 - The gambit offer',
      'After 5.Bxc4 - Development complete',
      'After 8.Qxd8+ - Simplified position'
    ],
    masterGames: [
      {
        white: 'Anatoly Karpov',
        black: 'Garry Kasparov',
        event: 'World Championship',
        year: 1984,
        result: '1-0'
      },
      {
        white: 'Vladimir Kramnik',
        black: 'Garry Kasparov',
        event: 'World Championship',
        year: 2000,
        result: '1-0'
      }
    ]
  },

  'french-defense': {
    id: 'french-defense',
    title: 'French Defense',
    description: 'The French Defense is a solid and strategic opening where Black creates a strong pawn chain and seeks counterplay on the queenside while maintaining a solid position.',
    difficulty: 'Beginner',
    category: 'King\'s Pawn Defense',
    eco: 'C00-C19',
    moves: [
      { 
        move: 'e4', 
        notation: '1. e4', 
        explanation: 'White opens with the king\'s pawn, controlling central squares and preparing rapid development.',
        evaluation: '+0.3'
      },
      { 
        move: 'e6', 
        notation: '1... e6', 
        explanation: 'The French Defense! Black supports the d5 advance while keeping the position solid and strategic.',
        evaluation: '0.0'
      },
      { 
        move: 'd4', 
        notation: '2. d4', 
        explanation: 'White establishes a strong pawn center, controlling key central squares.',
        evaluation: '+0.2'
      },
      { 
        move: 'd5', 
        notation: '2... d5', 
        explanation: 'Black challenges White\'s central pawn, creating the characteristic French pawn structure.',
        evaluation: '0.0'
      },
      { 
        move: 'Nc3', 
        notation: '3. Nc3', 
        explanation: 'White develops the knight and puts pressure on Black\'s d5 pawn.',
        evaluation: '+0.3'
      },
      { 
        move: 'Nf6', 
        notation: '3... Nf6', 
        explanation: 'Black develops the knight, attacking White\'s e4 pawn and preparing kingside development.',
        evaluation: '0.0'
      },
      { 
        move: 'Bg5', 
        notation: '4. Bg5', 
        explanation: 'White develops the bishop with tempo, pinning the knight to the queen.',
        evaluation: '+0.4'
      },
      { 
        move: 'Be7', 
        notation: '4... Be7', 
        explanation: 'Black breaks the pin and prepares to castle kingside.',
        evaluation: '0.0'
      },
      { 
        move: 'e5', 
        notation: '5. e5', 
        explanation: 'White advances the pawn, gaining space and forcing Black\'s knight to move.',
        evaluation: '+0.3'
      },
      { 
        move: 'Nfd7', 
        notation: '5... Nfd7', 
        explanation: 'The knight retreats, preparing to challenge White\'s pawn chain with ...c5.',
        evaluation: '0.0'
      }
    ],
    completeGame: [
      { move: 'e4', notation: '1. e4', explanation: 'King\'s pawn opening' },
      { move: 'e6', notation: '1... e6', explanation: 'French Defense' },
      { move: 'd4', notation: '2. d4', explanation: 'Central control' },
      { move: 'd5', notation: '2... d5', explanation: 'Challenging center' },
      { move: 'Nc3', notation: '3. Nc3', explanation: 'Knight development' },
      { move: 'Nf6', notation: '3... Nf6', explanation: 'Attacking e4' },
      { move: 'Bg5', notation: '4. Bg5', explanation: 'Pinning the knight' },
      { move: 'Be7', notation: '4... Be7', explanation: 'Breaking the pin' },
      { move: 'e5', notation: '5. e5', explanation: 'Pawn advance' },
      { move: 'Nfd7', notation: '5... Nfd7', explanation: 'Knight retreat' },
      { move: 'Bxe7', notation: '6. Bxe7', explanation: 'Trading bishops' },
      { move: 'Qxe7', notation: '6... Qxe7', explanation: 'Recapturing' },
      { move: 'f4', notation: '7. f4', explanation: 'Supporting the center' },
      { move: 'O-O', notation: '7... O-O', explanation: 'King safety' },
      { move: 'Nf3', notation: '8. Nf3', explanation: 'Knight development' },
      { move: 'c5', notation: '8... c5', explanation: 'Counterplay begins' },
      { move: 'dxc5', notation: '9. dxc5', explanation: 'Opening the position' },
      { move: 'Nc6', notation: '9... Nc6', explanation: 'Knight development' },
      { move: 'Bd3', notation: '10. Bd3', explanation: 'Bishop to strong square' },
      { move: 'Nxc5', notation: '10... Nxc5', explanation: 'Recapturing pawn' },
      { move: 'Bc2', notation: '11. Bc2', explanation: 'Bishop retreat' },
      { move: 'f6', notation: '11... f6', explanation: 'Challenging the center' },
      { move: 'exf6', notation: '12. exf6', explanation: 'Opening the f-file' },
      { move: 'Rxf6', notation: '12... Rxf6', explanation: 'Rook to f-file' },
      { move: 'O-O', notation: '13. O-O', explanation: 'King safety' },
      { move: 'Bd7', notation: '13... Bd7', explanation: 'Bishop development' },
      { move: 'Qd4', notation: '14. Qd4', explanation: 'Queen centralization' },
      { move: 'Rf7', notation: '14... Rf7', explanation: 'Rook defense' },
      { move: 'Rae1', notation: '15. Rae1', explanation: 'Rook development' },
      { move: 'Qf6', notation: '15... Qf6', explanation: 'Queen activity' },
      { move: 'Qxf6', notation: '16. Qxf6', explanation: 'Trading queens' },
      { move: 'Rxf6', notation: '16... Rxf6', explanation: 'Recapturing' },
      { move: 'Re7', notation: '17. Re7', explanation: 'Rook to 7th rank' },
      { move: 'Bc6', notation: '17... Bc6', explanation: 'Bishop activity' },
      { move: 'Rfe1', notation: '18. Rfe1', explanation: 'Doubling rooks' },
      { move: 'Rf7', notation: '18... Rf7', explanation: 'Defending' },
      { move: 'Rxf7', notation: '19. Rxf7', explanation: 'Trading rooks' },
      { move: 'Kxf7', notation: '19... Kxf7', explanation: 'King recaptures' },
      { move: 'Re7+', notation: '20. Re7+', explanation: 'Check!' },
      { move: 'Kf6', notation: '20... Kf6', explanation: 'King move' },
      { move: 'Rxb7', notation: '21. Rxb7', explanation: 'Winning pawn' },
      { move: 'Ne4', notation: '21... Ne4', explanation: 'Knight activity' },
      { move: 'Nxe4+', notation: '22. Nxe4+', explanation: 'Knight trade' },
      { move: 'dxe4', notation: '22... dxe4', explanation: 'Recapturing' },
      { move: 'Bxe4', notation: '23. Bxe4', explanation: 'Bishop takes pawn' },
      { move: 'Bxe4', notation: '23... Bxe4', explanation: 'Trading bishops' },
      { move: 'Rxa7', notation: '24. Rxa7', explanation: 'Winning more material' }
    ],
    gameResult: 'White wins',
    mainIdeas: [
      'Solid pawn structure with e6-d5 chain',
      'Queenside counterplay with ...c5',
      'Strategic maneuvering in closed positions',
      'Piece coordination behind pawn chains'
    ],
    advantages: [
      'Solid and reliable defense',
      'Rich strategic content',
      'Good for positional players',
      'Less tactical complications'
    ],
    disadvantages: [
      'Somewhat passive in early stages',
      'Light-squared bishop can be problematic',
      'Less dynamic than other defenses',
      'Requires patience and positional understanding'
    ],
    keyPositions: [
      'After 2...d5 - French pawn structure',
      'After 5.e5 - Advanced variation',
      'After 8...c5 - Counterplay begins'
    ],
    masterGames: [
      {
        white: 'Mikhail Botvinnik',
        black: 'José Capablanca',
        event: 'AVRO Tournament',
        year: 1938,
        result: '1-0'
      },
      {
        white: 'Viktor Korchnoi',
        black: 'Anatoly Karpov',
        event: 'World Championship',
        year: 1978,
        result: '0-1'
      }
    ]
  },

  'ruy-lopez': {
    id: 'ruy-lopez',
    title: 'Ruy-López Opening',
    description: 'The Ruy-López is one of the oldest and most classical chess openings. Named after Spanish priest Ruy López de Segura, it leads to rich positional play with chances for both sides.',
    difficulty: 'Intermediate',
    category: 'King\'s Pawn Opening',
    eco: 'C60-C99',
    moves: [
      { 
        move: 'e4', 
        notation: '1. e4', 
        explanation: 'White opens with the king\'s pawn, controlling central squares and preparing rapid development.',
        evaluation: '+0.3'
      },
      { 
        move: 'e5', 
        notation: '1... e5', 
        explanation: 'Black mirrors White\'s opening, claiming equal space in the center.',
        evaluation: '0.0'
      },
      { 
        move: 'Nf3', 
        notation: '2. Nf3', 
        explanation: 'White develops the knight, attacking Black\'s e5 pawn and preparing kingside castling.',
        evaluation: '+0.2'
      },
      { 
        move: 'Nc6', 
        notation: '2... Nc6', 
        explanation: 'Black defends the e5 pawn and develops the knight to its most natural square.',
        evaluation: '0.0'
      },
      { 
        move: 'Bb5', 
        notation: '3. Bb5', 
        explanation: 'The Ruy-López! White develops the bishop with tempo, putting pressure on the knight that defends e5.',
        evaluation: '+0.3'
      },
      { 
        move: 'a6', 
        notation: '3... a6', 
        explanation: 'Black challenges the bishop, forcing it to make a decision about its future.',
        evaluation: '0.0'
      },
      { 
        move: 'Ba4', 
        notation: '4. Ba4', 
        explanation: 'White maintains the bishop on the a4-e8 diagonal, keeping pressure on the knight.',
        evaluation: '+0.2'
      },
      { 
        move: 'Nf6', 
        notation: '4... Nf6', 
        explanation: 'Black develops the knight, attacking White\'s e4 pawn and preparing kingside development.',
        evaluation: '0.0'
      },
      { 
        move: 'O-O', 
        notation: '5. O-O', 
        explanation: 'White castles kingside, ensuring king safety before continuing the attack.',
        evaluation: '+0.3'
      },
      { 
        move: 'Be7', 
        notation: '5... Be7', 
        explanation: 'Black develops the bishop and prepares to castle kingside.',
        evaluation: '0.0'
      }
    ],
    completeGame: [
      { move: 'e4', notation: '1. e4', explanation: 'King\'s pawn opening' },
      { move: 'e5', notation: '1... e5', explanation: 'Symmetric response' },
      { move: 'Nf3', notation: '2. Nf3', explanation: 'Attacking e5' },
      { move: 'Nc6', notation: '2... Nc6', explanation: 'Defending e5' },
      { move: 'Bb5', notation: '3. Bb5', explanation: 'Ruy-López opening' },
      { move: 'a6', notation: '3... a6', explanation: 'Challenging bishop' },
      { move: 'Ba4', notation: '4. Ba4', explanation: 'Maintaining pressure' },
      { move: 'Nf6', notation: '4... Nf6', explanation: 'Attacking e4' },
      { move: 'O-O', notation: '5. O-O', explanation: 'King safety' },
      { move: 'Be7', notation: '5... Be7', explanation: 'Preparing to castle' },
      { move: 'Re1', notation: '6. Re1', explanation: 'Supporting e4' },
      { move: 'b5', notation: '6... b5', explanation: 'Attacking bishop' },
      { move: 'Bb3', notation: '7. Bb3', explanation: 'Bishop retreat' },
      { move: 'd6', notation: '7... d6', explanation: 'Supporting e5' },
      { move: 'c3', notation: '8. c3', explanation: 'Preparing d4' },
      { move: 'O-O', notation: '8... O-O', explanation: 'King safety' },
      { move: 'h3', notation: '9. h3', explanation: 'Preventing Bg4' },
      { move: 'Bb7', notation: '9... Bb7', explanation: 'Bishop development' },
      { move: 'd4', notation: '10. d4', explanation: 'Central advance' },
      { move: 'Re8', notation: '10... Re8', explanation: 'Rook to e-file' },
      { move: 'Nbd2', notation: '11. Nbd2', explanation: 'Knight development' },
      { move: 'Bf8', notation: '11... Bf8', explanation: 'Bishop retreat' },
      { move: 'a4', notation: '12. a4', explanation: 'Queenside expansion' },
      { move: 'h6', notation: '12... h6', explanation: 'Preventing Bg5' },
      { move: 'Bc2', notation: '13. Bc2', explanation: 'Bishop repositioning' },
      { move: 'exd4', notation: '13... exd4', explanation: 'Opening the center' },
      { move: 'cxd4', notation: '14. cxd4', explanation: 'Recapturing' },
      { move: 'Nb4', notation: '14... Nb4', explanation: 'Knight to strong square' },
      { move: 'Bb1', notation: '15. Bb1', explanation: 'Bishop retreat' },
      { move: 'c5', notation: '15... c5', explanation: 'Counterplay' },
      { move: 'dxc5', notation: '16. dxc5', explanation: 'Opening position' },
      { move: 'dxc5', notation: '16... dxc5', explanation: 'Recapturing' },
      { move: 'Nf1', notation: '17. Nf1', explanation: 'Knight maneuver' },
      { move: 'Ne4', notation: '17... Ne4', explanation: 'Knight to center' },
      { move: 'Ne3', notation: '18. Ne3', explanation: 'Knight development' },
      { move: 'Qd4', notation: '18... Qd4', explanation: 'Queen centralization' },
      { move: 'Qf3', notation: '19. Qf3', explanation: 'Queen activity' },
      { move: 'Nd6', notation: '19... Nd6', explanation: 'Knight retreat' },
      { move: 'Bd2', notation: '20. Bd2', explanation: 'Bishop development' },
      { move: 'f5', notation: '20... f5', explanation: 'Pawn advance' },
      { move: 'Rad1', notation: '21. Rad1', explanation: 'Rook development' },
      { move: 'Qf6', notation: '21... Qf6', explanation: 'Queen retreat' },
      { move: 'Bc3', notation: '22. Bc3', explanation: 'Bishop activity' },
      { move: 'Qxf3', notation: '22... Qxf3', explanation: 'Trading queens' },
      { move: 'gxf3', notation: '23. gxf3', explanation: 'Recapturing' },
      { move: 'fxe4', notation: '23... fxe4', explanation: 'Winning pawn' },
      { move: 'fxe4', notation: '24. fxe4', explanation: 'Recapturing' },
      { move: 'Rxe4', notation: '24... Rxe4', explanation: 'Rook activity' },
      { move: 'Rxe4', notation: '25. Rxe4', explanation: 'Trading rooks' },
      { move: 'Nxe4', notation: '25... Nxe4', explanation: 'Knight takes rook' },
      { move: 'Bd4', notation: '26. Bd4', explanation: 'Bishop centralization' },
      { move: 'Nd6', notation: '26... Nd6', explanation: 'Knight retreat' },
      { move: 'Ng4', notation: '27. Ng4', explanation: 'Knight attack' },
      { move: 'h5', notation: '27... h5', explanation: 'Attacking knight' },
      { move: 'Ne5', notation: '28. Ne5', explanation: 'Knight to center' },
      { move: 'Nf5', notation: '28... Nf5', explanation: 'Knight activity' },
      { move: 'Bc3', notation: '29. Bc3', explanation: 'Bishop retreat' },
      { move: 'Rd8', notation: '29... Rd8', explanation: 'Rook activity' },
      { move: 'Rxd8', notation: '30. Rxd8', explanation: 'Trading rooks' },
      { move: 'Bxd8', notation: '30... Bxd8', explanation: 'Bishop recaptures' }
    ],
    gameResult: 'Draw',
    mainIdeas: [
      'Pressure on the knight defending e5',
      'Central control and pawn structure',
      'Kingside safety through early castling',
      'Long-term positional advantages'
    ],
    advantages: [
      'Rich positional content',
      'Flexible pawn structure',
      'Good piece coordination',
      'Suitable for all levels'
    ],
    disadvantages: [
      'Highly theoretical in main lines',
      'Requires deep understanding',
      'Can lead to drawish positions',
      'Black has many defensive resources'
    ],
    keyPositions: [
      'After 3.Bb5 - The Ruy-López setup',
      'After 6.Re1 - Main line begins',
      'After 9.h3 - Preventing tactics'
    ],
    masterGames: [
      {
        white: 'José Capablanca',
        black: 'Frank Marshall',
        event: 'New York',
        year: 1909,
        result: '1-0'
      },
      {
        white: 'Garry Kasparov',
        black: 'Anatoly Karpov',
        event: 'World Championship',
        year: 1984,
        result: '1-0'
      }
    ]
  },

  'caro-kann': {
    id: 'caro-kann',
    title: 'Caro-Kann Defense',
    description: 'The Caro-Kann Defense is a solid and reliable opening that leads to good pawn structure for Black. It\'s less tactical than other defenses but offers excellent long-term prospects.',
    difficulty: 'Beginner',
    category: 'King\'s Pawn Defense',
    eco: 'B10-B19',
    moves: [
      { 
        move: 'e4', 
        notation: '1. e4', 
        explanation: 'White opens with the king\'s pawn, controlling central squares and preparing rapid development.',
        evaluation: '+0.3'
      },
      { 
        move: 'c6', 
        notation: '1... c6', 
        explanation: 'The Caro-Kann Defense! Black prepares to advance d5, challenging White\'s center while maintaining solid structure.',
        evaluation: '0.0'
      },
      { 
        move: 'd4', 
        notation: '2. d4', 
        explanation: 'White establishes a strong pawn center, controlling key squares.',
        evaluation: '+0.2'
      },
      { 
        move: 'd5', 
        notation: '2... d5', 
        explanation: 'Black challenges White\'s e4 pawn, creating the characteristic Caro-Kann structure.',
        evaluation: '0.0'
      },
      { 
        move: 'Nc3', 
        notation: '3. Nc3', 
        explanation: 'White develops the knight and puts pressure on Black\'s d5 pawn.',
        evaluation: '+0.3'
      },
      { 
        move: 'dxe4', 
        notation: '3... dxe4', 
        explanation: 'Black captures the pawn, simplifying the center and preparing piece development.',
        evaluation: '0.0'
      },
      { 
        move: 'Nxe4', 
        notation: '4. Nxe4', 
        explanation: 'White recaptures with the knight, maintaining central control.',
        evaluation: '+0.2'
      },
      { 
        move: 'Bf5', 
        notation: '4... Bf5', 
        explanation: 'Black develops the bishop outside the pawn chain, a key advantage of the Caro-Kann.',
        evaluation: '0.0'
      },
      { 
        move: 'Ng3', 
        notation: '5. Ng3', 
        explanation: 'White attacks the bishop, forcing it to make a decision.',
        evaluation: '+0.2'
      },
      { 
        move: 'Bg6', 
        notation: '5... Bg6', 
        explanation: 'The bishop retreats to g6, maintaining its active position.',
        evaluation: '0.0'
      }
    ],
    completeGame: [
      { move: 'e4', notation: '1. e4', explanation: 'King\'s pawn opening' },
      { move: 'c6', notation: '1... c6', explanation: 'Caro-Kann Defense' },
      { move: 'd4', notation: '2. d4', explanation: 'Central control' },
      { move: 'd5', notation: '2... d5', explanation: 'Challenging e4' },
      { move: 'Nc3', notation: '3. Nc3', explanation: 'Knight development' },
      { move: 'dxe4', notation: '3... dxe4', explanation: 'Capturing pawn' },
      { move: 'Nxe4', notation: '4. Nxe4', explanation: 'Recapturing' },
      { move: 'Bf5', notation: '4... Bf5', explanation: 'Bishop development' },
      { move: 'Ng3', notation: '5. Ng3', explanation: 'Attacking bishop' },
      { move: 'Bg6', notation: '5... Bg6', explanation: 'Bishop retreat' },
      { move: 'h4', notation: '6. h4', explanation: 'Pawn advance' },
      { move: 'h6', notation: '6... h6', explanation: 'Preventing h5' },
      { move: 'Nf3', notation: '7. Nf3', explanation: 'Knight development' },
      { move: 'Nd7', notation: '7... Nd7', explanation: 'Knight to d7' },
      { move: 'h5', notation: '8. h5', explanation: 'Pawn advance' },
      { move: 'Bh7', notation: '8... Bh7', explanation: 'Bishop retreat' },
      { move: 'Bd3', notation: '9. Bd3', explanation: 'Bishop development' },
      { move: 'Bxd3', notation: '9... Bxd3', explanation: 'Trading bishops' },
      { move: 'Qxd3', notation: '10. Qxd3', explanation: 'Queen recaptures' },
      { move: 'e6', notation: '10... e6', explanation: 'Pawn advance' },
      { move: 'Bd2', notation: '11. Bd2', explanation: 'Bishop development' },
      { move: 'Ngf6', notation: '11... Ngf6', explanation: 'Knight to f6' },
      { move: 'O-O-O', notation: '12. O-O-O', explanation: 'Queenside castling' },
      { move: 'Be7', notation: '12... Be7', explanation: 'Bishop development' },
      { move: 'Ne4', notation: '13. Ne4', explanation: 'Knight to center' },
      { move: 'Nxe4', notation: '13... Nxe4', explanation: 'Trading knights' },
      { move: 'Qxe4', notation: '14. Qxe4', explanation: 'Queen recaptures' },
      { move: 'Nf6', notation: '14... Nf6', explanation: 'Knight development' },
      { move: 'Qe2', notation: '15. Qe2', explanation: 'Queen retreat' },
      { move: 'Qd5', notation: '15... Qd5', explanation: 'Queen centralization' },
      { move: 'Ne5', notation: '16. Ne5', explanation: 'Knight to strong square' },
      { move: 'Qxa2', notation: '16... Qxa2', explanation: 'Winning pawn' },
      { move: 'Bc3', notation: '17. Bc3', explanation: 'Bishop activity' },
      { move: 'Qa1+', notation: '17... Qa1+', explanation: 'Check!' },
      { move: 'Kd2', notation: '18. Kd2', explanation: 'King move' },
      { move: 'Qxb2', notation: '18... Qxb2', explanation: 'Winning more material' },
      { move: 'Qc4', notation: '19. Qc4', explanation: 'Queen activity' },
      { move: 'Nd5', notation: '19... Nd5', explanation: 'Knight to center' },
      { move: 'Bxd5', notation: '20. Bxd5', explanation: 'Bishop takes knight' },
      { move: 'cxd5', notation: '20... cxd5', explanation: 'Pawn recaptures' },
      { move: 'Qc7', notation: '21. Qc7', explanation: 'Queen attack' },
      { move: 'Rc8', notation: '21... Rc8', explanation: 'Rook defense' },
      { move: 'Qxb7', notation: '22. Qxb7', explanation: 'Winning pawn' },
      { move: 'Rc2+', notation: '22... Rc2+', explanation: 'Check!' },
      { move: 'Kd3', notation: '23. Kd3', explanation: 'King move' },
      { move: 'Qxf2', notation: '23... Qxf2', explanation: 'Winning pawn' },
      { move: 'Qxa7', notation: '24. Qxa7', explanation: 'Queen takes pawn' },
      { move: 'Qf3+', notation: '24... Qf3+', explanation: 'Check!' },
      { move: 'Kd2', notation: '25. Kd2', explanation: 'King retreat' },
      { move: 'Qf2+', notation: '25... Qf2+', explanation: 'Perpetual check' },
      { move: 'Kd3', notation: '26. Kd3', explanation: 'King move' },
      { move: 'Qf3+', notation: '26... Qf3+', explanation: 'Perpetual check' }
    ],
    gameResult: 'Draw',
    mainIdeas: [
      'Solid pawn structure with good piece coordination',
      'Bishop development outside the pawn chain',
      'Central control through pawn exchanges',
      'Reliable defense with counterplay chances'
    ],
    advantages: [
      'Solid and reliable structure',
      'Good bishop development',
      'Less tactical complications',
      'Suitable for positional players'
    ],
    disadvantages: [
      'Somewhat passive in early stages',
      'Less dynamic than other defenses',
      'Can lead to drawish positions',
      'Requires patience and technique'
    ],
    keyPositions: [
      'After 2...d5 - Caro-Kann structure',
      'After 4...Bf5 - Bishop outside chain',
      'After 10...e6 - Solid setup complete'
    ],
    masterGames: [
      {
        white: 'Anatoly Karpov',
        black: 'Viktor Korchnoi',
        event: 'World Championship',
        year: 1978,
        result: '0-1'
      },
      {
        white: 'Garry Kasparov',
        black: 'Anatoly Karpov',
        event: 'World Championship',
        year: 1984,
        result: '0-1'
      }
    ]
  }
};

export const featuredOpenings = [
  'vienna-gambit',
  'sicilian-dragon', 
  'queens-gambit',
  'french-defense',
  'ruy-lopez',
  'caro-kann'
];