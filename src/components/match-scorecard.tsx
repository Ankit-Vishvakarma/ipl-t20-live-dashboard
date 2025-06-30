"use client";

import { useState } from "react";
import { Match } from "@/types/dataType";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/uiComponents/card";
import { Badge } from "@/components/uiComponents/badge";
import { Button } from "@/components/uiComponents/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/uiComponents/tabs";
import {
  ArrowLeft,
  Trophy,
  Target,
  Clock,
  MapPin,
  Users,
  BarChart3,
} from "lucide-react";
import {
  //   BarChart,
  //   Bar,
  //   XAxis,
  //   YAxis,
  //   CartesianGrid,
  //   Tooltip,
  //   ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Image from "next/image";
import { mockPlayerStats, mockBowlingStats } from "@/data/mockData";

interface MatchScorecardProps {
  match: Match;
  onBack: () => void;
}

const overByOverData = [
  { over: 1, runs: 8 },
  { over: 2, runs: 12 },
  { over: 3, runs: 6 },
  { over: 4, runs: 14 },
  { over: 5, runs: 9 },
  { over: 6, runs: 15 },
  { over: 7, runs: 7 },
  { over: 8, runs: 11 },
  { over: 9, runs: 13 },
  { over: 10, runs: 8 },
  { over: 11, runs: 16 },
  { over: 12, runs: 10 },
  { over: 13, runs: 12 },
  { over: 14, runs: 9 },
  { over: 15, runs: 14 },
  { over: 16, runs: 18 },
  { over: 17, runs: 11 },
  { over: 18, runs: 15 },
  { over: 19, runs: 8 },
  { over: 20, runs: 25 },
];
const matchData = [
  { over: 1, teamA: 5, teamB: 7 },
  { over: 2, teamA: 8, teamB: 6 },
  { over: 3, teamA: 6, teamB: 5 },
  { over: 4, teamA: 10, teamB: 9 },
  { over: 5, teamA: 12, teamB: 10 },
  { over: 6, teamA: 7, teamB: 8 },
  { over: 7, teamA: 9, teamB: 11 },
  { over: 8, teamA: 4, teamB: 6 },
  { over: 9, teamA: 10, teamB: 13 },
  { over: 10, teamA: 6, teamB: 7 },
  { over: 11, teamA: 11, teamB: 6 },
  { over: 12, teamA: 8, teamB: 9 },
  { over: 13, teamA: 10, teamB: 12 },
  { over: 14, teamA: 9, teamB: 7 },
  { over: 15, teamA: 7, teamB: 10 },
  { over: 16, teamA: 12, teamB: 11 },
  { over: 17, teamA: 13, teamB: 14 },
  { over: 18, teamA: 10, teamB: 9 },
  { over: 19, teamA: 6, teamB: 8 },
  { over: 20, teamA: 15, teamB: 16 },
];

const wagonWheelData = [
  { name: "Leg Side", value: 65, color: "#8884d8" },
  { name: "Off Side", value: 91, color: "#82ca9d" },
  { name: "On Side", value: 9, color: "Red" },
];

export function MatchScorecard({ match, onBack }: MatchScorecardProps) {
  const [selectedTeamTab, setSelectedTeamTab] = useState<"team1" | "team2">(
    "team1"
  );

  const getWinnerTeam = () => {
    if (!match.score || match.status !== "completed") return null;

    const team1Total = match.score.team1.runs;
    const team2Total = match.score.team2.runs;

    if (team1Total > team2Total) return match.team1.shortName;
    if (team2Total > team1Total) return match.team2.shortName;
    return null;
  };

  const winner = getWinnerTeam();

  const getCurrentTeamData = () => {
    if (selectedTeamTab === "team1") {
      return {
        battingTeam: match.team1,
        bowlingTeam: match.team2,
        battingData: mockPlayerStats.team1.batting,
        bowlingData: mockBowlingStats.team2,
        fallOfWickets: mockPlayerStats.team1.fallOfWickets,
        teamScore: match.score?.team1,
      };
    } else {
      return {
        battingTeam: match.team2,
        bowlingTeam: match.team1,
        battingData: mockPlayerStats.team2.batting,
        bowlingData: mockBowlingStats.team1,
        fallOfWickets: mockPlayerStats.team2.fallOfWickets,
        teamScore: match.score?.team2,
      };
    }
  };

  const currentData = getCurrentTeamData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center dark:text-white dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Matches
            </Button>
            <Badge
              variant="secondary"
              className="dark:bg-gray-700 dark:text-gray-300"
            >
              COMPLETED
            </Badge>
          </div>
          <CardTitle className="flex items-center dark:text-white">
            <Trophy className="w-5 h-5 mr-2" />
            Match {match.id} Scorecard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team 1 */}
            <div
              className={`p-4 rounded-lg border-2 ${winner === match.team1.shortName
                ? "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-600"
                : "border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
                }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Image
                    width={32}
                    height={32}
                    loading="lazy"
                    src={match.team1.logo}
                    alt={match.team1.name}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    {match.team1.shortName}
                  </span>
                  {winner === match.team1.shortName && (
                    <Badge className="bg-green-600 text-white">WINNER</Badge>
                  )}
                </div>
              </div>
              {match.score && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {match.score.team1.runs}/{match.score.team1.wickets}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    ({match.score.team1.overs} overs)
                  </div>
                </div>
              )}
            </div>

            {/* Team 2 */}
            <div
              className={`p-4 rounded-lg border-2 ${winner === match.team2.shortName
                ? "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-600"
                : "border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
                }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Image
                    width={32}
                    height={32}
                    loading="lazy"
                    src={match.team2.logo}
                    alt={match.team2.name}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    {match.team2.shortName}
                  </span>
                  {winner === match.team2.shortName && (
                    <Badge className="bg-green-600 text-white">WINNER</Badge>
                  )}
                </div>
              </div>
              {match.score && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {match.score.team2.runs}/{match.score.team2.wickets}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    ({match.score.team2.overs} overs)
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Match Details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="dark:text-gray-300">{match.venue}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="dark:text-gray-300">
                {new Date(match.date).toLocaleDateString()} • {match.time}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="dark:text-gray-300">
                Toss: {match.team1.shortName} won, elected to bat
              </span>
            </div>
          </div>

          {/* Match Result */}
          {match.result && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center border border-blue-200 dark:border-blue-700">
              <span className="text-blue-800 dark:text-blue-300 font-semibold">
                {match.result}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Team Scorecards with Tabs */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center dark:text-white">
            <Target className="w-5 h-5 mr-2" />
            Team Scorecards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={selectedTeamTab}
            onValueChange={(value: string) =>
              setSelectedTeamTab(value as "team1" | "team2")
            }
          >
            <TabsList className="grid w-full grid-cols-2 dark:bg-gray-700">
              <TabsTrigger
                value="team1"
                className="flex items-center space-x-2 dark:text-gray-300 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
              >
                <Image
                  width={32}
                  height={32}
                  loading="lazy"
                  src={match.team1.logo}
                  alt={match.team1.name}
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span>{match.team1.shortName}</span>
              </TabsTrigger>
              <TabsTrigger
                value="team2"
                className="flex items-center space-x-2 dark:text-gray-300 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
              >
                <Image
                  width={32}
                  height={32}
                  loading="lazy"
                  src={match.team2.logo}
                  alt={match.team2.name}
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span>{match.team2.shortName}</span>
              </TabsTrigger>
            </TabsList>

            {/* Team Content */}
            <TabsContent value={selectedTeamTab} className="space-y-6 mt-6">
              {/* Batting Scorecard */}
              <div className="bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-600 border-b dark:border-gray-500">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                      <Image
                        width={32}
                        height={32}
                        loading="lazy"
                        src={currentData.battingTeam.logo}
                        alt={currentData.battingTeam.name}
                        className="w-5 h-5 object-contain mr-2"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      {currentData.battingTeam.shortName} Batting
                    </h3>
                    {currentData.teamScore && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {currentData.teamScore.runs}/
                          {currentData.teamScore.wickets}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          ({currentData.teamScore.overs} overs)
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b dark:border-gray-600 bg-gray-50 dark:bg-gray-600">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                          Batsman
                        </th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900 dark:text-white">
                          R
                        </th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900 dark:text-white">
                          B
                        </th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900 dark:text-white">
                          4s
                        </th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900 dark:text-white">
                          6s
                        </th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900 dark:text-white">
                          SR
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                          Dismissal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.battingData.map((player, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                          <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                            {player.name}
                          </td>
                          <td className="py-3 px-2 text-center font-bold text-gray-900 dark:text-white">
                            {player.runs}
                          </td>
                          <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
                            {player.balls}
                          </td>
                          <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
                            {player.fours}
                          </td>
                          <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
                            {player.sixes}
                          </td>
                          <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
                            {player.strikeRate}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {player.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Fall of Wickets */}
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-600 border-t dark:border-gray-500">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Fall of Wickets
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentData.fallOfWickets.map((wicket, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-700 px-3 py-1 rounded border dark:border-gray-600"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {wicket.wicket}-{wicket.runs} ({wicket.batsman},{" "}
                          {wicket.over} ov)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bowling Figures */}
              <div className="bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-600 border-b dark:border-gray-500">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                    <Image
                      width={32}
                      height={32}
                      loading="lazy"
                      src={currentData.bowlingTeam.logo}
                      alt={currentData.bowlingTeam.name}
                      className="w-5 h-5 object-contain mr-2"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    {currentData.bowlingTeam.shortName} Bowling
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b dark:border-gray-600 bg-gray-50 dark:bg-gray-600">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                          Bowler
                        </th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900 dark:text-white">
                          O
                        </th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900 dark:text-white">
                          M
                        </th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900 dark:text-white">
                          R
                        </th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900 dark:text-white">
                          W
                        </th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900 dark:text-white">
                          Econ
                        </th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900 dark:text-white">
                          Dots
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.bowlingData.map((player, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                          <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                            {player.name}
                          </td>
                          <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
                            {player.overs}
                          </td>
                          <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
                            {player.maidens}
                          </td>
                          <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
                            {player.runs}
                          </td>
                          <td className="py-3 px-2 text-center font-bold text-red-600 dark:text-red-400">
                            {player.wickets}
                          </td>
                          <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
                            {player.economy}
                          </td>
                          <td className="py-3 px-2 text-center text-gray-700 dark:text-gray-300">
                            {player.dots}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Over by Over Analysis */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center dark:text-white">
              <BarChart3 className="w-5 h-5 mr-2" />
              Over by Over Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={matchData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="over" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="teamA" stroke="#3b82f6" name="Team A" />
                <Line type="monotone" dataKey="teamB" stroke="#ef4444" name="Team B" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Wagon Wheel */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center dark:text-white">
              <Target className="w-5 h-5 mr-2" />
              Wagon Wheel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={wagonWheelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {wagonWheelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
