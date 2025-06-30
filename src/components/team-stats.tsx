"use client";

import { PointsTable } from "@/types/dataType";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/uiComponents/card";
import { Badge } from "@/components/uiComponents/badge";
import { Trophy } from "lucide-react";
import Image from "next/image";

interface TeamStatsProps {
  data: PointsTable[];
}

export function TeamStats({ data }: TeamStatsProps) {
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center dark:text-white">
          <Trophy className="w-5 h-5 mr-2" />
          Top Teams
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((entry, index) => (
            <div
              key={entry.team.id}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Badge variant={index === 0 ? "default" : "secondary"}>
                  {entry.position}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Image
                    width={24}
                    height={24}
                    loading="lazy"
                    src={entry.team.logo}
                    alt={entry.team.name}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="font-semibold text-sm dark:text-white">
                    {entry.team.shortName}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm dark:text-white">
                  {entry.points} pts
                </div>
                <div
                  className={`text-xs ${
                    entry.netRunRate >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {entry.netRunRate > 0 ? "+" : ""}
                  {entry.netRunRate.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
