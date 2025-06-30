import { Match, PointsTable, LiveMatchData } from '@/types/dataType';
import { teams } from './teamsData';
export const mockPointsTable: PointsTable[] = [
  {
    team: teams[0], // CSK
    played: 10,
    won: 7,
    lost: 3,
    noResult: 0,
    points: 14,
    netRunRate: 0.456,
    position: 1,
    recent: ['W', 'W', 'L', 'W', 'W']
  },
  {
    team: teams[1], // MI
    played: 10,
    won: 6,
    lost: 4,
    noResult: 0,
    points: 12,
    netRunRate: 0.234,
    position: 2,
    recent: ['L', 'W', 'W', 'L', 'W']
  },
  {
    team: teams[2], // RCB
    played: 9,
    won: 6,
    lost: 3,
    noResult: 0,
    points: 12,
    netRunRate: 0.123,
    position: 3,
    recent: ['W', 'W', 'W', 'L', 'L']
  },
  {
    team: teams[3], // KKR
    played: 10,
    won: 5,
    lost: 5,
    noResult: 0,
    points: 10,
    netRunRate: -0.089,
    position: 4,
    recent: ['L', 'W', 'L', 'W', 'L']
  },
  {
    team: teams[4], // DC
    played: 9,
    won: 5,
    lost: 4,
    noResult: 0,
    points: 10,
    netRunRate: -0.123,
    position: 5,
    recent: ['W', 'W', 'L', 'L', 'W']
  },
  {
    team: teams[5], // PBKS
    played: 10,
    won: 4,
    lost: 6,
    noResult: 0,
    points: 8,
    netRunRate: -0.234,
    position: 6,
    recent: ['L', 'W', 'L', 'L', 'W']
  },
  {
    team: teams[6], // RR
    played: 9,
    won: 4,
    lost: 5,
    noResult: 0,
    points: 8,
    netRunRate: -0.345,
    position: 7,
    recent: ['W', 'L', 'L', 'W', 'L']
  },
  {
    team: teams[7], // SRH
    played: 10,
    won: 3,
    lost: 7,
    noResult: 0,
    points: 6,
    netRunRate: -0.456,
    position: 8,
    recent: ['L', 'L', 'W', 'L', 'L']
  },
  {
    team: teams[8], // GT
    played: 9,
    won: 3,
    lost: 6,
    noResult: 0,
    points: 6,
    netRunRate: -0.567,
    position: 9,
    recent: ['L', 'W', 'L', 'L', 'L']
  },
  {
    team: teams[9], // LSG
    played: 10,
    won: 2,
    lost: 8,
    noResult: 0,
    points: 4,
    netRunRate: -0.678,
    position: 10,
    recent: ['L', 'L', 'L', 'L', 'W']
  }
];
export const mockMatches: Match[] = [
  {
    id: '1',
    team1: teams[0], // CSK
    team2: teams[1], // MI
    date: '2025-06-30',
    time: '19:30',
    venue: 'M. A. Chidambaram Stadium, Chennai',
    status: 'live',
    score: {
      team1: { runs: 156, wickets: 4, overs: 20.0 },
      team2: { runs: 89, wickets: 2, overs: 10.0 }
    }
  },
  {
    id: '2',
    team1: teams[2], // RCB
    team2: teams[3], // KKR
    date: '2025-06-16',
    time: '15:30',
    venue: 'M. Chinnaswamy Stadium, Bangalore',
    status: 'completed',
    score: {
      team1: { runs: 185, wickets: 6, overs: 20.0 },
      team2: { runs: 178, wickets: 8, overs: 20.0 }
    },
    result: 'RCB won by 7 runs'
  },
  {
    id: '3',
    team1: teams[4], // DC
    team2: teams[5], // PBKS
    date: '2025-06-14',
    time: '19:30',
    venue: 'Arun Jaitley Stadium, Delhi',
    status: 'completed',
    score: {
      team1: { runs: 167, wickets: 7, overs: 20.0 },
      team2: { runs: 168, wickets: 5, overs: 20.0 }
    },
    result: 'DC won by 5 wickets'
  },
  {
    id: '4',
    team1: teams[6], // RR
    team2: teams[7], // SRH
    date: '2025-06-25',
    time: '19:30',
    venue: 'Sawai Mansingh Stadium, Jaipur',
    status: 'completed',
    score: {
      team1: { runs: 145, wickets: 8, overs: 20.0 },
      team2: { runs: 149, wickets: 4, overs: 18.2 }
    },
    result: 'SRH won by 6 wickets'
  },
  {
    id: '5',
    team1: teams[8], // GT
    team2: teams[9], // LSG
    date: '2025-07-05',
    time: '19:30',
    venue: 'Narendra Modi Stadium, Ahmedabad',
    status: 'upcoming'
  },
  {
    id: '6',
    team1: teams[1], // MI
    team2: teams[2], // RCB
    date: '2025-07-08',
    time: '15:30',
    venue: 'Wankhede Stadium, Mumbai',
    status: 'upcoming'
  },
  {
    id: '7',
    team1: teams[3], // KKR
    team2: teams[4], // DC
    date: '2025-07-12',
    time: '19:30',
    venue: 'Eden Gardens, Kolkata',
    status: 'upcoming'
  },
  {
    id: '8',
    team1: teams[5], // PBKS
    team2: teams[6], // RR
    date: '2025-07-15',
    time: '19:30',
    venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali',
    status: 'upcoming'
  },
  {
    id: '9',
    team1: teams[3], // KKR
    team2: teams[6], // RR
    date: '2025-07-16',
    time: '19:30',
    venue: 'Eden Garden, Kolkata',
    status: 'upcoming'
  }, 
  {
    id: '10',
    team1: teams[0], // CSK
    team2: teams[1], // MI
    date: '2025-07-17',
    time: '19:30',
    venue: 'Chepauk Stadium, Chennai',
    status: 'upcoming'
  }, 
  {
    id: '11',
    team1: teams[4], // DC
    team2: teams[5], // PBKS
    date: '2025-07-18',
    time: '19:30',
    venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali',
    status: 'upcoming'
  }, 
  {
    id: '12',
    team1: teams[2], // RCB
    team2: teams[6], // RR
    date: '2025-07-19',
    time: '19:30',
    venue: 'M. Chinnaswamy Stadium, Bangalore',
    status: 'upcoming'
  }
];

export const mockPlayerStats = {
  team1: {
    batting: [
      { name: 'MS Dhoni', runs: 45, balls: 32, fours: 4, sixes: 2, strikeRate: 140.6, status: 'not out' },
      { name: 'Ravindra Jadeja', runs: 38, balls: 28, fours: 3, sixes: 1, strikeRate: 135.7, status: 'not out' },
      { name: 'Ruturaj Gaikwad', runs: 28, balls: 22, fours: 4, sixes: 0, strikeRate: 127.3, status: 'c Bumrah b Archer' },
      { name: 'Devon Conway', runs: 15, balls: 18, fours: 1, sixes: 0, strikeRate: 83.3, status: 'lbw b Bumrah' },
      { name: 'Shivam Dube', runs: 22, balls: 16, fours: 2, sixes: 1, strikeRate: 137.5, status: 'c Rohit b Malinga' },
      { name: 'Moeen Ali', runs: 8, balls: 6, fours: 1, sixes: 0, strikeRate: 133.3, status: 'b Boult' },
    ],
    fallOfWickets: [
      { wicket: 1, runs: 28, over: 4.2, batsman: 'Devon Conway' },
      { wicket: 2, runs: 65, over: 8.4, batsman: 'Ruturaj Gaikwad' },
      { wicket: 3, runs: 89, over: 12.1, batsman: 'Moeen Ali' },
      { wicket: 4, runs: 134, over: 16.3, batsman: 'Shivam Dube' },
    ]
  },
  team2: {
    batting: [
      { name: 'Rohit Sharma', runs: 52, balls: 38, fours: 6, sixes: 2, strikeRate: 136.8, status: 'c Dhoni b Jadeja' },
      { name: 'Ishan Kishan', runs: 34, balls: 28, fours: 4, sixes: 1, strikeRate: 121.4, status: 'b Chahar' },
      { name: 'Suryakumar Yadav', runs: 28, balls: 22, fours: 3, sixes: 1, strikeRate: 127.3, status: 'run out' },
      { name: 'Hardik Pandya', runs: 18, balls: 14, fours: 2, sixes: 0, strikeRate: 128.6, status: 'not out' },
      { name: 'Tim David', runs: 6, balls: 4, fours: 1, sixes: 0, strikeRate: 150.0, status: 'c Jadeja b Chahar' },
      { name: 'Kieron Pollard', runs: 12, balls: 8, fours: 1, sixes: 1, strikeRate: 150.0, status: 'not out' },
    ],
    fallOfWickets: [
      { wicket: 1, runs: 45, over: 6.1, batsman: 'Ishan Kishan' },
      { wicket: 2, runs: 78, over: 10.3, batsman: 'Tim David' },
      { wicket: 3, runs: 112, over: 14.2, batsman: 'Suryakumar Yadav' },
      { wicket: 4, runs: 145, over: 17.4, batsman: 'Rohit Sharma' },
    ]
  }
};

export const mockBowlingStats = {
  team1: [
    { name: 'Deepak Chahar', overs: 4, maidens: 0, runs: 32, wickets: 2, economy: 8.0, dots: 10 },
    { name: 'Mustafizur Rahman', overs: 3.2, maidens: 0, runs: 28, wickets: 1, economy: 8.4, dots: 8 },
    { name: 'Ravindra Jadeja', overs: 4, maidens: 0, runs: 35, wickets: 1, economy: 8.75, dots: 12 },
    { name: 'Moeen Ali', overs: 3, maidens: 0, runs: 24, wickets: 0, economy: 8.0, dots: 6 },
  ],
  team2: [
    { name: 'Jasprit Bumrah', overs: 4, maidens: 0, runs: 28, wickets: 2, economy: 7.0, dots: 12 },
    { name: 'Trent Boult', overs: 3.3, maidens: 0, runs: 32, wickets: 1, economy: 9.1, dots: 8 },
    { name: 'Kieron Pollard', overs: 2, maidens: 0, runs: 18, wickets: 0, economy: 9.0, dots: 4 },
    { name: 'Krunal Pandya', overs: 4, maidens: 0, runs: 35, wickets: 1, economy: 8.75, dots: 10 },
  ]
};


export const mockLiveMatchData: LiveMatchData = {
  match: mockMatches[0],
  currentBatsman1: 'MS Dhoni',
  currentBatsman2: 'Ravindra Jadeja',
  currentBowler: 'Jasprit Bumrah',
  lastBalls: ['4', '1', '6', '.', '2', 'W'],
  commentary: [
    '18.3: Bumrah to Dhoni, FOUR! What a shot by Captain Cool!',
    '18.2: Bumrah to Jadeja, single down to long off',
    '18.1: Bumrah to Jadeja, SIX! Jadeja goes big over mid-wicket!'
  ]
};

