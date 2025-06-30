'use client';

import { PointsTable } from '@/types/dataType';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/uiComponents/card';
import { Badge } from '@/components/uiComponents/badge';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';

interface PointsTableProps {
    data: PointsTable[];
}

export function PointsTableComponent({ data }: PointsTableProps) {
    const getPositionBadge = (position: number): 'default' | 'secondary' | 'destructive' => {
        if (position <= 4) return 'default';
        if (position <= 6) return 'secondary';
        return 'destructive';
    };

    const getPositionIcon = (position: number) => {
        if (position === 1) return <Trophy className="w-4 h-4 text-yellow-500" />;
        if (position <= 4) return <TrendingUp className="w-4 h-4 text-green-600" />;
        return <TrendingDown className="w-4 h-4 text-red-600" />;
    };

    const getRecentClass = (result: string) => {
        switch (result) {
            case 'W':
                return 'bg-green-500 text-white';
            case 'L':
                return 'bg-red-500 text-white';
            case 'N':
                return 'bg-gray-400 text-white';
            default:
                return '';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Points Table
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <div className="min-w-[750px] p-4">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-3 font-semibold">Pos</th>
                                    <th className="text-left py-3 px-3 font-semibold">Team</th>
                                    <th className="text-center py-3 px-2 font-semibold">P</th>
                                    <th className="text-center py-3 px-2 font-semibold">W</th>
                                    <th className="text-center py-3 px-2 font-semibold">L</th>
                                    <th className="text-center py-3 px-2 font-semibold">NR</th>
                                    <th className="text-center py-3 px-2 font-semibold">Pts</th>
                                    <th className="text-center py-3 px-2 font-semibold">NRR</th>
                                    <th className="text-center py-3 px-2 font-semibold">Recent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((entry) => (
                                    <tr
                                        key={entry.team.id}
                                        className={`border-b transition-colors ${entry.position <= 4 ? 'bg-green-50' : ''
                                            } hover:bg-gray-100`}
                                    >
                                        <td className="py-4 px-3">
                                            <div className="flex items-center space-x-2">
                                                {getPositionIcon(entry.position)}
                                                <Badge variant={getPositionBadge(entry.position)}>
                                                    {entry.position}
                                                </Badge>
                                            </div>
                                        </td>
                                        <td className="py-4 px-3">
                                            <div className="flex items-center space-x-3">
                                                <Image
                                                    width={24}
                                                    height={24}
                                                    loading="lazy"
                                                    src={entry.team.logo}
                                                    alt={entry.team.name}
                                                    className="w-6 h-6 object-contain flex-shrink-0"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                                <div>
                                                    <div className="font-semibold">{entry.team.shortName}</div>
                                                    <div className="text-xs text-gray-500 hidden sm:block">
                                                        {entry.team.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 text-center">{entry.played}</td>
                                        <td className="py-4 px-2 text-center text-green-600 font-semibold">{entry.won}</td>
                                        <td className="py-4 px-2 text-center text-red-600 font-semibold">{entry.lost}</td>
                                        <td className="py-4 px-2 text-center text-yellow-600 font-semibold">{entry.noResult}</td>
                                        <td className="py-4 px-2 text-center font-bold text-blue-700 text-lg">{entry.points}</td>
                                        <td
                                            className={`py-4 px-2 text-center font-semibold ${entry.netRunRate >= 0 ? 'text-green-600' : 'text-red-600'
                                                }`}
                                        >
                                            {entry.netRunRate > 0 ? '+' : ''}
                                            {entry.netRunRate.toFixed(3)}
                                        </td>
                                        <td className="py-4 px-2 text-center">
                                            <div className="flex justify-center space-x-1">
                                                {entry.recent.map((r, i) => (
                                                    <span
                                                        key={i}
                                                        className={`w-5 h-5 text-xs rounded-full flex items-center justify-center ${getRecentClass(
                                                            r
                                                        )}`}
                                                    >
                                                        {r}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Legend */}
                <div className="px-4 pb-4 border-t bg-gray-50">
                    <div className="pt-4 space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs text-gray-600">
                            <div className="flex items-center space-x-1"><strong>P</strong><span>- Played</span></div>
                            <div className="flex items-center space-x-1"><strong>W</strong><span>- Won</span></div>
                            <div className="flex items-center space-x-1"><strong>L</strong><span>- Lost</span></div>
                            <div className="flex items-center space-x-1"><strong>NR</strong><span>- No Result</span></div>
                            <div className="flex items-center space-x-1"><strong>NRR</strong><span>- Net Run Rate</span></div>
                        </div>
                        <div className="pt-2 border-t text-xs text-gray-500">
                            Top 4 teams qualify for playoffs
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
