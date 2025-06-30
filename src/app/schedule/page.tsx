'use client';

import { useState, useEffect } from 'react';
import { Match } from '@/types/dataType';
import { MatchList } from '@/components/match-list';
import { MatchScorecard } from '@/components/match-scorecard';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Alert, AlertDescription } from '@/components/uiComponents/alert';
import { AlertTriangle } from 'lucide-react';

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/schedule');
      const data = await response.json();
      
      if (data.success) {
        setMatches(data.data);
      } else {
        setError('Failed to fetch matches data');
      }
    } catch (err) {
      setError('Failed to fetch matches. Please try again.');
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading Matches..." />
      </div>
    );
  }

  if (selectedMatch) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <MatchScorecard 
            match={selectedMatch} 
            onBack={() => setSelectedMatch(null)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-4 py-6">
        {/* Page Header */}
        <div className=" text-white p-6 rounded-lg shadow-lg mb-6" style={{ backgroundColor: '#223577' }}>
          <h1 className="text-3xl font-bold mb-2">Match Center: Live, Upcoming & Completed</h1>
        </div>
        
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-800 dark:text-red-300">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <MatchList 
          matches={matches} 
          onMatchSelect={setSelectedMatch}
        />
      </div>
    </div>
  );
}