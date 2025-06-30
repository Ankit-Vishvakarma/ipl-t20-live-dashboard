'use client';

import { useState, useRef, useEffect } from 'react';
import { Match } from '@/types/dataType';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/uiComponents/card';
import { Badge } from '@/components/uiComponents/badge';
import { Button } from '@/components/uiComponents/button';
import { Calendar, Clock, MapPin, Play, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

interface UpcomingMatchesProps {
  matches: Match[];
}

export function UpcomingMatches({ matches }: UpcomingMatchesProps) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [lastNotificationTime, setLastNotificationTime] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const upcomingMatches = matches.filter(match => match.status === 'upcoming' || match.status === 'live');

  // Mock live events for demonstration
  const liveEvents = [
    { type: 'wicket', message: 'WICKET! Rohit Sharma c Dhoni b Jadeja for 45', team: 'MI' },
    { type: 'boundary', message: 'FOUR! Beautiful cover drive by Virat Kohli', team: 'RCB' },
    { type: 'six', message: 'SIX! MS Dhoni goes big over long-on!', team: 'CSK' },
    { type: 'milestone', message: 'FIFTY! Hardik Pandya reaches his half-century', team: 'MI' },
    { type: 'over', message: 'End of over 15: CSK 142/3 (RRR: 8.40)', team: 'CSK' }
  ];

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const showLiveNotification = () => {
    const now = Date.now();
    if (now - lastNotificationTime < 10000) return; // Prevent spam

    const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
    
    const getToastIcon = (type: string) => {
      switch (type) {
        case 'wicket': return '🏏';
        case 'boundary': return '🔥';
        case 'six': return '💥';
        case 'milestone': return '🎯';
        default: return '⚡';
      }
    };

    toast(randomEvent.message, {
      icon: getToastIcon(randomEvent.type),
      duration: 5000,
      className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none',
    });

    setLastNotificationTime(now);
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, [upcomingMatches]);

  // Simulate live notifications for live matches
  useEffect(() => {
    const liveMatch = upcomingMatches.find(match => match.status === 'live');
    if (liveMatch) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every 15 seconds
          showLiveNotification();
        }
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [upcomingMatches, lastNotificationTime]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse font-semibold shadow-lg">
            <Play className="w-3 h-3 mr-1" />
            LIVE
          </Badge>
        );
      case 'upcoming':
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white font-medium">UPCOMING</Badge>;
      default:
        return <Badge variant="outline">{status.toUpperCase()}</Badge>;
    }
  };

  const getMatchTypeLabel = (match: Match) => {
    if (match.status === 'live') {
      return `LIVE • Match ${match.id} • IPL 2025`;
    }
    return `Match ${match.id} • IPL 2025`;
  };

  const formatDateTime = (date: string, time: string) => {
    const matchDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dateLabel = '';
    if (matchDate.toDateString() === today.toDateString()) {
      dateLabel = 'Today';
    } else if (matchDate.toDateString() === tomorrow.toDateString()) {
      dateLabel = 'Tomorrow';
    } else {
      dateLabel = matchDate.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric' 
      });
    }

    return { dateLabel, time };
  };

  return (
    <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b dark:border-gray-600">
        <CardTitle className="flex items-center dark:text-white">
          <Calendar className="w-5 h-5 mr-2" />
          Live & Upcoming Matches
          {upcomingMatches.some(m => m.status === 'live') && (
            <div className="ml-3 flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm text-red-600 dark:text-red-400 font-medium">Live Updates</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <Button
              variant="outline"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
              onClick={scrollLeft}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
              onClick={scrollRight}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}

          {/* Horizontal Scrolling Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide p-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-4" style={{ width: 'max-content' }}>
              {upcomingMatches.map((match) => {
                const { dateLabel, time } = formatDateTime(match.date, match.time);
                
                return (
                  <div 
                    key={match.id} 
                    className={`flex-shrink-0 w-80 border dark:border-gray-600 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-700 ${
                      match.status === 'live' ? 'ring-2 ring-red-200 dark:ring-red-800 shadow-lg' : ''
                    }`}
                  >
                    {/* Match Header */}
                    <div className={`px-4 py-3 border-b dark:border-gray-600 ${
                      match.status === 'live' 
                        ? 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20' 
                        : 'bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(match.status)}
                          {match.status === 'live' && (
                            <div className="flex items-center space-x-1">
                              <Zap className="w-3 h-3 text-orange-500" />
                              <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">Live Updates</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {getMatchTypeLabel(match)}
                      </div>
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="truncate">{match.venue.split(',')[0]}</span>
                      </div>
                    </div>

                    {/* Teams and Scores */}
                    <div className="p-4">
                      <div className="space-y-4">
                        {/* Team 1 */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="flex items-center space-x-2">
                              <Image 
                                width={32}
                                height={32}
                                src={match.team1.logo} 
                                alt={match.team1.name}
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <span className="font-semibold text-gray-800 dark:text-white">{match.team1.shortName}</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {match.score ? (
                              <div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                  {match.score.team1.runs}/{match.score.team1.wickets}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  ({match.score.team1.overs} ov)
                                </div>
                              </div>
                            ) : (
                              <div className="w-12 h-8"></div>
                            )}
                          </div>
                        </div>

                        {/* VS Divider */}
                        <div className="flex items-center justify-center">
                          <div className="w-full h-px bg-gray-200 dark:bg-gray-600"></div>
                          <span className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700">VS</span>
                          <div className="w-full h-px bg-gray-200 dark:bg-gray-600"></div>
                        </div>

                        {/* Team 2 */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 min-w-0">
                            <div className="flex items-center space-x-2">
                              <Image
                                width={32}
                                height={32} 
                                src={match.team2.logo} 
                                alt={match.team2.name}
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                              <span className="font-semibold text-gray-800 dark:text-white">{match.team2.shortName}</span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {match.score ? (
                              <div>
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                  {match.score.team2.runs}/{match.score.team2.wickets}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  ({match.score.team2.overs} ov)
                                </div>
                              </div>
                            ) : (
                              <div className="w-12 h-8"></div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Match Status/Result */}
                      {match.status === 'live' && (
                        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-600">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                              {match.team1.shortName} batting
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Run Rate: 8.47
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
                            Need 67 runs in 42 balls
                          </div>
                        </div>
                      )}

                      {match.status === 'upcoming' && (
                        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-600">
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-3">
                            <div className="flex items-center justify-center space-x-4 text-sm">
                              <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
                                <Calendar className="w-4 h-4" />
                                <span className="font-semibold">{dateLabel}</span>
                              </div>
                              <div className="w-px h-4 bg-blue-300 dark:bg-blue-600"></div>
                              <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
                                <Clock className="w-4 h-4" />
                                <span className="font-semibold">{time}</span>
                              </div>
                            </div>
                            <div className="text-center mt-2 text-xs text-blue-600 dark:text-blue-400">
                              Toss at {time.split(':')[0]}:{(parseInt(time.split(':')[1]) - 30).toString().padStart(2, '0')}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {upcomingMatches.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p className="text-lg font-medium">No upcoming matches scheduled</p>
            <p className="text-sm">Check back later for new fixtures</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}