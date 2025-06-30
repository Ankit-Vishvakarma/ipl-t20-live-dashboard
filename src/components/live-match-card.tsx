'use client';

import { useState, useEffect } from 'react';
import { LiveMatchData } from '@/types/dataType';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/uiComponents/card';
import { Badge } from '@/components/uiComponents/badge';
import { Clock, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
interface LiveMatchCardProps {
  data: LiveMatchData;
}

export function LiveMatchCard({ data }: LiveMatchCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { match } = data;

  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-700 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-green-800 dark:text-green-300">
            Live Match
          </CardTitle>
          <Badge variant="destructive" className="animate-pulse">
            LIVE
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Teams and Scores */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center space-y-2">
            <Image
              width={48}
              height={48} 
              src={match.team1.logo} 
              alt={match.team1.name}
              className="w-12 h-12 object-contain mx-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="font-semibold text-sm dark:text-white">{match.team1.shortName}</div>
            {match.score && (
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {match.score.team1.runs}/{match.score.team1.wickets}
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  ({match.score.team1.overs} overs)
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center space-y-2">
            <Image
              width={48}
              height={48} 
              src={match.team2.logo} 
              alt={match.team2.name}
              className="w-12 h-12 object-contain mx-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="font-semibold text-sm dark:text-white">{match.team2.shortName}</div>
            {match.score && (
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {match.score.team2.runs}/{match.score.team2.wickets}
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  ({match.score.team2.overs} overs)
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Match Details */}
        <div className="border-t dark:border-gray-600 pt-3 space-y-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="truncate">{match.venue}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Clock className="w-4 h-4 mr-2" />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Current Players */}
        {data.currentBatsman1 && (
          <div className="border-t dark:border-gray-600 pt-3">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Current Players
            </div>
            <div className="flex items-center text-sm dark:text-gray-300">
              <Users className="w-4 h-4 mr-2" />
              <span>
                {data.currentBatsman1}, {data.currentBatsman2} | 
                Bowling: {data.currentBowler}
              </span>
            </div>
          </div>
        )}

        {/* Last Balls */}
        {data.lastBalls && (
          <div className="border-t dark:border-gray-600 pt-3">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Last 6 Balls
            </div>
            <div className="flex space-x-2">
              {data.lastBalls.map((ball, index) => (
                <Badge 
                  key={index} 
                  variant={ball === '4' || ball === '6' ? 'default' : 'secondary'}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    ball === 'W' ? 'bg-red-500 text-white' : ''
                  }`}
                >
                  {ball}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}