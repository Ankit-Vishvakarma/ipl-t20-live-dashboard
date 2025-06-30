export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  color: string;
}
export interface PointsTable {
  team: Team;
  played: number;
  won: number;
  lost: number;
  noResult: number;
  points: number;
  netRunRate: number;
  position: number;
  recent: ('W' | 'L' | 'N')[];
}

export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
  result?: string;
  score?: {
    team1: {
      runs: number;
      wickets: number;
      overs: number;
    };
    team2: {
      runs: number;
      wickets: number;
      overs: number;
    };
  };
}

export interface LiveMatchData {
  match: Match;
  currentBatsman1?: string;
  currentBatsman2?: string;
  currentBowler?: string;
  lastBalls?: string[];
  commentary?: string[];
}

export interface Photo {
  url: string;
  alt?: string;
}