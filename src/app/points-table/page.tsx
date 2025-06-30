'use client';

import { useState, useEffect } from 'react';
import { PointsTable } from '@/types/dataType';
import { PointsTableComponent } from '@/components/points-table';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Alert, AlertDescription } from '@/components/uiComponents/alert';
import { AlertTriangle, Trophy, Target, Award } from 'lucide-react';

export default function PointsTablePage() {
  const [pointsTable, setPointsTable] = useState<PointsTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPointsTable = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/points-table');
      const data = await response.json();

      if (data.success) {
        setPointsTable(data.data);
      } else {
        setError('Failed to fetch points table data');
      }
    } catch (err) {
      setError('Failed to fetch points table. Please try again.');
      console.error('Error fetching points table:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPointsTable();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading Points Table..." />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full px-4 py-6">
        {/* Page Header */}
        <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">Points Table</h1>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}
        {/* Table Component */}
        <PointsTableComponent data={pointsTable} />
      </div>
    </div>
  );
}
