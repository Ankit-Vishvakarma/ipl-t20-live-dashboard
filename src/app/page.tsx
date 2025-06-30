'use client';

import { useState, useEffect } from 'react';
import { Match, PointsTable, LiveMatchData } from '@/types/dataType';
import { DashboardHeader } from '@/components/dashboard-header';
import { LiveMatchCard } from '@/components/live-match-card';
import { UpcomingMatches } from '@/components/upcoming-matches';
import { PhotoBanner } from '@/components/photo-banner';
import { RecentMatches } from '@/components/recent-matches';
import { TeamStats } from '@/components/team-stats';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Alert, AlertDescription } from '@/components/uiComponents/alert';
import { AlertTriangle } from 'lucide-react';
import { photoGallery } from '@/data/photoGallery';
export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [pointsTable, setPointsTable] = useState<PointsTable[]>([]);
  const [liveMatchData, setLiveMatchData] = useState<LiveMatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch matches
      const matchesResponse = await fetch('/api/schedule');
      const matchesData = await matchesResponse.json();

      if (matchesData.success) {
        setMatches(matchesData.data);
      }

      // Fetch points table
      const pointsResponse = await fetch('/api/points-table');
      const pointsData = await pointsResponse.json();

      if (pointsData.success) {
        setPointsTable(pointsData.data);
      }

      // Fetch live match data
      const liveResponse = await fetch('/api/live-match');
      const liveData = await liveResponse.json();

      if (liveData.success) {
        setLiveMatchData(liveData.data);
      }

    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch

    const interval = setInterval(() => {
      fetch('/api/live-match')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setLiveMatchData(data.data); // Update state
          }
        })
        .catch(console.error);
    }, 5000); // Call every 5 seconds (5000 ms)

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []); // Only run once when component mounts

  if (loading && matches.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading IPL Dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-4 py-6">
        <DashboardHeader onRefresh={fetchData} isLoading={loading} />

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-800 dark:text-red-300">
              {error}
            </AlertDescription>
          </Alert>
        )}
        <div className="mb-6">
          <PhotoBanner title="Match Moments" photos={photoGallery} />
        </div>

        {/* Upcoming Matches Section - Full Width Below Header */}
        <div className="mb-6">
          <UpcomingMatches matches={matches} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Live Match Details */}
          <div className="lg:col-span-1 space-y-6">
            {liveMatchData && (
              <LiveMatchCard data={liveMatchData} />
            )}
            <TeamStats data={pointsTable.slice(0, 4)} />
          </div>

          {/* Right Column - Recent Matches */}
          <div className="lg:col-span-2 space-y-6">
            <RecentMatches matches={matches} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 pt-6">
          <p>
            Copyright © IPL T20 All Rights Reserved.
          </p>

        </div>
      </div>
    </div>
  );
}
