'use client';

import { useState } from 'react';
import { Match } from '@/types/dataType';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/uiComponents/card';
import { Badge } from '@/components/uiComponents/badge';
import { Button } from '@/components/uiComponents/button';
import { Clock, MapPin, TrendingUp, Eye } from 'lucide-react';
import { MatchScorecard } from '@/components/match-scorecard';
import Image from 'next/image';

interface RecentMatchesProps {
  matches: Match[];
}

export function RecentMatches({ matches }: RecentMatchesProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const recentMatches = matches.filter(match => 
    match.status === 'completed' || match.status === 'live'
  ).slice(0, 6);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse text-xs">LIVE</Badge>;
      case 'completed':
        return <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs">DONE</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{status.toUpperCase()}</Badge>;
    }
  };

  const getWinnerTeam = (match: Match) => {
    if (!match.score || match.status !== 'completed') return null;
    
    const team1Total = match.score.team1.runs;
    const team2Total = match.score.team2.runs;
    
    if (team1Total > team2Total) return match.team1.shortName;
    if (team2Total > team1Total) return match.team2.shortName;
    return null;
  };

  if (selectedMatch) {
    return (
      <MatchScorecard 
        match={selectedMatch} 
        onBack={() => setSelectedMatch(null)} 
      />
    );
  }

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center dark:text-white">
          <TrendingUp className="w-5 h-5 mr-2" />
          Recent Matches
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentMatches.map((match) => {
            const winner = getWinnerTeam(match);
            
            return (
              <div 
                key={match.id} 
                className="border dark:border-gray-600 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {getStatusBadge(match.status)}
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Match {match.id} • IPL 2025
                    </span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(match.date).toLocaleDateString()}
                    </span>
                    {match.status === 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedMatch(match)}
                        className="text-xs h-8 px-3"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        <span className="hidden xs:inline">Scorecard</span>
                        <span className="xs:hidden">View</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Teams and Scores */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div className={`p-3 rounded-lg ${
                    winner === match.team1.shortName ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' : 'bg-gray-50 dark:bg-gray-600'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 min-w-0">
                        <Image
                          width={24}
                          height={24} 
                          loading="lazy"
                          src={match.team1.logo} 
                          alt={match.team1.name}
                          className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <span className="font-semibold text-sm dark:text-white truncate">{match.team1.shortName}</span>
                      </div>
                      {winner === match.team1.shortName && (
                        <Badge variant="default" className="bg-green-600 text-xs px-2 py-0.5 flex-shrink-0">WON</Badge>
                      )}
                    </div>
                    {match.score && (
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {match.score.team1.runs}/{match.score.team1.wickets}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">
                          ({match.score.team1.overs} overs)
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`p-3 rounded-lg ${
                    winner === match.team2.shortName ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' : 'bg-gray-50 dark:bg-gray-600'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 min-w-0">
                        <Image
                          width={24}
                          height={24} 
                          loading="lazy"
                          src={match.team2.logo} 
                          alt={match.team2.name}
                          className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <span className="font-semibold text-sm dark:text-white truncate">{match.team2.shortName}</span>
                      </div>
                      {winner === match.team2.shortName && (
                        <Badge variant="default" className="bg-green-600 text-xs px-2 py-0.5 flex-shrink-0">WON</Badge>
                      )}
                    </div>
                    {match.score && (
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {match.score.team2.runs}/{match.score.team2.wickets}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">
                          ({match.score.team2.overs} overs)
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Match Result */}
                {match.result && (
                  <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-center">
                    <span className="text-blue-800 dark:text-blue-300 font-semibold text-sm">
                      {match.result}
                    </span>
                  </div>
                )}
                
                <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-300 gap-x-4 gap-y-1">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{match.venue.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{match.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {recentMatches.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No recent matches available.
          </div>
        )}
      </CardContent>
    </Card>
  );
}