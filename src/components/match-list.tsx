'use client';

import { useState } from 'react';
import { Match } from '@/types/dataType';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/uiComponents/card';
import { Badge } from '@/components/uiComponents/badge';
import { Button } from '@/components/uiComponents/button';
import { Calendar, Clock, MapPin, Eye, Filter, Trophy, CalendarX } from 'lucide-react';
import Image from 'next/image';

interface MatchListProps {
  matches: Match[];
  onMatchSelect: (match: Match) => void;
}

export function MatchList({ matches, onMatchSelect }: MatchListProps) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'live'>('all');

  const filteredMatches = matches.filter(match => {
    if (filter === 'all') return true;
    return match.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse text-xs">LIVE</Badge>;
      case 'completed':
        return <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs">DONE</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs">UPCOMING</Badge>;
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

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    // Sort by date, most recent first
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const getNoFixturesMessage = () => {
    switch (filter) {
      case 'live':
        return {
          title: 'No Live Matches',
          description: 'There are no matches currently being played. Check back during match hours for live updates.',
          icon: CalendarX
        };
      case 'upcoming':
        return {
          title: 'No Upcoming Fixtures',
          description: 'All scheduled matches have been completed. New fixtures will be announced soon.',
          icon: Calendar
        };
      case 'completed':
        return {
          title: 'No Completed Matches',
          description: 'No matches have been completed yet. Check back after matches are played.',
          icon: Trophy
        };
      default:
        return {
          title: 'No Fixtures Available',
          description: 'There are currently no matches scheduled. Please check back later for updates.',
          icon: CalendarX
        };
    }
  };

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center dark:text-white">
            <Trophy className="w-5 h-5 mr-2" />
            Match History
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 dark:text-gray-300" />
            <div className="flex flex-wrap gap-1">
              {['all', 'live', 'upcoming', 'completed'].map((filterOption) => (
                <Button
                  key={filterOption}
                  variant={filter === filterOption ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterOption as any)}
                  className="text-xs h-8 px-3"
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {sortedMatches.length === 0 ? (
          // No Fixtures Message
          <div className="text-center py-12">
            <div className="flex flex-col items-center space-y-4">
              {(() => {
                const { title, description, icon: Icon } = getNoFixturesMessage();
                return (
                  <>
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                        {description}
                      </p>
                    </div>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFilter('all')}
                        className="text-xs"
                        disabled={filter === 'all'}
                      >
                        <Filter className="w-3 h-3 mr-1" />
                        View All Matches
                      </Button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        ) : (
          // Matches List
          <div className="space-y-4">
            {sortedMatches.map((match) => {
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
                          onClick={() => onMatchSelect(match)}
                          className="text-xs h-8 px-3 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 dark:hover:bg-blue-900 dark:hover:text-blue-300"
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
                    <div className={`p-3 rounded-lg transition-all ${
                      winner === match.team1.shortName 
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 shadow-sm' 
                        : 'bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 min-w-0">
                          <Image
                            width={20}
                            height={20} 
                            loading='lazy'
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
                          <Badge className="bg-green-600 text-white text-xs px-2 py-0.5 flex-shrink-0">WIN</Badge>
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

                    <div className={`p-3 rounded-lg transition-all ${
                      winner === match.team2.shortName 
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 shadow-sm' 
                        : 'bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 min-w-0">
                          <Image
                            width={20}
                            height={20}
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
                          <Badge className="bg-green-600 text-white text-xs px-2 py-0.5 flex-shrink-0">WIN</Badge>
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
                    <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-center border border-blue-200 dark:border-blue-700">
                      <span className="text-blue-800 dark:text-blue-300 font-semibold text-sm">
                        {match.result}
                      </span>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{new Date(match.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{match.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{match.venue}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}