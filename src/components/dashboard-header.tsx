'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/uiComponents/button';
import { RefreshCw, Activity } from 'lucide-react';

interface DashboardHeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

export function DashboardHeader({ onRefresh, isLoading }: DashboardHeaderProps) {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-white p-6 rounded-lg shadow-lg mb-6" style={{ backgroundColor: '#223577' }}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">IPL T20 Live Dashboard</h1>

        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="text-sm text-blue-100">
            <div className="flex items-center">
              <Activity className="w-4 h-4 mr-1" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
          
          <Button
            onClick={onRefresh}
            disabled={isLoading}
            variant="secondary"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-white/20"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}